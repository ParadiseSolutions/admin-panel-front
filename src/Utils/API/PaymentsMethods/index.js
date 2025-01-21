import axios from "axios";
import { API_URL, options } from "../index";



export const getCountryPM = () => {
    const url = `${API_URL}/provider-payment-methods/countries`;
    return axios.get (url, {
      headers: options,
    });
  };
export const getCurrencyPM = () => {
    const url = `${API_URL}/provider-payment-methods/currency-options`;
    return axios.get (url, {
      headers: options,
    });
  };
  export const getAccountTypePM = () => {
    const url = `${API_URL}/provider-payment-methods/account-types`;
    return axios.get (url, {
      headers: options,
    });
  };

