import React from 'react'
import { Route, Switch } from "react-router-dom";
import Departments from '../../../Pages/Departments'

const DepartmentsRoutes = () => {
    return (
        <Switch>
            <Route exact path="/departments" component={Departments} />
        </Switch>
    )
}

export default DepartmentsRoutes