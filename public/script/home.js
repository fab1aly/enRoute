// document.addEventListener('DOMContentLoaded', function() {

// function headerAjust() {
//     const header_height = document.querySelector('header').offsetHeight;
//     // console.log(header_height);
//     document.querySelector('#searchbar').style.top = header_height + 10 + "px";
// }


// init local_list
import ListPoint from "./module/ListPoint.js";

const listElement = document.querySelector(`#listpoint`);

// init local_list
let local_list;

let value = listElement.dataset.value;


// if data value (come from POST)
if (value !== '') {
    local_list = new ListPoint(JSON.parse(value), 'local_list');
    local_list.saveList();
    listElement.dataset.value = '';
}
else {
    local_list = new ListPoint();
    if (window.localStorage.getItem('local_list')) {
        local_list.loadList();
    }
}
console.log(local_list);

local_list.displayList();
local_list.dragAndDrop();

////////////////////////////////////////////////////////////////////////////////

// ListPoint event listener
// const listElement = document.querySelector(`#listpoint`);
listElement.addEventListener('click', () => {

    // for remove point
    if (event.target.matches('.point .remove')) {
        // console.log(event.target.dataset.index);
        local_list.removePoint(event.target.dataset.index);
    }

    // for save list in db
    if (event.target.matches('#listpoint form button')) {

        const name_default = document.querySelector('#listpoint').dataset.name;

        const name = window.prompt('nommer cette route', name_default);
        document.querySelector('#listpoint form :nth-child(2)').value = name;

        document.querySelector('#listpoint form').submit();
    }
});

////////////////////////////////////////////////////////////////////////////////


// init Position
import Position from "./module/Position.js";
const pos = new Position();

// init SearchBar
import SearchBar from "./module/SearchBar.js";
const searchBar = new SearchBar(local_list, pos.posText);

////////////////////////////////////////////////////////////////////////////////

// on load position set view on it
navigator.geolocation.getCurrentPosition(function(e) {
    myMap.setView([e.coords.latitude, e.coords.longitude], 12);
    // myMap.setView([e.coords.latitude, e.coords.longitude], ((myMap.getZoom() >= 11) ? myMap.getZoom() : 11));
    console.log("position -> ok");
});









// listener for save button
// const button = div.querySelector('form button');

// button.addEventListener('click', () => { this.saveListInDB() });
//this.saveListInDB.bind(this)  // a tester

// document.querySelector('.total').addEventListener('click', list.saveListInDB);




// });
