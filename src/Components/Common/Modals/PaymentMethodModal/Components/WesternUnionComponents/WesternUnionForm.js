import React from "react";
import {
  Collapse,
  Row,
  Col,
  Card,
  CardBody,
  UncontrolledTooltip,
  Label,
  Input,
  FormFeedback,
} from "reactstrap";
import { titleCapitalize } from "../../../../../../Utils/CommonFunctions";

const WesternUnionForm = ({
  validationType,
  countryData,
  currencyData,
  accountTypeData,
  countrySelected,
  setCountrySelected,
  currencySelected,
  setCurrencySelected,
  accountTypeSelected,
  setAccountTypeSelected,
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
        <Row>
          <Col className="col-6 mb-2">
            <div className="form-outline">
              <div className="d-flex justify-content-between">
                <Label className="form-label">Bank Name</Label>
                <div>
                  <i
                    className="uil-question-circle font-size-15"
                    id="banknameTT"
                  />
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
                name="bank_name_WU"
                onChange={validationType.handleChange}
                onBlur={(e) => {
                  const value = e.target.value || "";
                  validationType.setFieldValue(
                    "bank_name_WU",
                    titleCapitalize(value)
                  );
                }}
                // onBlur={validationType.handleBlur}
                value={validationType.values.bank_name_WU || ""}
                invalid={
                  validationType.touched.bank_name_WU &&
                    validationType.errors.bank_name_WU
                    ? true
                    : false
                }
              />
              {validationType.touched.bank_name_WU &&
                validationType.errors.bank_name_WU ? (
                <FormFeedback type="invalid">
                  {validationType.errors.bank_name_WU}
                </FormFeedback>
              ) : null}
            </div>
          </Col>
          {countrySelected === 1 ? (
            <Col className="col-6 mb-2">
              <div className="form-outline">
                <div className="d-flex justify-content-between">
                  <Label className="form-label">ABA Routing</Label>
                  <div>
                    <i
                      className="uil-question-circle font-size-15"
                      id="abaTT"
                    />
                    <UncontrolledTooltip
                      autohide={true}
                      placement="top"
                      target="abaTT"
                    >
                      Enter the ABA Routing number associated with the account
                      holder's bank account.
                    </UncontrolledTooltip>
                  </div>
                </div>
                <Input
                  type="number"
                  name="aba_routing_WU"
                  onChange={validationType.handleChange}
                  onBlur={validationType.handleBlur}
                  value={validationType.values.aba_routing_WU || ""}
                  invalid={
                    validationType.touched.aba_routing_WU &&
                      validationType.errors.aba_routing_WU
                      ? true
                      : false
                  }
                />
                {validationType.touched.aba_routing_WU &&
                  validationType.errors.aba_routing_WU ? (
                  <FormFeedback type="invalid">
                    {validationType.errors.aba_routing_WU}
                  </FormFeedback>
                ) : null}
              </div>
            </Col>
          ) : (
            <Col className="col-6 mb-2">
              <div className="form-outline">
                <div className="d-flex justify-content-between">
                  <Label className="form-label">Select One</Label>
                  <div>
                    <i
                      className="uil-question-circle font-size-15"
                      id="selectTT"
                    />
                    <UncontrolledTooltip
                      autohide={true}
                      placement="top"
                      target="selectTT"
                    >
                      Choose the method you will use to specify the account
                      information.
                    </UncontrolledTooltip>
                  </div>
                </div>
                <Input
                  type="select"
                  name="price_type"
                  onChange={(e) => {
                    console.log(e.target.value);
                    setAccountTypeSelected(+e.target.value);
                  }}
                  onBlur={validationType.handleBlur}
                  value={accountTypeSelected || ""}
                >
                  <option value={null}>Select....</option>
                  {accountTypeData.map((item, index) => (
                    <option key={index} value={item.account_type_id}>
                      {item.account_type_name}
                    </option>
                  ))}
                </Input>
              </div>
            </Col>
          )}
        </Row>
      </Col>
      {countrySelected === 1 ? (
        <Col className="col-12">
          <div className="form-outline">
            <div className="d-flex justify-content-between">
              <Label className="form-label">Account Number</Label>
              <div>
                <i className="uil-question-circle font-size-15" id="selectTT" />
                <UncontrolledTooltip
                  autohide={true}
                  placement="top"
                  target="selectTT"
                >
                  Enter the bank account number to send the funds to.
                </UncontrolledTooltip>
              </div>
            </div>
            <Input
              type="number"
              name="account_number_WU"
              onChange={validationType.handleChange}
              onBlur={validationType.handleBlur}
              value={validationType.values.account_number_WU || ""}
            />
          </div>
        </Col>
      ) : null}
      {countrySelected === 2 && accountTypeSelected === 1 ? (
        <Col className="col-12">
          <div className="form-outline">
            <div className="d-flex justify-content-between">
              <Label className="form-label">Clabe</Label>
              <div>
                <i className="uil-question-circle font-size-15" id="clabeTT" />
                <UncontrolledTooltip
                  autohide={true}
                  placement="top"
                  target="clabeTT"
                >
                  Enter the CLABE number associated with the account holder's
                  account.
                </UncontrolledTooltip>
              </div>
            </div>
            <Input
              type="number"
              min="1"
              max="18"
              name="clabe_WU"
              onChange={validationType.handleChange}
              onBlur={validationType.handleBlur}
              value={validationType.values.clabe_WU || ""}
              invalid={
                validationType.touched.clabe_WU &&
                  validationType.errors.clabe_WU
                  ? true
                  : false
              }
            />
            {validationType.touched.clabe_WU &&
              validationType.errors.clabe_WU ? (
              <FormFeedback type="invalid">
                {validationType.errors.clabe_WU}
              </FormFeedback>
            ) : null}
          </div>
        </Col>
      ) : null}
      {countrySelected === 2 && accountTypeSelected === 2 ? (
        <Col className="12">
          <Row>
            <Col className="col-6">
              <div className="form-outline">
                <div className="d-flex justify-content-between">
                  <Label className="form-label">Debit Card</Label>
                  <div>
                    <i
                      className="uil-question-circle font-size-15"
                      id="debitTT"
                    />
                    <UncontrolledTooltip
                      autohide={true}
                      placement="top"
                      target="debitTT"
                    >
                      Enter the account holder's debit card number. The debit
                      card should contain 16 numerical digits.
                    </UncontrolledTooltip>
                  </div>
                </div>
                <Input
                  type="text"
                  name="debit_card_WU"
                  onChange={validationType.handleChange}
                  onBlur={validationType.handleBlur}
                  value={validationType.values.debit_card_WU || ""}
                />
              </div>
            </Col>
            <Col className="col-6">
              <div className="form-outline">
                <div className="d-flex justify-content-between">
                  <Label className="form-label">SWIFT</Label>
                  <div>
                    <i
                      className="uil-question-circle font-size-15"
                      id="swiftTT"
                    />
                    <UncontrolledTooltip
                      autohide={true}
                      placement="top"
                      target="swiftTT"
                    >
                      Enter the SWIFT Code associated with the account holder's
                      bank account. The SWIFT Code is either 8 or 11 digits, all
                      capital letters.
                    </UncontrolledTooltip>
                  </div>
                </div>
                <Input
                  type="text"
                  name="swift_WU"
                  onChange={validationType.handleChange}
                  onBlur={(e) => {
                    const value = e.target.value || "";
                    validationType.setFieldValue(
                      "swift_WU",
                      value.toUpperCase()
                    );
                  }}
                  value={validationType.values.swift_WU || ""}
                  invalid={
                    validationType.touched.swift_WU &&
                      validationType.errors.swift_WU
                      ? true
                      : false
                  }
                />
                {validationType.touched.swift_WU &&
                  validationType.errors.swift_WU ? (
                  <FormFeedback type="invalid">
                    {validationType.errors.swift_WU}
                  </FormFeedback>
                ) : null}
              </div>
            </Col>
          </Row>
        </Col>
      ) : null}
    </>
  );
};

export default WesternUnionForm;
