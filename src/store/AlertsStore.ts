import { defineStore } from "pinia";
import { ref } from "vue";

export const useAlertStore = defineStore('alerts', () => {
    const isShowing = ref<boolean>(false);
    const type = ref<"success" | "error">();
    const message = ref<string>("you suck at coding");

    const setAlert = (alertType: "success" | "error", alertMessage: string) => {
        isShowing.value = true;
        type.value = alertType;
        message.value = alertMessage;
    }

    const resetAlert = () => {
        isShowing.value = false;
        message.value = "";
    }

    return { isShowing, type, message, resetAlert, setAlert };
})
