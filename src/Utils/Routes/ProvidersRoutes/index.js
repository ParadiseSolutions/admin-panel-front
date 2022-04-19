import React from 'react'
import { Route, Switch } from "react-router-dom";
import Providers from '../../../Pages/Providers';
import NewProvider from '../../../Pages/Providers/newProvider';

const ProvidersRoutes = () => {
    return (
        <Switch>
            <Route exact path="/providers" component={Providers} />
            <Route exact path="/providers/new" component={NewProvider} />
            
        </Switch>
    )
}

export default ProvidersRoutes