import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  profile: {},
  name: "",
  age: "",
  weight: "",
  gender: "",
  trainingExperience: "",
  aim: "",
  bodyMeasurements: {
    chest: "",
    waist: "",
    hips: "",
    biceps: "",
    thigh: "",
    shoulders: "",
    neck: "",
  },
};

const UserSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loadUserprofile: (state, action) => {
      console.log(action.payload, "ye payload hau");
      state.profile = action.payload;
    },
  },
});

export default UserSlice.reducer;
export const { loadUserprofile } = UserSlice.actions;
