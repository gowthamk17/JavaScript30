const staticDevCoffee = "drum-kit-v1";
const assets = [
    "/",
    "/index.html",
    "/style.css",
    "/background.jpg",
    "/sounds/boom.wav",
    "/sounds/clap.wav",
    "/sounds/hihat.wav",
    "/sounds/kick.wav",
    "/sounds/openhat.wav",
    "/sounds/ride.wav",
    "/sounds/snare.wav",
    "/sounds/tink.wav",
    "/sounds/tom.wav",
];

self.addEventListener("install", installEvent => {
    installEvent.waitUntil(
        caches.open(staticDevCoffee).then(cache => {
            cache.addAll(assets)
        })
    )
});

self.addEventListener("fetch", fetchEvent => {
    fetchEvent.respondWith(
        caches.match(fetchEvent.request).then(res => {
            return res || fetch(fetchEvent.request)
        })
    )
});