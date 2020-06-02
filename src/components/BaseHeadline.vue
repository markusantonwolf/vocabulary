<template>
  <div class="grid grid-cols-6 items-center mb-6 md:mb-12">
    <div class="hidden md:block">
      <div class="text-pink-800 w-12 h-12" v-if="hasBack" @click="goBack">
        <BaseIcon name="angleLeft"></BaseIcon>
      </div>
    </div>
    <div class="font-light text-center leading-tight break-all col-start-2 col-span-4">
      <h2 class="text-5xl text-gray-900">{{ text }}</h2>
      <h3 class="text-3xl text-gray-600" v-show="hasSubtext">{{ subtext }}</h3>
    </div>
    <div class="justify-self-end">
      <div class="text-pink-800 w-10 h-10" v-if="hasTraining" @click="goTraining">
        <BaseIcon name="graduateCap"></BaseIcon>
      </div>
      <div class="text-pink-800 w-10 h-10" v-if="hasVocabulary" @click="goVocabulary">
        <BaseIcon name="language"></BaseIcon>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import BaseIcon from '../components/BaseIcon'
import merge from 'lodash/merge'

export default {
  name: 'BaseHeadline',
  props: {
    text: { type: String, required: true },
    subtext: {
      type: String,
      required: false,
      default: '',
    },
    training: {
      type: Object,
      required: false,
      default: () => {
        return {}
      },
    },
    vocabulary: {
      type: Object,
      required: false,
      default: () => {
        return {}
      },
    },
  },
  components: { BaseIcon },
  computed: {
    ...mapGetters('navigation', ['back', 'backLabel', 'hasBack']),
    hasSubtext: function() {
      if (this.subtext !== '') {
        return true
      }
      return false
    },
    hasTraining() {
      return Object.keys(this.training).length !== 0 ? true : false
    },
    hasVocabulary() {
      return Object.keys(this.vocabulary).length !== 0 ? true : false
    },
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
    goTraining() {
      this.$store.dispatch('notification/add', { message: this.$t('training'), type: 'info' })
      this.$router.push(this.training)
    },
    goVocabulary() {
      this.$store.dispatch('notification/add', { message: this.$t('look-up'), type: 'info' })
      this.$router.push(this.vocabulary)
    },
  },
}
</script>
