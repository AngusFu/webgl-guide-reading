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
    "revision": "7ef9e0be40b65135b1071d0f7ea17b69"
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
    "url": "assets/js/4.67e6e2b9.js",
    "revision": "b7a92268b4b967a2967e274e9ed548e8"
  },
  {
    "url": "assets/js/5.d6cade35.js",
    "revision": "0484b205f1c3093d652d78713f2ed1c2"
  },
  {
    "url": "assets/js/6.e659f287.js",
    "revision": "8c24829fc98a9c85ca58ad3dc05ef800"
  },
  {
    "url": "assets/js/7.39e54f26.js",
    "revision": "3bfc9c4efc335d2c28a256cb2d6d88ea"
  },
  {
    "url": "assets/js/app.959ec83c.js",
    "revision": "9c9717822b326e06a010df62923d324e"
  },
  {
    "url": "content/chapter-1.html",
    "revision": "9e5a12e0a38b4c2a6515bdc0cfd70d80"
  },
  {
    "url": "content/chapter-2.html",
    "revision": "4b46b9a99c7468f590afe4fe75010256"
  },
  {
    "url": "index.html",
    "revision": "ca7ad545166d1e32b8c8c6687c2d19ce"
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
