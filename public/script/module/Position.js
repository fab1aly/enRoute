export default class Position {
    constructor(map = 'map', divId = "listpoint", time = 5000) {

        this.map = map;
        this.time = time;

        this.positionElement = document.querySelector(`#${divId} #list_position`);

        this.lat = null;
        this.lon = null;
        this.radius = null;

        // init group position layer
        this.positionLayerGroup = L.layerGroup();
        this.positionLayerGroup.addTo(this.map);

        // begin watch user position
        this.watchId = navigator.geolocation.watchPosition(
            this.updateLocation.bind(this),
            this.handleLocationError.bind(this), {
            enableHighAccuracy: true,
            timeout: this.time,
            maximumAge: 0,
        }
        );

        // init listener for set view on position
        this.setViewOnPosition();


    }
    getCoordsArray() {
        return [this.lat, this.lon];
    }
    getRadius() {
        return this.radius;
    }
    getLat() {
        return this.lat;
    }
    getLon() {
        return this.lon;
    }

    updateLocation(position) {

        this.positionElement.style.display = '';

        // update coords and radius
        this.lat = position.coords.latitude;
        this.lon = position.coords.longitude;
        this.radius = position.coords.accuracy;
        // console.log("Latitude:", this.lat);
        // console.log("Longitude:", this.lon);
        // console.log("Exactitude:", this.radius + "m");


        // remove old position layer
        this.map.removeLayer(this.positionLayerGroup);

        // make marker
        const selfIcon = L.icon({
            className: 'icon-self',
            iconUrl: './image/icons8-Gold-marker-Location-48.png',
            iconSize: [32, 32],
            iconAnchor: [16, 32],
            popupAnchor: [0, -32],
        });
        // you can set .my-div-icon styles in CSS
        this.positionMarker = L.marker(this.getCoordsArray(), { icon: selfIcon })
            .bindPopup("Vous étes à " + this.getRadius() + " métres de ce point");

        // make circle
        var selfCircle = L.circle(this.getCoordsArray(), {
            color: 'DarkGoldenrod',
            fillColor: 'Gold',
            fillOpacity: 0.3,
            radius: this.getRadius(),
        });
        this.positionCircle = selfCircle;

        // make new group,  add marker and circle
        this.positionLayerGroup = L.layerGroup();
        this.positionLayerGroup.addLayer(this.positionMarker);
        this.positionLayerGroup.addLayer(this.positionCircle);
        // Add the layer group to the map
        this.positionLayerGroup.addTo(this.map);


    }

    handleLocationError(error) {
        console.error("Erreur de géolocalisation:", error);
        this.positionElement.style.display = 'none';
        this.lat = null;
        this.lon = null;
        this.radius = null;
    }

    stopWatchingLocation() {
        // Arrête la surveillance de la position lorsqu'elle n'est plus nécessaire
        navigator.geolocation.clearWatch(this.watchId);
    }


    setViewOnPosition() {
        this.positionElement.addEventListener('click', () => {
            // set view at position
            if (event.target.matches('.position') ||
                event.target.matches('.position span')) {
                this.map.setView(this.getCoordsArray(), 14);
            }
        });
    }
}
