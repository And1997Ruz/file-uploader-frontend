<template>
  <div class="images-container">
    <div v-for="image in images" :key="image.filename" title="Click to see detailed metadata">
      <RouterLink style="text-decoration: none; color: inherit;" :to="getPath(image)">
        <div class="image">
          {{image.filename}}
        </div>
      </RouterLink>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useImagesStore } from "@/store/ImagesStore";
import { computed } from "vue";
import { ImageWithMetadata } from "@/types";

const imagesStore = useImagesStore();

const images = computed(() => {
  return imagesStore.images;
})

const getPath = (image: ImageWithMetadata) => {
  return `/details/${image.filename}`
}
</script>

<style lang="scss" scoped>
$lightGrey: #c0c0c0;

.images-container{
  padding: 20px 0;
  width: min(90%, 700px);
}

.image {
  background-color: $lightGrey;
  margin: 10px 0;
  padding: 10px;
  border-radius: 10px;
  color: white;
  cursor: pointer;
  transition: all .3s ease;

  &:hover {
    box-shadow: 0 0 5px black;
    transform: scale(1.01);
  }
}

</style>