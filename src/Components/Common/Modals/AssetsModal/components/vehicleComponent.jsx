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
import { useState, useEffect } from "react";
import {
  getBoatLocation,
  getVehicleSubType,
  getVehicleTransmision,
  getVehicleType,
  postVehicle,
  putVehicle,
} from "../../../../../Utils/API/Assets";
import { map } from "lodash";
import { useParams } from "react-router-dom";
const VehicleComponent = ({
  setMenu,
  setAssetModal,
  dataEdit,
  setDataEdit,
  resetTable,
}) => {
  const { id } = useParams();
  const [vehicleTypeSelected, setVehicleTypeSelected] = useState("");
  const [vehicleTransmisionSelected, setVehicleTransmisionSelected] = useState("");
  const [vehicleLocationSelected, setVehicleLocationSelected] = useState("");
  const [vehicleSubTypeSelected, setVehicleSubTypeSelected] = useState("");
  const [vehicleACSelected, setVehicleACSelected] = useState("");
  const [vehicleTypeData, setVehicleTypeData] = useState([]);
  const [vehicleSubTypeData, setVehicleSubTypeData] = useState([]);
  const [vehicleTransmisionData, setVehicleTransmisionData] = useState([]);
  const [vehicleLocationData, setVehicleLocationData] = useState([]);

  useEffect(() => {
    getVehicleType().then((res) => {
      setVehicleTypeData(
        res.data.data.filter((data) => data.asset_type === "Vehicles")
      );
    });
    getVehicleTransmision().then((res) => {
      setVehicleTransmisionData(res.data.data);
    });
    getBoatLocation().then((resp) => {
      setVehicleLocationData(resp.data.data);
    });
    getVehicleSubType().then((resp) => {
      setVehicleSubTypeData(resp.data.data);
    });
  }, []);

  //edit request
  useEffect(() => {
    if (dataEdit) {
      setVehicleTypeSelected(dataEdit.asset_id);
      setVehicleTransmisionSelected(dataEdit.transmision_id);
      setVehicleLocationSelected(dataEdit.location_id);
      setVehicleACSelected(dataEdit.ac);
      setVehicleSubTypeSelected(dataEdit.type_id);
    }
  }, [dataEdit]);
  console.log(dataEdit);
  const validationType = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,
    initialValues: {
      vehicle_make: dataEdit ? dataEdit.make : "",
      vehicle_model: dataEdit ? dataEdit.model : "",
      vehicle_capacity: dataEdit ? dataEdit.capacity : "",
      vehicle_qty: dataEdit ? dataEdit.quantity : "",
    },
    // validationSchema: Yup.object().shape({
    //   name: Yup.string().required("Name is required"),
    //   default_label: Yup.string().required("Default Label is required"),
    // }),
    onSubmit: (values) => {
      let data = {
        provider_operator_id: +id,
        asset_id: vehicleTypeSelected,
        make: values.vehicle_make,
        model: values.vehicle_model,
        capacity: values.vehicle_capacity,
        quantity: values.vehicle_qty,
        type_id: vehicleSubTypeSelected,
        transmision_id: vehicleTransmisionSelected,
        location_id: vehicleLocationSelected,
        ac: vehicleACSelected,
        max_cap: values.vehicle_qty * values.vehicle_capacity,
      };
      if (dataEdit) {
        putVehicle(dataEdit.id, data)
          .then((resp) => {
            if (resp.data.status === 200) {
              Swal.fire("Edited!", "Asset has been edited.", "success").then(
                () => {
                  setAssetModal(false);
                  resetTable();
                }
              );
            }
          })
          .catch((error) => {
            if (error.response.data.data === null) {
              Swal.fire(
                "Error!",
                // {error.response.},
                String(error.response.data.message)
              );
            } else {
              let errorMessages = [];
              Object.entries(error.response.data.data).map((item) => {
                errorMessages.push(item[1]);
                return true;
              });

              Swal.fire(
                "Error!",
                // {error.response.},
                String(errorMessages[0])
              );
            }
          });
      } else {
        postVehicle(data)
          .then((resp) => {
            if (resp.data.status === 201) {
              Swal.fire("Created!", "Asset has been created.", "success").then(
                () => {
                  setAssetModal(false);
                  resetTable();
                }
              );
            }
          })
          .catch((error) => {
            if (error.response.data.data === null) {
              Swal.fire(
                "Error!",
                // {error.response.},
                String(error.response.data.message)
              );
            } else {
              let errorMessages = [];
              Object.entries(error.response.data.data).map((item) => {
                errorMessages.push(item[1]);
                return true;
              });

              Swal.fire(
                "Error!",
                // {error.response.},
                String(errorMessages[0])
              );
            }
          });
      }
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
                  {map(vehicleTypeData, (type, index) => {
                    return (
                      <option
                        key={index}
                        value={type.id}
                        selected={
                          dataEdit ? type.id === dataEdit.asset_id : false
                        }
                      >
                        {type.name}
                      </option>
                    );
                  })}
                </Input>
              </Col>
              <Col className="col-2">
                <Label className="form-label">Sub-Type</Label>
                <Input
                  type="select"
                  name=""
                  onChange={(e) => {
                    setVehicleSubTypeSelected(+e.target.value);
                  }}
                  onBlur={validationType.handleBlur}
                  //   value={validationType.values.department || ""}
                >
                  <option value={null}>Select....</option>
                  {map(vehicleSubTypeData, (subtype, index) => {
                    return (
                      <option
                        key={index}
                        value={subtype.id}
                        selected={
                          dataEdit ? subtype.id === dataEdit.type_id : false
                        }
                      >
                        {subtype.name}
                      </option>
                    );
                  })}
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
                      validationType.touched.vehicle_make &&
                      validationType.errors.vehicle_make
                        ? true
                        : false
                    }
                  />
                  {validationType.touched.vehicle_make &&
                  validationType.errors.vehicle_make ? (
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
                      validationType.touched.vehicle_model &&
                      validationType.errors.vehicle_model
                        ? true
                        : false
                    }
                  />
                  {validationType.touched.vehicle_model &&
                  validationType.errors.vehicle_model ? (
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
                  {map(vehicleTransmisionData, (trans, index) => {
                    return (
                      <option
                        key={index}
                        value={trans.id}
                        selected={
                          dataEdit
                            ? trans.id === +dataEdit.transmision_id
                            : false
                        }
                      >
                        {trans.name}
                      </option>
                    );
                  })}
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
                      validationType.touched.vehicle_capacity &&
                      validationType.errors.vehicle_capacity
                        ? true
                        : false
                    }
                  />
                  {validationType.touched.vehicle_capacity &&
                  validationType.errors.vehicle_capacity ? (
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
                      validationType.touched.vehicle_qty &&
                      validationType.errors.vehicle_qty
                        ? true
                        : false
                    }
                  />
                  {validationType.touched.vehicle_qty &&
                  validationType.errors.vehicle_qty ? (
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
                  {map(vehicleLocationData, (location, index) => {
                    return (
                      <option
                        key={index}
                        value={location.id}
                        selected={
                          dataEdit
                            ? location.id === dataEdit.location_id
                            : false
                        }
                      >
                        {location.name}
                      </option>
                    );
                  })}
                </Input>
              </Col>
              <Col className="col-1">
                <Label className="form-label">A/C</Label>
                <Input
                  type="select"
                  name=""
                  onChange={(e) => {
                    setVehicleACSelected(e.target.value);
                  }}
                  onBlur={validationType.handleBlur}
                  //   value={validationType.values.department || ""}
                >
                  <option value={null}>Select....</option>
                  <option
                    value={"Yes"}
                    selected={dataEdit ? dataEdit.ac === "Yes" : false}
                  >
                    Yes
                  </option>
                  <option
                    value={"No"}
                    selected={dataEdit ? dataEdit.ac === "No" : false}
                  >
                    No
                  </option>
                </Input>
              </Col>
            </Row>
            <Row className="my-4">
              <Col className="col-6 mx-6 mt-2 d-flex justify-content-start">
                {!dataEdit ? (
                  <Button
                    type="button"
                    color="paradise"
                    outline
                    className="waves-effect waves-light mb-3 btn mx-4"
                    onClick={() => setMenu(0)}
                  >
                    Back
                  </Button>
                ) : null}
              </Col>
              <Col className="col-6 mx-6 mt-2 d-flex justify-content-end">
                <Button
                  type="button"
                  color="paradise"
                  outline
                  className="waves-effect waves-light mb-3 btn mx-4"
                  onClick={() => {
                    setAssetModal(false);
                    setDataEdit(null);
                    setMenu(0);
                  }}
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
