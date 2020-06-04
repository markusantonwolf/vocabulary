<template>
  <transition name="start">
    <div
      class="relative w-full overflow-hidden"
      :class="{'overflow-hidden': popup, 'ismobile': isMobile}"
      v-if="loaded"
    >
      <TheAddHomescreen />
      <Navigation />
      <NavigationPopup />
      <Notification />
      <TheInstallApp />
      <div class="content bg-gray-100 border-r border-l border-gray-400">
        <div class="container mx-auto max-w-4xl">
          <transition :name="transitionName" mode="out-in">
            <router-view
              :key="$route.fullPath"
              :setPageTitle="setPageTitle"
              :setPageDescription="setPageDescription"
            ></router-view>
          </transition>
        </div>
        <TheFooter />
      </div>
    </div>
  </transition>
</template>


<script>
import { mapGetters } from 'vuex'
import Navigation from '@/components/Navigation'
import TheInstallApp from '@/components/TheInstallApp'
import TheFooter from '@/components/TheFooter'
import NavigationPopup from '@/components/NavigationPopup'
import Notification from '@/components/Notification'
import TheAddHomescreen from '@/components/TheAddHomescreen'

export default {
  name: 'App',
  components: { TheAddHomescreen, TheInstallApp, Navigation, TheFooter, NavigationPopup, Notification },
  data() {
    return {
      page: {
        title: '',
        description: '',
      },
      loaded: false,
    }
  },
  metaInfo() {
    return {
      title: this.page.title,
      meta: [
        { property: 'og:title', content: this.page.title },
        { property: 'og:description', content: this.page.description },
        { name: 'description', content: this.page.description },
      ],
    }
  },
  computed: {
    ...mapGetters('navigation', ['popup', 'isMobile']),
    transitionName: function() {
      if (typeof this.$route.params.transition === 'undefined') {
        return ''
      }
      return this.$route.params.transition
    },
    init: function() {
      return false
    },
    lang: function() {
      return this.$i18n.locale
    },
    test: function() {
      return this.$store.getters['vocabulary/contentSearch']('Bu')
    },
  },
  methods: {
    setHtmlLang: function() {
      const html = document.documentElement
      html.setAttribute('lang', this.$i18n.locale)
    },
    setPageTitle: function(value) {
      this.page.title = value + ' | ' + this.$t('site')
    },
    setPageDescription: function(value) {
      this.page.description = value
    },
    setViewHeight: function() {
      let vh = window.innerHeight * 0.01
      document.documentElement.style.setProperty('--vh', `${vh}px`)
    },
  },
  mounted: function() {
    if (this.$route.query.mode === 'standalone') {
      this.$store.commit('navigation/SET_STANDALONE', true)
    }
    this.setHtmlLang()
    this.setViewHeight()
    const self = this
    window.addEventListener('resize', function() {
      self.setViewHeight()
    })
    this.loaded = true
  },
  watch: {
    lang: function() {
      this.setHtmlLang()
    },
  },
}
</script>


<style lang="postcss" scoped>
.container {
  box-shadow: 0px 0px 100px -10px rgba(0, 0, 0, 0.078);
  perspective: 200vw;
  /* mx-auto max-w-4xl table overflow-hidden md:overflow-visible h-inherit min-h-screen pt-24 pb-4 */
}
.content {
  display: grid;
  grid-template-rows: 1fr auto;
  height: 100%;
  min-height: 100vh;
}

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.next-enter {
  opacity: 0;
}

.next-enter-active {
  animation-iteration-count: 1;
  animation-timing-function: ease-in-out;
  animation-delay: 0s;
  animation-direction: normal;
  animation-name: animation-enter;
  animation-duration: 0.3s;
  animation-fill-mode: both;
}
.next-leave-active {
  animation-iteration-count: 1;
  animation-timing-function: ease-in-out;
  animation-delay: 0s;
  animation-direction: normal;
  animation-name: animation-leave;
  animation-duration: 0.1s;
  animation-fill-mode: both;
}
.next-leave-to {
  opacity: 0;
}
/* previous START */
.previous-enter {
  opacity: 0;
}

.previous-enter-active {
  animation-iteration-count: 1;
  animation-timing-function: ease-in-out;
  animation-delay: 0s;
  animation-direction: normal;
  animation-name: animation-previous-enter;
  animation-duration: 0.3s;
  animation-fill-mode: both;
}
.previous-leave-active {
  animation-iteration-count: 1;
  animation-timing-function: ease-in-out;
  animation-delay: 0s;
  animation-direction: normal;
  animation-name: animation-previous-leave;
  animation-duration: 0.1s;
  animation-fill-mode: both;
}
.previous-leave-to {
  opacity: 0;
}
/* previous END */

/* right START */
.right-enter {
  opacity: 0;
}

.right-enter-active {
  animation-iteration-count: 1;
  animation-timing-function: ease-in-out;
  animation-delay: 0s;
  animation-direction: normal;
  animation-name: animation-right-enter;
  animation-duration: 0.2s;
  animation-fill-mode: both;
}
.right-leave-active {
  animation-iteration-count: 1;
  animation-timing-function: ease-in-out;
  animation-delay: 0.2s;
  animation-direction: normal;
  animation-name: animation-right-leave;
  animation-duration: 0.2s;
  animation-fill-mode: both;
}
.right-leave-to {
  opacity: 0;
}
/* right END */

/* left START */
.left-enter {
  opacity: 0;
}

.left-enter-active {
  animation-iteration-count: 1;
  animation-timing-function: ease-in-out;
  animation-delay: 0s;
  animation-direction: normal;
  animation-name: animation-left-enter;
  animation-duration: 0.2s;
  animation-fill-mode: both;
}
.left-leave-active {
  animation-iteration-count: 1;
  animation-timing-function: ease-in-out;
  animation-delay: 0.2s;
  animation-direction: normal;
  animation-name: animation-left-leave;
  animation-duration: 0.2s;
  animation-fill-mode: both;
}
.left-leave-to {
  opacity: 0;
}
/* left END */

.start-enter-active,
.start-leave-active {
  transition: transform 0.2s, opacity 0.2s;
  transform: scale(1);
  transition-delay: 0.1s;
}
.start-enter {
  opacity: 0;
  transform: scale(0.8);
}
.start-leave-to {
  opacity: 0;
  transform: scale(1.2);
}

@keyframes animation-enter {
  0% {
    transform: scale(1.1) translateX(5rem) rotate3d(0, 1, 0, -20deg);
    opacity: 0;
  }
  100% {
    transform: scale(1) translateX(0px) rotate3d(0, 1, 0, 0deg);
    opacity: 1;
  }
}
@keyframes animation-leave {
  0% {
    transform: scale(1) translateX(0px) rotate3d(0, 1, 0, 0deg);
    opacity: 1;
  }
  100% {
    transform: scale(0.9) translateX(-5rem) rotate3d(0, 1, 0, 20deg);
    opacity: 0;
  }
}
@keyframes animation-previous-enter {
  0% {
    transform: scale(1.1) translateX(-5rem) rotate3d(0, 1, 0, 20deg);
    opacity: 0;
  }
  100% {
    transform: scale(1) translateX(0px) rotate3d(0, 1, 0, 0deg);
    opacity: 1;
  }
}
@keyframes animation-previous-leave {
  0% {
    transform: scale(1) translateX(0px) rotate3d(0, 1, 0, 0deg);
    opacity: 1;
  }
  100% {
    transform: scale(0.9) translateX(5rem) rotate3d(0, 1, 0, -20deg);
    opacity: 0;
  }
}
@keyframes animation-right-enter {
  0% {
    transform: scaleX(0.8) translateX(20vw);
    opacity: 0;
  }
  100% {
    transform: scaleX(1) translateX(0);
    opacity: 1;
  }
}
@keyframes animation-right-leave {
  0% {
    transform: scaleX(1) translateX(0);
    opacity: 1;
  }
  100% {
    transform: scaleX(0.8) translateX(-20vw);
    opacity: 0;
  }
}
@keyframes animation-left-enter {
  0% {
    transform: scaleX(0.8) translateX(10vw);
    opacity: 0;
  }
  100% {
    transform: scaleX(1) translateX(0px);
    opacity: 1;
  }
}
@keyframes animation-left-leave {
  0% {
    transform: scaleX(1) translateX(0px);
    opacity: 1;
  }
  100% {
    transform: scaleX(0.8) translateX(-20vw);
    opacity: 0;
  }
}
</style>
