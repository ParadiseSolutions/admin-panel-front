import { GET_TOURS_INIT,
  GET_TOURS_SUCCESS,
  GET_TOURS_ERROR
} from "../../Types";
import axios from "axios";
import { API_URL, options } from "../../../API";

export const toursData = () => {
  return async (dispatch) => {
    dispatch(getToursInit());

    try {
      const getData = () => {
        return axios.get(`${API_URL}/tours`, {
          headers: options,
        });
      };

      const dataResult = await getData();
      dispatch(getToursSuccess(dataResult.data));
    } catch (error) {
      getToursError(error);
    }
  };
};

const getToursInit = () => ({
  type: GET_TOURS_INIT,
  payload: true,
});
const getToursSuccess = (operators) => ({
  type: GET_TOURS_SUCCESS,
  payload: operators,
});

const getToursError = (error) => ({
  type: GET_TOURS_ERROR,
  payload: error,
});
