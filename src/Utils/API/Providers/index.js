import axios from "axios";
import { API_URL, options } from "../index";



export const updateProviders = (id, body) => {
    const url = `${API_URL}/providers/${id}/status`;
    return axios.put (url, body, {
      headers: options,
    });
  };

export const deleteProviderAPI = (id) => {
    const url = `${API_URL}/providers/${id}`;
    return axios.delete (url, {
      headers: options,
    });
  };

