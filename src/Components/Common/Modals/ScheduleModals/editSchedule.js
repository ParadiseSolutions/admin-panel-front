import { useEffect, useState } from "react";
import ScheduleImage from "../../../Assets/images/schedule.png";
import CheckBoxs from "./Components/checkboxs";
import Swal from "sweetalert2";
import {
  getScheduleTypesAPI,
  getPricesPricingAPI,
  putSchedule,
  getScheduleEditDataAPI,
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

const timeFrameOptions = [
  { value: "AM", label: "AM" },
  { value: "PM", label: "PM" },
];
const hoursFrameOptions = [
  { value: "Hours", label: "Hours" },
  { value: "Minutes", label: "Minutes" },
];

const EditScheduleModal = ({
  editSchedule,
  setEditSchedule,
  tourData,
  refresh,
  scheduleEditID,
}) => {
  const { id } = useParams();

  //console.log('data',scheduleEditID);
  //edit data
  const [dataEdit, setDataEdit] = useState([]);
  const [scheduleTypesData, setSchedulesTypesData] = useState([]);
  const [productsData, setProductsData] = useState([]);
  const [typeSelected, setTypeSelected] = useState(null);

  const [daysList, setDayList] = useState([]);
  const [activeDep, setActiveDep] = useState(false);
  const [productSelected, setProductSelected] = useState(null);
  const [timeFrameSingleSchedule, setTimeFrameSingleSchedule] = useState("AM");
  const [timeFrameMulti1, setTimeFrameMulti1] = useState("AM");
  const [timeFrameMulti2, setTimeFrameMulti2] = useState("AM");
  const [timeFrameMulti3, setTimeFrameMulti3] = useState("AM");
  const [timeFrameMulti4, setTimeFrameMulti4] = useState("AM");
  const [timeFrameMulti5, setTimeFrameMulti5] = useState("AM");
  const [timeFrameMulti6, setTimeFrameMulti6] = useState("AM");
  const [timeFrameIntervalFrom, setTimeFrameIntervalFrom] = useState("AM");
  const [timeFrameIntervalTo, setTimeFrameIntervalTo] = useState("AM");
  const [unitSelected, setUnitSelected] = useState("Hours");

  useEffect(() => {
    if (scheduleEditID) {
      getScheduleEditDataAPI(id, scheduleEditID.id).then((response) => {
        //console.log("respuesta a editar", response.data.data);
        setDataEdit(response.data.data);
      });
    }
  }, [scheduleEditID]);

  //asignacion de data
  //states to edit
  const [productToEdit, setProductToEdit] = useState(null);
  const [typeToEdit, setTypeToEdit] = useState(null);
  const [startTimeSS, setStartTimeSS] = useState(null);
  const [timeFrameSS, setTimeFrameSS] = useState(null);
  const [unitSS, setUnitSS] = useState(null);
  const [durationSS, setDurationSS] = useState(null);

  const [unitI, setUnitI] = useState(null);
  const [durationI, setDurationI] = useState(null);
  const [startTimeI, setStartTimeI] = useState(null);
  const [startFrameI, setStartFrameI] = useState(null);
  const [endTimeI, setEndTimeI] = useState(null);
  const [endFrameI, setEndFrameI] = useState(null);

  const [editTimeM1, setEditTimeM1] = useState(null);
  const [editFrameM1, setEditFrameM1] = useState(null);
  const [editTimeM2, setEditTimeM2] = useState(null);
  const [editFrameM2, setEditFrameM2] = useState(null);
  const [editTimeM3, setEditTimeM3] = useState(null);
  const [editFrameM3, setEditFrameM3] = useState(null);
  const [editTimeM4, setEditTimeM4] = useState(null);
  const [editFrameM4, setEditFrameM4] = useState(null);
  const [editTimeM5, setEditTimeM5] = useState(null);
  const [editFrameM5, setEditFrameM5] = useState(null);
  const [editTimeM6, setEditTimeM6] = useState(null);
  const [editFrameM6, setEditFrameM6] = useState(null);
  const [fromDateEdit, setFromDateEdit] = useState(null);
  const [toDateEdit, setToDateEdit] = useState(null);
  useEffect(() => {
    if (dataEdit.type_id === 4) {
      let from_time = dataEdit.from.split(" ");
      setUnitSS(dataEdit.units);
      setStartTimeSS(from_time[0]);
      setTimeFrameSS(from_time[1]);
      setDurationSS(dataEdit.duration);
    }
    if (dataEdit.type_id === 6) {
      let from_time = dataEdit.from.split(" ");
      let to_time = dataEdit.to.split(" ");
      setUnitI(dataEdit.units);
      setDurationI(dataEdit.duration);
      setStartTimeI(from_time[0]);
      setStartFrameI(from_time[1]);
      setEndTimeI(to_time[0]);
      setEndFrameI(to_time[1]);
    }
    if (dataEdit.type_id === 3) {
      let detailData = dataEdit.detail.split(",");
      let newArr = [];
      detailData.forEach((element) => {
        newArr.push(element.split(" "));
      });
      setEditTimeM1(newArr[0][0]);
      setEditFrameM1(newArr[0][1]);
      setEditTimeM2(newArr[1][0]);
      setEditFrameM2(newArr[1][1]);
      setEditTimeM3(newArr[2][0]);
      setEditFrameM3(newArr[2][1]);
      setEditTimeM4(newArr[3][0]);
      setEditFrameM4(newArr[3][1]);
      setEditTimeM5(newArr[4][0]);
      setEditFrameM5(newArr[4][1]);
      setEditTimeM6(newArr[5][0]);
      setEditFrameM6(newArr[5][1]);
      // console.log(newArr);
    }
    setTypeToEdit(dataEdit.type_id);
    setProductToEdit(dataEdit.price_id);
    setFromDateEdit(dataEdit.from_date);
    setToDateEdit(dataEdit.to_date);
    setDayList(dataEdit.runs)
  }, [dataEdit, editSchedule]);

  //initial Data

  useEffect(() => {
    getScheduleTypesAPI().then((resp) => {
      setSchedulesTypesData(resp.data.data);
    });
  }, [editSchedule]);

  useEffect(() => {
    if (tourData) {
      getPricesPricingAPI(tourData.id).then((resp) => {
        setProductsData(resp.data.data);
      });
    }
  }, [tourData, editSchedule]);

  // type onChange

  const onChangeType = (selectionType) => {
    setTypeSelected(selectionType);
  };

  // checkbox list

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

  const onChangeActive = (data) => {
    setActiveDep(!activeDep);
  };

  //ids selected

  const validationType = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,
    initialValues: {
      start_time_single: startTimeSS ? startTimeSS : "",
      from_intervals: startTimeI ? startTimeI : "",
      to_interval: endTimeI ? endTimeI : "",
      duration: durationSS ? durationSS : durationI ? durationI : "",
      from: "",
      to: "",
      first_field_multi: editTimeM1 ? editTimeM1 : "",
      second_field_multi: editTimeM2 ? editTimeM2 : "",
      third_field_multi: editTimeM3 ? editTimeM3 : "",
      fourth_field_multi: editTimeM4 ? editTimeM4 : "",
      fifth_field_multi: editTimeM5 ? editTimeM5 : "",
      sixth_field_multi: editTimeM6 ? editTimeM6 : "",
      from_date: fromDateEdit ? fromDateEdit : "",
      to_date: toDateEdit ? toDateEdit : "",
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

      let multiTimesList = [];
      if (values.first_field_multi !== "") {
        multiTimesList.push(`${values.first_field_multi} ${timeFrameMulti1}`);
      }
      if (values.second_field_multi !== "") {
        multiTimesList.push(`${values.second_field_multi} ${timeFrameMulti2}`);
      }
      if (values.third_field_multi !== "") {
        multiTimesList.push(`${values.third_field_multi} ${timeFrameMulti3}`);
      }
      if (values.fourth_field_multi !== "") {
        multiTimesList.push(`${values.fourth_field_multi} ${timeFrameMulti4}`);
      }
      if (values.fifth_field_multi !== "") {
        multiTimesList.push(`${values.fifth_field_multi} ${timeFrameMulti5}`);
      }
      if (values.sixth_field_multi !== "") {
        multiTimesList.push(`${values.sixth_field_multi} ${timeFrameMulti6}`);
      }

      let data = {
        id: scheduleEditID.id,
        type_id: typeSelected ? typeSelected : dataEdit.type_id,
        detail: multiTimesList.toString(),
        from: values.start_time_single
          ? startTimeSingle
          : values.from_intervals
          ? startTimeIntervalsFrom
          : "", // cambiarlo despues por una validacion
        to: values.to_interval ? startTimeIntervalsTo : "",
        runs: daysListString,
        temporary_schedule: activeDep === true ? 1 : 0,
        from_date: values.from_date,
        to_date: values.to_date,
        units: unitSelected,
        duration: values.duration ? values.duration : "",
        price_id: productSelected,
      };
console.log(data)
putSchedule(id, data)
        .then((resp) => {
          if (resp.data.status === 201) {
            Swal.fire("Success!", "Schedule has been created", "success").then(
              () => {
                setEditSchedule(false);
                refresh();
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
      isOpen={editSchedule}
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
          <h1 className="modal-title mt-0 text-white">+ Edit Schedule Entry</h1>
          <button
            onClick={() => {
              setEditSchedule(false);
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
          <Row className="d-flex">
            <Col className="col-3">
              <img
                src={ScheduleImage}
                alt="new-product"
                className="img-fluid"
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
                          <option
                            key={index}
                            value={product.id}
                            selected={
                              +product.id === +productToEdit ? true : false
                            }
                          >
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
                          <option
                            key={index}
                            value={type.id}
                            selected={typeToEdit === type.id ? true : false}
                          >
                            {type.name}
                          </option>
                        );
                      })}
                    </Input>
                  </div>
                </Col>

                <Col className="col-9">
                  <Row className="d-flex">
                    {typeSelected === "4" || typeToEdit === 4 ? (
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
                              {timeFrameOptions.map((item, index) => {
                                return (
                                  <option
                                    key={index}
                                    value={item.value}
                                    selected={
                                      timeFrameSS === item.value ? true : false
                                    }
                                  >
                                    {item.label}
                                  </option>
                                );
                              })}
                            </Input>
                          </div>
                        </Col>
                        <Col className="col-4 ">
                          <Label className="form-label">Time Unit</Label>
                          <div className="form-outline">
                            <Input
                              type="select"
                              name="time_unit"
                              onChange={(e) => {
                                setUnitSelected(e.target.value);
                              }}
                              onBlur={validationType.handleBlur}
                            >
                              {hoursFrameOptions.map((item, index) => {
                                return (
                                  <option
                                    key={index}
                                    value={item.value}
                                    selected={
                                      item.value === unitSS ? true : false
                                    }
                                  >
                                    {item.label}
                                  </option>
                                );
                              })}
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

                    {typeSelected === "6" || typeToEdit === 6 ? (
                      <>
                        <Col className="col-4 ">
                          <Label className="form-label">Time Unit</Label>
                          <div className="form-outline">
                            <Input
                              type="select"
                              name=""
                              onChange={(e) => {
                                setUnitSelected(e.target.value);
                              }}
                              onBlur={validationType.handleBlur}
                            >
                              {hoursFrameOptions.map((item, index) => {
                                return (
                                  <option
                                    key={index}
                                    value={item.value}
                                    selected={
                                      item.value === unitI ? true : false
                                    }
                                  >
                                    {item.label}
                                  </option>
                                );
                              })}
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

                {typeSelected === "6" || typeToEdit === 6 ? (
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
                          onChange={(e) =>
                            setTimeFrameIntervalFrom(e.target.value)
                          }
                          onBlur={validationType.handleBlur}
                          // value={validationType.values.start_time || ""}
                        >
                          {timeFrameOptions.map((item, index) => {
                            return (
                              <option
                                key={index}
                                value={item.value}
                                selected={
                                  item.value === startFrameI ? true : false
                                }
                              >
                                {item.label}
                              </option>
                            );
                          })}
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
                          onChange={(e) =>
                            setTimeFrameIntervalTo(e.target.value)
                          }
                          onBlur={validationType.handleBlur}
                          // value={validationType.values.start_time || ""}
                        >
                          {timeFrameOptions.map((item, index) => {
                            return (
                              <option
                                key={index}
                                value={item.value}
                                selected={
                                  item.value === endFrameI ? true : false
                                }
                              >
                                {item.label}
                              </option>
                            );
                          })}
                        </Input>
                      </div>
                    </div>
                  </Row>
                ) : null}

                {typeSelected === "3" || typeToEdit === 3 ? (
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
                              value={
                                validationType.values.first_field_multi || ""
                              }
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
                              onChange={(e) =>
                                setTimeFrameMulti1(e.target.value)
                              }
                              onBlur={validationType.handleBlur}
                              // value={validationType.values.start_time || ""}
                            >
                              {timeFrameOptions.map((item, index) => {
                                return (
                                  <option
                                    key={index}
                                    value={item.value}
                                    selected={
                                      editFrameM1 === item.value ? true : false
                                    }
                                  >
                                    {item.label}
                                  </option>
                                );
                              })}
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
                              value={
                                validationType.values.second_field_multi || ""
                              }
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
                              onChange={(e) =>
                                setTimeFrameMulti2(e.target.value)
                              }
                              onBlur={validationType.handleBlur}
                              // value={validationType.values.start_time || ""}
                            >
                              {timeFrameOptions.map((item, index) => {
                                return (
                                  <option
                                    key={index}
                                    value={item.value}
                                    selected={
                                      editFrameM2 === item.value ? true : false
                                    }
                                  >
                                    {item.label}
                                  </option>
                                );
                              })}
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
                              value={
                                validationType.values.third_field_multi || ""
                              }
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
                              onChange={(e) =>
                                setTimeFrameMulti3(e.target.value)
                              }
                              onBlur={validationType.handleBlur}
                              // value={validationType.values.start_time || ""}
                            >
                              {timeFrameOptions.map((item, index) => {
                                return (
                                  <option
                                    key={index}
                                    value={item.value}
                                    selected={
                                      editFrameM3 === item.value ? true : false
                                    }
                                  >
                                    {item.label}
                                  </option>
                                );
                              })}
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
                              value={
                                validationType.values.fourth_field_multi || ""
                              }
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
                              onChange={(e) =>
                                setTimeFrameMulti4(e.target.value)
                              }
                              onBlur={validationType.handleBlur}
                              // value={validationType.values.start_time || ""}
                            >
                              {timeFrameOptions.map((item, index) => {
                                return (
                                  <option
                                    key={index}
                                    value={item.value}
                                    selected={
                                      editFrameM4 === item.value ? true : false
                                    }
                                  >
                                    {item.label}
                                  </option>
                                );
                              })}
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
                              value={
                                validationType.values.fifth_field_multi || ""
                              }
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
                              onChange={(e) =>
                                setTimeFrameMulti5(e.target.value)
                              }
                              onBlur={validationType.handleBlur}
                              // value={validationType.values.start_time || ""}
                            >
                              {timeFrameOptions.map((item, index) => {
                                return (
                                  <option
                                    key={index}
                                    value={item.value}
                                    selected={
                                      editFrameM5 === item.value ? true : false
                                    }
                                  >
                                    {item.label}
                                  </option>
                                );
                              })}
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
                              value={
                                validationType.values.sixth_field_multi || ""
                              }
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
                              onChange={(e) =>
                                setTimeFrameMulti6(e.target.value)
                              }
                              onBlur={validationType.handleBlur}
                              // value={validationType.values.start_time || ""}
                            >
                              {timeFrameOptions.map((item, index) => {
                                return (
                                  <option
                                    key={index}
                                    value={item.value}
                                    selected={
                                      editFrameM6 === item.value ? true : false
                                    }
                                  >
                                    {item.label}
                                  </option>
                                );
                              })}
                            </Input>
                          </div>
                        </div>
                      </Row>
                    </div>
                  </Col>
                ) : null}
                
                  <Col className="col-12 mt-3">
                    <CheckBoxs onAddDay={onAddDay} scheduleEditID={scheduleEditID} />
                  </Col>
                

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
                    onClick={() => setEditSchedule(false)}
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

export default EditScheduleModal;
