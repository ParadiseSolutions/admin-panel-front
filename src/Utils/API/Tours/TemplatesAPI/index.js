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
