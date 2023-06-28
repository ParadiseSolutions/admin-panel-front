import axios from "axios";
import { API_URL, options } from "../../index";

export const getTourAPI = (id) => {
  const url = `${API_URL}/tours/${id}`;
  return axios.get(url, {
    headers: options,
  });
};

export const updateAddonsInstructions = (id, body) => {
  const url = `${API_URL}/tours/${id}/addonsSettings`;
  return axios.put(url, body, {
    headers: options,
  });
};
