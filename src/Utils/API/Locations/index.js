import axios from "axios";
import { API_URL, options } from "../index";

export const getLocation = (id) => {
    const url = `${API_URL}/locations/${id}`;
    return axios.get(url, {headers:options});
  };

export const statusUpdate = (id, body) => {
    const url = `${API_URL}/locations/${id}/status`;
    return axios.put (url, body, {
      headers: options,
    });
  };

  export const locationDelete = (id) => {
    const url = `${API_URL}/locations/${id}`;
    return axios.delete(url, {
      headers: options,
    });
  };

  export const createLocation = (body) => {
    const url = `${API_URL}/locations`;
    return axios.post (url, body, {
      headers: options,  
    });  
  };
  
  export const editLocation = (id, body) => {
      const url = `${API_URL}/locations/${id}`;
      return axios.put(url, body, {headers:options});
  }