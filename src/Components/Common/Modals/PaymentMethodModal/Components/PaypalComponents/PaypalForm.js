import React from "react";
import { Col, FormFeedback, Input, Label, Row, UncontrolledTooltip } from "reactstrap";
import { setDecimalFormatFee } from "../../../../../../Utils/CommonFunctions";

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
              <i className="uil-question-circle font-size-15" id="emailTTPP" />
              <UncontrolledTooltip
                autohide={true}
                placement="top"
                target="emailTTPP"
              >
                Enter the email address associated with the PayPal account.
              </UncontrolledTooltip>
            </div>
          </div>
          <Input
            type="text"
            name="email_PP"
            onChange={validationType.handleChange}
            onBlur={(e) => {
              const value = e.target.value || "";
              validationType.setFieldValue(
                "email_PP",
                value.toLowerCase()
              );
              validationType.handleBlur(e);
            }}
            value={validationType.values.email_PP || ""}
            invalid={
              validationType.touched.email_PP &&
                validationType.errors.email_PP
                ? true
                : false
            }
          />
          {validationType.touched.email_PP &&
            validationType.errors.email_PP ? (
            <FormFeedback type="invalid">
              {validationType.errors.email_PP}
            </FormFeedback>
          ) : null}
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
              <i className="uil-question-circle font-size-15" id="amountTTPP" />
              <UncontrolledTooltip
                autohide={true}
                placement="top"
                target="amountTTPP"
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
              onBlur={(e) => {
                const value = e.target.value || "";
                validationType.setFieldValue(
                  "amount_PP",
                  setDecimalFormatFee(
                    value,
                    extraFeeSelected
                  )
                );
                validationType.handleBlur(e);
              }}
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
              invalid={
                validationType.touched.payment_link_PP &&
                  validationType.errors.payment_link_PP
                  ? true
                  : false
              }
            />
            {validationType.touched.payment_link_PP &&
              validationType.errors.payment_link_PP ? (
              <FormFeedback type="invalid">
                {validationType.errors.payment_link_PP}
              </FormFeedback>
            ) : null}
          </div>
        </Col>
      </Row>
    </>
  );
};

export default PaypalForm;
