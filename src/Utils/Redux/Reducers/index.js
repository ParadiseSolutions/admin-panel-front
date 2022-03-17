import {combineReducers} from 'redux'
import loginReducers from './LoginReducers'
import departmentsReducers from './DepartmentsReducers'
import usersReducers from './UsersReducers'
import modulesReducers from './ModulesReducers'
import rolesReducers from './RolesReducers'

export default combineReducers({
    login: loginReducers,
    departments: departmentsReducers,
    users: usersReducers,
    modules: modulesReducers,
    roles: rolesReducers,
})