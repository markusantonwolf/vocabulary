<template>
  <div class="button flex flex-col justify-center items-center p-6">
    <div class="w-16">
      <img :src="src" :alt="name" />
    </div>
    <p class="text-lg font-semibold mt-4">{{ name }}</p>
  </div>
</template>

<script>
export default {
  name: 'BaseCategory',
  props: {
    category: {
      type: String,
      required: true,
      default: () => {
        return ''
      },
    },
  },
  components: {},
  computed: {
    name: function() {
      return this.$t('categories.' + this.category)
    },
    src: function() {
      try {
        return require('../assets/img/' + this.category + '.svg')
      } catch (e) {
        console.log('No image for: ' + this.category)
        return require('../assets/img/logo.svg')
      }
    },
  },
  methods: {},
}
</script>
