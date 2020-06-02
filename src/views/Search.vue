<template>
  <div class="px-6 mt-24 mb-6">
    <BaseHeadline :text="$t('pages.search.title')" :subtext="subtext" />
    <form class="mx-6" @submit.prevent="submit()">
      <input
        class="text-2xl text-center w-full border-2 border-gray-300 rounded-lg outline-none focus:border-pink-800 p-5"
        type="text"
        v-model.trim="phrase"
        :placeholder="$t('search_placeholder')"
      />
    </form>
    <div class="my-12" v-if="hasResult">
      <router-link
        :to="getRoute(item)"
        class="flex flex-row justify-between items-center py-2"
        v-for="(item, index) in result"
        :key="index"
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
export default {
  name: 'Search',
  props: ['query', 'setPageTitle', 'setPageDescription'],
  data() {
    return {
      phrase: '',
    }
  },
  components: { BaseHeadline, BaseIcon },
  computed: {
    ...mapGetters('vocabulary', ['isC2L']),
    hasResult: function() {
      if (this.phrase === '') {
        return false
      }
      return this.result.length === 0 ? false : true
    },
    result: function() {
      if (this.phrase === '') {
        return []
      }
      return this.$store.getters['vocabulary/contentSearch'](this.phrase)
    },
    subtext: function() {
      if (this.phrase === '') {
        return ''
      }
      return this.$t('pages.search.description', { query: this.phrase })
    },
  },
  methods: {
    submit: function() {
      if (this.$route.path !== '/search/' + this.phrase) {
        this.$router.push({ name: 'Search', params: { query: this.phrase } })
      }
    },
    getRoute: function(item) {
      const route = { name: '', params: { content_id: item.id } }
      if (item.type === 'words' && item.category !== '') {
        route.name = 'CategoryItem'
        route.params.category = item.category
      } else if (item.type === 'words' && item.lesson !== '') {
        route.name = 'LessonItem'
        route.params.lesson = item.lesson
      } else {
        route.name = 'SentenceItem'
        route.params.group = item.category
      }
      route.params.transition = 'next'
      route.params.search = this.phrase
      return route
    },
  },
  beforeMount() {
    if (typeof this.query !== 'undefined') {
      this.phrase = this.query
    }
  },
  beforeChange() {
    this.setPageTitle(this.$t('pages.search.title'))
    this.setPageDescription(this.$t('pages.search.description', { query: this.phrase }))
  },
  mounted() {
    this.setPageTitle(this.$t('pages.search.title'))
    this.setPageDescription(this.$t('pages.search.description', { query: this.phrase }))
    this.$store.commit('navigation/SET_BACK', { name: 'Home' })
    this.$store.commit('navigation/SET_BACKLABEL', 'navigation.home')
  },
}
</script>
