// document.addEventListener('DOMContentLoaded', function() {

async function searchAddress(address) {

    // API BAN 
    const url = 'https://api-adresse.data.gouv.fr/search/?q=';
    const addressPlus = address.replaceAll(' ', '+');

    const response = await fetch(url + addressPlus);
    const data = await response.json();

    console.log(data);
    return data;
}
const inputElt = document.querySelector('#searchbar input');

// Écoutez les changements sur le champ de texte de l'adresse.
inputElt.addEventListener("input", async() => {

    const inputValue = inputElt.value;

    if (inputValue.length >= 8) {

        // Attend que la promesse renvoyée par la fonction searchAddress() soit résolue.
        const results = await searchAddress(inputValue);

        // Afficher les résultats de la recherche.
        const ul = document.querySelector(`#searchbar ul`);
        ul.replaceChildren();

        for (let result of results.features) {

            const span = document.createElement('span');
            span.textContent = result.properties.label;

            const li = document.createElement('li');
            li.feature = result; //pour garder geojson

            li.appendChild(span);
            ul.appendChild(li);
        }
    }
});

const searchbar = document.querySelector('#searchbar');

searchbar.addEventListener("click", () => {
    if (event.target.matches('li')) {

        console.log(event.target.feature);
        local_list.addPoint(event.target.feature);

        const ul = document.querySelector(`#searchbar ul`);
        ul.replaceChildren();
    }
});





// });
