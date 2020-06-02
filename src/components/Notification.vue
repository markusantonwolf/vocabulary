<template>
  <transition name="message" mode="out-in">
    <div class="notification-container" v-if="notifications.length">
      <transition-group name="message-inside" tag="div" mode="out-in">
        <NotificationElement
          v-for="notification in notifications"
          :key="notification.id"
          :notification="notification"
        />
      </transition-group>
    </div>
  </transition>
</template>

<script>
import NotificationElement from '@/components/NotificationElement.vue'
import { mapState } from 'vuex'

export default {
  name: 'Notification',
  components: {
    NotificationElement,
  },
  computed: {
    ...mapState('notification', ['notifications']),
  },
}
</script>

<style lang="postcss" scoped>
.notification-container {
  position: fixed;
  width: calc(100% - 2rem);
  z-index: 9999;
  top: 4rem;
  right: 1rem;
  left: 1rem;
  transform: none;
  border-radius: 0;
  border: none;
}

/* @screen md {
  .notification-container {
    max-width: 20%;
    z-index: 9999;
    top: 3.6rem;
    left: 50%;
    width: 500px;
    transform: translateX(-50%);
  }
} */

.message-enter-to {
  opacity: 0;
  transform: translateX(-50%);
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
  transform: translateX(-50%);
}

@keyframes animation-enter {
  0% {
    transform: translateX(-50%) translateY(-5rem);
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
    transform: translateX(-50%) translateY(-5rem);
    opacity: 0;
  }
}

.message-inside-enter-to {
  opacity: 0;
}

.message-inside-enter-active {
  animation-iteration-count: 1;
  animation-timing-function: ease-in-out;
  animation-delay: 0s;
  animation-direction: normal;
  animation-name: animation-enter;
  animation-duration: 0.2s;
  animation-fill-mode: both;
}
.message-inside-leave-active {
  animation-iteration-count: 1;
  animation-timing-function: ease-in-out;
  animation-delay: 0s;
  animation-direction: normal;
  animation-name: animation-leave;
  animation-duration: 0.2s;
  animation-fill-mode: both;
}
.message-inside-leave-to {
  opacity: 0;
}

@keyframes animation-enter {
  0% {
    transform: translateY(-2rem);
    opacity: 0;
  }
  100% {
    transform: translateY(0px);
    opacity: 1;
  }
}
@keyframes animation-leave {
  0% {
    transform: translateY(0px);
    opacity: 1;
  }
  100% {
    transform: translateY(-2rem);
    opacity: 0;
  }
}
</style>
