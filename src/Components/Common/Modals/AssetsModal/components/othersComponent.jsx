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
  UncontrolledTooltip,
} from "reactstrap";
import * as Yup from "yup";
import { useFormik } from "formik";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";
import {
  getBoatLocation,
  getOthersCategory,
  getVehicleType,
  postOthers,
  putOthers,
} from "../../../../../Utils/API/Assets";
import { map } from "lodash";
import { useParams } from "react-router-dom";
const OthersComponent = ({
  setMenu,
  setAssetModal,
  dataEdit,
  setDataEdit,
  resetTable,
}) => {
  const { id } = useParams();
  const [otherTypeSelected, setOtherTypeSelected] = useState("");
  const [otherCategorySelected, setOtherCategorySelected] = useState("");
  const [locationSelected, setLocationSelected] = useState("");
  const [otherTypeData, setOtherTypeData] = useState([]);
  const [otherCategoryData, setOtherCategoryData] = useState([]);
  const [locationData, setLocationData] = useState([]);

  useEffect(() => {
    getVehicleType().then((res) => {
      setOtherTypeData(
        res.data.data.filter((data) => data.asset_type === "Others")
      );
    });
    getOthersCategory().then((res) => {
      setOtherCategoryData(res.data.data.filter((data) => data.active === 1));
    });
    getBoatLocation().then((resp) => {
      setLocationData(resp.data.data.filter((data) => data.active === 1));
    });
  }, []);

  //edit request
  useEffect(() => {
    if (dataEdit) {
      setOtherTypeSelected(dataEdit.asset_id);
      setOtherCategorySelected(dataEdit.category_id);
      setLocationSelected(dataEdit.location_id);
    }
  }, [dataEdit]);

  const validationType = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,
    initialValues: {
      other_qty: dataEdit ? dataEdit.quantity : "",
      other_cap: dataEdit ? dataEdit.cap_ea : "",
    },
    // validationSchema: Yup.object().shape({
    //   name: Yup.string().required("Name is required"),
    //   default_label: Yup.string().required("Default Label is required"),
    // }),
    onSubmit: (values) => {
      let data = {
        provider_operator_id: +id,
        asset_id: otherTypeSelected,
        category_id: otherCategorySelected,
        location_id: locationSelected,
        quantity: values.other_qty,
        cap_ea: values.other_cap,
        max_cap: values.other_qty * values.other_cap,
      };
      if (dataEdit) {
        putOthers(dataEdit.id, data)
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
        postOthers(data)
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
                      pending
                    </UncontrolledTooltip>
                  </div>
                </div>
                <Input
                  type="select"
                  name="price_type"
                  onChange={(e) => {
                    setOtherTypeSelected(+e.target.value);
                  }}
                  onBlur={validationType.handleBlur}
                  //   value={validationType.values.department || ""}
                >
                  <option value={null}>Select....</option>
                  {map(otherTypeData, (type, index) => {
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
                <div className="d-flex justify-content-between">
                  <Label className="form-label">Category</Label>
                  <div>
                    <i
                      className="uil-question-circle font-size-15"
                      id="boat_category"
                    />
                    <UncontrolledTooltip
                      autohide={true}
                      placement="top"
                      target="boat_category"
                    >
                      pending
                    </UncontrolledTooltip>
                  </div>
                </div>
                <Input
                  type="select"
                  name=""
                  onChange={(e) => {
                    setOtherCategorySelected(+e.target.value);
                  }}
                  onBlur={validationType.handleBlur}
                  //   value={validationType.values.department || ""}
                >
                  <option value={null}>Select....</option>
                  {map(otherCategoryData, (item, index) => {
                    return (
                      <option
                        key={index}
                        value={item.id}
                        selected={
                          dataEdit ? item.id === dataEdit.category_id : false
                        }
                      >
                        {item.name}
                      </option>
                    );
                  })}
                </Input>
              </Col>
              <Col className="col-2">
                <div className="d-flex justify-content-between">
                  <Label className="form-label">Location</Label>
                  <div>
                    <i
                      className="uil-question-circle font-size-15"
                      id="vehicle_location"
                    />
                    <UncontrolledTooltip
                      autohide={true}
                      placement="top"
                      target="vehicle_location"
                    >
                      Where are these vehicles located?
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
                <div className="form-outline mb-4">
                  <div className="d-flex justify-content-between">
                    <Label className="form-label">Qty</Label>
                    <div>
                      <i
                        className="uil-question-circle font-size-15"
                        id="vehicle_qty"
                      />
                      <UncontrolledTooltip
                        autohide={true}
                        placement="top"
                        target="vehicle_qty"
                      >
                        How many of this type of vehicle does the operator have?
                      </UncontrolledTooltip>
                    </div>
                  </div>
                  <Input
                    name="other_qty"
                    placeholder=""
                    type="text"
                    onChange={validationType.handleChange}
                    onBlur={validationType.handleBlur}
                    value={validationType.values.other_qty || ""}
                    invalid={
                      validationType.touched.other_qty &&
                      validationType.errors.other_qty
                        ? true
                        : false
                    }
                  />
                  {validationType.touched.other_qty &&
                  validationType.errors.other_qty ? (
                    <FormFeedback type="invalid">
                      {validationType.errors.other_qty}
                    </FormFeedback>
                  ) : null}
                </div>
              </Col>
              <Col className="col-1">
                <div className="form-outline mb-4">
                  <div className="d-flex justify-content-between">
                    <Label className="form-label">Cap. Ea.</Label>
                    <div>
                      <i
                        className="uil-question-circle font-size-15"
                        id="cap_ea"
                      />
                      <UncontrolledTooltip
                        autohide={true}
                        placement="top"
                        target="cap_ea"
                      >
                        pending
                      </UncontrolledTooltip>
                    </div>
                  </div>
                  <Input
                    name="other_cap"
                    placeholder=""
                    type="text"
                    onChange={validationType.handleChange}
                    onBlur={validationType.handleBlur}
                    value={validationType.values.other_cap || ""}
                    invalid={
                      validationType.touched.other_cap &&
                      validationType.errors.other_cap
                        ? true
                        : false
                    }
                  />
                  {validationType.touched.other_cap &&
                  validationType.errors.other_cap ? (
                    <FormFeedback type="invalid">
                      {validationType.errors.other_cap}
                    </FormFeedback>
                  ) : null}
                </div>
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

export default OthersComponent;
