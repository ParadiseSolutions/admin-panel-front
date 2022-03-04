import {
    DEPARTMENTS_INIT,
    DEPARTMENTS_SUCCESS,
    DEPARTMENTS_ERROR
} from '../../Types'

const initialState = {
    departments: [],
    loading: false,
    error: false
}


const departmentsReducers = (state = initialState, action) => {
    switch (action.type) {
        case DEPARTMENTS_INIT:
            return{
                ...state,
                loading: action.payload
            }
        case DEPARTMENTS_SUCCESS:
            return{
                ...state,
                loading: false,
                error: false,
                departments: action.payload
            }
        case DEPARTMENTS_ERROR:
            return{
                ...state,
                error: action.payload
            }

        default:
            return state;
    }
}
 
export default departmentsReducers;