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

const WireTransferForm = ({
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
      <Col className="col-12 d-flex justify-content-between">
        <Col className="col-6 mb-2">
          <div className="form-outline" style={{ marginRight: "10px" }}>
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
              name="bank_name_WT"
              onChange={validationType.handleChange}
              onBlur={(e) => {
                const value = e.target.value || "";
                validationType.setFieldValue(
                  "bank_name_WT",
                  titleCapitalize(value)
                );
                validationType.handleBlur(e);
              }}
              // onBlur={validationType.handleBlur}
              value={validationType.values.bank_name_WT || ""}
              invalid={
                validationType.touched.bank_name_WT &&
                  validationType.errors.bank_name_WT
                  ? true
                  : false
              }
            />
            {validationType.touched.bank_name_WT &&
              validationType.errors.bank_name_WT ? (
              <FormFeedback type="invalid">
                {validationType.errors.bank_name_WT}
              </FormFeedback>
            ) : null}
          </div>
        </Col>
        <Col className="col-6 mb-2">
          <div className="form-outline">
            <div className="d-flex justify-content-between">
              <Label className="form-label">SWIFT</Label>
              <div>
                <i className="uil-question-circle font-size-15" id="swiftTT" />
                <UncontrolledTooltip
                  autohide={true}
                  placement="top"
                  target="swiftTT"
                >
                  The SWIFT Code of the bank. This code will be either 8 digits
                  or 11 digits and all capital letters. The SWIFT is used only
                  for international transactions like wire transfers.
                </UncontrolledTooltip>
              </div>
            </div>
            <Input
              type="text"
              name="swift_WT"
              onChange={validationType.handleChange}
              // onBlur={validationType.handleBlur}
              onBlur={(e) => {
                const value = e.target.value || "";
                validationType.setFieldValue(
                  "swift_WT",
                  value.toUpperCase()
                );
                validationType.handleBlur(e);
              }}
              value={validationType.values.swift_WT || ""}
              invalid={
                validationType.touched.swift_WT &&
                  validationType.errors.swift_WT
                  ? true
                  : false
              }
            />
            {validationType.touched.swift_WT &&
              validationType.errors.swift_WT ? (
              <FormFeedback type="invalid">
                {validationType.errors.swift_WT}
              </FormFeedback>
            ) : null}
          </div>
        </Col>
      </Col>
      {countrySelected === 2 ? (
        <>
          <Col className="col-12">
            <div className="form-outline">
              <div className="d-flex justify-content-between">
                <Label className="form-label">CLABE</Label>
                <div>
                  <i
                    className="uil-question-circle font-size-15"
                    id="clabeTT"
                  />
                  <UncontrolledTooltip
                    autohide={true}
                    placement="top"
                    target="clabeTT"
                  >
                    The CLABE number is an 18-digit number used to identify a
                    Mexican bank account. It is required for any type of bank
                    transfer to a Mexican Bank.
                  </UncontrolledTooltip>
                </div>
              </div>
              <Input
                type="text"
                name="clabe_WT"
                max={18}
                onChange={validationType.handleChange}
                onBlur={validationType.handleBlur}
                value={validationType.values.clabe_WT || ""}
                invalid={
                  validationType.touched.clabe_WT &&
                    validationType.errors.clabe_WT
                    ? true
                    : false
                }
              />
              {validationType.touched.clabe_WT &&
                validationType.errors.clabe_WT ? (
                <FormFeedback type="invalid">
                  {validationType.errors.clabe_WT}
                </FormFeedback>
              ) : null}
            </div>
          </Col>
        </>
      ) : null}
      {countrySelected === 1 ? (
        <>
          <Col className="col-12 d-flex justify-content-between">
            <Col className="col-6 mb-2">
              <div className="form-outline" style={{ marginRight: "10px" }}>
                <div className="d-flex justify-content-between">
                  <Label className="form-label">ABA Routing</Label>
                  <div>
                    <i
                      className="uil-question-circle font-size-15"
                      id="abaTTWT"
                    />
                    <UncontrolledTooltip
                      autohide={true}
                      placement="top"
                      target="abaTTWT"
                    >
                      Enter the ABA Routing number associated with the account holder's bank account.
                      <br/>
                      The ABA Routing number is 9 numerical digits.
                    </UncontrolledTooltip>
                  </div>
                </div>
                <Input
                  type="text"
                  name="aba_routing_WT"
                  onChange={validationType.handleChange}
                  onBlur={validationType.handleBlur}
                  value={validationType.values.aba_routing_WT || ""}
                  invalid={
                    validationType.touched.aba_routing_WT &&
                      validationType.errors.aba_routing_WT
                      ? true
                      : false
                  }
                />
                {validationType.touched.aba_routing_WT &&
                  validationType.errors.aba_routing_WT ? (
                  <FormFeedback type="invalid">
                    {validationType.errors.aba_routing_WT}
                  </FormFeedback>
                ) : null}
              </div>
            </Col>
            <Col className="col-6 mb-2">
              <div className="form-outline">
                <div className="d-flex justify-content-between">
                  <Label className="form-label">Account Number</Label>
                  <div>
                    <i
                      className="uil-question-circle font-size-15"
                      id="accountNumberTTWT"
                    />
                    <UncontrolledTooltip
                      autohide={true}
                      placement="top"
                      target="accountNumberTTWT"
                    >
                      Enter the bank account number to send the funds to. This should be numbers only.
                    </UncontrolledTooltip>
                  </div>
                </div>
                <Input
                  type="text"
                  name="account_number_WT"
                  onChange={validationType.handleChange}
                  onBlur={validationType.handleBlur}
                  value={validationType.values.account_number_WT || ""}
                />
              </div>
            </Col>
          </Col>
        </>
      ) : null}
    </>
  );
};

export default WireTransferForm;
