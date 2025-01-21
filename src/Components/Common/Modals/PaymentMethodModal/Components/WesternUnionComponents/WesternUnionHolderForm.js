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
} from "reactstrap";

const WesternUnionHolderForm = ({
  validationType,
  countryData,
  setCountryCodeSelected,
}) => {
  return (
    <>
      <Col className="col-12 d-flex justify-content-between">
        <Col className="col-12 mx-1">
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
      </Col>
      <Col className="col-12 d-flex justify-content-between">
        <Col className="col-12 mb-2 mx-1">
          <div className="form-outline">
            <Label className="form-label">Email</Label>
            <Input
              type="text"
              name="email_WU"
              onChange={validationType.handleChange}
              onBlur={validationType.handleBlur}
              value={validationType.values.email_WU || ""}
            />
          </div>
        </Col>
      </Col>
      <Col className="col-12 d-flex">
        <Col className="col-2 mx-1">
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
        <Col className="col-3 mx-2">
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
        <Col className="col-2 mx-1">
          <div className="form-outline">
            <Label className="form-label">Area Code</Label>
            <Input
              type="select"
              name="country_code_WU"
              onChange={(e) => {
                setCountryCodeSelected(e.target.value);
              }}
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
        <Col className="col-4 mx-2">
          <div className="form-outline">
            <Label className="form-label">Phone</Label>
            <Input
              type="text"
              name="phone_WU"
              onChange={validationType.handleChange}
              onBlur={validationType.handleBlur}
              value={validationType.values.phone_WU || ""}
            />
          </div>
        </Col>
      </Col>
    </>
  );
};

export default WesternUnionHolderForm;
