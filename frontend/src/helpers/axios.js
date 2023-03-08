import axios from "axios";

export const axiosInstance = baseUrl =>
  axios.create({
    baseURL: baseUrl,
  });
