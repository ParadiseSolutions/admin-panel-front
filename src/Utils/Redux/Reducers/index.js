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
import providersReducers from './ProvidersReducers'

import locationsReducers from './LocationsReducers'

export default combineReducers({
    login: loginReducers,
    departments: departmentsReducers,
    websites: websitesReducers,
    users: usersReducers,
    modules: modulesReducers,
    roles: rolesReducers,
    tourTypes: tourTypesReducers,
    carts: shoppingCartsReducer,
    paymentTypes: paymentTypesReducers,
    categories:categoriesReducers,
    providers: providersReducers,
    locations: locationsReducers
})