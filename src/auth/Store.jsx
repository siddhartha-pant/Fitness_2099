// src/app/store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
// Import other reducers as you create them
import profileReducer from '../features/profile/profileSlice';
import progressReducer from '../features/progress/progressSlice';
import nutritionReducer from '../features/nutrition/nutritionSlice';


const store = configureStore({
  reducer: {
    auth: authReducer,
    profile: profileReducer,
    progress: progressReducer,
    nutrition: nutritionReducer,
    // Add other reducers here
  },
});

export default store;