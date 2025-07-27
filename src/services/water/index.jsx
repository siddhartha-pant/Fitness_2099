export const uploadUserWater = async (token, { amount, date }) => {
  const payload = {
    amount: amount,
    date: date,
  };
  try {
    const response = await baseAPI.post(
      "https://connectusonfitness.onrender.com/api/v1/nutrition/water",
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

export const getUserWater = async (token) => {
  try {
    const response = await baseAPI.get(
      "https://connectusonfitness.onrender.com/api/v1/nutrition/water",
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
