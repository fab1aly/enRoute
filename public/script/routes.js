// document.addEventListener('DOMContentLoaded', function() {

// function for toggle select li (route) in ul (routes)
function displaySelect(li) {
    if (li.classList.contains('selected') == false) {
        const old = document.querySelector('#routes ul .selected');
        if (old) {
            old.classList.remove('selected');
        }
        li.classList.add('selected');
    }
}



////////////////////////////////////////////////////////////////////////////////
// on start init ListPoint and display last route
import ListPoint from "./module/ListPoint.js";
const list_routes = document.querySelector('#routes ul');
let route;

if (list_routes.querySelector('li')) {

    // set scroll at end of ul
    list_routes.scrollTop = list_routes.scrollHeight;

    // select last li
    const li = document.querySelector('#routes ul li:last-child');
    displaySelect(li, list_routes);

    // init ListPoint
    const route_list = JSON.parse(li.dataset.value);
    route = new ListPoint(map, 'route', route_list);

    // display li ListPoint
    route.displayInit();
    route.eventListenerInit();
    route.setViewOnAllPoint();

}


////////////////////////////////////////////////////////////////////////////////
// routes ul listener
document.querySelector('#routes ul').addEventListener('click', () => {

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

        // edit route ListPoint
        const list_point = JSON.parse(li.dataset.value);
        route.setList(list_point);
        route.displayInit();
        route.setViewOnAllPoint();

        // add id list in load form 
        const input = document.querySelector('#load_form input');
        input.value = li.dataset.uniqid;
    }

    // remove route
    if (event.target.matches('.remove i')) {
        const li = event.target.closest('li');

        const input = document.querySelector('#remove_form input');
        input.value = li.dataset.uniqid;

        // display modal
        const modal = document.querySelector("#modal");
        modal.style.display = "flex";

        // display modal
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

        // display modal
        const modal = document.querySelector("#modal");
        modal.style.display = "flex";

        // edit modal
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
// #load_form event listener
const listElement = document.querySelector(`#listpoint`);
if (listElement) {
    listElement.addEventListener('click', () => {
        // click load button
        if (event.target.matches('#load_form button')) {
            document.querySelector('#load_form').submit();
        }
    });
}

////////////////////////////////////////////////////////////////////////////////
// Modal listner
const modal = document.querySelector(".modal");

// When clicks on the button, remove list (submit)
const button = document.querySelector("#modal button");
if (button) {
    button.addEventListener('click', () => {
        document.querySelector('#remove_form').submit();
    });
}

// When clicks on cross (x) or modal , close the modal
const cross = document.querySelector("#modal .cross i");
document.addEventListener('click', () => {
    if (event.target == modal || event.target == cross) {
        modal.style.display = "none";
    }
});


////////////////////////////////////////////////////////////////////////////////

// init Position
import Position from "./module/Position.js";
const pos = new Position(map);





// });
