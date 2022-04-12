import React from 'react'
import { Route, Switch } from "react-router-dom";
import Categories from '../../../Pages/Categories'




const CategoriesRoutes = () => {
    return (
        <Switch>
            <Route exact path="/categories" component={Categories} />
            
        </Switch>
    )
}

export default CategoriesRoutes