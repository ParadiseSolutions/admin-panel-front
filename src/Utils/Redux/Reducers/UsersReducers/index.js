import {
    GET_USERS_INIT,
    GET_USERS_SUCCESS,
    GET_USERS_ERROR
} from '../../Types'

const initialState = {
    users: [],
    loading: false,
    error: false
}


const usersReducers = (state = initialState, action) => {
    switch (action.type) {
        case GET_USERS_INIT:
            return{
                ...state,
                loading: action.payload
            }
        case GET_USERS_SUCCESS:
            return{
                ...state,
                loading: false,
                error: false,
                users: action.payload
            }
        case GET_USERS_ERROR:
            return{
                ...state,
                error: action.payload
            }

        default:
            return state;
    }
}
 
export default usersReducers;