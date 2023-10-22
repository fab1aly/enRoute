// document.addEventListener('DOMContentLoaded', function() {

export default class SearchBar {

    constructor(list, position = null) {

        this.inputElement = document.querySelector('#searchbar input');
        this.crossElement = document.querySelector('#searchbar span span');
        this.resultsList = document.querySelector('#searchbar ul');
        this.list = list;
        this.position = position;

        // event listener for input search
        this.inputElement.addEventListener("input", async() => {
            const inputValue = this.inputElement.value;
            if (inputValue.length >= 8) {
                const results = await this.searchAddress(inputValue);
                this.displayResults(results);
            }
            else {
                this.clearResults();
            }
        });

        // event listener for delete input at click cross
        this.crossElement.addEventListener("click", () => {
            this.inputElement.value = "";
            this.clearResults();
        });

        // event listener for click result
        this.resultsList.addEventListener("click", (event) => {
            this.handleResultClick(event.target);
            this.inputElement.value = "";
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
        this.resultsList.innerHTML = "";
        for (let result of results.features) {
            const span = document.createElement('span');
            span.textContent = result.properties.label;
            const li = document.createElement('li');
            li.feature = result;
            li.appendChild(span);
            this.resultsList.appendChild(li);
        }
    }

    clearResults() {
        this.resultsList.replaceChildren();
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
        // Ajoutez ici la logique pour ajouter le point sur la carte
        console.log("Ajouter le point sur la carte : ", feature.properties.label);
        this.list.addPoint(feature);


    }
}


////////////////////////////////////////////////////////////////////////////////
// ////////////////////////
// // Utilisation de la classe SearchBar avec les éléments DOM appropriés
// const inputElement = document.querySelector('#searchbar input');
// const resultsList = document.querySelector('#searchbar ul');
// const map = {} // Remplacez ceci par votre objet de carte

// const searchBar = new SearchBar(inputElement, resultsList, map);
