

// function for toggle select li (route) in ul (routes)
function displaySelect(li) {
    if (li.classList.contains('selected') == false) {
        const old = document.querySelector('#list_routes ul .selected');
        if (old) {
            old.classList.remove('selected');
        }
        li.classList.add('selected');
    }
    // add id list in load form 
    const input = document.querySelector('#load_input');
    input.value = li.dataset.uniqid;
}



////////////////////////////////////////////////////////////////////////////////
// on start init ListPoint and display last route
import ListPoint from "./module/ListPoint.js";
const list_routes = document.querySelector('#list_routes ul');
let route;

if (list_routes.querySelector('li')) {

    // set scroll at end of ul
    list_routes.scrollTop = list_routes.scrollHeight;

    // select last li
    const li = document.querySelector('#list_routes ul li:last-child');
    displaySelect(li);

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
document.querySelector('#list_routes ul').addEventListener('click', () => {

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
    }
});
////////////////////////////////////////////////////////////////////////////////

// init Position
import Position from "./module/Position.js";
const pos = new Position(map);


// });
