<template>
  <div
    class="flex flex-col justify-center items-center relative text-center leading-tight min-h-screen-1/2 rounded-lg shadow-xl border border-gray-200 bg-white max-w-2xl mx-auto p-12"
    :class="{'animation-in': animIn, 'animation-out': animOut}"
    v-touch:swipe="swipeHandler"
  >
    <div class="button next" v-show="hasNext" @click="routePush('next')">
      <BaseIcon name="angleRight" svgclass="w-6 h-6"></BaseIcon>
    </div>
    <div class="button previous" v-show="hasPrevious" @click="routePush('previous')">
      <BaseIcon name="angleLeft" svgclass="w-6 h-6"></BaseIcon>
    </div>
    <p
      class="text-5xl font-medium"
      @click="copy('pinyin')"
    >{{ isC2L ? content.pinyin : $t('vocabulary.' + content.id)}}</p>
    <p
      class="text-xl font-medium text-gray-500 px-4 mt-4"
      @click="copy('translation')"
    >{{ isC2L ? $t('vocabulary.' + content.id) : content.pinyin }}</p>
    <div class="relative border rounded-lg border-gray-300 bg-gray-200 w-full mt-10">
      <BaseContentVoice type="words" :category="content.category" :name="content.id" />
      <span
        class="block text-3xl font-light text-center py-10 px-6"
        @click="copy('characters')"
      >{{ content.characters}}</span>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import BaseIcon from '../components/BaseIcon'
import BaseContentVoice from '../components/BaseContentVoice'

export default {
  name: 'BaseContent',
  props: ['filter', 'value', 'content_id', 'type'],
  components: { BaseIcon, BaseContentVoice },
  data() {
    return {
      animOut: false,
      animIn: true,
      animLeaveOut: true,
    }
  },
  computed: {
    ...mapGetters('vocabulary', ['isC2L']),
    content: function() {
      return this.$store.getters['vocabulary/contentId'](this.content_id)
    },
    contentNext: function() {
      return this.$store.getters['vocabulary/contentNext'](this.filter, this.value, this.content_id, this.type)
    },
    contentPrevious: function() {
      return this.$store.getters['vocabulary/contentPrevious'](this.filter, this.value, this.content_id, this.type)
    },
    hasNext: function() {
      if (this.content_id !== this.contentNext) {
        return true
      }
      return false
    },
    hasPrevious: function() {
      if (this.content_id !== this.contentPrevious) {
        return true
      }
      return false
    },
  },
  methods: {
    copy: function(item) {
      var value = ''
      switch (item) {
        case 'characters':
          value = this.content.characters
          break
        case 'pinyin':
          value = this.content.pinyin
          break
        default:
          value = this.$t('vocabulary.' + this.content_id)
          break
      }
      this.$copyText(value).then(
        () => {
          this.$store.dispatch('notification/add', { message: this.$t('copy-success'), type: 'info' })
        },
        () => {
          this.$store.dispatch('notification/add', { message: this.$t('copy-failed'), type: 'info' })
        }
      )
    },
    routePush(direction = 'next') {
      const options = {
        name: this.$route.name,
        params: {
          content_id: direction === 'next' ? this.contentNext : this.contentPrevious,
        },
      }
      options.params[this.type] = this.filter
      this.$router.push(options)
    },
    swipeHandler(direction) {
      if (direction === 'left') {
        if (this.hasNext) {
          this.animOut = true
          this.routePush('next')
        }
      } else if (direction === 'right') {
        if (this.hasPrevious) {
          this.animOut = true
          this.routePush('previous')
        }
      }
    },
  },
}
</script>

<style lang="postcss" scoped>
.next {
  @apply absolute rounded-full p-2;
  right: -1rem;
  transform: translateY(-50%);
}
.previous {
  @apply absolute rounded-full p-2;
  left: -1rem;
  transform: translateY(-50%);
}

.animation-left-out {
  transition-property: transform;
  transition-delay: 1s;
  transition-duration: 0.5s;
  transform: translateX(20vw);
}

.animation-in {
  opacity: 0;
  animation-iteration-count: 1;
  animation-timing-function: ease-in-out;
  animation-delay: 0s;
  animation-direction: normal;
  animation-name: animation-enter;
  animation-duration: 0.2s;
  animation-fill-mode: both;
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
  animation-iteration-count: 1;
  animation-timing-function: ease-in-out;
  animation-delay: 0s;
  animation-direction: normal;
  animation-name: animation-leave;
  animation-duration: 0.2s;
  animation-fill-mode: both;
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
