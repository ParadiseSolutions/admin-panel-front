import { GET_USERS_INIT, GET_USERS_SUCCESS, GET_USERS_ERROR } from "../../Types";
import axios from "axios";
import { API_URL, options } from "../../../API";

export const usersData = () => {
  return async (dispatch) => {
    dispatch(getUsersInit());

    try {
      const getData = () => {
        return axios.get(`${API_URL}/users`, {
          headers: options,
        });
      };

      const dataResult = await getData();
      dispatch(getUsersSuccess(dataResult.data));
    } catch (error) {
      getUsersError(error);
    }
  };
};

const getUsersInit = () => ({
  type: GET_USERS_INIT,
  payload: true,
});
const getUsersSuccess = (food) => ({
  type: GET_USERS_SUCCESS,
  payload: food,
});

const getUsersError = (error) => ({
  type: GET_USERS_ERROR,
  payload: error,
});
