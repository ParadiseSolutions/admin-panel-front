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
          <div className="d-flex justify-content-between">
            <Label className="form-label">Country</Label>
            <div>
              <i className="uil-question-circle font-size-15" id="countryTT" />
              <UncontrolledTooltip
                autohide={true}
                placement="top"
                target="countryTT"
              >
                Select the Country the bank account is located in.
              </UncontrolledTooltip>
            </div>
          </div>
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
          <div className="d-flex justify-content-between">
            <Label className="form-label">Currency</Label>
            <div>
              <i className="uil-question-circle font-size-15" id="currencyTT" />
              <UncontrolledTooltip
                autohide={true}
                placement="top"
                target="currencyTT"
              >
                Select the Currency of the Bank Account.
              </UncontrolledTooltip>
            </div>
          </div>
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
            <div className="d-flex justify-content-between">
              <Label className="form-label">Bank Name</Label>
              <div>
                <i
                  className="uil-question-circle font-size-15"
                  id="banknameTT"
                />
                <UncontrolledTooltip
                  autohide={true}
                  placement="top"
                  target="banknameTT"
                >
                  Name of the Bank that the account is held at.
                </UncontrolledTooltip>
              </div>
            </div>
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
            <div className="d-flex justify-content-between">
              <Label className="form-label">SWIFT</Label>
              <div>
                <i className="uil-question-circle font-size-15" id="swiftTT" />
                <UncontrolledTooltip
                  autohide={true}
                  placement="top"
                  target="swiftTT"
                >
                  The SWIFT Code of the bank. This code will be either 8 digits
                  or 11 digits and all capital letters. The SWIFT is used only
                  for international transactions like wire transfers.
                </UncontrolledTooltip>
              </div>
            </div>
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
              <div className="d-flex justify-content-between">
                <Label className="form-label">CLABE</Label>
                <div>
                  <i
                    className="uil-question-circle font-size-15"
                    id="clabeTT"
                  />
                  <UncontrolledTooltip
                    autohide={true}
                    placement="top"
                    target="clabeTT"
                  >
                    The CLABE number is an 18-digit number used to identify a
                    Mexican bank account. It is required for any type of bank
                    transfer to a Mexican Bank.
                  </UncontrolledTooltip>
                </div>
              </div>
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
                <div className="d-flex justify-content-between">
                  <Label className="form-label">ABA Routing</Label>
                  <div>
                    <i
                      className="uil-question-circle font-size-15"
                      id="abaTT"
                    />
                    <UncontrolledTooltip
                      autohide={true}
                      placement="top"
                      target="abaTT"
                    >
                      Pending Tooltip
                    </UncontrolledTooltip>
                  </div>
                </div>
                <Input
                  type="number"
                  name="aba_routing_WT"
                  onChange={validationType.handleChange}
                  onBlur={validationType.handleBlur}
                  value={validationType.values.aba_routing_WT || ""}
                />
              </div>
            </Col>
            <Col className="col-6 mb-2">
              <div className="form-outline">
                <div className="d-flex justify-content-between">
                  <Label className="form-label">Account Number</Label>
                  <div>
                    <i
                      className="uil-question-circle font-size-15"
                      id="accountNumberTT"
                    />
                    <UncontrolledTooltip
                      autohide={true}
                      placement="top"
                      target="accountNumberTT"
                    >
                      Pending Tooltip
                    </UncontrolledTooltip>
                  </div>
                </div>
                <Input
                  type="number"
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
