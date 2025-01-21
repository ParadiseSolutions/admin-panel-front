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

const WireTransferHolderForm = () => {
  return (
   <>
      <Col className='col-12'>
        <Row>
          <Col className="col-6">
            <div className="form-outline mb-2">
              <Label className="form-label">Name</Label>
              <Input
                type="select"
                name="price_type"
                /* onChange={(e) => {
                            setPaymentTypeSelected(+e.target.value);
                          }} */
                //   onBlur={validationType.handleBlur}
                //   value={validationType.values.department || ""}
              >
                <option value={null}>Select....</option>
                <option value={1}>ACH</option>
                <option value={2}>Credit Card</option>
                <option value={3}>PayPal</option>
                <option value={4}>Western Union</option>
                <option value={5}>Wire Transfer</option>
                <option value={6}>Zelle</option>
                <option value={7}>Venmo</option>
              </Input>
            </div>
          </Col>
          <Col className="col-6">
            <div className="form-outline mb-2">
              <Label className="form-label">Address</Label>
              <Input
                type="select"
                name="price_type"
                /* onChange={(e) => {
                            setPaymentTypeSelected(+e.target.value);
                          }} */
                //   onBlur={validationType.handleBlur}
                //   value={validationType.values.department || ""}
              >
                <option value={null}>Select....</option>
                <option value={1}>ACH</option>
                <option value={2}>Credit Card</option>
                <option value={3}>PayPal</option>
                <option value={4}>Western Union</option>
                <option value={5}>Wire Transfer</option>
                <option value={6}>Zelle</option>
                <option value={7}>Venmo</option>
              </Input>
            </div>
          </Col>
        </Row>
      </Col>
      <Col className='col-12'>
        <Row>
          <Col className="col-4 mb-2">
            <div className="form-outline">
              <Label className="form-label">City</Label>
              <Input
                type="select"
                name="price_type"
                /* onChange={(e) => {
                            setPaymentTypeSelected(+e.target.value);
                          }} */
                //   onBlur={validationType.handleBlur}
                //   value={validationType.values.department || ""}
              >
                <option value={null}>Select....</option>
                <option value={1}>ACH</option>
                <option value={2}>Credit Card</option>
                <option value={3}>PayPal</option>
                <option value={4}>Western Union</option>
                <option value={5}>Wire Transfer</option>
                <option value={6}>Zelle</option>
                <option value={7}>Venmo</option>
              </Input>
            </div>
          </Col>
          <Col className="col-4 mb-2">
            <div className="form-outline">
              <Label className="form-label">State</Label>
              <Input
                type="select"
                name="price_type"
                /* onChange={(e) => {
                            setPaymentTypeSelected(+e.target.value);
                          }} */
                //   onBlur={validationType.handleBlur}
                //   value={validationType.values.department || ""}
              >
                <option value={null}>Select....</option>
                <option value={1}>ACH</option>
                <option value={2}>Credit Card</option>
                <option value={3}>PayPal</option>
                <option value={4}>Western Union</option>
                <option value={5}>Wire Transfer</option>
                <option value={6}>Zelle</option>
                <option value={7}>Venmo</option>
              </Input>
            </div>
          </Col>
          <Col className="col-4 mb-2">
            <div className="form-outline">
              <Label className="form-label">Postal</Label>
              <Input
                type="select"
                name="price_type"
                /* onChange={(e) => {
                            setPaymentTypeSelected(+e.target.value);
                          }} */
                //   onBlur={validationType.handleBlur}
                //   value={validationType.values.department || ""}
              >
                <option value={null}>Select....</option>
                <option value={1}>ACH</option>
                <option value={2}>Credit Card</option>
                <option value={3}>PayPal</option>
                <option value={4}>Western Union</option>
                <option value={5}>Wire Transfer</option>
                <option value={6}>Zelle</option>
                <option value={7}>Venmo</option>
              </Input>
            </div>
          </Col>
          
        </Row>      
      </Col>
        <Col className="col-12">
          <Row>
            <Col className="col-2">
              <div className="form-outline">
                <Label className="form-label">Country</Label>
                <Input
                  type="select"
                  name="price_type"
                  /* onChange={(e) => {
                            setPaymentTypeSelected(+e.target.value);
                          }} */
                  //   onBlur={validationType.handleBlur}
                  //   value={validationType.values.department || ""}
                >
                  <option value={null}>Select....</option>
                  <option value={1}>ACH</option>
                  <option value={2}>Credit Card</option>
                  <option value={3}>PayPal</option>
                  <option value={4}>Western Union</option>
                  <option value={5}>Wire Transfer</option>
                  <option value={6}>Zelle</option>
                  <option value={7}>Venmo</option>
                </Input>
              </div>
            </Col>
            <Col className="col-5">
              <div className="form-outline">
                <Label className="form-label">Phone</Label>
                <Input
                  type="select"
                  name="price_type"
                  /* onChange={(e) => {
                            setPaymentTypeSelected(+e.target.value);
                          }} */
                  //   onBlur={validationType.handleBlur}
                  //   value={validationType.values.department || ""}
                >
                  <option value={null}>Select....</option>
                  <option value={1}>ACH</option>
                  <option value={2}>Credit Card</option>
                  <option value={3}>PayPal</option>
                  <option value={4}>Western Union</option>
                  <option value={5}>Wire Transfer</option>
                  <option value={6}>Zelle</option>
                  <option value={7}>Venmo</option>
                </Input>
              </div>
            </Col>
            <Col className="col-5">
              <div className="form-outline">
                <Label className="form-label">Email</Label>
                <Input
                  type="select"
                  name="price_type"
                  /* onChange={(e) => {
                            setPaymentTypeSelected(+e.target.value);
                          }} */
                  //   onBlur={validationType.handleBlur}
                  //   value={validationType.values.department || ""}
                >
                  <option value={null}>Select....</option>
                  <option value={1}>ACH</option>
                  <option value={2}>Credit Card</option>
                  <option value={3}>PayPal</option>
                  <option value={4}>Western Union</option>
                  <option value={5}>Wire Transfer</option>
                  <option value={6}>Zelle</option>
                  <option value={7}>Venmo</option>
                </Input>
              </div>
            </Col>
          </Row>
        </Col>
      </>
  );
};

export default WireTransferHolderForm;
