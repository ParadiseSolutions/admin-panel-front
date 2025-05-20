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
import axios from "axios";
import { useFormik } from "formik";
import Swal from "sweetalert2";
import { map } from "lodash";
import { useParams } from "react-router-dom";
import CancellationBanner from "../../../../Components/Assets/images/CancellationBanner.png";
import {
  getChannelOCAPI,
  getContactNameOCAPI,
  getContactTypeOCAPI,
  getDocumentEditGroupsAPI,
  getDocumentTypeGroupsAPI,
  getUrgentAssistanceOCAPI,
  postContacts,
  updatedocumentGroup,
} from "../../../../Utils/API/Providers";
import { API_URL, imagesOptions } from "../../../../Utils/API";

const OperationalContactModal = ({
  operationalContactAction,
  setOperationalContactAction,
  refreshData,
  idEdit,
  setIdEdit,
}) => {
  const { id } = useParams();

  //initial request
  const [documentTypeData, setDocumentTypeData] = useState([]);
  const [dataEdit, setDataEdit] = useState(null);
  const [documentTypeSelected, setDocumentTypeSelected] = useState(null);
  const [fileId, setFileId] = useState(null);
  const [availableTimeFrameStart, setAvailableTimeFrameStart] = useState("AM");
  const [availableTimeFrameEnd, setAvailableTimeFrameEnd] = useState("AM");
  const [urgentTimeFrameStart, setUrgentTimeFrameStart] = useState("AM");
  const [urgentTimeFrameEnd, setUrgentTimeFrameEnd] = useState("AM");
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
    if (idEdit) {
      getDocumentEditGroupsAPI(idEdit)
        .then((res) => {
          setDataEdit(res.data.data);
          setDocumentTypeSelected(res.data.data.type_id);
          setFileId(res.data.data.id);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [idEdit]);

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
    setIdEdit(null);
  };

  const validationType = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,
    initialValues: {},
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
        available_from: values.available_schedule_start,
        available_to: values.available_schedule_end,
        urgent_assistance: urgentAssistanceSelected === 1 ? true : false,
        urgent_from: values.urgent_start_time,
        urgent_to: values.urgent_end_time,
      };
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
        <h1 className="modal-title mt-0 text-white">+ Add Document</h1>
        {/* {
          contactID === false ? (
            <h1 className="modal-title mt-0 text-white">+ Add Cancellation Policy</h1>
          ):(<h1 className="modal-title mt-0 text-white">Edit Cancellation Policy</h1>)
        } */}
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
                      selected={dataEdit ? item.id === dataEdit.type_id : false}
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
                      selected={dataEdit ? item.id === dataEdit.type_id : false}
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
                      selected={dataEdit ? item.id === dataEdit.type_id : false}
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
                  onChange={validationType.handleChange}
                  onBlur={validationType.handleBlur}
                  value={validationType.values.available_schedule_start || ""}
                  invalid={
                    validationType.touched.available_schedule_start &&
                    validationType.errors.available_schedule_start
                      ? true
                      : false
                  }
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
                  onChange={validationType.handleChange}
                  onBlur={validationType.handleBlur}
                  value={validationType.values.available_schedule_end || ""}
                  invalid={
                    validationType.touched.available_schedule_end &&
                    validationType.errors.available_schedule_end
                      ? true
                      : false
                  }
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
                      selected={dataEdit ? item.id === dataEdit.type_id : false}
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
                  onChange={validationType.handleChange}
                  onBlur={validationType.handleBlur}
                  value={validationType.values.urgent_start_time || ""}
                  disabled={urgentAssistanceSelected === 0 ? true : false}
                  invalid={
                    validationType.touched.urgent_start_time &&
                    validationType.errors.urgent_start_time
                      ? true
                      : false
                  }
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
                  onChange={validationType.handleChange}
                  onBlur={validationType.handleBlur}
                  value={validationType.values.urgent_end_time || ""}
                  disabled={urgentAssistanceSelected === 0 ? true : false}
                  invalid={
                    validationType.touched.urgent_end_time &&
                    validationType.errors.urgent_end_time
                      ? true
                      : false
                  }
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
                  setIdEdit(null);
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
