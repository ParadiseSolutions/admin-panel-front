// import React from 'react'
// import { Switch, Route, Redirect } from 'react-router-dom'
// import Login from '../../Pages/Auth/Login'
// import ForgotPassword from '../../Pages/Auth/ForgotPassword'
// import ResetPassword from '../../Pages/Auth/ResetPassword'
// const AuthRoutes = () => {
//     return (
//         <div>
//             <Switch>
//                 <Route exact path='/login' component={Login} /> 
//                 <Route exact path='/login/forgot-password' component={ForgotPassword} /> 
//                 <Route exact path='/login/reset-password' component={ResetPassword} /> 
//                 <Redirect to='/login' />
//             </Switch>
//         </div>
//     )
// }

// export default AuthRoutes;


import React, { Suspense } from "react";
import { Switch, Redirect } from "react-router-dom";
import PublicRoutes from './PublicRoutes'
import ResetRoutes from "./ResetPassword";
import LoginRoutes from "./LoginRoutes";
import ForgotPasswordRoutes from "./ForgotPasswordRoutes";
const Fallback = () => <div>cargando.....</div>;

const AuthRoutes = ({ isLogged, ...rest }) => {
  return (
    <>
          <Suspense fallback={<Fallback />}>
            <Switch>
              <PublicRoutes
                path="/login"
                component={LoginRoutes}
                isAuthenticated={isLogged}
              />
              <PublicRoutes
                path="/forgot-password"
                component={ForgotPasswordRoutes}
                isAuthenticated={isLogged}
              />
              <PublicRoutes
                path="/reset-password"
                component={ResetRoutes}
                isAuthenticated={isLogged}
              />
              <Redirect to="/login" />
            </Switch>
          </Suspense>
      
    </>
  );
};

export default AuthRoutes;