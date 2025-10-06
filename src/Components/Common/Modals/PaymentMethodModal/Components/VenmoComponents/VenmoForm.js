import React from "react";
import { Col, FormFeedback, Input, Label, Row, UncontrolledTooltip } from "reactstrap";
import { setDecimalFormatFee } from "../../../../../../Utils/CommonFunctions";

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
          <div className="d-flex justify-content-between">
            <Label className="form-label">Email</Label>
            <div>
              <i className="uil-question-circle font-size-15" id="emailTTVE" />
              <UncontrolledTooltip
                autohide={true}
                placement="top"
                target="emailTTVE"
              >
                Enter the email address associated with the Venmo account.
              </UncontrolledTooltip>
            </div>
          </div>
          <Input
            type="text"
            name="email_venmo"
            onChange={validationType.handleChange}
            // onBlur={validationType.handleBlur}
            value={validationType.values.email_venmo || ""}
            onBlur={(e) => {
              const value = e.target.value || "";
              validationType.setFieldValue(
                "email_venmo",
                value.toLowerCase()
              );
              validationType.handleBlur(e);
            }}
            invalid={
              validationType.touched.email_venmo &&
                validationType.errors.email_venmo
                ? true
                : false
            }
          />
          {validationType.touched.email_venmo &&
            validationType.errors.email_venmo ? (
            <FormFeedback type="invalid">
              {validationType.errors.email_venmo}
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
            name="extra_fee_venmo"
            onChange={(e) => {
              setExtraFeeSelected(+e.target.value);
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
              <i className="uil-question-circle font-size-15" id="amountTTVE" />
              <UncontrolledTooltip
                autohide={true}
                placement="top"
                target="amountTTVE"
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
              name="amount_venmo"
              placeholder=""
              type="text"
              onChange={validationType.handleChange}
              value={validationType.values.amount_venmo || ""}
              onBlur={(e) => {
                const value = e.target.value || "";
                validationType.setFieldValue(
                  "amount_venmo",
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
      <Row></Row>
    </>
  );
};
export default VenmoForm;
