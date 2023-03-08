import React from 'react'
import { Route, Switch } from "react-router-dom";
import Login from '../../../Pages/Auth/Login'
const LoginRoutes = () => {
    return (
        <Switch>
            <Route exact path="/login" component={Login} />
        </Switch>
    )
}

export default LoginRoutes