class Position {
    constructor(time = 5000) {
        this.time = time;
        this.lat = null; // Initialisé à null
        this.lon = null; // Initialisé à null
        this.posText = null;
        this.isGettingLocation = false;
        this.isUpdatingLocation = false;

        this.getLocation();
    }

    async getLocation() {
        if (this.isGettingLocation || this.isUpdatingLocation) {
            return;
        }

        this.isGettingLocation = true;

        try {
            const e = await new Promise((resolve, reject) => {
                navigator.geolocation.getCurrentPosition(resolve, reject);
            });

            this.lat = (Math.round(e.coords.latitude * 1000)) / 1000;
            this.lon = (Math.round(e.coords.longitude * 1000)) / 1000;

            this.posText = '&lat=' + this.lat + '&lon=' + this.lon;

            this.isGettingLocation = false;
            this.isUpdatingLocation = true;

            setTimeout(() => {
                this.isUpdatingLocation = false;
                this.getLocation();
                console.log(this.posText);
            }, this.time);
        }
        catch (error) {
            // Gérez les erreurs ici, par exemple, si l'utilisateur refuse l'accès à la localisation
            console.error("Erreur lors de la récupération de la localisation :", error);
            this.isGettingLocation = false;
        }
    }
}
