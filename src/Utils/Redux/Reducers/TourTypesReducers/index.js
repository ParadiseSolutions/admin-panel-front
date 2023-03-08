import {
    GET_TOURTYPES_INIT,
    GET_TOURTYPES_SUCCESS,
    GET_TOURTYPES_ERROR
} from '../../Types'

const initialState = {
    tourTypes: [],
    loading: false,
    error: false
}


const tourTypesReducers = (state = initialState, action) => {
    switch (action.type) {
        case GET_TOURTYPES_INIT:
            return{
                ...state,
                loading: action.payload
            }
        case GET_TOURTYPES_SUCCESS:
            return{
                ...state,
                loading: false,
                error: false,
               tourTypes: action.payload
            }
        case GET_TOURTYPES_ERROR:
            return{
                ...state,
                error: action.payload
            }

        default:
            return state;
    }
}
 
export default tourTypesReducers;