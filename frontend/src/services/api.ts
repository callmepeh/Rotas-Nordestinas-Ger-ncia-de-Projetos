import axios from "axios";

const baseURL = "http://localhost:5000";

export const api = axios.create({
  baseURL, 
});

// envia token automaticamente
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default api;
