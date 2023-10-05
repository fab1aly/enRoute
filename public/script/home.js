// document.addEventListener('DOMContentLoaded', function() {

// on load position set view on it
navigator.geolocation.getCurrentPosition(function(e) {
    myMap.setView([e.coords.latitude, e.coords.longitude], 12);
    // myMap.setView([e.coords.latitude, e.coords.longitude], ((myMap.getZoom() >= 11) ? myMap.getZoom() : 11));
    console.log("position -> ok");
});

// init var
let local_list;

let list_element_value = document.querySelector('#listpoint').dataset.value;
console.log(list_element_value);

// if nothing in data value (come from POST)
if (list_element_value !== '') {
    local_list = new ListPoint(JSON.parse(list_element_value));
}
else {
    local_list = new ListPoint();
}
console.log(local_list);




local_list.saveList();
local_list.displayList();




// event listener
const listElement = document.querySelector(`#listpoint`);
listElement.addEventListener('click', () => {

    // for remove point
    if (event.target.matches('.point .remove')) {
        // console.log(event.target.dataset.index);
        local_list.removePoint(event.target.dataset.index);
    }

    // for save list in db
    if (event.target.matches('#listpoint form button')) {

        const name = window.prompt('nommer cette route');
        document.querySelector('#listpoint form :nth-child(3)').value = name;

        document.querySelector('#listpoint form').submit();
    }
});




// listener for save button
// const button = div.querySelector('form button');

// button.addEventListener('click', () => { this.saveListInDB() });
//this.saveListInDB.bind(this)  // a tester

// document.querySelector('.total').addEventListener('click', list.saveListInDB);




// });
