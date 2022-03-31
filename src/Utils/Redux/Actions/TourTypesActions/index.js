import { GET_TOURTYPES_INIT, GET_TOURTYPES_SUCCESS, GET_TOURTYPES_ERROR} from "../../Types";
import axios from "axios";
import { API_URL, options } from "../../../API";

export const tourTypesData = () => {
  return async (dispatch) => {
    dispatch(getTourTypesInit());

    try {
      const getData = () => {
        return axios.get(`${API_URL}/tourtypes`, {
          headers: options,
        });
      };

      const dataResult = await getData();
      dispatch(getTourTypesSuccess(dataResult.data));
    } catch (error) {
      getTourTypesError(error);
    }
  };
};

const getTourTypesInit = () => ({
  type: GET_TOURTYPES_INIT,
  payload: true,
});
const getTourTypesSuccess = (food) => ({
  type: GET_TOURTYPES_SUCCESS,
  payload: food,
});

const getTourTypesError = (error) => ({
  type: GET_TOURTYPES_ERROR,
  payload: error,
});
