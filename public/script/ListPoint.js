class ListPoint {
    /**
     * Creates a new list point.
     * @param {string} name The name of the list point.
     * @param {string} divId The ID of the div element where the list point will be displayed.
     */
    constructor(listpoint = [], name = "local_list", divId = "listpoint") {

        this.nameList = name;
        this.idListElement = divId;
        this.list = listpoint;

        // this.loadList();
        // this.displayList();
    }


    //function for display the points in div 
    displayList(elementID = this.idListElement) {

        // clean ul
        const ul = document.querySelector(`#${elementID} ul`);
        ul.replaceChildren();

        if (this.list.length > 0) {
            // for display points in list
            for (let [index, point] of this.list.entries()) {

                //make li from point
                const li = document.createElement('li');
                li.classList.add('point');
                li.setAttribute("draggable", true);
                li.textContent = point.properties.label;
                li.feature = point; //for save geojson

                // make button for remove
                const button = document.createElement('button');
                button.classList.add('remove');
                button.textContent = '-';
                button.setAttribute("data-index", index);

                // add button in li
                li.appendChild(button);
                // add li in ul
                ul.appendChild(li);
            }
        }

        // add list in json in input for the save form 
        if (document.querySelector('#listpoint form ') !== null) {
            document.querySelector('#listpoint form :nth-child(2)').value = JSON.stringify(this.list);
        }

        // this.dragAndDrop();


        // // listener for save button
        // const button = document.querySelector(`#listpoint form :nth-child(4)`);
        // // console.log(button)

        // button.addEventListener('click', () => { this.saveListInDB() });
        // //this.saveListInDB.bind(this)  // a tester ?

        // // Créez l'élément bouton
        // const button = document.createElement('button');
        // button.textContent = 'Enregistrer';

        // // Ajoutez l'écouteur d'événement click à l'élément bouton
        // button.addEventListener('click', () => { this.saveListInDB() });

        // // Ajoutez l'élément bouton à l'élément ul
        // ul.appendChild(button);

    }

    // Add event listeners for drag and drop
    dragAndDrop() {
        const sortableList = document.querySelector(`#${this.idListElement}>ul`);
        // console.log(sortableList)

        if (document.querySelectorAll('.point').length > 0) {
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
                    for (let li of document.querySelectorAll(`.point`)) {
                        this.list.push(li.feature);
                    }
                    this.saveList();

                    // update the remove button
                    for (let [index, button] of document.querySelectorAll(`.point button`).entries()) {
                        button.setAttribute("data-index", index);
                    }

                    // Removing dragging class from item
                    item.classList.remove("dragging");
                });
            }
            const initSortableList = (e) => {
                e.preventDefault();
                const draggingItem = document.querySelector(".dragging");

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
    }

    //remove point in list by index
    removePoint(index) {
        this.list.splice(index, 1);
        console.log("remove point at index " + index);

        this.saveList();
    }

    //method for save list in local storage
    saveList() {
        window.localStorage.setItem(`${this.nameList}`, JSON.stringify(this.list));

        console.log(`save 'local_list' in localStorage :`);
        console.log(this.list);
        this.displayList();

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

    //     // Method to save the list in the database
    //     saveListInDB() {
    //         console.log(this);
    //         // Getting the list as a JSON string
    //         // const listAsJSON = JSON.stringify(this.list);
    //         // const listName = this.nameList;

    //         // const form = new FormData(document.getElementById("login-form"));

    //         // Making an AJAX request to the database

    //         document.querySelector('#listpoint form :nth-child(2)').value = JSON.stringify(this.list);
    //         //input[type="hidden"]

    //         return;

    //         fetch('./save-in-db', {
    //                 method: "POST",
    //                 headers: {
    //                     "Content-Type": "application/json",
    //                     // "Content-Type": "text/plain",
    //                 },
    //                 body: this
    //             })
    //             .then((response) => {
    //                 // Checking the response status code
    //                 if (response.status === 200) {
    //                     // The list was successfully saved
    //                 }
    //                 else {
    //                     // An error occurred
    //                     console.log(response.status);
    //                 }
    //             })
    //             .catch((error) => {
    //                 // An error occurred
    //                 console.log(error);
    //             });
    // }
}
