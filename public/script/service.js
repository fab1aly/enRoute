// const button = document.getElementById("notifications");
// button.addEventListener("click", () => {
//     Notification.requestPermission().then((result) => {
//         // if (result === "granted") {
//         //     randomNotification();
//         // }
//     });
// });

self.addEventListener("fetch", event => {
    // This is a dummy event listener
    // just to pass the PWA installation criteria on 
    // some browsers
    console.log(`fetch ok`);
});


// This code executes in its own worker or thread
self.addEventListener("install", event => {
    console.log("Service worker installed");
});
self.addEventListener("activate", event => {
    console.log("Service worker activated");
});


Notification.requestPermission().then((result) => {
    if (result === "granted") {
        console.log("Notif ok");
    }
});