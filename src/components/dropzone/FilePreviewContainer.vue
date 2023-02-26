<template>
  <div class="file-preview-container">
    <div class="preview" v-for="file in props.files" :key="file.name">
      <FilePreview :file="file" v-bind="$attrs"/>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineProps } from "vue";
import FilePreview from "./FilePreview.vue"

interface Props {
  files: File[]
}
const props = defineProps<Props>();

</script>

<style lang="scss" scoped>
$darkGrey: #343434;

.file-preview-container{
  display: flex;
}

.preview{
  min-width: 150px;
  height: 150px;
  margin: 0 10px;
  border-radius: 10px;
  border: 2px solid white;
  transition: all .2s ease-in;
  position: relative;
  overflow: hidden;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 5px 10px grey;
  }
}

</style>