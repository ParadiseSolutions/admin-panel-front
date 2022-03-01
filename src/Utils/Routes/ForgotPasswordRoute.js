
import React, { Suspense } from "react";
import { Switch, Redirect } from "react-router-dom";
import PublicRoutes from './PublicRoutes'
import ForgotPasswordRoutes from "./ForgotPasswordRoutes";
const Fallback = () => <div>cargando.....</div>;

const ForgotPasswordRoute = ({ isLogged, ...rest }) => {
  return (
    <>
          <Suspense fallback={<Fallback />}>
            <Switch>
              
              <PublicRoutes
                path="/forgot-password"
                component={ForgotPasswordRoutes}
                isAuthenticated={isLogged}
              />
              
              <Redirect to="/login" />
            </Switch>
          </Suspense>
      
    </>
  );
};

export default ForgotPasswordRoute;