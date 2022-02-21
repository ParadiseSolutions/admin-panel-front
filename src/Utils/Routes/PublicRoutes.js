import React from 'react'
// import { useSelector } from "react-redux";
import { Route, Redirect } from "react-router-dom";
// import { getStorageSync } from '../utils/baseAPI';

const PublicRoutes = ({ component: Component, ...rest }) => {
    // const { loged } = useSelector((state) => state.authReducer);
    // const loged = getStorageSync('token')
    const loged = true
    return (
        <Route
            {...rest}
            component={(props) =>
                !loged ? <Component {...props} /> : <Redirect to="/dashboard" />
            }
        />
    )
}

export default PublicRoutes