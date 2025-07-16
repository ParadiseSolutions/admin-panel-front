import React, { useEffect, useState } from "react";
import { Col, UncontrolledTooltip, Label, Input, Row, FormFeedback } from "reactstrap";
import { titleCapitalize } from "../../../../../../Utils/CommonFunctions";

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
              <i className="uil-question-circle font-size-15" id="countryTTACH" />
              <UncontrolledTooltip
                autohide={true}
                placement="top"
                target="countryTTACH"
              >
                Select the Country the bank account is located in.
              </UncontrolledTooltip>
            </div>
          </div>
          <Input
            disabled={true}
            type="select"
            name="country"
            onChange={(e) => {
              setCountrySelected(+e.target.value);
            }}
            onBlur={validationType.handleBlur}
            value={countrySelected || ""}
          >
              <option value="1">
                USA
              </option>
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
          disabled="true"
            type="select"
            name="currency"
            onChange={(e) => {
              setCurrencySelected(+e.target.value);
            }}
            onBlur={validationType.handleBlur}
            value={currencySelected || ""}
          >
            <option value="1">
                USD
              </option>
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
            onBlur={(e) => {
              const value = e.target.value || "";
              validationType.setFieldValue(
                "bank_name",
                titleCapitalize(value)
              );
              validationType.handleBlur(e);
            }}
            // onBlur={validationType.handleBlur}
            value={validationType.values.bank_name || ""}
            invalid={
              validationType.touched.bank_name &&
                validationType.errors.bank_name
                ? true
                : false
            }
          />
          {validationType.touched.bank_name &&
            validationType.errors.bank_name ? (
            <FormFeedback type="invalid">
              {validationType.errors.bank_name}
            </FormFeedback>
          ) : null}
        </div>
      </Col>
      <Col className="col-12">
        <Row>
          <Col className="col-6">
            <div className="form-outline">
              <div className="d-flex justify-content-between">
                <Label className="form-label">ABA Routing</Label>
                <div>
                  <i className="uil-question-circle font-size-15" id="abaTTACH" />
                  <UncontrolledTooltip
                    autohide={true}
                    placement="top"
                    target="abaTTACH"
                  >
                    Enter the ABA Routing number associated with the account holder's bank account.
                    <br/>
                    The ABA Routing number is 9 numerical digits.
                  </UncontrolledTooltip>
                </div>
              </div>
              <Input
                type="text"
                name="ABA_Routing"
                onChange={validationType.handleChange}
                onBlur={validationType.handleBlur}
                value={validationType.values.ABA_Routing || ""}
                invalid={
                  validationType.touched.ABA_Routing &&
                    validationType.errors.ABA_Routing
                    ? true
                    : false
                }
              />
              {validationType.touched.ABA_Routing &&
                validationType.errors.ABA_Routing ? (
                <FormFeedback type="invalid">
                  {validationType.errors.ABA_Routing}
                </FormFeedback>
              ) : null}
            </div>
          </Col>
          <Col className="col-6">
            <div className="form-outline">
              <div className="d-flex justify-content-between">
                <Label className="form-label">Account Number</Label>
                <div>
                  <i
                    className="uil-question-circle font-size-15"
                    id="accountNumberTTAC"
                  />
                  <UncontrolledTooltip
                    autohide={true}
                    placement="top"
                    target="accountNumberTTAC"
                  >
                    Enter the bank account number to send the funds to. This should be numbers only.
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
