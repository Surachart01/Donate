import axios from "axios";

// Set up the API URL
const API_URL = "http://localhost:4000/api";
const api = axios.create({
    baseURL: API_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

// Function to get QR Code
export const getQrcode = () => api.get("/qrcode");

// Function to get Instagram profile picture
export const profileIg = (username) => api.get(`/profile/${username}`);

// Function to get all donations
export const getAllDonates = () => api.get("/donates");

// Function to get a single donation by ID
export const getDonateById = (id) => api.get(`/donates/${id}`);

// Function to search donations by query (name/description)
export const searchDonate = (query) => api.get(`/donates/search?query=${query}`);

// Function to create a new donation
export const createDonate = (formData) => api.post("/donates", formData, {
    headers: {
        'Content-Type': 'multipart/form-data',
    }
});

// Function to edit an existing donation
export const editDonate = (id, formData) => api.put(`/donates/${id}`, formData, {
    headers: {
        'Content-Type': 'application/json',
    }
});

// Function to delete a donation by ID
export const deleteDonate = (id) => api.delete(`/donates/${id}`);
