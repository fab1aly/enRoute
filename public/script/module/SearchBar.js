// document.addEventListener('DOMContentLoaded', function() {

export default class SearchBar {

    constructor(list, position = null) {


        this.list = list;
        this.position = position;

        this.glassElement = document.querySelector('#search_glass');
        this.inputElement = document.querySelector('#search_input');
        this.crossElement = document.querySelector('#search_cross');
        this.resultsList = document.querySelector('#searchbar ul');


        // event listener for input search
        this.inputElement.addEventListener("input", async () => {
            const inputValue = this.inputElement.value; console.log("searchbar");
            if (inputValue.length >= 5) {
                const results = await this.searchAddress(inputValue);
                this.displayResults(results);
            }
            else {
                this.clearResults();
            }
        });

        // event listener for set input at click glass
        this.glassElement.addEventListener("click", () => {
            this.inputElement.focus();
        });

        // event listener for click result
        this.resultsList.addEventListener("click", (event) => {
            this.handleResultClick(event.target);
            this.inputElement.value = "";
        });

        // event listener for delete input at click cross
        this.crossElement.addEventListener("click", () => {
            this.inputElement.value = "";
            this.clearResults();
        });
    }

    async searchAddress(address) {
        const url = "https://api-adresse.data.gouv.fr/search/?";
        const addressPlus = "&q=" + address.replaceAll(' ', '+');

        const latText = this.position.getLat();
        const lonText = this.position.getLon();

        if (latText && lonText) {
            const posText = '&lat=' + latText + '&lon=' + lonText;
            // console.log(posText)
            const response = await fetch(url + addressPlus + posText);
            return response.json();
        }

        else {
            const response = await fetch(url + addressPlus);
            return response.json();
        }
    }

    displayResults(results) {
        this.resultsList.style.display = "block";
        this.resultsList.innerHTML = "";
        for (let result of results.features) {
            const span = document.createElement('span');
            span.textContent = result.properties.label;
            const li = document.createElement('li');
            li.classList.add('color-neutral-item-noborder');
            li.feature = result;
            li.appendChild(span);
            this.resultsList.appendChild(li);
        }
    }

    clearResults() {
        this.resultsList.replaceChildren();
        this.resultsList.style.display = "none";
    }

    handleResultClick(target) {
        if (target.matches('li')) {
            const feature = target.feature;
            this.addPointToList(feature);
        }
        else if (target.matches('span')) {
            const li = target.closest('li');
            if (li) {
                const feature = li.feature;
                this.addPointToList(feature);
            }
        }
        this.clearResults();
    }

    addPointToList(feature) {
        console.log("Ajouter du point dans la liste : ", feature.properties.label);
        this.list.addPoint(feature);


    }
}
