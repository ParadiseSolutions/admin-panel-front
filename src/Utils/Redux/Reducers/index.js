import {combineReducers} from 'redux'
import loginReducers from './LoginReducers'
import departmentsReducers from './DepartmentsReducers'
import websitesReducers from './WebsitesReducers'
import usersReducers from './UsersReducers'
import modulesReducers from './ModulesReducers'
import rolesReducers from './RolesReducers'
import tourTypesReducers from './TourTypesReducers'
import categoriesReducers from './CategoriesReducers'
import shoppingCartsReducer from './ShoppingCartsReducers'
import paymentTypesReducers from './PaymentTypesReducers'

export default combineReducers({
    login: loginReducers,
    departments: departmentsReducers,
    websites: websitesReducers,
    users: usersReducers,
    modules: modulesReducers,
    roles: rolesReducers,
    tourTypes: tourTypesReducers,
<<<<<<< HEAD
    carts: shoppingCartsReducer,
    paymentTypes: paymentTypesReducers,
=======
    categories:categoriesReducers,
    carts: shoppingCartsReducer
>>>>>>> 615d8d37ef961b2ddd454cdded8f99f1a0ffe2cc
})