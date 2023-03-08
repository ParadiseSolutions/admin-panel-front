import {
   GET_PAYMENT_TYPES_INIT, GET_PAYMENT_TYPES_SUCCESS, GET_PAYMENT_TYPES_ERROR
} from '../../Types'

const initialState = {
    paymentTypes: [],
    loading: false,
    error: false
}


const paymentTypesReducers = (state = initialState, action) => {
    switch (action.type) {
        case GET_PAYMENT_TYPES_INIT:
            return{
                ...state,
                loading: action.payload
            }
        case GET_PAYMENT_TYPES_SUCCESS:
            return{
                ...state,
                loading: false,
                error: false,
                paymentTypes: action.payload
            }
        case GET_PAYMENT_TYPES_ERROR:
            return{
                ...state,
                error: action.payload
            }

        default:
            return state;
    }
}
 
export default paymentTypesReducers;