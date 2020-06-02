<template>
  <div class="px-6 mt-24 mb-12">
    <BaseHeadline :text="$t('navigation.categories')" />
    <div class="grid grid-cols-2 md:grid-cols-3 gap-6">
      <router-link
        :to="{name: 'Category', params: {category: item, transition: 'next'}}"
        v-for="(item) in categories"
        :key="item.id"
      >
        <BaseCategory :category="item" />
      </router-link>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import BaseHeadline from '../components/BaseHeadline'
import BaseCategory from '../components/BaseCategory'

export default {
  name: 'Categories',
  props: ['setPageTitle', 'setPageDescription'],
  components: { BaseHeadline, BaseCategory },
  data() {
    return {}
  },
  computed: {
    ...mapState('vocabulary', ['categories']),
  },
  beforeUpdate() {
    this.setPageTitle(this.$t('pages.categories.title'))
    this.setPageDescription(this.$t('pages.categories.description'))
  },
  mounted() {
    this.setPageTitle(this.$t('pages.categories.title'))
    this.setPageDescription(this.$t('pages.categories.description'))
    this.$store.commit('navigation/SET_BACK', { name: 'Home' })
    this.$store.commit('navigation/SET_BACKLABEL', 'navigation.home')
  },
}
</script>
