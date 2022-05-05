import React from 'react'
import { Route, Switch } from "react-router-dom";
import Locations from '../../../Pages/Locations'




const LocationsRoutes = () => {
    return (
        <Switch>
            <Route exact path="/locations" component={Locations} />            
        </Switch>
    )
}

export default LocationsRoutes