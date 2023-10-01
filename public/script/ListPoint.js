/**
 * Classe représentant un point dans un espace à deux dimensions.
 */
class ListPoint {
    /**
     * Crée un nouveau point avec les coordonnées x et y spécifiées.
     * @param {string} name - La coordonnée x du point.
     * @param {number} y - La coordonnée y du point.
     */
    constructor(name, divId) {
        this.idListElement = divId;
        this.nameList = name;
        this.list = [];
    }




    //add point in list from geocoding search
    /**
     * Calcule la distance entre ce point et un autre point.
     * @param {Object} feature - L'autre point à utiliser pour le calcul de la distance.
     * @return {number} La distance entre les deux points.
     */
    addPoint(feature) {
        this.list.push(feature);

        this.saveList();
        this.displayList();
    }

    //remove point in list with id
    removePoint(id) {
        for (let [index, point] of this.list.entries()) {
            if (point.properties.id == id) {
                this.list.pop(index);
                console.log("remove : " + id);
            }
        }
        this.displayList();
    }

    //method for save list in local storage
    saveList(nameInLocalStorage = this.nameList) {
        window.localStorage.setItem(`${nameInLocalStorage}`, JSON.stringify(this.list));

        console.log(`save '${nameInLocalStorage}' in localStorage :`);
        console.log(this.list);

    }

    //method for load list in local storage
    loadList(nameInLocalStorage = this.nameList) {
        this.list = JSON.parse(window.localStorage.getItem(`${nameInLocalStorage}`));

        console.log(`load '${nameInLocalStorage}' from localStorage :`);
        console.log(JSON.parse(window.localStorage.getItem(`${nameInLocalStorage}`)));
    }

    //function for display the points in div 
    displayList(elementID = this.idListElement) {

        if (this.list.length) {
            const div = document.querySelector(`#${elementID}`);

            div.replaceChildren();
            div.appendChild(document.createElement('ul'));

            for (let point of this.list) {

                const ul = document.querySelector(`#${elementID}>ul`);

                const li = document.createElement('li');
                li.classList.add('point');
                li.setAttribute("data-id", point.properties.id);
                li.textContent = point.properties.label;
                li.feature = point; //pour garder objet

                ul.appendChild(li);
            }
        }


    }
}
