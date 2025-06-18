// src/api/api.js
import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api/v1', // IMPORTANT: Adjust this to your actual backend API base URL
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor to attach JWT token to outgoing requests
API.interceptors.request.use((req) => {
  const token = localStorage.getItem('token'); // Get token from local storage

  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export default API;