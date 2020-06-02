<template>
  <transition name="window" mode="out-in">
    <div class="fixed inset-x-0 bottom-0 z-10 p-4" v-if="show">
      <div
        class="relative mx-auto flex flex-col items-center leading-tight h-full w-full bg-white border border-gray-300 rounded-lg shadow-2xl p-8 pt-16 max-w-2xl"
      >
        <div class="close_button text-pink-800" @click="close">
          <BaseIcon name="times"></BaseIcon>
        </div>
        <div class="grid grid-cols-4 w-full gap-12 justify-center items-center">
          <div class="block w-16 h-16">
            <img src="@/assets/img/android-chrome-512x512.png" alt />
          </div>
          <div class="col-span-3">
            <p class="text-3xl font-normal">{{$t('site')}}</p>
            <p class="text-lg font-light">{{$t('welcome')}}</p>
          </div>
        </div>
        <div class="flex flex-col items-center my-2 mt-8">
          <div class="button px-6 py-3" @click="showInstallPrompt">{{$t('installapp.button')}}</div>
          <p class="text-base text-center mt-4">{{$t('installapp.description')}}</p>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { mapGetters } from 'vuex'
import BaseIcon from '../components/BaseIcon'

export default {
  name: 'TheInstallApp',
  components: { BaseIcon },
  data() {
    return {
      show: false,
      installAppPrompt: null,
    }
  },
  computed: {
    ...mapGetters('navigation', ['isStandAlone', 'isMobile', 'hasDeclinedAppInstall']),
    text: function() {
      return ''
    },
  },
  methods: {
    close: function() {
      this.show = false
    },
    showInstallPrompt: function() {
      // Show the prompt
      this.installAppPrompt.prompt()
      // Wait for the user to respond to the prompt
      this.installAppPrompt.userChoice.then(choiceResult => {
        if (choiceResult.outcome === 'accepted') {
          // console.log('User accepted the A2HS prompt')
          this.$store.commit('navigation/SET_DECLINEDAPPINSTALL', false)
        } else {
          this.$store.commit('navigation/SET_DECLINEDAPPINSTALL', true)
          // console.log('User dismissed the A2HS prompt')
        }
        this.installAppPrompt = null
      })
    },
  },
  beforeMount() {
    if (!this.isStandAlone && this.isMobile && !this.hasDeclinedAppInstall) {
      const self = this
      window.addEventListener('beforeinstallprompt', e => {
        e.preventDefault()
        self.show = true
        self.installAppPrompt = e
      })
    }
  },
}
</script>

<style lang="postcss" scoped>
.close_button {
  @apply absolute w-10 h-10;
  right: 1rem;
  top: 1rem;
}

.window-enter {
  opacity: 0;
}

.window-enter-active {
  animation-iteration-count: 1;
  animation-timing-function: ease-in-out;
  animation-delay: 0s;
  animation-direction: normal;
  animation-name: animation-show;
  animation-duration: 0.2s;
  animation-fill-mode: both;
}
.window-leave-active {
  animation-iteration-count: 1;
  animation-timing-function: ease-in-out;
  animation-delay: 0s;
  animation-direction: normal;
  animation-name: animation-hide;
  animation-duration: 0.2s;
  animation-fill-mode: both;
}
.window-leave-to {
  opacity: 0;
}
/* left END */

@keyframes animation-show {
  0% {
    transform: scale(0.9);
    opacity: 0;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}
@keyframes animation-hide {
  0% {
    transform: scale(1);
    opacity: 1;
  }
  100% {
    transform: scale(0.9);
    opacity: 0;
  }
}
</style>
