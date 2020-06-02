/* eslint-disable no-undef */
// import { registerRoute } from 'workbox-routing'
// import { CacheFirst, StaleWhileRevalidate } from 'workbox-strategies'
// import { CacheableResponsePlugin } from 'workbox-cacheable-response'
// import { ExpirationPlugin } from 'workbox-expiration'

if (workbox) {
  // workbox.setConfig({
  //   debug: true,
  // })

  /**
   * The workboxSW.precacheAndRoute() method efficiently caches and responds to
   * requests for URLs in the manifest.
   * See https://goo.gl/S9QRab
   */
  self.__precacheManifest = [].concat(self.__precacheManifest || [])
  workbox.core.setCacheNameDetails({ prefix: 'lean.chinese' })
  workbox.precaching.precacheAndRoute(self.__precacheManifest, {})

  // Cache the Google Fonts stylesheets with a stale-while-revalidate strategy.
  workbox.routing.registerRoute(
    ({ url }) => url.origin === 'https://fonts.googleapis.com',
    new workbox.strategies.StaleWhileRevalidate({
      cacheName: 'google-fonts-stylesheets',
    })
  )

  // Cache the underlying font files with a cache-first strategy for 1 year.
  workbox.routing.registerRoute(
    ({ url }) => url.origin === 'https://fonts.gstatic.com',
    new workbox.strategies.CacheFirst({
      cacheName: 'google-fonts-webfonts',
      plugins: [
        new workbox.cacheableResponse.Plugin({
          statuses: [0, 200],
        }),
        new workbox.expiration.Plugin({
          maxAgeSeconds: 60 * 60 * 24 * 365,
          maxEntries: 30,
        }),
      ],
      method: 'GET',
      cacheableResponse: { statuses: [0, 200] },
    })
  )
}

self.addEventListener('push', event => {
  if (!(self.Notification && self.Notification.permission === 'granted')) {
    return
  }

  var data = {}
  if (event.data) {
    data = event.data.json()
  }
  console.info('push data', data)
  var title = data.title || 'Something Has Happened'
  var message = data.message || "Here's something you might want to check out."
  var link = data.url
  // const title = 'Push Codelab'
  // const options = {
  //   body: 'Yay it works.',
  //   icon: 'images/icon.png',
  //   badge: 'images/badge.png',
  // }
  self.registration.showNotification(title, {
    body: message,
    tag: 'simple-push-demo-notification',
    icon: '/assets/img/android-chrome-192x192.png',
    image: '/assets/img/apple-touch-icon.png',
    data: {
      link: link,
    },
  })

  // var notification = new Notification(title, {
  //   body: message,
  //   tag: 'simple-push-demo-notification',
  //   icon: icon,
  // })

  // notification.addEventListener('click', function() {
  //   if (clients.openWindow) {
  //     clients.openWindow('https://example.blog.com/2015/03/04/something-new.html')
  //   }
  // })

  // let push_message = event.data.text()
  // console.info('message', push_message)
  // click_open_url = 'https://www.markusantonwolf.com'
  // const options = {
  //   body: push_message,
  //   icon: './assets/img/logo.svg',
  // }
})

self.addEventListener('install', function(event) {
  self.skipWaiting()

  event.waitUntil(console.info('install skipWaiting'))
})

self.addEventListener('notificationclick', function(event) {
  // here data you access from event using event.notification.data
  console.log('On notification click: ', event.notification)
  const clickedNotification = event.notification
  clickedNotification.close()
  const promiseChain = clients.openWindow(clickedNotification.data.link)
  event.waitUntil(promiseChain)
})

self.addEventListener('message', event => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting()
  }
})

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request).then(function(response) {
      // Cache hit - return response
      // console.info('event', event)
      if (response) {
        return response
      }
      return fetch(event.request)
    })
  )
})
