import React from 'react'
import { Route, Switch } from "react-router-dom";
import Providers from '../../../Pages/Providers';
import NewProvider from '../../../Pages/Providers/newProvider';
import EditProvider from '../../../Pages/Providers/editProvider';

const ProvidersRoutes = () => {
    return (
        <Switch>
            <Route exact path="/providers" component={Providers} />
            <Route exact path="/providers/new" component={NewProvider} />
            <Route exact path="/providers/:id" component={EditProvider} />
            
        </Switch>
    )
}

export default ProvidersRoutes