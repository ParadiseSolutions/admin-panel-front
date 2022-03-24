import React from 'react'
import { Route, Switch } from "react-router-dom";
import Users from '../../../Pages/Users';

const DepartmentsRoutes = () => {
    return (
        <Switch>
            <Route exact path="/users" component={Users} />
            
        </Switch>
    )
}

export default DepartmentsRoutes