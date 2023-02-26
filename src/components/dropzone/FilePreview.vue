<template>
  <div
    @mouseover="isActive = true"
    @mouseleave="isActive = false"
    class="wrapper"
  >
    <img
      class="image"
      :src="fileSrc"
      :alt="props.file.name"
    />
    <img
      v-if="isActive"
      class="remove"
      src="/assets/remove.svg"
      @click="handleClick"
      :alt="props.file.name"
      title="Remove image from the list"
    />
  </div>
</template>

<script lang="ts" setup>

import { computed, defineProps, onUnmounted, ref } from "vue";

interface Props {
  file: File;
}
const props = defineProps<Props>();
const emit = defineEmits(["removeFile"]);

const isActive = ref<boolean>(false);

const fileSrc = computed(() => {
  return URL.createObjectURL(props.file);
})

const handleClick = () => {
  emit("removeFile", props.file);
}

onUnmounted(() => {
  URL.revokeObjectURL(fileSrc.value);
})

</script>

<style lang="scss" scoped>
$darkGrey: #343434;

.wrapper{
  height: 100%;
}

.image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.remove{
  position: absolute;
  left: 0;
  top: 0;
  width: 30px;
  height: 30px;
  border-radius: 5px;
  margin: 3px;
  cursor: pointer;
}

</style>