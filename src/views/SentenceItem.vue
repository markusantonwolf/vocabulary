<template>
  <div class="px-6 mt-24 mb-12">
    <BaseHeadline
      :text="$t('groups.' + group + '.name')"
      :subtext="$t('groups.' + group + '.description')"
    />
    <BaseContent filter="category" :value="group" :content_id="content_id" type="sentences" />
    <div class="text-base font-semibold text-center mt-12">{{contentIndex}} / {{contentCount}}</div>
  </div>
</template>

<script>
import BaseHeadline from '../components/BaseHeadline'
import BaseContent from '../components/BaseContent'

export default {
  name: 'Sentence',
  props: ['group', 'content_id', 'setPageTitle', 'setPageDescription'],
  components: { BaseHeadline, BaseContent },
  data() {
    return {}
  },
  computed: {
    contentIndex: function() {
      return this.$store.getters['vocabulary/contentIndex']('category', this.group, this.content_id, 'sentences') + 1
    },
    contentCount: function() {
      return this.$store.getters['vocabulary/contentCount']('category', this.group, 'sentences')
    },
    back: function() {
      const route = { name: 'Sentence', params: { group: this.group } }
      if (typeof this.$route.params.search !== 'undefined') {
        route.name = 'Search'
        route.params = { query: this.$route.params.search }
        return route
      }
      return route
    },
    backLabel: function() {
      if (typeof this.$route.params.search !== 'undefined') {
        return 'navigation.search'
      }
      return 'groups.' + this.group + '.name'
    },
  },
  beforeUpdate() {
    this.setPageTitle(this.$t('pages.sentence.title', { sentence: this.$t('vocabulary.' + this.content_id) }))
    this.setPageDescription(
      this.$t('pages.sentence.description', { sentence: this.$t('vocabulary.' + this.content_id) })
    )
  },
  mounted() {
    this.setPageTitle(this.$t('pages.sentence.title', { sentence: this.$t('vocabulary.' + this.content_id) }))
    this.setPageDescription(
      this.$t('pages.sentence.description', { sentence: this.$t('vocabulary.' + this.content_id) })
    )
    this.$store.commit('navigation/SET_BACK', this.back)
    this.$store.commit('navigation/SET_BACKLABEL', this.backLabel)
  },
}
</script>

<style lang="postcss" scoped>
</style>
