import React from 'react'
import { Route, Switch } from "react-router-dom";
import Websites from '../../../Pages/Websites'
import NewWebsite from '../../../Pages/Websites/NewWebsite'
import EditWebsite from '../../../Pages/Websites/EditWebsite'



const WebsitesRoutes = () => {
    return (
        <Switch>
            <Route exact path="/websites" component={Websites} />
            <Route exact path="/websites/new" component={NewWebsite} />
            <Route exact path="/websites/:id" component={EditWebsite} />
        </Switch>
    )
}

export default WebsitesRoutes