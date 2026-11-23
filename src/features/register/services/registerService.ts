import axios from "axios";

const API = `${process.env.REACT_APP_API_URL}/api/register`;

export const registerUser = async (data:any) => {
  return axios.post(API, data);
};