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

const inputElt = document.querySelector('search>input');

// Écoutez les changements sur le champ de texte de l'adresse.
inputElt.addEventListener("input", async() => {

    //si l'adresse a plus de 8 charactere
    if (inputElt.value.length >= 8) {

        // Recherchez l'adresse.
        const results = await searchAddress(inputElt.value);

        // Afficher les résultats de la recherche.
        const ul = document.querySelector(`search>ul`);
        ul.replaceChildren();

        // console.log(results);
        for (let result of results.features) {

            const li = document.createElement('li');
            li.textContent = result.properties.label;
            li.feature = result; //pour garder geojson

            ul.appendChild(li);
        }
    }
});


const searchElt = document.querySelector('.searchbar');
searchElt.addEventListener("click", () => {
    if (event.target.matches('li')) {
        console.log(event.target.feature);

        list.addPoint(event.target.feature);
    }
});



// });
