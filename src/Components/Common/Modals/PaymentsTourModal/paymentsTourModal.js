import { useEffect, useState } from "react";
import { map } from "lodash";
import {
  Row,
  Col,
  Modal,
  Label,
  Input,
  Form,
  Button,
  Tooltip,
} from "reactstrap";

import { useFormik } from "formik";
import Swal from "sweetalert2";
import { postPaymentsNewAPI, putPaymentsAPI } from "../../../../Utils/API/Tours";
const PaymentsToursModal = ({
  setPaymentsAdd,
  paymentsAdd,
  gratuitesTypeData,
  basedOnData,
  taxData,
  gratuitesData,
  paymentsTypeData,
  paymentsOptionsData,
  paidByData,
  methodData,
  dueData,
  whenData,
  eventData,
  dataEdit,
  id,
  initialRequest
}) => {
  const [taxSelected, setTaxSelected] = useState([]);
  const [gratuitesSelected, setGratuitesSelected] = useState([]);
  const [gratuitesTypeSelected, setGratuitesTypeSelected] = useState([]);
  const [basedOnSelected, setBasedOnSelected] = useState([]);
  const [paymentOptionSelected, setPaymentOptionSelected] = useState([]);
  const [paidBySelected, setPaidBySelected] = useState([]);
  const [methodSelected, setMethodSelected] = useState([]);
  const [dueSelected, setDueSelected] = useState([]);
  const [whenSelected, setWhenSelected] = useState([]);
  const [eventSelected, setEventSelected] = useState([]);

  useEffect(() => {
    if (dataEdit) {
      setGratuitesTypeSelected(dataEdit.payment_type_id);
      setPaymentOptionSelected(dataEdit.payment_option_id);
      setBasedOnSelected(dataEdit.based_on_id);
      setTaxSelected(dataEdit.tax_id);
      setGratuitesSelected(dataEdit.gratuity_id);
      setPaidBySelected(dataEdit.paid_by_id);
      setMethodSelected(dataEdit.payment_method_id);
      setDueSelected(dataEdit.payment_due_id);
      setWhenSelected(dataEdit.when_id);
      setEventSelected(dataEdit.payment_event_id);
    }
  }, [dataEdit]);

  const validationType = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,
    initialValues: {
      gratuity_percentage: dataEdit.amount ? dataEdit.amount : "",
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
        payment_type_id: gratuitesTypeSelected,
        payment_option_id: paymentOptionSelected,
        tax_id: taxSelected,
        gratuity_id: gratuitesSelected,
        amount: +values.gratuity_percentage,
        based_on_id: basedOnSelected,
        tour_id: id,
        paid_by_id: paidBySelected,
        payment_method_id: methodSelected,
        payment_due_id: dueSelected,
        when_id: whenSelected,
        payment_event_id: eventSelected,
      };
console.log(dataEdit.length)
      if (!dataEdit.id) {
        postPaymentsNewAPI(data)
          .then((resp) => {
            // console.log(resp.data);
            if (resp.data.status === 201) {
              // triggerUpdate();
              Swal.fire("Created!", "Payments has been edited.", "success");
              initialRequest()
            }
          })
          .catch((error) => {
            let errorMessages = [];
            if (error.response.data.data) {
              Object.entries(error.response.data.data).map((item) =>
                errorMessages.push(item[1])
              );
            } else {
              if (error.response.data.message === "Array to string conversion") {
                errorMessages.push("Available From is required");
              } else {
                errorMessages.push(error.response.data.message);
              }
            }
  
            Swal.fire(
              "Error!",
              // {error.response.},
              String(errorMessages[0])
            );
          });
        
      }else{
        putPaymentsAPI(dataEdit.id, data).then((resp) =>{
          if (resp.data.status === 200) {
            // triggerUpdate();
            Swal.fire("Edited!", "Payments has been edited.", "success");
            initialRequest()
          }
        }).catch((err) => console.log(err))
      }
    },
  });
  return (
    <Modal
      centered
      size="xl"
      // style={{ maxWidth: "1700px", width: "100%" }}
      isOpen={paymentsAdd}
    >
      <div
        className="modal-header"
        style={{ backgroundColor: "#3DC7F4", border: "none" }}
      >
        <h1 className="modal-title mt-0 text-white">+ New Payment</h1>

        <button
          onClick={() => {
            setPaymentsAdd(false);
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
        <Form
          onSubmit={(e) => {
            e.preventDefault();
            validationType.handleSubmit();
            return false;
          }}
          className="custom-validation"
        >
          <Row>
            <Col className="col-12 my-2" style={{ backgroundColor: "#E9F4FF" }}>
              <p
                className="p-2"
                style={{
                  fontSize: "20px",
                  fontWeight: "bold",
                  color: "#495057",
                  marginBottom: "0px",
                }}
              >
                Payment Amount
              </p>
            </Col>
          </Row>
          <Row className="flex mx-3 my-2">
            <Col className="mb-2 col-2" style={{ paddingTop: "7px" }}>
              <div className="form-outline mb-2" id="voucher_currency">
                <Label className="form-label">Type</Label>
                <div className="input-group">
                  <Input
                    type="select"
                    name=""
                    onChange={(e) => {
                      setGratuitesTypeSelected(e.target.value);
                    }}

                    //   value={validationType.values.department || ""}
                  >
                    <option value="">Select....</option>
                    {map(paymentsTypeData, (type, index) => {
                      return (
                        <option
                          key={index}
                          value={type.id}
                          selected={
                            dataEdit && dataEdit.payment_type_id
                              ? type.id === dataEdit.payment_type_id
                              : false
                          }
                        >
                          {type.name}
                        </option>
                      );
                    })}
                  </Input>
                </div>
              </div>
            </Col>
            <Col className="mb-2 col-2" style={{ paddingTop: "7px" }}>
              <div className="form-outline mb-2" id="voucher_currency">
                <Label className="form-label">Payment Option</Label>
                <div className="input-group">
                  <Input
                    type="select"
                    name=""
                    onChange={(e) => {
                      setPaymentOptionSelected(e.target.value);
                    }}

                    //   value={validationType.values.department || ""}
                  >
                    <option value="">Select....</option>
                    {map(paymentsOptionsData, (type, index) => {
                      return (
                        <option
                          key={index}
                          value={type.id}
                          selected={
                            dataEdit && dataEdit.payment_option_id
                              ? type.id === dataEdit.payment_option_id
                              : false
                          }
                        >
                          {type.name}
                        </option>
                      );
                    })}
                  </Input>
                </div>
              </div>
            </Col>
            <Col className="mb-2 col-2" style={{ paddingTop: "7px" }}>
              <div className="form-outline mb-2">
                <div className="d-flex justify-content-between">
                  <Label className="form-label">% Gratuity</Label>
                  <div>
                    <i
                      className="uil-question-circle font-size-15"
                      id="publicPrice"
                    />
                  </div>
                </div>
                <div className="input-group">
                  <Input
                    name="gratuity_percentage"
                    placeholder=""
                    type="number"
                    onChange={validationType.handleChange}
                    value={validationType.values.gratuity_percentage || ""}
                    invalid={
                      validationType.touched.gratuity_percentage &&
                      validationType.errors.gratuity_percentage
                        ? true
                        : false
                    }
                  />
                  <span
                    className="input-group-text form-label fw-bold bg-paradise text-white border-0"
                    id="basic-addon1"
                    style={{ fontSize: "0.85em" }}
                  >
                    %
                  </span>
                </div>
              </div>
            </Col>
            <Col className="mb-2 col-2" style={{ paddingTop: "7px" }}>
              <div className="form-outline mb-2" id="voucher_currency">
                <Label className="form-label">Based on</Label>
                <div className="input-group">
                  <Input
                    type="select"
                    name=""
                    onChange={(e) => {
                      setBasedOnSelected(e.target.value);
                    }}
                    onBlur={validationType.handleBlur}
                    //   value={validationType.values.department || ""}
                  >
                    <option value="">Select....</option>
                    {map(basedOnData, (based, index) => {
                      return (
                        <option
                          key={index}
                          value={based.id}
                          selected={
                            dataEdit && dataEdit.based_on_id
                              ? based.id === dataEdit.based_on_id
                              : false
                          }
                        >
                          {based.name}
                        </option>
                      );
                    })}
                  </Input>
                </div>
              </div>
            </Col>
            <Col className="mb-2 col-2" style={{ paddingTop: "7px" }}>
              <div className="form-outline mb-2" id="voucher_currency">
                <Label className="form-label">Taxes</Label>
                <div className="input-group">
                  <Input
                    type="select"
                    name=""
                    onChange={(e) => {
                      setTaxSelected(e.target.value);
                    }}
                    onBlur={validationType.handleBlur}
                    //   value={validationType.values.department || ""}
                  >
                    <option value="">Select....</option>
                    {map(taxData, (tax, index) => {
                      return (
                        <option
                          key={index}
                          value={tax.id}
                          selected={
                            dataEdit && dataEdit.tax_id
                              ? tax.id === dataEdit.tax_id
                              : false
                          }
                        >
                          {tax.name}
                        </option>
                      );
                    })}
                  </Input>
                </div>
              </div>
            </Col>
            <Col className="mb-2 col-2" style={{ paddingTop: "7px" }}>
              <div className="form-outline mb-2" id="voucher_currency">
                <Label className="form-label">Gratuities</Label>
                <div className="input-group">
                  <Input
                    type="select"
                    name=""
                    onChange={(e) => {
                      setGratuitesSelected(e.target.value);
                    }}
                    onBlur={validationType.handleBlur}
                    //   value={validationType.values.department || ""}
                  >
                    <option value="">Select....</option>
                    {map(gratuitesData, (gratuites, index) => {
                      return (
                        <option
                          key={index}
                          value={gratuites.id}
                          selected={
                            dataEdit && dataEdit.gratuity_id
                              ? gratuites.id === dataEdit.gratuity_id
                              : false
                          }
                        >
                          {gratuites.name}
                        </option>
                      );
                    })}
                  </Input>
                </div>
              </div>
            </Col>
          </Row>
          <Row>
            <Col
              className="col-12 p-1 my-2"
              style={{ backgroundColor: "#FFEFDE" }}
            >
              <p
                className="p-2"
                style={{
                  fontSize: "20px",
                  fontWeight: "bold",
                  color: "#495057",
                  marginBottom: "0px",
                }}
              >
                Payments Details
              </p>
            </Col>
          </Row>
          <Row className="flex mx-3">
            <Col className="mb-2 col-3" style={{ paddingTop: "7px" }}>
              <div className="form-outline mb-2" id="voucher_currency">
                <Label className="form-label">Paid By</Label>
                <div className="input-group">
                  <Input
                    type="select"
                    name=""
                    onChange={(e) => {
                      setPaidBySelected(e.target.value);
                    }}

                    //   value={validationType.values.department || ""}
                  >
                    <option value="">Select....</option>
                    {map(paidByData, (type, index) => {
                      return (
                        <option
                          key={index}
                          value={type.id}
                          selected={
                            dataEdit && dataEdit.paid_by_id
                              ? type.id === dataEdit.paid_by_id
                              : false
                          }
                        >
                          {type.name}
                        </option>
                      );
                    })}
                  </Input>
                </div>
              </div>
            </Col>
            <Col className="mb-2 col-3" style={{ paddingTop: "7px" }}>
              <div className="form-outline mb-2" id="voucher_currency">
                <Label className="form-label">Payment Method</Label>
                <div className="input-group">
                  <Input
                    type="select"
                    name=""
                    onChange={(e) => {
                      setMethodSelected(e.target.value);
                    }}

                    //   value={validationType.values.department || ""}
                  >
                    <option value="">Select....</option>
                    {map(methodData, (type, index) => {
                      return (
                        <option
                          key={index}
                          value={type.id}
                          selected={
                            dataEdit && dataEdit.payment_method_id
                              ? type.id === dataEdit.payment_method_id
                              : false
                          }
                        >
                          {type.name}
                        </option>
                      );
                    })}
                  </Input>
                </div>
              </div>
            </Col>
            <Col className="mb-2 col-2" style={{ paddingTop: "7px" }}>
              <div className="form-outline mb-2" id="voucher_currency">
                <Label className="form-label">Payment Due</Label>
                <div className="input-group">
                  <Input
                    type="select"
                    name=""
                    onChange={(e) => {
                      setDueSelected(e.target.value);
                    }}

                    //   value={validationType.values.department || ""}
                  >
                    <option value="">Select....</option>
                    {map(dueData, (type, index) => {
                      return (
                        <option
                          key={index}
                          value={type.id}
                          selected={
                            dataEdit && dataEdit.payment_due_id
                              ? type.id === dataEdit.payment_due_id
                              : false
                          }
                        >
                          {type.name}
                        </option>
                      );
                    })}
                  </Input>
                </div>
              </div>
            </Col>
            <Col className="mb-2 col-2" style={{ paddingTop: "7px" }}>
              <div className="form-outline mb-2" id="voucher_currency">
                <Label className="form-label">When</Label>
                <div className="input-group">
                  <Input
                    type="select"
                    name=""
                    onChange={(e) => {
                      setWhenSelected(e.target.value);
                    }}

                    //   value={validationType.values.department || ""}
                  >
                    <option value="">Select....</option>
                    {map(whenData, (type, index) => {
                      return (
                        <option
                          key={index}
                          value={type.id}
                          selected={
                            dataEdit && dataEdit.when_id
                              ? type.id === dataEdit.when_id
                              : false
                          }
                        >
                          {type.name}
                        </option>
                      );
                    })}
                  </Input>
                </div>
              </div>
            </Col>
            <Col className="mb-2 col-2" style={{ paddingTop: "7px" }}>
              <div className="form-outline mb-2" id="voucher_currency">
                <Label className="form-label">Event</Label>
                <div className="input-group">
                  <Input
                    type="select"
                    name=""
                    onChange={(e) => {
                      setEventSelected(e.target.value);
                    }}

                    //   value={validationType.values.department || ""}
                  >
                    <option value="">Select....</option>
                    {map(eventData, (type, index) => {
                      return (
                        <option
                          key={index}
                          value={type.id}
                          selected={
                            dataEdit && dataEdit.payment_event_id
                              ? type.id === dataEdit.payment_event_id
                              : false
                          }
                        >
                          {type.name}
                        </option>
                      );
                    })}
                  </Input>
                </div>
              </div>
            </Col>
          </Row>

          <Row
            className="col-12 d-flex justify-content-end mt-5"
            style={{ paddingRight: "30px" }}
          >
            <Button
              color="paradise"
              outline
              className="waves-effect waves-light col-2 mx-4"
              type="button"
              onClick={() => {
                setPaymentsAdd(false);
              }}
            >
              Cancel
            </Button>
            <Button
              id="save-button"
              type="submit"
              className="font-16 btn-block col-2 btn-orange"
              onClick={() => {
                setPaymentsAdd(false);
              }}
            >
              Save
            </Button>
          </Row>
        </Form>
      </div>
    </Modal>
  );
};

export default PaymentsToursModal;
