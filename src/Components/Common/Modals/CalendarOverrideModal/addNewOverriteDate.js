import React, { useState } from "react";
import OverriteDateImg from "../../../../Components/Assets/images/overriteDates.png";
import { postOverriteDate, triggerUpdate } from "../../../../Utils/API/Tours";
import CheckBoxs from "./Components/checkboxs";
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
import { useParams } from "react-router-dom";

const AddNewOverriteDate = ({
  newOverriteDate,
  setNewOverriteDate,
  onClickAddLocation,
  refresh,
}) => {
  //initial data
  const { id } = useParams();
  const [typeSelected, setTypeSelected] = useState(null);
  const [repeatSelected, setRepeatSelected] = useState(null);
  const [daySelected, setDaySelected] = useState(null);
  const [statusSelected, setStatusSelected] = useState(null);
  // console.log(typeSelected);

  //checkbox list
  const [daysList, setDayList] = useState([]);
  const onAddDay = (day) => {
    const selection = +day;
    const selectionFlag = daysList.includes(selection);
    if (!selectionFlag) {
      setDayList([...daysList, +day]);
    }
    if (selectionFlag) {
      setDayList(daysList.filter((ele) => ele !== selection));
    }
  };

  const validationType = useFormik({
    ableReinitialize: true,

    initialValues: {
      // name: "",
    },
    validationSchema: Yup.object().shape({
      // name: Yup.string().required("Name is required"),
    }),

    onSubmit: (values, { resetForm }) => {
      let data = {
        type_id: typeSelected,
        repeat_id: repeatSelected,
        action: statusSelected,
        on: daySelected
          ? daySelected.toString()
          : daysList.length > 0
          ? daysList.toString()
          : "",
        from: values.range_from_date
          ? values.range_from_date
          : values.weekdays_from_date
          ? values.weekdays_from_date
          : values.fixed_date
          ? values.fixed_date
          : null,
        to: values.range_to_date
          ? values.range_to_date
          : values.weekdays_to_date
          ? values.weekdays_to_date
          : null,
        recurrency: repeatSelected,
      };
      postOverriteDate(id, data)
        .then((resp) => {
          if (resp.data.status === 201) {
            triggerUpdate()
            Swal.fire("Success!", "Date has been created", "success").then(
              () => {
                setNewOverriteDate(false);
                refresh();
              }
            );
          }
        })
        .catch((error) => {
          let errorMessages = [];
          Object.entries(error.response.data.data).map((item) => {
            errorMessages.push(item[1]);
            return true
          });

          Swal.fire(
            "Error!",
            // {error.response.},
            String(errorMessages[0])
          );
        });
      resetForm({});
    },
  });
  return (
    <>
      <Modal
        size="lg"
        centered
        isOpen={newOverriteDate}
        toggle={() => {
          onClickAddLocation();
        }}
      >
        <div
          className="modal-header"
          style={{ backgroundColor: "#3DC7F4", border: "none" }}
        >
          <h1 className="modal-title mt-0 text-white">+ Calendar Override</h1>
          <button
            onClick={() => {
              setNewOverriteDate(false);
            }}
            type="button"
            className="close"
            data-dismiss="modal"
            aria-label="Close"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>

        {
          //modal body
        }
        <div className="modal-body p-4">
          <Form
            onSubmit={(e) => {
              e.preventDefault();
              validationType.handleSubmit();
              return false;
            }}
            className="custom-validation"
          >
            <Row className="g-5">
              <Col className="col-5 ">
                <img
                  src={OverriteDateImg}
                  alt="overrite"
                  className="img-fluid"
                />
              </Col>
              <Col className="col-7">
                <Row className="mb-3">
                  <Col className="col-6">
                    <div className="form-outline">
                      <Label className="form-label">Type</Label>
                      <Input
                        type="select"
                        name=""
                        onChange={(e) => {
                          setTypeSelected(e.target.value);
                        }}
                        onBlur={validationType.handleBlur}
                      >
                        <option value="">Select....</option>
                        <option value={"1"}>Range</option>
                        <option value={"2"}>Weekdays</option>
                        <option value={"3"}>Month</option>
                        <option value={"4"}>Fixed Date</option>
                        {/* {map(productsData, (product, index) => {
                        return (
                          <option key={index} value={product.id}>
                            {product.label}
                          </option>
                        );
                      })} */}
                      </Input>
                    </div>
                  </Col>
                  <Col className="col-6">
                    <div className="form-outline">
                      <Label className="form-label">Recurrency</Label>
                      <Input
                        type="select"
                        name=""
                        onChange={(e) => {
                          setRepeatSelected(e.target.value);
                        }}
                        onBlur={validationType.handleBlur}
                      >
                        <option value="">Select....</option>
                        <option value={"1"}>One Time Event</option>
                        <option value={"2"}>Yearly</option>
                      </Input>
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col className="col-6">
                    <div className="form-outline mb-4">
                      <Label className="form-label">Status</Label>
                      <Input
                        type="select"
                        name=""
                        onChange={(e) => {
                          setStatusSelected(e.target.value);
                        }}
                        onBlur={validationType.handleBlur}
                      >
                        <option value="">Select....</option>
                        <option value={"Available"}>Available</option>
                        <option value={"Unavailable"}>Unavailable</option>
                      </Input>
                    </div>
                  </Col>
                </Row>

                {typeSelected === "1" ? (
                  <Row>
                    <Col className="col-12">
                      <div className="form-outline my-4">
                        <div className="d-flex">
                          <div className="input-group">
                            <div className="input-group-text">From</div>
                            <Input
                              name="range_from_date"
                              className="form-control"
                              type="date"
                              // defaultValue="2019-08-19"
                              id="example-date-input"
                              onChange={validationType.handleChange}
                              onBlur={validationType.handleBlur}
                              value={
                                validationType.values.range_from_date || ""
                              }
                              invalid={
                                validationType.touched.range_from_date &&
                                validationType.errors.range_from_date
                                  ? true
                                  : false
                              }
                            />
                            {validationType.touched.range_from_date &&
                            validationType.errors.range_from_date ? (
                              <FormFeedback type="invalid">
                                {validationType.errors.range_from_date}
                              </FormFeedback>
                            ) : null}
                          </div>
                        </div>
                      </div>
                    </Col>
                    <Col className="col-12">
                      <div className="form-outline my-3">
                        <div className="d-flex">
                          <div className="input-group">
                            <div className="input-group-text">To</div>
                            <Input
                              name="range_to_date"
                              className="form-control"
                              type="date"
                              // defaultValue="2019-08-19"
                              id="example-date-input"
                              onChange={validationType.handleChange}
                              onBlur={validationType.handleBlur}
                              value={validationType.values.range_to_date || ""}
                              invalid={
                                validationType.touched.range_to_date &&
                                validationType.errors.range_to_date
                                  ? true
                                  : false
                              }
                            />
                            {validationType.touched.range_to_date &&
                            validationType.errors.range_to_date ? (
                              <FormFeedback type="invalid">
                                {validationType.errors.range_to_date}
                              </FormFeedback>
                            ) : null}
                          </div>
                        </div>
                      </div>
                    </Col>
                  </Row>
                ) : null}
                {typeSelected === "2" ? (
                  <Row>
                    <Col className="col-12">
                      <div className="form-outline mb-4">
                        <Label className="form-label">Choose</Label>
                        <Input
                          type="select"
                          name=""
                          onChange={(e) => {
                            setDaySelected(e.target.value);
                          }}
                          onBlur={validationType.handleBlur}
                        >
                          <option value={0}>Sunday</option>
                          <option value={1}>Monday</option>
                          <option value={2}>Tuesday</option>
                          <option value={3}>Wednesday</option>
                          <option value={4}>Thursday</option>
                          <option value={5}>Friday</option>
                          <option value={6}>Saturday</option>
                        </Input>
                      </div>
                    </Col>
                    <Col className="col-12">
                      <div className="form-outline my-3">
                        <div className="d-flex">
                          <div className="input-group">
                            <div className="input-group-text">From</div>
                            <Input
                              name="weekdays_from_date"
                              className="form-control"
                              type="date"
                              // defaultValue="2019-08-19"
                              id="example-date-input"
                              onChange={validationType.handleChange}
                              onBlur={validationType.handleBlur}
                              value={
                                validationType.values.weekdays_from_date || ""
                              }
                              invalid={
                                validationType.touched.weekdays_from_date &&
                                validationType.errors.weekdays_from_date
                                  ? true
                                  : false
                              }
                            />
                            {validationType.touched.weekdays_from_date &&
                            validationType.errors.weekdays_from_date ? (
                              <FormFeedback type="invalid">
                                {validationType.errors.weekdays_from_date}
                              </FormFeedback>
                            ) : null}
                          </div>
                        </div>
                      </div>
                    </Col>
                    <Col className="col-12">
                      <div className="form-outline my-3">
                        <div className="d-flex">
                          <div className="input-group">
                            <div className="input-group-text">To</div>
                            <Input
                              name="weekdays_to_date"
                              className="form-control"
                              type="date"
                              // defaultValue="2019-08-19"
                              id="example-date-input"
                              onChange={validationType.handleChange}
                              onBlur={validationType.handleBlur}
                              value={
                                validationType.values.weekdays_to_date || ""
                              }
                              invalid={
                                validationType.touched.weekdays_to_date &&
                                validationType.errors.weekdays_to_date
                                  ? true
                                  : false
                              }
                            />
                            {validationType.touched.weekdays_to_date &&
                            validationType.errors.weekdays_to_date ? (
                              <FormFeedback type="invalid">
                                {validationType.errors.weekdays_to_date}
                              </FormFeedback>
                            ) : null}
                          </div>
                        </div>
                      </div>
                    </Col>
                  </Row>
                ) : null}
                {typeSelected === "3" ? (
                  <Row>
                    <CheckBoxs onAddDay={onAddDay} />
                  </Row>
                ) : null}
                {typeSelected === "4" ? (
                  <Row>
                    <Col className="col-12">
                      <div className="form-outline my-3">
                        <div className="d-flex">
                          <div className="input-group">
                            <div className="input-group-text">Date</div>
                            <Input
                              name="fixed_date"
                              className="form-control"
                              type="date"
                              // defaultValue="2019-08-19"
                              id="example-date-input"
                              onChange={validationType.handleChange}
                              onBlur={validationType.handleBlur}
                              value={validationType.values.fixed_date || ""}
                              invalid={
                                validationType.touched.fixed_date &&
                                validationType.errors.fixed_date
                                  ? true
                                  : false
                              }
                            />
                            {validationType.touched.fixed_date &&
                            validationType.errors.fixed_date ? (
                              <FormFeedback type="invalid">
                                {validationType.errors.fixed_date}
                              </FormFeedback>
                            ) : null}
                          </div>
                        </div>
                      </div>
                    </Col>
                  </Row>
                ) : null}

                <Row>
                  <Col className="col-12 mt-2 d-flex justify-content-end">
                    <Button
                      type="submit"
                      className="waves-effect waves-light btn btn-orange"
                    >
                      <i className="mdi mdi-plus me-1" />
                      Submit
                    </Button>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Form>
        </div>
      </Modal>
    </>
  );
};

export default AddNewOverriteDate;
