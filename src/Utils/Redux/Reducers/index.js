import {combineReducers} from 'redux'
import loginReducers from './LoginReducers'
import departmentsReducers from './DepartmentsReducers'
import usersReducers from './UsersReducers'

export default combineReducers({
    login: loginReducers,
    departments: departmentsReducers,
    users: usersReducers
})