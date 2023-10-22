export default class ListPoint {
    /**
     * Creates a new list point.
     * @param {string} name The name of the list point.
     * @param {string} divId The ID of the div element where the list point will be displayed.
     */
    constructor(map = null, name = "local_list", listpoint = []) {

        this.list = listpoint;
        this.nameList = name;

        this.map = map;
        if (this.map) {

            // select elements
            this.listElement = document.querySelector(`#listpoint`);
            this.ul = document.querySelector(`#listpoint ul`);

        }

    }
    getList() {
        return this.list;
    }

    setList(list) {
        this.list = list;
    }

    // add end point in list
    addPoint(feature) {
        this.list.push(feature);
        this.saveList();
        this.displayInit();

        this.ul.scrollTop = this.ul.scrollHeight;
        this.map.setView([feature.geometry.coordinates[1], feature.geometry.coordinates[0]], 15);
    }

    //remove point in list by index
    removePoint(index) {
        this.list.splice(index, 1);
        console.log("remove point at index " + index);

        this.saveList();
        this.displayInit();
    }

    //save list in local storage
    saveList() {
        window.localStorage.setItem(`local_list`, JSON.stringify(this.list));

        console.log(`save 'local_list' in localStorage :`);
        console.log(this.list);
    }

    //load list in local storage
    loadList() {
        if (window.localStorage.getItem(`local_list`)) {
            this.list = JSON.parse(window.localStorage.getItem(`local_list`));

            console.log(`load local_list from localStorage :`);
            console.log(JSON.parse(window.localStorage.getItem(`local_list`)));
        }
        else {
            console.log(` no list in localStorage`);
        }
    }

    ////////////////////////////////////////////////////////////////////////////
    //init display
    displayInit() {

        this.displayPointsInMap();
        this.displayRouteSetTotal();
        this.displayListElement();

        //init listener
        this.displaySelected();
        this.upPointInList();
        this.downPointInList();
        // this.resizeListpoint();
    }

    //display points in map
    displayPointsInMap() {

        // clean map, init layer point group 
        if (!this.pointLayerGroup) {
            this.pointLayerGroup = L.layerGroup();
        }
        else {
            this.map.removeLayer(this.pointLayerGroup);
            this.pointLayerGroup.clearLayers();
        }
        this.pointLayerGroup.addTo(this.map);

        // start marker
        const startIcon = L.icon({
            className: 'icon-start',
            iconUrl: './image/icons8-LightGreen-marker-A-48.png',
            iconSize: [32, 32],
            iconAnchor: [16, 32],
            popupAnchor: [0, -32],
        });
        // end marker
        const endIcon = L.icon({
            className: 'icon-end',
            iconUrl: './image/icons8-Tomato-marker-B-48.png',
            iconSize: [32, 32],
            iconAnchor: [16, 32],
            popupAnchor: [0, -32],
        });
        // itermediate marker
        const intermedIcon = L.icon({
            className: 'icon-intermed',
            iconUrl: './image/icons8-SkyBlue-marker-48.png',
            iconSize: [32, 32],
            iconAnchor: [16, 32],
            popupAnchor: [0, -32],
        });

        for (let [index, point] of this.list.entries()) {

            if (index == 0) {
                const marker = L.marker([point.geometry.coordinates[1],
                        point.geometry.coordinates[0]
                    ], { icon: startIcon })
                    .bindPopup(point.properties.label);
                // Add the marker to the layer group
                this.pointLayerGroup.addLayer(marker);
            }

            else if (index == this.list.length - 1) {
                const marker = L.marker([point.geometry.coordinates[1],
                        point.geometry.coordinates[0]
                    ], { icon: endIcon })
                    .bindPopup(point.properties.label);
                // Add the marker to the layer group
                this.pointLayerGroup.addLayer(marker);
            }

            else {
                const marker = L.marker([point.geometry.coordinates[1],
                        point.geometry.coordinates[0]
                    ], { icon: intermedIcon })
                    .bindPopup(point.properties.label);
                // Add the marker to the layer group
                this.pointLayerGroup.addLayer(marker);
            }
        }

        // Add the layer group to the map
        this.pointLayerGroup.addTo(this.map);
    }

    //display route in map and set total element with 
    displayRouteSetTotal() {

        // clean map, init layer line group 
        if (!this.lineLayerGroup) {
            this.lineLayerGroup = L.layerGroup();
        }
        else {
            this.map.removeLayer(this.lineLayerGroup);
            this.lineLayerGroup.clearLayers();
        }
        this.lineLayerGroup.addTo(this.map);

        let duration = 0;
        let distance = 0;

        const fetchDataAndAddToMap = async(pointStart, pointEnd) => {
            const url = "https://wxs.ign.fr/calcul/geoportail/itineraire/rest/1.0.0/route?";
            const utils = "resource=bdtopo-osrm&profile=car&optimization=fastest";
            const start = `&start=${pointStart.geometry.coordinates}`;
            const end = `&end=${pointEnd.geometry.coordinates}`;
            const format = "&geometryFormat=geojson";
            const other = "&getBbox=false&getSteps=false";

            try {
                const response = await fetch(url + utils + start + end + format + other);
                const data = await response.json();

                const line = L.geoJSON(data.geometry);
                this.lineLayerGroup.addLayer(line);

                duration += data.duration || 0;
                distance += data.distance || 0;

            }
            catch (error) {
                console.error('Erreur :', error);
            }
        };

        const displayRoutes = async() => {
            for (let i = 0; i < this.list.length - 1; i++) {
                await fetchDataAndAddToMap(this.list[i], this.list[i + 1]);
            }

            //format time 
            let durationText = Math.floor(duration / 60) + "h" + Math.floor(duration % 60) + "min";
            if (duration < 59) {
                durationText = Math.floor(duration) + "min";
            }

            //set total element
            const totalElement = document.querySelector("#listpoint .total span");
            totalElement.textContent = `Total : ${durationText} / ${Math.floor(distance)/1000}km`;
        };

        const totalElement = this.listElement.querySelector(".total span");
        totalElement.textContent = `Total : calcul en cours ...`;

        displayRoutes();
        this.lineLayerGroup.addTo(this.map);
    }

    // display points element
    displayListElement() {

        // clean ul element
        this.ul.replaceChildren();
        // this.ul.innerHTML = '';

        if (this.list.length > 0) {
            // for display points in list
            for (let [index, point] of this.list.entries()) {

                // remove point if null or undefined 
                if (!point) {
                    // if (point == null || point == undefined) {
                    this.removePoint(index);
                    continue;
                }

                else {
                    const template = this.listElement.querySelector(`template`);

                    const li = template.content.cloneNode(true);
                    li.feature = point; //for save geojson data ==> not work ! why ?
                    // console.log(li)

                    // edit span label
                    const label = li.querySelector('.label');
                    label.feature = point; //for save geojson
                    label.textContent = point.properties.label;
                    label.setAttribute('data-index', index);

                    // add listener for remove button
                    const remove = li.querySelector(`.remove`);
                    if (remove != null) {
                        remove.addEventListener('click', () => {
                            this.removePoint(index);
                        });
                    }

                    this.ul.appendChild(li);
                }
            }
        }
    }

    ////////////////////////////////////////////////////////////////////////////
    // Add event listeners for toggle selected point and remove by cross
    displaySelected() {
        const elements = this.ul.querySelectorAll('.label-box');

        for (let element of elements) {
            element.addEventListener('click', () => {

                // function for set view
                function setViewOnPoint(feature, map) {
                    map.setView([feature.geometry.coordinates[1], feature.geometry.coordinates[0]], 14);
                }
                // function for toggle select li (route) in ul (routes)
                function displaySelect(li, ul) {
                    if (li.classList.contains('selected') == false) {
                        const old = ul.querySelector('.selected');
                        if (old) {
                            old.classList.remove('selected');
                        }
                        li.classList.add('selected');
                    }
                    else {
                        li.classList.remove('selected');
                    }
                }

                if (event.target.matches('.label')) {
                    setViewOnPoint(event.target.feature, this.map);
                }
                else if (event.target.matches('.label-box')) {
                    const label = event.target.querySelector('.label');
                    if (label) {
                        setViewOnPoint(label.feature, this.map);
                    }
                }
                const li = event.target.closest('li');
                if (li) {
                    displaySelect(li, this.ul);
                }

            });
        }
    }

    // method for update (after up/down)
    updateList() {
        const labels = document.querySelectorAll('#listpoint ul .label');
        const list = [];
        if (labels) {
            for (let label of labels) {
                list.push(label.feature);
            }
        }
        this.setList(list);
        this.saveList();
        this.displayPointsInMap();
        this.displayRouteSetTotal();
    }

    // Add event listeners for up point
    upPointInList() {
        const upButtons = this.ul.querySelectorAll('.up');
        for (let upButton of upButtons) {
            upButton.addEventListener('click', () => {

                const liSelected = event.target.closest('li');
                const liAbove = liSelected.previousElementSibling;

                if (liAbove) {
                    let distance = 0;
                    let distance2 = 0;
                    let id = null;
                    const self = this; // Stocker la valeur de this

                    function animate() {
                        distance++;
                        distance2 += liSelected.clientHeight / liAbove.clientHeight;
                        liSelected.style.transform = `translateY(-${distance}px)`;
                        liAbove.style.transform = `translateY(${distance2}px)`;
                        if (distance < liAbove.clientHeight && distance2 < liSelected.clientHeight) {
                            id = requestAnimationFrame(animate);
                        }
                        else {
                            cancelAnimationFrame(id);
                            liAbove.before(liSelected);
                            liSelected.style.transform = ``;
                            liAbove.style.transform = ``;

                            self.updateList();
                        }
                    }
                    animate();
                }
            });
        }
    }

    // Add event listeners for up point
    downPointInList() {
        const downButtons = this.ul.querySelectorAll('.down');
        for (let downButton of downButtons) {
            downButton.addEventListener('click', () => {

                const liSelected = event.target.closest('li');
                const liBelow = liSelected.nextElementSibling;

                if (liBelow) {
                    let distance = 0;
                    let distance2 = 0;
                    let id = null;
                    const self = this; // Stocker la valeur de this

                    function animate() {
                        distance++;
                        distance2 += liSelected.clientHeight / liBelow.clientHeight;
                        liSelected.style.transform = `translateY(${distance}px)`;
                        liBelow.style.transform = `translateY(-${distance2}px)`;
                        if (distance < liBelow.clientHeight && distance2 < liSelected.clientHeight) {
                            id = requestAnimationFrame(animate);
                        }
                        else {
                            cancelAnimationFrame(id);
                            liBelow.after(liSelected);
                            liSelected.style.transform = ``;
                            liBelow.style.transform = ``;
                            ///////
                            self.updateList();
                        }
                    }
                    animate();
                }
            });
        }
    }

    // resizeListpoint() {
    //     const hitbox = this.listElement.querySelector('.resize-hitbox');
    //     hitbox.addEventListener('mousedown', (event) => {

    //         const positionInitialeY = event.clientY;

    //         const gestionnaireTouchMove = (e) => {
    //             e.preventDefault();

    //             const diff = (e.clientY - positionInitialeY);
    //             this.listElement.style.height = Math.abs(this.listElement.clientHeight - diff) + 'px';
    //         };

    //         const gestionnaireTouchEnd = () => {
    //             // Supprimer les gestionnaires d'événements lorsque le toucher se termine
    //             document.removeEventListener('mousemove', gestionnaireTouchMove);
    //             document.removeEventListener('mouseup', gestionnaireTouchEnd);
    //         };

    //         document.addEventListener('mousemove', gestionnaireTouchMove);
    //         document.addEventListener('mouseup', gestionnaireTouchEnd);

    //     });
    // }




    // Add event listeners for drag and drop
    // dragAndDrop() {
    //     const sortableList = this.ul;
    //     // console.log(sortableList)

    //     if (this.ul.querySelectorAll('.point').length > 0) {
    //         const items = sortableList.querySelectorAll('.point');

    //         for (let item of items) {
    //             item.addEventListener("dragstart", () => {
    //                 console.log('drag');
    //                 // Adding dragging class to item after a delay
    //                 setTimeout(() => item.classList.add("dragging"), 0);
    //             });
    //             // Removing dragging class from item on dragend event
    //             item.addEventListener("dragend", () => {

    //                 // update the list 
    //                 this.list = [];
    //                 for (let span of this.ul.querySelectorAll(`.point .label`)) {
    //                     this.list.push(span.feature);
    //                 }
    //                 this.saveList();
    //                 this.displayInit();

    //                 // update the remove button
    //                 for (let [index, button] of this.ul.querySelectorAll(`.point button`).entries()) {
    //                     button.setAttribute("data-index", index);
    //                 }

    //                 // Removing dragging class from item
    //                 item.classList.remove("dragging");
    //             });
    //         }
    //         const initSortableList = (e) => {
    //             e.preventDefault();
    //             const draggingItem = this.ul.querySelector(".dragging");

    //             // Getting all items except currently dragging and making array of them
    //             let siblings = [...sortableList.querySelectorAll(".point:not(.dragging)")];
    //             // Finding the sibling after which the dragging item should be placed
    //             let nextSibling = siblings.find(sibling => {
    //                 return e.clientY <= sibling.offsetTop + sibling.offsetHeight / 2;
    //             });
    //             // Inserting the dragging item before the found sibling
    //             sortableList.insertBefore(draggingItem, nextSibling);
    //         };

    //         sortableList.addEventListener("dragover", initSortableList);
    //         sortableList.addEventListener("dragenter", e => e.preventDefault());
    //     }
    // }


    //     // Add event listeners for drag and drop
    //     dragAndDrop() {
    //         const sortableList = this.ul;

    //         if (sortableList.querySelectorAll('.point').length > 0) {
    //             const items = sortableList.querySelectorAll('.point');

    //             for (let item of items) {
    //                 item.addEventListener("touchstart", () => {
    //                     // Add dragging class after a delay to avoid selection issues
    //                     setTimeout(() => item.classList.add("dragging"), 0);
    //                 });

    //                 item.addEventListener("touchend", () => {
    //                     // Update the list order based on current DOM positions
    //                     this.list = Array.from(sortableList.querySelectorAll('.point')).map(li => li.feature);
    //                     this.saveList();

    //                     // Update remove button data-index attributes
    //                     for (let [index, button] of sortableList.querySelectorAll(`.point .remove`).entries()) {
    //                         button.setAttribute("data-index", index);
    //                     }

    //                     // Remove dragging class
    //                     item.classList.remove("dragging");
    //                 });
    //             }

    //             const initSortableList = (e) => {
    //                 e.preventDefault();
    //                 const draggingItem = sortableList.querySelector(".dragging");

    //                 // Get all items except the dragging one
    //                 const siblings = [...sortableList.querySelectorAll(".point:not(.dragging)")];

    //                 // Find the sibling after which the dragging item should be placed
    //                 const nextSibling = siblings.find(sibling => {
    //                     return e.touches[0].clientY <= sibling.offsetTop + sibling.offsetHeight / 2;
    //                 });

    //                 // Insert the dragging item before the found sibling
    //                 sortableList.insertBefore(draggingItem, nextSibling);
    //             };

    //             sortableList.addEventListener("touchmove", initSortableList);
    //             sortableList.addEventListener("touchenter", e => e.preventDefault());
    //         }
    //     }


}
