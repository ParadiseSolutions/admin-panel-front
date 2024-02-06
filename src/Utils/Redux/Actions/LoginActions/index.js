import axios from "axios";
import { API_URL, options } from "../../../API";

export const LoginData = (body) => {
  const url = `${API_URL}/login`;
  return axios.post(url, body, {
    headers: options,
  });
};