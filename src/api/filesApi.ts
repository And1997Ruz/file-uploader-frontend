import axios from "axios"
import { ImageWithMetadata } from "@/types";

const BASE_URL = process.env.VUE_APP_BASE_URL || "http://localhost:8080/api";

export const uploadImages = async (files: File[]): Promise<string> => {
    const formData = new FormData();
    files.forEach((file) => {
        formData.append("file", file);
    })
    const response = await axios.post(`${BASE_URL}/images`, formData, {timeout: 10000});
    return response.data;
}

export const fetchAllImages = async (): Promise<ImageWithMetadata[]> => {
    console.log('base', BASE_URL);
    const response = await axios.get(`${BASE_URL}/images`);
    return response.data;
}

export const fetchImageByFilename = async (filename: string): Promise<ImageWithMetadata> => {
    const response = await axios.get(`${BASE_URL}/images/${filename}`);
    return response.data;
}