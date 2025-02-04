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

const WesternUnionHolderForm = ({
  validationType,
  countryData,
  setCountryCodeSelected,
  countryCodeSelected
}) => {
  return (
    <>
      <Row>
        <Col className="col-12">
          <div className="form-outline mb-2">
            <Label className="form-label">Name</Label>
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
            <Label className="form-label">Email</Label>
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
            <Label className="form-label">Country</Label>
            <Input
              type="text"
              name="country_WU"
              onChange={validationType.handleChange}
              onBlur={validationType.handleBlur}
              value={validationType.values.country_WU || ""}
            />
          </div>
        </Col>
        <Col className="col-3">
          <div className="form-outline">
            <Label className="form-label">State</Label>
            <Input
              type="text"
              name="state_WU"
              onChange={validationType.handleChange}
              onBlur={validationType.handleBlur}
              value={validationType.values.state_WU || ""}
            />
          </div>
        </Col>
        <Col className="col-3">
          <div className="form-outline">
            <Label className="form-label">Area Code</Label>
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
            <Label className="form-label">Phone</Label>
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
