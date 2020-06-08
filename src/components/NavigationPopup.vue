<template>
  <transition name="showPopup">
    <div
      class="fixed inset-0 w-full h-full max-h-screen z-20 border border-gray-400 items-center bg-white leading-tight"
      v-show="popup"
    >
      <div class="close absolute text-pink-800 w-10 h-10" @click="closePopup">
        <BaseIcon name="times"></BaseIcon>
      </div>
      <div class="flex flex-col justify-between items-start p-12 pb-32 h-full">
        <div class="flex flex-col justify-start items-start flex-grow w-full">
          <a
            href
            class="text-xl w-full p-2"
            :class="{'text-gray-800 font-bold': lang.active, 'text-pink-800 font-medium': !lang.active}"
            @click.prevent="changeLanguage(lang.locale)"
            v-for="lang in languages"
            :key="lang.id"
          >{{lang.translation}}</a>
          <a
            href="switch-translation"
            class="text-xl w-full text-pink-800 font-medium p-2 mt-12"
            @click.prevent="changeDirection()"
          >{{ isC2L ? $t('navigation.directionC2L', {lang: 'Deutsch'}) : $t('navigation.directionL2C', {lang: 'Deutsch'})}}</a>
        </div>
        <div class="flex flex-col justify-end items-start w-full">
          <router-link
            :to="{name: 'Home', params: {transition: 'next' }}"
            class="text-pink-800 text-4xl font-light w-full p-2 my-2"
          >{{ $t('navigation.home') }}</router-link>
          <router-link
            :to="{name: item.name, params: {transition: 'next' }}"
            v-for="item in links"
            :key="item.id"
            class="text-pink-800 text-4xl font-light w-full p-2 my-2"
            rel="link"
          >{{ $t('navigation.' + item.id) }}</router-link>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { mapGetters } from 'vuex'
import BaseIcon from '../components/BaseIcon'

export default {
  name: 'NavigationPopup',
  components: { BaseIcon },
  watch: {
    $route() {
      this.$store.dispatch('navigation/navigate', this.$route.path)
      this.$store.commit('navigation/SET_POPUP', false)
    },
  },
  computed: {
    ...mapGetters('navigation', ['links', 'popup', 'languages']),
    ...mapGetters('vocabulary', ['isC2L']),
  },
  methods: {
    closePopup() {
      this.$store.commit('navigation/SET_POPUP', false)
    },
    changeLanguage(lang) {
      this.$i18n.locale = lang
      this.$store.commit('navigation/SET_LANGUAGE', lang)
      this.closePopup()
    },
    changeDirection() {
      this.$store.dispatch('vocabulary/switchLanguageDirection')
    },
  },
}
</script>


<style lang="postcss" scoped>
.is-active[rel='link'] {
  @apply text-gray-700 font-semibold;
}
.is-exact-active {
  @apply text-gray-700 font-semibold;
}
.close {
  right: 0.8rem;
  top: 1.2rem;
}

.showPopup-enter {
  opacity: 0;
}

.showPopup-enter-active {
  animation-iteration-count: 1;
  animation-timing-function: ease-in-out;
  animation-delay: 0s;
  animation-direction: normal;
  animation-name: animation-showPopup;
  animation-duration: 0.2s;
  animation-fill-mode: both;
  transform-origin: top right;
}
.showPopup-leave-active {
  animation-iteration-count: 1;
  animation-timing-function: ease-in-out;
  animation-delay: 0s;
  animation-direction: normal;
  animation-name: animation-hidePopup;
  animation-duration: 0.1s;
  animation-fill-mode: both;
  transform-origin: top right;
}
.showPopup-leave-to {
  opacity: 0;
}

@keyframes animation-showPopup {
  0% {
    transform: scale(0.8) translateX(20vw);
    border-bottom-left-radius: 50%;
    border-bottom-right-radius: 50%;
    border-top-left-radius: 50%;
    opacity: 0;
  }
  100% {
    transform: scale(1) translateX(0px);
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
    border-top-left-radius: 0;
    opacity: 1;
  }
}
@keyframes animation-hidePopup {
  0% {
    transform: scale(1) translateX(0vw);
    opacity: 1;
  }
  100% {
    transform: scale(0.8) translateX(20px);
    opacity: 0;
  }
}
</style>
