import { useEffect, useState } from "react";
import ScheduleImage from "../../../Assets/images/schedule.png";
import CheckBoxs from "./Components/checkboxs";
import Swal from "sweetalert2";
import {
  getScheduleTypesAPI,
  getPricesPricingAPI,
  postSchedule
} from "../../../../Utils/API/Tours";
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
import { map } from "lodash";
import Switch from "react-switch";
import { useParams } from "react-router-dom";

const AddNewScheduleModal = ({ newSchedule, setNewSchedule, tourData, refresh }) => {
  const { id } = useParams();
  //initial Data
  const [scheduleTypesData, setSchedulesTypesData] = useState([]);
  const [productsData, setProductsData] = useState([]);
  useEffect(() => {
    getScheduleTypesAPI().then((resp) => {
      setSchedulesTypesData(resp.data.data);
    });
  }, [newSchedule]);

  useEffect(() => {
    if (tourData) {
      getPricesPricingAPI(tourData.id).then((resp) => {
        setProductsData(resp.data.data);
      });
    }
  }, [tourData]);

  // type onChange
  const [typeSelected, setTypeSelected] = useState(null);
  const onChangeType = (selectionType) => {
   
    setTypeSelected(selectionType);
  };

  // checkbox list
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

  //switch seasonality
  const Offsymbol = () => {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
          fontSize: 12,
          color: "#fff",
          paddingRight: 2,
        }}
      >
        {" "}
        No
      </div>
    );
  };

  const OnSymbol = () => {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
          fontSize: 12,
          color: "#fff",
          paddingRight: 2,
        }}
      >
        {" "}
        Yes
      </div>
    );
  };
  const [activeDep, setActiveDep] = useState(false);
  // useEffect(() => {
  //   if (tourData?.seasonality) {
  //     setActiveDep(tourData.seasonality === 1 ? true : false);
  //   }
  // }, [tourData]);
  const onChangeActive = (data) => {
    setActiveDep(!activeDep);
  };

  //ids selected
  const [productSelected, setProductSelected] = useState(null);
  const [timeFrameSingleSchedule, setTimeFrameSingleSchedule] = useState("AM");
  const [timeFrameMulti1, setTimeFrameMulti1] = useState('AM')
  const [timeFrameMulti2, setTimeFrameMulti2] = useState('AM')
  const [timeFrameMulti3, setTimeFrameMulti3] = useState('AM')
  const [timeFrameMulti4, setTimeFrameMulti4] = useState('AM')
  const [timeFrameMulti5, setTimeFrameMulti5] = useState('AM')
  const [timeFrameMulti6, setTimeFrameMulti6] = useState('AM')
  const [timeFrameIntervalFrom, setTimeFrameIntervalFrom] = useState('AM')
  const [timeFrameIntervalTo, setTimeFrameIntervalTo] = useState('AM')
  const validationType = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,
    initialValues: {
      start_time_single: '',
      from_intervals: '',
      to_interval:'',
      duration: '',
      from: '',
      to: '',
      first_field_multi: '',
      second_field_multi: '',
      third_field_multi:'',
      fourth_field_multi: '',
      fifth_field_multi: '',
      sixth_field_multi: ''
    },
    // validationSchema: Yup.object().shape({
    //   first_name: Yup.string().required("First Name is required"),
    //   last_name: Yup.string().required("Last Name is required"),
    //   phone_number: Yup.string().required("Phone Number is required"),
    // }),
    onSubmit: (values, { resetForm }) => {
      
      const startTimeSingle = `${values.start_time_single} ${timeFrameSingleSchedule}`;
      const startTimeIntervalsFrom = `${values.from_intervals} ${timeFrameIntervalFrom}`;
      const startTimeIntervalsTo = `${values.to_interval} ${timeFrameIntervalTo}`;
      const daysListString = daysList.toString();
      
      let multiTimesList = []
      if (values.first_field_multi !== '') {
        multiTimesList.push([ ...multiTimesList, `${values.first_field_multi} ${timeFrameMulti1}`])
      }
      if (values.second_field_multi !== '') {
        multiTimesList.push([ ...multiTimesList, `${values.second_field_multi} ${timeFrameMulti1}`])
      }

      let data = {
        type_id: typeSelected,
        detail: multiTimesList.toString(),
        from: values.start_time_single ? startTimeSingle : values.from_intervals ? startTimeIntervalsFrom : '', // cambiarlo despues por una validacion
        to: values.to_interval ? startTimeIntervalsTo : '',
        runs: daysListString,
        temporary_schedule: activeDep === true ? 1 : 0,
        from_date: values.from_date,
        to_date: values.to_date,
        units: "Hours",
        duration: values.duration ? values.duration : "",
        price_id: productSelected,
      };

      
      postSchedule(id, data).then((resp) => {
        if (resp.data.status === 201) {
          Swal.fire("Success!", "Schedule has been created", "success").then(
            () => {
              setNewSchedule(false)
              refresh()
            }
          );
        }
      })
      .catch((error) => {
        let errorMessages = [];
        Object.entries(error.response.data.data).map((item) => {
          return errorMessages.push(item[1]);
        });

        Swal.fire(
          "Error!",
          // {error.response.},
          String(errorMessages[0])
        );
      });

      resetForm({ values: "" });
    },
  });
  return (
    <Modal
      centered
      size="xl"
      isOpen={newSchedule}
      toggle={() => {
        // onClickAddNew();
      }}
    >
      <Form
        onSubmit={(e) => {
          e.preventDefault();
          validationType.handleSubmit();
          return false;
        }}
        className="custom-validation"
      >
      <div
        className="modal-header"
        style={{ backgroundColor: "#3DC7F4", border: "none" }}
      >
        <h1 className="modal-title mt-0 text-white">+ New Schedule Entry</h1>
        <button
          onClick={() => {
            setNewSchedule(false);
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
          <Row xl={12} className="d-flex">
            <Col className="col-3">
              <img
                src={ScheduleImage}
                alt="new-product"
                // style={{ height: "590px", width: "260px" }}
              />
            </Col>
            <Col className="col-9">
              <Row className="">
                <Col>
                  <div className="form-outline">
                    <Label className="form-label">Products</Label>
                    <Input
                      type="select"
                      name=""
                      onChange={(e) => {
                        setProductSelected(e.target.value);
                      }}
                      onBlur={validationType.handleBlur}
                    >
                      <option>Select....</option>
                      {map(productsData, (product, index) => {
                        return (
                          <option key={index} value={product.id}>
                            {product.label}
                          </option>
                        );
                      })}
                    </Input>
                  </div>
                </Col>
              </Row>
              <Row className="mt-4 d-flex">
                <Col className="col-3">
                  <div className="form-outline">
                    <Label className="form-label">Type</Label>
                    <Input
                      type="select"
                      name=""
                      onChange={(e) => {
                        onChangeType(e.target.value);
                      }}
                      onBlur={validationType.handleBlur}
                    >
                      <option>Select....</option>
                      {map(scheduleTypesData, (type, index) => {
                        return (
                          <option key={index} value={type.id}>
                            {type.name}
                          </option>
                        );
                      })}
                    </Input>
                  </div>
                </Col>

                <Col className="col-9">
                  <Row className="d-flex">
                    {typeSelected && typeSelected === "4" ? (
                      <>
                        <Col className="col-4">
                          <Label className="form-label">Start Time</Label>
                          <div className="input-group">
                            <Input
                              name="start_time_single"
                              className="form-control"
                              type="text"
                              onChange={validationType.handleChange}
                              onBlur={validationType.handleBlur}
                              value={
                                validationType.values.start_time_single || ""
                              }
                              invalid={
                                validationType.touched.start_time_single &&
                                validationType.errors.start_time_single
                                  ? true
                                  : false
                              }
                            />
                            {validationType.touched.start_time_single &&
                            validationType.errors.start_time_single ? (
                              <FormFeedback type="invalid">
                                {validationType.errors.start_time_single}
                              </FormFeedback>
                            ) : null}
                            <Input
                              type="select"
                              name=""
                              onChange={(e) => {
                                setTimeFrameSingleSchedule(e.target.value);
                              }}
                              onBlur={validationType.handleBlur}
                            >
                              <option value={"AM"}>AM</option>
                              <option value={"PM"}>PM</option>
                            </Input>
                          </div>
                        </Col>
                        <Col className="col-4 ">
                          <Label className="form-label">Time Unit</Label>
                          <div className="form-outline">
                            <Input
                              type="select"
                              name=""
                              // onChange={(e) => {
                              //   onChangeType(e.target.value);
                              // }}
                              onBlur={validationType.handleBlur}
                            >
                              <option>Hours</option>
                              <option>Minutes</option>
                            </Input>
                          </div>
                        </Col>
                        <Col className="col-4 ">
                          <Label className="form-label">Duration</Label>
                          <div className="form-outline">
                            <Input
                              name="duration"
                              className="form-control"
                              type="text"
                              onChange={validationType.handleChange}
                              onBlur={validationType.handleBlur}
                              value={validationType.values.duration || ""}
                              invalid={
                                validationType.touched.duration &&
                                validationType.errors.duration
                                  ? true
                                  : false
                              }
                            />
                            {validationType.touched.duration &&
                            validationType.errors.duration ? (
                              <FormFeedback type="invalid">
                                {validationType.errors.duration}
                              </FormFeedback>
                            ) : null}
                          </div>
                        </Col>
                      </>
                    ) : null}
                    
                    {typeSelected && typeSelected === "6" ? (
                      <>
                        <Col className="col-4 ">
                          <Label className="form-label">Time Unit</Label>
                          <div className="form-outline">
                            <Input
                              type="select"
                              name=""
                              onChange={(e) => {
                                onChangeType(e.target.value);
                              }}
                              onBlur={validationType.handleBlur}
                            >
                              <option>Hours</option>
                              <option>Minutes</option>
                            </Input>
                          </div>
                        </Col>
                        <Col className="col-4 ">
                          <Label className="form-label">Duration</Label>
                          <div className="form-outline">
                            <Input
                              name="duration"
                              className="form-control"
                              type="text"
                              onChange={validationType.handleChange}
                              onBlur={validationType.handleBlur}
                              value={validationType.values.duration || ""}
                              invalid={
                                validationType.touched.duration &&
                                validationType.errors.duration
                                  ? true
                                  : false
                              }
                            />
                            {validationType.touched.duration &&
                            validationType.errors.duration ? (
                              <FormFeedback type="invalid">
                                {validationType.errors.duration}
                              </FormFeedback>
                            ) : null}
                          </div>
                        </Col>
                      </>
                    ) : null}
                  </Row>
                </Col>

                {typeSelected && typeSelected === "6" ? (
                  <Row className="d-flex">
                    <div className="col-4 d-flex mt-5">
                      <div className="input-group">
                        <div className="input-group-text">From</div>
                        <Input
                          name="from_intervals"
                          className="form-control"
                          type="text"
                          onChange={validationType.handleChange}
                          onBlur={validationType.handleBlur}
                          value={validationType.values.from_intervals || ""}
                          invalid={
                            validationType.touched.from_intervals &&
                            validationType.errors.from_intervals
                              ? true
                              : false
                          }
                        />
                        {validationType.touched.from_intervals &&
                        validationType.errors.from_intervals ? (
                          <FormFeedback type="invalid">
                            {validationType.errors.from_intervals}
                          </FormFeedback>
                        ) : null}
                        <Input
                          type="select"
                          name=""
                          onChange={(e) => setTimeFrameIntervalFrom(e.target.value)}
                          onBlur={validationType.handleBlur}
                          // value={validationType.values.start_time || ""}
                        >
                          <option value={'AM'}>AM</option>
                          <option value={'PM'}>PM</option>
                        </Input>
                      </div>
                    </div>
                    <div className="col-4 d-flex mt-5">
                      <div className="input-group">
                        <div className="input-group-text">To</div>
                        
                        <Input
                          name="to_interval"
                          className="form-control"
                          type="text"
                          onChange={validationType.handleChange}
                          onBlur={validationType.handleBlur}
                          value={validationType.values.to_interval || ""}
                          invalid={
                            validationType.touched.to_interval &&
                            validationType.errors.to_interval
                              ? true
                              : false
                          }
                        />
                        {validationType.touched.to_interval &&
                        validationType.errors.to_interval ? (
                          <FormFeedback type="invalid">
                            {validationType.errors.to_interval}
                          </FormFeedback>
                        ) : null}
                        <Input
                          type="select"
                          name=""
                          onChange={(e) => setTimeFrameIntervalTo(e.target.value)}
                          onBlur={validationType.handleBlur}
                          // value={validationType.values.start_time || ""}
                        >
                          <option value={'AM'}>AM</option>
                          <option value={'PM'}>PM</option>
                        </Input>
                      </div>
                    </div>
                  </Row>
                ) : null}

                {typeSelected && typeSelected === "3" ? (
                  <Col className="col-12 mt-3">
                    <div className="mt-4">
                      <Row>
                        <div className="col-4 d-flex">
                          <div className="input-group">
                            <div className="input-group-text">1</div>
                            <Input
                              name="first_field_multi"
                              className="form-control"
                              type="text"
                              onChange={validationType.handleChange}
                              onBlur={validationType.handleBlur}
                              value={validationType.values.first_field_multi || ""}
                              invalid={
                                validationType.touched.first_field_multi &&
                                validationType.errors.first_field_multi
                                  ? true
                                  : false
                              }
                            />
                            {validationType.touched.first_field_multi &&
                            validationType.errors.first_field_multi ? (
                              <FormFeedback type="invalid">
                                {validationType.errors.first_field_multi}
                              </FormFeedback>
                            ) : null}
                            <Input
                              type="select"
                              name=""
                              onChange={(e) => setTimeFrameMulti1(e.target.value)}
                              onBlur={validationType.handleBlur}
                              // value={validationType.values.start_time || ""}
                            >
                              <option value={'AM'}>AM</option>
                              <option value={'PM'}>PM</option>
                            </Input>
                          </div>
                        </div>
                        <div className="col-4 d-flex">
                          <div className="input-group">
                            <div className="input-group-text">2</div>
                            <Input
                              name="second_field_multi"
                              className="form-control"
                              type="text"
                              onChange={validationType.handleChange}
                              onBlur={validationType.handleBlur}
                              value={validationType.values.second_field_multi || ""}
                              invalid={
                                validationType.touched.second_field_multi &&
                                validationType.errors.second_field_multi
                                  ? true
                                  : false
                              }
                            />
                            {validationType.touched.second_field_multi &&
                            validationType.errors.second_field_multi ? (
                              <FormFeedback type="invalid">
                                {validationType.errors.second_field_multi}
                              </FormFeedback>
                            ) : null}
                            <Input
                              type="select"
                              name=""
                              onChange={(e) => setTimeFrameMulti2(e.target.value)}
                              onBlur={validationType.handleBlur}
                              // value={validationType.values.start_time || ""}
                            >
                              <option value={'AM'}>AM</option>
                              <option value={'PM'}>PM</option>
                            </Input>
                          </div>
                        </div>
                        <div className="col-4 d-flex">
                          <div className="input-group">
                            <div className="input-group-text">3</div>
                            <Input
                              name="third_field_multi"
                              className="form-control"
                              type="text"
                              onChange={validationType.handleChange}
                              onBlur={validationType.handleBlur}
                              value={validationType.values.third_field_multi || ""}
                              invalid={
                                validationType.touched.third_field_multi &&
                                validationType.errors.third_field_multi
                                  ? true
                                  : false
                              }
                            />
                            {validationType.touched.third_field_multi &&
                            validationType.errors.third_field_multi ? (
                              <FormFeedback type="invalid">
                                {validationType.errors.third_field_multi}
                              </FormFeedback>
                            ) : null}
                            <Input
                              type="select"
                              name=""
                              onChange={(e) => setTimeFrameMulti3(e.target.value)}
                              onBlur={validationType.handleBlur}
                              // value={validationType.values.start_time || ""}
                            >
                              <option value={'AM'}>AM</option>
                              <option value={'PM'}>PM</option>
                            </Input>
                          </div>
                        </div>
                      </Row>
                      <Row className="mt-4">
                        <div className="col-4 d-flex">
                          <div className="input-group">
                            <div className="input-group-text">4</div>
                            <Input
                              name="fourth_field_multi"
                              className="form-control"
                              type="text"
                              onChange={validationType.handleChange}
                              onBlur={validationType.handleBlur}
                              value={validationType.values.fourth_field_multi || ""}
                              invalid={
                                validationType.touched.fourth_field_multi &&
                                validationType.errors.fourth_field_multi
                                  ? true
                                  : false
                              }
                            />
                            {validationType.touched.fourth_field_multi &&
                            validationType.errors.fourth_field_multi ? (
                              <FormFeedback type="invalid">
                                {validationType.errors.fourth_field_multi}
                              </FormFeedback>
                            ) : null}
                            <Input
                              type="select"
                              name=""
                              onChange={(e) => setTimeFrameMulti4(e.target.value)}
                              onBlur={validationType.handleBlur}
                              // value={validationType.values.start_time || ""}
                            >
                              <option value={'AM'}>AM</option>
                              <option value={'PM'}>PM</option>
                            </Input>
                          </div>
                        </div>
                        <div className="col-4 d-flex">
                          <div className="input-group">
                            <div className="input-group-text">5</div>
                            <Input
                              name="fifth_field_multi"
                              className="form-control"
                              type="text"
                              onChange={validationType.handleChange}
                              onBlur={validationType.handleBlur}
                              value={validationType.values.fifth_field_multi || ""}
                              invalid={
                                validationType.touched.fifth_field_multi &&
                                validationType.errors.fifth_field_multi
                                  ? true
                                  : false
                              }
                            />
                            {validationType.touched.fifth_field_multi &&
                            validationType.errors.fifth_field_multi ? (
                              <FormFeedback type="invalid">
                                {validationType.errors.fifth_field_multi}
                              </FormFeedback>
                            ) : null}
                            <Input
                              type="select"
                              name=""
                              onChange={(e) => setTimeFrameMulti5(e.target.value)}
                              onBlur={validationType.handleBlur}
                              // value={validationType.values.start_time || ""}
                            >
                              <option value={'AM'}>AM</option>
                              <option value={'PM'}>PM</option>
                            </Input>
                          </div>
                        </div>
                        <div className="col-4 d-flex">
                          <div className="input-group">
                            <div className="input-group-text">6</div>
                            <Input
                              name="sixth_field_multi"
                              className="form-control"
                              type="text"
                              onChange={validationType.handleChange}
                              onBlur={validationType.handleBlur}
                              value={validationType.values.sixth_field_multi || ""}
                              invalid={
                                validationType.touched.sixth_field_multi &&
                                validationType.errors.sixth_field_multi
                                  ? true
                                  : false
                              }
                            />
                            {validationType.touched.sixth_field_multi &&
                            validationType.errors.sixth_field_multi ? (
                              <FormFeedback type="invalid">
                                {validationType.errors.sixth_field_multi}
                              </FormFeedback>
                            ) : null}
                            <Input
                              type="select"
                              name=""
                              onChange={(e) => setTimeFrameMulti6(e.target.value)}
                              onBlur={validationType.handleBlur}
                              // value={validationType.values.start_time || ""}
                            >
                              <option value={'AM'}>AM</option>
                              <option value={'PM'}>PM</option>
                            </Input>
                          </div>
                        </div>
                      </Row>
                    </div>
                  </Col>
                ) : null}
                {typeSelected &&
                (typeSelected === "4" ||
                  typeSelected === "3" ||
                  typeSelected === "6") ? (
                  <Col className="col-12 mt-3">
                    <CheckBoxs onAddDay={onAddDay} />
                  </Col>
                ) : null}

                <Col className="col-9 mt-3">
                  <Row className="">
                    <div className="form-check form-switch form-switch-md mt-1">
                      <Label className="form-label mt-2 ">
                        Temporary Schedule
                      </Label>
                      <Switch
                        className="mx-4"
                        uncheckedIcon={<Offsymbol />}
                        checkedIcon={<OnSymbol />}
                        onColor="#3DC7F4"
                        onChange={(e) => onChangeActive(e)}
                        checked={activeDep}
                      />
                    </div>
                  </Row>
                </Col>
              </Row>

              <Row className="col-9">
                <Col className="col-6">
                  <div className="form-outline my-3">
                    <div className="d-flex">
                      <div className="input-group">
                        <div className="input-group-text">From</div>
                        <Input
                          name="from_date"
                          className="form-control"
                          type="date"
                          // defaultValue="2019-08-19"
                          id="example-date-input"
                          onChange={validationType.handleChange}
                          onBlur={validationType.handleBlur}
                          value={validationType.values.from_date || ""}
                          invalid={
                            validationType.touched.from_date &&
                            validationType.errors.from_date
                              ? true
                              : false
                          }
                        />
                        {validationType.touched.from_date &&
                        validationType.errors.from_date ? (
                          <FormFeedback type="invalid">
                            {validationType.errors.from_date}
                          </FormFeedback>
                        ) : null}
                      </div>
                    </div>
                  </div>
                </Col>
                <Col className="col-6">
                  <div className="form-outline my-3">
                    <div className="d-flex">
                      <div className="input-group">
                        <div className="input-group-text">To</div>
                        <Input
                          name="to_date"
                          className="form-control"
                          type="date"
                          // defaultValue="2019-08-19"
                          id="example-date-input"
                          onChange={validationType.handleChange}
                          onBlur={validationType.handleBlur}
                          value={validationType.values.to_date || ""}
                          invalid={
                            validationType.touched.to_date &&
                            validationType.errors.to_date
                              ? true
                              : false
                          }
                        />
                        {validationType.touched.to_date &&
                        validationType.errors.to_date ? (
                          <FormFeedback type="invalid">
                            {validationType.errors.to_date}
                          </FormFeedback>
                        ) : null}
                      </div>
                    </div>
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
                    onClick={() => setNewSchedule(false)}
                  >
                    Close
                  </Button>
                  <Button
                    type="submit"
                    style={{ backgroundColor: "#F6851F" }}
                    className="font-16 btn-block col-2"
                    // onClick={toggleCategory}
                  >
                    Save
                  </Button>
                </Row>
              </Row>
            </Col>
          </Row>
      </div>
        </Form>
    </Modal>
  );
};

export default AddNewScheduleModal;
