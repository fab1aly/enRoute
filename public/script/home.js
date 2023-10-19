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

// if list in local storage
if (window.localStorage.getItem('local_list')) {
    local_list = new ListPoint(map, 'local_list');
    local_list.loadList();
}
// also make a new list
else {
    local_list = new ListPoint(map, 'local_list');
}
// console.log(local_list);

// display list
local_list.displayInit();
// local_list.dragAndDrop();

////////////////////////////////////////////////////////////////////////////////
// ListPoint event listener
const listElement = document.querySelector(`#listpoint`);
listElement.addEventListener('click', (event) => {

    // function for set view
    function setViewOnPoint(feature, map) {
        map.setView([feature.geometry.coordinates[1], feature.geometry.coordinates[0]], 15);
    }


    // set view at position
    if (event.target.matches('.position') ||
        event.target.matches('.position span')) {
        map.setView(pos.getCoordsArray(), 15);
    }

    // remove point by cross
    if (event.target.matches('.remove i')) {
        // console.log(event.target.dataset.index);
        const li = event.target.closest('.remove');
        local_list.removePoint(li.dataset.index);
    }

    // save list in db (open modal)
    if (event.target.matches('#listpoint form button')) {
        modal.style.display = "flex";
    }

    ////////////////////////////////////////////////////////////////////////////
    // Seleted Point event listener (toggle selected point)

    let li;
    if (event.target.matches('span')) {
        li = event.target.closest('li');
        setViewOnPoint(event.target.feature, map);
    }
    else if (event.target.matches('li')) {
        li = event.target;
        const span = event.target.querySelector('.label');
        if (span) {
            setViewOnPoint(span.feature, map);
        }
    }
    if (li) {
        if (li.classList.contains('selected')) {
            li.classList.remove('selected');
            if (li.querySelector('.remove') != null) {
                li.querySelector('.remove').style.display = "none";
            }

        }
        else {
            const old = listElement.querySelector('.selected');
            if (old != null) {
                old.classList.remove('selected');
                if (old.querySelector('.remove') != null) {
                    old.querySelector('.remove').style.display = "none";
                }
            }
            li.classList.add('selected');
            if (li.querySelector('.remove') != null) {
                li.querySelector('.remove').style.display = "inline-block";
            }
        }
    }

    ////////////////////////////////////////////////////////////////////////////
    // drag n drop


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
// set view at position on load
navigator.geolocation.getCurrentPosition(function(e) {
    map.setView([e.coords.latitude, e.coords.longitude], 13);
    // myMap.setView([e.coords.latitude, e.coords.longitude], ((myMap.getZoom() >= 11) ? myMap.getZoom() : 11));
    // console.log(e);
});




// });
