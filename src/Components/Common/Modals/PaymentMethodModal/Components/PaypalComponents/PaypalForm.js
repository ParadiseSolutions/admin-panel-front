import React from "react";
import { Col, Input, Label, Row, UncontrolledTooltip } from "reactstrap";

const PaypalForm = ({
  validationType,
  extraFeeData,
  setExtraFeeSelected,
  extraFeeSelected,
}) => {
  return (
    <>
      <Col className="col-4">
        <div className="form-outline">
          <div className="d-flex justify-content-between">
            <Label className="form-label">Email</Label>
            <div>
              <i className="uil-question-circle font-size-15" id="emailTT" />
              <UncontrolledTooltip
                autohide={true}
                placement="top"
                target="emailTT"
              >
                Enter the email address associated with the PayPal account.
              </UncontrolledTooltip>
            </div>
          </div>
          <Input
            type="text"
            name="email_PP"
            onChange={validationType.handleChange}
            onBlur={validationType.handleBlur}
            value={validationType.values.email_PP || ""}
          />
        </div>
      </Col>
      <Col className="col-3">
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
            name="extra_fee_PP"
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
              name="amount_PP"
              placeholder=""
              type="number"
              onChange={validationType.handleChange}
              value={validationType.values.amount_PP || ""}
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
        <Col className="col-5">
          <div className="form-outline">
            <div className="d-flex justify-content-between">
              <Label className="form-label">Payment Link</Label>
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
                  If there is a payment link the customer will use to pay, enter
                  it here. This field is optional.
                </UncontrolledTooltip>
              </div>
            </div>
            <Input
              type="text"
              name="payment_link_PP"
              onChange={validationType.handleChange}
              onBlur={validationType.handleBlur}
              value={validationType.values.payment_link_PP || ""}
            />
          </div>
        </Col>
      </Row>
    </>
  );
};

export default PaypalForm;
