import {
    GET_ROLES_INIT,
    GET_ROLES_SUCCESS,
    GET_ROLES_ERROR
} from '../../Types'

const initialState = {
    roles: [],
    loading: false,
    error: false
}


const rolesReducers = (state = initialState, action) => {
    switch (action.type) {
        case GET_ROLES_INIT:
            return{
                ...state,
                loading: action.payload
            }
        case GET_ROLES_SUCCESS:
            return{
                ...state,
                loading: false,
                error: false,
                roles: action.payload
            }
        case GET_ROLES_ERROR:
            return{
                ...state,
                error: action.payload
            }

        default:
            return state;
    }
}
 
export default rolesReducers;