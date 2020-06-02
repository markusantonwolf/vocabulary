<template>
  <div class="voice" :class="{'mt-0':playing_init}" v-if="playing_available && playing_init">
    <div class="action" @click="play()" v-if="!playing_voice">
      <BaseIcon name="play" svgclass="w-10 h-10"></BaseIcon>
    </div>
    <div class="action" @click="stop()" v-if="playing_voice">
      <BaseIcon name="pause" svgclass="w-10 h-10"></BaseIcon>
    </div>
  </div>
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
  top: -2rem;
  left: 50%;
  transform: translateX(-50%);
}
.action {
  @apply text-pink-800 p-3;
}
</style>

