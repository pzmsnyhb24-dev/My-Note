// Change RELEASE whenever publishing an application change.
const RELEASE = "2026-09-14-1";
const PREFIX = "my-note-" + encodeURIComponent(self.registration.scope) + "-";
const CACHE_NAME = PREFIX + RELEASE;
const APP_FILES = ["./", "./index.html", "./manifest.json"];
const APP_URLS = APP_FILES.map(path => new URL(path, self.registration.scope).href);

self.addEventListener("install", event => {
    event.waitUntil((async () => {
        const cache = await caches.open(CACHE_NAME);
        await cache.addAll(APP_URLS.map(url => new Request(url, {cache: "reload"})));
    })());
    // Activate after existing windows close; never interrupt editing.
});

self.addEventListener("activate", event => {
    event.waitUntil((async () => {
        const names = await caches.keys();
        await Promise.all(names.filter(name => name.startsWith(PREFIX) && name !== CACHE_NAME)
            .map(name => caches.delete(name)));
        await self.clients.claim();
    })());
});

self.addEventListener("fetch", event => {
    const request = event.request;
    if (request.method !== "GET") return;
    const url = new URL(request.url);
    url.search = "";
    if (!APP_URLS.includes(url.href)) return;
    event.respondWith((async () => {
        const cache = await caches.open(CACHE_NAME);
        const cached = await cache.match(url.href);
        return cached || fetch(request);
    })());
});
