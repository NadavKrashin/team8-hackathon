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
