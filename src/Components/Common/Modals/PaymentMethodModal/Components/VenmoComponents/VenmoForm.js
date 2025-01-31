import React from 'react'
import { Col, Input, Label, Row } from 'reactstrap';


const VenmoForm = ({
  validationType,
  extraFeeData,
  setExtraFeeSelected,
  extraFeeSelected,
}) => {
  return (
    <>
      <Col className="col-4">
        <div className="form-outline">
          <Label className="form-label">Email</Label>
          <Input
            type="text"
            name="email_venmo"
            onChange={validationType.handleChange}
            onBlur={validationType.handleBlur}
            value={validationType.values.email_venmo || ""}
          />
        </div>
      </Col>
      <Col className="col-3">
        <div className="form-outline">
          <Label className="form-label">Extra Fee</Label>
          <Input
            type="select"
            name="extra_fee_venmo"
            onChange={(e) => {
              setExtraFeeSelected(+e.target.value);
              console.log(+e.target.value);
            }}
            onBlur={validationType.handleBlur}
            value={extraFeeSelected || ""}
          >
            <option value={null}>Select....</option>
            {extraFeeData.map((item, index) => (
              <option key={index} value={item.id}>
                {item.option}
              </option>
            ))}
          </Input>
        </div>
      </Col>
      {extraFeeSelected === 3 || extraFeeSelected === 1 ? (
        <Col className="col-2">
          <Label className="form-label">Amount</Label>
          <div className="input-group">
            {extraFeeSelected === 3 ? (
              <span
                className="input-group-text form-label fw-bold bg-paradise text-white border-0"
                id="basic-addon1"
                style={{ fontSize: "0.85em" }}
              >
                $
              </span>
            ) : null}
            <Input
              name="amount_venmo"
              placeholder=""
              type="text"
              onChange={validationType.handleChange}
              value={validationType.values.amount_venmo || ""}
            />
            {extraFeeSelected === 1 ? (
              <span
                className="input-group-text form-label fw-bold bg-paradise text-white border-0"
                id="basic-addon1"
                style={{ fontSize: "0.85em" }}
              >
                %
              </span>
            ) : null}
          </div>
        </Col>
      ) : null}
      <Row>
      </Row>
    </>
  );
};
export default VenmoForm;