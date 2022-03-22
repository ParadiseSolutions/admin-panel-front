import React, { Suspense } from "react";
import { Switch, Redirect } from "react-router-dom";
import PrivateRoutes from "./PrivateRoutes";
import DashboardRoutes from "./DashboardRoutes/Dashboard";
import UserRoutes from "./UsersRoutes";
import WebsitesRoutes from "./WebsitesRoutes";
import DepartmentsRoutes from "./DepartmentsRoutes";
import RolesRoutes from "./UsersRoutes";
import Layout from "../../Components/Layout";


const Fallback = () => <div>cargando.....</div>;

const ContentRoutes = ({ isLogged, ...rest }) => {
  return (
    <>
    
      <Layout>
          <Suspense fallback={<Fallback />}>
            <Switch>
              <PrivateRoutes
                path="/dashboard"
                component={DashboardRoutes}
                isAuthenticated={isLogged}
              />
              <PrivateRoutes
                path="/users"
                component={UserRoutes}
                isAuthenticated={isLogged}
              />
              <PrivateRoutes
                path="/departments"
                component={DepartmentsRoutes}
                isAuthenticated={isLogged}
              />
              <PrivateRoutes
                path="/roles"
                component={RolesRoutes}
                isAuthenticated={isLogged}
                />
                <PrivateRoutes
                path="/websites"
                component={WebsitesRoutes}
                isAuthenticated={isLogged}
              />
              <Redirect to="/dashboard" />
            </Switch>
          </Suspense>
        </Layout>
    </>
  );
};

export default ContentRoutes;