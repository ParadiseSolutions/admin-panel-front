import React, { useEffect, useState } from "react";
import { Col, UncontrolledTooltip, Label, Input, Row } from "reactstrap";

const AchForm = ({
  validationType,
  countryData,
  currencyData,
  countrySelected,
  setCountrySelected,
  currencySelected,
  setCurrencySelected,
}) => {
  return (
    <>
      <Col className="col-5">
        <div className="form-outline mb-2">
          <Label className="form-label">Country</Label>
          <Input
            type="select"
            name="country"
            onChange={(e) => {
              setCountrySelected(+e.target.value);
            }}
            onBlur={validationType.handleBlur}
            value={countrySelected || ""}
          >
            <option value={null}>Select....</option>
            {countryData.map((item, index) => (
              <option key={index} value={item.country_id}>
                {item.country_name}
              </option>
            ))}
          </Input>
        </div>
      </Col>
      <Col className="col-2">
        <div className="form-outline mb-2">
          <Label className="form-label">Currency</Label>
          <Input
            type="select"
            name="currency"
            onChange={(e) => {
              setCurrencySelected(+e.target.value);
            }}
            onBlur={validationType.handleBlur}
            value={currencySelected || ""}
          >
            <option value={null}>Select....</option>
            {currencyData.map((item, index) => (
              <option key={index} value={item.currency_id}  >
                {item.currency}
              </option>
            ))}
          </Input>
        </div>
      </Col>
      <Col className="col-12">
        <div className="form-outline mb-2">
          <Label className="form-label">Bank Name</Label>
          <Input
            type="text"
            name="bank_name"
            onChange={validationType.handleChange}
            onBlur={validationType.handleBlur}
            value={validationType.values.bank_name || ""}
          />
        </div>
      </Col>
      <Col className="col-12">
        <Row>
          <Col className="col-6">
            <div className="form-outline">
              <Label className="form-label">ABA Routing</Label>
              <Input
                type="text"
                name="ABA_Routing"
                onChange={validationType.handleChange}
                onBlur={validationType.handleBlur}
                value={validationType.values.ABA_Routing || ""}
              />
            </div>
          </Col>
          <Col className="col-6">
            <div className="form-outline">
              <Label className="form-label">Account Number</Label>
              <Input
                type="text"
                name="account_number"
                onChange={validationType.handleChange}
                onBlur={validationType.handleBlur}
                value={validationType.values.account_number || ""}
              />
            </div>
          </Col>
        </Row>
      </Col>
    </>
  );
};

export default AchForm;
