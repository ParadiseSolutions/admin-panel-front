import {
    GET_MODULES_INIT,
    GET_MODULES_SUCCESS,
    GET_MODULES_ERROR
} from '../../Types'

const initialState = {
    modules: [],
    loading: false,
    error: false
}


const modulesReducers = (state = initialState, action) => {
    switch (action.type) {
        case GET_MODULES_INIT:
            return{
                ...state,
                loading: action.payload
            }
        case GET_MODULES_SUCCESS:
            return{
                ...state,
                loading: false,
                error: false,
                modules: action.payload
            }
        case GET_MODULES_ERROR:
            return{
                ...state,
                error: action.payload
            }

        default:
            return state;
    }
}
 
export default modulesReducers;