// src/api/authApi.js
import API from './apiProvider';

export const signUpApi = (userData) => API.post('/auth/signup', userData);
export const signInApi = (credentials) => API.post('/auth/signin', credentials);
export const verifyEmailApi = (tokenData) => API.post('/auth/verify-email', tokenData); // Feature disabled on backend, but defining for completeness 