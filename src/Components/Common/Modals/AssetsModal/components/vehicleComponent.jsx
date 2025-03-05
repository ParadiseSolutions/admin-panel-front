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
import { useState } from "react";

const VehicleComponent = ({
  setMenu,
}) => {
  const [vehicleTypeSelected , setVehicleTypeSelected] = useState("");
  const [vehicleMakeSelected , setVehicleMakeSelected] = useState("");
  const [vehicleModelSelected , setVehicleModelSelected] = useState("");
  const [vehicleTransmisionSelected , setVehicleTransmisionSelected] = useState("");
  const [vehicleLocationSelected , setVehicleLocationSelected]  = useState("");
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
                <Label className="form-label">Type</Label>
                <Input
                  type="select"
                  name=""
                   onChange={(e) => {
                     setVehicleTypeSelected(+e.target.value);
                   }}
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
                <Label className="form-label">Sub-Type</Label>
                <Input
                  type="select"
                  name=""
                   onChange={(e) => {
                     setVehicleTypeSelected(+e.target.value);
                   }}
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
                <div className="form-outline mb-4">
                  <Label className="form-label">Make</Label>
                  <Input
                    name="vehicle_make"
                    placeholder=""
                    type="text"
                    onChange={validationType.handleChange}
                    onBlur={validationType.handleBlur}
                    value={validationType.values.vehicle_make || ""}
                    invalid={
                      validationType.touched.vehicle_make && validationType.errors.vehicle_make
                        ? true
                        : false
                    }
                  />
                  {validationType.touched.vehicle_make && validationType.errors.vehicle_make ? (
                    <FormFeedback type="invalid">
                      {validationType.errors.vehicle_make}
                    </FormFeedback>
                  ) : null}
                </div>
              </Col>
              <Col className="col-2">
                <div className="form-outline mb-4">
                  <Label className="form-label">Model</Label>
                  <Input
                    name="vehicle_model"
                    placeholder=""
                    type="text"
                    onChange={validationType.handleChange}
                    onBlur={validationType.handleBlur}
                    value={validationType.values.vehicle_model || ""}
                    invalid={
                      validationType.touched.vehicle_model && validationType.errors.vehicle_model
                        ? true
                        : false
                    }
                  />
                  {validationType.touched.vehicle_model && validationType.errors.vehicle_model ? (
                    <FormFeedback type="invalid">
                      {validationType.errors.vehicle_model}
                    </FormFeedback>
                  ) : null}
                </div>
              </Col>
              <Col className="col-2">
                <Label className="form-label">Transmision</Label>
                <Input
                  type="select"
                  name=""
                   onChange={(e) => {
                     setVehicleTransmisionSelected(+e.target.value);
                   }}
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
                    name="vehicle_capacity"
                    placeholder=""
                    type="text"
                    onChange={validationType.handleChange}
                    onBlur={validationType.handleBlur}
                    value={validationType.values.vehicle_capacity || ""}
                    invalid={
                      validationType.touched.vehicle_capacity && validationType.errors.vehicle_capacity
                        ? true
                        : false
                    }
                  />
                  {validationType.touched.vehicle_capacity && validationType.errors.vehicle_capacity ? (
                    <FormFeedback type="invalid">
                      {validationType.errors.vehicle_capacity}
                    </FormFeedback>
                  ) : null}
                </div>
              </Col>
              <Col className="col-1">
                <div className="form-outline mb-4">
                  <Label className="form-label">Qty</Label>
                  <Input
                    name="vehicle_qty"
                    placeholder=""
                    type="text"
                    onChange={validationType.handleChange}
                    onBlur={validationType.handleBlur}
                    value={validationType.values.vehicle_qty || ""}
                    invalid={
                      validationType.touched.vehicle_qty && validationType.errors.vehicle_qty
                        ? true
                        : false
                    }
                  />
                  {validationType.touched.vehicle_qty && validationType.errors.vehicle_qty ? (
                    <FormFeedback type="invalid">
                      {validationType.errors.vehicle_qty}
                    </FormFeedback>
                  ) : null}
                </div>
              </Col>
             
            </Row>
            <Row>
            <Col className="col-2">
                <Label className="form-label">Location</Label>
                <Input
                  type="select"
                  name="price_type"
                   onChange={(e) => {
                     setVehicleLocationSelected(+e.target.value);
                   }}
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
                  name=""
                   onChange={(e) => {
                     setVehicleLocationSelected(e.target.value);
                   }}
                  onBlur={validationType.handleBlur}
                  //   value={validationType.values.department || ""}
                >
                  <option value={null}>Select....</option>
                  <option value={"Yes"}>Yes</option>
                  <option value={"No"}>No</option>

                 
                </Input>
              </Col>
            </Row>
            <Row className='my-4'>
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

export default VehicleComponent;
