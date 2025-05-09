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
  createCancellationPolicy,
  createPaymentGroupPolicy,
  getPaymentCollectOptionsAPI,
  getPaymentGroupSizeOptionsAPI,
  getPaymentPayOptionsAPI,
  getPaymentPolicyToEditAPI,
  getPolicyToEditAPI,
  updateCancellationPolicy,
  updatePaymentGroupPolicy,
} from "../../../../../../Utils/API/Providers";

const PaymentPolicyModal = ({
  paymentPolicyModalAction,
  setPaymentPolicyModalAction,
  refresh,
  idEdit,
  setIdEdit,
}) => {
  const { id } = useParams();

  //initial request
  const [groupSizeData, setGroupSizeData] = useState([]);
  const [collectData, setCollectData] = useState([]);
  const [payData, setPayData] = useState([]);
  const [groupSizeSelected, setGroupSizeSelected] = useState(null);
  const [collectSelected, setCollectSelected] = useState(null);
  const [paySelected, setPaySelected] = useState(null);
  const [dataEdit, setDataEdit] = useState(null);

  useEffect(() => {
    getPaymentGroupSizeOptionsAPI().then((res) => {
      setGroupSizeData(res.data.data);
    });
    getPaymentCollectOptionsAPI().then((res) => {
      setCollectData(res.data.data);
    });
    getPaymentPayOptionsAPI().then((res) => {
      setPayData(res.data.data);
    });
  }, []);

  //edit request
  useEffect(() => {
    if (idEdit) {
      getPaymentPolicyToEditAPI(idEdit).then((res) => {
        setGroupSizeSelected(res.data.data.group_size_id);
        setCollectSelected(res.data.data.collect_id);
        setPaySelected(res.data.data.pay_id);
        setDataEdit(res.data.data);
      });
    }
  }, [idEdit]);

  const clearData = () => {
    setGroupSizeSelected(null);
    setCollectSelected(null);
    setPaySelected(null);
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
        group_size_id: groupSizeSelected,
        collect_id: collectSelected,
        pay_id: paySelected,
        groups: 1,
      };
      if (idEdit) {
        updatePaymentGroupPolicy(idEdit, data)
          .then((res) => {
            if (res.data.status === 200) {
              Swal.fire({
                icon: "success",
                title: "Success",
                text: "Payment Policy Edited Successfully",
              });
              refresh();
              clearData();
              setPaymentPolicyModalAction(false);
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
        createPaymentGroupPolicy(data)
          .then((res) => {
            if (res.data.status === 201) {
              Swal.fire({
                icon: "success",
                title: "Success",
                text: "Payment Policy Created Successfully",
              });
              refresh();
              clearData();
              setPaymentPolicyModalAction(false);
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
      isOpen={paymentPolicyModalAction}
      toggle={() => {
        setPaymentPolicyModalAction(!paymentPolicyModalAction);
        clearData();
      }}
    >
      <div
        className="modal-header"
        style={{ backgroundColor: "#3DC7F4", border: "none" }}
      >
        <h1 className="modal-title mt-0 text-white">+ Add Payment Policy</h1>
        {/* {
          contactID === false ? (
            <h1 className="modal-title mt-0 text-white">+ Add Cancellation Policy</h1>
          ):(<h1 className="modal-title mt-0 text-white">Edit Cancellation Policy</h1>)
        } */}
        <button
          onClick={() => {
            setPaymentPolicyModalAction(!paymentPolicyModalAction);
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
                <Label className="form-label">Group Size</Label>
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
                  setGroupSizeSelected(+e.target.value);
                }}
                onBlur={validationType.handleBlur}
                //   value={validationType.values.department || ""}
              >
                <option value={null}>Select....</option>
                {map(groupSizeData, (item, index) => {
                  return (
                    <option
                      key={index}
                      value={item.id}
                      selected={
                        dataEdit ? item.id === dataEdit.group_size_id : false
                      }
                    >
                      {item.option}
                    </option>
                  );
                })}
              </Input>
            </Col>
            <Col className="col-4">
              <div className="d-flex justify-content-between">
                <Label className="form-label">Collect</Label>
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
                  setCollectSelected(+e.target.value);
                }}
                onBlur={validationType.handleBlur}
                //   value={validationType.values.department || ""}
              >
                <option value={null}>Select....</option>
                {map(collectData, (item, index) => {
                  return (
                    <option
                      key={index}
                      value={item.id}
                      selected={
                        dataEdit ? item.id === dataEdit.collect_id : false
                      }
                    >
                      {item.option}
                    </option>
                  );
                })}
              </Input>
            </Col>
            <Col className="col-4">
              <div className="d-flex justify-content-between">
                <Label className="form-label">Pay</Label>
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
                  setPaySelected(+e.target.value);
                }}
                onBlur={validationType.handleBlur}
                //   value={validationType.values.department || ""}
              >
                <option value={null}>Select....</option>
                {map(payData, (item, index) => {
                  return (
                    <option
                      key={index}
                      value={item.id}
                      selected={dataEdit ? item.id === dataEdit.pay_id : false}
                    >
                      {item.option}
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
                  setPaymentPolicyModalAction(false);
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

export default PaymentPolicyModal;
