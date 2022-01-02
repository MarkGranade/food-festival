// global constants
const APP_PREFIX = "FoodFest-";
const VERSION = "version_01";
const CACHE_NAME = APP_PREFIX + VERSION;
// define which files we'd like to cache
const FILES_TO_CACHE = [
	"./index.html",
	"./events.html",
	"./tickets.html",
	"./schedule.html",
	"./assets/css/style.css",
	"./assets/css/bootstrap.css",
	"./assets/css/tickets.css",
	"./dist/app.bundle.js",
	"./dist/events.bundle.js",
	"./dist/tickets.bundle.js",
	"./dist/schedule.bundle.js",
];

// respond with cached resources
// Here, we listen for the fetch event, log the URL of the requested resource,
// and then begin to define how we will respond to the request.
self.addEventListener("fetch", function (e) {
	console.log("fetch request: " + e.request.url);
	// Use "respondWith" to intercept the fetch request
	e.respondWith(
		// Use ".match()" to determine if the resource already exists in caches
		caches.match(e.request).then(function (request) {
			// If it does, we'll log the URL to the console with a message and then return the cached resource
			if (request) {
				console.log("responding with cache : " + e.request.url);
				return request;
				// If the resource is not in "caches", we allow the resource to be retrieved from the online network as usual
			} else {
				console.log("file is not cached, fetching : " + e.request.url);
				return fetch(e.request);
			}

			// You can omit if/else for console.log & put one line below like this too.
			// return request || fetch(e.request)
		})
	);
});

// Cache resources
// service workers run before the window object has been created, So we use the "self" keyword.
self.addEventListener("install", function (e) {
	// Use "e.waitUntil" to tell the browser to wait until the work is complete before terminating the service worker
	e.waitUntil(
		// Use "caches.open" to find the specific cache by name, then add every file in the "FILES_TO_CACHE" array to the cache
		caches.open(CACHE_NAME).then(function (cache) {
			console.log("installing cache: " + CACHE_NAME);
			return cache.addAll(FILES_TO_CACHE);
		})
	);
});

// Delete outdated caches
self.addEventListener("activate", function (e) {
	e.waitUntil(
		// `keyList` contains all cache names under your username.github.io
		// filter out ones that has this app prefix to create keeplist
		caches.keys().then(function (keyList) {
			// Capture caches that have the app prefix and save them to an array called "cacheKeeplist"
			let cacheKeeplist = keyList.filter(function (key) {
				return key.indexOf(APP_PREFIX);
			});
			// add current cache name to keepList
			cacheKeeplist.push(CACHE_NAME);

			return Promise.all(
				keyList.map(function (key, i) {
					if (cacheKeeplist.indexOf(key) === -1) {
						console.log("deleting cache : " + keyList[i]);
						return caches.delete(keyList[i]);
					}
				})
			);
		})
	);
});
