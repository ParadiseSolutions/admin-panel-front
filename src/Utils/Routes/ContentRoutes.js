import React, { Suspense } from "react";
import { Switch, Redirect } from "react-router-dom";
import PrivateRoutes from "./PrivateRoutes";
import DashboardRoutes from "./DashboardRoutes/Dashboard";
import WebsitesRoutes from "./WebsitesRoutes";
import TourTypesRoutes from "./TourTypesRoutes";
import DepartmentsRoutes from "./DepartmentsRoutes";
import RolesRoutes from "./RolesRoutes";
import UsersRoutes from './UsersRoutes'
import ShoppingCartRoutes from "./ShoppingCartRoutes";
<<<<<<< HEAD
import PaymentTypesRoutes from "./PaymentTypesRoutes";
=======
import CategoriesRoutes from "./CategoriesRoutes";
>>>>>>> 615d8d37ef961b2ddd454cdded8f99f1a0ffe2cc
import Layout from "../../Components/Layout";


const Fallback = () => <div>cargando.....</div>;

const ContentRoutes = ({ isLogged, ...rest }) => {
  return (
    <>
      <Layout>
        <Suspense fallback={<Fallback />}>
          <Switch>
            <PrivateRoutes path="/dashboard" component={DashboardRoutes} isAuthenticated={isLogged} />
            <PrivateRoutes path="/users" component={UsersRoutes} isAuthenticated={isLogged} />

            <PrivateRoutes path="/departments" component={DepartmentsRoutes} isAuthenticated={isLogged} />
            <PrivateRoutes path="/roles" component={RolesRoutes} isAuthenticated={isLogged} />
            <PrivateRoutes path="/websites" component={WebsitesRoutes} isAuthenticated={isLogged} />
            <PrivateRoutes path="/tour-types" component={TourTypesRoutes} isAuthenticated={isLogged} />
<<<<<<< HEAD
            <PrivateRoutes path="/shopping-carts" component={ShoppingCartRoutes} isAuthenticated={isLogged} />
            <PrivateRoutes path="/payment-types" component={PaymentTypesRoutes} isAuthenticated={isLogged} />
=======
            <PrivateRoutes path="/categories" component={CategoriesRoutes} isAuthenticated={isLogged} />
            <PrivateRoutes path="/categories" component={ShoppingCartRoutes} isAuthenticated={isLogged} />
>>>>>>> 615d8d37ef961b2ddd454cdded8f99f1a0ffe2cc
            <Redirect to="/dashboard" />
          </Switch>
        </Suspense>
      </Layout>
    </>
  );
};

export default ContentRoutes;