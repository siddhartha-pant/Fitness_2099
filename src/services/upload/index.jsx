export const createImageProfile = async (token, { image }) => {
  const formData = new FormData();
  formData.append("image", image); // 'image' here should be a File or Blob

  try {
    const response = await baseAPI.post(
      "https://connectusonfitness.onrender.com/api/v1/upload/profile-image",
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
