// document.addEventListener('DOMContentLoaded', function() {

////////////////////////////////////////////////////////////////////////////////
// init local_list
import ListPoint from "./module/ListPoint.js";
const local_list = new ListPoint(map, 'local_list');

// if list in local storage
if (window.localStorage.getItem('local_list')) {
    local_list.loadList();
}
// console.log(local_list);

// init list
local_list.displayInit();
local_list.setViewOnAllPoint();

////////////////////////////////////////////////////////////////////////////////
// Save list in db (open modal)
const save_button = document.querySelector(`#listpoint #save_button`);
if (save_button) {
    save_button.addEventListener('click', () => {
        const modal = document.querySelector("#modal");
        modal.style.display = "flex";
    });
}

////////////////////////////////////////////////////////////////////////////////
// Modal listner
const modal = document.querySelector("#modal");

// When clicks on the button, remove list (submit)
const button = document.querySelector("#modal button");
button.addEventListener('click', () => {

    const listpoint = JSON.stringify(local_list.getList());
    document.querySelector('#listpoint #save_listpoint').value = listpoint;

    const input = document.querySelector("#modal input");
    document.querySelector('#listpoint #save_listname').value = input.value;

    document.querySelector('#listpoint #save_form').submit();
});

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


////////////////////////////////////////////////////////////////////////////////
// init SearchBar
import SearchBar from "./module/SearchBar.js";
const searchBar = new SearchBar(local_list, pos);


////////////////////////////////////////////////////////////////////////////////
// set view at position on load if no point in list
if (!local_list.getList().length) {
    navigator.geolocation.getCurrentPosition(function(e) {
        map.setView([e.coords.latitude, e.coords.longitude], 13);
    });
}




// });
