import { useEffect, useState } from "react";
import TransportationImage from "../../../Assets/images/transportation.png";
import {
  Row,
  Col,
  Modal,
  Form,
  Label,
  Input,
  FormFeedback,
  Button,
} from "reactstrap";
import * as Yup from "yup";
import { useFormik } from "formik";

const AddNewTransportation = ({ newTransportation, setNewTransportation }) => {
  const validationType = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,
    initialValues: {
      // first_name: userData ? userData.first_name : "",
      // last_name: userData ? userData.last_name : "",
      // email: userData ? userData.email : "",
      // phone_number: userData ? userData.phone_number : '',
      // job_title: userData ? userData.job_title : "",
      // department: userData ? userData.department : "",
    },
    validationSchema: Yup.object().shape({
      first_name: Yup.string().required("First Name is required"),
      last_name: Yup.string().required("Last Name is required"),
      phone_number: Yup.string().required("Phone Number is required"),
    }),
    // onSubmit: (values) => {
    //   let data = {
    //     first_name: values.first_name,
    //     last_name: values.last_name,
    //     phone_number: values.phone_number,
    //     department_id: userData.department_id,
    //     email: userData.email,
    //     role_id: userData.role_id,

    //   };

    //   editUserAPI(userData.id, data).then((resp) =>{
    //     console.log(resp)
    //     setProfileModal(false);
    //   })
    // },
  });
  return (
    <Modal
      centered
      size="xl"
      isOpen={newTransportation}
      toggle={() => {
        // onClickAddNew();
      }}
    >
      <div
        className="modal-header"
        style={{ backgroundColor: "#3DC7F4", border: "none" }}
      >
        <h1 className="modal-title mt-0 text-white">
          + New Product - Transportation
        </h1>
        <button
          onClick={() => {
            setNewTransportation(false);
          }}
          type="button"
          className="close"
          style={{ color: "white" }}
          data-dismiss="modal"
          aria-label="Close"
        >
          <span aria-hidden="true" className="text-white bg-white">
            &times;
          </span>
        </button>
      </div>
      <div className="modal-body">
        <Form
          onSubmit={(e) => {
            e.preventDefault();
            // validationType.handleSubmit();
            return false;
          }}
          className="custom-validation"
        >
          <Row xl={12} className="d-flex">
            <Col className="col-3">
              <img
                src={TransportationImage}
                alt="new-product"
                style={{ height: "770px", width: "260px" }}
              />
            </Col>
            <Col className="col-9">
              <Row className="col-12 d-flex">
                <Col className="col-9">
                  <div className="form-outline mb-4">
                    <Label className="form-label">Product Name</Label>
                    <Input
                      name="first_name"
                      placeholder=""
                      type="text"
                      onChange={validationType.handleChange}
                      onBlur={validationType.handleBlur}
                      value={validationType.values.first_name || ""}
                      invalid={
                        validationType.touched.first_name &&
                        validationType.errors.first_name
                          ? true
                          : false
                      }
                    />
                    {validationType.touched.first_name &&
                    validationType.errors.first_name ? (
                      <FormFeedback type="invalid">
                        {validationType.errors.first_name}
                      </FormFeedback>
                    ) : null}
                  </div>
                </Col>
                <Col className="col-3">
                  <div className="form-outline mb-4">
                    <Label className="form-label">SKU</Label>
                    <Input
                      name="first_name"
                      placeholder=""
                      type="text"
                      onChange={validationType.handleChange}
                      onBlur={validationType.handleBlur}
                      value={validationType.values.first_name || ""}
                      invalid={
                        validationType.touched.first_name &&
                        validationType.errors.first_name
                          ? true
                          : false
                      }
                    />
                    {validationType.touched.first_name &&
                    validationType.errors.first_name ? (
                      <FormFeedback type="invalid">
                        {validationType.errors.first_name}
                      </FormFeedback>
                    ) : null}
                  </div>
                </Col>
              </Row>
              <Row className="d-flex">
                <Col className="col-9 d-flex justify-content-between">
                  <Col className="col-2">
                    <div className="form-outline">
                      <Label className="form-label">Price Type</Label>
                      <Input
                        type="select"
                        name=""
                        // onChange={(e) =>{
                        //   setTourTypeID(e.target.value)
                        // }}
                        onBlur={validationType.handleBlur}
                        //   value={validationType.values.department || ""}
                      >
                        <option>Select....</option>
                        {/* {map(dataTourType, (tourType, index) => {
                                    return (
                                      <option key={index} value={tourType.id} selected={ tourData.type_id === tourType.id ? true : false }>
                                        {tourType.name}
                                      </option>
                                    );
                                  })} */}
                      </Input>
                    </div>
                  </Col>
                  <Col className="col-2">
                    <div className="form-outline">
                      <Label className="form-label">Price Option</Label>
                      <Input
                        type="select"
                        name=""
                        // onChange={(e) =>{
                        //   setTourTypeID(e.target.value)
                        // }}
                        onBlur={validationType.handleBlur}
                        //   value={validationType.values.department || ""}
                      >
                        <option>Select....</option>
                        {/* {map(dataTourType, (tourType, index) => {
                                    return (
                                      <option key={index} value={tourType.id} selected={ tourData.type_id === tourType.id ? true : false }>
                                        {tourType.name}
                                      </option>
                                    );
                                  })} */}
                      </Input>
                    </div>
                  </Col>
                  <Col className="col-2">
                    <div className="form-outline">
                      <Label className="form-label">Collect</Label>
                      <Input
                        type="select"
                        name=""
                        // onChange={(e) =>{
                        //   setTourTypeID(e.target.value)
                        // }}
                        onBlur={validationType.handleBlur}
                        //   value={validationType.values.department || ""}
                      >
                        <option>Select....</option>
                        {/* {map(dataTourType, (tourType, index) => {
                                    return (
                                      <option key={index} value={tourType.id} selected={ tourData.type_id === tourType.id ? true : false }>
                                        {tourType.name}
                                      </option>
                                    );
                                  })} */}
                      </Input>
                    </div>
                  </Col>
                  <Col className="col-2">
                    <div
                      className="form-outline"
                      style={{ marginRight: "20px", marginLeft: "-20px" }}
                    >
                      <Label className="form-label">Season</Label>
                      <Input
                        type="select"
                        name=""
                        // onChange={(e) =>{
                        //   setTourTypeID(e.target.value)
                        // }}
                        onBlur={validationType.handleBlur}
                        //   value={validationType.values.department || ""}
                      >
                        <option>Select....</option>
                        {/* {map(dataTourType, (tourType, index) => {
                                    return (
                                      <option key={index} value={tourType.id} selected={ tourData.type_id === tourType.id ? true : false }>
                                        {tourType.name}
                                      </option>
                                    );
                                  })} */}
                      </Input>
                    </div>
                  </Col>
                </Col>
                <Col className="col-3 d-flex justify-content-between">
                  <Col className="col-6">
                    <Label className="form-label mt-2">Active</Label>
                    <div className="form-check form-switch form-switch-md mx-2">
                      <Input
                        name="notification_email"
                        placeholder=""
                        type="checkbox"
                        className="form-check-input"
                        onChange={validationType.handleChange}
                        onBlur={validationType.handleBlur}
                        value={validationType.values.notification_email || ""}
                        invalid={
                          validationType.touched.notification_email &&
                          validationType.errors.notification_email
                            ? true
                            : false
                        }
                      />
                      {validationType.touched.notification_email &&
                      validationType.errors.notification_email ? (
                        <FormFeedback type="invalid">
                          {validationType.errors.notification_email}
                        </FormFeedback>
                      ) : null}
                    </div>
                  </Col>
                  <Col className="col-6">
                    <Label className="form-label mt-2">Balance Due</Label>
                    <div className="form-check form-switch form-switch-md mx-4">
                      <Input
                        name="notification_email"
                        placeholder=""
                        type="checkbox"
                        className="form-check-input"
                        onChange={validationType.handleChange}
                        onBlur={validationType.handleBlur}
                        value={validationType.values.notification_email || ""}
                        invalid={
                          validationType.touched.notification_email &&
                          validationType.errors.notification_email
                            ? true
                            : false
                        }
                      />
                      {validationType.touched.notification_email &&
                      validationType.errors.notification_email ? (
                        <FormFeedback type="invalid">
                          {validationType.errors.notification_email}
                        </FormFeedback>
                      ) : null}
                    </div>
                  </Col>
                </Col>
              </Row>
              <Row
                className="col-12 p-1 my-2"
                style={{ backgroundColor: "#E9F4FF" }}
              >
                <p
                  className="py-2"
                  style={{
                    fontSize: "20px",
                    fontWeight: "bold",
                    color: "#495057",
                    marginBottom: "0px",
                  }}
                >
                  Transfer Options
                </p>
              </Row>
              <Row className="col-12 d-flex">
                <Col className="col-2">
                  <div className="form-outline mb-2">
                    <Label className="form-label">Transfer Type</Label>
                    <Input
                      type="select"
                      name=""
                      // onChange={(e) =>{
                      //   setTourTypeID(e.target.value)
                      // }}
                      onBlur={validationType.handleBlur}
                      //   value={validationType.values.department || ""}
                    >
                      <option>Select....</option>
                      {/* {map(dataTourType, (tourType, index) => {
                                    return (
                                      <option key={index} value={tourType.id} selected={ tourData.type_id === tourType.id ? true : false }>
                                        {tourType.name}
                                      </option>
                                    );
                                  })} */}
                    </Input>
                  </div>
                </Col>
                <Col className="col-2">
                  <div className="form-outline mb-2">
                    <Label className="form-label">Direction</Label>
                    <Input
                      type="select"
                      name=""
                      // onChange={(e) =>{
                      //   setTourTypeID(e.target.value)
                      // }}
                      onBlur={validationType.handleBlur}
                      //   value={validationType.values.department || ""}
                    >
                      <option>Select....</option>
                      {/* {map(dataTourType, (tourType, index) => {
                                    return (
                                      <option key={index} value={tourType.id} selected={ tourData.type_id === tourType.id ? true : false }>
                                        {tourType.name}
                                      </option>
                                    );
                                  })} */}
                    </Input>
                  </div>
                </Col>
                <Col className="col-2">
                  <div className="form-outline mb-2">
                    <Label className="form-label">Vehicle</Label>
                    <Input
                      type="select"
                      name=""
                      // onChange={(e) =>{
                      //   setTourTypeID(e.target.value)
                      // }}
                      onBlur={validationType.handleBlur}
                      //   value={validationType.values.department || ""}
                    >
                      <option>Select....</option>
                      {/* {map(dataTourType, (tourType, index) => {
                                    return (
                                      <option key={index} value={tourType.id} selected={ tourData.type_id === tourType.id ? true : false }>
                                        {tourType.name}
                                      </option>
                                    );
                                  })} */}
                    </Input>
                  </div>
                </Col>
                <Col className="col-2">
                  <div className="form-outline mb-2">
                    <Label className="form-label">Zone Name</Label>
                    <Input
                      type="select"
                      name=""
                      // onChange={(e) =>{
                      //   setTourTypeID(e.target.value)
                      // }}
                      onBlur={validationType.handleBlur}
                      //   value={validationType.values.department || ""}
                    >
                      <option>Select....</option>
                      {/* {map(dataTourType, (tourType, index) => {
                                    return (
                                      <option key={index} value={tourType.id} selected={ tourData.type_id === tourType.id ? true : false }>
                                        {tourType.name}
                                      </option>
                                    );
                                  })} */}
                    </Input>
                  </div>
                </Col>
                <Col className="col-2">
                  <div className="form-outline mb-2">
                    <Label className="form-label">Min. Pax.</Label>
                    <Input
                      name="first_name"
                      placeholder=""
                      type="text"
                      onChange={validationType.handleChange}
                      onBlur={validationType.handleBlur}
                      value={validationType.values.first_name || ""}
                      invalid={
                        validationType.touched.first_name &&
                        validationType.errors.first_name
                          ? true
                          : false
                      }
                    />
                    {validationType.touched.first_name &&
                    validationType.errors.first_name ? (
                      <FormFeedback type="invalid">
                        {validationType.errors.first_name}
                      </FormFeedback>
                    ) : null}
                  </div>
                </Col>

                <Col className="col-2">
                  <div className="form-outline mb-2">
                    <Label className="form-label">Max. Pax.</Label>
                    <Input
                      name="first_name"
                      placeholder=""
                      type="text"
                      onChange={validationType.handleChange}
                      onBlur={validationType.handleBlur}
                      value={validationType.values.first_name || ""}
                      invalid={
                        validationType.touched.first_name &&
                        validationType.errors.first_name
                          ? true
                          : false
                      }
                    />
                    {validationType.touched.first_name &&
                    validationType.errors.first_name ? (
                      <FormFeedback type="invalid">
                        {validationType.errors.first_name}
                      </FormFeedback>
                    ) : null}
                  </div>
                </Col>
              </Row>
              <Row
                className="col-12 p-1 my-2"
                style={{ backgroundColor: "#FFEFDE" }}
              >
                <p
                  className="py-2"
                  style={{
                    fontSize: "20px",
                    fontWeight: "bold",
                    color: "#495057",
                    marginBottom: "0px",
                  }}
                >
                  Provider Pricing
                </p>
              </Row>
              <Row className="col-12 d-flex">
                <Col className="col-2">
                  <div className="form-outline mb-2">
                    <Label className="form-label">Public Price</Label>
                    <Input
                      name="first_name"
                      placeholder=""
                      type="text"
                      onChange={validationType.handleChange}
                      onBlur={validationType.handleBlur}
                      value={validationType.values.first_name || ""}
                      invalid={
                        validationType.touched.first_name &&
                        validationType.errors.first_name
                          ? true
                          : false
                      }
                    />
                    {validationType.touched.first_name &&
                    validationType.errors.first_name ? (
                      <FormFeedback type="invalid">
                        {validationType.errors.first_name}
                      </FormFeedback>
                    ) : null}
                  </div>
                </Col>
                <Col className="col-2">
                  <div className="form-outline mb-2">
                    <Label className="form-label">Provider Price</Label>
                    <Input
                      name="first_name"
                      placeholder=""
                      type="text"
                      onChange={validationType.handleChange}
                      onBlur={validationType.handleBlur}
                      value={validationType.values.first_name || ""}
                      invalid={
                        validationType.touched.first_name &&
                        validationType.errors.first_name
                          ? true
                          : false
                      }
                    />
                    {validationType.touched.first_name &&
                    validationType.errors.first_name ? (
                      <FormFeedback type="invalid">
                        {validationType.errors.first_name}
                      </FormFeedback>
                    ) : null}
                  </div>
                </Col>
                <Col className="col-2">
                  <div className="form-outline mb-2">
                    <Label className="form-label">Rate %</Label>
                    <Input
                      name="first_name"
                      placeholder=""
                      type="text"
                      onChange={validationType.handleChange}
                      onBlur={validationType.handleBlur}
                      value={validationType.values.first_name || ""}
                      invalid={
                        validationType.touched.first_name &&
                        validationType.errors.first_name
                          ? true
                          : false
                      }
                    />
                    {validationType.touched.first_name &&
                    validationType.errors.first_name ? (
                      <FormFeedback type="invalid">
                        {validationType.errors.first_name}
                      </FormFeedback>
                    ) : null}
                  </div>
                </Col>
                <Col className="col-2">
                  <div className="form-outline mb-2">
                    <Label className="form-label">Net Rate</Label>
                    <Input
                      name="first_name"
                      placeholder=""
                      type="text"
                      onChange={validationType.handleChange}
                      onBlur={validationType.handleBlur}
                      value={validationType.values.first_name || ""}
                      invalid={
                        validationType.touched.first_name &&
                        validationType.errors.first_name
                          ? true
                          : false
                      }
                    />
                    {validationType.touched.first_name &&
                    validationType.errors.first_name ? (
                      <FormFeedback type="invalid">
                        {validationType.errors.first_name}
                      </FormFeedback>
                    ) : null}
                  </div>
                </Col>
                <Col className="col-4">
                  <div className="form-outline mb-2">
                    <Label className="form-label">"Compare At" URL</Label>
                    <Input
                      name="first_name"
                      placeholder=""
                      type="text"
                      onChange={validationType.handleChange}
                      onBlur={validationType.handleBlur}
                      value={validationType.values.first_name || ""}
                      invalid={
                        validationType.touched.first_name &&
                        validationType.errors.first_name
                          ? true
                          : false
                      }
                    />
                    {validationType.touched.first_name &&
                    validationType.errors.first_name ? (
                      <FormFeedback type="invalid">
                        {validationType.errors.first_name}
                      </FormFeedback>
                    ) : null}
                  </div>
                </Col>
              </Row>
              <Row
                className="col-12 p-1 my-2"
                style={{ backgroundColor: "#FFFBC8" }}
              >
                <p
                  className="py-2"
                  style={{
                    fontSize: "20px",
                    fontWeight: "bold",
                    color: "#495057",
                    marginBottom: "0px",
                  }}
                >
                  Our Pricing
                </p>
              </Row>
              <Row className="col-12 d-flex">
                <Col className="col-3">
                  <div className="form-outline mb-2">
                    <Label className="form-label">Ship Price</Label>
                    <Input
                      name="first_name"
                      placeholder=""
                      type="text"
                      onChange={validationType.handleChange}
                      onBlur={validationType.handleBlur}
                      value={validationType.values.first_name || ""}
                      invalid={
                        validationType.touched.first_name &&
                        validationType.errors.first_name
                          ? true
                          : false
                      }
                    />
                    {validationType.touched.first_name &&
                    validationType.errors.first_name ? (
                      <FormFeedback type="invalid">
                        {validationType.errors.first_name}
                      </FormFeedback>
                    ) : null}
                  </div>
                </Col>
                <Col className="col-3">
                  <div className="form-outline mb-2">
                    <Label className="form-label">Compare At</Label>
                    <Input
                      name="first_name"
                      placeholder=""
                      type="text"
                      onChange={validationType.handleChange}
                      onBlur={validationType.handleBlur}
                      value={validationType.values.first_name || ""}
                      invalid={
                        validationType.touched.first_name &&
                        validationType.errors.first_name
                          ? true
                          : false
                      }
                    />
                    {validationType.touched.first_name &&
                    validationType.errors.first_name ? (
                      <FormFeedback type="invalid">
                        {validationType.errors.first_name}
                      </FormFeedback>
                    ) : null}
                  </div>
                </Col>
                <Col className="col-3">
                  <div className="form-outline mb-2">
                    <Label className="form-label">Our Price</Label>
                    <Input
                      name="first_name"
                      placeholder=""
                      type="text"
                      onChange={validationType.handleChange}
                      onBlur={validationType.handleBlur}
                      value={validationType.values.first_name || ""}
                      invalid={
                        validationType.touched.first_name &&
                        validationType.errors.first_name
                          ? true
                          : false
                      }
                    />
                    {validationType.touched.first_name &&
                    validationType.errors.first_name ? (
                      <FormFeedback type="invalid">
                        {validationType.errors.first_name}
                      </FormFeedback>
                    ) : null}
                  </div>
                </Col>
                <Col className="col-3">
                  <div className="form-outline mb-2">
                    <Label className="form-label">You Save</Label>
                    <Input
                      name="first_name"
                      placeholder=""
                      type="text"
                      onChange={validationType.handleChange}
                      onBlur={validationType.handleBlur}
                      value={validationType.values.first_name || ""}
                      invalid={
                        validationType.touched.first_name &&
                        validationType.errors.first_name
                          ? true
                          : false
                      }
                    />
                    {validationType.touched.first_name &&
                    validationType.errors.first_name ? (
                      <FormFeedback type="invalid">
                        {validationType.errors.first_name}
                      </FormFeedback>
                    ) : null}
                  </div>
                </Col>
              </Row>
              <Row className="col-12 d-flex">
                <Col className="col-3">
                  <div className="form-outline mb-2">
                    <Label className="form-label">Eff. Rate</Label>
                    <Input
                      name="first_name"
                      placeholder=""
                      type="text"
                      onChange={validationType.handleChange}
                      onBlur={validationType.handleBlur}
                      value={validationType.values.first_name || ""}
                      invalid={
                        validationType.touched.first_name &&
                        validationType.errors.first_name
                          ? true
                          : false
                      }
                    />
                    {validationType.touched.first_name &&
                    validationType.errors.first_name ? (
                      <FormFeedback type="invalid">
                        {validationType.errors.first_name}
                      </FormFeedback>
                    ) : null}
                  </div>
                </Col>
                <Col className="col-3">
                  <div className="form-outline mb-2">
                    <Label className="form-label">Commission</Label>
                    <Input
                      name="first_name"
                      placeholder=""
                      type="text"
                      onChange={validationType.handleChange}
                      onBlur={validationType.handleBlur}
                      value={validationType.values.first_name || ""}
                      invalid={
                        validationType.touched.first_name &&
                        validationType.errors.first_name
                          ? true
                          : false
                      }
                    />
                    {validationType.touched.first_name &&
                    validationType.errors.first_name ? (
                      <FormFeedback type="invalid">
                        {validationType.errors.first_name}
                      </FormFeedback>
                    ) : null}
                  </div>
                </Col>
                <Col className="col-3">
                  <div className="form-outline mb-2">
                    <Label className="form-label">Deposit</Label>
                    <Input
                      name="first_name"
                      placeholder=""
                      type="text"
                      onChange={validationType.handleChange}
                      onBlur={validationType.handleBlur}
                      value={validationType.values.first_name || ""}
                      invalid={
                        validationType.touched.first_name &&
                        validationType.errors.first_name
                          ? true
                          : false
                      }
                    />
                    {validationType.touched.first_name &&
                    validationType.errors.first_name ? (
                      <FormFeedback type="invalid">
                        {validationType.errors.first_name}
                      </FormFeedback>
                    ) : null}
                  </div>
                </Col>
                <Col className="col-3">
                  <div className="form-outline mb-2">
                    <Label className="form-label">Balance Due</Label>
                    <Input
                      name="first_name"
                      placeholder=""
                      type="text"
                      onChange={validationType.handleChange}
                      onBlur={validationType.handleBlur}
                      value={validationType.values.first_name || ""}
                      invalid={
                        validationType.touched.first_name &&
                        validationType.errors.first_name
                          ? true
                          : false
                      }
                    />
                    {validationType.touched.first_name &&
                    validationType.errors.first_name ? (
                      <FormFeedback type="invalid">
                        {validationType.errors.first_name}
                      </FormFeedback>
                    ) : null}
                  </div>
                </Col>
              </Row>
              <Row xl={12}>
                <Row
                  className="col-12 d-flex justify-content-end mt-4"
                  style={{ paddingRight: "30px" }}
                >
                  <Button
                    color="paradise"
                    outline
                    className="waves-effect waves-light col-2 mx-4"
                    type="button"
                    onClick={() => setNewTransportation(false)}
                  >
                    Close
                  </Button>
                  <Button
                    style={{ backgroundColor: "#F6851F" }}
                    type="submit"
                    className="font-16 btn-block col-2"
                    // onClick={toggleCategory}
                  >
                    Save
                  </Button>
                </Row>
              </Row>
            </Col>
          </Row>
        </Form>
      </div>
    </Modal>
  );
};

export default AddNewTransportation;
