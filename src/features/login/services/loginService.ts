import axios from "axios";

const API = "http://localhost:8080/api/login";

export const loginUser = async (data: {
  email: string;
  password: string;
}) => {
  return axios.post(API, data);
};