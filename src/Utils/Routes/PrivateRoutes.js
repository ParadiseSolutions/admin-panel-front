import React from 'react'
import { Route, Redirect} from "react-router-dom";
import { getStorageSync } from '../API';

const PrivateRoutes = ({ component: Component, ...rest }) => {
    const loged = JSON.parse(getStorageSync('token'))
   
    return (
        <Route
            {...rest}
            component={(props) =>
                loged ? <Component {...props} /> : <Redirect to="/login" />
            }
        />
    );
}

export default PrivateRoutes