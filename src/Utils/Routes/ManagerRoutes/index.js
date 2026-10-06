import React from "react";
import { Route, Switch } from "react-router-dom";
import PageUrls from "../../../Pages/Manager/PageUrls";
import PricingOptionDetails from "../../../Pages/Manager/PricingOptionDetails";
import CharterTypes from "../../../Pages/Manager/CharterTypes";
import AirportTransfers from "../../../Pages/Manager/AirportTransfers";
import AirportTransferForm from "../../../Pages/Manager/AirportTransfers/form";
import RelatedTours from "../../../Pages/Manager/RelatedTours";

const ManagerRoutes = () => {
  return (
    <Switch>
      <Route exact path="/manager/page-urls" component={PageUrls} />
      <Route exact path="/manager/pricing-option-details" component={PricingOptionDetails} />
      <Route exact path="/manager/charter-types" render={() => <CharterTypes kind="charter" />} />
      <Route exact path="/manager/charter-types-fishing" render={() => <CharterTypes kind="fishing" />} />
      <Route exact path="/manager/airport-transfers" component={AirportTransfers} />
      <Route exact path="/manager/airport-transfers/:webCode/:type" component={AirportTransferForm} />
      <Route exact path="/manager/related-tours" component={RelatedTours} />
    </Switch>
  );
};

export default ManagerRoutes;
