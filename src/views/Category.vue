<template>
  <div class="px-6 mt-24 mb-12">
    <BaseHeadline :text="$t('categories.' + category)" :training="training_route" />
    <div class="flex flex-col">
      <router-link
        :to="{name: 'CategoryItem', params: {category: category, content_id: item.id, transition: 'next' }}"
        class="flex flex-row justify-between items-center py-2"
        v-for="(item) in words"
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

export default {
  name: 'Category',
  props: ['category', 'setPageTitle', 'setPageDescription'],
  components: { BaseIcon, BaseHeadline },
  data() {
    return {}
  },
  computed: {
    ...mapGetters('vocabulary', ['isC2L']),
    words: function() {
      return this.$store.getters['vocabulary/contentFilter']('category', this.category)
    },
    training_route: function() {
      const route = {
        name: 'TrainingCard',
        params: {
          filter: 'category',
          value: this.category,
        },
      }
      return route
    },
  },
  beforeUpdate() {
    this.setPageTitle(this.$t('pages.category.title'))
    this.setPageDescription(this.$t('pages.category.description'))
  },
  mounted() {
    this.setPageTitle(this.$t('pages.category.title'))
    this.setPageDescription(this.$t('pages.category.description'))
    this.$store.commit('navigation/SET_BACK', { name: 'Categories' })
    this.$store.commit('navigation/SET_BACKLABEL', 'navigation.categories')
  },
}
</script>

