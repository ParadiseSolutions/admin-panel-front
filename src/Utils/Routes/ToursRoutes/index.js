import React from 'react'
import { Route, Switch } from "react-router-dom";
import Tours from '../../../Pages/Tours';
import NewTour from '../../../Pages/Tours/newTour';
import EditTour from '../../../Pages/Tours/editTour';
const TourRoutes = () => {
    return (
        <Switch>
            <Route exact path="/tours" component={Tours} />
            <Route exact path="/tours/new" component={NewTour} />
            <Route exact path="/tours/:id" component={EditTour} />
        </Switch>
    )
}

export default TourRoutes