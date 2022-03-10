import React from 'react'
import { Route, Switch } from "react-router-dom";
import Departments from '../../../Pages/Departments'
import NewDepartment from '../../../Pages/Departments/newDepartment';

const DepartmentsRoutes = () => {
    return (
        <Switch>
            <Route exact path="/departments" component={Departments} />
            <Route exact path="/departments/new" component={NewDepartment} />
        </Switch>
    )
}

export default DepartmentsRoutes