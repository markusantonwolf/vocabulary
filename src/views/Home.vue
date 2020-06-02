<template>
  <div class="px-6 mt-24 mb-6">
    <div class="flex flex-col justify-center items-center text-center md:w-2/3 mx-auto">
      <img class="max-w-xs w-1/2 my-6" alt="Logo" src="@/assets/img/logo.svg" />
      <h1 class="text-5xl leading-tight my-4">{{ $t('welcome') }}</h1>
      <p class="text-xl leading-normal">{{ $t('description') }}</p>
      <div class="mt-12">
        <router-link
          v-for="(link, index) in links"
          :key="index"
          :to="{name: link.name, params: {transition: 'next'}}"
          class="inline-block button px-12 py-6 m-2"
        >{{$t('navigation.' + link.text)}}</router-link>
      </div>
      <div class="mt-6">
        <router-link
          :to="{name: 'Trainings', params: { transition: 'next'}}"
          class="inline-block button px-12 py-6 m-2"
        >{{$t('navigation.trainings')}}</router-link>
        <router-link
          :to="{name: 'Search', params: { transition: 'next'}}"
          class="inline-block button px-12 py-6 m-2"
        >{{$t('navigation.search')}}</router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home',
  props: ['setPageTitle', 'setPageDescription'],
  data() {
    return {
      links: [
        { name: 'Categories', text: 'categories' },
        { name: 'Lessons', text: 'lessons' },
        { name: 'Sentences', text: 'groups' },
      ],
    }
  },
  beforeUpdate() {
    this.setPageTitle(this.$t('pages.home.title'))
    this.setPageDescription(this.$t('pages.home.description'))
  },
  mounted() {
    this.setPageTitle(this.$t('pages.home.title'))
    this.setPageDescription(this.$t('pages.home.description'))
    this.$store.commit('navigation/SET_BACK', {})
  },
}
</script>
