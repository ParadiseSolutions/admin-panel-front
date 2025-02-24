// import { createPaymentTypeAPI } from "../../../../Utils/API/Payments";
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
import Swal from "sweetalert2";

const BoatComponent = ({
  setMenu,
}) => {
  const validationType = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,
    initialValues: {
      name: "",
      default_label: "",
    },
    validationSchema: Yup.object().shape({
      name: Yup.string().required("Name is required"),
      default_label: Yup.string().required("Default Label is required"),
    }),
    onSubmit: (values) => {
      let data = {
        name: values.name,
        default_label: values.default_label,
      };
      // createPaymentTypeAPI(data)
      //   .then((resp) => {
      //     if (resp.data.status === 201) {
      //       Swal.fire(
      //         "Created!",
      //         "Payment Type has been created.",
      //         "success"
      //       ).then(() => {
      //         setPaymentModal(false);
      //       });
      //     }
      //   })
      //   .catch((error) => {
      //     if (error.response.data.data === null) {
      //       Swal.fire(
      //         "Error!",
      //         // {error.response.},
      //         String(error.response.data.message)
      //       );
      //     } else {
      //       let errorMessages = [];
      //       Object.entries(error.response.data.data).map((item) => {
      //         errorMessages.push(item[1]);
      //         return true;
      //       });

      //       Swal.fire(
      //         "Error!",
      //         // {error.response.},
      //         String(errorMessages[0])
      //       );
      //     }
      //   });
    },
  });

  return (
    <>
      <div className="modal-body">
        <Form
          onSubmit={(e) => {
            e.preventDefault();
            validationType.handleSubmit();
            return false;
          }}
          className="custom-validation"
        >
          <Row>
            <Row>
              <Col className="col-2">
                <div className="form-outline mb-4">
                  <Label className="form-label">Boat Name</Label>
                  <Input
                    name="name"
                    placeholder="Deposit"
                    type="text"
                    onChange={validationType.handleChange}
                    onBlur={validationType.handleBlur}
                    value={validationType.values.name || ""}
                    invalid={
                      validationType.touched.name && validationType.errors.name
                        ? true
                        : false
                    }
                  />
                  {validationType.touched.name && validationType.errors.name ? (
                    <FormFeedback type="invalid">
                      {validationType.errors.name}
                    </FormFeedback>
                  ) : null}
                </div>
              </Col>
              <Col className="col-2">
                <Label className="form-label">Type</Label>
                <Input
                  type="select"
                  name="price_type"
                  // onChange={(e) => {
                  //   setPriceTypeSelected(e.target.value);
                  // }}
                  onBlur={validationType.handleBlur}
                  //   value={validationType.values.department || ""}
                >
                  <option value={null}>Select....</option>
                  {/* {map(priceTypeData, (type, index) => {
                    return (
                      <option
                        key={index}
                        value={type.id}
                        selected={
                          dataEdit && dataEdit.pricedetails
                            ? type.id ===
                              dataEdit.pricedetails.filter(
                                (x) => x.pricing_option_id === 10
                              )[0]?.source_id
                            : false
                        }
                      >
                        {type.text}
                      </option>
                    );
                  })} */}
                </Input>
              </Col>
              <Col className="col-2">
                <Label className="form-label">Length</Label>
                <div className="input-group">
                  <Input
                    name="public_price"
                    placeholder=""
                    type="text"
                    onChange={validationType.handleChange}
                    onBlur={validationType.handleBlur}
                    value={validationType.values.public_price || ""}
                    invalid={
                      validationType.touched.public_price &&
                      validationType.errors.public_price
                        ? true
                        : false
                    }
                  />
                  {validationType.touched.public_price &&
                  validationType.errors.public_price ? (
                    <FormFeedback type="invalid">
                      {validationType.errors.public_price}
                    </FormFeedback>
                  ) : null}
                  <span
                    className="input-group-text form-label fw-bold bg-paradise text-white border-0"
                    id="basic-addon1"
                    style={{ fontSize: "0.85em" }}
                  >
                    Feet
                  </span>
                </div>
              </Col>
              <Col className="col-2">
                <Label className="form-label">Make</Label>
                <Input
                  type="select"
                  name="price_type"
                  // onChange={(e) => {
                  //   setPriceTypeSelected(e.target.value);
                  // }}
                  onBlur={validationType.handleBlur}
                  //   value={validationType.values.department || ""}
                >
                  <option value={null}>Select....</option>
                  {/* {map(priceTypeData, (type, index) => {
                    return (
                      <option
                        key={index}
                        value={type.id}
                        selected={
                          dataEdit && dataEdit.pricedetails
                            ? type.id ===
                              dataEdit.pricedetails.filter(
                                (x) => x.pricing_option_id === 10
                              )[0]?.source_id
                            : false
                        }
                      >
                        {type.text}
                      </option>
                    );
                  })} */}
                </Input>
              </Col>
              <Col className="col-2">
                <Label className="form-label">Model</Label>
                <Input
                  type="select"
                  name="price_type"
                  // onChange={(e) => {
                  //   setPriceTypeSelected(e.target.value);
                  // }}
                  onBlur={validationType.handleBlur}
                  //   value={validationType.values.department || ""}
                >
                  <option value={null}>Select....</option>
                  {/* {map(priceTypeData, (type, index) => {
                    return (
                      <option
                        key={index}
                        value={type.id}
                        selected={
                          dataEdit && dataEdit.pricedetails
                            ? type.id ===
                              dataEdit.pricedetails.filter(
                                (x) => x.pricing_option_id === 10
                              )[0]?.source_id
                            : false
                        }
                      >
                        {type.text}
                      </option>
                    );
                  })} */}
                </Input>
              </Col>
              <Col className="col-2">
                <Label className="form-label">Location</Label>
                <Input
                  type="select"
                  name="price_type"
                  // onChange={(e) => {
                  //   setPriceTypeSelected(e.target.value);
                  // }}
                  onBlur={validationType.handleBlur}
                  //   value={validationType.values.department || ""}
                >
                  <option value={null}>Select....</option>
                  {/* {map(priceTypeData, (type, index) => {
                    return (
                      <option
                        key={index}
                        value={type.id}
                        selected={
                          dataEdit && dataEdit.pricedetails
                            ? type.id ===
                              dataEdit.pricedetails.filter(
                                (x) => x.pricing_option_id === 10
                              )[0]?.source_id
                            : false
                        }
                      >
                        {type.text}
                      </option>
                    );
                  })} */}
                </Input>
              </Col>
            </Row>
            <Row>
              <Col className="col-4">
                <Label className="form-label">Boat Location / Marina</Label>
                <Input
                  type="select"
                  name="price_type"
                  // onChange={(e) => {
                  //   setPriceTypeSelected(e.target.value);
                  // }}
                  onBlur={validationType.handleBlur}
                  //   value={validationType.values.department || ""}
                >
                  <option value={null}>Select....</option>
                  {/* {map(priceTypeData, (type, index) => {
                    return (
                      <option
                        key={index}
                        value={type.id}
                        selected={
                          dataEdit && dataEdit.pricedetails
                            ? type.id ===
                              dataEdit.pricedetails.filter(
                                (x) => x.pricing_option_id === 10
                              )[0]?.source_id
                            : false
                        }
                      >
                        {type.text}
                      </option>
                    );
                  })} */}
                </Input>
              </Col>
              <Col className="col-1">
                <div className="form-outline mb-4">
                  <Label className="form-label">Capacity</Label>
                  <Input
                    name="name"
                    placeholder="Deposit"
                    type="text"
                    onChange={validationType.handleChange}
                    onBlur={validationType.handleBlur}
                    value={validationType.values.name || ""}
                    invalid={
                      validationType.touched.name && validationType.errors.name
                        ? true
                        : false
                    }
                  />
                  {validationType.touched.name && validationType.errors.name ? (
                    <FormFeedback type="invalid">
                      {validationType.errors.name}
                    </FormFeedback>
                  ) : null}
                </div>
              </Col>
              <Col className="col-1">
                <Label className="form-label">Sailing</Label>
                <Input
                  type="select"
                  name="price_type"
                  // onChange={(e) => {
                  //   setPriceTypeSelected(e.target.value);
                  // }}
                  onBlur={validationType.handleBlur}
                  //   value={validationType.values.department || ""}
                >
                  <option value={null}>Select....</option>
                  {/* {map(priceTypeData, (type, index) => {
                    return (
                      <option
                        key={index}
                        value={type.id}
                        selected={
                          dataEdit && dataEdit.pricedetails
                            ? type.id ===
                              dataEdit.pricedetails.filter(
                                (x) => x.pricing_option_id === 10
                              )[0]?.source_id
                            : false
                        }
                      >
                        {type.text}
                      </option>
                    );
                  })} */}
                </Input>
              </Col>
              <Col className="col-1">
                <Label className="form-label">Bathrooms</Label>
                <Input
                  type="select"
                  name="price_type"
                  // onChange={(e) => {
                  //   setPriceTypeSelected(e.target.value);
                  // }}
                  onBlur={validationType.handleBlur}
                  //   value={validationType.values.department || ""}
                >
                  <option value={null}>Select....</option>
                  {/* {map(priceTypeData, (type, index) => {
                    return (
                      <option
                        key={index}
                        value={type.id}
                        selected={
                          dataEdit && dataEdit.pricedetails
                            ? type.id ===
                              dataEdit.pricedetails.filter(
                                (x) => x.pricing_option_id === 10
                              )[0]?.source_id
                            : false
                        }
                      >
                        {type.text}
                      </option>
                    );
                  })} */}
                </Input>
              </Col>
              <Col className="col-1">
                <Label className="form-label">Shade</Label>
                <Input
                  type="select"
                  name="price_type"
                  // onChange={(e) => {
                  //   setPriceTypeSelected(e.target.value);
                  // }}
                  onBlur={validationType.handleBlur}
                  //   value={validationType.values.department || ""}
                >
                  <option value={null}>Select....</option>
                  {/* {map(priceTypeData, (type, index) => {
                    return (
                      <option
                        key={index}
                        value={type.id}
                        selected={
                          dataEdit && dataEdit.pricedetails
                            ? type.id ===
                              dataEdit.pricedetails.filter(
                                (x) => x.pricing_option_id === 10
                              )[0]?.source_id
                            : false
                        }
                      >
                        {type.text}
                      </option>
                    );
                  })} */}
                </Input>
              </Col>
              <Col className="col-1">
                <Label className="form-label">A/C</Label>
                <Input
                  type="select"
                  name="price_type"
                  // onChange={(e) => {
                  //   setPriceTypeSelected(e.target.value);
                  // }}
                  onBlur={validationType.handleBlur}
                  //   value={validationType.values.department || ""}
                >
                  <option value={null}>Select....</option>
                  {/* {map(priceTypeData, (type, index) => {
                    return (
                      <option
                        key={index}
                        value={type.id}
                        selected={
                          dataEdit && dataEdit.pricedetails
                            ? type.id ===
                              dataEdit.pricedetails.filter(
                                (x) => x.pricing_option_id === 10
                              )[0]?.source_id
                            : false
                        }
                      >
                        {type.text}
                      </option>
                    );
                  })} */}
                </Input>
              </Col>
              <Col className="col-1">
                <Label className="form-label">Access.</Label>
                <Input
                  type="select"
                  name="price_type"
                  // onChange={(e) => {
                  //   setPriceTypeSelected(e.target.value);
                  // }}
                  onBlur={validationType.handleBlur}
                  //   value={validationType.values.department || ""}
                >
                  <option value={null}>Select....</option>
                  {/* {map(priceTypeData, (type, index) => {
                    return (
                      <option
                        key={index}
                        value={type.id}
                        selected={
                          dataEdit && dataEdit.pricedetails
                            ? type.id ===
                              dataEdit.pricedetails.filter(
                                (x) => x.pricing_option_id === 10
                              )[0]?.source_id
                            : false
                        }
                      >
                        {type.text}
                      </option>
                    );
                  })} */}
                </Input>
              </Col>
            </Row>
            <Row>
              <Col className="col-6 mx-6 mt-2 d-flex justify-content-start">
              <Button
                  type="button"
                  color="paradise"
                  outline
                  className="waves-effect waves-light mb-3 btn mx-4"
                  onClick={() => setMenu(0)}
                >
                  Back
                </Button>
              </Col>
              <Col className="col-6 mx-6 mt-2 d-flex justify-content-end">
                <Button
                  type="button"
                  color="paradise"
                  outline
                  className="waves-effect waves-light mb-3 btn mx-4"
                >
                  
                  Cancel
                </Button>
                <Button
                  type="submit"
                  style={{ backgroundColor: "#F6851F", border: "none" }}
                  className="waves-effect waves-light mb-3 btn btn-success"
                >
                  <i className="mdi mdi-plus me-1" />
                  Submit
                </Button>
              </Col>
            </Row>
          </Row>
        </Form>
      </div>
    </>
  );
};

export default BoatComponent;
