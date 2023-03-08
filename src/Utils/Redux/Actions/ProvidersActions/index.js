import { GET_PROVIDERS_INIT,
  GET_PROVIDERS_SUCCESS,
  GET_PROVIDERS_ERROR } from "../../Types";
import axios from "axios";
import { API_URL, options } from "../../../API";

export const providersData = () => {
  return async (dispatch) => {
    dispatch(getProvidersInit());

    try {
      const getData = () => {
        return axios.get(`${API_URL}/providers`, {
          headers: options,
        });
      };

      const dataResult = await getData();
      dispatch(getProvidersSuccess(dataResult.data));
    } catch (error) {
      getProvidersError(error);
    }
  };
};

const getProvidersInit = () => ({
  type: GET_PROVIDERS_INIT,
  payload: true,
});
const getProvidersSuccess = (providers) => ({
  type: GET_PROVIDERS_SUCCESS,
  payload: providers,
});

const getProvidersError = (error) => ({
  type: GET_PROVIDERS_ERROR,
  payload: error,
});
