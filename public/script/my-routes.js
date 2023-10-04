// document.addEventListener('DOMContentLoaded', function() {

const routesElement = document.querySelector(`#my_routes`);

function test() {
    const name = list_routes.querySelector('option').name;
    const list_point = JSON.parse(list_routes.querySelector('option').value);

    const route = new ListPoint("listpoint", name, list_point);
    route.displayList();
}

// test();


// event listener
const list_routes = routesElement.querySelector('select');

list_routes.addEventListener('change', () => {

    test();

});


// event listener click

routesElement.addEventListener('click', () => {
    // for save list in db
    if (event.target.matches('#my_routes form button')) {
        // document.querySelector('#my_routes form').submit();
    }
});


// });
