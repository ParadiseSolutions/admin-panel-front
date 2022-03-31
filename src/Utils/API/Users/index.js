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

  export const createUserAPI = (body) => {
    const url = `${API_URL}/users`;
    return axios.post (url, body, {
      headers: options,
    });
  };

  export const getUserAPI = (id) => {
    const url = `${API_URL}/users/${id}`;
    return axios.get (url, {
      headers: options,
    });
  };

  export const editUserAPI = (id, body) => {
    const url = `${API_URL}/users/${id}`;
    return axios.put (url, body, {
      headers: options,
    });
  };

  export const getUserDepAPI = () => {
    const url = `${API_URL}/departments?active=1`;
    return axios.get (url, {
      headers: options,
    });
  };
  export const getRolesDepAPI = () => {
    const url = `${API_URL}/roles?active=1`;
    return axios.get (url, {
      headers: options,
    });
  };
