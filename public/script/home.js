// document.addEventListener('DOMContentLoaded', function() {

// function headerAjust() {
//     const header_height = document.querySelector('header').offsetHeight;
//     // console.log(header_height);
//     document.querySelector('#searchbar').style.top = header_height + 10 + "px";
// }

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
// ListPoint event listener (SAVE)
const listElement = document.querySelector(`#listpoint`);
listElement.addEventListener('click', (event) => {

    // save list in db (open modal)
    if (event.target.matches('#listpoint form button')) {
        modal.style.display = "flex";
    }

});

////////////////////////////////////////////////////////////////////////////////
// Modal listner
const modal = document.querySelector("#modal");

// When clicks on the button, remove list (submit)
const button = document.querySelector("#modal button");
button.addEventListener('click', () => {

    const listpoint = JSON.stringify(local_list.getList());
    document.querySelector('#listpoint form :nth-child(1)').value = listpoint;

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
// set view at position on load if no point in list
if (!local_list.getList().length) {
    navigator.geolocation.getCurrentPosition(function(e) {
        map.setView([e.coords.latitude, e.coords.longitude], 13);
    });
}




// });
