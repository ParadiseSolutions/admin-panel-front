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
  Modal,
} from "reactstrap";
import { useFormik } from "formik";
import Swal from "sweetalert2";
import { map } from "lodash";
import { useParams } from "react-router-dom";
import CancellationBanner from "../../../../Components/Assets/images/CancellationBanner.png";
import {
  getChannelOCAPI,
  getContactAPI,
  getContactNameOCAPI,
  getContactTypeOCAPI,
  getUrgentAssistanceOCAPI,
  postContacts,
  putContacts,
} from "../../../../Utils/API/Providers";

const OperationalContactModal = ({
  operationalContactAction,
  setOperationalContactAction,
  refreshData,
  editData,
  setIdEdit,
}) => {
  const { id } = useParams();
  //initial request
  const [dataEdit, setDataEdit] = useState(null);
  const [contactTypeData, setContactTypeData] = useState([]);
  const [contactTypeSelected, setContactTypeSelected] = useState(null);
  const [contactNameData, setContactNameData] = useState([]);
  const [contactNameSelected, setContactNameSelected] = useState(null);
  const [channelsData, setChannelsData] = useState([]);
  const [channelsSelected, setChannelsSelected] = useState(null);
  const [urgentAssistanceData, setUrgentAssistanceData] = useState([]);
  const [urgentAssistanceSelected, setUrgentAssistanceSelected] =
    useState(null);
  const [contactInfo, setContactInfo] = useState(null);

  const [asStart, setAsStart] = useState("");
  const [availableTimeFrameStart, setAvailableTimeFrameStart] = useState("AM");
  const [asEnd, setAsEnd] = useState("");
  const [availableTimeFrameEnd, setAvailableTimeFrameEnd] = useState("AM");
  const [usStart, setUsStart] = useState("");
  const [urgentTimeFrameStart, setUrgentTimeFrameStart] = useState("AM");
  const [usEnd, setUsEnd] = useState("");
  const [urgentTimeFrameEnd, setUrgentTimeFrameEnd] = useState("AM");

  useEffect(() => {
    getContactTypeOCAPI().then((res) => {
      setContactTypeData(res.data.data);
    });
    getContactNameOCAPI(id).then((res) => {
      setContactNameData(res.data.data);
    });
    getChannelOCAPI().then((res) => {
      setChannelsData(res.data.data);
    });
    getUrgentAssistanceOCAPI().then((res) => {
      setUrgentAssistanceData(res.data.data);
    });
  }, [id]);

  //edit request
  useEffect(() => {
    getContactAPI(editData).then((resp) => {
      setDataEdit(resp.data.data);
    });
  }, [editData]);

  useEffect(() => {
    if (dataEdit) {
      if (dataEdit.available_from) {
        let available_from_time = dataEdit.available_from.split(" ");
        setAsStart(available_from_time[0]);
        setAvailableTimeFrameStart(available_from_time[1]);
      }
      if (dataEdit.available_to) {
        let available_to_time = dataEdit.available_to.split(" ");
        setAsEnd(available_to_time[0]);
        setAvailableTimeFrameEnd(available_to_time[1]);
      }
      if (dataEdit.urgent_from) {
        let urgent_from_time = dataEdit.urgent_from.split(" ");
        setUsStart(urgent_from_time[0]);
        setUrgentTimeFrameStart(urgent_from_time[1]);
      }
      if (dataEdit.urgent_to) {
        let urgent_to_time = dataEdit.urgent_to.split(" ");
        setUsEnd(urgent_to_time[0]);
        setUrgentTimeFrameEnd(urgent_to_time[1]);
      }
      setContactTypeSelected(dataEdit.contact_type_id);
      setContactNameSelected(dataEdit.contact_id);
      setChannelsSelected(dataEdit.channel_id);
      setUrgentAssistanceSelected(dataEdit.urgent_assistance);
      setContactInfo(dataEdit.contact);
    }
  }, [dataEdit]);

  //contact info data
  useEffect(() => {
    if (contactNameSelected) {
      const selectedContact = contactNameData.find(
        (contact) => contact.id === contactNameSelected
      );
      if (selectedContact) {
        selectedContact.channels.forEach((channel) => {
          if (channel.id === channelsSelected) {
            setContactInfo(channel.default);
          }
        });
      }
    }
  }, [contactNameSelected, contactNameData, channelsSelected]);

  const clearData = () => {
    setDataEdit(null);
    setContactTypeSelected(null);
    setContactNameSelected(null);
    setChannelsSelected(null);
    setUrgentAssistanceSelected(null);
    setContactInfo(null);
    setAsStart(null);
    setAvailableTimeFrameStart(null);
    setAsEnd(null);
    setAvailableTimeFrameEnd(null);
    setUsStart(null);
    setUrgentTimeFrameStart(null);
    setUsEnd(null);
    setUrgentTimeFrameEnd(null);
  };

  const validationType = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,
    initialValues: {
      // available_schedule_start: dataEdit ? dataEdit.available_from : "",
      // available_schedule_end: dataEdit ? dataEdit.available_to : "",
      // urgent_start_time: dataEdit ? dataEdit.urgent_from : "",
      // urgent_end_time: dataEdit ? dataEdit.urgent_to : "",
    },
    // validationSchema: Yup.object().shape({
    //   name: Yup.string().required("Name is required"),
    //   default_label: Yup.string().required("Default Label is required"),
    // }),
    onSubmit: (values) => {
      let data = {
        provider_id: id,
        contact_id: contactNameSelected,
        channel_id: channelsSelected,
        contact: contactInfo,
        contact_type_id: contactTypeSelected,
        available_from:
          asStart !== "" ? `${asStart} ${availableTimeFrameStart}` : "",
        available_to: asEnd !== "" ? `${asEnd} ${availableTimeFrameEnd}` : "",
        urgent_assistance: urgentAssistanceSelected === 1 ? true : false,
        urgent_from:
          urgentAssistanceSelected === 1
            ? `${usStart} ${urgentTimeFrameStart}`
            : "",
        urgent_to:
          urgentAssistanceSelected === 1
            ? `${usEnd} ${urgentTimeFrameEnd}`
            : "",
      };

      if (editData) {
        putContacts(editData, data)
          .then((res) => {
            if (res.data.status === 200) {
              Swal.fire({
                icon: "success",
                title: "Success",
                text: "Contact Created Successfully",
              });
              refreshData();
              clearData();
              setOperationalContactAction(false);
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
        postContacts(data)
          .then((res) => {
            if (res.data.status === 201) {
              Swal.fire({
                icon: "success",
                title: "Success",
                text: "Contact Created Successfully",
              });
              refreshData();
              clearData();
              setOperationalContactAction(false);
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
      isOpen={operationalContactAction}
      toggle={() => {
        setOperationalContactAction(!operationalContactAction);
        clearData();
      }}
    >
      <div
        className="modal-header"
        style={{ backgroundColor: "#3DC7F4", border: "none" }}
      >
        {editData ? (
          <h1 className="modal-title mt-0 text-white">+ Edit Document</h1>
        ) : (
          <h1 className="modal-title mt-0 text-white">+ Add Document</h1>
        )}

        <button
          onClick={() => {
            setOperationalContactAction(!operationalContactAction);
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
            <Col className="col-3">
              <div className="d-flex justify-content-between">
                <Label className="form-label">Contact Type</Label>
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
                  setContactTypeSelected(+e.target.value);
                }}
                onBlur={validationType.handleBlur}
                //   value={validationType.values.department || ""}
              >
                <option value={null}>Select....</option>
                {map(contactTypeData, (item, index) => {
                  return (
                    <option
                      key={index}
                      value={item.id}
                      selected={
                        dataEdit ? item.id === dataEdit.contact_type_id : false
                      }
                    >
                      {item.name}
                    </option>
                  );
                })}
              </Input>
            </Col>
            <Col className="col-3">
              <div className="d-flex justify-content-between">
                <Label className="form-label">Contact Name</Label>
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
                  setContactNameSelected(+e.target.value);
                }}
                onBlur={validationType.handleBlur}
                //   value={validationType.values.department || ""}
              >
                <option value={null}>Select....</option>
                {map(contactNameData, (item, index) => {
                  return (
                    <option
                      key={index}
                      value={item.id}
                      selected={
                        dataEdit ? item.id === dataEdit.contact_id : false
                      }
                    >
                      {item.name}
                    </option>
                  );
                })}
              </Input>
            </Col>
            <Col className="col-3">
              <div className="d-flex justify-content-between">
                <Label className="form-label">Channel</Label>
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
                  setChannelsSelected(+e.target.value);
                }}
                onBlur={validationType.handleBlur}
                //   value={validationType.values.department || ""}
              >
                <option value={null}>Select....</option>
                {map(channelsData, (item, index) => {
                  return (
                    <option
                      key={index}
                      value={item.id}
                      selected={
                        dataEdit ? item.id === dataEdit.channel_id : false
                      }
                    >
                      {item.name}
                    </option>
                  );
                })}
              </Input>
            </Col>
            <Col className="col-3">
              <div className="d-flex justify-content-between">
                <Label className="form-label">Contact</Label>
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
                name="contact"
                className="form-control"
                type="text"
                onChange={(e) => {
                  setContactInfo(e.target.value);
                }}
                value={contactInfo || ""}
              />
            </Col>
          </Row>
          <Row className="mt-5">
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
                  name="available_schedule_start"
                  className="form-control"
                  type="text"
                  onChange={(e) => setAsStart(e.target.value)}
                  value={asStart || ""}
                />

                <Input
                  type="select"
                  name=""
                  onChange={(e) => {
                    setAvailableTimeFrameStart(e.target.value);
                  }}
                  onBlur={validationType.handleBlur}
                >
                  <option
                    value={"AM"}
                    selected={availableTimeFrameStart === "AM" ? true : false}
                  >
                    AM
                  </option>
                  <option
                    value={"PM"}
                    selected={availableTimeFrameStart === "PM" ? true : false}
                  >
                    PM
                  </option>
                </Input>
              </div>
            </Col>
            <Col className="col-2">
              <div className="input-group" style={{ marginTop: "30px" }}>
                <Input
                  name="available_schedule_end"
                  className="form-control"
                  type="text"
                  onChange={(e) => setAsEnd(e.target.value)}
                  value={asEnd || ""}
                />
                <Input
                  type="select"
                  name=""
                  onChange={(e) => {
                    setAvailableTimeFrameEnd(e.target.value);
                  }}
                  onBlur={validationType.handleBlur}
                >
                  <option
                    value={"AM"}
                    selected={availableTimeFrameEnd === "AM" ? true : false}
                  >
                    AM
                  </option>
                  <option
                    value={"PM"}
                    selected={availableTimeFrameEnd === "PM" ? true : false}
                  >
                    PM
                  </option>
                </Input>
              </div>
            </Col>
            <Col className="col-3">
              <div className="d-flex justify-content-between">
                <Label className="form-label">Urgent Assistance</Label>
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
                  setUrgentAssistanceSelected(+e.target.value);
                }}
                onBlur={validationType.handleBlur}
                //   value={validationType.values.department || ""}
              >
                <option value={null}>Select....</option>
                {map(urgentAssistanceData, (item, index) => {
                  return (
                    <option
                      key={index}
                      value={item.id}
                      selected={
                        dataEdit
                          ? item.id === dataEdit.urgent_assistance
                          : false
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
                  name="urgent_start_time"
                  className="form-control"
                  type="text"
                  onChange={(e) => setUsStart(e.target.value)}
                  value={usStart || ""}
                  disabled={urgentAssistanceSelected === 0 ? true : false}
                />

                <Input
                  type="select"
                  name=""
                  onChange={(e) => {
                    setUrgentTimeFrameStart(e.target.value);
                  }}
                  onBlur={validationType.handleBlur}
                  disabled={urgentAssistanceSelected === 0 ? true : false}
                >
                  <option
                    value={"AM"}
                    selected={urgentTimeFrameStart === "AM" ? true : false}
                  >
                    AM
                  </option>
                  <option
                    value={"PM"}
                    selected={urgentTimeFrameStart === "PM" ? true : false}
                  >
                    PM
                  </option>
                </Input>
              </div>
            </Col>
            <Col className="col-2">
              <div className="input-group" style={{ marginTop: "30px" }}>
                <Input
                  name="urgent_end_time"
                  className="form-control"
                  type="text"
                  onChange={(e) => setUsEnd(e.target.value)}
                  value={usEnd || ""}
                  disabled={urgentAssistanceSelected === 0 ? true : false}
                />
                <Input
                  type="select"
                  name=""
                  onChange={(e) => {
                    setUrgentTimeFrameEnd(e.target.value);
                  }}
                  onBlur={validationType.handleBlur}
                  disabled={urgentAssistanceSelected === 0 ? true : false}
                >
                  <option
                    value={"AM"}
                    selected={urgentTimeFrameEnd === "AM" ? true : false}
                  >
                    AM
                  </option>
                  <option
                    value={"PM"}
                    selected={urgentTimeFrameEnd === "PM" ? true : false}
                  >
                    PM
                  </option>
                </Input>
              </div>
            </Col>
          </Row>
          <Row className="mt-2">
            <Col className="col-12 mt-4 d-flex justify-content-end">
              <Button
                color="paradise"
                outline
                className="waves-effect waves-light mb-3 btn col-2 mx-2"
                type="button"
                onClick={() => {
                  setOperationalContactAction(false);

                  clearData();
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

export default OperationalContactModal;
