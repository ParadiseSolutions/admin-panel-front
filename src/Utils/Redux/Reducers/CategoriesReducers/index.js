import {
    GET_CATEGORIES_INIT,
    GET_CATEGORIES_SUCCESS,
    GET_CATEGORIES_ERROR
} from '../../Types'

const initialState = {
   categories: [],
    loading: false,
    error: false
}


const categoriesReducers = (state = initialState, action) => {
    switch (action.type) {
        case GET_CATEGORIES_INIT:
            return{
                ...state,
                loading: action.payload
            }
        case GET_CATEGORIES_SUCCESS:
            return{
                ...state,
                loading: false,
                error: false,
               categories: action.payload
            }
        case GET_CATEGORIES_ERROR:
            return{
                ...state,
                error: action.payload
            }

        default:
            return state;
    }
}
 
export default categoriesReducers;