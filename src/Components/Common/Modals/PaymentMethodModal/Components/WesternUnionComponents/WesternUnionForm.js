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

const WesternUnionForm = ({
  validationType,
  countryData,
  currencyData,
  accountTypeData,
  countrySelected,
  setCountrySelected,
  currencySelected,
  setCurrencySelected,
  accountTypeSelected,
  setAccountTypeSelected,
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
      <Col className="col-12">
        <Row>
          <Col className="col-6 mb-2">
            <div className="form-outline">
              <Label className="form-label">Bank Name</Label>
              <Input
                type="text"
                name="bank_name_WU"
                onChange={validationType.handleChange}
                onBlur={validationType.handleBlur}
                value={validationType.values.bank_name_WU || ""}
              />
            </div>
          </Col>
          {countrySelected === 1 ? (
            <Col className="col-6 mb-2">
              <div className="form-outline">
                <Label className="form-label">ABA Routing</Label>
                <Input
                  type="text"
                  name="aba_routing_WU"
                  onChange={validationType.handleChange}
                  onBlur={validationType.handleBlur}
                  value={validationType.values.aba_routing_WU || ""}
                />
              </div>
            </Col>
          ) : (
            <Col className="col-6 mb-2">
              <div className="form-outline">
                <Label className="form-label">Select One</Label>
                <Input
                  type="select"
                  name="price_type"
                  onChange={(e) => {
                    console.log(e.target.value);
                    setAccountTypeSelected(+e.target.value);
                  }}
                  onBlur={validationType.handleBlur}
                  value={accountTypeSelected || ""}
                >
                  <option value={null}>Select....</option>
                  {accountTypeData.map((item, index) => (
                    <option key={index} value={item.account_type_id}>
                      {item.account_type_name}
                    </option>
                  ))}
                </Input>
              </div>
            </Col>
          )}
        </Row>
      </Col>
      {countrySelected === 1 ? (
        <Col className="col-12">
          <div className="form-outline">
            <Label className="form-label">Account Number</Label>
            <Input
              type="text"
              name="account_number_WU"
              onChange={validationType.handleChange}
              onBlur={validationType.handleBlur}
              value={validationType.values.account_number_WU || ""}
            />
          </div>
        </Col>
      ) : null}
      {countrySelected === 2 && accountTypeSelected === 1 ? (
        <Col className="col-12">
          <div className="form-outline">
            <Label className="form-label">Clabe</Label>
            <Input
              type="text"
              name="clabe_WU"
              onChange={validationType.handleChange}
              onBlur={validationType.handleBlur}
              value={validationType.values.clabe_WU || ""}
            />
          </div>
        </Col>
      ) : 
     null
      }
      {countrySelected === 2 && accountTypeSelected === 2 ? (
         <Col className='12'>
          <Row>
            <Col className="col-6">
              <div className="form-outline">
                <Label className="form-label">Debit Card</Label>
                <Input
                  type="text"
                  name="debit_card_WU"
                  onChange={validationType.handleChange}
                  onBlur={validationType.handleBlur}
                  value={validationType.values.debit_card_WU || ""}
                />
              </div>
            </Col>
            <Col className="col-6">
              <div className="form-outline">
                <Label className="form-label">SWIFT</Label>
                <Input
                  type="text"
                  name="swift_WU"
                  onChange={validationType.handleChange}
                  onBlur={validationType.handleBlur}
                  value={validationType.values.swift_WU || ""}
                />
              </div>
            </Col>
          </Row>
        </Col>
      ) : 
     null
      }
    </>
  );
};

export default WesternUnionForm;
