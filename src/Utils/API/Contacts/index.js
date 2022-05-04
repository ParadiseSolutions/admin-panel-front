import axios from "axios";
import { API_URL, options } from "../index";

export const createContactAPI = (body) => {
  const url = `${API_URL}/contacts`;
  return axios.post(url, body, {headers:options});
};

export const deleteContactAPI = (id) => {
  const url = `${API_URL}/contacts/${id}`;
  return axios.delete(url, {headers:options});
};

export const updateStatusContactAPI = (id, body) => {
  const url = `${API_URL}/contacts/${id}/status`;
  return axios.put(url, body, {headers:options});
};

