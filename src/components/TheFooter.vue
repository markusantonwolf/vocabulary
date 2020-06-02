<template>
  <div id="footer" class="bg-gray-800">
    <div class="container mx-auto max-w-4xl">
      <div
        class="grid grid-cols-1 md:grid-cols-2 justify-center text-white font-normal text-xs px-2 pt-3 pb-2 md:p-4"
      >
        <div class="flex justify-center md:justify-start items-center leading-tight">
          <div class="w-4 h-4 mr-2">
            <BaseIcon name="copyright"></BaseIcon>
          </div>
          <span>{{$t('copyright', {year: year})}}</span>
        </div>
        <div class="text-center md:text-right uppercase">
          <a :href="$t('info_href')" class="mr-4" target="_blank">{{$t('info')}}</a>
          <a :href="$t('imprint_href')" class="mr-4" target="_blank">{{$t('imprint')}}</a>
          <a :href="$t('privacy_href')" class target="_blank">{{$t('privacy')}}</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BaseIcon from '../components/BaseIcon'

export default {
  name: 'TheFooter',
  components: { BaseIcon },
  computed: {
    year: function() {
      const now = new Date()
      return now.getFullYear()
    },
  },
  methods: {},
}
</script>

<style lang="postcss" scoped>
#footer {
  /* fixed inset-x-0 bottom-0 w-full bg-gray-900 px-4 z-10 */
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.2);
}
</style>
