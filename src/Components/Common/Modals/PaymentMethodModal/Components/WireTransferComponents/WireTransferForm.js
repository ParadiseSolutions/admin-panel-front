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

const WireTransferForm = () => {
  return (
    <>
      <Col className="col-5">
        <div className="form-outline mb-2">
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
      <Col className="col-md-2">
        <div className="form-outline mb-2">
          <Label className="form-label">Currency</Label>
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
      <Col className='col-12 d-flex justify-content-between'>
      <Col className="col-6 mb-2">
        <div className="form-outline" style={{marginRight:'10px'}}>
          <Label className="form-label">Bank Name</Label>
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
      <Col className="col-6 mb-2">
        <div className="form-outline">
          <Label className="form-label">SWIFT</Label>
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
      
      </Col>
        <Col className="col-12">
          <div className="form-outline">
            <Label className="form-label">Clabe</Label>
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
       
      
    </>
  );
};

export default WireTransferForm;
