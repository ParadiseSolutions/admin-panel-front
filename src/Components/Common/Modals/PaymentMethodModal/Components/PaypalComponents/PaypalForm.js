import React from 'react'
import { Col, Input, Label } from 'reactstrap';



const PaypalForm = () => {
    return ( 
        <>
        <Col className='col-3 mx-1'>
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
        <Col className='col-3'>
        <div className="form-outline">
            <Label className="form-label">Extra Fee</Label>
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
        <Col className='col-1 mx-1'>
        <div className="form-outline">
            <Label className="form-label">Amount</Label>
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
        <Col className='col-5'>
        <div className="form-outline">
            <Label className="form-label">Payment Link</Label>
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
}
 
export default PaypalForm;