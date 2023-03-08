import {
    GET_SHOPPING_CARTS_INIT, GET_SHOPPING_CARTS_SUCCESS, GET_SHOPPING_CARTS_ERROR
} from '../../Types'

const initialState = {
    carts: [],
    loading: false,
    error: false
}


const shoppingCartsReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_SHOPPING_CARTS_INIT:
            return{
                ...state,
                loading: action.payload
            }
        case GET_SHOPPING_CARTS_SUCCESS:
            return{
                ...state,
                loading: false,
                error: false,
                carts: action.payload
            }
        case GET_SHOPPING_CARTS_ERROR:
            return{
                ...state,
                error: action.payload
            }

        default:
            return state;
    }
}
 
export default shoppingCartsReducer;