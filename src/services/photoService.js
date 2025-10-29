import axios from "axios";

const url = "https://api.unsplash.com/photos";
const ACCESS_KEY = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;

const authHeaders = () => {
    if (!ACCESS_KEY) {
        console.warn('VITE_UNSPLASH_ACCESS_KEY is not set. Requests may fail.');
    }
    return {
        Authorization: `Client-ID ${ACCESS_KEY}`
    };
};

export const fetchPhotos = async (page, per_page) => {
    try {
        const response = await axios.get(url, {
            params: { page, per_page },
            headers: authHeaders()
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching photos:", error);
        return [];
    }
}

export const fetchPhotosById = async (id) => {
    try {
        const response = await axios.get(`${url}/${id}`, {
            headers: authHeaders()
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching photo by ID:", error);
        return null;
    }
}