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
    "revision": "282993d2ceb14e6d4c3ac332e0bf3241"
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
    "url": "assets/js/app.81ccecd6.js",
    "revision": "397f24302b725f65d3a28666a6144940"
  },
  {
    "url": "content/chapter-1.html",
    "revision": "d07dc63b80688b5665183fa67f07d4cc"
  },
  {
    "url": "content/chapter-2.html",
    "revision": "f9da62f640d354b24ea44cb18e89cc7c"
  },
  {
    "url": "content/chapter-3.html",
    "revision": "3180421c6cfa8c624e3b60fe8be9e835"
  },
  {
    "url": "icg/index.html",
    "revision": "cbe3d87112cb8eab03d65b9f4e55efad"
  },
  {
    "url": "index.html",
    "revision": "30b58c7444d2a935b7e2e852ae2e523d"
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
