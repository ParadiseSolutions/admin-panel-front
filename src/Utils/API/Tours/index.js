import axios from "axios";
import { API_URL, options } from "../index";


export const statusUpdateTour = (id, body) => {
    const url = `${API_URL}/tours/${id}/status`;
    return axios.put (url, body, {
      headers: options,
    });
  };

  export const deleteTourAPI = (id) => {
    const url = `${API_URL}/tours/${id}`;
    return axios.delete (url, {
      headers: options,
    });
  };

  export const shoppingCartWebsite = (id) => {
    const url = `${API_URL}/websites/${id}/carts`;
    return axios.get (url, {
      headers: options,
    });
  };

  export const providerWebsite = (id) => {
    const url = `${API_URL}/websites/${id}/providers`;
    return axios.get (url, {
      headers: options,
    });
  };

  export const operatorWebsite = (id) => {
    const url = `${API_URL}/websites/${id}/operators`;
    return axios.get (url, {
      headers: options,
    });
  };