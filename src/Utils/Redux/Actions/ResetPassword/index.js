import axios from "axios";
import { API_URL, options } from "../../../API";

export const ResetPasswordAction = (body) => {
    
  const url = `${API_URL}/reset-password`;
  return axios.post(url, body, {
    headers: options,
  });
};