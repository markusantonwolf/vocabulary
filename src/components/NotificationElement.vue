<template>
  <div class="flex justify-center w-full text-center">
    <div class="notification rounded-lg shadow-md border my-2" :class="className">
      <p class="text-lg font-medium text-center p-2">{{ notification.message }}</p>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import { TIMEOUT } from '@/constants/notifications'

export default {
  name: 'NotificationElement',
  props: {
    notification: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      timeout: null,
    }
  },
  computed: {
    className: function() {
      if (typeof this.notification.type === undefined) {
        return ''
      }
      return 'notification--' + this.notification.type
    },
  },
  mounted() {
    this.timeout = setTimeout(() => this.remove(this.notification), TIMEOUT)
  },
  beforeDestroy() {
    clearTimeout(this.timeout)
  },
  methods: mapActions('notification', ['remove']),
}
</script>

<style lang="postcss" scoped>
.notification {
  @apply border-gray-600 w-full max-w-xl text-white;
  background-color: rgba(123, 123, 123, 0.9);
}
.notification--info {
  @apply border-yellow-300 text-yellow-900;
  background-color: rgba(254, 252, 191, 0.9);
}
.notification--error {
  @apply border-red-300 text-red-900;
  background-color: rgba(255, 215, 215, 0.9);
}
.notification--success {
  @apply border-teal-300 text-teal-900;
  background-color: rgba(178, 245, 234, 0.9);
}

.message-enter {
  opacity: 0;
}

.message-enter-active {
  animation-iteration-count: 1;
  animation-timing-function: ease-in-out;
  animation-delay: 0s;
  animation-direction: normal;
  animation-name: animation-enter;
  animation-duration: 0.2s;
  animation-fill-mode: both;
}
.message-leave-active {
  animation-iteration-count: 1;
  animation-timing-function: ease-in-out;
  animation-delay: 0s;
  animation-direction: normal;
  animation-name: animation-leave;
  animation-duration: 0.2s;
  animation-fill-mode: both;
}
.message-leave-to {
  opacity: 0;
}

@keyframes animation-enter {
  0% {
    transform: translateX(-50%) translateY(-5vh);
    opacity: 0;
  }
  100% {
    transform: translateX(-50%) translateY(0px);
    opacity: 1;
  }
}
@keyframes animation-leave {
  0% {
    transform: translateX(-50%) translateY(0px);
    opacity: 1;
  }
  100% {
    transform: translateX(-50%) translateY(-5vh);
    opacity: 0;
  }
}
</style>
