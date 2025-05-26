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
import CancellationBanner from "../../../../../../Components/Assets/images/CancellationBanner.png";
import {
  createNoShowPolicy,
  getBaseOnOptionsAPI,
  getPaymentOptionsAPI,
  getPolicyToEditAPI,
  updateCancellationPolicy,
} from "../../../../../../Utils/API/Providers";

const NoShowPolicyModal = ({
  noShowPolicyModalAction,
  setNoShowPolicyModalAction,
  refresh,
  idEdit,
  setIdEdit,
}) => {
  const { id } = useParams();

  //initial request
  const [baseOnData, setBaseOnData] = useState([]);
  const [paymentOptionData, setPaymentOptionData] = useState([]);
  const [baseOnSelected, setBaseOnSelected] = useState(null);
  const [paymentOptionSelected, setPaymentOptionSelected] = useState(null);
  const [dataEdit, setDataEdit] = useState(null);
  useEffect(() => {
    getBaseOnOptionsAPI().then((res) => {
      setBaseOnData(res.data.data);
    });
    getPaymentOptionsAPI().then((res) => {
      setPaymentOptionData(res.data.data);
    });
  }, []);

  //edit request
  useEffect(() => {
    if (idEdit) {
      getPolicyToEditAPI(idEdit).then((res) => {
        setPaymentOptionSelected(res.data.data.payment_option_id);
        setBaseOnSelected(res.data.data.based_on_id);
        setDataEdit(res.data.data);
      });
    }
  }, [idEdit]);

  const clearData = () => {
    setPaymentOptionSelected(null);
    setBaseOnSelected(null);
    setDataEdit(null);
    setIdEdit(null);
  };

  const validationType = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,
    initialValues: {
      amount: dataEdit ? dataEdit.amount : "",
    },
    // validationSchema: Yup.object().shape({
    //   name: Yup.string().required("Name is required"),
    //   default_label: Yup.string().required("Default Label is required"),
    // }),
    onSubmit: (values) => {
      let data = {
        provider_id: id,
        payment_option_id: paymentOptionSelected,
        amount: values.amount,
        based_on_id: baseOnSelected,
      };

      if (idEdit) {
        updateCancellationPolicy(idEdit, data)
          .then((res) => {
            if (res.data.status === 200) {
              Swal.fire({
                icon: "success",
                title: "Success",
                text: "No Show Policy Edited Successfully",
              });
              refresh();
              clearData();
              setNoShowPolicyModalAction(false);
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
        createNoShowPolicy(data)
          .then((res) => {
            if (res.data.status === 201) {
              Swal.fire({
                icon: "success",
                title: "Success",
                text: "Cancellation Policy Created Successfully",
              });
              refresh();
              clearData();
              setNoShowPolicyModalAction(false);
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
      isOpen={noShowPolicyModalAction}
      toggle={() => {
        setNoShowPolicyModalAction();
        clearData();
      }}
    >
      <div
        className="modal-header"
        style={{ backgroundColor: "#3DC7F4", border: "none" }}
      >
        <h1 className="modal-title mt-0 text-white">+ No Show Policy</h1>
        {/* {
          contactID === false ? (
            <h1 className="modal-title mt-0 text-white">+ Add Cancellation Policy</h1>
          ):(<h1 className="modal-title mt-0 text-white">Edit Cancellation Policy</h1>)
        } */}
        <button
          onClick={() => {
            clearData();
            setNoShowPolicyModalAction(false);
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
            <Col className="col-5">
              <div className="d-flex justify-content-between">
                <Label className="form-label">Payment Option</Label>
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
                  setPaymentOptionSelected(+e.target.value);
                }}
                onBlur={validationType.handleBlur}
                //   value={validationType.values.department || ""}
              >
                <option value={null}>Select....</option>
                {map(paymentOptionData, (item, index) => {
                  return (
                    <option
                      key={index}
                      value={item.id}
                      selected={
                        dataEdit
                          ? item.id === dataEdit.payment_option_id
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
              <div className="form-outline mb-2" id="eff_rate">
                <div className="d-flex justify-content-between">
                  <Label className="form-label">Amount</Label>
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
                  {paymentOptionSelected === 2 ? (
                    <span
                      className="input-group-text form-label fw-bold bg-paradise text-white border-0"
                      id="basic-addon1"
                      style={{ fontSize: "0.85em" }}
                    >
                      $
                    </span>
                  ) : null}
                  <Input
                    name="amount"
                    placeholder=""
                    type="text"
                    onChange={validationType.handleChange}
                    value={validationType.values.amount || ""}
                    invalid={
                      validationType.touched.amount &&
                      validationType.errors.amount
                        ? true
                        : false
                    }
                  />
                  {validationType.touched.amount &&
                  validationType.errors.amount ? (
                    <FormFeedback type="invalid">
                      {validationType.errors.amount}
                    </FormFeedback>
                  ) : null}
                  {paymentOptionSelected === 1 ? (
                    <span
                      className="input-group-text form-label fw-bold bg-paradise text-white border-0"
                      id="basic-addon1"
                      style={{ fontSize: "0.85em" }}
                    >
                      %
                    </span>
                  ) : null}
                </div>
              </div>
            </Col>
            {paymentOptionSelected !== 2 ? (
              <Col className="col-5">
                <div className="d-flex justify-content-between">
                  <Label className="form-label">Based on</Label>
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
                    setBaseOnSelected(+e.target.value);
                  }}
                  onBlur={validationType.handleBlur}
                  //   value={validationType.values.department || ""}
                >
                  <option value={null}>Select....</option>
                  {map(baseOnData, (item, index) => {
                    return (
                      <option
                        key={index}
                        value={item.id}
                        selected={
                          dataEdit ? item.id === dataEdit.based_on_id : false
                        }
                      >
                        {item.name}
                      </option>
                    );
                  })}
                </Input>
              </Col>
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
                  setNoShowPolicyModalAction(false);
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

export default NoShowPolicyModal;
