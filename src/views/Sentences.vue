<template>
  <div class="px-6 mt-24 mb-12">
    <BaseHeadline :text="$t('navigation.groups')" />
    <div class="grid grid-cols-2 md:grid-cols-3 gap-6">
      <router-link
        class="flex flex-col text-center items-center shadow-lg rounded-lg border-2 border-pink-800 leading-tight p-6"
        :to="{name: 'Sentence', params: {group: item, transition: 'next'}}"
        v-for="(item, index) in groups"
        :key="index"
      >
        <p class="text-3xl text-gray-900">{{ $t('groups.' + item + '.name') }}</p>
        <p class="text-base text-gray-900 mb-2">{{ $t('groups.' + item + '.description') }}</p>
      </router-link>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import BaseHeadline from '../components/BaseHeadline'

export default {
  name: 'Groups',
  props: ['setPageTitle', 'setPageDescription'],
  components: { BaseHeadline },
  data() {
    return {}
  },
  computed: {
    ...mapState('vocabulary', ['groups']),
  },
  methods: {},
  beforeUpdate() {
    this.setPageTitle(this.$t('pages.groups.title'))
    this.setPageDescription(this.$t('pages.groups.description'))
  },
  mounted() {
    this.setPageTitle(this.$t('pages.groups.title'))
    this.setPageDescription(this.$t('pages.groups.description'))
    this.$store.commit('navigation/SET_BACK', { name: 'Home' })
    this.$store.commit('navigation/SET_BACKLABEL', 'navigation.home')
  },
}
</script>
