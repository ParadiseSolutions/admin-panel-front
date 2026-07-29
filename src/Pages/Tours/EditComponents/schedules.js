import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import ScheduleDolphins from "../../../Components/Assets/images/schedulesDolphins.png";
import {
  putSeasonalAPI,
  getScheduleTimeAPI,
  getScheduleDatesOverrideAPI,
  getSeasonalityAPI,
  deleteOverriteDate,
  deleteSchedule,
  triggerUpdate,
  putOpenTicket,
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
  Tooltip,
  Label,
} from "reactstrap";
import { useFormik } from "formik";
import { map } from "lodash";
import Swal from "sweetalert2";

const seasonalityValues = [
  { id: 7, label: "All Year Long" },
  { id: 3, label: "Fixed Range" },
];

const ALL_YEAR_LONG_ID = 7;

const Schedules = ({ tourData, toggle }) => {
  const history = useHistory();

  // console.log("tour data", tourData);
  const TourID = tourData?.id;

  //get initial Data
  const [schedulesData, setSchedulesData] = useState([]);
  const [datesOverrideData, setDatesOverrideData] = useState([]);
  const [seasonalityData, setSeasonalityData] = useState([]);
  const [openTicketCheck, setOpenTicketCheck] = useState(false);

  useEffect(() => {
    getScheduleTimeAPI(TourID).then((resp) => {
      setSchedulesData(resp.data.data);
    }).catch((error) => {
          Swal.fire({
            title: 'Error',
            text: 'Something happened with the connection. Refresh the page and try again.',
            icon: 'error',
            confirmButtonText: 'OK'
          });
        });
    getScheduleDatesOverrideAPI(TourID).then((resp) => {
      setDatesOverrideData(resp.data.data);
    }).catch((error) => {
          Swal.fire({
            title: 'Error',
            text: 'Something happened with the connection. Refresh the page and try again.',
            icon: 'error',
            confirmButtonText: 'OK'
          });
        });
    getSeasonalityAPI(TourID).then((resp) => {
      // console.log(resp);
      setSeasonalityData(resp.data.data);
      setSeasonSelected(String(resp.data.data[0]?.repeat_id ?? ""));
    }).catch((error) => {
          Swal.fire({
            title: 'Error',
            text: 'Something happened with the connection. Refresh the page and try again.',
            icon: 'error',
            confirmButtonText: 'OK'
          });
        });
  }, [TourID]);
  useEffect(() => {
    if (tourData?.open_ticket === 1) {
      setOpenTicketCheck(true);
    } else {
      setOpenTicketCheck(false);
    }
  }, [tourData]);
  const [seasonSelected, setSeasonSelected] = useState("");
  // repeat_id llega como entero desde el API y como string desde el <select>,
  // se compara siempre normalizado para evitar falsos negativos.
  const isAllYearLong = Number(seasonSelected) === ALL_YEAR_LONG_ID;
  const showError = (text) => {
    Swal.fire({
      title: "Error",
      text: text,
      icon: "error",
      confirmButtonText: "OK",
    });
  };

  //refresh tables
  // Se refresca por tabla: recargar la seasonality reinicializa el formulario y
  // descartaria los cambios que el usuario aun no ha guardado.
  // Cada helper atrapa su propio error para no rechazar y no confundirse con el
  // error de la peticion que lo disparo.
  const reloadFailedMessage =
    "The information could not be reloaded. Refresh the page to see the latest data.";
  const refreshSchedules = () => {
    return getScheduleTimeAPI(TourID)
      .then((resp) => {
        setSchedulesData(resp.data.data);
      })
      .catch(() => {
        showError(reloadFailedMessage);
      });
  };
  const refreshOverrideDates = () => {
    return getScheduleDatesOverrideAPI(TourID)
      .then((resp) => {
        setDatesOverrideData(resp.data.data);
      })
      .catch(() => {
        showError(reloadFailedMessage);
      });
  };
  const refreshSeasonality = () => {
    return getSeasonalityAPI(TourID)
      .then((resp) => {
        setSeasonalityData(resp.data.data);
        setSeasonSelected(String(resp.data.data[0]?.repeat_id ?? ""));
      })
      .catch(() => {
        showError(reloadFailedMessage);
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
  const [ttop4, setttop4] = useState(false);

  //edit season
  const [dateFromEdit, setDataFromEdit] = useState(null);
  const [dateToEdit, setDataToEdit] = useState(null);
  // const onEditSeason = (data) => {
  //   setDataFromEdit(data.start_date);
  //   setDataToEdit(data.end_date);
  // };

  useEffect(() => {
    if (isAllYearLong) {
      setDataFromEdit(null);
      setDataToEdit(null);
    }
  }, [isAllYearLong]);

  useEffect(() => {
    if (seasonalityData.length > 0) {
      setDataFromEdit(seasonalityData[0].from);
      setDataToEdit(seasonalityData[0].to);
    }
  }, [seasonalityData]);

  //delete season
  const onDeleteSeason = (data) => {
    deleteSchedule(tourData.id, data.id)
      .then(() => {
        return refreshSchedules().then(() => {
          Swal.fire("Deleted!", "Time has been deleted.", "success");
        });
      })
      .catch(() => {
        showError(
          "The schedule could not be deleted. Refresh the page and try again."
        );
      });
  };

  //delete overrite date
  const onDeleteOverriteDate = (data) => {
    deleteOverriteDate(tourData.id, data.id)
      .then(() => {
        return refreshOverrideDates().then(() => {
          Swal.fire("Deleted!", "Time has been deleted.", "success");
        });
      })
      .catch(() => {
        showError(
          "The date could not be deleted. Refresh the page and try again."
        );
      });
  };

  // open tickets functionality
  const openTicketFunction = (isActive) => {
    let body = {
      active: isActive ? 1 : 0,
    };
    putOpenTicket(tourData.id, body)
      .then(() => {
        return refreshSchedules().then(() => {
          Swal.fire("Open Ticket!", "Open Ticket has been change.", "success");
        });
      })
      .catch(() => {
        setOpenTicketCheck(!isActive);
        showError(
          "Open Ticket could not be updated. Refresh the page and try again."
        );
      });
  };

  // console.log('tiempos ----',schedulesData)
  //form creation
  const validationType = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,
    initialValues: {
      from: dateFromEdit ? dateFromEdit : "",
      to: dateToEdit ? dateToEdit : "",
      repeat_id: seasonalityData[0]?.repeat_id
        ? seasonalityData[0]?.repeat_id
        : null,
    },
    // validationSchema: Yup.object().shape({
    //   tour_name: Yup.string().required("Field required"),
    //   code: Yup.string()
    //     .required("Code is required")
    //     .max(2, "Must be exactly 2 chars")
    //     .required("Max 2 chars"),
    // }),
    onSubmit: (values) => {
      const repeatId = Number(seasonSelected);
      const seasonalityId = seasonalityData[0]?.id;

      if (!repeatId) {
        Swal.fire(
          "Missing information!",
          "Please select a seasonality option before saving.",
          "warning"
        );
        return;
      }
      if (!seasonalityId) {
        Swal.fire(
          "Error!",
          "This tour has no seasonality record to update. Refresh the page and try again.",
          "error"
        );
        return;
      }
      if (repeatId !== ALL_YEAR_LONG_ID && (!values.from || !values.to)) {
        Swal.fire(
          "Missing information!",
          "Please set both From and To dates for a fixed range.",
          "warning"
        );
        return;
      }

      let data = {
        repeat_id: repeatId,
        from: repeatId === ALL_YEAR_LONG_ID ? null : values.from,
        to: repeatId === ALL_YEAR_LONG_ID ? null : values.to,
        id: seasonalityId,
        type_id: 5,
        action: "Available",
        on: null,
        recurrency: 1,
      };
      // console.log(data);
      putSeasonalAPI(tourData.id, data)
        .then((resp) => {
          // console.log(resp.data);
          if (resp.data.status === 200) {
            // triggerUpdate();
            Swal.fire(
              "Created!",
              "Seasonality has been created.",
              "success"
            ).then(() => {
              refreshSeasonality();
              // history.goBack();
               toggle("9")
            });
          }
        })
        .catch((error) => {
          let errorMessages = [];
          if (error.response.data.data === null) {
            Swal.fire(
              "Error!",
              // {error.response.},
              String(error.response.data.message)
            );
          } else {
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
    },
  });

  const seasonalityHasChanged =
    String(seasonalityData[0]?.repeat_id ?? "") !== String(seasonSelected ?? "");
  const hasUnsavedChanges = validationType.dirty || seasonalityHasChanged;

  const unsavedChangesNotice = hasUnsavedChanges ? (
    <div
      className="text-danger d-flex align-items-center"
      style={{ fontSize: "12px" }}
    >
      <i className="mdi mdi-alert-circle-outline me-1" />
      <span>
        You have unsaved changes in Seasonality. Click{" "}
        <strong>Save and Continue</strong> to save them.
      </span>
    </div>
  ) : null;

  const onSeasonalityChange = (e) => {
    const value = e.target.value;
    setSeasonSelected(value);
    if (Number(value) === ALL_YEAR_LONG_ID) {
      setDataFromEdit(null);
      setDataToEdit(null);
      validationType.setFieldValue("from", "");
      validationType.setFieldValue("to", "");
    }
  };

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
          <Row>
            <Col className="col-7">
              <section className="d-flex justify-content-between mb-4">
                <h2 className="text-paradise font-bold">Schedule</h2>
                <div className="d-flex align-items-center gap-3">
                  <div className="d-flex">
                    <Label
                      className="form-label mt-2"
                      style={{
                        // fontWeight: "bold",
                        color: "#495057",
                        marginBottom: "0px",
                      }}
                    >
                      Open Ticket
                    </Label>
                    <div>
                      <i
                        className="uil-question-circle font-size-15 p-2"
                        id="openTicket"
                      />
                      <Tooltip
                        placement="right"
                        isOpen={ttop4}
                        target="openTicket"
                        toggle={() => {
                          setttop4(!ttop4);
                        }}
                      >
                        Activating this will disable adding new tour schedules.
                        Use when date and time aren't needed in the booking
                        form.
                      </Tooltip>
                    </div>
                  </div>
                  <div className="form-check form-switch form-switch-md  mt-2 ">
                    <Input
                      name="seasonality"
                      placeholder=""
                      type="checkbox"
                      checked={openTicketCheck}
                      className="form-check-input"
                      onChange={() => {
                        const isActive = !openTicketCheck;
                        setOpenTicketCheck(isActive);
                        openTicketFunction(isActive);
                      }}
                      // onBlur={validationType.handleBlur}
                      value={openTicketCheck}
                    />
                  </div>

                  <Button
                    type="button"
                    className="font-16 btn-block btn-orange"
                    onClick={() => setNewSchedule(true)}
                    disabled={openTicketCheck}
                  >
                    + New Schedule
                  </Button>
                </div>
              </section>
              <section className="table-responsive border-top mb-5">
                <Table className="table mb-0">
                  <thead>
                    <tr>
                      <th className="border-0">Product</th>
                      <th className="border-0">Type</th>
                      <th className="border-0">Start Times</th>
                      <th className="border-0">Duration</th>
                      <th className="border-0">Runs</th>
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
                                  : schedule.type_id === 6
                                  ? "Intervals"
                                  : "Custom"}
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
                              <td>
                                {schedule.runs === "7,1,5,2,6,3,0,4" ||
                                schedule.runs === "1,5,2,6,3,0,4" ||
                                schedule.runs === "1,2,3,4,5,6,0"
                                  ? "Daily"
                                  : schedule.runs
                                      .replace("1", " Monday")
                                      .replace("2", " Tuesday")
                                      .replace("3", " Wednesday")
                                      .replace("4", " Thursday")
                                      .replace("5", " Friday")
                                      .replace("6", " Saturday")
                                      .replace("0", " Sunday")
                                      .replace("7", "Daily")}
                              </td>
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
                                    className="text-paradise"
                                  >
                                    <i
                                      className="mdi mdi-pencil-outline font-size-18"
                                      id={`schedule-edit-${schedule.id}`}
                                      style={{ cursor: "pointer" }}
                                    />
                                    <UncontrolledTooltip
                                      placement="top"
                                      target={`schedule-edit-${schedule.id}`}
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
                                      className="mdi mdi-delete-outline font-size-18"
                                      id={`schedule-delete-${schedule.id}`}
                                    />
                                    <UncontrolledTooltip
                                      placement="top"
                                      target={`schedule-delete-${schedule.id}`}
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
              </section>
              <section
                className="d-flex justify-content-between mb-5"
                hidden="true"
              >
                <h2 className="text-paradise font-bold">
                  Override Calendar Dates
                </h2>
                <Button
                  type="button"
                  className="font-16 btn-block btn-orange"
                  onClick={() => setNewOverriteDate(!newOverriteDate)}
                >
                  + New Entry
                </Button>
              </section>
              <section
                className="table-responsive border-top mb-5"
                hidden="true"
              >
                <Table className="table mb-0">
                  <thead>
                    <tr>
                      <th className="border-0">Type</th>
                      <th className="border-0">From</th>
                      <th className="border-0">To</th>
                      <th className="border-0">Recurrency</th>
                      <th className="border-0">Status</th>
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
                                    className="text-paradise"
                                  >
                                    <i
                                      className="mdi mdi-pencil-outline font-size-18"
                                      id={`override-edit-${dates.id}`}
                                      style={{ cursor: "pointer" }}
                                    />
                                    <UncontrolledTooltip
                                      placement="top"
                                      target={`override-edit-${dates.id}`}
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
                                      className="mdi mdi-delete-outline font-size-18"
                                      id={`override-delete-${dates.id}`}
                                    />
                                    <UncontrolledTooltip
                                      placement="top"
                                      target={`override-delete-${dates.id}`}
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
              </section>
            </Col>
            <Col>
              <section className="mb-3">
                <div
                  style={{
                    backgroundColor: "rgba(0, 157, 255, 0.2)",
                  }}
                  className="p-3"
                >
                  <p style={{ fontSize: "15px", color: "#495057" }}>
                    <i
                      className="far fa-lightbulb bg-paradise text-white p-2 rounded-circle text-center"
                      style={{ width: "32px", height: "32px" }}
                    ></i>{" "}
                    In this tab you will manage calendar availability and tour
                    schedule. <br />
                  </p>
                  <ol>
                    <li>
                      Define a specific date range for a tour, in case the tour
                      is seasonal
                    </li>
                    <li>
                      Add multiple schedules. Assign a specific schedule to one
                      product
                    </li>
                    <li>
                      Override availability (temporarily disable bookings for
                      certain dates)
                    </li>
                  </ol>
                </div>
              </section>
              <section className="mb-3">
                <h3 className="text-paradise">Seasonality</h3>
                <p>
                  Does this tour run all-year-long or is it available only on
                  specific dates?
                </p>
              </section>
              <Row className="g-3">
                <Col className="col-xxl-4 col-12">
                  <div className="form-outline">
                    <Input
                      type="select"
                      name="repeat_id"
                      value={seasonSelected}
                      onChange={onSeasonalityChange}
                      onBlur={validationType.handleBlur}
                    >
                      <option value="">Select....</option>
                      {seasonalityValues.map((option, index) => {
                        return (
                          <option key={index} value={option.id}>
                            {option.label}
                          </option>
                        );
                      })}
                    </Input>
                  </div>
                </Col>
                <Col className="col-xxl-4 col-12">
                  <div className="form-outline">
                    <div className="d-flex">
                      <div className="input-group">
                        <div className="input-group-text">From</div>
                        <Input
                          name="from"
                          className="form-control"
                          type="date"
                          id="seasonality-from-input"
                          disabled={isAllYearLong}
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
                <Col className="col-xxl-4 col-12">
                  <div className="form-outline">
                    <div className="d-flex">
                      <div className="input-group">
                        <div className="input-group-text">To</div>
                        <Input
                          name="to"
                          className="form-control"
                          type="date"
                          id="seasonality-to-input"
                          disabled={isAllYearLong}
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
              {unsavedChangesNotice ? (
                <div className="mt-2">{unsavedChangesNotice}</div>
              ) : null}
              <section className="mt-4">
                <img
                  src={ScheduleDolphins}
                  alt="dolphins"
                  className="img-fluid"
                />
              </section>
            </Col>
            <div className="col-12 d-flex justify-content-end align-items-center mt-5">
              {unsavedChangesNotice ? (
                <div className="me-3">{unsavedChangesNotice}</div>
              ) : null}
              <Button
                color="paradise"
                outline
                className="waves-effect waves-light me-3"
                type="button"
                onClick={() => toggle("7")}
              >
                <i className="uil-angle-double-left" />
                Previous
              </Button>
              <Button
                type="submit"
                className="font-16 btn-block btn-orange"
                // onClick={toggleCategory}
              >
               Save and Continue
                <i className="uil-angle-double-right mx-1 " />
              </Button>
            </div>
          </Row>
        </TabPane>
      </Form>
      <AddNewScheduleModal
        newSchedule={newSchedule}
        setNewSchedule={setNewSchedule}
        tourData={tourData}
        refresh={refreshSchedules}
      />
      <EditScheduleModal
        editSchedule={editSchedule}
        setEditSchedule={setEditSchedule}
        scheduleEditID={scheduleEditID}
        tourData={tourData}
        refresh={refreshSchedules}
      />
      <AddNewOverriteDate
        newOverriteDate={newOverriteDate}
        setNewOverriteDate={setNewOverriteDate}
        refresh={refreshOverrideDates}
      />
      <EdditOverriteDate
        editOverriteDate={editOverriteDate}
        setEditOverriteDate={setEditOverriteDate}
        editOverriteDateData={editOverriteDateData}
        refresh={refreshOverrideDates}
      />
    </>
  );
};

export default Schedules;
