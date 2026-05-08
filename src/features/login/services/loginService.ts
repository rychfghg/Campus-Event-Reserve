import axios from "axios";

const API = `${process.env.REACT_APP_API_URL}/api/login`;

export const loginUser = async (data: {
  email: string;
  password: string;
}) => {
  return axios.post(API, data);
};