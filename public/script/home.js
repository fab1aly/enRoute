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
// When clicks on the button, remove list (submit)
const save_button = document.querySelector("#modal_save_route button");
save_button.addEventListener('click', () => {
    const listpoint = JSON.stringify(local_list.getList());
    document.querySelector('#save_listpoint').value = listpoint;
    document.querySelector('#modal_save_route form').submit();
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
    navigator.geolocation.getCurrentPosition(function (e) {
        map.setView([e.coords.latitude, e.coords.longitude], 13);
    });
}


// });
