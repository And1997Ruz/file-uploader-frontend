<template>
  <div
    class="dropzone"
    :class="{ 'dropzone-active': isDraggingOver }"
    @dragover.prevent=""
    @dragenter.prevent="isDraggingOver = true"
    @dragleave.prevent="isDraggingOver = false"
    @drop.prevent="handleDrop"
  >
    <img src="/assets/upload.svg" />
    <h1>
      Drag and drop images here or
      <label
        for="file-picker"
        class="choose"
        title="You can choose multiple images at once"
        >Choose a file
      </label>
    </h1>
    <input
      id="file-picker"
      type="file"
      multiple
      accept="image/png, image/jpeg"
      @change="handleFileSelect"
    />
    <div class="file-preview-wrapper" v-if="!!selectedFiles.length">
      <FilePreviewContainer
        :files="selectedFiles"
        @removeFile="handleFileRemove"
      />
    </div>
    <div class="btn-container" v-if="!!selectedFiles.length">
      <button
        :style="{ cursor: isUploading ? 'not-allowed' : 'pointer' }"
        @click="handleClear"
      >
        Clear
      </button>
      <button
        :style="{ cursor: isUploading ? 'not-allowed' : 'pointer' }"
        @click="handleUpload"
      >
        <LoadingSpinner v-if="isUploading" />
        <span v-else>Upload</span>
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import FilePreviewContainer from "@/components/dropzone/FilePreviewContainer.vue";
import LoadingSpinner from "@/components/ui/LoadingSpinner.vue";
import { uploadImages } from "@/api/filesApi";
import { useAlertStore } from "@/store/AlertsStore";
import { useImagesStore } from "@/store/ImagesStore";

const alertStore = useAlertStore();
const imagesStore = useImagesStore();

const isDraggingOver = ref<boolean>(false);
const isUploading = ref<boolean>(false);

const selectedFiles = ref<File[]>([]);

const handleFileSelect = (e: Event) => {
  const files = Array.from((e.target as HTMLInputElement).files || []);
  addFiles(files);

  //Need to reset the input value, otherwise the change event won't fire when choosing the same set of files as before
  (document.getElementById("file-picker") as HTMLInputElement).value = "";
};

const handleFileRemove = (file: File) => {
  if (isUploading.value) return;

  selectedFiles.value = selectedFiles.value.filter(
    (item) => item.name !== file.name
  );
};

const handleUpload = () => {
  if (isUploading.value) return;

  isUploading.value = true;

  uploadImages(selectedFiles.value)
    .then((res) => {
      alertStore.setAlert("success", res);
      imagesStore.getAllImages();
    })
    .catch((e: Error) => {
      alertStore.setAlert("error", e.message);
    })
    .finally(() => {
      selectedFiles.value = [];
      isUploading.value = false;
    });
};

const addFiles = (files: File[]) => {
  const filteredFiles = filterSupportedFormat(files);

  //To prevent uploading the same file multiple times
  selectedFiles.value = selectedFiles.value.concat(
    filteredFiles.filter(
      (item) =>
        !selectedFiles.value.some(
          (i) => i.name === item.name && i.size === item.size
        )
    )
  );
};

const handleDrop = (e: DragEvent) => {
  e.preventDefault();
  if (!e.dataTransfer) return;
  isDraggingOver.value = false;

  const files = Array.from(e.dataTransfer.files || []);
  addFiles(files);
};

const filterSupportedFormat = (files: File[]) => {
  const supportedFormats = ["image/jpeg", "image/png"];
  const filteredFiles = files.filter((file) =>
    supportedFormats.includes(file.type)
  );

  if (filteredFiles.length !== files.length) {
    alertStore.setAlert(
      "error",
      "One or more files were rejected. Supported formats are: [jpg, jpeg, png]"
    );
  }

  return filteredFiles;
};

const handleClear = () => {
  if (isUploading.value) return;
  selectedFiles.value = [];
};
</script>

<style scoped lang="scss">
$lightGreyBorder: #a6a6a6;
$lightGrey: #c0c0c0;
$darkGrey: #343434;

.dropzone {
  width: min(90%, 700px);
  border: 2px $lightGreyBorder dashed;
  background-color: $lightGrey;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 50px 0;

  .file-preview-wrapper {
    overflow-x: auto;
    overflow-y: hidden;
    padding: 15px 0;
    width: 95%;
  }

  img {
    width: 50px;
  }

  input {
    display: none;
  }
}

.dropzone-active {
  opacity: 50%;
  border: 3px $darkGrey dashed;

  & * {
    pointer-events: none;
  }
}

h1 {
  color: white;
  font-size: 1.5rem;
  padding: 0 15px;

  .choose {
    color: $darkGrey;
    text-decoration: underline;

    &:hover {
      cursor: pointer;
    }
  }
}

.btn-container {
  display: flex;
  margin-top: 20px;
  width: 100%;
  justify-content: center;

  button {
    margin: 0 10px;
    background-color: grey;
    color: white;
    font-size: 1rem;
    height: 50px;
    min-width: 120px;
    border: none;
    border-radius: 10px;
    box-shadow: 0 0 5px #000000;
    cursor: pointer;
    transition: all 0.2s ease-in;
    display: flex;
    justify-content: center;
    align-items: center;

    &:hover {
      transform: scale(1.05);
    }

    &:active {
      background-color: #1f1f1f;
    }
  }
}
</style>
