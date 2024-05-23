import { fetchData, axiosInstance, uploadImage } from "./AxiosInstance";

export const getData = async () => {
  try {
    const data = await fetchData("/some-endpoint");
    console.log("Data:", data);
  } catch (error) {
    console.error("Error:", error);
  }
};

export const getUser = async () => {
  try {
    return await fetchData("/profiles/1");
  } catch (error) {
    console.error("Error:", error);
  }
};

export const getLeaderboard = async () => {
  try {
    return await fetchData("/leaderboard");
  } catch (error) {
    console.error("Error:", error);
  }
};

export const sendImage = async (imageFile, profileId, gameId) => {
  try {
    const data = await uploadImage(
      "/files/uploadfile",
      imageFile,
      profileId,
      gameId
    );
    console.log("Upload Success:", data);
  } catch (error) {
    console.error("Upload Error:", error);
  }
};

export const replaceUser = async (newUser) => {
  try {
    const data = await axiosInstance.post("/profiles/replace_profile", newUser);
    console.log("Upload Success:", data);
  } catch (error) {
    console.error("Upload Error:", error);
  }
};
