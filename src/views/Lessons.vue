<template>
  <div class="px-6 mt-24 mb-12">
    <BaseHeadline :text="$t('navigation.lessons')" />
    <div class="grid grid-cols-2 md:grid-cols-3 gap-6">
      <router-link
        :to="{name: 'Lesson', params: {lesson: item, transition: 'next'}}"
        v-for="(item, index) in lessons"
        :key="index"
      >
        <BaseLesson :lesson="item" />
      </router-link>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import BaseHeadline from '../components/BaseHeadline'
import BaseLesson from '../components/BaseLesson'

export default {
  name: 'Lessons',
  props: ['setPageTitle', 'setPageDescription'],
  components: { BaseHeadline, BaseLesson },
  data() {
    return {}
  },
  computed: {
    ...mapState('vocabulary', ['lessons']),
  },
  beforeUpdate() {
    this.setPageTitle(this.$t('pages.lessons.title'))
    this.setPageDescription(this.$t('pages.lessons.description'))
  },
  mounted() {
    this.setPageTitle(this.$t('pages.lessons.title'))
    this.setPageDescription(this.$t('pages.lessons.description'))
    this.$store.commit('navigation/SET_BACK', { name: 'Home' })
    this.$store.commit('navigation/SET_BACKLABEL', 'navigation.home')
  },
}
</script>
