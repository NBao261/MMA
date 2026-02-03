import axios from "axios";

// API URL from environment variable (.env file)
// Use EXPO_PUBLIC_ prefix for client-side access in Expo SDK 49+
const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL;

console.log("API_BASE_URL:", API_BASE_URL);

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

export const getHandbags = async () => {
  try {
    console.log("Fetching handbags from:", API_BASE_URL + "/");
    const response = await api.get("/");
    console.log("Response received:", response.data?.length, "items");
    return response.data;
  } catch (error) {
    console.error("Error fetching handbags:", error.message);
    console.error(
      "Error details:",
      error.response?.status,
      error.response?.data,
    );
    throw error;
  }
};

export const getHandbagById = async (id) => {
  try {
    const response = await api.get(`/handbags/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching handbag:", error);
    throw error;
  }
};

export default api;
