import {
    GET_LOCATIONS_INIT,
    GET_LOCATIONS_SUCCESS,
    GET_LOCATIONS_ERROR
} from '../../Types'

const initialState = {
    locations: [],
    loading: false,
    error: false
}


const locationsReducers = (state = initialState, action) => {
    switch (action.type) {
        case GET_LOCATIONS_INIT:
            return{
                ...state,
                loading: action.payload
            }
        case GET_LOCATIONS_SUCCESS:
            
            return{
                ...state,
                loading: false,
                error: false,
               locations: action.payload
               
            }
            
        case GET_LOCATIONS_ERROR:
            return{
                ...state,
                error: action.payload
            }

        default:
            return state;
    }

   
}
 
export default locationsReducers;