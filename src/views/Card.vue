<template>
  <div class="px-6 mt-24 mb-12" v-if="valid">
    <BaseHeadline
      :text="$t('navigation.trainings')"
      :subtext="$t(filter) + ': ' + value_name"
      :vocabulary="vocabulary_route"
    />
    <div
      class="flex flex-col justify-center items-center relative min-h-screen-1/2 rounded-lg shadow-xl border border-gray-200 bg-white max-w-2xl mx-auto p-12 animation"
      :class="{'animation-in': animIn, 'animation-out': animOut}"
    >
      <p
        ref="word"
        class="text-5xl font-medium text-center leading-none mb-2"
      >{{isC2L ? card.pinyin : $t('vocabulary.' + card.id)}}</p>
      <div class="relative border rounded-lg border-gray-300 bg-gray-200 w-full p-6 pt-10 mt-10">
        <BaseContentVoice :type="card.type" :category="card.category" :name="card.id" />
        <span class="block text-3xl font-light text-center">{{ card.characters}}</span>
      </div>
      <div class="grid grid-cols-2 grid-rows-2 gap-6 w-full -mx-6 mt-12">
        <a
          class="button flex justify-center items-center leading-tight break-word min-h-sm"
          v-for="answer in cardAnswers()"
          :key="answer.id"
          @click.prevent="check(answer.id, $event)"
        >{{ isC2L ? $t('vocabulary.' + answer.id) : answer.pinyin }}</a>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import BaseHeadline from '../components/BaseHeadline'
import BaseContentVoice from '../components/BaseContentVoice'

export default {
  name: 'Card',
  props: ['filter', 'value', 'setPageTitle', 'setPageDescription'],
  components: { BaseHeadline, BaseContentVoice },
  data() {
    return {
      valid: false,
      card: {},
      answers: {},
      card_next: {},
      animOut: false,
      animIn: true,
      animLeaveOut: true,
    }
  },
  computed: {
    ...mapGetters('vocabulary', ['isC2L']),
    isLesson: function() {
      return this.filter === 'lesson' ? true : false
    },
    value_name: function() {
      if (this.isLesson) {
        return this.value
      }
      return this.$t('categories.' + this.value)
    },
    vocabulary_route: function() {
      const route = {
        name: this.isLesson ? 'Lesson' : 'Category',
        params: {},
      }
      if (this.isLesson) {
        route.params.lesson = this.value
      } else {
        route.params.category = this.value
      }
      return route
    },
  },
  methods: {
    getPlural: function() {
      return this.isLesson ? 'lessons' : 'categories'
    },
    check: function(id, event) {
      event.target.classList.add('button--click')
      if (id === this.card.id) {
        const self = this
        this.$store.dispatch('notification/add', { message: this.$t('correct'), type: 'success' })
        this.animOut = true
        setTimeout(function() {
          self.animOut = false
          self.animIn = true
          event.target.classList.remove('button--click')
          self.card = self.cardNext()
        }, 200)
      } else {
        this.$store.dispatch('notification/add', { message: this.$t('wrong'), type: 'error' })
        setTimeout(function() {
          event.target.classList.remove('button--click')
        }, 200)
      }
    },
    cardNext: function() {
      return this.$store.getters['vocabulary/trainingCardNext'](this.filter, this.value, this.card.id)
    },
    cardAnswers: function() {
      return this.$store.getters['vocabulary/trainingCardAnswers'](this.filter, this.value, this.card.id)
    },
  },
  beforeMount() {
    const count = this.$store.getters['vocabulary/contentCount'](this.filter, this.value)
    if (count <= 6) {
      this.$store.dispatch('notification/add', { message: this.$t('not-enough-content'), type: 'info' })
      this.$router.push({ name: 'Training', params: { filter: this.filter } })
    } else {
      this.card = this.$store.getters['vocabulary/trainingCardRandom'](this.filter, this.value)
      this.valid = true
    }
  },
  beforeUpdate() {
    this.setPageTitle(
      this.$t('pages.card.title', { card: this.isC2L ? this.card.characters : this.$t('vocabulary.' + this.card.id) })
    )
    this.setPageDescription(
      this.$t('pages.card.description', {
        card: this.isC2L ? this.card.characters : this.$t('vocabulary.' + this.card.id),
      })
    )
  },
  mounted() {
    this.setPageTitle(
      this.$t('pages.card.title', { card: this.isC2L ? this.card.characters : this.$t('vocabulary.' + this.card.id) })
    )
    this.setPageDescription(
      this.$t('pages.card.description', {
        card: this.isC2L ? this.card.characters : this.$t('vocabulary.' + this.card.id),
      })
    )
    this.$store.commit('navigation/SET_BACK', { name: 'Training', params: { filter: this.filter } })
    this.$store.commit('navigation/SET_BACKLABEL', 'pages.' + this.getPlural() + '.title')
  },
}
</script>

<style lang="postcss" scoped>
.animation {
  animation-iteration-count: 1;
  animation-timing-function: ease-in-out;
  animation-delay: 0s;
  animation-direction: normal;
  animation-duration: 0.2s;
  animation-fill-mode: both;
}
.animation-in {
  opacity: 0;
  animation-name: animation-enter;
}

@keyframes animation-enter {
  0% {
    transform: translateX(20vw);
    opacity: 0;
  }
  100% {
    transform: translateX(0);
    opacity: 1;
  }
}

.animation-out {
  opacity: 1;
  animation-name: animation-leave;
}

@keyframes animation-leave {
  0% {
    transform: translateX(0);
    opacity: 1;
  }
  100% {
    transform: translateX(-20vw);
    opacity: 0;
  }
}
</style>
