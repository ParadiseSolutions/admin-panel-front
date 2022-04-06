import axios from "axios";
import { API_URL, options } from "../index";

export const getTourType = (id) => {
    const url = `${API_URL}/tourtypes/${id}`;
    return axios.get(url, {headers:options});
  };

export const statusUpdate = (id, body) => {
    const url = `${API_URL}/tourtypes/${id}/status`;
    return axios.put (url, body, {
      headers: options,
    });
  };

  export const tourTypeDelete = (id) => {
    const url = `${API_URL}/tourtypes/${id}`;
    return axios.delete(url, {
      headers: options,
    });
  };

  export const createTourType = (body) => {
    const url = `${API_URL}/tourtypes`;
    return axios.post (url, body, {
      headers: options,  
    });  
  };
  
  export const editTourType = (id, body) => {
      const url = `${API_URL}/tourtypes/${id}`;
      return axios.put(url, body, {headers:options});
  }