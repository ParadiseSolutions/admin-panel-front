import axios from "axios";
import { API_URL, options } from "../../index";


export const getAdditionalFeeTable = (id) => {
    const url = `${API_URL}/vouchers/list/tours/${id}`;
    return axios.get (url, {
      headers: options,
    });
  };

export const deleteExtraFeeTours = (id) => {
    const url = `${API_URL}/vouchers/deleteExtraFee/tours/${id}`;
    return axios.delete (url, {
      headers: options,
    });
  };

  export const getVoucherInfoTours = (id) => {
    const url = `${API_URL}/vouchers/fields/tours/${id}`;
    return axios.get(url, {headers:options})
  };

  export const putVoucherInformationTours = (id, body) => {
    const url = `${API_URL}/vouchers/fields/tours/${id}`;
    return axios.put (url, body, {
      headers: options,
    });
  };

  export const getMeetingLocationToursTable = (id) => {
    const url = `${API_URL}/vouchers/meeting_locations/tours/${id}`;
    return axios.get (url, {
      headers: options,
    });
  };
  export const getBoatLocationToursTable = (id) => {
    const url = `${API_URL}/vouchers/boat_locations/tours/${id}`;
    return axios.get (url, {
      headers: options,
    });
  };
  export const getRestrictionsToursTable = (id) => {
    const url = `${API_URL}/vouchers/restrictions/tours/${id}`;
    return axios.get (url, {
      headers: options,
    });
  };

  export const deleteMeetingLocationsTours = (id) => {
    const url = `${API_URL}/vouchers/deleteMeetingLocation/${id}`;
    return axios.delete (url, {
      headers: options,
    });
  };
  export const deleteBoatLocationsTours = (id) => {
    const url = `${API_URL}/vouchers/deleteBoatLocation/${id}`;
    return axios.delete (url, {
      headers: options,
    });
  };
  export const deleteRestrictionTours = (id) => {
    const url = `${API_URL}/vouchers/deleteRestriction/${id}`;
    return axios.delete (url, {
      headers: options,
    });
  };