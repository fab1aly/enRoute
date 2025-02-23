

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
    if (li.dataset.value) {
        const route_list = JSON.parse(li.dataset.value);
        route = new ListPoint(map, 'route', route_list);

        // display li ListPoint
        route.displayInit();
        route.eventListenerInit();
        route.setViewOnAllPoint();
    } else {
        console.log('route_list is empty');
    }
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

// init Position
import Position from "./module/Position.js";
const pos = new Position(map);


// });
