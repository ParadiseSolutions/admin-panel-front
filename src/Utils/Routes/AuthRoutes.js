import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import Login from '../../Pages/Auth/Login'
import ForgotPassword from '../../Pages/Auth/ForgotPassword'

const AuthRoutes = () => {
    return (
        <div>
            <Switch>
                <Route exact path='/login' component={Login} /> 
                <Route exact path='/login/forgot-password' component={ForgotPassword} /> 
                <Redirect to='/login' />
            </Switch>
        </div>
    )
}

export default AuthRoutes;