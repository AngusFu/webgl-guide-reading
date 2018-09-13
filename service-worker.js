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
    "revision": "27db22a0411453cadf07e5ec05855e85"
  },
  {
    "url": "assets/css/0.styles.20d88dae.css",
    "revision": "9e8253f97f42cef699f56211723553b2"
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
    "url": "assets/js/app.d62e37c6.js",
    "revision": "821fe2adb4ea9afc9622811bc58653be"
  },
  {
    "url": "content/chapter-1.html",
    "revision": "dbce6686b7222104f4b06f70f1b12655"
  },
  {
    "url": "content/chapter-2.html",
    "revision": "68ed0aa6729a3e8731841771f438b761"
  },
  {
    "url": "index.html",
    "revision": "2a53efb92a25bb5014774f8a79870e73"
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
