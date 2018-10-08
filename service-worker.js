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
    "revision": "7f5124a1e3971b76574a7e711d054d35"
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
    "url": "assets/js/app.9be6defe.js",
    "revision": "0f7b7354db51a3a22ff1f5af869b89e3"
  },
  {
    "url": "content/chapter-1.html",
    "revision": "36df1a7622d2fab7a5c05296b634e84a"
  },
  {
    "url": "content/chapter-2.html",
    "revision": "1617e6267a83ebd7d1f5b8ab9943d77a"
  },
  {
    "url": "index.html",
    "revision": "04300974ecd0a46f5b0686c47700b58b"
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
