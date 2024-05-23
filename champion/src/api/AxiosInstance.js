import axios from "axios";

// Create an axios instance
export const axiosInstance = axios.create({
  baseURL:
    "http://backend-champion.apps.cluster-4kbfb.4kbfb.sandbox1471.opentlc.com/",
});

// Function to make a GET request
export const fetchData = async (endpoint) => {
  try {
    const response = await axiosInstance.get(endpoint);
    return JSON.parse(JSON.stringify(response.data));
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export const uploadImage = async (endpoint, imageFile, profileId, gameId) => {
  const formData = new FormData();
  formData.append("file", imageFile);

  try {
    const response = await axiosInstance.post(endpoint, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      params: {
        profile_id: profileId,
        game_id: gameId,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error uploading image:", error);
    throw error;
  }
};

export default axiosInstance;
