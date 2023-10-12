export default class Position {
    constructor() {
        this.lat = null;
        this.lon = null;
        this.posText = null;

        // Commence à surveiller la position de l'utilisateur
        this.watchId = navigator.geolocation.watchPosition(
            this.updateLocation.bind(this),
            this.handleLocationError.bind(this)
        );
    }

    updateLocation(position) {
        this.lat = (Math.round(position.coords.latitude * 1000)) / 1000;
        this.lon = (Math.round(position.coords.longitude * 1000)) / 1000;
        console.log("Latitude:", this.lat);
        console.log("Longitude:", this.lon);
        this.posText = '&lat=' + this.lat + '&lon=' + this.lon;
    }

    handleLocationError(error) {
        console.error("Erreur de géolocalisation:", error);
    }

    stopWatchingLocation() {
        // Arrête la surveillance de la position lorsqu'elle n'est plus nécessaire
        navigator.geolocation.clearWatch(this.watchId);
    }
}

// Utilisation de la classe Position
// const position = new Position();

// Si vous souhaitez arrêter de surveiller la position à un moment donné, vous pouvez appeler la méthode stopWatchingLocation.
// position.stopWatchingLocation();


// class Position {
//     constructor(time = 5000) {
//         this.time = time;
//         this.lat = null; // Initialisé à null
//         this.lon = null; // Initialisé à null
//         this.posText = null;
//         this.isGettingLocation = false;
//         this.isUpdatingLocation = false;

//         this.getLocation();
//     }

//     async getLocation() {
//         if (this.isGettingLocation || this.isUpdatingLocation) {
//             return;
//         }

//         this.isGettingLocation = true;

//         try {
//             const e = await new Promise((resolve, reject) => {
//                 navigator.geolocation.getCurrentPosition(resolve, reject);
//             });

//             this.lat = (Math.round(e.coords.latitude * 1000)) / 1000;
//             this.lon = (Math.round(e.coords.longitude * 1000)) / 1000;

//             this.posText = '&lat=' + this.lat + '&lon=' + this.lon;

//             this.isGettingLocation = false;
//             this.isUpdatingLocation = true;

//             setTimeout(() => {
//                 this.isUpdatingLocation = false;
//                 this.getLocation();
//                 console.log(this.posText);
//             }, this.time);
//         }
//         catch (error) {
//             // Gérez les erreurs ici, par exemple, si l'utilisateur refuse l'accès à la localisation
//             console.error("Erreur lors de la récupération de la localisation :", error);
//             this.isGettingLocation = false;
//         }
//     }
// }
