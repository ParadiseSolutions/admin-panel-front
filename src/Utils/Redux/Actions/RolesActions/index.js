import { GET_ROLES_INIT, GET_ROLES_SUCCESS, GET_ROLES_ERROR} from "../../Types";
import axios from "axios";
import { API_URL, options } from "../../../API";

export const rolesData = () => {
  return async (dispatch) => {
    dispatch(getRolesInit());

    try {
      const getData = () => {
        return axios.get(`${API_URL}/roles`, {
          headers: options,
        });
      };

      const dataResult = await getData();
      dispatch(getRolesSuccess(dataResult.data));
    } catch (error) {
      getRolesError(error);
    }
  };
};

const getRolesInit = () => ({
  type: GET_ROLES_INIT,
  payload: true,
});
const getRolesSuccess = (roles) => ({
  type: GET_ROLES_SUCCESS,
  payload: roles,
});

const getRolesError = (error) => ({
  type: GET_ROLES_ERROR,
  payload: error,
});
