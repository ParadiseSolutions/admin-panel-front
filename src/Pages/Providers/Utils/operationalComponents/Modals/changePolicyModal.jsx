// import { createPaymentTypeAPI } from "../../../../Utils/API/Payments";
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
import CancellationBanner from "../../../../../Components/Assets/images/CancellationBanner.png";
import {
  createChangePolicy,
  getActionOptionsAPI,
  getCancelledOptionsAPI,
  getPolicyToEditAPI,
  updateCancellationPolicy,
} from "../../../../../Utils/API/Providers";

const ChangePolicyModal = ({
  changePolicyModalAction,
  setChangePolicyModalAction,
  refresh,
  idEdit,
  setIdEdit,
}) => {
  const { id } = useParams();

  //initial request
  const [cancelledData, setCancelledData] = useState([]);
  const [actionData, setActionData] = useState([]);
  const [cancelledSelected, setCancelledSelected] = useState(null);
  const [actionSelected, setActionSelected] = useState(null);
  const [dataEdit, setDataEdit] = useState(null);
  useEffect(() => {
    getCancelledOptionsAPI().then((res) => {
      setCancelledData(res.data.data);
    });
    getActionOptionsAPI().then((res) => {
      setActionData(res.data.data);
    });
  }, []);

  //edit request
  useEffect(() => {
    if (idEdit) {
      getPolicyToEditAPI(idEdit).then((res) => {
        setCancelledSelected(res.data.data.ifcancel_id);
        setActionSelected(res.data.data.action_id);
        setDataEdit(res.data.data);
      });
    }
  }, [idEdit]);

  const clearData = () => {
    setCancelledSelected(null);
    setActionSelected(null);
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
        ifcancel_id: cancelledSelected,
        action_id: actionSelected,
      };
      if (idEdit) {
        updateCancellationPolicy(idEdit, data)
          .then((res) => {
            if (res.data.status === 200) {
              Swal.fire({
                icon: "success",
                title: "Success",
                text: "Change Policy Edited Successfully",
              });
              refresh();
              clearData()
              setChangePolicyModalAction(false);
              setIdEdit(null);
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
        createChangePolicy(data)
          .then((res) => {
            if (res.data.status === 201) {
              Swal.fire({
                icon: "success",
                title: "Success",
                text: "Change Policy Created Successfully",
              });
              refresh();
              clearData()
              setChangePolicyModalAction(false);
              setIdEdit(null);
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
      size="lg"
      isOpen={changePolicyModalAction}
      toggle={() => {
        setChangePolicyModalAction(!changePolicyModalAction);
        clearData();
      }}
    >
      <div
        className="modal-header"
        style={{ backgroundColor: "#3DC7F4", border: "none" }}
      >
        <h1 className="modal-title mt-0 text-white">+ Add Change Policy</h1>
        {/* {
          contactID === false ? (
            <h1 className="modal-title mt-0 text-white">+ Add Cancellation Policy</h1>
          ):(<h1 className="modal-title mt-0 text-white">Edit Cancellation Policy</h1>)
        } */}
        <button
          onClick={() => { clearData(); setChangePolicyModalAction(!changePolicyModalAction); }}
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
            <Col className="col-6">
              <div className="d-flex justify-content-between">
                <Label className="form-label">If Cancelled</Label>
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
                  setCancelledSelected(+e.target.value);
                }}
                onBlur={validationType.handleBlur}
                //   value={validationType.values.department || ""}
              >
                <option value={null}>Select....</option>
                {map(cancelledData, (item, index) => {
                  return (
                    <option
                      key={index}
                      value={item.id}
                      selected={
                        dataEdit ? item.id === dataEdit.ifcancel_id : false
                      }
                    >
                      {item.label}
                    </option>
                  );
                })}
              </Input>
            </Col>
            <Col className="col-6">
              <div className="d-flex justify-content-between">
                <Label className="form-label">Action</Label>
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
                  setActionSelected(+e.target.value);
                }}
                onBlur={validationType.handleBlur}
                //   value={validationType.values.department || ""}
              >
                <option value={null}>Select....</option>
                {map(actionData, (item, index) => {
                  return (
                    <option
                      key={index}
                      value={item.id}
                      selected={
                        dataEdit ? item.id === dataEdit.action_id : false
                      }
                    >
                      {item.label}
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
                  setChangePolicyModalAction(false);
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

export default ChangePolicyModal;
