import React from 'react'
import { Switch } from "react-router-dom";

import PrivateRoutes from "../PrivateRoutes"
import DashboardRoutes from "./Dashboard"

const HomeRoutes = ({ isLogged }) => {
    return (
        <Switch>
            <PrivateRoutes
                path="/dashboard"
                component={DashboardRoutes}
                isAuthenticated={isLogged}
            />
        </Switch>
    )
}

export default HomeRoutes
