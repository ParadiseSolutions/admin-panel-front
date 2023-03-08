import {
    GET_SERVICE_AREA_INIT,
    GET_SERVICE_AREA_SUCCESS,
    GET_SERVICE_AREA_ERROR
} from '../../Types'

const initialState = {
    serviceArea: [],
    loading: false,
    error: false
}


const serviceAreaReducers = (state = initialState, action) => {
    switch (action.type) {
        case GET_SERVICE_AREA_INIT:
            return{
                ...state,
                loading: action.payload
            }
        case GET_SERVICE_AREA_SUCCESS:
            
            return{
                ...state,
                loading: false,
                error: false,
                serviceArea: action.payload
               
            }
            
        case GET_SERVICE_AREA_ERROR:
            return{
                ...state,
                error: action.payload
            }

        default:
            return state;
    }

   
}
 
export default serviceAreaReducers;