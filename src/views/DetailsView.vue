<template>
  <div class="container" v-if="!isLoading">
    <div class="image-wrapper">
      <span>{{imageName}}</span>
      <img :src="fileSrc"  :alt="fileSrc"/>
    </div>
    <div class="metadata-container" v-if="!!image?.metadata?.length">
      <Metadata :metadata="image.metadata" :key="metadata?.tagName" />
    </div>
    <span v-else>This image doesn't contain any metadata</span>
  </div>
</template>

<script lang="ts" setup>
import { useRoute } from "vue-router";
import { computed, onMounted, ref } from "vue";
import { useImagesStore } from "@/store/ImagesStore";
import Metadata from "@/components/images/Metadata"
import { ImageWithMetadata } from "@/types";
import { useAlertStore } from "@/store/AlertsStore";

const BASE_URL = process.env.VUE_APP_BASE_URL || "http://localhost:8080/api";

const route = useRoute();
const imagesStore = useImagesStore();
const alertsStore = useAlertStore();

const image = ref<ImageWithMetadata>();
const isLoading = ref<boolean>(false);

const imageName = computed(() => {
  return route.params?.filename?.toString() || "";
})

const fileSrc = computed(() => {
  return `${BASE_URL}/static/${imageName.value || ""}`
})

onMounted(() => {
  isLoading.value = true;
  imagesStore.getImage(imageName.value)
      .then(res => image.value = res)
      .catch((e: Error) => alertsStore.setAlert("error", e.message))
      .finally(() => isLoading.value = false);
})

</script>

<style lang="scss" scoped>

.container {
  height: 90vh;
  margin: auto;
  padding: 20px;
  display: flex;
  flex-direction: row;

  .metadata-container {
    height: 100%;
    width: auto;
    padding: 10px;
    overflow-y: auto;
  }
}

@media only screen and (max-width: 1000px) {
  .container {
    flex-direction: column;
    height: 100%;
  }
}

.image-wrapper{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  border: 2px black dotted;
  margin: 0 10px;
  padding: 10px;

  span {
    font-size: 1rem;
    padding: 15px 0;
  }
}

img {
  padding: 0 20px;
  max-width: 500px;
  height: 100%;
  object-fit: cover;
}
</style>