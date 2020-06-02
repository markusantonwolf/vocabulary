<template>
  <div id="nav" class="fixed inset-x-0 top-0 w-full px-4 z-10">
    <div class="container hidden md:flex max-w-4xl flex-row justify-center items-center mx-auto">
      <div class="flex items-center ml-2">
        <router-link :to="{name: 'Home', params: {transition: 'next' }}" class>
          <img src="../assets/img/logo.svg" class="inline-block w-12 h-12" alt="Logo App" />
        </router-link>
      </div>
      <div class="flex justify-end items-center flex-grow leading-tight">
        <router-link
          :to="{name: item.name, params: {transition: 'next' }}"
          v-for="item in links"
          :key="item.id"
          class="relative text-pink-800 text-2xl font-normal py-5 px-8"
          rel="link"
        >{{ $t('navigation.' + item.id) }}</router-link>
      </div>
    </div>
    <div class="container mx-auto md:hidden grid grid-cols-3 gap-2 justify-start items-center py-3">
      <div>
        <div class="flex items-center text-pink-800" v-if="hasBack" @click="goBack">
          <div class="w-8 h-8 mr-2">
            <BaseIcon name="angleLeft"></BaseIcon>
          </div>
          <span class="truncate w-full font-semibold leading-tight">{{$t(backLabel)}}</span>
        </div>
      </div>
      <router-link :to="{name: 'Home', params: {transition: 'next' }}">
        <img src="../assets/img/logo.svg" class="block mx-auto w-10 h-10" alt="Logo App" />
      </router-link>
      <div class="justify-self-end text-pink-800 w-6 h-6" @click="openPopup">
        <BaseIcon name="ellipsisV"></BaseIcon>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import BaseIcon from '../components/BaseIcon'
import merge from 'lodash/merge'

export default {
  name: 'Navigation',
  components: { BaseIcon },
  watch: {
    $route() {
      this.$store.dispatch('navigation/navigate', this.$route.path)
    },
  },
  computed: {
    ...mapGetters('navigation', ['links', 'hasHistory', 'back', 'backLabel', 'hasBack']),
  },
  methods: {
    goBack: function() {
      const default_route = {
        params: {
          transition: 'previous',
        },
      }
      var route = merge(default_route, this.back)
      this.$router.push(route)
    },
    openPopup() {
      this.$store.commit('navigation/SET_POPUP', true)
    },
  },
}
</script>

<style lang="postcss" scoped>
#nav {
  background: linear-gradient(180deg, hsla(0, 0%, 100%, 0.9), rgba(242, 245, 249, 0.9) 95%, hsla(0, 0%, 93.7%, 0.9));
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.2);
}

.is-active[rel='link'] {
  @apply bg-pink-800 text-white font-semibold;
}
.is-exact-active {
  @apply text-gray-700 font-semibold;
}

a.is-active[rel='link']:first-of-type::before,
a.is-active[rel='link']::after {
  @apply border-pink-800;
}

a[rel='link']:first-of-type::before {
  @apply border-r-2 border-gray-400;
  content: '';
  position: absolute;
  top: 0px;
  left: -0.1rem;
  bottom: 0px;
}

a[rel='link']::after {
  @apply border-r-2 border-gray-400;
  content: '';
  position: absolute;
  top: 0px;
  right: -0.1rem;
  bottom: 0px;
}

/* a[rel='link']:last-of-type::after {
  display: none;
} */
</style>
