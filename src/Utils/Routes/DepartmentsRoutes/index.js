import React from 'react'
import { Route, Switch } from "react-router-dom";
import Departments from '../../../Pages/Departments'
import NewDepartment from '../../../Pages/Departments/newDepartment';
import EditDepartment from '../../../Pages/Departments/EditDepartment';

const DepartmentsRoutes = () => {
    return (
        <Switch>
            <Route exact path="/departments" component={Departments} />
            <Route exact path="/departments/new" component={NewDepartment} />
            <Route exact path="/departments/:id" component={EditDepartment} />
        </Switch>
    )
}

export default DepartmentsRoutes