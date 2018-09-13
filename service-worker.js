/**
 * Welcome to your Workbox-powered service worker!
 *
 * You'll need to register this file in your web app and you should
 * disable HTTP caching for this file too.
 * See https://goo.gl/nhQhGp
 *
 * The rest of the code is auto-generated. Please don't update this file
 * directly; instead, make changes to your Workbox build configuration
 * and re-run your build process.
 * See https://goo.gl/2aRDsh
 */

importScripts("https://storage.googleapis.com/workbox-cdn/releases/3.5.0/workbox-sw.js");

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [
  {
    "url": "404.html",
    "revision": "f3c86880541f691956482e764ca91d9d"
  },
  {
    "url": "assets/css/0.styles.0903bae1.css",
    "revision": "565501be0eac387ddc0209559e52f800"
  },
  {
    "url": "assets/img/clipboard.5c88c19e.svg",
    "revision": "5c88c19e9c4f3df769d5ca264b7e1283"
  },
  {
    "url": "assets/img/search.83621669.svg",
    "revision": "83621669651b9a3d4bf64d1a670ad856"
  },
  {
    "url": "assets/js/2.08b56c21.js",
    "revision": "5d2aac1927fa4fc49f00c1a4a19837c7"
  },
  {
    "url": "assets/js/3.8b92816c.js",
    "revision": "c3271cc55732bdf1f3927087410a56b3"
  },
  {
    "url": "assets/js/4.f83f1721.js",
    "revision": "f3434ec7ad1cc422de32393a5f7e4239"
  },
  {
    "url": "assets/js/5.f831ebee.js",
    "revision": "8d5eb93ac0f8402fab21848526eed75b"
  },
  {
    "url": "assets/js/6.9f3799a6.js",
    "revision": "6a8d734893f278eadcc51a27bfc84b74"
  },
  {
    "url": "assets/js/app.e69b8fcc.js",
    "revision": "79ce5a9f16d99eaf9f4437aa5c476478"
  },
  {
    "url": "content/chapter-1.html",
    "revision": "e1f76e9e896d2f524b2d396612151fb9"
  },
  {
    "url": "content/chapter-2.html",
    "revision": "e4137fc3bb503f6709c9d5e3a4534ce4"
  },
  {
    "url": "index.html",
    "revision": "e7509480071167df58897df468469c35"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.suppressWarnings();
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});
addEventListener('message', event => {
  const replyPort = event.ports[0]
  const message = event.data
  if (replyPort && message && message.type === 'skip-waiting') {
    event.waitUntil(
      self.skipWaiting().then(
        () => replyPort.postMessage({ error: null }),
        error => replyPort.postMessage({ error })
      )
    )
  }
})
