// import { createPaymentTypeAPI } from "../../../../Utils/API/Payments";
import { useEffect, useState } from "react";
import {
  Row,
  Col,
  Form,
  Label,
  Input,
  FormFeedback,
  Button,
  UncontrolledTooltip,
} from "reactstrap";

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

const BoatComponent = ({
  setMenu,
  setAssetModal,
  dataEdit,
  setDataEdit,
  resetTable,
}) => {
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
                  <div className="d-flex justify-content-between">
                    <Label className="form-label">Boat Name</Label>
                    <div>
                      <i
                        className="uil-question-circle font-size-15"
                        id="boat_name"
                      />
                      <UncontrolledTooltip
                        autohide={true}
                        placement="top"
                        target="boat_name"
                      >
                        Type the name of the Boat. Try to find out this
                        information as it is very useful. Sometimes you won't be
                        able to obtain this information in which case you can
                        leave it blank, but try to find it out.
                      </UncontrolledTooltip>
                    </div>
                  </div>
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
                <div className="d-flex justify-content-between">
                  <Label className="form-label">Type</Label>
                  <div>
                    <i
                      className="uil-question-circle font-size-15"
                      id="boat_type"
                    />
                    <UncontrolledTooltip
                      autohide={true}
                      placement="top"
                      target="boat_type"
                    >
                      Choose the type of boat you are defining.
                    </UncontrolledTooltip>
                  </div>
                </div>
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
                <div className="d-flex justify-content-between">
                  <Label className="form-label">Length</Label>
                  <div>
                    <i
                      className="uil-question-circle font-size-15"
                      id="boat_length"
                    />
                    <UncontrolledTooltip
                      autohide={true}
                      placement="top"
                      target="boat_length"
                    >
                      Enter the length of the boat in feet.
                    </UncontrolledTooltip>
                  </div>
                </div>
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
                  <div className="d-flex justify-content-between">
                    <Label className="form-label">Make</Label>
                    <div>
                      <i
                        className="uil-question-circle font-size-15"
                        id="boat_make"
                      />
                      <UncontrolledTooltip
                        autohide={true}
                        placement="top"
                        target="boat_make"
                      >
                        Type the Make of your boat, such as Bertram, Lagoon, or
                        Criss Craft.
                        <br />
                        For example, if you have a Sea Ray Sundancer, then Sea
                        Ray is the Make and Sundancer is the model. If you have
                        a Lagoon 450, then Lagoon is the make and 450 is the
                        model.
                        <br />
                        This is similar to Vehicles, where the Make would be
                        Chevrolet and the Model Suburban.
                      </UncontrolledTooltip>
                    </div>
                  </div>
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
                  <div className="d-flex justify-content-between">
                    <Label className="form-label">Model</Label>
                    <div>
                      <i
                        className="uil-question-circle font-size-15"
                        id="boat_model"
                      />
                      <UncontrolledTooltip
                        autohide={true}
                        placement="top"
                        target="boat_model"
                      >
                        Enter the model of your boat, such as 450, Express, or
                        Sundancer.
                        <br />
                        For example, if the Make is Sea Ray, the Model might be
                        Sundancer. This is similar to Vehicles where the Make
                        might be Toyota while the model might be Corolla or
                        Camry.
                        <br />
                        If you don't know the model of your boat, you can leave
                        this field blank, but fill it if you have it.
                      </UncontrolledTooltip>
                    </div>
                  </div>
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
                <div className="d-flex justify-content-between">
                  <Label className="form-label">Location</Label>
                  <div>
                    <i
                      className="uil-question-circle font-size-15"
                      id="boat_location"
                    />
                    <UncontrolledTooltip
                      autohide={true}
                      placement="top"
                      target="boat_location"
                    >
                      Choose the location of your boat. For example, on Cancun
                      Discounts, you will need to specify if the boat is in
                      Cancun, or Playa del Carmen, or Cozumel. On Puerto
                      Vallarta Tours you will need to specify if the boat is
                      located in Nuevo Vallarta or Puerto Vallarta.
                    </UncontrolledTooltip>
                  </div>
                </div>
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
                <div className="d-flex justify-content-between">
                  <Label className="form-label">Marina Location</Label>
                  <div>
                    <i
                      className="uil-question-circle font-size-15"
                      id="boat_marina"
                    />
                    <UncontrolledTooltip
                      autohide={true}
                      placement="top"
                      target="boat_marina"
                    >
                      Choose what Marina or Beach your Boat is located at. For
                      example, if your boat is in Cozumel, you will need to
                      choose if it is located in Marina Caleta, Puerto Abrigo,
                      or Marina Cozumel.
                    </UncontrolledTooltip>
                  </div>
                </div>
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
                  <div className="d-flex justify-content-between">
                    <Label className="form-label">Capacity</Label>
                    <div>
                      <i
                        className="uil-question-circle font-size-15"
                        id="boat_capacity"
                      />
                      <UncontrolledTooltip
                        autohide={true}
                        placement="top"
                        target="boat_capacity"
                      >
                        How many people can this boat take?
                      </UncontrolledTooltip>
                    </div>
                  </div>
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
                <div className="d-flex justify-content-between">
                  <Label className="form-label">Sailing</Label>
                  <div>
                    <i
                      className="uil-question-circle font-size-15"
                      id="boat_sailing"
                    />
                    <UncontrolledTooltip
                      autohide={true}
                      placement="top"
                      target="boat_sailing"
                    >
                      Does your boat have a sail? Or does it always use only
                      motor power? This would generally apply only to Catamarans
                      and Sailboats. Some Catamarans have sails and others just
                      motor.
                    </UncontrolledTooltip>
                  </div>
                </div>
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
                  <div className="d-flex justify-content-between">
                    <Label className="form-label">Bathroom</Label>
                    <div>
                      <i
                        className="uil-question-circle font-size-15"
                        id="boat_bathroom"
                      />
                      <UncontrolledTooltip
                        autohide={true}
                        placement="top"
                        target="boat_bathroom"
                      >
                        Select how many bathrooms are available on board the
                        boat.
                      </UncontrolledTooltip>
                    </div>
                  </div>
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
                <div className="d-flex justify-content-between">
                  <Label className="form-label">Shade</Label>
                  <div>
                    <i
                      className="uil-question-circle font-size-15"
                      id="boat_shade"
                    />
                    <UncontrolledTooltip
                      autohide={true}
                      placement="top"
                      target="boat_shade"
                    >
                      Is there shade available on board your boat? This is
                      important especially for elderly people.
                    </UncontrolledTooltip>
                  </div>
                </div>
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
                <div className="d-flex justify-content-between">
                  <Label className="form-label">A/C</Label>
                  <div>
                    <i
                      className="uil-question-circle font-size-15"
                      id="boat_ac"
                    />
                    <UncontrolledTooltip
                      autohide={true}
                      placement="top"
                      target="boat_ac"
                    >
                      Does your boat feature an air-conditioned cabin?
                    </UncontrolledTooltip>
                  </div>
                </div>
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
                <div className="d-flex justify-content-between">
                  <Label className="form-label">Access.</Label>
                  <div>
                    <i
                      className="uil-question-circle font-size-15"
                      id="boat_access"
                    />
                    <UncontrolledTooltip
                      autohide={true}
                      placement="top"
                      target="boat_access"
                    >
                      Is your boat wheelchair accessible?
                    </UncontrolledTooltip>
                  </div>
                </div>
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
