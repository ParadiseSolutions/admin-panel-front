import {
    GET_OPERATORS_INIT,
    GET_OPERATORS_SUCCESS,
    GET_OPERATORS_ERROR
} from '../../Types'

const initialState = {
    operators: [],
    loading: false,
    error: false
}


const operatorsReducers = (state = initialState, action) => {
    switch (action.type) {
        case GET_OPERATORS_INIT:
            return{
                ...state,
                loading: action.payload
            }
        case GET_OPERATORS_SUCCESS:
            return{
                ...state,
                loading: false,
                error: false,
               operators: action.payload
            }
        case GET_OPERATORS_ERROR:
            return{
                ...state,
                error: action.payload
            }

        default:
            return state;
    }
}
 
export default operatorsReducers;