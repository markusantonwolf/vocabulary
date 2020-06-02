import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import './assets/tailwind.css'
import router from './router'
import store from './store'
import { i18n } from '@/plugins/i18n'
import VueClipboard from 'vue-clipboard2'
import VueMeta from 'vue-meta'
import Vue2TouchEvents from 'vue2-touch-events'

Vue.config.productionTip = false
VueClipboard.config.autoSetContainer = true
Vue.use(VueClipboard)
Vue.use(Vue2TouchEvents, {
  disableClick: false,
  touchClass: '',
  tapTolerance: 10,
  touchHoldTolerance: 400,
  swipeTolerance: 100,
  longTapTimeInterval: 400,
})
Vue.use(VueMeta, {
  attribute: 'rendered',
  refreshOnceOnNavigation: true,
})

new Vue({
  router,
  store,
  i18n,
  render: h => h(App),
}).$mount('#app')
