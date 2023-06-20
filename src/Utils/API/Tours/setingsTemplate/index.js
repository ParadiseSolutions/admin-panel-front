import axios from "axios";
import { API_URL, options } from "../../index";

export const getTourAPI = (id) => {
  const url = `${API_URL}/tours/${id}`;
  return axios.get(url, {
    headers: options,
  });
};

export const updateBookingSettings = (id, body) => {
  const url = `${API_URL}/tours/${id}/bookingSettings`;
  return axios.put(url, body, {
    headers: options,
  });
};
