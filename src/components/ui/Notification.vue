<template>
  <Transition >
    <div v-if="isShowing"
      class="notification-card"
      :style="{'backgroundColor': type === 'success' ? '#36d25b' : '#ff2828'}"
    >
      <p>{{message}}</p>
    </div>
  </Transition>
</template>

<script lang="ts" setup>
import { computed, Transition, watch } from "vue";
import { useAlertStore } from "@/store/AlertsStore";

const alertsStore = useAlertStore();

const isShowing = computed(() => {
  return alertsStore.isShowing;
})

const message = computed(() => {
  return alertsStore.message;
})

const type = computed(() => {
  return alertsStore.type;
})

watch(isShowing, () => {
  setTimeout(() => {
    alertsStore.resetAlert();
  }, 5000);
})

</script>

<style lang="scss" scoped>
.notification-card{
  position: absolute;
  right: 0;
  top: 0;
  margin: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  width: min(300px, 500px);
  min-height: 80px;
  box-shadow: 0 0 20px grey;

  p {
    font-size: 1rem;
    margin: 0;
    color: white;
    padding: 10px;
  }
}

.v-enter-active,
.v-leave-active {
  transition: all 0.2s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
  transform: translateY(-100px);
}
</style>