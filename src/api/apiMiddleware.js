import axios from "axios";
import { BASE_URL } from "../constants/ConstantVariable";

export const apiInstance = () => {
  return axios.create({
    baseURL: BASE_URL,
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const apiFormDataInstance = () => {
  return axios.create({
    baseURL: BASE_URL,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
