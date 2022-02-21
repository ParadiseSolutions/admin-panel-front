import React from 'react'
import { Route, Redirect} from "react-router-dom";
// import { useSelector } from "react-redux";
// import { getStorageSync } from '../utils/baseAPI';

const PrivateRoutes = ({ component: Component, ...rest }) => {
    // const { loged } = useSelector((state) => state.authReducer);
    // const loged = getStorageSync('token')
    const loged = true
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