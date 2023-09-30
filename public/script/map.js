// L'id du container, par exemple <div id="map"></div>
var mapID = 'map';

// Photographies aériennes en-dessous de Plan IGN
var OrthoIGN = L.tileLayer('https://wxs.ign.fr/{ignApiKey}/geoportail/wmts?' +
    '&REQUEST=GetTile&SERVICE=WMTS&VERSION=1.0.0&TILEMATRIXSET=PM' +
    '&LAYER={ignLayer}&STYLE={style}&FORMAT={format}' +
    '&TILECOL={x}&TILEROW={y}&TILEMATRIX={z}', {
        ignApiKey: 'decouverte',
        ignLayer: 'ORTHOIMAGERY.ORTHOPHOTOS',
        style: 'normal',
        format: 'image/jpeg',
        service: 'WMTS',

    });

// Plan IGN avec une transparence de 50%
var PlanIGN = L.tileLayer('https://wxs.ign.fr/{ignApiKey}/geoportail/wmts?' +
    '&REQUEST=GetTile&SERVICE=WMTS&VERSION=1.0.0&TILEMATRIXSET=PM' +
    '&LAYER={ignLayer}&STYLE={style}&FORMAT={format}' +
    '&TILECOL={x}&TILEROW={y}&TILEMATRIX={z}', {
        ignApiKey: 'decouverte',
        ignLayer: 'GEOGRAPHICALGRIDSYSTEMS.PLANIGNV2',
        style: 'normal',
        format: 'image/png',
        service: 'WMTS',
        opacity: 0.5,
        attribution: ', Carte © IGN-F/Geoportail'
    });

// Plan OpenStreetMap_France avec une transparence de 50%
var OpenStreetMap_France = L.tileLayer('https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png', {
    maxZoom: 20,
    opacity: 0.7,
    attribution: '&copy; OpenStreetMap France | &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});
// Ma carte
var myMap = L.map(mapID, {
    center: [46.1, 1.7],
    zoom: 6,
    layers: [OpenStreetMap_France]
});


//Boite de recherche geocode
// var geocoder = L.geocoderBAN({ collapsed: false }).addTo(myMap)
