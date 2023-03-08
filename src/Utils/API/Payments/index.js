import axios from "axios";
import { API_URL, options } from "../index";


export const statusUpdatePayments = (id, body) => {
    const url = `${API_URL}/collects/${id}/status`;
    return axios.put (url, body, {
      headers: options,
    });
  };
export const createPaymentTypeAPI = (body) => {
    const url = `${API_URL}/collects`;
    return axios.post (url, body, {
      headers: options,
    });
  };
export const getPaymentTypeAPI = (id) => {
    const url = `${API_URL}/collects/${id}`;
    return axios.get (url, {
      headers: options,
    });
  };
export const deletePaymentTypeAPI = (id) => {
    const url = `${API_URL}/collects/${id}`;
    return axios.delete (url, {
      headers: options,
    });
  };

  export const putPaymentTypeAPI = (id, body) => {
    const url = `${API_URL}/collects/${id}`;
    return axios.put (url, body, {
      headers: options,
    });
  };

