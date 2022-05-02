import { GET_LOCATIONS_INIT, GET_LOCATIONS_SUCCESS, GET_LOCATIONS_ERROR} from "../../Types";
import axios from "axios";
import { API_URL, options } from "../../../API";

export const locationsData = () => {
  return async (dispatch) => {
    dispatch(getLocationsInit());

    try {
      const getData = () => {
        return axios.get(`${API_URL}/locations`, {
          headers: options,
        });
      };

      const dataResult = await getData();
      dispatch(getLocationsSuccess(dataResult.data));
     
    } catch (error) {
      getLocationsError(error);
    }
  };
};

const getLocationsInit = () => ({
  type: GET_LOCATIONS_INIT,
  payload: true,
});
const getLocationsSuccess = (food) => ({
  type: GET_LOCATIONS_SUCCESS,
  payload: food,
});

const getLocationsError = (error) => ({
  type: GET_LOCATIONS_ERROR,
  payload: error,
});
