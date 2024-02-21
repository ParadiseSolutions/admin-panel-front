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
import PaymentTypesRoutes from "./PaymentTypesRoutes";
import CategoriesRoutes from "./CategoriesRoutes";
import ProvidersRoutes from "./ProvidersRoutes";
import LocationsRoutes from "./LocationsRoutes";
import OperatorsRoutes from "./OperatorsRoutes";
import TourRoutes from "./ToursRoutes";
import Layout from "../../Components/Layout";

const Fallback = () => <div>loading.....</div>;

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
            <PrivateRoutes path="/shopping-carts" component={ShoppingCartRoutes} isAuthenticated={isLogged} />
            <PrivateRoutes path="/payment-types" component={PaymentTypesRoutes} isAuthenticated={isLogged} />
            <PrivateRoutes path="/locations" component={LocationsRoutes} isAuthenticated={isLogged} />
            <PrivateRoutes path="/operators" component={OperatorsRoutes} isAuthenticated={isLogged} />
            <PrivateRoutes path="/categories" component={CategoriesRoutes} isAuthenticated={isLogged} />
            <PrivateRoutes path="/providers" component={ProvidersRoutes} isAuthenticated={isLogged} />
            <PrivateRoutes path="/shoppingcarts" component={ShoppingCartRoutes} isAuthenticated={isLogged} />
            <PrivateRoutes path="/tours" component={TourRoutes} isAuthenticated={isLogged} />
            <Redirect to="/tours/new" />
          </Switch>
        </Suspense>
      </Layout>
    </>
  );
};

export default ContentRoutes;