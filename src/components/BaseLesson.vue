<template>
  <div class="button flex flex-col items-center p-6">
    <p class="text-3xl font-semibold">{{ day }}</p>
    <p class="text-base font-medium mb-2">{{ date }}</p>
  </div>
</template>

<script>
import dateformat from 'dateformat'
import lowerCase from 'lodash/lowerCase'

export default {
  name: 'BaseLesson',
  props: {
    lesson: {
      type: String,
      required: true,
      default: () => {
        return new Date()
      },
    },
  },
  components: {},
  computed: {
    day: function() {
      return this.$t(lowerCase(dateformat(this.lesson, 'dddd')))
    },
    date: function() {
      return dateformat(this.lesson, this.$t('dateformat'))
    },
  },
  methods: {},
}
</script>
