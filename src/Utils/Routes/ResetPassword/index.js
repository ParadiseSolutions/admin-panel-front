import React from 'react'
import { Route, Switch } from "react-router-dom";
import ResetPassword from '../../../Pages/Auth/ResetPassword';

const ResetRoutes = () => {
    return (
        <Switch>
            <Route path="/reset-password" component={ResetPassword} />
        </Switch>
    )
}

export default ResetRoutes