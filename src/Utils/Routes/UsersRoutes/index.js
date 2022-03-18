import React from 'react'
import { Route, Switch } from "react-router-dom";
import Roles from '../../../Pages/Roles';
import NewRol from '../../../Pages/Roles/newRol';

const RolesRoutes = () => {
    return (
        <Switch>
            <Route exact path="/roles" component={Roles} />
            <Route exact path="/roles/new" component={NewRol} />
        </Switch>
    )
}

export default RolesRoutes