import React from "react";
import { Col, Input, Label, Row, UncontrolledTooltip } from "reactstrap";

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
          <div className="d-flex justify-content-between">
            <Label className="form-label">Extra Fee</Label>
            <div>
              <i className="uil-question-circle font-size-15" id="extrafeeTT" />
              <UncontrolledTooltip
                autohide={true}
                placement="top"
                target="extrafeeTT"
              >
                If there is an extra fee charged for accepting a PayPal payment,
                specify if it is a percentage (Add 3.5%) or a Fixed Amount (Add
                $10.00 USD).
              </UncontrolledTooltip>
            </div>
          </div>
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
          <div className="d-flex justify-content-between">
            <Label className="form-label">Amount</Label>
            <div>
              <i className="uil-question-circle font-size-15" id="amountTT" />
              <UncontrolledTooltip
                autohide={true}
                placement="top"
                target="amountTT"
              >
                Enter the Amount of the Extra Fee in either Percentage or
                Currency.
              </UncontrolledTooltip>
            </div>
          </div>
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
          <div className="d-flex justify-content-between">
            <Label className="form-label">Payment Instruction</Label>
            <div>
              <i
                className="uil-question-circle font-size-15"
                id="paymentinstructionTT"
              />
              <UncontrolledTooltip
                autohide={true}
                placement="top"
                target="paymentinstructionTT"
              >
                Select how the payment should be taken by credit card.
              </UncontrolledTooltip>
            </div>
          </div>
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
          <div className="d-flex justify-content-between">
            <Label className="form-label">Phone</Label>
            <div>
              <i className="uil-question-circle font-size-15" id="phoneTT" />
              <UncontrolledTooltip
                autohide={true}
                placement="top"
                target="phoneTT"
              >
                Specify the phone number that should be called to place the
                credit card payment.
              </UncontrolledTooltip>
            </div>
          </div>
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
              <div className="d-flex justify-content-between">
                <Label className="form-label">
                  {paymentInstructionSelected === 2
                    ? "Payment Link"
                    : paymentInstructionSelected === 4
                    ? "From URL"
                    : ""}
                </Label>
                <div>
                  <i
                    className="uil-question-circle font-size-15"
                    id="paymentTT"
                  />
                  <UncontrolledTooltip
                    autohide={true}
                    placement="top"
                    target="paymentTT"
                  >
                    {paymentInstructionSelected === 2
                      ? "Enter the Payment Link you will send to the customer to make the credit card payment."
                      : paymentInstructionSelected === 4
                      ? "Enter a link to the credit card authorization form that the customer will need to fill out and return."
                      : ""}
                  </UncontrolledTooltip>
                </div>
              </div>

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
