import axios from "axios";
import { API_URL, options } from "../index";



export const statusUpdate = (id, body) => {
    const url = `${API_URL}/websites/${id}/status`;
    return axios.put (url, body, {
      headers: options,
    });
  };

  export const websiteDelete = (id) => {
    const url = `${API_URL}/websites/${id}`;
    return axios.delete(url, {
      headers: options,
    });
  };

  export const createWebsite = (body) => {
    const url = `${API_URL}/websites`;
    return axios.post (url, body, {
      headers: options,
    });
  };