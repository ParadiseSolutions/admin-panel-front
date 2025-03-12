import axios from "axios";
import { API_URL, options } from "../index";



export const getBoatType = () => {
    const url = `${API_URL}/assets/boat-types`;
    return axios.get (url, {
      headers: options,
    });
  };
export const getBoatLocation = () => {
    const url = `${API_URL}/locations`;
    return axios.get (url, {
      headers: options,
    });
  };
export const getMarinaLocation = () => {
    const url = `${API_URL}/assets/marina-locations`;
    return axios.get (url, {
      headers: options,
    });
  };
export const getAccesability = () => {
    const url = `${API_URL}/assets/accesability`;
    return axios.get (url, {
      headers: options,
    });
  };
export const getBoatEdit = (id) => {
    const url = `${API_URL}/assets/boats/${id}`;
    return axios.get (url, {
      headers: options,
    });
  };
export const getVehicleType = () => {
    const url = `${API_URL}/assets/list`;
    return axios.get (url, {
      headers: options,
    });
  };
export const getVehicleSubType = () => {
    const url = `${API_URL}/assets/vehicle-subtype`;
    return axios.get (url, {
      headers: options,
    });
  };
export const getVehicleTransmision = () => {
    const url = `${API_URL}/assets/vehicle-transmissions`;
    return axios.get (url, {
      headers: options,
    });
  };
export const getOthersCategory = () => {
    const url = `${API_URL}/categories`;
    return axios.get (url, {
      headers: options,
    });
  };

  export const postBoat = (body) => {
    const url = `${API_URL}/assets/boats`;
    return axios.post (url, body, {
      headers: options,
    });
  };
  export const putBoat = (id, body) => {
    const url = `${API_URL}/assets/boats/${id}`;
    return axios.put (url, body, {
      headers: options,
    });
  };
  export const postVehicle = (body) => {
    const url = `${API_URL}/assets/vehicle`;
    return axios.post (url, body, {
      headers: options,
    });
  };
  export const putVehicle = (id, body) => {
    const url = `${API_URL}/assets/vehicle/${id}`;
    return axios.put (url, body, {
      headers: options,
    });
  };
  export const postOthers = (body) => {
    const url = `${API_URL}/assets/others`;
    return axios.post (url, body, {
      headers: options,
    });
  };
  export const putOthers = (id, body) => {
    const url = `${API_URL}/assets/others/${id}`;
    return axios.put (url, body, {
      headers: options,
    });
  };


