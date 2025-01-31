import React, { useState } from "react";
import { Col, UncontrolledTooltip, Label, Input, Row } from "reactstrap";

const AchAccHolderForm = ({
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
            <Label className="form-label">Name</Label>
            <Input
              type="text"
              name="name_ach"
              onChange={validationType.handleChange}
              onBlur={validationType.handleBlur}
              value={validationType.values.name_ach || ""}
            />
          </div>
        </Col>
        <Col className="col-6">
          <div className="form-outline mb-2">
            <Label className="form-label">Address</Label>
            <Input
              type="text"
              name="address_ach"
              onChange={validationType.handleChange}
              onBlur={validationType.handleBlur}
              value={validationType.values.address_ach || ""}
            />
          </div>
        </Col>
      </Col>
      <Col className="col-12">
        <Row>
          <Col className="col-4">
            <div className="form-outline mb-2">
              <Label className="form-label">City</Label>
              <Input
                type="text"
                name="city_ach"
                onChange={validationType.handleChange}
                onBlur={validationType.handleBlur}
                value={validationType.values.city_ach || ""}
              />
            </div>
          </Col>
          <Col className="col-4">
            <div className="form-outline">
              <Label className="form-label">State</Label>
              <Input
                type="text"
                name="state_ach"
                onChange={validationType.handleChange}
                onBlur={validationType.handleBlur}
                value={validationType.values.state_ach || ""}
              />
            </div>
          </Col>
          <Col className="col-4">
            <div className="form-outline">
              <Label className="form-label">Postal</Label>
              <Input
                type="text"
                name="postal_ach"
                onChange={validationType.handleChange}
                onBlur={validationType.handleBlur}
                value={validationType.values.postal_ach || ""}
              />
            </div>
          </Col>
        </Row>
      </Col>
      <Col className="col-12">
        <Row>
          <Col className="col-2">
            <div className="form-outline">
              <Label className="form-label">Country</Label>
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
              <Label className="form-label">Phone</Label>
              <Input
                type="text"
                name="phone_ach"
                onChange={validationType.handleChange}
                onBlur={validationType.handleBlur}
                value={validationType.values.phone_ach || ""}
              />
            </div>
          </Col>
          <Col className="col-5">
            <div className="form-outline">
              <Label className="form-label">Email</Label>
              <Input
                type="text"
                name="email_ach"
                onChange={validationType.handleChange}
                onBlur={validationType.handleBlur}
                value={validationType.values.email_ach || ""}
              />
            </div>
          </Col>
          
        </Row>
      </Col>
    </>
  );
};

export default AchAccHolderForm;
