// document.addEventListener('DOMContentLoaded', function() {

// on load position set view on it
navigator.geolocation.getCurrentPosition(function(e) {
    myMap.setView([e.coords.latitude, e.coords.longitude], 12);
    // myMap.setView([e.coords.latitude, e.coords.longitude], ((myMap.getZoom() >= 11) ? myMap.getZoom() : 11));
    console.log("position -> ok");
});


// init an instance of ListPoint
const list = new ListPoint();
list.loadList();
list.displayList();


// event listener
const listElement = document.querySelector(`#listpoint`);
listElement.addEventListener('click', () => {

    // for remove point
    if (event.target.matches('.point .remove')) {
        // console.log(event.target.dataset.index);
        list.removePoint(event.target.dataset.index);
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
