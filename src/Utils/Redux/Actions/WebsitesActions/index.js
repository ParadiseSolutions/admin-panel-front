import { GET_WEBSITES_INIT, GET_WEBSITES_SUCCESS, GET_WEBSITES_ERROR} from "../../Types";
import axios from "axios";
import { API_URL, options } from "../../../API";

export const websitesData = () => {
  return async (dispatch) => {
    dispatch(getWebsitesInit());

    try {
      const getData = () => {
        return axios.get(`${API_URL}/websites`, {
          headers: options,
        });
      };

      const dataResult = await getData();
      dispatch(getWebsitesSuccess(dataResult.data));
    } catch (error) {
      getWebsitesError(error);
    }
  };
};

const getWebsitesInit = () => ({
  type: GET_WEBSITES_INIT,
  payload: true,
});
const getWebsitesSuccess = (food) => ({
  type: GET_WEBSITES_SUCCESS,
  payload: food,
});

const getWebsitesError = (error) => ({
  type: GET_WEBSITES_ERROR,
  payload: error,
});
