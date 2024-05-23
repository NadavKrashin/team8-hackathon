import axios from 'axios';

// Create an axios instance
const axiosInstance = axios.create({
  baseURL: 'http://backend-champion.apps.cluster-4kbfb.4kbfb.sandbox1471.opentlc.com/',
});

// Function to make a GET request
export const fetchData = async (endpoint) => {
  try {
    const response = await axiosInstance.get(endpoint);
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

export default axiosInstance;
