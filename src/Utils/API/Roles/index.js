import axios from "axios";
import { API_URL, options } from "../index";



export const statusUpdateRol = (id, body) => {
    const url = `${API_URL}/roles/${id}/status`;
    return axios.put (url, body, {
      headers: options,
    });
  };