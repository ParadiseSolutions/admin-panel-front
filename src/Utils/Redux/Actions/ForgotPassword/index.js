import axios from "axios";
import { API_URL, options } from "../../../API";

export const ForgotPasswordAction = (body) => {
    
  const url = `${API_URL}/forgot-password`;
  return axios.post(url, body, {
    headers: options,
  });
};