export const createUserProgress = async (
  token,
  { weight, energyLevel, notes }
) => {
  const payload = {
    weight: weight,
    energyLevel: energyLevel,
    notes: notes,
  };
  try {
    const response = await baseAPI.post(
      "https://connectusonfitness.onrender.com/api/v1/progress",
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

export const getUserProgress = async (token) => {
  try {
    const response = await baseAPI.get(
      "https://connectusonfitness.onrender.com/api/v1/progress",
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

export const updateUserProgress = async (token, { notes }) => {
  const payload = {
    notes: notes,
  };
  try {
    const response = await baseAPI.patch(
      "https://connectusonfitness.onrender.com/api/v1/progress/:entryId",
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
