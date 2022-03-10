import { GET_MODULES_INIT, GET_MODULES_SUCCESS, GET_MODULES_ERROR } from "../../Types";
import axios from "axios";
import { API_URL, options } from "../../../API";

export const modulesData = () => {
  return async (dispatch) => {
    dispatch(getModulesInit());

    try {
      const getData = () => {
        return axios.get(`${API_URL}/modules`, {
          headers: options,
        });
      };

      const dataResult = await getData();
      dispatch(getModulesSuccess(dataResult.data));
    } catch (error) {
      getModulesError(error);
    }
  };
};

const getModulesInit = () => ({
  type: GET_MODULES_INIT,
  payload: true,
});
const getModulesSuccess = (food) => ({
  type: GET_MODULES_SUCCESS,
  payload: food,
});

const getModulesError = (error) => ({
  type: GET_MODULES_ERROR,
  payload: error,
});
