import { DEPARTMENTS_INIT, DEPARTMENTS_SUCCESS, DEPARTMENTS_ERROR } from "../../Types";
import axios from "axios";
import { API_URL, options } from "../../../API";

export const departmentsData = (body) => {
  
  return async (dispatch) => {
    dispatch(getDepartmentsInit());

    try {
      const getData = () => {
        return axios.get(`${API_URL}/departments`, {
          headers: options,
        });
      };

      const dataResult = await getData();
      dispatch(getDepartmentsSuccess(dataResult.data));
    } catch (error) {
      getDepartmentsError(error);
    }
  };
};

const getDepartmentsInit = () => ({
  type: DEPARTMENTS_INIT,
  payload: true,
});
const getDepartmentsSuccess = (food) => ({
  type: DEPARTMENTS_SUCCESS,
  payload: food,
});

const getDepartmentsError = (error) => ({
  type: DEPARTMENTS_ERROR,
  payload: error,
});
