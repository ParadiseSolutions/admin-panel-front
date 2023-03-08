import React from 'react'
import { Route, Switch } from "react-router-dom";
import Operators from '../../../Pages/Operators'
import NewOperator from '../../../Pages/Operators/newOperator';
import EditOperator from '../../../Pages/Operators/editOperator';


const OperatorsRoutes = () => {
    return (
        <Switch>
            <Route exact path="/operators" component={Operators} />            
            <Route exact path="/operators/new" component={NewOperator} />            
            <Route exact path="/operators/:id" component={EditOperator} />            
        </Switch>
    )
}

export default OperatorsRoutes