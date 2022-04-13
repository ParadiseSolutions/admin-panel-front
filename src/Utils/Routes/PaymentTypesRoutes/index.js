import React from 'react'
import { Route, Switch } from "react-router-dom";
import PaymentTypes from '../../../Pages/PaymentTypes';

const PaymentTypesRoutes = () => {
    return (
        <Switch>
            <Route exact path="/payment-types" component={PaymentTypes} />
            
        </Switch>
    )
}

export default PaymentTypesRoutes