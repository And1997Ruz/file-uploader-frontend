import { defineStore } from "pinia";
import { ref } from "vue";
import { ImageWithMetadata } from "@/types";
import { fetchAllImages, fetchImageByFilename } from "@/api/filesApi";

export const useImagesStore = defineStore('images', () => {
    const images = ref<ImageWithMetadata[]>([]);

    const getAllImages = async () => {
        images.value = await fetchAllImages();
    }

    const getImage = async (filename: string): Promise<ImageWithMetadata> => {
        const image = images.value.find(i => i.filename === filename);
        if(image){
            return image;
        }else{
            return fetchImageByFilename(filename);
        }
    }
    return { getAllImages, images, getImage };
})