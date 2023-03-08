
import React, { Suspense } from "react";
import { Switch, Redirect } from "react-router-dom";
import PublicRoutes from './PublicRoutes'
import ResetRoutes from "./ResetPassword";
const Fallback = () => <div>cargando.....</div>;

const ResetPasswordRoute = ({ isLogged, ...rest }) => {
  return (
    <>
          <Suspense fallback={<Fallback />}>
            <Switch>
              
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

export default ResetPasswordRoute;