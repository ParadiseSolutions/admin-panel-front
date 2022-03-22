import React from 'react'
import { Route, Switch } from "react-router-dom";
import Websites from '../../../Pages/Websites'
import NewWebsite from '../../../Pages/Websites/NewWebsite'


const WebsitesRoutes = () => {
    return (
        <Switch>
            <Route exact path="/websites" component={Websites} />
            <Route exact path="/websites/new" component={NewWebsite} />
           
        </Switch>
    )
}

export default WebsitesRoutes