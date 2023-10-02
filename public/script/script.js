// document.addEventListener('DOMContentLoaded', function() {

// on load position set view on it
navigator.geolocation.getCurrentPosition(function(e) {
    myMap.setView([e.coords.latitude, e.coords.longitude], 12);
    // myMap.setView([e.coords.latitude, e.coords.longitude], ((myMap.getZoom() >= 11) ? myMap.getZoom() : 11));
    console.log("position -> ok");
});


// init an instance of ListPoint
const list = new ListPoint('list', "listpoint");


// event listener
const listElement = document.querySelector(`#listpoint`);
listElement.addEventListener('click', () => {

    // for remove point
    if (event.target.matches('.point button')) {
        console.log(event.target.dataset.index);
        list.removePoint(event.target.dataset.index);

    }
});

// listener for save button
// const button = div.querySelector('form button');

// button.addEventListener('click', () => { this.saveListInDB() });
//this.saveListInDB.bind(this)  // a tester

// document.querySelector('.total').addEventListener('click', list.saveListInDB);




// });
