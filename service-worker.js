<<<<<<< HEAD
const CACHE_NAME = "my-note-v1";

const APP_FILES = [
    "./",
    "./index.html",
    "./manifest.json"
];


/* =========================================================
   インストール
========================================================= */

self.addEventListener(
    "install",
    event => {

        event.waitUntil(

            caches.open(
                CACHE_NAME
            ).then(
                cache => {

                    return cache.addAll(
                        APP_FILES
                    );

                }
            )

        );

        self.skipWaiting();

    }
);


/* =========================================================
   有効化
========================================================= */

self.addEventListener(
    "activate",
    event => {

        event.waitUntil(

            caches.keys().then(
                cacheNames => {

                    return Promise.all(

                        cacheNames
                            .filter(
                                cacheName =>
                                    cacheName !==
                                    CACHE_NAME
                            )
                            .map(
                                cacheName =>
                                    caches.delete(
                                        cacheName
                                    )
                            )

                    );

                }
            )

        );

        self.clients.claim();

    }
);


/* =========================================================
   オフライン対応
========================================================= */

self.addEventListener(
    "fetch",
    event => {

        event.respondWith(

            caches.match(
                event.request
            ).then(
                cachedResponse => {

                    if (cachedResponse) {

                        return cachedResponse;

                    }

                    return fetch(
                        event.request
                    ).then(
                        response => {

                            /*
                             * GET以外はキャッシュしない
                             */
                            if (
                                event.request.method !==
                                "GET"
                            ) {

                                return response;

                            }

                            /*
                             * 通常のWebページなども
                             * 次回のために保存
                             */
                            const responseClone =
                                response.clone();


                            caches.open(
                                CACHE_NAME
                            ).then(
                                cache => {

                                    cache.put(
                                        event.request,
                                        responseClone
                                    );

                                }
                            );


                            return response;

                        }
                    );

                }
            )

        );

    }
=======
const CACHE_NAME = "my-note-v1";

const APP_FILES = [
    "./",
    "./index.html",
    "./manifest.json"
];


/* =========================================================
   インストール
========================================================= */

self.addEventListener(
    "install",
    event => {

        event.waitUntil(

            caches.open(
                CACHE_NAME
            ).then(
                cache => {

                    return cache.addAll(
                        APP_FILES
                    );

                }
            )

        );

        self.skipWaiting();

    }
);


/* =========================================================
   有効化
========================================================= */

self.addEventListener(
    "activate",
    event => {

        event.waitUntil(

            caches.keys().then(
                cacheNames => {

                    return Promise.all(

                        cacheNames
                            .filter(
                                cacheName =>
                                    cacheName !==
                                    CACHE_NAME
                            )
                            .map(
                                cacheName =>
                                    caches.delete(
                                        cacheName
                                    )
                            )

                    );

                }
            )

        );

        self.clients.claim();

    }
);


/* =========================================================
   オフライン対応
========================================================= */

self.addEventListener(
    "fetch",
    event => {

        event.respondWith(

            caches.match(
                event.request
            ).then(
                cachedResponse => {

                    if (cachedResponse) {

                        return cachedResponse;

                    }

                    return fetch(
                        event.request
                    ).then(
                        response => {

                            /*
                             * GET以外はキャッシュしない
                             */
                            if (
                                event.request.method !==
                                "GET"
                            ) {

                                return response;

                            }

                            /*
                             * 通常のWebページなども
                             * 次回のために保存
                             */
                            const responseClone =
                                response.clone();


                            caches.open(
                                CACHE_NAME
                            ).then(
                                cache => {

                                    cache.put(
                                        event.request,
                                        responseClone
                                    );

                                }
                            );


                            return response;

                        }
                    );

                }
            )

        );

    }
>>>>>>> 389c2c207f9f5d3268d27b0d4d10e6d031083f15
);