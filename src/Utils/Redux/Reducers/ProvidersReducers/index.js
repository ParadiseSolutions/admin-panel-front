import {
    GET_PROVIDERS_INIT,
    GET_PROVIDERS_SUCCESS,
    GET_PROVIDERS_ERROR
} from '../../Types'

const initialState = {
    providers: [],
    loading: false,
    error: false
}


const providersReducers = (state = initialState, action) => {
    switch (action.type) {
        case GET_PROVIDERS_INIT:
            return{
                ...state,
                loading: action.payload
            }
        case GET_PROVIDERS_SUCCESS:
            return{
                ...state,
                loading: false,
                error: false,
                providers: action.payload
            }
        case GET_PROVIDERS_ERROR:
            return{
                ...state,
                error: action.payload
            }

        default:
            return state;
    }
}
 
export default providersReducers;