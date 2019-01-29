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
    "revision": "f6d08d6aeb54daec475edab6b6be4895"
  },
  {
    "url": "assets/css/0.styles.e4e67f0e.css",
    "revision": "a52543dc71fdc0b275a915ccc1599ee6"
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
    "url": "assets/js/1.0b381cbb.js",
    "revision": "619a7b365ccae527d512a2589468abae"
  },
  {
    "url": "assets/js/3.4ce43ae1.js",
    "revision": "a06fbb2fb6f10d13c1e7d5353ca1c7b3"
  },
  {
    "url": "assets/js/4.a1006f0e.js",
    "revision": "a0dd757447100a1bbaf3ee10c0398636"
  },
  {
    "url": "assets/js/5.23933e78.js",
    "revision": "bb4c9781179a165f97cafe9c0fb81611"
  },
  {
    "url": "assets/js/6.7cece50d.js",
    "revision": "692cbc870a138185561b72462455725a"
  },
  {
    "url": "assets/js/7.f1667d0a.js",
    "revision": "261978756299ccf2d54e941974590a2d"
  },
  {
    "url": "assets/js/8.85745b3e.js",
    "revision": "1b4f450c7c8d4b79eb6b80d2be38b1e3"
  },
  {
    "url": "assets/js/9.90c1837d.js",
    "revision": "c4130cf106c56753e3f1ce86fd753f72"
  },
  {
    "url": "assets/js/app.4c9bca5c.js",
    "revision": "504de262c569eb9b09d56c58dec37786"
  },
  {
    "url": "content/chapter-1.html",
    "revision": "7f6e73e7a00a28ab7f95e3f33ea2a300"
  },
  {
    "url": "content/chapter-2.html",
    "revision": "e3e6064637a2ff2f653e63615447c865"
  },
  {
    "url": "content/chapter-3.html",
    "revision": "41664db22f3ac4acd4d84f55e63d10f1"
  },
  {
    "url": "icg/index.html",
    "revision": "6f5102e6b0575e9325c34b14e24e5732"
  },
  {
    "url": "index.html",
    "revision": "165f5d4679b70f062be1b0efc89b580a"
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
