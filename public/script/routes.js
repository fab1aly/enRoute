// document.addEventListener('DOMContentLoaded', function() {

// function for toggle select li (route) in ul (routes)
function displaySelect(li, ul) {
    if (li.classList.contains('selected') == false) {
        const old = ul.querySelector('.selected');
        if (old) {
            old.classList.remove('selected');
        }
        li.classList.add('selected');
    }
}


// function for set modal info and input  ///////  RE-WORKING !!!  ///////////
function setModals(li) {

    const input_load_form = document.querySelector('#listpoint form input');
    if (input_load_form) {
        input_load_form.setAttribute('value', li.dataset.uniqid);
    }

    const modal_remove_namelist = document.querySelector('#modal_remove p');
    if (modal_remove_namelist) {
        modal_remove_namelist.textContent = li.dataset.name;
    }

    const modal_share_link = document.querySelector('#modal_share p');
    if (modal_share_link) {
        modal_share_link.textContent = "enRoute.fr/route?id=" + li.dataset.uniqid;
    }

}


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
    displaySelect(li, list_routes);
    // setUniqidInLoadForm(li);
    // setModals(li);

    //display li list point
    const first_route_list = JSON.parse(li.dataset.value);
    route = new ListPoint(map, 'route', first_route_list);
    route.displayInit();
    route.eventListenerInit();
    route.setViewOnAllPoint();

    // add id list in form load
    const input = document.querySelector('.total form input');
    input.value = li.dataset.uniqid;
}


////////////////////////////////////////////////////////////////////////////////
// routes ul listener
document.querySelector('#routes ul').addEventListener('click', (event) => {

    // select routes (li)
    let li;
    if (event.target.matches('span')) {
        li = event.target.closest('li');
    }
    else if (event.target.matches('li')) {
        li = event.target;
    }
    if (li) {
        displaySelect(li, list_routes);
        setModals(li);

        const list_point = JSON.parse(li.dataset.value);
        route.setList(list_point);
        route.displayInit();
        route.setViewOnAllPoint();
    }

    // remove route
    if (event.target.matches('.remove i')) {
        const li = event.target.closest('li');

        const input = document.querySelector('#routes form input');
        input.setAttribute('value', li.dataset.uniqid);

        const modal = document.querySelector("#modal");
        modal.style.display = "flex";

        const legend = modal.querySelector("fieldset legend");
        legend.textContent = "Attention";
        const span = modal.querySelector("fieldset span");
        span.textContent = "Voulez-vous supprimer cette route ?";
        const p = modal.querySelector("fieldset p");
        p.textContent = li.dataset.name;
        const button = modal.querySelector("button");
        button.style.display = "inline";

    }

    // share route
    if (event.target.matches('.share i')) {

        const li = event.target.closest('li');

        const modal = document.querySelector("#modal");
        modal.style.display = "flex";

        const legend = modal.querySelector("fieldset legend");
        legend.textContent = "Partage";
        const span = modal.querySelector("fieldset span");
        span.textContent = " Voici un lien pour partager cette route ";
        const p = modal.querySelector("fieldset p");
        p.textContent = "enRoute.fr/route?id=" + li.dataset.uniqid;
        const button = modal.querySelector("button");
        button.style.display = "none";

    }
});

////////////////////////////////////////////////////////////////////////////////




////////////////////////////////////////////////////////////////////////////////
// modal listner
const modal = document.querySelector(".modal");

// When clicks on the button, remove list (submit)
const button = document.querySelector("#modal button");
if (button) {
    button.addEventListener('click', () => {
        document.querySelector('#routes form').submit();
    });
}

// When clicks on cross (x) <span> , close the modal
const cross = document.querySelector("#modal .cross i");
if (cross) {
    cross.addEventListener('click', () => {
        const modal = document.querySelector("#modal");
        modal.style.display = "none";
    });
}

// When clicks anywhere outside of the modal, close it
const header = document.querySelector("header");
document.addEventListener('click', () => {
    if (event.target == modal || event.target.closest('header') == header) {
        const modal = document.querySelector("#modal");
        modal.style.display = "none";
    }
});


////////////////////////////////////////////////////////////////////////////////

// init Position
import Position from "./module/Position.js";
const pos = new Position(map);

// ListPoint event listener
const listElement = document.querySelector(`#listpoint`);
if (listElement) {
    listElement.addEventListener('click', (event) => {
        // click load button
        if (event.target.matches('form button')) {
            document.querySelector('#listpoint form').submit();
        }
    });
}



// });
