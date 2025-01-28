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
            <Label className="form-label">Bank Name</Label>
            <Input
              type="text"
              name="bank_name_WT"
              onChange={validationType.handleChange}
              onBlur={validationType.handleBlur}
              value={validationType.values.bank_name_WT || ""}
            />
          </div>
        </Col>
        <Col className="col-6 mb-2">
          <div className="form-outline">
            <Label className="form-label">SWIFT</Label>
            <Input
              type="text"
              name="swift_WT"
              onChange={validationType.handleChange}
              onBlur={validationType.handleBlur}
              value={validationType.values.swift_WT || ""}
            />
          </div>
        </Col>
      </Col>
      {countrySelected === 2 ? (
        <>
          <Col className="col-12">
            <div className="form-outline">
              <Label className="form-label">Clabe</Label>
              <Input
                type="text"
                name="clabe_WT"
                onChange={validationType.handleChange}
                onBlur={validationType.handleBlur}
                value={validationType.values.clabe_WT || ""}
              />
            </div>
          </Col>
        </>
      ) : null}
      {countrySelected === 1 ? (
        <>
         <Col className="col-12 d-flex justify-content-between">
        <Col className="col-6 mb-2">
          <div className="form-outline" style={{ marginRight: "10px" }}>
            <Label className="form-label">ABA Routing</Label>
            <Input
              type="text"
              name="aba_routing_WT"
              onChange={validationType.handleChange}
              onBlur={validationType.handleBlur}
              value={validationType.values.aba_routing_WT || ""}
            />
          </div>
        </Col>
        <Col className="col-6 mb-2">
          <div className="form-outline">
            <Label className="form-label">Account Number</Label>
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
