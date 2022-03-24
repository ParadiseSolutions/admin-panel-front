import axios from "axios";
import { API_URL, options } from "../index";



export const updateUser = (id, body) => {
    const url = `${API_URL}/users/${id}/status`;
    return axios.put (url, body, {
      headers: options,
    });
  };

export const deleteUser = (id) => {
    const url = `${API_URL}/users/${id}`;
    return axios.delete (url, {
      headers: options,
    });
  };
