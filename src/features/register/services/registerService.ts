import axios from "axios";

const API = "http://localhost:8080/api/register";

export const registerUser = async (data:any) => {
  return axios.post(API, data);
};