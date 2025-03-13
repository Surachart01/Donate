import axios from "axios";

// const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000/api";
const API_URL =  "http://localhost:4000/api";
const api = axios.create({
    baseURL: API_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

export const getQrcode = () => api.get("/qrcode")