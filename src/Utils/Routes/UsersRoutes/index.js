import React from 'react'
import { Route, Switch } from "react-router-dom";
import Roles from '../../../Pages/Roles';
import NewRol from '../../../Pages/Roles/newRol';
import EditRol from '../../../Pages/Roles/editRol';

const RolesRoutes = () => {
    return (
        <Switch>
            <Route exact path="/roles" component={Roles} />
            <Route exact path="/roles/new" component={NewRol} />
            <Route exact path="/roles/:id" component={EditRol} />
        </Switch>
    )
}

export default RolesRoutes