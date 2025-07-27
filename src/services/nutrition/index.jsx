export const createUserNutrition = async (
  token,
  { name, calories, protein, carbs, fat, date }
) => {
  const payload = {
    name: name,
    calories: calories,
    protein: protein,
    carbs: carbs,
    fat: fat,
    date: date,
  };
  try {
    const response = await baseAPI.post(
      "https://connectusonfitness.onrender.com/api/v1/nutrition/meal",
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

export const fetchUserNutrition = async (token) => {
  try {
    const response = await baseAPI.get(
      "api/v1/nutrition/meal/api/v1/nutrition/meal",
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
