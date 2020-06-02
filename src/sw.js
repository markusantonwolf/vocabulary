// custom service-worker.js
// if (workbox) {

// }

// var refreshing
// self.addEventListener('controllerchange', function() {
//   if (refreshing) return
//   refreshing = true
//   window.location.reload()
// })
// function promptUserToRefresh(reg) {
//   // this is just an example
//   // don't use window.confirm in real life; it's terrible
//   if (window.confirm('New version available! OK to refresh?')) {
//     reg.waiting.postMessage('skipWaiting')
//   }
// }
// function listenForWaitingServiceWorker(reg, callback) {
//   function awaitStateChange() {
//     reg.installing.addEventListener('statechange', function() {
//       if (this.state === 'installed') callback(reg)
//     })
//   }
//   if (!reg) return
//   if (reg.waiting) return callback(reg)
//   if (reg.installing) awaitStateChange()
//   reg.addEventListener('updatefound', awaitStateChange)
// }

// listenForWaitingServiceWorker(self, promptUserToRefresh)

// self.onupdatefound = () => {
//   const installingWorker = self.installing
//   installingWorker.onstatechange = () => {
//     switch (installingWorker.state) {
//       case 'installed':
//         if (navigator.serviceWorker.controller) {
//           // new update available
//           setTimeout(() => document.location.reload(true), 1000)
//           caches.keys().then(keys => {
//             keys.forEach(key => caches.delete(key))
//           })
//         }
//         break
//     }
//   }
// }

// // This code listens for the user's confirmation to update the app.
// self.addEventListener('message', e => {
//   if (!e.data) {
//     return
//   }

//   switch (e.data) {
//     case 'skipWaiting':
//       self.skipWaiting()
//       break
//     default:
//       // NOOP
//       break
//   }
// })
