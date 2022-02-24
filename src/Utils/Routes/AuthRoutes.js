import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import Login from '../../Pages/Auth/Login'
import ForgotPassword from '../../Pages/Auth/ForgotPassword'
import ResetPassword from '../../Pages/Auth/ResetPassword'
const AuthRoutes = () => {
    return (
        <div>
            <Switch>
                <Route exact path='/login' component={Login} /> 
                <Route exact path='/login/forgot-password' component={ForgotPassword} /> 
                <Route exact path='/login/reset-password' component={ResetPassword} /> 
                <Redirect to='/login' />
            </Switch>
        </div>
    )
}

export default AuthRoutes;