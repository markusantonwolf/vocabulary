<template>
  <div class="px-6 mt-24 mb-6">
    <div class="text-center">
      <img class="max-w-xs w-1/2 my-6 mx-auto" alt="Error" :src="error" />
      <BaseHeadline :text="$t('pages.error.title')" />
      <p class="text-2xl leading-tight">{{ $t('pages.error.description') }}</p>
      <router-link
        class="inline-block button px-12 py-6 mt-12"
        :to="{name: 'Home', params: { transition: 'next'}}"
      >{{ $t('pages.home.title') }}</router-link>
    </div>
  </div>
</template>

<script>
import error from '@/assets/img/error.svg'
import BaseHeadline from '../components/BaseHeadline'
export default {
  name: 'Search',
  data() {
    return {
      error: error,
    }
  },
  components: { BaseHeadline },
  beforeChange() {
    this.setPageTitle(this.$t('pages.error.title'))
    this.setPageDescription(this.$t('pages.error.description'))
  },
  mounted() {
    this.setPageTitle(this.$t('pages.error.title'))
    this.setPageDescription(this.$t('pages.error.description'))
  },
}
</script>
