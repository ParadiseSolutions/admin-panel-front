import { GET_OPERATORS_INIT, GET_OPERATORS_SUCCESS, GET_OPERATORS_ERROR} from "../../Types";
import axios from "axios";
import { API_URL, options } from "../../../API";

export const operatorsData = (active) => {
  return async (dispatch) => {
    dispatch(getOperatorsInit());

    try {
      const getData = () => {
        return axios.get(`${API_URL}/operators/filter-status/${active}`, {
          headers: options,
        });
      };

      const dataResult = await getData();
      dispatch(getOperatorsSuccess(dataResult.data));
    } catch (error) {
      getOperatorsError(error);
    }
  };
};

const getOperatorsInit = () => ({
  type: GET_OPERATORS_INIT,
  payload: true,
});
const getOperatorsSuccess = (operators) => ({
  type: GET_OPERATORS_SUCCESS,
  payload: operators,
});

const getOperatorsError = (error) => ({
  type: GET_OPERATORS_ERROR,
  payload: error,
});
