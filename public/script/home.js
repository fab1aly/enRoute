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
const value = listElement.dataset.list_onload;

// if data-list_onload
if (value !== '') {
    local_list = new ListPoint(map, 'local_list', JSON.parse(value));
    local_list.saveList();
    // listElement.dataset.list_onload = '';
}
// if list in local storage
else if (window.localStorage.getItem('local_list')) {
    local_list = new ListPoint(map, 'local_list');
    local_list.loadList();
}
// also make a new list
else {
    local_list = new ListPoint(map, 'local_list');
}

// console.log(local_list);s

local_list.displayList();
local_list.dragAndDrop();

////////////////////////////////////////////////////////////////////////////////

// ListPoint event listener
// const listElement = document.querySelector(`#listpoint`);
listElement.addEventListener('click', (event) => {

    // set view at position
    if (event.target.matches('.position') || event.target.matches('.position span')) {
        map.setView(pos.getCoordsArray(), 15);
    }

    // remove point
    if (event.target.matches('.remove i')) {
        // console.log(event.target.dataset.index);
        const li = event.target.closest('.remove');
        local_list.removePoint(li.dataset.index);
    }

    // save list in db (open modal)
    if (event.target.matches('#listpoint form button')) {
        modal.style.display = "flex";
    }
});


////////////////////////////////////////////////////////////////////////////////
// modal listner
const modal = document.querySelector("#modal");

// When clicks on the button, remove list (submit)
const button = document.querySelector("#modal button");
button.addEventListener('click', () => {
    const input = document.querySelector("#modal input");
    document.querySelector('#listpoint form :nth-child(2)').value = input.value;

    document.querySelector('#listpoint form').submit();
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


////////////////////////////////////////////////////////////////////////////////
// init SearchBar
import SearchBar from "./module/SearchBar.js";
const searchBar = new SearchBar(local_list, pos);


////////////////////////////////////////////////////////////////////////////////
// set view at position on load
navigator.geolocation.getCurrentPosition(function(e) {
    map.setView([e.coords.latitude, e.coords.longitude], 13);
    // myMap.setView([e.coords.latitude, e.coords.longitude], ((myMap.getZoom() >= 11) ? myMap.getZoom() : 11));
    // console.log(e);
});









// listener for save button
// const button = div.querySelector('form button');

// button.addEventListener('click', () => { this.saveListInDB() });
//this.saveListInDB.bind(this)  // a tester

// document.querySelector('.total').addEventListener('click', list.saveListInDB);




// });
