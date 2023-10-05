// document.addEventListener('DOMContentLoaded', function() {

// on load position set view on it
navigator.geolocation.getCurrentPosition(function(e) {
    myMap.setView([e.coords.latitude, e.coords.longitude], 12);
    // myMap.setView([e.coords.latitude, e.coords.longitude], ((myMap.getZoom() >= 11) ? myMap.getZoom() : 11));
    console.log("position -> ok");
});


// init an instance of ListPoint
let list_in_value = document.querySelector('#listpoint').dataset.value;
if (list_in_value == null) {
    list_in_value = [];
}
else {
    list_in_value = JSON.parse(list_in_value);
}

console.log(list_in_value);

const list_in_local_storage = new ListPoint(list_in_value);

// list_in_local_storage.loadList();
list_in_local_storage.displayList();




// event listener
const listElement = document.querySelector(`#listpoint`);
listElement.addEventListener('click', () => {

    // for remove point
    if (event.target.matches('.point .remove')) {
        // console.log(event.target.dataset.index);
        list_in_local_storage.removePoint(event.target.dataset.index);
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
