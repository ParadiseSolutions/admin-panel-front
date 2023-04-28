import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import ScheduleDolphins from "../../../Components/Assets/images/schedulesDolphins.png";
import {
  getSeasonsNameAPI,
  putSeasonalAPI,
  getSeasonsListAPI,
  deleteSeasonalityAPI,
  statusSeasonalityAPI,
  getScheduleTimeAPI,
  getScheduleDatesOverrideAPI,
  getSeasonalityAPI,
  deleteOverriteDate,
  deleteSchedule,
} from "../../../Utils/API/Tours";
import AddNewScheduleModal from "../../../Components/Common/Modals/ScheduleModals/newSchedule";
import EditScheduleModal from "../../../Components/Common/Modals/ScheduleModals/editSchedule";
import AddNewOverriteDate from "../../../Components/Common/Modals/CalendarOverrideModal/addNewOverriteDate";
import EdditOverriteDate from "../../../Components/Common/Modals/CalendarOverrideModal/editOverriteDate";
import {
  TabPane,
  Row,
  Col,
  Form,
  Input,
  FormFeedback,
  Button,
  Table,
  UncontrolledTooltip,
} from "reactstrap";
import * as Yup from "yup";
import { useFormik } from "formik";
import { map } from "lodash";
import Swal from "sweetalert2";

const seasonalityValues = [
  { id: 7, label: "All Year Long" },
  { id: 3, label: "Fixed Range" },
];

const Schedules = ({ tourData, toggle }) => {
  const history = useHistory();

  // console.log("tour data", tourData);
  const TourID = tourData?.id;

  //get initial Data
  const [schedulesData, setSchedulesData] = useState([]);
  const [datesOverrideData, setDatesOverrideData] = useState([]);
  const [seasonalityData, setSeasonalityData] = useState([]);
  useEffect(() => {
    getScheduleTimeAPI(TourID).then((resp) => {
      setSchedulesData(resp.data.data);
    });
    getScheduleDatesOverrideAPI(TourID).then((resp) => {
      setDatesOverrideData(resp.data.data);
    });
    getSeasonalityAPI(TourID).then((resp) => {
      // console.log(resp);

      setSeasonalityData(resp.data.data);
    });
  }, [TourID]);
  const [seasonNames, setSeasonNames] = useState([]);
  const [seasonSelected, setSeasonSelected] = useState("");
  useEffect(() => {
    getSeasonsNameAPI().then((resp) => {
      setSeasonNames(resp.data.data);
    });
  }, [tourData]);

  useEffect(() => {
    if (seasonalityData.length > 0) {
      setSeasonSelected(seasonalityData[0].repeat_id);
    }
  }, [seasonalityData]);

  // console.log("seasonality data", seasonalityData);
  //refresh tables
  const refresh = () => {
    getScheduleTimeAPI(TourID).then((resp) => {
      setSchedulesData(resp.data.data);
    });
    getScheduleDatesOverrideAPI(TourID).then((resp) => {
      setDatesOverrideData(resp.data.data);
    });
    getSeasonalityAPI(TourID).then((resp) => {
      setSeasonalityData(resp.data.data);
    });
  };

  //add new schedule
  const [newSchedule, setNewSchedule] = useState(false);
  const [editSchedule, setEditSchedule] = useState(false);
  const [scheduleEditID, setScheduleEditID] = useState(null);
  //add new overrite date
  const [newOverriteDate, setNewOverriteDate] = useState(false);
  const [editOverriteDate, setEditOverriteDate] = useState(false);
  const [editOverriteDateData, setEditOverriteDateData] = useState(null);

  //edit season
  const [dateFromEdit, setDataFromEdit] = useState(null);
  const [dateToEdit, setDataToEdit] = useState(null);
  // const onEditSeason = (data) => {
  //   setDataFromEdit(data.start_date);
  //   setDataToEdit(data.end_date);
  // };

  useEffect(() => {
    if (seasonalityData.length > 0) {
      setDataFromEdit(seasonalityData.from)
      setDataToEdit(seasonalityData.to)
    }
  }, [seasonalityData]);
  //delete season
  const onDeleteSeason = (data) => {
    deleteSchedule(tourData.id, data.id).then((resp) => {
      Swal.fire("Deleted!", "Time has been deleted.", "success").then(() => {
        // history.goBack();
      });
      getSeasonsListAPI(tourData.id).then((resp) => {
        // setSeasonsData(resp.data.data);
      });
    });
    refresh();
  };

  //delete overrite date
  const onDeleteOverriteDate = (data) => {
    deleteOverriteDate(tourData.id, data.id).then((resp) => {
      Swal.fire("Deleted!", "Time has been deleted.", "success");

      getScheduleDatesOverrideAPI(TourID).then((resp) => {
        setDatesOverrideData(resp.data.data);
      });
    });
    refresh();
  };

  // console.log('tiempos ----',schedulesData)
  //form creation
  const validationType = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,
    initialValues: {
      from: dateFromEdit ? dateFromEdit : "",
      to: dateToEdit ? dateToEdit : "",
    },
    // validationSchema: Yup.object().shape({
    //   tour_name: Yup.string().required("Field required"),
    //   code: Yup.string()
    //     .required("Code is required")
    //     .max(2, "Must be exactly 2 chars")
    //     .required("Max 2 chars"),
    // }),
    onSubmit: (values) => {
      let data = {
        repeat_id: seasonSelected,
        start_date: seasonSelected === 7 ? null : values.from,
        end_date: seasonSelected === 7 ? null : values.to,
        id: seasonalityData[0]?.id,
        type_id: 5,
        action: "Available",
        on: null,
        recurrency: 1,
      };
      console.log(data);
      putSeasonalAPI(tourData.id, data)
        .then((resp) => {
          // console.log(resp.data);
          if (resp.data.status === 201) {
            Swal.fire("Created!", "Seasonality has been created.", "success").then(
              () => {
                refresh()
                // history.goBack();
              }
            );
          }
        })
        .catch((error) => {
          // console.log(error.response);
          Swal.fire("Error!", `${error.response.data.data[0]}`, "error");
        });
    },
  });

  return (
    <>
      <Form
        onSubmit={(e) => {
          e.preventDefault();
          validationType.handleSubmit();
          return false;
        }}
        className="custom-validation"
      >
        <TabPane tabId="3">
          <Row xl={12} className="d-flex">
            <Col className="col-8" style={{ paddingLeft: "50px" }}>
              <Row
                className="col-12 d-flex justify-content-between mt-1"
                style={{ paddingRight: "30px" }}
              >
                <h2 className="text-paradise col-2 font-bold">Schedule</h2>
                <Button
                  style={{ backgroundColor: "#F6851F" }}
                  type="button"
                  className="font-16 btn-block col-2"
                  onClick={() => setNewSchedule(true)}
                >
                  + New Schedule
                  <i className="uil-angle-double-right mx-1 " />
                </Button>
              </Row>
              <Row className="col-12 d-flex mt-2">
                <Col className="col-8 ">
                  <div className="table-responsive">
                    <Table className="table mb-0">
                      <thead>
                        <tr>
                          <th>Product</th>
                          <th>Type</th>
                          <th>Start Times</th>
                          <th>Duration</th>
                          <th>Runs</th>
                        </tr>
                      </thead>
                      <tbody>
                        {schedulesData ? (
                          <>
                            {map(schedulesData, (schedule, index) => {
                              return (
                                <tr key={index}>
                                  <th scope="row">{schedule.name}</th>
                                  <td>
                                    {schedule.type_id === 4
                                      ? "Single Schedule"
                                      : schedule.type_id === 3
                                      ? "Multiple Schedule"
                                      : "Intervals"}
                                  </td>
                                  <td>
                                    {schedule.detail === ""
                                      ? ` ${schedule.from} ${schedule.to} `
                                      : schedule.detail}
                                  </td>
                                  <td>
                                    {" "}
                                    {schedule.type_id === 3
                                      ? "-"
                                      : `${schedule.duration} ${schedule.units}`}{" "}
                                  </td>
                                  <td>{schedule.end_date}</td>
                                  <td>
                                    <div
                                      style={{ cursor: "pointer" }}
                                      className="d-flex gap-3"
                                    >
                                      <div
                                        onClick={() => {
                                          setScheduleEditID(schedule);
                                          setEditSchedule(true);
                                        }}
                                        className="text-success"
                                      >
                                        <i
                                          className="mdi mdi-pencil font-size-18"
                                          id="edittooltip"
                                        />
                                        <UncontrolledTooltip
                                          placement="top"
                                          target="edittooltip"
                                        >
                                          Edit
                                        </UncontrolledTooltip>
                                      </div>
                                      <div
                                        style={{ cursor: "pointer" }}
                                        className="text-danger"
                                        onClick={() => {
                                          onDeleteSeason(schedule);
                                        }}
                                      >
                                        <i
                                          className="mdi mdi-delete font-size-18"
                                          id="deletetooltip"
                                        />
                                        <UncontrolledTooltip
                                          placement="top"
                                          target="deletetooltip"
                                        >
                                          Delete
                                        </UncontrolledTooltip>
                                      </div>
                                    </div>
                                  </td>
                                </tr>
                              );
                            })}
                          </>
                        ) : null}
                      </tbody>
                    </Table>
                  </div>
                </Col>
              </Row>
              <Row
                className="col-12 d-flex justify-content-between mt-5"
                style={{ paddingRight: "30px" }}
              >
                <h2 className="text-paradise col-6 font-bold">
                  Override Calendar Dates
                </h2>
                <Button
                  style={{ backgroundColor: "#F6851F" }}
                  type="button"
                  className="font-16 btn-block col-2"
                  onClick={() => setNewOverriteDate(!newOverriteDate)}
                >
                  + New Entry
                  <i className="uil-angle-double-right mx-1 " />
                </Button>
              </Row>
              <Row className="col-12 d-flex mt-2">
                <Col className="col-8 ">
                  <div className="table-responsive">
                    <Table className="table mb-0">
                      <thead>
                        <tr>
                          <th>Type</th>
                          <th>From</th>
                          <th>To</th>
                          <th>Recurrency</th>
                          <th>Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {datesOverrideData ? (
                          <>
                            {map(datesOverrideData, (dates, index) => {
                              return (
                                <tr key={index}>
                                  <th scope="row">
                                    {dates.type_id === 1
                                      ? "Range"
                                      : dates.type_id === 2
                                      ? "Weekdays"
                                      : dates.type_id === 3
                                      ? "Month"
                                      : dates.type_id === 4
                                      ? "Fix Date"
                                      : ""}
                                  </th>
                                  <td>{dates.from ? dates.from : "N/A"}</td>
                                  <td>{dates.to ? dates.to : "N/A"}</td>
                                  <td>
                                    <div
                                      style={{ cursor: "pointer" }}
                                      className="d-flex gap-3"
                                    >
                                      <div
                                        onClick={() => {
                                          setEditOverriteDateData(dates);
                                          setEditOverriteDate(true);
                                        }}
                                        className="text-success"
                                      >
                                        <i
                                          className="mdi mdi-pencil font-size-18"
                                          id="edittooltip"
                                        />
                                        <UncontrolledTooltip
                                          placement="top"
                                          target="edittooltip"
                                        >
                                          Edit
                                        </UncontrolledTooltip>
                                      </div>
                                      <div
                                        style={{ cursor: "pointer" }}
                                        className="text-danger"
                                        onClick={() => {
                                          onDeleteOverriteDate(dates);
                                        }}
                                      >
                                        <i
                                          className="mdi mdi-delete font-size-18"
                                          id="deletetooltip"
                                        />
                                        <UncontrolledTooltip
                                          placement="top"
                                          target="deletetooltip"
                                        >
                                          Delete
                                        </UncontrolledTooltip>
                                      </div>
                                    </div>
                                  </td>
                                  <td>{dates.action}</td>
                                </tr>
                              );
                            })}
                          </>
                        ) : null}
                      </tbody>
                    </Table>
                  </div>
                </Col>
              </Row>
            </Col>
            <Col>
              <Row>
                <div
                  style={{
                    backgroundColor: "rgba(0, 157, 255, 0.2)",
                    padding: "3px",
                  }}
                >
                  <p style={{ fontSize: "15px", color: "#495057" }}>
                    In this tab you will manage calendar availability and tour
                    schedule. <br /> 1. Define a specific date range for a tour,
                    in case the tour is seasonal <br /> 2. Add multiple
                    schedules. Assign a specific schedule to one product.
                    <br /> 3. Override availability (temporarily disable
                    bookings for certain dates)
                  </p>
                </div>
              </Row>
              <Row className="mt-3">
                <h3 className="text-paradise">Seasonality</h3>
                <p>
                  Does this tour run all-year-long or is it available only on
                  specific dates?
                </p>
              </Row>
              <Row className="mt-1 ">
                <Col className="col-4">
                  <div className="form-outline">
                    <Input
                      type="select"
                      name=""
                      onChange={(e) => {
                        setSeasonSelected(e.target.value);
                      }}
                      onBlur={validationType.handleBlur}
                    >
                      <option>Select....</option>
                      {seasonalityValues.map((option, index) => {
                        return (
                          <option
                            value={option.id}
                            selected={
                              seasonalityData[0]?.repeat_id === option.id
                            }
                          >
                            {option.label}
                          </option>
                        );
                      })}
                      {/* <option value='7' selected >All Year Long</option> */}
                    </Input>
                  </div>
                </Col>
                <Col className="col-4">
                  <div className="form-outline">
                    <div className="d-flex">
                      <div className="input-group">
                        <div className="input-group-text">From</div>
                        <Input
                          name="from"
                          className="form-control"
                          type="date"
                          // defaultValue="2019-08-19"
                          id="example-date-input"
                          onChange={validationType.handleChange}
                          onBlur={validationType.handleBlur}
                          value={validationType.values.from || ""}
                          invalid={
                            validationType.touched.from &&
                            validationType.errors.from
                              ? true
                              : false
                          }
                        />
                        {validationType.touched.from &&
                        validationType.errors.from ? (
                          <FormFeedback type="invalid">
                            {validationType.errors.from}
                          </FormFeedback>
                        ) : null}
                      </div>
                    </div>
                  </div>
                </Col>
                <Col className="col-4">
                  <div className="form-outline">
                    <div className="d-flex">
                      <div className="input-group">
                        <div className="input-group-text">To</div>
                        <Input
                          name="to"
                          className="form-control"
                          type="date"
                          // defaultValue="2019-08-19"
                          id="example-date-input"
                          onChange={validationType.handleChange}
                          onBlur={validationType.handleBlur}
                          value={validationType.values.to || ""}
                          invalid={
                            validationType.touched.to &&
                            validationType.errors.to
                              ? true
                              : false
                          }
                        />
                        {validationType.touched.to &&
                        validationType.errors.to ? (
                          <FormFeedback type="invalid">
                            {validationType.errors.to}
                          </FormFeedback>
                        ) : null}
                      </div>
                    </div>
                  </div>
                </Col>
              </Row>
              <Row className="mt-4">
                <img src={ScheduleDolphins} alt="dolphins" />
              </Row>
            </Col>
            <Row className="col-12 d-flex justify-content-end mt-5">
              <Button
                color="paradise"
                outline
                className="waves-effect waves-light col-2 mx-4"
                type="button"
                onClick={() => toggle("6")}
              >
                <i className="uil-angle-double-left" />
                Back
              </Button>
              <Button
                style={{ backgroundColor: "#F6851F" }}
                type="submit"
                className="font-16 btn-block col-2"
                // onClick={toggleCategory}
              >
                Continue
                <i className="uil-angle-double-right mx-1 " />
              </Button>
            </Row>
          </Row>
        </TabPane>
      </Form>
      <AddNewScheduleModal
        newSchedule={newSchedule}
        setNewSchedule={setNewSchedule}
        tourData={tourData}
        refresh={refresh}
      />
      <EditScheduleModal
        editSchedule={editSchedule}
        setEditSchedule={setEditSchedule}
        scheduleEditID={scheduleEditID}
        tourData={tourData}
        refresh={refresh}
      />
      <AddNewOverriteDate
        newOverriteDate={newOverriteDate}
        setNewOverriteDate={setNewOverriteDate}
        refresh={refresh}
      />
      <EdditOverriteDate
        editOverriteDate={editOverriteDate}
        setEditOverriteDate={setEditOverriteDate}
        editOverriteDateData={editOverriteDateData}
        refresh={refresh}
      />
    </>
  );
};

export default Schedules;
