export default class ListPoint {
    /**
     * Creates a new list point.
     * @param {string} name The name of the list point.
     * @param {string} divId The ID of the div element where the list point will be displayed.
     */
    constructor(map, listpoint = [], name = "local_list", divId = "listpoint") {

        this.list = listpoint;
        this.nameList = name;

        this.listElement = document.querySelector(`#${divId}`);
        this.ul = document.querySelector(`#${divId} ul`);

        this.map = map;
        // init layer point group 
        this.pointLayerGroup = L.layerGroup()
        this.pointLayerGroup.addTo(this.map);




    }
    getListPointArray() {
        return this.list;
    }


    //function for display the points in div and map 
    // play thi
    displayList() {

        // clean ul
        this.ul.replaceChildren();

        // remove old group point layer
        this.map.removeLayer(this.pointLayerGroup);
        // make new group
        this.pointLayerGroup = L.layerGroup()

        if (this.list.length > 0) {
            // for display points in list
            for (let [index, point] of this.list.entries()) {


                const template = this.listElement.querySelector(`template`);

                const li = template.content.cloneNode(true);
                li.feature = point; //for save geojson


                // console.log(li)
                // li.textContent = point.properties.label;
                const label = li.querySelector('.label');
                label.textContent = point.properties.label;
                label.feature = point; //for save geojson

                const remove = li.querySelector(`.remove`);
                remove.setAttribute("data-index", index);

                this.ul.appendChild(li);



                // Create a marker for each point
                const marker = L.marker([point.geometry.coordinates[1], point.geometry.coordinates[0]]);
                // Add the marker to the layer group
                this.pointLayerGroup.addLayer(marker);
            }
        }

        // Add the layer group to the map
        this.pointLayerGroup.addTo(this.map);

        // add list in json in input for the save form 
        if (document.querySelector('#listpoint form ') !== null) {
            document.querySelector('#listpoint form :nth-child(1)').value = JSON.stringify(this.list);
        }

        this.selectPoint();


    }

    selectPoint() {
        if (this.getListPointArray().length > 0) {
            const removeClassFromOldSelected = (ul) => {
                const olds = ul.querySelectorAll('.selected');
                if (olds.length > 0) {
                    for (let old of olds) {
                        old.classList.remove('selected');
                        old.querySelector('.remove').style.display = "none";
                    }
                }
            };

            const setViewOnPoint = (feature, map) => {
                map.setView([feature.geometry.coordinates[1], feature.geometry.coordinates[0]], 15);
            };

            const displayRemoveButton = (li) => {
                li.classList.add('selected');
                li.querySelector('.remove').style.display = "inline-block";
            };

            this.ul.addEventListener("click", (event) => {
                removeClassFromOldSelected(this.ul);
                let li;
                if (event.target.matches('span')) {
                    li = event.target.closest('li'); // Utilisez event.target.closest('li') pour obtenir l'élément li parent
                    setViewOnPoint(event.target.feature, this.map); // Utilisez event.target.parentElement pour accéder à l'élément li parent
                }
                else if (event.target.matches('li')) {
                    li = event.target;
                    const span = event.target.querySelector('.label');
                    if (span) {
                        setViewOnPoint(span.feature, this.map);
                    }
                }
                if (li) {
                    displayRemoveButton(li);
                }
            });
        }
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

    // add end point in list
    addPoint(feature) {
        this.list.push(feature);
        this.saveList();
        this.displayList();

        this.ul.scrollTop = this.ul.scrollHeight;
        this.map.setView([feature.geometry.coordinates[1], feature.geometry.coordinates[0]], 15);
    }

    //remove point in list by index
    removePoint(index) {
        this.list.splice(index, 1);
        console.log("remove point at index " + index);

        this.saveList();
        this.displayList();
    }





    //method for save list in local storage
    saveList() {
        window.localStorage.setItem(`${this.nameList}`, JSON.stringify(this.list));

        console.log(`save 'local_list' in localStorage :`);
        console.log(this.list);

    }

    //method for load list in local storage
    loadList() {
        if (window.localStorage.getItem(`${this.nameList}`)) {
            this.list = JSON.parse(window.localStorage.getItem(`${this.nameList}`));

            console.log(`load ${this.nameList} from localStorage :`);
            console.log(JSON.parse(window.localStorage.getItem(`${this.nameList}`)));
        }
        else {
            console.log(` no list in localStorage`);
        }
    }


}
