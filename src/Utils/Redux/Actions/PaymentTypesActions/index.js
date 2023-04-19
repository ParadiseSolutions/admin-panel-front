import { GET_PAYMENT_TYPES_INIT, GET_PAYMENT_TYPES_SUCCESS, GET_PAYMENT_TYPES_ERROR } from "../../Types";
import axios from "axios";
import { API_URL, options } from "../../../API";

export const paymentTypesData = () => {
  return async (dispatch) => {
    dispatch(getPaymentInit());

    try {
      const getData = () => {
        return axios.get(`${API_URL}/collects`, {
          headers: options,
        });
      };

      const dataResult = await getData();
      // console.log(dataResult)
      dispatch(getPaymentSuccess(dataResult.data));
    } catch (error) {
      getPaymentError(error);
    }
  };
};

const getPaymentInit = () => ({
  type: GET_PAYMENT_TYPES_INIT,
  payload: true,
});
const getPaymentSuccess = (payment) => ({
  type: GET_PAYMENT_TYPES_SUCCESS,
  payload: payment,
});

const getPaymentError = (error) => ({
  type: GET_PAYMENT_TYPES_ERROR,
  payload: error,
});
