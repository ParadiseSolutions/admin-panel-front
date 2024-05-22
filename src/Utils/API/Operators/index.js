import axios from "axios";
import { API_URL, options } from "../index";



export const updateOperatorStatus = (id, body) => {
    const url = `${API_URL}/operators/${id}/status`;
    return axios.put (url, body, {
      headers: options,
    });
  };

export const deleteOperatorAPI = (id) => {
    const url = `${API_URL}/operators/${id}`;
    return axios.delete (url, {
      headers: options,
    });
  };

  export const createOperatorAPI = (body) => {
    const url = `${API_URL}/operators`;
    return axios.post (url, body, {
      headers: options,
    });
  };

  export const updateOperator = (id, body) => {
    const url = `${API_URL}/operators/${id}`;
    return axios.put (url, body, {
      headers: options,
    });
  };

  export const getExtraFeeTable = (id) => {
    const url = `${API_URL}/vouchers/list/operators/${id}`;
    return axios.get(url, {headers:options})
  };
  export const getExtraFee = () => {
    const url = `${API_URL}/vouchers/feeTypes`;
    return axios.get(url, {headers:options})
  };
  export const getCurrency = () => {
    const url = `${API_URL}/vouchers/currencies`;
    return axios.get(url, {headers:options})
  };
  export const getPriceType = () => {
    const url = `${API_URL}/vouchers/priceTypes`;
    return axios.get(url, {headers:options})
  };
  export const getChannels = () => {
    const url = `${API_URL}/vouchers/getChannels`;
    return axios.get(url, {headers:options})
  };

  export const postExtraFee = (body) => {
    const url = `${API_URL}/vouchers/addExtraFee`;
    return axios.post (url, body, {
      headers: options,
    });
  };
  export const putExtraFee = (id, body) => {
    const url = `${API_URL}/vouchers/updateExtraFee/${id}`;
    return axios.put (url, body, {
      headers: options,
    });
  };
  export const deleteExtraFee = (id) => {
    const url = `${API_URL}/vouchers/deleteExtraFee/operators/${id}`;
    return axios.delete (url, {
      headers: options,
    });
  };
  export const getBringList = () => {
    const url = `${API_URL}/vouchers/brings`;
    return axios.get(url, {headers:options})
  };
  export const getVoucherInfo = (id) => {
    const url = `${API_URL}/vouchers/fields/operators/${id}`;
    return axios.get(url, {headers:options})
  };
  export const putVoucherInformation = (id, body) => {
    const url = `${API_URL}/vouchers/fields/operators/${id}`;
    return axios.put (url, body, {
      headers: options,
    });
  };

