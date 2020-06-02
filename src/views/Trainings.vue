<template>
  <div class="px-6 mt-24 mb-12">
    <BaseHeadline :text="$t('navigation.trainings')" />
    <div class="grid md:grid-cols-2 gap-6 justify-stretch">
      <router-link
        :to="{name: 'Training', params: {filter: item.filter, transition: 'next'}}"
        v-for="(item, index) in filter"
        :key="index"
        class="button flex flex-col justify-center items-center p-6"
      >
        <div class="w-32">
          <img
            class="drop-shadow"
            :src="getImgUrl(item.id)"
            :alt="$t('pages.' + item.id + '.title')"
          />
        </div>
        <p class="text-2xl font-semibold mt-8">{{ $t('pages.' + item.id + '.title') }}</p>
      </router-link>
    </div>
  </div>
</template>

<script>
import BaseHeadline from '../components/BaseHeadline'

export default {
  name: 'Training',
  components: { BaseHeadline },
  props: ['lesson', 'setPageTitle', 'setPageDescription'],
  data() {
    return {
      filter: [
        {
          id: 'lessons',
          filter: 'lesson',
        },
        {
          id: 'categories',
          filter: 'category',
        },
      ],
    }
  },
  computed: {},
  methods: {
    getImgUrl(pic) {
      try {
        return require('../assets/img/' + pic + '.svg')
      } catch (e) {
        console.log('No image for: ' + pic)
        return require('../assets/img/logo.svg')
      }
    },
  },
  beforeUpdate() {
    this.setPageTitle(this.$t('pages.trainings.title'))
    this.setPageDescription(this.$t('pages.trainings.description'))
  },
  mounted() {
    this.setPageTitle(this.$t('pages.trainings.title'))
    this.setPageDescription(this.$t('pages.trainings.description'))
    this.$store.commit('navigation/SET_BACK', { name: 'Home' })
    this.$store.commit('navigation/SET_BACKLABEL', 'navigation.home')
  },
}
</script>
