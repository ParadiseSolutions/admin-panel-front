import axios from "axios";
import { API_URL, options } from "../index";



export const statusUpdateRol = (id, body) => {
    const url = `${API_URL}/roles/${id}/status`;
    return axios.put (url, body, {
      headers: options,
    });
  };

export const deleteRol = (id) => {
    const url = `${API_URL}/roles/${id}`;
    return axios.delete (url, {
      headers: options,
    });
  };
export const getPermissionType = () => {
    const url = `${API_URL}/permissionTypes`;
    return axios.get (url, {
      headers: options,
    });
  };

  export const createRol = (body) => {
    const url = `${API_URL}/roles`;
    return axios.post (url, body, {
      headers: options,
    });
  };

  export const getRol = (id) => {
    const url = `${API_URL}/roles/${id}`;
    return axios.get (url, {
      headers: options,
    });
  };

  export const editRolAPI = (id, body) => {
    const url = `${API_URL}/roles/${id}`;
    return axios.put (url, body, {
      headers: options,
    });
  };