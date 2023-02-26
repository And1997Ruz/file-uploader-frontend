<template>
  <div :style="{'border-color': props?.color ? `${props.color} transparent ${props.color} transparent` : 'white transparent white transparent'}" class="spinner">
  </div>
</template>

<script setup lang="ts">

interface Props {
  color?: string;
}

const props = defineProps<Props>();
</script>

<style lang="scss" scoped>
.spinner {
  height: 80%;
  aspect-ratio: 1/1;
  border-radius: 100%;
  border: 3px solid white;
  border-color: white transparent white transparent;
  animation: spin infinite 1s linear;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
}
</style>