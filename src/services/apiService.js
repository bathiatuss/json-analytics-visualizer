import axios from "axios";

const API_URL = "http://localhost:3003/api";
const REFRESH_URL = "http://localhost:3003/refresh";

export const fetchDataFromApi = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const refreshData = async () => {
  try {
    await axios.get(REFRESH_URL);
    return await fetchDataFromApi();
  } catch (error) {
    throw new Error(error.message);
  }
};
