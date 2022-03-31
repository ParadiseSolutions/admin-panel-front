import React from 'react'
import { Route, Switch } from "react-router-dom";
import TourTypes from '../../../Pages/TourTypes'




const WebsitesRoutes = () => {
    return (
        <Switch>
            <Route exact path="/tour-types" component={TourTypes} />
            
        </Switch>
    )
}

export default WebsitesRoutes