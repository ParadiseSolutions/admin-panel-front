// import { createPaymentTypeAPI } from "../../../../Utils/API/Payments";
import { useEffect, useState } from "react";
import {
  Row,
  Col,
  Form,
  Label,
  Input,
  Button,
  UncontrolledTooltip,
  Modal,
} from "reactstrap";

import { useFormik } from "formik";
import Swal from "sweetalert2";
import { map } from "lodash";
import { useParams } from "react-router-dom";
import CancellationBanner from "../../../../../../Components/Assets/images/CancellationBanner.png";
import {
  createHolidayPolicy,
  createLastMinutePolicy,
  getApplytoOptionsAPI,
  getHolidayOptionsAPI,
  getHolidayToEditAPI,
  getNoticeOptionsAPI,
  getOfficeStatusOptionsAPI,
  getPolicyToEditAPI,
  getTourStatusOptionsAPI,
  updateHoliday,
} from "../../../../../../Utils/API/Providers";

const HolidaysModal = ({
  holidaysModalCreate,
  setHolidaysModalCreate,
  refresh,
  idEdit,
  setIdEdit,
}) => {
  const { id } = useParams();

  //initial request
  const [holidayData, setHolidayData] = useState([]);
  const [holidaySelected, setHolidaySelected] = useState(null);
  const [officeStatusData, setOfficeStatusData] = useState([]);
  const [officeStatusSelected, setOfficeStatusSelected] = useState(null);
  const [tourStatusData, setTourStatusData] = useState([]);
  const [tourStatusSelected, setTourStatusSelected] = useState(null);
  const [dataEdit, setDataEdit] = useState(null);
  const [timeFrameStart, setTimeFrameStart] = useState("AM");
  const [timeFrameEnd, setTimeFrameEnd] = useState("AM");

  useEffect(() => {
    getHolidayOptionsAPI().then((res) => {
      setHolidayData(res.data.data);
    });
    getOfficeStatusOptionsAPI().then((res) => {
      setOfficeStatusData(res.data.data);
    });
    getTourStatusOptionsAPI(id).then((res) => {
      setTourStatusData(res.data.data);
    });
  }, []);

  useEffect(() => {
    if (idEdit) {
      getHolidayToEditAPI(idEdit).then((res) => {
        setHolidaySelected(res.data.data.holiday_id);
        setOfficeStatusSelected(res.data.data.office_status);
        setTourStatusSelected(res.data.data.tour_status);

        const from = res.data.data.from;
        const to = res.data.data.to;

        if (from && typeof from === "string" && from.includes(" ")) {
          setTimeFrameStart(from.split(" ")[1]);
        } else {
          setTimeFrameStart("AM");
        }

        if (to && typeof to === "string" && to.includes(" ")) {
          setTimeFrameEnd(to.split(" ")[1]);
        } else {
          setTimeFrameEnd("AM");
        }

        setDataEdit(res.data.data);
      });
    }
  }, [idEdit]);

  useEffect(() => {
    if (dataEdit && dataEdit.from && dataEdit.to) {
      const startTime = dataEdit.from.split(" ")[0];
      const endTime = dataEdit.to.split(" ")[0];
      setTimeFrameStart(dataEdit.from.split(" ")[1]);
      setTimeFrameEnd(dataEdit.to.split(" ")[1]);
      validationType.setFieldValue("start_time", startTime);
      validationType.setFieldValue("end_time", endTime);
    }
  }, [dataEdit]);

  const clearData = () => {
    setHolidaySelected(null);
    setOfficeStatusSelected(null);
    setTourStatusSelected(null);
    setIdEdit(null);
    setTimeFrameStart("AM");
    setTimeFrameEnd("AM");
    setDataEdit(null);
  };

  const validationType = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,
    initialValues: {
      start_time: "",
      end_time: "",
    },
    // validationSchema: Yup.object().shape({
    //   name: Yup.string().required("Name is required"),
    //   default_label: Yup.string().required("Default Label is required"),
    // }),
    onSubmit: (values) => {
      let data = {
        provider_id: id,
        holiday_id: holidaySelected,
        from: `${values.start_time} ${timeFrameStart}`,
        to: `${values.end_time} ${timeFrameEnd}`,
        office_status: officeStatusSelected,
        tour_status: tourStatusSelected,
      };

      if (idEdit) {
        updateHoliday(idEdit, data)
          .then((res) => {
            if (res.data.status === 200) {
              Swal.fire({
                icon: "success",
                title: "Success",
                text: "Holiday Edited Successfully",
              });
              refresh();
              clearData();
              setHolidaysModalCreate(false);
            } else {
              Swal.fire({
                icon: "error",
                title: "Error",
                text: res.data.message,
              });
            }
          })
          .catch((err) => {
            console.log(err);
            Swal.fire({
              icon: "error",
              title: "Error",
              text: err.response.data.message,
            });
          });
      } else {
        createHolidayPolicy(data)
          .then((res) => {
            if (res.data.status === 201) {
              Swal.fire({
                icon: "success",
                title: "Success",
                text: "Holiday Created Successfully",
              });
              refresh();
              clearData();
              setHolidaysModalCreate(false);
            } else {
              Swal.fire({
                icon: "error",
                title: "Error",
                text: res.data.message,
              });
            }
          })
          .catch((err) => {
            console.log(err);
            Swal.fire({
              icon: "error",
              title: "Error",
              text: err.response.data.message,
            });
          });
      }
    },
  });
  return (
    <Modal
      centered
      size="xl"
      isOpen={holidaysModalCreate}
      toggle={() => {
        setHolidaysModalCreate();
        clearData();
      }}
    >
      <div
        className="modal-header"
        style={{ backgroundColor: "#3DC7F4", border: "none" }}
      >
        <h1 className="modal-title mt-0 text-white">+ Add Holiday Schedule</h1>
        {/* {
          contactID === false ? (
            <h1 className="modal-title mt-0 text-white">+ Add Cancellation Policy</h1>
          ):(<h1 className="modal-title mt-0 text-white">Edit Cancellation Policy</h1>)
        } */}
        <button
          onClick={() => {
            setHolidaysModalCreate(false);
            clearData();
          }}
          type="button"
          className="close"
          data-dismiss="modal"
          aria-label="Close"
        >
          <span aria-hidden="true" style={{ color: "white" }}>
            &times;
          </span>
        </button>
      </div>
      <div className="modal-body p-4">
        <Form
          onSubmit={(e) => {
            e.preventDefault();
            validationType.handleSubmit();
          }}
          className="custom-validation"
        >
          <Row className=" d-flex justify-content-between pb-4 ">
            <Col className="col-md-12">
              <img src={CancellationBanner} alt="image1" className="w-100" />
            </Col>
          </Row>
          <Row>
            <Col className="col-4">
              <div className="d-flex justify-content-between">
                <Label className="form-label">Holiday</Label>
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
                  setHolidaySelected(+e.target.value);
                }}
                //   value={validationType.values.department || ""}
              >
                <option value={null}>Select....</option>
                {map(holidayData, (item, index) => {
                  return (
                    <option
                      key={index}
                      value={item.id}
                      selected={
                        dataEdit ? item.id === dataEdit.holiday_id : false
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
                <Label className="form-label">Tours</Label>
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
                  setTourStatusSelected(+e.target.value);
                }}
                //   value={validationType.values.department || ""}
              >
                <option value={null}>Select....</option>
                {map(tourStatusData, (item, index) => {
                  return (
                    <option
                      key={index}
                      value={item.id}
                      selected={
                        dataEdit ? item.id === dataEdit.tour_status : false
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
                <Label className="form-label">Office</Label>
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
                  setOfficeStatusSelected(+e.target.value);
                }}
                //   value={validationType.values.department || ""}
              >
                <option value={null}>Select....</option>
                {map(officeStatusData, (item, index) => {
                  return (
                    <option
                      key={index}
                      value={item.id}
                      selected={
                        dataEdit ? item.id === dataEdit.office_status : false
                      }
                    >
                      {item.name}
                    </option>
                  );
                })}
              </Input>
            </Col>
            {officeStatusSelected === 1 ? (
              <>
                <Col className="col-2">
                  <div className="d-flex justify-content-between">
                    <Label className="form-label">Available Schedule</Label>
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
                  <div className="input-group">
                    <Input
                      name="start_time"
                      className="form-control"
                      type="text"
                      onChange={validationType.handleChange}
                      onBlur={validationType.handleBlur}
                      value={validationType.values.start_time || ""}
                      invalid={
                        validationType.touched.start_time &&
                        validationType.errors.start_time
                          ? true
                          : false
                      }
                    />

                    <Input
                      type="select"
                      name=""
                      onChange={(e) => {
                        setTimeFrameStart(e.target.value);
                      }}
                      onBlur={validationType.handleBlur}
                    >
                      <option
                        value={"AM"}
                        selected={timeFrameStart === "AM" ? true : false}
                      >
                        AM
                      </option>
                      <option
                        value={"PM"}
                        selected={timeFrameStart === "PM" ? true : false}
                      >
                        PM
                      </option>
                    </Input>
                  </div>
                </Col>
                <Col className="col-2">
                  <div className="input-group" style={{ marginTop: "30px" }}>
                    <Input
                      name="end_time"
                      className="form-control"
                      type="text"
                      onChange={validationType.handleChange}
                      onBlur={validationType.handleBlur}
                      value={validationType.values.end_time || ""}
                      invalid={
                        validationType.touched.end_time &&
                        validationType.errors.end_time
                          ? true
                          : false
                      }
                    />
                    <Input
                      type="select"
                      name=""
                      onChange={(e) => {
                        setTimeFrameEnd(e.target.value);
                      }}
                      onBlur={validationType.handleBlur}
                    >
                      <option
                        value={"AM"}
                        selected={timeFrameEnd === "AM" ? true : false}
                      >
                        AM
                      </option>
                      <option
                        value={"PM"}
                        selected={timeFrameEnd === "PM" ? true : false}
                      >
                        PM
                      </option>
                    </Input>
                  </div>
                </Col>
              </>
            ) : null}
          </Row>
          <Row className="mt-2">
            <Col className="col-12 mt-4 d-flex justify-content-end">
              <Button
                color="paradise"
                outline
                className="waves-effect waves-light mb-3 btn col-2 mx-2"
                type="button"
                onClick={() => {
                  clearData();
                  setHolidaysModalCreate(false);
                }}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                style={{ backgroundColor: "#F6851F", border: "none" }}
                className="waves-effect waves-light mb-3 btn btn-success mx-1 col-2"
              >
                Save
              </Button>
            </Col>
          </Row>
        </Form>
      </div>
    </Modal>
  );
};

export default HolidaysModal;
