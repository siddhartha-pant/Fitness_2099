import axios from "axios";

import { baseAPI } from "../../api/apiProvider";

export const getUserProfile = async (token) => {
  try {
    console.log(token);
    const response = await baseAPI.get(
      "https://connectusonfitness.onrender.com/api/v1/profile",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(response);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateUserProfile = async (token) => {
  try {
    console.log(token);
    const response = await baseAPI.patch(
      "https://connectusonfitness.onrender.com/api/v1/profile",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(response);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createUserProfile = async (
  token,
  { weight, age, gender, trainingExperience, aim, chest, waist }
) => {
  const payload = {
    weight: weight,
    age: age,
    gender: gender,
    trainingExperience: trainingExperience,
    aim: aim,
    bodyMeasurements: {
      chest: chest,
      waist: waist,
    },
  };
  try {
    const response = await baseAPI.post(
      "https://connectusonfitness.onrender.com/api/v1/profile",
      payload,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(response);
    return response.data;
  } catch (error) {
    throw error;
  }
};
