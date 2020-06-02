<template>
  <div class="px-6 mt-24 mb-12">
    <BaseHeadline
      :text="$t('groups.' + group + '.name')"
      :subtext="$t('groups.' + group + '.description')"
    />
    <div class="flex flex-col items-stretch">
      <router-link
        :to="{name: 'SentenceItem', params: {group: group, content_id: item.id, transition: 'next' }}"
        class="flex flex-row justify-between items-center py-2 cursor-pointer my-4"
        :class="item.class"
        v-for="(item, index) in sentences"
        :key="index"
      >
        <div class="flex flex-col items-start leading-tight mr-4">
          <span class="text-2xl font-light break-all">{{ item.pinyin}}</span>
          <span class="text-base font-light text-gray-500 mt-2">{{ item.characters}}</span>
        </div>
        <div class="text-pink-800 w-10 h-10">
          <BaseIcon name="angleRight"></BaseIcon>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
import BaseIcon from '../components/BaseIcon'
import BaseHeadline from '../components/BaseHeadline'

export default {
  name: 'Group',
  props: ['group', 'setPageTitle', 'setPageDescription'],
  components: { BaseIcon, BaseHeadline },
  data() {
    return {
      actual: 0,
      details: false,
    }
  },
  computed: {
    sentences: function() {
      return this.$store.getters['vocabulary/contentFilter']('category', this.group)
    },
  },
  beforeUpdate() {
    this.setPageTitle(this.$t('pages.groups.title', { lesson: this.$t('groups.' + this.group + '.name') }))
    this.setPageDescription(this.$t('pages.groups.description', { lesson: this.$t('groups.' + this.group + '.name') }))
  },
  mounted() {
    this.setPageTitle(this.$t('pages.groups.title', { lesson: this.$t('groups.' + this.group + '.name') }))
    this.setPageDescription(this.$t('pages.groups.description', { lesson: this.$t('groups.' + this.group + '.name') }))
    this.$store.commit('navigation/SET_BACK', { name: 'Sentences' })
    this.$store.commit('navigation/SET_BACKLABEL', 'navigation.groups')
  },
}
</script>
