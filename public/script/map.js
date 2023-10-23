const mapID = 'map';

// Photographies aériennes en-dessous de Plan IGN
const OrthoIGN = L.tileLayer('https://wxs.ign.fr/{ignApiKey}/geoportail/wmts?' +
    '&REQUEST=GetTile&SERVICE=WMTS&VERSION=1.0.0&TILEMATRIXSET=PM' +
    '&LAYER={ignLayer}&STYLE={style}&FORMAT={format}' +
    '&TILECOL={x}&TILEROW={y}&TILEMATRIX={z}', {
        ignApiKey: 'decouverte',
        ignLayer: 'ORTHOIMAGERY.ORTHOPHOTOS',
        style: 'normal',
        format: 'image/jpeg',
        service: 'WMTS',

    });

// Plan IGN avec une transparence de 70%
const PlanIGN = L.tileLayer('https://wxs.ign.fr/{ignApiKey}/geoportail/wmts?' +
    '&REQUEST=GetTile&SERVICE=WMTS&VERSION=1.0.0&TILEMATRIXSET=PM' +
    '&LAYER={ignLayer}&STYLE={style}&FORMAT={format}' +
    '&TILECOL={x}&TILEROW={y}&TILEMATRIX={z}', {
        ignApiKey: 'decouverte',
        ignLayer: 'GEOGRAPHICALGRIDSYSTEMS.PLANIGNV2',
        style: 'normal',
        format: 'image/png',
        service: 'WMTS',
        opacity: 0.7,
        attribution: ', Carte © IGN-F/Geoportail'
    });

// Plan OpenStreetMap_France avec une transparence de 70%
const OpenStreetMap_France = L.tileLayer('https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png', {
    maxZoom: 20,
    opacity: 0.7,
    attribution: '&copy; OpenStreetMap France | &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});



// Maps object for Leaflet
const map = L.map(mapID, {
    center: [46.1, 1.7], //france coords
    zoom: ((window.screen.width >= 768) ? 6 : 5),
    layers: [OpenStreetMap_France],
    // zoomControl: false,
    // watch: true,
    // setView: true,
    // animate: true,
});

// maps available
const baseMaps = {
    "OsmFrance": OpenStreetMap_France,
    "PlanIGN": PlanIGN,
    "OrthoIGN": OrthoIGN,
};
// const overlayMaps = {
//     "Cities": cities
// };
const layers_control = L.control.layers(baseMaps).addTo(map).setPosition('topleft');

// display scale
const scale_control = L.control.scale({ imperial: false }).addTo(map).setPosition('topleft');

// const zoom_control = L.control.zoom().addTo(local_map).setPosition('topleft');
