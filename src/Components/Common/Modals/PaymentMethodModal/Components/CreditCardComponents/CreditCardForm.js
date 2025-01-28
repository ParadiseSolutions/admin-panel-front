import React from "react";
import { Col, Input, Label, Row } from "reactstrap";

const CreditCardForm = ({
  validationType,
  extraFeeData,
  paymentInstructionData,
  setExtraFeeSelected,
  extraFeeSelected,
  paymentInstructionSelected,
  setPaymentInstructionSelected,
}) => {
  return (
    <>
      <Col className="col-2">
        <div className="form-outline">
          <Label className="form-label">Extra Fee</Label>
          <Input
            type="select"
            name=""
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
              name="amount_CC"
              placeholder=""
              type="text"
              onChange={validationType.handleChange}
              value={validationType.values.amount_CC || ""}
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
      <Col className="col-3">
        <div className="form-outline">
          <Label className="form-label">Payment Instruction</Label>
          <Input
            type="select"
            name=""
            onChange={(e) => {
              setPaymentInstructionSelected(+e.target.value);
            }}
            onBlur={validationType.handleBlur}
            value={paymentInstructionSelected || ""}
          >
            <option value={null}>Select....</option>
            {paymentInstructionData.map((item, index) => (
              <option key={index} value={item.id}>
                {item.name}
              </option>
            ))}
          </Input>
        </div>
      </Col>
      {paymentInstructionSelected === 1 ? (
        <Col className="col-2">
          <Label className="form-label">Phone</Label>
          <div className="input-group">
            <Input
              name="phone_CC"
              placeholder=""
              type="text"
              onChange={validationType.handleChange}
              value={validationType.values.phone_CC || ""}
            />
          </div>
        </Col>
      ) : null}
      {paymentInstructionSelected === 2 || paymentInstructionSelected === 4 ? (
        <Row>
          <Col className="col-5 mt-2">
            <div className="form-outline">
              <Label className="form-label">
                {paymentInstructionSelected === 2
                  ? "Payment Link"
                  : paymentInstructionSelected === 4
                  ? "From URL"
                  : ""}
              </Label>
              <Input
                type="text"
                name="payment_link_CC"
                onChange={validationType.handleChange}
                onBlur={validationType.handleBlur}
                value={validationType.values.payment_link_CC || ""}
              />
            </div>
          </Col>
        </Row>
      ) : null}
    </>
  );
};
export default CreditCardForm;
