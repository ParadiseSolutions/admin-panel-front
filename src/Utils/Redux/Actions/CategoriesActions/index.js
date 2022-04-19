import { GET_CATEGORIES_INIT, GET_CATEGORIES_SUCCESS, GET_CATEGORIES_ERROR} from "../../Types";
import axios from "axios";
import { API_URL, options } from "../../../API";

export const categoriesData = () => {
  return async (dispatch) => {
    dispatch(getCategoriesInit());

    try {
      const getData = () => {
        return axios.get(`${API_URL}/categories`, {
          headers: options,
        });
      };

      const dataResult = await getData();
      dispatch(getCategoriesSuccess(dataResult.data));
    } catch (error) {
      getCategoriesError(error);
    }
  };
};

const getCategoriesInit = () => ({
  type: GET_CATEGORIES_INIT,
  payload: true,
});
const getCategoriesSuccess = (food) => ({
  type: GET_CATEGORIES_SUCCESS,
  payload: food,
});

const getCategoriesError = (error) => ({
  type: GET_CATEGORIES_ERROR,
  payload: error,
});
