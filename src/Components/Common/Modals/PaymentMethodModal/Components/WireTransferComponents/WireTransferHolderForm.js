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
import { capitalizeWords2 } from "../../../../../../Utils/CommonFunctions";

const WireTransferHolderForm = ({
  validationType,
  countryData,
  countryCodeSelected,
  setCountryCodeSelected,
}) => {
  return (
    <>
      <Col className="row">
        <Col className="col-6">
          <div className="form-outline mb-2">
            <div className="d-flex justify-content-between">
              <Label className="form-label">Name</Label>
              <div>
                <i className="uil-question-circle font-size-15" id="nameTT" />
                <UncontrolledTooltip
                  autohide={true}
                  placement="top"
                  target="nameTT"
                >
                  Account Holder's Name. This can be either a business name or a
                  personal name, but must exactly match what is on the bank
                  account.
                </UncontrolledTooltip>
              </div>
            </div>
            <Input
              type="text"
              name="name_WT"
              onChange={validationType.handleChange}
              onBlur={validationType.handleBlur}
              value={validationType.values.name_WT || ""}
            />
          </div>
        </Col>
        <Col className="col-6">
          <div className="form-outline mb-2">
            <div className="d-flex justify-content-between">
              <Label className="form-label">Address</Label>
              <div>
                <i
                  className="uil-question-circle font-size-15"
                  id="addressTT"
                />
                <UncontrolledTooltip
                  autohide={true}
                  placement="top"
                  target="addressTT"
                >
                  Account Holder's Address. This must be the address associated
                  with the bank account.
                </UncontrolledTooltip>
              </div>
            </div>
            <Input
              type="text"
              name="address_WT"
              onChange={validationType.handleChange}
              // onBlur={validationType.handleBlur}
              onBlur={(e) => {
                const value = e.target.value || "";
                validationType.setFieldValue(
                  "address_WT",
                  capitalizeWords2(value)
                );
              }}
              value={validationType.values.address_WT || ""}
              invalid={
                validationType.touched.address_WT &&
                  validationType.errors.address_WT
                  ? true
                  : false
              }
            />
            {validationType.touched.address_WT &&
              validationType.errors.address_WT ? (
              <FormFeedback type="invalid">
                {validationType.errors.address_WT}
              </FormFeedback>
            ) : null}
          </div>
        </Col>
      </Col>
      <Col className="col-12">
        <Row>
          <Col className="col-4">
            <div className="form-outline mb-2">
              <div className="d-flex justify-content-between">
                <Label className="form-label">City</Label>
                <div>
                  <i className="uil-question-circle font-size-15" id="cityTT" />
                  <UncontrolledTooltip
                    autohide={true}
                    placement="top"
                    target="cityTT"
                  >
                    Account Holder's City. This must be the city associated with
                    the bank account.
                  </UncontrolledTooltip>
                </div>
              </div>
              <Input
                type="text"
                name="city_WT"
                onChange={validationType.handleChange}
                // onBlur={validationType.handleBlur}
                onBlur={(e) => {
                  const value = e.target.value || "";
                  validationType.setFieldValue(
                    "city_WT",
                    capitalizeWords2(value)
                  );
                }}
                value={validationType.values.city_WT || ""}
                invalid={
                  validationType.touched.city_WT &&
                    validationType.errors.city_WT
                    ? true
                    : false
                }
              />
              {validationType.touched.city_WT &&
                validationType.errors.city_WT ? (
                <FormFeedback type="invalid">
                  {validationType.errors.city_WT}
                </FormFeedback>
              ) : null}
            </div>
          </Col>
          <Col className="col-4">
            <div className="form-outline">
              <div className="d-flex justify-content-between">
                <Label className="form-label">State</Label>
                <div>
                  <i
                    className="uil-question-circle font-size-15"
                    id="stateTT"
                  />
                  <UncontrolledTooltip
                    autohide={true}
                    placement="top"
                    target="stateTT"
                  >
                    Account Holder's Address. This must be the address
                    associated with the bank account.
                  </UncontrolledTooltip>
                </div>
              </div>
              <Input
                type="text"
                name="state_WT"
                onChange={validationType.handleChange}
                // onBlur={validationType.handleBlur}
                onBlur={(e) => {
                  const value = e.target.value || "";
                  validationType.setFieldValue(
                    "state_WT",
                    capitalizeWords2(value)
                  );
                }}
                value={validationType.values.state_WT || ""}
              />
            </div>
          </Col>
          <Col className="col-4">
            <div className="form-outline">
              <div className="d-flex justify-content-between">
                <Label className="form-label">Postal</Label>
                <div>
                  <i
                    className="uil-question-circle font-size-15"
                    id="postalTT"
                  />
                  <UncontrolledTooltip
                    autohide={true}
                    placement="top"
                    target="postalTT"
                  >
                    Account Holder's Postal Code. This can be a US Zip Code or a
                    Mexican or foreign Postal Code. It must match the one
                    associated with the bank account.
                  </UncontrolledTooltip>
                </div>
              </div>
              <Input
                type="text"
                name="postal_WT"
                onChange={validationType.handleChange}
                value={validationType.values.postal_WT || ""}
                // onBlur={validationType.handleBlur}
                onBlur={(e) => {
                  const value = e.target.value || "";
                  validationType.setFieldValue(
                    "postal_WT",
                    capitalizeWords2(value)
                  );
                }}
              />
            </div>
          </Col>
        </Row>
      </Col>
      <Col className="col-12">
        <Row>
          <Col className="col-2">
            <div className="form-outline">
              <div className="d-flex justify-content-between">
                <Label className="form-label">Country</Label>
                <div>
                  <i
                    className="uil-question-circle font-size-15"
                    id="countryTT"
                  />
                  <UncontrolledTooltip
                    autohide={true}
                    placement="top"
                    target="countryTT"
                  >
                    Choose the country code for the Account Holder's phone
                    number. This must be the phone number associated with the
                    bank account. +1 for United States or Canada, and +52 for
                    Mexico.
                  </UncontrolledTooltip>
                </div>
              </div>
              <Input
                type="select"
                name="country_ach"
                onChange={(e) => {
                  setCountryCodeSelected(e.target.value);
                }}
                onBlur={validationType.handleBlur}
                value={countryCodeSelected || ""}
              >
                <option value={null}>Select....</option>
                {countryData.map((code, index) => (
                  <option key={index} value={code.country_code}>
                    {code.country_code}
                  </option>
                ))}
              </Input>
            </div>
          </Col>
          <Col className="col-5">
            <div className="form-outline">
              <div className="d-flex justify-content-between">
                <Label className="form-label">Phone</Label>
                <div>
                  <i
                    className="uil-question-circle font-size-15"
                    id="phoneTT"
                  />
                  <UncontrolledTooltip
                    autohide={true}
                    placement="top"
                    target="phoneTT"
                  >
                    Account Holder's Phone Number. Enter this is standard format
                    987 123 4567. Don't write the country code here. This number
                    must match the one associated with the bank account.
                  </UncontrolledTooltip>
                </div>
              </div>
              <Input
                type="text"
                name="phone_WT"
                onChange={validationType.handleChange}
                onBlur={validationType.handleBlur}
                value={validationType.values.phone_WT || ""}
                invalid={
                  validationType.touched.phone_WT &&
                    validationType.errors.phone_WT
                    ? true
                    : false
                }
              />
              {validationType.touched.phone_WT &&
                validationType.errors.phone_WT ? (
                <FormFeedback type="invalid">
                  {validationType.errors.phone_WT}
                </FormFeedback>
              ) : null}
            </div>
          </Col>
          <Col className="col-5">
            <div className="form-outline">
              <div className="d-flex justify-content-between">
                <Label className="form-label">Email</Label>
                <div>
                  <i
                    className="uil-question-circle font-size-15"
                    id="emailTT"
                  />
                  <UncontrolledTooltip
                    autohide={true}
                    placement="top"
                    target="emailTT"
                  >
                    Account Holder's Email Address. The email address where the
                    Account Holder will receive payment notifications.
                  </UncontrolledTooltip>
                </div>
              </div>
              <Input
                type="text"
                name="email_WT"
                onChange={validationType.handleChange}                
                onBlur={(e) => {
                  const value = e.target.value || "";
                  validationType.setFieldValue(
                    "email_WT",
                    value.toLowerCase()
                  );
                }}
                // onBlur={validationType.handleBlur}
                value={validationType.values.email_WT || ""}
                invalid={
                  validationType.touched.email_WT &&
                    validationType.errors.email_WT
                    ? true
                    : false
                }
              />
              {validationType.touched.email_WT &&
                validationType.errors.email_WT ? (
                <FormFeedback type="invalid">
                  {validationType.errors.email_WT}
                </FormFeedback>
              ) : null}
            </div>
          </Col>
        </Row>
      </Col>
    </>
  );
};

export default WireTransferHolderForm;
