<template>
  <transition name="voice__show">
    <div class="voice" :class="{'mt-0':playing_init}" v-if="playing_available && playing_init">
      <div class="voice__action w-12 h-12" @click="play()" v-if="!playing_voice">
        <BaseIcon name="play"></BaseIcon>
      </div>
      <div class="voice__action w-12 h-12" @click="stop()" v-if="playing_voice">
        <BaseIcon name="pause"></BaseIcon>
      </div>
    </div>
  </transition>
</template>

<script>
import BaseIcon from '../components/BaseIcon'
import { AUDIO_PUBLIC_FOLDER } from '@/constants/data'

export default {
  name: 'BaseContentVoice',
  props: ['type', 'category', 'name'],
  components: { BaseIcon },
  data() {
    return {
      voice: null,
      duration: null,
      playing_init: false,
      playing_available: false,
      playing_voice: false,
    }
  },
  methods: {
    play: function() {
      this.voice.play()
      this.playing_voice = true
    },
    stop: function() {
      this.voice.pause()
      this.playing_voice = false
    },
  },
  beforeMount() {
    if (this.name !== '') {
      this.playing_init = true
    }
  },
  mounted() {
    const self = this
    const src = AUDIO_PUBLIC_FOLDER + '/' + this.type + '/' + this.category + '/' + this.name + '.mp3'
    this.voice = new Audio(src)
    this.voice.volume = 0.8
    this.voice.addEventListener('canplaythrough', () => {
      self.duration = self.voice.duration
      self.playing_available = true
    })
    this.voice.addEventListener('ended', event => {
      event.target.currentTime = 0
      self.playing_voice = false
    })
  },
}
</script>


<style lang="postcss" scoped>
.voice {
  @apply absolute;
  top: -1.5rem;
  left: 50%;
  transform: translateX(-50%) scale(1);
}
.voice__action {
  @apply text-pink-800 bg-white rounded-full;
}
/* purgecss start ignore */
.voice__show-enter {
  opacity: 0;
  transform: translateX(-50%) scale(0.8);
}
.voice__show-enter-active {
  transition: opacity 1s, transform 0.5s;
}
.voice__show-leave-active {
  transition: opacity 1s, transform 0.5s;
}
.voice__show-leave-to {
  opacity: 0;
  transform: translateX(-50%) scale(0.6);
}
/* purgecss end ignore */
</style>

