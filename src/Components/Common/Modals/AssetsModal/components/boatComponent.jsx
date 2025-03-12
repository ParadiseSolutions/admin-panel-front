// import { createPaymentTypeAPI } from "../../../../Utils/API/Payments";
import { useEffect, useState } from "react";
import { Row, Col, Form, Label, Input, FormFeedback, Button } from "reactstrap";

import { useFormik } from "formik";
import Swal from "sweetalert2";
import {
  getAccesability,
  getBoatLocation,
  getBoatType,
  getMarinaLocation,
  postBoat,
  putBoat,
} from "../../../../../Utils/API/Assets";
import { map } from "lodash";
import { useParams } from "react-router-dom";

const BoatComponent = ({ setMenu, setAssetModal, dataEdit, setDataEdit, resetTable }) => {
  const { id } = useParams();
  const [boatTypeData, setBoatTypeData] = useState([]);
  const [locationData, setLocationData] = useState([]);
  const [boatLocationData, setBoatLocationData] = useState([]);
  const [accesData, setAccessData] = useState([]);
  const [boatTypeSelected, setBoatTypeSelected] = useState(0);
  const [locationSelected, setLocationSelected] = useState(0);
  const [boatLocationSelected, setBoatLocationSelected] = useState(0);
  const [boatSailingSelected, setBoatSailingSelected] = useState(0);
  const [boatShadeSelected, setBoatShadeSelected] = useState(0);
  const [boatACSelected, setBoatACSelected] = useState(0);
  const [boatAccessSelected, setBoatAccessSelected] = useState(0);

  //initial request
  useEffect(() => {
    getBoatType().then((resp) => {
      setBoatTypeData(resp.data.data);
    });
    getBoatLocation().then((resp) => {
      setLocationData(resp.data.data);
    });
    getMarinaLocation().then((resp) => {
      setBoatLocationData(resp.data.data);
    });
    getAccesability().then((resp) => {
      setAccessData(resp.data.data);
    });
  }, []);

  //edit request
  useEffect(() => {
    if (dataEdit) {
      setBoatTypeSelected(dataEdit.type_id);
      setLocationSelected(dataEdit.location_id);
      setBoatLocationSelected(dataEdit.asset_marina_location_id);
      setBoatSailingSelected(dataEdit.sailing);
      setBoatShadeSelected(dataEdit.shade);
      setBoatACSelected(dataEdit.ac);
      setBoatAccessSelected(dataEdit.access_id);
    }
  }, [dataEdit]);

  const validationType = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,
    initialValues: {
      boat_name: dataEdit ? dataEdit.name : "",
      boat_length: dataEdit ? dataEdit.length : "",
      boat_make: dataEdit ? dataEdit.make : "",
      boat_model: dataEdit ? dataEdit.model : "",
      boat_capacity: dataEdit ? dataEdit.capacity : "",
      boat_bathroom: dataEdit ? dataEdit.bathrooms : "",
    },
    // validationSchema: Yup.object().shape({
    //   name: Yup.string().required("Name is required"),
    //   default_label: Yup.string().required("Default Label is required"),
    // }),
    onSubmit: (values) => {
      let data = {
        provider_operator_id: +id,
        asset_id: 1,
        name: values.boat_name,
        type_id: boatTypeSelected,
        length: values.boat_length,
        make: values.boat_make,
        model: values.boat_model,
        location_id: locationSelected,
        asset_marina_location_id: boatLocationSelected,
        capacity: values.boat_capacity,
        sailing: boatSailingSelected,
        bathrooms: values.boat_bathroom,
        shade: boatShadeSelected,
        ac: boatACSelected,
        access_id: boatAccessSelected,
      };

      if (dataEdit) {
        putBoat(dataEdit.id, data)
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
        postBoat(data)
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
  console.log(dataEdit);
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
                    name="boat_name"
                    placeholder=""
                    type="text"
                    onChange={validationType.handleChange}
                    onBlur={validationType.handleBlur}
                    value={validationType.values.boat_name || ""}
                    invalid={
                      validationType.touched.boat_name &&
                      validationType.errors.boat_name
                        ? true
                        : false
                    }
                  />
                  {validationType.touched.boat_name &&
                  validationType.errors.boat_name ? (
                    <FormFeedback type="invalid">
                      {validationType.errors.boat_name}
                    </FormFeedback>
                  ) : null}
                </div>
              </Col>
              <Col className="col-2">
                <Label className="form-label">Type</Label>
                <Input
                  type="select"
                  name=""
                  onChange={(e) => {
                    setBoatTypeSelected(+e.target.value);
                  }}
                  onBlur={validationType.handleBlur}
                  //   value={validationType.values.department || ""}
                >
                  <option value={null}>Select....</option>
                  {map(boatTypeData, (type, index) => {
                    return (
                      <option
                        key={index}
                        value={type.id}
                        selected={
                          dataEdit ? type.id === dataEdit.type_id : false
                        }
                      >
                        {type.name}
                      </option>
                    );
                  })}
                </Input>
              </Col>
              <Col className="col-2">
                <Label className="form-label">Length</Label>
                <div className="input-group">
                  <Input
                    name="boat_length"
                    placeholder=""
                    type="text"
                    onChange={validationType.handleChange}
                    onBlur={validationType.handleBlur}
                    value={validationType.values.boat_length || ""}
                    invalid={
                      validationType.touched.boat_length &&
                      validationType.errors.boat_length
                        ? true
                        : false
                    }
                  />
                  {validationType.touched.boat_length &&
                  validationType.errors.boat_length ? (
                    <FormFeedback type="invalid">
                      {validationType.errors.boat_length}
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
                <div className="form-outline mb-4">
                  <Label className="form-label">Make</Label>
                  <Input
                    name="boat_make"
                    placeholder=""
                    type="text"
                    onChange={validationType.handleChange}
                    onBlur={validationType.handleBlur}
                    value={validationType.values.boat_make || ""}
                    invalid={
                      validationType.touched.boat_make &&
                      validationType.errors.boat_make
                        ? true
                        : false
                    }
                  />
                  {validationType.touched.boat_make &&
                  validationType.errors.boat_make ? (
                    <FormFeedback type="invalid">
                      {validationType.errors.boat_make}
                    </FormFeedback>
                  ) : null}
                </div>
              </Col>
              <Col className="col-2">
                <div className="form-outline mb-4">
                  <Label className="form-label">Model</Label>
                  <Input
                    name="boat_model"
                    placeholder=""
                    type="text"
                    onChange={validationType.handleChange}
                    onBlur={validationType.handleBlur}
                    value={validationType.values.boat_model || ""}
                    invalid={
                      validationType.touched.boat_model &&
                      validationType.errors.boat_model
                        ? true
                        : false
                    }
                  />
                  {validationType.touched.boat_model &&
                  validationType.errors.boat_model ? (
                    <FormFeedback type="invalid">
                      {validationType.errors.boat_model}
                    </FormFeedback>
                  ) : null}
                </div>
              </Col>
              <Col className="col-2">
                <Label className="form-label">Location</Label>
                <Input
                  type="select"
                  name=""
                  onChange={(e) => {
                    setLocationSelected(+e.target.value);
                  }}
                  onBlur={validationType.handleBlur}
                  //   value={validationType.values.department || ""}
                >
                  <option value={null}>Select....</option>
                  {map(locationData, (location, index) => {
                    if (location.active === 0) {
                      return null;
                    }
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
            </Row>
            <Row>
              <Col className="col-4">
                <Label className="form-label">Marina Location</Label>
                <Input
                  type="select"
                  name="price_type"
                  onChange={(e) => {
                    setBoatLocationSelected(+e.target.value);
                  }}
                  onBlur={validationType.handleBlur}
                  //   value={validationType.values.department || ""}
                >
                  <option value={null}>Select....</option>
                  {map(boatLocationData, (location, index) => {
                    if (locationSelected !== location.location_id) {
                      return null;
                    }
                    return (
                      <option
                        key={index}
                        value={location.id}
                        selected={
                          dataEdit
                            ? location.id === dataEdit.asset_marina_location_id
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
                <div className="form-outline mb-4">
                  <Label className="form-label">Capacity</Label>
                  <Input
                    name="boat_capacity"
                    placeholder=""
                    type="number"
                    onChange={validationType.handleChange}
                    onBlur={validationType.handleBlur}
                    value={validationType.values.boat_capacity || ""}
                    invalid={
                      validationType.touched.boat_capacity &&
                      validationType.errors.boat_capacity
                        ? true
                        : false
                    }
                  />
                  {validationType.touched.boat_capacity &&
                  validationType.errors.boat_capacity ? (
                    <FormFeedback type="invalid">
                      {validationType.errors.boat_capacity}
                    </FormFeedback>
                  ) : null}
                </div>
              </Col>
              <Col className="col-1">
                <Label className="form-label">Sailing</Label>
                <Input
                  type="select"
                  name=""
                  onChange={(e) => {
                    setBoatSailingSelected(e.target.value);
                  }}
                  onBlur={validationType.handleBlur}
                  //   value={validationType.values.department || ""}
                >
                  <option value={null}>Select....</option>
                  <option
                    selected={dataEdit ? dataEdit.sailing === "Yes" : false}
                    value={"Yes"}
                  >
                    Yes
                  </option>
                  <option
                    selected={dataEdit ? dataEdit.sailing === "No" : false}
                    value={"No"}
                  >
                    No
                  </option>
                </Input>
              </Col>
              <Col className="col-1">
                <div className="form-outline mb-4">
                  <Label className="form-label">Bathroom</Label>
                  <Input
                    name="boat_bathroom"
                    placeholder=""
                    type="number"
                    onChange={validationType.handleChange}
                    onBlur={validationType.handleBlur}
                    value={validationType.values.boat_bathroom || ""}
                    invalid={
                      validationType.touched.boat_bathroom &&
                      validationType.errors.boat_bathroom
                        ? true
                        : false
                    }
                  />
                  {validationType.touched.boat_bathroom &&
                  validationType.errors.boat_bathroom ? (
                    <FormFeedback type="invalid">
                      {validationType.errors.boat_bathroom}
                    </FormFeedback>
                  ) : null}
                </div>
              </Col>
              <Col className="col-1">
                <Label className="form-label">Shade</Label>
                <Input
                  type="select"
                  name=""
                  onChange={(e) => {
                    setBoatShadeSelected(e.target.value);
                  }}
                  onBlur={validationType.handleBlur}
                  //   value={validationType.values.department || ""}
                >
                  <option value={null}>Select....</option>
                  <option
                    selected={dataEdit ? dataEdit.shade === "Yes" : false}
                    value={"Yes"}
                  >
                    Yes
                  </option>
                  <option
                    selected={dataEdit ? dataEdit.shade === "No" : false}
                    value={"No"}
                  >
                    No
                  </option>
                </Input>
              </Col>
              <Col className="col-1">
                <Label className="form-label">A/C</Label>
                <Input
                  type="select"
                  name=""
                  onChange={(e) => {
                    setBoatACSelected(e.target.value);
                  }}
                  onBlur={validationType.handleBlur}
                  //   value={validationType.values.department || ""}
                >
                  <option value={null}>Select....</option>
                  <option
                    selected={dataEdit ? dataEdit.ac === "Yes" : false}
                    value={"Yes"}
                  >
                    Yes
                  </option>
                  <option
                    selected={dataEdit ? dataEdit.ac === "No" : false}
                    value={"No"}
                  >
                    No
                  </option>
                </Input>
              </Col>
              <Col className="col-1">
                <Label className="form-label">Access.</Label>
                <Input
                  type="select"
                  name=""
                  onChange={(e) => {
                    setBoatAccessSelected(+e.target.value);
                  }}
                  onBlur={validationType.handleBlur}
                  //   value={validationType.values.department || ""}
                >
                  <option value={null}>Select....</option>
                  {map(accesData, (acces, index) => {
                    return (
                      <option
                        key={index}
                        value={acces.id}
                        selected={
                          dataEdit ? dataEdit.access_id === acces.id : false
                        }
                      >
                        {acces.name}
                      </option>
                    );
                  })}
                </Input>
              </Col>
            </Row>
            <Row>
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

export default BoatComponent;
