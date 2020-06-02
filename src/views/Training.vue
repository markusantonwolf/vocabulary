<template>
  <div class="px-6 mt-24 mb-12">
    <BaseHeadline :text="$t('training')" :subtext="getSubtext()" />
    <div class="grid grid-cols-2 md:grid-cols-3 gap-6">
      <router-link
        :to="{name: 'TrainingCard', params: {filter: filter, value: item, transition: 'next'}}"
        v-for="(item, index) in content"
        :key="index"
      >
        <BaseLesson :lesson="item" v-if="isLesson" />
        <BaseCategory :category="item" v-if="!isLesson" />
      </router-link>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import BaseHeadline from '../components/BaseHeadline'
import BaseCategory from '../components/BaseCategory'
import BaseLesson from '../components/BaseLesson'

export default {
  name: 'Training',
  components: { BaseHeadline, BaseCategory, BaseLesson },
  props: ['filter', 'setPageTitle', 'setPageDescription'],
  computed: {
    ...mapState('vocabulary', ['categories', 'lessons']),
    content: function() {
      return this.filter === 'lesson' ? this.lessons : this.categories
    },
    isLesson: function() {
      return this.filter === 'lesson' ? true : false
    },
    filter_name: function() {
      return this.$t('pages.' + this.filter + '.title')
    },
  },
  methods: {
    getSubtext: function() {
      return this.isLesson ? this.$t('pages.lessons.title') : this.$t('pages.categories.title')
    },
  },
  beforeUpdate() {
    this.setPageTitle(this.$t('pages.training.title', { filter: this.filter_name }))
    this.setPageDescription(this.$t('pages.training.description', { filter: this.filter_name }))
  },
  mounted() {
    this.setPageTitle(this.$t('pages.training.title', { filter: this.filter_name }))
    this.setPageDescription(this.$t('pages.training.description', { filter: this.filter_name }))
    this.$store.commit('navigation/SET_BACK', { name: 'Trainings' })
    this.$store.commit('navigation/SET_BACKLABEL', 'navigation.trainings')
  },
}
</script>
