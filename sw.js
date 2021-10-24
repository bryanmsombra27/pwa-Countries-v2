const STATIC_CACHE    = 'static-v2';
const DYNAMIC_CACHE   = 'dynamic-v1';
const INMUTABLE_CACHE = 'inmutable-v1';


const APP_SHELL = [
    '/',
    'index.html',
    'css/styles.css',
    'img/favicon.ico',
    'js/app.js',
    '/manifest.json',
];

const APP_SHELL_INMUTABLE = [

    "https://use.fontawesome.com/releases/v5.15.4/css/all.css",
    "https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css"
];


self.addEventListener('install', e => {


    const cacheStatic = caches.open( STATIC_CACHE ).then(cache => 
        cache.addAll( APP_SHELL ));

    const cacheInmutable = caches.open( INMUTABLE_CACHE ).then(cache => 
        cache.addAll( APP_SHELL_INMUTABLE ));



    e.waitUntil( Promise.all([ cacheStatic, cacheInmutable ])  );

});

self.addEventListener('activate', e => {

    const respuesta = caches.keys().then( keys => {

        keys.forEach( key => {

            if (  key !== STATIC_CACHE && key.includes('static') ) {
                return caches.delete(key);
            }

            if (  key !== DYNAMIC_CACHE && key.includes('dynamic') ) {
                return caches.delete(key);
            }

        });

    });

    e.waitUntil( respuesta );

});
self.addEventListener("fetch", (e) => {
        // 2- Cache with Network Fallback
     const respuesta = caches.match( e.request )
         .then( res => {

             if ( res ) return res;

             // No existe el archivo
             // tengo que ir a la web
             console.log('No existe', e.request.url );


             return fetch( e.request ).then( newResp => {

                 caches.open(DYNAMIC_CACHE).then(cache => {
                     cache.put(e.request,newResp);
                     
                 })
                 
                 return newResp.clone();
             });


         });




     e.respondWith( respuesta );
})

    // 2- Cache with Network Fallback
    // const respuesta = caches.match( e.request )
    //     .then( res => {

    //         if ( res ) return res;

    //         // No existe el archivo
    //         // tengo que ir a la web
    //         console.log('No existe', e.request.url );


    //         return fetch( e.request ).then( newResp => {

    //             caches.open( CACHE_DYNAMIC_NAME )
    //                 .then( cache => {
    //                     cache.put( e.request, newResp );
    //                     limpiarCache( CACHE_DYNAMIC_NAME, 50 );
    //                 });

    //             return newResp.clone();
    //         });


    //     });




    // e.respondWith( respuesta );