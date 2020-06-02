<template>
  <div class="px-6 mt-24 mb-12">
    <BaseHeadline :text="getDay" :subtext="getDate" :training="training_route" />
    <div class="flex flex-col items-stretch">
      <router-link
        :to="{name: 'LessonItem', params: {lesson: lesson, content_id: item.id, transition: 'next' }}"
        class="flex flex-row justify-between items-center py-2"
        v-for="(item) in content"
        :key="item.id"
      >
        <div class="flex flex-row justify-between flex-grow items-center leading-none my-4">
          <span
            class="text-2xl md:text-3xl font-light mx-6"
          >{{ isC2L ? item.pinyin : $t('vocabulary.' + item.id)}}</span>
          <span
            class="text-base md:text-xl font-light text-gray-500 mx-6 text-right"
          >{{ isC2L ? $t('vocabulary.' + item.id) : item.pinyin }}</span>
        </div>
        <div class="text-pink-800 w-10 h-10">
          <BaseIcon name="angleRight"></BaseIcon>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import BaseIcon from '../components/BaseIcon'
import BaseHeadline from '../components/BaseHeadline'
import dateformat from 'dateformat'
import lowerCase from 'lodash/lowerCase'

export default {
  name: 'Lessons',
  props: ['lesson', 'setPageTitle', 'setPageDescription'],
  components: { BaseIcon, BaseHeadline },
  data() {
    return {}
  },
  computed: {
    ...mapGetters('vocabulary', ['isC2L']),
    content: function() {
      return this.$store.getters['vocabulary/contentFilter']('lesson', this.lesson)
    },
    getDay: function() {
      return this.$t(lowerCase(dateformat(this.lesson, 'dddd')))
    },
    getDate: function() {
      return dateformat(this.lesson, this.$t('dateformat'))
    },
    training_route: function() {
      const route = {
        name: 'TrainingCard',
        params: {
          filter: 'lesson',
          value: this.lesson,
        },
      }
      return route
    },
  },
  beforeUpdate() {
    this.setPageTitle(this.$t('pages.lesson.title', { lession: this.getDay }))
    this.setPageDescription(this.$t('pages.lesson.description', { lession: this.getDay + ' - ' + this.getDate }))
  },
  mounted() {
    this.setPageTitle(this.$t('pages.lesson.title', { lession: this.getDay }))
    this.setPageDescription(this.$t('pages.lesson.description', { lession: this.getDay + ' - ' + this.getDate }))
    this.$store.commit('navigation/SET_BACK', { name: 'Lessons' })
    this.$store.commit('navigation/SET_BACKLABEL', 'navigation.lessons')
  },
}
</script>
