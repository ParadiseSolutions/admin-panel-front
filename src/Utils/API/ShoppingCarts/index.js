import axios from "axios";
import { API_URL, options } from "../index";



export const statusUpdate = (id, body) => {
    const url = `${API_URL}/carts/${id}/status`;
    return axios.put (url, body, {
      headers: options,
    });
  };
