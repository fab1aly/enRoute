// document.addEventListener('DOMContentLoaded', function() {





// let lat;
// let lon;
// let posText;

// function success(position) {
//     lat = (Math.round(position.coords.latitude * 1000)) / 1000;
//     lon = (Math.round(position.coords.longitude * 1000)) / 1000;

//     posText = '&lat=' + lat + '&lon=' + lon;
//     console.log(posText)
// }

// function error() {
//     alert("Sorry, no position available.");
// }

// function updateLatLon() {
//     navigator.geolocation.getCurrentPosition(success, error);
// }

// const options = {
//     enableHighAccuracy: true,
//     maximumAge: 30000,
//     timeout: 27000,
// };

// const watchID = navigator.geolocation.watchPosition(updateLatLon, error, options);

// // Ajout d'un écouteur d'événements sur l'événement "change"
// navigator.geolocation.addEventListener('change', updateLatLon);


async function searchAddress(address, position = null) {

    // API BAN 
    const url = "https://api-adresse.data.gouv.fr/search/?";
    const addressPlus = "&q=" + address.replaceAll(' ', '+');

    const response = await fetch(url + addressPlus + position);
    const data = await response.json();

    console.log(data);
    return data;
}
const inputElt = document.querySelector('#searchbar input');

// event input
inputElt.addEventListener("input", async() => {

    const ul = document.querySelector(`#searchbar ul`);

    const inputValue = inputElt.value;
    if (inputValue.length >= 8) {

        // Attend que la promesse renvoyée par la fonction searchAddress() soit résolue.
        const results = await searchAddress(inputValue, position.posText);

        // Afficher les résultats de la recherche.

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

    else {
        ul.replaceChildren();
    }
});

// // event click
// const searchbar = document.querySelector('#searchbar');

// searchbar.addEventListener("click", () => {
//     if (event.target.matches('li')) {

//         console.log(event.target.feature);
//         local_list.addPoint(event.target.feature);

//         const ul = document.querySelector(`#searchbar ul`);
//         ul.replaceChildren();
//     }
// });

const ul = document.querySelector('#searchbar ul');

ul.addEventListener("click", (event) => {
    const target = event.target;
    
    // Vérifier si l'élément cible est un <li> ou un <span>
    if (target.matches('li') || target.matches('span')) {
        // Si c'est un <li>, utilisez event.target
        if (target.matches('li')) {
            console.log(target.textContent);
            // Faites ce que vous devez faire avec le <li> (par exemple, local_list.addPoint())
            local_list.addPoint(target.feature);
        }
        // Si c'est un <span>, accédez à son parent <li> et obtenez le texte de celui-ci
        else if (target.matches('span')) {
            const li = target.closest('li');
            if (li) {
                console.log(li.textContent);
                // Faites ce que vous devez faire avec le <li> (par exemple, local_list.addPoint())
                local_list.addPoint(li.feature);
            }
        }

        // Remplacez le contenu de la liste (cette partie peut être ajustée en fonction de vos besoins)
        // const ul = document.querySelector(`#searchbar ul`);
        // ul.innerHTML = '';
        ul.replaceChildren();
    }
});



// });
