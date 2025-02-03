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
          <div className="d-flex justify-content-between">
            <Label className="form-label">Country</Label>
            <div>
              <i className="uil-question-circle font-size-15" id="countryTT" />
              <UncontrolledTooltip
                autohide={true}
                placement="top"
                target="countryTT"
              >
                Select the Country the bank account is located in.
              </UncontrolledTooltip>
            </div>
          </div>
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
          <div className="d-flex justify-content-between">
            <Label className="form-label">Currency</Label>
            <div>
              <i className="uil-question-circle font-size-15" id="currencyTT" />
              <UncontrolledTooltip
                autohide={true}
                placement="top"
                target="currencyTT"
              >
                Select the Currency of the Bank Account.
              </UncontrolledTooltip>
            </div>
          </div>
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
              <option key={index} value={item.currency_id}>
                {item.currency}
              </option>
            ))}
          </Input>
        </div>
      </Col>
      <Col className="col-12">
        <div className="form-outline mb-2">
          <div className="d-flex justify-content-between">
            <Label className="form-label">Bank Name</Label>
            <div>
              <i className="uil-question-circle font-size-15" id="banknameTT" />
              <UncontrolledTooltip
                autohide={true}
                placement="top"
                target="banknameTT"
              >
                Name of the Bank that the account is held at.
              </UncontrolledTooltip>
            </div>
          </div>
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
              <div className="d-flex justify-content-between">
                <Label className="form-label">ABA Routing</Label>
                <div>
                  <i className="uil-question-circle font-size-15" id="abaTT" />
                  <UncontrolledTooltip
                    autohide={true}
                    placement="top"
                    target="abaTT"
                  >
                    Pending Tooltip
                  </UncontrolledTooltip>
                </div>
              </div>
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
              <div className="d-flex justify-content-between">
                <Label className="form-label">Account Number</Label>
                <div>
                  <i
                    className="uil-question-circle font-size-15"
                    id="accountNumberTT"
                  />
                  <UncontrolledTooltip
                    autohide={true}
                    placement="top"
                    target="accountNumberTT"
                  >
                    Pending Tooltip
                  </UncontrolledTooltip>
                </div>
              </div>
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
