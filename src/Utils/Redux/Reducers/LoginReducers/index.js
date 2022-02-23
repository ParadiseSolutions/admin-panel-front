import {
    LOGIN_INIT,
    LOGIN_SUCCESS,
    LOGIN_ERROR
} from '../../Types'

const initialState = {
    login: [],
    loading: false,
    error: false
}


const loginReducers = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_INIT:
            return{
                ...state,
                loading: action.payload
            }
        case LOGIN_SUCCESS:
            return{
                ...state,
                loading: false,
                error: false,
                login: action.payload
            }
        case LOGIN_ERROR:
            return{
                ...state,
                error: action.payload
            }

        default:
            return state;
    }
}
 
export default loginReducers;