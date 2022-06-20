import {
    GET_TOURS_INIT,
    GET_TOURS_SUCCESS,
    GET_TOURS_ERROR
} from '../../Types'

const initialState = {
    tours: [],
    loading: false,
    error: false
}


const toursReducers = (state = initialState, action) => {
    switch (action.type) {
        case GET_TOURS_INIT:
            return{
                ...state,
                loading: action.payload
            }
        case GET_TOURS_SUCCESS:
            return{
                ...state,
                loading: false,
                error: false,
                tours: action.payload
            }
        case GET_TOURS_ERROR:
            return{
                ...state,
                error: action.payload
            }

        default:
            return state;
    }
}
 
export default toursReducers;