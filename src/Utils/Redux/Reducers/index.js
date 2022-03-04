import {combineReducers} from 'redux'
import loginReducers from './LoginReducers'
import departmentsReducers from './DepartmentsReducers'

export default combineReducers({
    login: loginReducers,
    departments: departmentsReducers
})