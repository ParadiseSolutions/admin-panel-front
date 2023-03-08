import React from 'react'
import { Route, Switch } from "react-router-dom";
import ShoppingCarts from '../../../Pages/ShoppingCarts';

const ShoppingCartRoutes = () => {
    return (
        <Switch>
            <Route exact path="/shopping-carts" component={ShoppingCarts} />
            
        </Switch>
    )
}

export default ShoppingCartRoutes