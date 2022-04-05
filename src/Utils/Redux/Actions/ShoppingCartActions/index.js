import { GET_SHOPPING_CARTS_INIT, GET_SHOPPING_CARTS_SUCCESS, GET_SHOPPING_CARTS_ERROR} from "../../Types";
import axios from "axios";
import { API_URL, options } from "../../../API";

export const shoppingCartsData = () => {
  
  return async (dispatch) => {
    dispatch(getCartsInit());

    try {
      const getData = () => {
        return axios.get(`${API_URL}/carts`, {
          headers: options,
        });
      };

      const dataResult = await getData();
      dispatch(getCartsSuccess(dataResult.data));
    } catch (error) {
      getCartsError(error);
    }
  };
};

const getCartsInit = () => ({
  type: GET_SHOPPING_CARTS_INIT,
  payload: true,
});
const getCartsSuccess = (carts) => ({
  type: GET_SHOPPING_CARTS_SUCCESS,
  payload: carts,
});

const getCartsError = (error) => ({
  type: GET_SHOPPING_CARTS_ERROR,
  payload: error,
});
