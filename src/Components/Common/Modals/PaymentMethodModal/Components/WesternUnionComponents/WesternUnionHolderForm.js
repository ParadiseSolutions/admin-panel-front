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

const WesternUnionHolderForm = ({
  validationType,
  countryData,
  setCountryCodeSelected,
  countryCodeSelected,
  countryHolderSelected,
  setCountryHolderSelected,
}) => {
  return (
    <>
      <Row>
        <Col className="col-12">
          <div className="form-outline mb-2">
          <div className="d-flex justify-content-between">
              <Label className="form-label">Name</Label>
              <div>
                <i className="uil-question-circle font-size-15" id="nameTTWU" />
                <UncontrolledTooltip
                  autohide={true}
                  placement="top"
                  target="nameTTWU"
                >
                  Account Holder's Name. This can be either a business name or a
                  personal name, but must exactly match what is on the bank
                  account.
                </UncontrolledTooltip>
              </div>
            </div>
            <Input
              type="text"
              name="name_WU"
              onChange={validationType.handleChange}
              onBlur={validationType.handleBlur}
              value={validationType.values.name_WU || ""}
            />
          </div>
        </Col>
      </Row>
      <Row>
        <Col className="col-12 mb-2">
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
              name="email_WU"
              onChange={validationType.handleChange}
              onBlur={(e) => {
                const value = e.target.value || "";
                validationType.setFieldValue(
                  "email_WU",
                  value.toLowerCase()
                );
                validationType.handleBlur(e);
              }}
              // onBlur={validationType.handleBlur}
              value={validationType.values.email_WU || ""}
              invalid={
                validationType.touched.email_WU &&
                  validationType.errors.email_WU
                  ? true
                  : false
              }
            />
            {validationType.touched.email_WU &&
              validationType.errors.email_WU ? (
              <FormFeedback type="invalid">
                {validationType.errors.email_WU}
              </FormFeedback>
            ) : null}
          </div>
        </Col>
      </Row>
      <Row>
        <Col className="col-2">
          <div className="form-outline">
            <div className="d-flex justify-content-between">
              <Label className="form-label">Country</Label>
              <div>
                <i className="uil-question-circle font-size-15" id="countryTTWU" />
                <UncontrolledTooltip
                  autohide={true}
                  placement="top"
                  target="countryTTWU"
                >
                  Account Holder's Country. Pending Tooltip.
                </UncontrolledTooltip>
              </div>
            </div>
            {/* <Input
              type="text"
              name="country_WU"
              onChange={validationType.handleChange}
              onBlur={validationType.handleBlur}
              value={validationType.values.country_WU || ""}
            /> */}
            <Input
                type="select"
                name="country_WU"
                onChange={(e) => {
                  setCountryHolderSelected(e.target.value);
                }}
                onBlur={validationType.handleBlur}
                value={countryHolderSelected || ""}
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
        <Col className="col-3">
          <div className="form-outline">
            <div className="d-flex justify-content-between">
              <Label className="form-label">State</Label>
              <div>
                <i
                  className="uil-question-circle font-size-15"
                  id="stateTTWU"
                />
                <UncontrolledTooltip
                  autohide={true}
                  placement="top"
                  target="stateTTWU"
                >
                  Account Holder's State.   This must be the city associated with the bank account.  It can be a US state like Nevada or it can be a Mexican State like Quintana Roo.  Write out the name rather than using an abbreviation like NV.
                </UncontrolledTooltip>
              </div>
            </div>
            <Input
              type="text"
              name="state_WU"
              onChange={validationType.handleChange}
              // onBlur={validationType.handleBlur}
              onBlur={(e) => {
                const value = e.target.value || "";
                validationType.setFieldValue(
                  "state_WU",
                  capitalizeWords2(value)
                );
                validationType.handleBlur(e);
              }}
              value={validationType.values.state_WU || ""}
            />
          </div>
        </Col>
        <Col className="col-3">
          <div className="form-outline">
            <div className="d-flex justify-content-between">
              <Label className="form-label">Area Code</Label>
              <div>
                <i
                  className="uil-question-circle font-size-15"
                  id="areaCodeTTWU"
                />
                <UncontrolledTooltip
                  autohide={true}
                  placement="top"
                  target="areaCodeTTWU"
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
              name="country_code_WU"
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
        <Col className="col-4">
          <div className="form-outline">
            <div className="d-flex justify-content-between">
              <Label className="form-label">Phone</Label>
              <div>
                <i
                  className="uil-question-circle font-size-15"
                  id="phoneTTWU"
                />
                <UncontrolledTooltip
                  autohide={true}
                  placement="top"
                  target="phoneTTWU"
                >
                  Account Holder's Phone Number. Enter this is standard format
                  987 123 4567. Don't write the country code here. This number
                  must match the one associated with the bank account.
                </UncontrolledTooltip>
              </div>
            </div>
            <Input
              type="text"
              name="phone_WU"
              onChange={validationType.handleChange}
              onBlur={validationType.handleBlur}
              value={validationType.values.phone_WU || ""}
              invalid={
                validationType.touched.phone_WU &&
                  validationType.errors.phone_WU
                  ? true
                  : false
              }
            />
            {validationType.touched.phone_WU &&
              validationType.errors.phone_WU ? (
              <FormFeedback type="invalid">
                {validationType.errors.phone_WU}
              </FormFeedback>
            ) : null}
          </div>
        </Col>
      </Row>
    </>
  );
};

export default WesternUnionHolderForm;
