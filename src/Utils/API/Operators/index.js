import axios from "axios";
import { API_URL, options } from "../index";



export const updateOperatorStatus = (id, body) => {
    const url = `${API_URL}/operators/${id}/status`;
    return axios.put (url, body, {
      headers: options,
    });
  };

export const deleteOperatorAPI = (id) => {
    const url = `${API_URL}/operators/${id}`;
    return axios.delete (url, {
      headers: options,
    });
  };

  export const createOperatorAPI = (body) => {
    const url = `${API_URL}/operators`;
    return axios.post (url, body, {
      headers: options,
    });
  };

 