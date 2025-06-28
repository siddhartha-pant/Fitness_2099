import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./AuthSlice.jsx";
import userReducer from "./UserSlice.jsx";
const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
  },
});
export default store;
