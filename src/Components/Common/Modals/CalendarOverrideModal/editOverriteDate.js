import React, { useEffect, useState } from "react";
import OverriteDateImg from "../../../../Components/Assets/images/overriteDates.png";
import { putOverriteDate } from "../../../../Utils/API/Tours";
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

const EdditOverriteDate = ({
  editOverriteDate,
  setEditOverriteDate,
  editOverriteDateData,
  refresh
}) => {
  //initial data
  const { id } = useParams();
  const [typeSelected, setTypeSelected] = useState(
    editOverriteDateData?.type_id.toString()
  );
  const [repeatSelected, setRepeatSelected] = useState(null);
  const [daySelected, setDaySelected] = useState(+editOverriteDateData?.on);
  const [dayRageFromEdit, setDayRageFromSelected] = useState(null);
  const [dayRagetoEdit, setDayRagetoSelected] = useState(null);
  const [dayWeekfromEdit, setDayWeekFromSelected] = useState(null);
  const [dayWeektoEdit, setDayWeektoSelected] = useState(null);
  const [dayFixEdit, setdayFixSelected] = useState(null);
  const [statusSelected, setStatusSelected] = useState(null)
  // console.log("data inicial", editOverriteDateData);

  useEffect(() => {
    if (editOverriteDateData !== null) {
      setTypeSelected(editOverriteDateData?.type_id.toString());
      setRepeatSelected(editOverriteDateData?.recurrency);
      setDayRageFromSelected(editOverriteDateData?.from);
      setDayRagetoSelected(editOverriteDateData?.to);
      setDaySelected(+editOverriteDateData?.on);
      setDayWeekFromSelected(editOverriteDateData?.from);
      setDayWeektoSelected(editOverriteDateData?.to);
      setdayFixSelected(editOverriteDateData?.from)
      setStatusSelected(editOverriteDate?.action)
    }
  }, [editOverriteDateData]);

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
    enableReinitialize: true,
    initialValues: {
      range_from_date: dayRageFromEdit ? dayRageFromEdit : null,
      range_to_date: dayRagetoEdit ? dayRagetoEdit : null,
      weekdays_from_date: dayWeekfromEdit ? dayWeekfromEdit : null,
      weekdays_to_date: dayWeektoEdit ? dayWeektoEdit : null,
      fixed_date: dayFixEdit ? dayFixEdit : null
    },
    validationSchema: Yup.object().shape({
      // name: Yup.string().required("Name is required"),
    }),

    onSubmit: (values, { resetForm }) => {
      let data = {
        id: editOverriteDateData.id,
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

      // console.log(data);

      putOverriteDate(id, data)
        .then((resp) => {
          if (resp.data.status === 200) {
            Swal.fire("Success!", "Schedule has been edited", "success").then(
              () => {
                setEditOverriteDate(false);
                refresh()
              }
            );
          }
        })
        .catch((error) => {
          let errorMessages = [];
          Object.entries(error.response.data.data).map((item) => {
            errorMessages.push(item[1]);
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
        isOpen={editOverriteDate}
        toggle={() => {
          // onClickAddLocation();
        }}
      >
        <div
          className="modal-header"
          style={{ backgroundColor: "#3DC7F4", border: "none" }}
        >
          <h1 className="modal-title mt-0 text-white">+ Calendar Override</h1>
          <button
            onClick={() => {
              setEditOverriteDate(false);
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
              <Col className="col-6 ">
                <img
                  src={OverriteDateImg}
                  alt="overrite"
                  style={{ width: "350px", height: "370px" }}
                />
              </Col>
              <Col className="col-6">
                <Row>
                  <Col className="col-6">
                    <div className="form-outline mb-4">
                      <Label className="form-label">Type</Label>
                      <Input
                        type="select"
                        name=""
                        onChange={(e) => {
                          setTypeSelected(e.target.value);
                        }}
                        onBlur={validationType.handleBlur}
                      >
                        <option>Select....</option>
                        <option
                          value={"1"}
                          selected={
                            editOverriteDateData &&
                            editOverriteDateData.type_id === 1
                              ? true
                              : false
                          }
                        >
                          Range
                        </option>
                        <option
                          value={"2"}
                          selected={
                            editOverriteDateData &&
                            editOverriteDateData.type_id === 2
                              ? true
                              : false
                          }
                        >
                          Weekdays
                        </option>
                        <option
                          value={"3"}
                          selected={
                            editOverriteDateData &&
                            editOverriteDateData.type_id === 3
                              ? true
                              : false
                          }
                        >
                          Month
                        </option>
                        <option
                          value={"4"}
                          selected={
                            editOverriteDateData &&
                            editOverriteDateData.type_id === 4
                              ? true
                              : false
                          }
                        >
                          Fixed Date
                        </option>
                      </Input>
                    </div>
                  </Col>
                  <Col className="col-6">
                    <div className="form-outline mb-4">
                      <Label className="form-label">Recurrency</Label>
                      <Input
                        type="select"
                        name=""
                        onChange={(e) => {
                          setRepeatSelected(e.target.value);
                        }}
                        onBlur={validationType.handleBlur}
                      >
                        <option>Select....</option>
                        <option
                          value={"1"}
                          selected={
                            editOverriteDateData &&
                            editOverriteDateData.recurrency === "1"
                              ? true
                              : false
                          }
                        >
                          One Time Event
                        </option>
                        <option
                          value={"2"}
                          selected={
                            editOverriteDateData &&
                            editOverriteDateData.recurrency === "2"
                              ? true
                              : false
                          }
                        >
                          Yearly
                        </option>
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
                        <option>Select....</option>
                        <option value={"Available"}
                         selected={
                          editOverriteDateData &&
                          editOverriteDateData.action === 'Available'
                            ? true
                            : false
                        }
                        >Available</option>
                        <option value={"Unavailable"}
                         selected={
                          editOverriteDateData &&
                          editOverriteDateData.action === 'Unavailable'
                            ? true
                            : false
                        }
                        >Unavailable</option>
                       
                      </Input>
                    </div>
                  </Col>
                  
                </Row>
                {typeSelected === "1" ? (
                  <Row>
                    <Col className="col-12">
                      <div className="form-outline my-3">
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
                                validationType.touched.from &&
                                validationType.errors.from
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
                          <option
                            value={0}
                            selected={
                              editOverriteDateData &&
                              +editOverriteDateData.on === 0
                                ? true
                                : false
                            }
                          >
                            Sunday
                          </option>
                          <option
                            value={1}
                            selected={
                              editOverriteDateData &&
                              +editOverriteDateData.on === 1
                                ? true
                                : false
                            }
                          >
                            Monday
                          </option>
                          <option
                            value={2}
                            selected={
                              editOverriteDateData &&
                              +editOverriteDateData.on === 2
                                ? true
                                : false
                            }
                          >
                            Tuesday
                          </option>
                          <option
                            value={3}
                            selected={
                              editOverriteDateData &&
                              +editOverriteDateData.on === 3
                                ? true
                                : false
                            }
                          >
                            Wednesday
                          </option>
                          <option
                            value={4}
                            selected={
                              editOverriteDateData &&
                              +editOverriteDateData.on === 4
                                ? true
                                : false
                            }
                          >
                            Thursday
                          </option>
                          <option
                            value={5}
                            selected={
                              editOverriteDateData &&
                              +editOverriteDateData.on === 5
                                ? true
                                : false
                            }
                          >
                            Friday
                          </option>
                          <option
                            value={6}
                            selected={
                              editOverriteDateData &&
                              +editOverriteDateData.on === 6
                                ? true
                                : false
                            }
                          >
                            Saturday
                          </option>
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
                    <CheckBoxs onAddDay={onAddDay} editOverriteDateData={editOverriteDateData}/>
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
                      style={{ backgroundColor: "#F6851F", border: "none" }}
                      className="waves-effect waves-light btn btn-success"
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

export default EdditOverriteDate;
