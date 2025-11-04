import axios from 'axios';

const baseURL = import.meta.env.VITE_API_URL || '/api';

const httpClient = axios.create({
  baseURL,
  withCredentials: true
});

httpClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${token}`
    };
  }
  return config;
});

export default httpClient;
