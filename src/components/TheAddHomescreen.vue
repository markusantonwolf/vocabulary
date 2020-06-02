<template>
  <transition name="window" mode="out-in">
    <div class="absolute h-screen inset-0 z-20 p-4" v-if="!isStandAlone && show">
      <div
        class="relative flex flex-col items-center text-center leading-tight h-full w-full bg-white border border-gray-300 rounded-lg shadow-xl p-4 pt-16"
      >
        <div class="close_button" @click="close">
          <BaseIcon name="times"></BaseIcon>
        </div>
        <h2 class="text-5xl my-6">{{$t('addhomescreen.headline')}}</h2>
        <p class="text-2xl my-12" v-text="text"></p>
      </div>
    </div>
  </transition>
</template>

<script>
import { mapGetters } from 'vuex'
import BaseIcon from '../components/BaseIcon'

export default {
  name: 'TheAddHomescreen',
  components: { BaseIcon },
  data() {
    return {
      show: false,
      installAppPrompt: false,
    }
  },
  computed: {
    ...mapGetters('navigation', ['isStandAlone', 'isMobile', 'isIos', 'isAndroid']),
    text: function() {
      if (this.isMobile) {
        if (this.isIos) {
          return this.$t('addhomescreen.text.ios')
        } else if (this.isAndroid) {
          return this.$t('addhomescreen.text.android')
        }
      }
      return ''
    },
  },
  methods: {
    close: function() {
      this.show = false
    },
  },
  beforeMount() {
    if (this.isMobile) {
      this.show = false
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
