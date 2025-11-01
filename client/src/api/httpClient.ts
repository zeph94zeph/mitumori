import axios from 'axios';

const httpClient = axios.create({
  baseURL: '/api',
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
