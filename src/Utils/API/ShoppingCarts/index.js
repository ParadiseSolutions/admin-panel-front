import axios from "axios";
import { API_URL, options } from "../index";



export const statusUpdate = (id, body) => {
    const url = `${API_URL}/carts/${id}/status`;
    return axios.put (url, body, {
      headers: options,
    });
  };

export const createCartAPI = (body) => {
    const url = `${API_URL}/carts`;
    return axios.post (url, body, {
      headers: options,
    });
  };

  export const getCartAPI = (id) => {
    const url = `${API_URL}/carts/${id}`;
    return axios.get (url, {
      headers: options,
    });
  };

  export const deleteCartAPI = (id) => {
    const url = `${API_URL}/carts/${id}`;
    return axios.delete (url, {
      headers: options,
    });
  };

  export const editCartAPI = (id, body) => {
    const url = `${API_URL}/carts/${id}`;
    return axios.put (url, body, {
      headers: options,
    });
  };

