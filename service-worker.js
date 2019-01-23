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
    "revision": "41451f536b7c49aa809b1763269e8f4f"
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
    "url": "assets/js/4.1718b7d8.js",
    "revision": "d22aca6dced0147287b5ff068436719d"
  },
  {
    "url": "assets/js/5.faad05a3.js",
    "revision": "26e893a5052796e70ffaad0c3fac126e"
  },
  {
    "url": "assets/js/6.d1f18105.js",
    "revision": "4336dbea5280c84c25dddb2bd5856a44"
  },
  {
    "url": "assets/js/7.f1667d0a.js",
    "revision": "261978756299ccf2d54e941974590a2d"
  },
  {
    "url": "assets/js/8.45d6d078.js",
    "revision": "8e183d124abc8011cd064acd710370f6"
  },
  {
    "url": "assets/js/app.604ac85a.js",
    "revision": "2301695d79f2b977514545c20a0032c0"
  },
  {
    "url": "content/chapter-1.html",
    "revision": "f2f9140bf9d278289461976f0c49f517"
  },
  {
    "url": "content/chapter-2.html",
    "revision": "2d70d4f6997d440f097711cf4c45d3da"
  },
  {
    "url": "content/chapter-3.html",
    "revision": "fdbe894a5a88eebc5252960143ad9045"
  },
  {
    "url": "index.html",
    "revision": "dd050edc24a66d6b46548f7fc5865ce2"
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
