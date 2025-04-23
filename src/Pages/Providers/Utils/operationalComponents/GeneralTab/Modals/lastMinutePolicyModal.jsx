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
  createLastMinutePolicy,
  getApplytoOptionsAPI,
  getNoticeOptionsAPI,
  getPolicyToEditAPI,
  getToursOptionsAPI,
  getTourStatusOptionsAPI,
  updateCancellationPolicy
} from "../../../../../../Utils/API/Providers";

const LastMinutePolicyModal = ({
  createLastMinutePolicyModalAction,
  setCreateLastMinutePolicyModalAction,
  refresh,
  idEdit,
  setIdEdit
}) => {
  const { id } = useParams();

  //initial request
  const [applyToData, setApplyToData] = useState([]);
  const [noticeData, setNoticeData] = useState([]);
  const [tourData, setTourData] = useState([]);
  const [applyToSelected, setApplyToSelected] = useState(null);
  const [selectToutSelected, setSelectTourSelected] = useState(null);
  const [sameDaySelected, setSameDaySelected] = useState(null);
  const [nextDaySelected, setNextDaySelected] = useState(null);
  const [noticeSelected, setNoticeSelected] = useState(null);
  const [dataEdit, setDataEdit] = useState(null);

  useEffect(() => {
    getApplytoOptionsAPI().then((res) => {
      setApplyToData(res.data.data);
    });
    getNoticeOptionsAPI().then((res) => {
      setNoticeData(res.data.data);
    });
    getToursOptionsAPI(id).then((res) => {
      setTourData(res.data.data);
    } );
  }, []);

    //edit request
    useEffect(() => {
      if (idEdit) {
        getPolicyToEditAPI(idEdit).then((res) => {
          setApplyToSelected(res.data.data.apply_to_id);
          setSameDaySelected(res.data.data.same_day);
          setNextDaySelected(res.data.data.next_day);
          setSelectTourSelected(res.data.data.tour_id);
          setNoticeSelected(res.data.data.notice_id);
          setDataEdit(res.data.data);
        });
      }
    }, [idEdit]);

    const clearData = () => {
      setApplyToSelected(null);
      setSelectTourSelected(null);
      setSameDaySelected(null);
      setNextDaySelected(null);
      setNoticeSelected(null);
      setDataEdit(null);
      setIdEdit(null);
    }

  const validationType = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,
    initialValues: {
      amount: "",
    },
    // validationSchema: Yup.object().shape({
    //   name: Yup.string().required("Name is required"),
    //   default_label: Yup.string().required("Default Label is required"),
    // }),
    onSubmit: (values) => {
      let data = {
        provider_id: id,
        apply_to_id: applyToSelected,
        tour_id: selectToutSelected,
        same_day: sameDaySelected,
        next_day: nextDaySelected,
        notice_id: noticeSelected,
      };

      if (idEdit) {
        updateCancellationPolicy(idEdit, data)
        .then((res) => {
          if (res.data.status === 200) {
            Swal.fire({
              icon: "success",
              title: "Success",
              text: "Last Minute Policy Edited Successfully",
            });
            refresh();
            clearData()
            setCreateLastMinutePolicyModalAction(false);
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
      }else{
        createLastMinutePolicy(data)
        .then((res) => {
          if (res.data.status === 201) {
            Swal.fire({
              icon: "success",
              title: "Success",
              text: "Last Minute Policy Created Successfully",
            });
            refresh();
            clearData()
            setCreateLastMinutePolicyModalAction(false);
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
      isOpen={createLastMinutePolicyModalAction}
      toggle={() => {
        setCreateLastMinutePolicyModalAction(!createLastMinutePolicyModalAction);
        clearData();
      }}
    >
      <div
        className="modal-header"
        style={{ backgroundColor: "#3DC7F4", border: "none" }}
      >
        <h1 className="modal-title mt-0 text-white">
          + Add Last Minute Booking Policy
        </h1>
        {/* {
          contactID === false ? (
            <h1 className="modal-title mt-0 text-white">+ Add Cancellation Policy</h1>
          ):(<h1 className="modal-title mt-0 text-white">Edit Cancellation Policy</h1>)
        } */}
        <button
          onClick={() => {clearData() ; setCreateLastMinutePolicyModalAction(false)}}
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
            <Col className="col-2">
              <div className="d-flex justify-content-between">
                <Label className="form-label">Apply to</Label>
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
                  setApplyToSelected(+e.target.value);
                }}
                onBlur={validationType.handleBlur}
                //   value={validationType.values.department || ""}
              >
                <option value={null}>Select....</option>
                {map(applyToData, (item, index) => {
                  return (
                    <option
                      key={index}
                      value={item.id}
                      selected={
                        dataEdit ? item.id === dataEdit.apply_to_id : false
                      }
                    >
                      {item.name}
                    </option>
                  );
                })}
              </Input>
            </Col>
            <Col className="col-4">
              <div className="d-flex justify-content-between">
                <Label className="form-label">Select Tour</Label>
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
                  setSelectTourSelected(+e.target.value);
                }}
                onBlur={validationType.handleBlur}
                //   value={validationType.values.department || ""}
              >
                <option value={null}>Select....</option>
                {map(tourData, (item, index) => {
                  return (
                    <option
                      key={index}
                      value={item.id}
                      selected={
                        dataEdit ? item.id === dataEdit.tour_id : false
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
                <Label className="form-label">Same Day</Label>
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
                  setSameDaySelected(e.target.value);
                }}
                onBlur={validationType.handleBlur}
                //   value={validationType.values.department || ""}
              >
                <option value={null}>Select....</option>
                <option value={"Yes"} selected={  dataEdit ? dataEdit.same_day === 'Yes' : false } >Yes</option>
                <option value={"No"} selected={  dataEdit ? dataEdit.same_day === 'No' : false } >No</option>
              </Input>
            </Col>
            <Col className="col-2">
              <div className="d-flex justify-content-between">
                <Label className="form-label">Next Day</Label>
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
                  setNextDaySelected(e.target.value);
                }}
                onBlur={validationType.handleBlur}
                //   value={validationType.values.department || ""}
              >
                <option value={null}>Select....</option>
                <option value={"Yes"} selected={  dataEdit ? dataEdit.next_day === 'Yes' : false }>Yes</option>
                <option value={"No"} selected={  dataEdit ? dataEdit.next_day === 'No' : false }>No</option>
              </Input>
            </Col>
            <Col className="col-2">
              <div className="d-flex justify-content-between">
                <Label className="form-label">Notice</Label>
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
                  setNoticeSelected(+e.target.value);
                }}
                onBlur={validationType.handleBlur}
                //   value={validationType.values.department || ""}
              >
                <option value={null}>Select....</option>
                {map(noticeData, (item, index) => {
                  return (
                    <option
                      key={index}
                      value={item.id}
                      selected={
                        dataEdit ? item.id === dataEdit.notice_id : false
                      }
                    >
                      {item.name}
                    </option>
                  );
                })}
              </Input>
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
                  setCreateLastMinutePolicyModalAction(false);
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

export default LastMinutePolicyModal;
