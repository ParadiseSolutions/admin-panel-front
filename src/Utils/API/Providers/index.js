import axios from "axios";
import { API_URL, options } from "../index";



export const updateProviders = (id, body) => {
    const url = `${API_URL}/providers/${id}/status`;
    return axios.put (url, body, {
      headers: options,
    });
  };

export const deleteProviderAPI = (id) => {
    const url = `${API_URL}/providers/${id}`;
    return axios.delete (url, {
      headers: options,
    });
  };

  export const createProviderAPI = (body) => {
    const url = `${API_URL}/providers/`;
    return axios.post (url, body, {
      headers: options,
    });
  };

  export const getProviderAPI = (id) => {
    const url = `${API_URL}/providers/${id}`;
    return axios.get (url, {
      headers: options,
    });
  };
  export const getContactsProviderAPI = (id) => {
    const url = `${API_URL}/operators/${id}/contacts`;
    return axios.get (url, {
      headers: options,
    });
  };
  export const getSocialProviderAPI = (id) => {
    const url = `${API_URL}/socialmedia/${id}`;
    return axios.get (url, {
      headers: options,
    });
  };

  export const updateProviderAPI = (id, body) => {
    const url = `${API_URL}/providers/${id}`;
    return axios.put (url, body, {
      headers: options,
    });
  };
  export const updateSocialProviderAPI = (id, body) => {
    const url = `${API_URL}/socialmedia/${id}`;
    return axios.put (url, body, {
      headers: options,
    });
  };

