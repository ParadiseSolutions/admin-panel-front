import axios from "axios";
import { API_URL, options } from "../index";



export const statusUpdate = (id, body) => {
    const url = `${API_URL}/departments/${id}/status`;
    return axios.put (url, body, {
      headers: options,
    });
  };

  export const departmentDelete = (id) => {
    const url = `${API_URL}/departments/${id}`;
    return axios.delete(url, {
      headers: options,
    });
  };

  export const createDepartment = (body) => {
    const url = `${API_URL}/departments`;
    return axios.post (url, body, {
      headers: options,
    });
  };