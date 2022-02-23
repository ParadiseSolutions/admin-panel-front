import { LOGIN_INIT, LOGIN_SUCCESS, LOGIN_ERROR } from "../../Types";
import axios from "axios";
import { API_URL, options } from "../../../API";

export const ForgotPasswordAction = (body) => {
    
  const url = `${API_URL}/forgot-password`;
  return axios.post(url, body, {
    headers: options,
  });


};

const getLoginInit = () => ({
  type: LOGIN_INIT,
  payload: true,
});
const getLoginSuccess = () => ({
  type: LOGIN_SUCCESS,
  payload: true,
});
const getLoginError = () => ({
  type: LOGIN_ERROR,
  payload: true,
});