import { GET_SERVICE_AREA_INIT,
  GET_SERVICE_AREA_SUCCESS,
  GET_SERVICE_AREA_ERROR
} from "../../Types";
import axios from "axios";
import { API_URL, options } from "../../../API";

export const serviceAreaData = () => {
  return async (dispatch) => {
    dispatch(getServiceAreaInit());

    try {
      const getData = () => {
        return axios.get(`${API_URL}/serviceareas`, {
          headers: options,
        });
      };

      const dataResult = await getData();
      dispatch(getServiceAreaSuccess(dataResult.data));
    } catch (error) {
      getServiceAreaError(error);
    }
  };
};

const getServiceAreaInit = () => ({
  type: GET_SERVICE_AREA_INIT,
  payload: true,
});
const getServiceAreaSuccess = (area) => ({
  type: GET_SERVICE_AREA_SUCCESS,
  payload: area,
});

const getServiceAreaError = (error) => ({
  type: GET_SERVICE_AREA_ERROR,
  payload: error,
});
