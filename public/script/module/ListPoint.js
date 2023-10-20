export default class ListPoint {
    /**
     * Creates a new list point.
     * @param {string} name The name of the list point.
     * @param {string} divId The ID of the div element where the list point will be displayed.
     */
    constructor(map = null, name = "local_list", listpoint = [], divId = "listpoint") {

        this.list = listpoint;
        this.nameList = name;

        // this.listElement = document.querySelector(`#${divId}`);
        // this.ul = document.querySelector(`#${divId} ul`);

        this.map = map;
        if (this.map) {
            // init layer point group 
            this.pointLayerGroup = L.layerGroup()
            this.pointLayerGroup.addTo(this.map);
            // init layer line group
            this.lineLayerGroup = L.layerGroup()
            this.lineLayerGroup.addTo(this.map);

            // select elements
            this.listElement = document.querySelector(`#${divId}`);
            this.ul = document.querySelector(`#${divId} ul`);

            //init listener
            this.displayRemoveSelected()
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

        this.displayList();
        this.displayPoints();
        this.displayRouteSetTotal();
    }

    //display points in map
    displayPoints() {

        // clean map
        this.map.removeLayer(this.pointLayerGroup);
        // make new group
        this.pointLayerGroup = L.layerGroup()

        // init layer point group 
        this.pointLayerGroup.addTo(this.map);

        for (let point of this.list) {
            // Create a marker for point
            const marker = L.marker([point.geometry.coordinates[1], point.geometry.coordinates[0]]);
            // Add the marker to the layer group
            this.pointLayerGroup.addLayer(marker);
        }

        // Add the layer group to the map
        this.pointLayerGroup.addTo(this.map);

    }

    //display route in map and set total element with 
    displayRouteSetTotal() {
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

        const totalElement = document.querySelector("#listpoint .total span");
        totalElement.textContent = `Total : calcul en cours ...`;

        displayRoutes();
        this.lineLayerGroup.addTo(this.map);
    }

    // display points element
    displayList() {
        // clean ul
        this.ul.replaceChildren();

        if (this.list.length > 0) {
            // for display points in list
            for (let [index, point] of this.list.entries()) {

                if (point == null || point == undefined) {
                    this.removePoint(index);
                }
                const template = this.listElement.querySelector(`template`);

                const li = template.content.cloneNode(true);
                li.feature = point; //for save geojson data

                // console.log(li)
                // li.textContent = point.properties.label;
                const label = li.querySelector('.label');
                label.textContent = point.properties.label;
                label.feature = point; //for save geojson

                const remove = li.querySelector(`.remove`);
                if (remove != null) {
                    remove.setAttribute("data-index", index);
                }

                this.ul.appendChild(li);
            }
        }
    }

    ////////////////////////////////////////////////////////////////////////////
    // Add event listeners for toggle selected point and remove by cross
    displayRemoveSelected() {
        const ul = this.listElement.querySelector(`ul`);
        ul.addEventListener('click', (event) => {

            // function for set view
            function setViewOnPoint(feature, map) {
                map.setView([feature.geometry.coordinates[1], feature.geometry.coordinates[0]], 15);
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
            }
            // if click span, get li
            let li;
            if (event.target.matches('span')) {
                li = event.target.closest('li');
                setViewOnPoint(event.target.feature, this.map);
            }
            else if (event.target.matches('li')) {
                li = event.target;
                const span = event.target.querySelector('.label');
                if (span) {
                    setViewOnPoint(span.feature, this.map);
                }
            }
            if (li) {
                displaySelect(li, ul);
            }

            // remove point by cross
            if (event.target.matches('.remove i')) {
                // console.log(event.target.dataset.index);
                const li = event.target.closest('.remove');
                this.removePoint(li.dataset.index);
            }
        });
    }

    // Add event listeners for drag and drop
    dragAndDrop() {
        const sortableList = this.ul;
        // console.log(sortableList)

        if (this.ul.querySelectorAll('.point').length > 0) {
            const items = sortableList.querySelectorAll('.point');

            for (let item of items) {
                item.addEventListener("dragstart", () => {
                    console.log('drag');
                    // Adding dragging class to item after a delay
                    setTimeout(() => item.classList.add("dragging"), 0);
                });
                // Removing dragging class from item on dragend event
                item.addEventListener("dragend", () => {

                    // update the list 
                    this.list = [];
                    for (let li of this.ul.querySelectorAll(`.point`)) {
                        this.list.push(li.feature);
                    }
                    this.saveList();

                    // update the remove button
                    for (let [index, button] of this.ul.querySelectorAll(`.point button`).entries()) {
                        button.setAttribute("data-index", index);
                    }

                    // Removing dragging class from item
                    item.classList.remove("dragging");
                });
            }
            const initSortableList = (e) => {
                e.preventDefault();
                const draggingItem = this.ul.querySelector(".dragging");

                // Getting all items except currently dragging and making array of them
                let siblings = [...sortableList.querySelectorAll(".point:not(.dragging)")];
                // Finding the sibling after which the dragging item should be placed
                let nextSibling = siblings.find(sibling => {
                    return e.clientY <= sibling.offsetTop + sibling.offsetHeight / 2;
                });
                // Inserting the dragging item before the found sibling
                sortableList.insertBefore(draggingItem, nextSibling);
            };

            sortableList.addEventListener("dragover", initSortableList);
            sortableList.addEventListener("dragenter", e => e.preventDefault());
        }
    }

}
