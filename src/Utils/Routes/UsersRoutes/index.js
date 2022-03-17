import React from 'react'
import { Route, Switch } from "react-router-dom";
import Roles from '../../../Pages/Roles';

const RolesRoutes = () => {
    return (
        <Switch>
            <Route exact path="/roles" component={Roles} />
        </Switch>
    )
}

export default RolesRoutes