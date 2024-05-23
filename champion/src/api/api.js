import axiosInstance, { fetchData } from "./api";

const getData = async () => {
  try {
    const data = await fetchData("/some-endpoint");
    console.log("Data:", data);
  } catch (error) {
    console.error("Error:", error);
  }
};

getData();


