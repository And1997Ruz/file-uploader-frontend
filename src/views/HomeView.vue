<template>
  <div class="container">
    <Dropzone />
    <ImageList v-if="!!images.length"/>
  </div>
</template>

<script lang="ts" setup>
import Dropzone from "../components/dropzone/Dropzone.vue"
import { computed, onMounted } from "vue";
import { useImagesStore } from "@/store/ImagesStore";
import ImageList from "@/components/images/ImagesList"

const imagesStore = useImagesStore();

const images = computed(() => {
  return imagesStore.images;
})

onMounted(async () => {
  await imagesStore.getAllImages();
})
</script>

<style>
.container{
  width: 100vw;
  height: 100vh;
  max-width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>