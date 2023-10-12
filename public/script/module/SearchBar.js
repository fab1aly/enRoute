// document.addEventListener('DOMContentLoaded', function() {

export default class SearchBar {

    constructor(list, posText = null) {

        this.inputElement = document.querySelector('#searchbar input');
        this.resultsList = document.querySelector('#searchbar ul');
        this.list = list;
        this.posText = posText;

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

        // event listener for click result
        this.resultsList.addEventListener("click", (event) => {
            this.handleResultClick(event.target);
        });
    }

    async searchAddress(address) {
        const url = "https://api-adresse.data.gouv.fr/search/?";
        const addressPlus = "&q=" + address.replaceAll(' ', '+');

        if (this.posText !== null || undefined) {
            const response = await fetch(url + addressPlus + this.posText);
            return response.json();
        }
        else {
            const response = await fetch(url + addressPlus);
            return response.json();
        }


        // const response = await fetch(url + addressPlus + this.posText);
        // return response.json();
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




// ////////////////////////////////////////////////////////////////////////////////
// ////////////////////////////////////////////////////////////////////////////////
// async function searchAddress(address, position = null) {

//     // API BAN 
//     const url = "https://api-adresse.data.gouv.fr/search/?";
//     const addressPlus = "&q=" + address.replaceAll(' ', '+');

//     const response = await fetch(url + addressPlus + position);
//     const data = await response.json();

//     console.log(data);
//     return data;
// }
// const inputElt = document.querySelector('#searchbar input');

// // event input
// inputElt.addEventListener("input", async() => {

//     const ul = document.querySelector(`#searchbar ul`);

//     const inputValue = inputElt.value;
//     if (inputValue.length >= 8) {

//         // Attend que la promesse renvoyée par la fonction searchAddress() soit résolue.
//         const results = await searchAddress(inputValue, pos.posText);

//         // Afficher les résultats de la recherche.

//         ul.replaceChildren();

//         for (let result of results.features) {

//             const span = document.createElement('span');
//             span.textContent = result.properties.label;

//             const li = document.createElement('li');
//             li.feature = result; //pour garder geojson

//             li.appendChild(span);
//             ul.appendChild(li);
//         }
//     }

//     else {
//         ul.replaceChildren();
//     }
// });

// // // event click
// // const searchbar = document.querySelector('#searchbar');

// // searchbar.addEventListener("click", () => {
// //     if (event.target.matches('li')) {

// //         console.log(event.target.feature);
// //         local_list.addPoint(event.target.feature);

// //         const ul = document.querySelector(`#searchbar ul`);
// //         ul.replaceChildren();
// //     }
// // });

// const ul = document.querySelector('#searchbar ul');

// ul.addEventListener("click", (event) => {
//     const target = event.target;

//     // Vérifier si l'élément cible est un <li> ou un <span>
//     if (target.matches('li') || target.matches('span')) {
//         // Si c'est un <li>, utilisez event.target
//         if (target.matches('li')) {
//             console.log(target.textContent);
//             // Faites ce que vous devez faire avec le <li> (par exemple, local_list.addPoint())
//             local_list.addPoint(target.feature);
//         }
//         // Si c'est un <span>, accédez à son parent <li> et obtenez le texte de celui-ci
//         else if (target.matches('span')) {
//             const li = target.closest('li');
//             if (li) {
//                 console.log(li.textContent);
//                 // Faites ce que vous devez faire avec le <li> (par exemple, local_list.addPoint())
//                 local_list.addPoint(li.feature);
//             }
//         }

//         // Remplacez le contenu de la liste (cette partie peut être ajustée en fonction de vos besoins)
//         // const ul = document.querySelector(`#searchbar ul`);
//         // ul.innerHTML = '';
//         ul.replaceChildren();
//     }
// });



// });
