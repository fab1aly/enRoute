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

    const inputElt = document.querySelector('.searchbar>input');

    // Écoutez les changements sur le champ de texte de l'adresse.
    inputElt.addEventListener("input", async() => {

        //si l'adresse a plus de 8 charactere
        if (inputElt.value.length >= 8) {

            // Recherchez l'adresse.
            const results = await searchAddress(inputElt.value);

            // Afficher les résultats de la recherche.
            const listElt = document.querySelector('.searchbar>ul');
            const templateElt = document.querySelector('#searchbar-template');
            // console.log(templateElt);

            listElt.replaceChildren(); //clean list
            // console.log(results);
            for (let result of results.features) {

                const resultElt = templateElt.content.cloneNode(true);

                resultElt.querySelector('li').textContent = result.properties.label;
                resultElt.querySelector('li').feature = result; //pour garder objet

                listElt.append(resultElt);
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
