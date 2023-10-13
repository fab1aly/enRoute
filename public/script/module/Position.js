export default class Position {
    constructor(map, time = 5000) {
        this.map = map;
        this.time = time;

        this.lat = null;
        this.lon = null;
        this.radius = null;

        // init  position layer
        this.positionLayerGroup = L.layerGroup();

        this.positionMarker = L.marker([0, 0]);
        this.positionCircle = L.circle([0, 0], this.radius);

        this.positionLayerGroup.addLayer(this.positionMarker);
        this.positionLayerGroup.addLayer(this.positionCircle);

        this.positionLayerGroup.addTo(this.map);

        // Commence à surveiller la position de l'utilisateur
        this.watchId = navigator.geolocation.watchPosition(
            this.updateLocation.bind(this),
            this.handleLocationError.bind(this), {
                enableHighAccuracy: true,
                timeout: this.time,
                maximumAge: 0,
            }
        );

    }
    getPosArray() {
        return [this.lat, this.lon];
    }
    getLat() {
        return this.lat;
    }
    getLon() {
        return this.lon;
    }

    updateLocation(position) {
        this.lat = position.coords.latitude;
        this.lon = position.coords.longitude;
        this.radius = position.coords.accuracy;
        console.log("Latitude:", this.lat);
        console.log("Longitude:", this.lon);
        console.log("Exactitude:", this.radius);


        // remove old position layer
        this.map.removeLayer(this.positionLayerGroup);
        // make marker and circle
        this.positionMarker = L.marker([this.lat, this.lon])
            .bindPopup("Vous étes à " + this.radius + " méters de ce point");
        this.positionCircle = L.circle([this.lat, this.lon], this.radius);
        // make new group
        this.positionLayerGroup = L.layerGroup();
        this.positionLayerGroup.addLayer(this.positionMarker);
        this.positionLayerGroup.addLayer(this.positionCircle);
        // Add the layer group to the map
        this.positionLayerGroup.addTo(this.map);
    }

    handleLocationError(error) {
        console.error("Erreur de géolocalisation:", error);
    }

    stopWatchingLocation() {
        // Arrête la surveillance de la position lorsqu'elle n'est plus nécessaire
        navigator.geolocation.clearWatch(this.watchId);
    }
}
