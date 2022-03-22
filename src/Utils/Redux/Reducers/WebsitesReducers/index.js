import {
    GET_WEBSITES_INIT,
    GET_WEBSITES_SUCCESS,
    GET_WEBSITES_ERROR
} from '../../Types'

const initialState = {
    websites: [],
    loading: false,
    error: false
}


const websitesReducers = (state = initialState, action) => {
    switch (action.type) {
        case GET_WEBSITES_INIT:
            return{
                ...state,
                loading: action.payload
            }
        case GET_WEBSITES_SUCCESS:
            return{
                ...state,
                loading: false,
                error: false,
               websites: action.payload
            }
        case GET_WEBSITES_ERROR:
            return{
                ...state,
                error: action.payload
            }

        default:
            return state;
    }
}
 
export default websitesReducers;