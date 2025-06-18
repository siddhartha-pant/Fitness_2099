// src/api/api.js
import axios from 'axios';

const API = axios.create({
  baseURL: 'https://connectusonfitness.onrender.com/', // **IMPORTANT: Replace with your actual backend URL**
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // This is CRUCIAL for sending and receiving cookies
});

// Request interceptor: No need to manually attach token from localStorage anymore,
// as Axios will automatically send HttpOnly cookies with each request.
API.interceptors.request.use(
  (config) => {
    // If you have other headers you need to set (e.g., X-CSRF-Token), do it here
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for handling common errors (e.g., token expiration)
API.interceptors.response.use(
  (response) => response,
  (error) => {
    // Example: If 401 Unauthorized, it means the cookie token was invalid or expired.
    if (error.response && error.response.status === 401) {
      console.log('Unauthorized request. Session expired or invalid. Logging out.');
      // Dispatch a logout action (or redirect) from here if possible,
      // or let components react to changes in isAuthenticated state (which will be handled by fetchUserSession).
    }
    return Promise.reject(error);
  }
);

// --- Auth API Calls ---
// These endpoints should now return the JWT in an HttpOnly cookie
// and possibly also user data in the JSON response body.
export const signUpApi = (userData) => API.post('/auth/signup', userData);
export const signInApi = (credentials) => API.post('/auth/signin', credentials);

// New endpoint: To check if a user is authenticated and get their data from the cookie session
export const fetchUserSessionApi = () => API.get('/auth/me'); // Or /auth/user, /profile, etc.
export const logoutApi = () => API.post('/auth/logout'); // Assuming your backend has a logout endpoint to clear the cookie

export default API;