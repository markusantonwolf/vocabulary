<template>
  <div class="px-6 mt-24 mb-12">
    <BaseHeadline :text="headlineText" :subtext="headlineSubtext" :training="training_route" />
    <BaseContent :filter="filter" :value="value" :content_id="content_id" type="words" />
    <div class="text-base font-semibold text-center mt-12">{{contentIndex}} / {{contentCount}}</div>
  </div>
</template>

<script>
import BaseHeadline from '../components/BaseHeadline'
import BaseContent from '../components/BaseContent'
import dateformat from 'dateformat'
import lowerCase from 'lodash/lowerCase'
import upperFirst from 'lodash/upperFirst'

export default {
  name: 'Word',
  props: {
    lesson: {
      type: String,
      required: false,
      default: () => {
        return ''
      },
    },
    category: {
      type: String,
      required: false,
      default: () => {
        return ''
      },
    },
    content_id: {
      type: String,
      required: true,
    },
    setPageTitle: {
      type: Function,
      required: true,
    },
    setPageDescription: {
      type: Function,
      required: true,
    },
  },
  components: { BaseHeadline, BaseContent },
  data() {
    return {}
  },
  computed: {
    filter: function() {
      if (this.lesson !== '') {
        return 'lesson'
      }
      return 'category'
    },
    value: function() {
      if (this.lesson !== '') {
        return this.lesson
      }
      return this.category
    },
    headlineText: function() {
      if (this.filter === 'lesson') {
        return this.$t(lowerCase(dateformat(this.lesson, 'dddd')))
      }
      return this.$t('categories.' + this.category)
    },
    headlineSubtext: function() {
      if (this.filter === 'lesson') {
        return dateformat(this.lesson, this.$t('dateformat'))
      }
      return ''
    },
    contentIndex: function() {
      return this.$store.getters['vocabulary/contentIndex'](this.filter, this.value, this.content_id) + 1
    },
    contentCount: function() {
      return this.$store.getters['vocabulary/contentCount'](this.filter, this.value)
    },
    back: function() {
      const route = {
        name: '',
        params: {},
      }
      if (typeof this.$route.params.search !== 'undefined') {
        route.name = 'Search'
        route.params = { query: this.$route.params.search }
        return route
      }
      route.name = upperFirst(this.filter)
      route.params[this.filter] = this.value
      return route
    },
    backLabel: function() {
      if (typeof this.$route.params.search !== 'undefined') {
        return 'navigation.search'
      }
      if (this.filter === 'lesson') {
        return 'lesson'
      }
      return 'categories.' + this.category
    },
    training_route: function() {
      const route = {
        name: 'TrainingCard',
        params: {
          filter: this.filter,
          value: this.value,
        },
      }
      return route
    },
  },
  beforeUpdate() {
    this.setPageTitle(this.$t('pages.word.title', { word: this.$t('vocabulary.' + this.content_id) }))
    this.setPageDescription(this.$t('pages.word.description', { word: this.$t('vocabulary.' + this.content_id) }))
  },
  mounted() {
    this.setPageTitle(this.$t('pages.word.title', { word: this.$t('vocabulary.' + this.content_id) }))
    this.setPageDescription(this.$t('pages.word.description', { word: this.$t('vocabulary.' + this.content_id) }))
    this.$store.commit('navigation/SET_BACK', this.back)
    this.$store.commit('navigation/SET_BACKLABEL', this.backLabel)
  },
}
</script>

<style lang="postcss" scoped>
</style>
