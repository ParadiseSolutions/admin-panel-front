import React from 'react'
import { Route, Switch } from "react-router-dom";
import Operators from '../../../Pages/Operators'




const OperatorsRoutes = () => {
    return (
        <Switch>
            <Route exact path="/operators" component={Operators} />            
        </Switch>
    )
}

export default OperatorsRoutes