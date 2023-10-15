// document.addEventListener('DOMContentLoaded', function() {

// function headerAjust() {
//     const header_height = document.querySelector('header').offsetHeight;
//     // console.log(header_height);
//     document.querySelector('#searchbar').style.top = header_height + 10 + "px";
// }

////////////////////////////////////////////////////////////////////////////////
// init local_list
import ListPoint from "./module/ListPoint.js";
let local_list;

// check if list sended by load function from Routes page (come from POST)
const listElement = document.querySelector(`#listpoint`);
const value = listElement.dataset.value;
// if data value 
if (value !== '') {
    local_list = new ListPoint(local_map, JSON.parse(value), 'local_list');
    local_list.saveList();
    listElement.dataset.value = '';
}
// also make a new list
else {
    local_list = new ListPoint(local_map);
    // check if list in local storage
    if (window.localStorage.getItem('local_list')) {
        local_list.loadList();
    }

}

// console.log(local_list);s

local_list.displayList();
local_list.dragAndDrop();

////////////////////////////////////////////////////////////////////////////////

// ListPoint event listener
// const listElement = document.querySelector(`#listpoint`);
listElement.addEventListener('click', (event) => {

    // for remove point
    if (event.target.matches('.remove i')) {
        // console.log(event.target.dataset.index);
        const remove = event.target.closest('.remove')
        local_list.removePoint(remove.dataset.index);
    }

    // for save list in db
    if (event.target.matches('#listpoint form button')) {

        const name_default = document.querySelector('#listpoint').dataset.name;

        const name = window.prompt('nommer cette route', name_default);
        document.querySelector('#listpoint form :nth-child(2)').value = name;

        document.querySelector('#listpoint form').submit();
    }

    // for set view at position
    if (event.target.matches('.position') || event.target.matches('.position span')) {
        local_map.setView(pos.getCoordsArray(), 15);
    }
});
////////////////////////////////////////////////////////////////////////////////


// init Position
import Position from "./module/Position.js";
const pos = new Position(local_map);

// 

////////////////////////////////////////////////////////////////////////////////
// init SearchBar
import SearchBar from "./module/SearchBar.js";
const searchBar = new SearchBar(local_list, pos);

////////////////////////////////////////////////////////////////////////////////

// set view at position on load
navigator.geolocation.getCurrentPosition(function(e) {
    local_map.setView([e.coords.latitude, e.coords.longitude], 13);
    // myMap.setView([e.coords.latitude, e.coords.longitude], ((myMap.getZoom() >= 11) ? myMap.getZoom() : 11));
    // console.log(e);
});









// listener for save button
// const button = div.querySelector('form button');

// button.addEventListener('click', () => { this.saveListInDB() });
//this.saveListInDB.bind(this)  // a tester

// document.querySelector('.total').addEventListener('click', list.saveListInDB);




// });
