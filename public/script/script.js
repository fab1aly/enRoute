// document.addEventListener('DOMContentLoaded', function() {

// on load position set view on it
navigator.geolocation.getCurrentPosition(function(e) {
    myMap.setView([e.coords.latitude, e.coords.longitude], 12);
    // myMap.setView([e.coords.latitude, e.coords.longitude], ((myMap.getZoom() >= 11) ? myMap.getZoom() : 11));
    console.log("position -> ok");
});




const list = new ListPoint('list', "listpoint");

// list.saveList();
list.loadList();
list.displayList();
list.dragAndDrop();

for (let button of document.querySelectorAll('.point')) {
    button.addEventListener('click', () => {
        list.removePoint(event.target.dataset.index);
    });
}

// document.querySelector('.total').addEventListener('click', list.saveListInDB);




// });
