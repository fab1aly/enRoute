// document.addEventListener('DOMContentLoaded', function() {

// const routesElement = document.querySelector(`#my_routes`);
// const list_routes = routesElement.querySelector('select');

function displayList_routes() {
    const list_routes = document.querySelector('#my_routes select');
    const list_point = JSON.parse(list_routes.value);

    const route = new ListPoint(list_point);
    route.displayList();
}

displayList_routes();


// event listener
// change select 
document.querySelector('#my_routes select').addEventListener('change', () => {
    console.log(document.querySelector('#my_routes select'))
    // return
    displayList_routes();
});


// click load button
document.querySelector(`#my_routes`).addEventListener('click', () => {
    if (event.target.matches('#my_routes form button')) {
        document.querySelector('#my_routes form').submit();
    }
});


// });
