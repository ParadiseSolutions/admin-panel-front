import React from 'react'
import { Route, Switch } from "react-router-dom";
import ForgotPassword from '../../../Pages/Auth/ForgotPassword'

const ForgotPasswordRoutes = () => {
    return (
        <Switch>
            <Route path="/forgot-password" component={ForgotPassword} />
        </Switch>
    )
}

export default ForgotPasswordRoutes