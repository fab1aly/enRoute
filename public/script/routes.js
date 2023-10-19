// document.addEventListener('DOMContentLoaded', function() {

// function for toggle select li (route) in ul (routes)
function displaySelect(li) {
    if (li.classList.contains('selected')) {
        li.classList.remove('selected');
        li.querySelector('.remove').style.display = "none";
    }
    else {
        const old = list_routes.querySelector('.selected');
        if (old != null) {
            old.classList.remove('selected');
            old.querySelector('.remove').style.display = "none";
        }
        li.classList.add('selected');
        li.querySelector('.remove').style.display = "inline-block";
    }
}

// function for add uniqid to load form input
function setUniqidInLoadForm(li) {
    const input = document.querySelector('#listpoint form input');
    input.setAttribute('value', li.dataset.uniqid);
}

// function for set modal info
function setInputAndModal(li) {
    const modal_info = document.querySelector('#modal p');
    modal_info.textContent = 'Effacer : ' + li.dataset.name;
}

//   const setViewOnPoint = (feature, map) => {
//         map.setView([feature.geometry.coordinates[1], feature.geometry.coordinates[0]], 15);
//     };

////////////////////////////////////////////////////////////////////////////////
// on start display last route
import ListPoint from "./module/ListPoint.js";
const list_routes = document.querySelector('#routes ul');
let route;

if (list_routes.querySelector('li')) {

    // set scroll at end of ul
    list_routes.scrollTop = list_routes.scrollHeight;

    // select last li
    const li = document.querySelector('#routes ul li:last-child');
    displaySelect(li);
    setUniqidInLoadForm(li);
    setInputAndModal(li);

    //display li list point
    const first_route_list = JSON.parse(li.dataset.value);
    route = new ListPoint(map, 'route', first_route_list);
    route.displayInit();
}


////////////////////////////////////////////////////////////////////////////////
// routes ul listener
document.querySelector('#routes ul').addEventListener('click', (event) => {

    // select routes (li)
    let li;
    if (event.target.matches('span')) {
        li = event.target.closest('li');
        // setViewOnPoint(event.target.feature, this.map); // Utilisez event.target.parentElement pour accéder à l'élément li parent
    }
    else if (event.target.matches('li')) {
        li = event.target;
        const span = event.target.querySelector('.label');
        if (span) {
            // setViewOnPoint(span.feature, this.map);
        }
    }
    if (li) {
        displaySelect(li);
        setUniqidInLoadForm(li);
        setInputAndModal(li);

        const list_point = JSON.parse(li.dataset.value);
        route.setList(list_point);
        route.displayInit();
    }

    // remove route
    if (event.target.matches('.remove i')) {
        const li = event.target.closest('li');

        const input = document.querySelector('#routes form input');
        input.setAttribute('value', li.dataset.uniqid);

        modal.style.display = "flex";
    }
});

////////////////////////////////////////////////////////////////////////////
// Seleted Point event listener (toggle selected point)
const listpoint = document.querySelector('#listpoint');
listpoint.addEventListener('click', () => {
    function setViewOnPoint(feature, map) {
        map.setView([feature.geometry.coordinates[1], feature.geometry.coordinates[0]], 15);
    }

    let li;
    if (event.target.matches('span')) {
        li = event.target.closest('li');
        setViewOnPoint(event.target.feature, map);
    }
    else if (event.target.matches('li')) {
        li = event.target;
        const span = event.target.querySelector('.label');
        if (span) {
            setViewOnPoint(span.feature, map);
        }
    }
    if (li) {
        if (li.classList.contains('selected')) {
            li.classList.remove('selected');
            if (li.querySelector('.remove') != null) {
                li.querySelector('.remove').style.display = "none";
            }

        }
        else {
            const old = listElement.querySelector('.selected');
            if (old != null) {
                old.classList.remove('selected');
                if (old.querySelector('.remove') != null) {
                    old.querySelector('.remove').style.display = "none";
                }
            }
            li.classList.add('selected');
            if (li.querySelector('.remove') != null) {
                li.querySelector('.remove').style.display = "inline-block";
            }
        }
    }
});


////////////////////////////////////////////////////////////////////////////////
// modal listner
const modal = document.querySelector("#modal");

// When clicks on the button, remove list (submit)
const button = document.querySelector("#modal button");
button.addEventListener('click', () => {
    document.querySelector('#routes form').submit();
});

// When clicks on cross (x) <span> , close the modal
const cross = document.querySelector("#modal .cross i");
cross.addEventListener('click', () => {
    modal.style.display = "none";
});

// When clicks anywhere outside of the modal, close it
const header = document.querySelector("header");
document.addEventListener('click', () => {
    if (event.target == modal || event.target.closest('header') == header) {
        modal.style.display = "none";
    }
});

////////////////////////////////////////////////////////////////////////////////

// init Position
import Position from "./module/Position.js";
const pos = new Position(map);

// ListPoint event listener
const listElement = document.querySelector(`#listpoint`);
listElement.addEventListener('click', (event) => {

    // set view at position
    if (event.target.matches('.position') || event.target.matches('.position span')) {
        map.setView(pos.getCoordsArray(), 15);
    }

    // click load button
    if (event.target.matches('form button')) {
        document.querySelector('#listpoint form').submit();
    }
});


// });
