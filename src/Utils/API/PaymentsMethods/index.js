import axios from "axios";
import { API_URL, options } from "../index";



export const getPaymentMethod = (id) => {
    const url = `${API_URL}/provider-payment-method/${id}`;
    return axios.get (url, {
      headers: options,
    });
  };
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
  export const getExtraFeePM = () => {
    const url = `${API_URL}/provider-payment-methods/extra-fees`;
    return axios.get (url, {
      headers: options,
    });
  };
  export const getPaymentInstructionPM = () => {
    const url = `${API_URL}/provider-payment-methods/payment-instructions`;
    return axios.get (url, {
      headers: options,
    });
  };
  export const postPaymentMethod = (body) => {
    const url = `${API_URL}/provider-payment-method`;
    return axios.post (url, body, {
      headers: options,
    });
  };

