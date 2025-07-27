export const createProgressPhoto = async (token, { image, note }) => {
  const formData = new FormData();
  formData.append("image", image); // 'image' here should be a File or Blob
  formData.append("note", note);
  try {
    const response = await baseAPI.post(
      "https://connectusonfitness.onrender.com/api/v1/progress-photo/photo",
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchUserProgressImage = async (token) => {
  try {
    const response = await baseAPI.get(
      "https://connectusonfitness.onrender.com/api/v1/progress-photo/photo",
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
