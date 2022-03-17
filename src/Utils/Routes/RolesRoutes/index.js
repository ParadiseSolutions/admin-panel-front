import React from 'react'
import { Route, Switch } from "react-router-dom";
import Users from '../../../Pages/Users'

const UsersRoutes = () => {
    return (
        <Switch>
            <Route exact path="/users" component={Users} />
        </Switch>
    )
}

export default UsersRoutes