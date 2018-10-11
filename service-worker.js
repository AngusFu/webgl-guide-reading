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
    "revision": "6c2f78962061cdf703bca78f82343bd7"
  },
  {
    "url": "assets/css/0.styles.cc3d7516.css",
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
    "url": "assets/js/2.9834f0cc.js",
    "revision": "4d547a9e6d5be37c8aed1c03bc8fdc3c"
  },
  {
    "url": "assets/js/3.ea4e2127.js",
    "revision": "8a39905833de63ff7d83df6d78a18a63"
  },
  {
    "url": "assets/js/4.8ebdcee6.js",
    "revision": "b7a92268b4b967a2967e274e9ed548e8"
  },
  {
    "url": "assets/js/5.23c2c6c9.js",
    "revision": "0484b205f1c3093d652d78713f2ed1c2"
  },
  {
    "url": "assets/js/6.26c2a082.js",
    "revision": "e7e2541ad09d8a8aea0927356ee6b3be"
  },
  {
    "url": "assets/js/7.82157d0b.js",
    "revision": "1077abf877d6580dab5ab8367a759f16"
  },
  {
    "url": "assets/js/app.11255c7a.js",
    "revision": "c22588d30e9bc407a1df5fac43bb1091"
  },
  {
    "url": "content/chapter-1.html",
    "revision": "20586026398bd86deea8f3f72eba819a"
  },
  {
    "url": "content/chapter-2.html",
    "revision": "cf4b10cd0ae13ce932716b9afb72222a"
  },
  {
    "url": "index.html",
    "revision": "121b143c63310f1e69e9b7bb6529bf2a"
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
