// src/api/authApi.js
import API from "./apiProvider";

export const signUpApi = (userData) => API.post("/auth/signup", userData);
export const signInApi = (credentials) => API.post("/auth/signin", credentials);
export const verifyEmailApi = (tokenData) =>
  API.post("/auth/verify-email", tokenData); // Feature disabled on backend, but defining for completeness
export const verifyUserProfile = (tokenData) =>
  API.post("/api/v1/profile", tokenData);
export const fetchUserData = (tokenData) =>
  API.get("/api/v1/profile", tokenData);
export const updateProfile = (tokenData) =>
  API.patch("/api/v1/profile", tokenData);
