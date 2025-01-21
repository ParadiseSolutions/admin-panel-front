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
import PaymentBannerOne from "../../../Assets/images/paymentBannerOne.png";
import PaymentBannerTwo from "../../../Assets/images/paymentBannerTwo.png";
import { useFormik } from "formik";
import Swal from "sweetalert2";
import {
  postPaymentsNewAPI,
  putPaymentsAPI,
} from "../../../../Utils/API/Tours";
import { Select } from "antd";
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
  initialRequest,
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

  //tooltips
  const [typeTooltip, setTypeTooltip] = useState(false);
  const [paymentOptionTooltip, setPaymentOptionTooltip] = useState(false);
  const [taxesTooltip, setTaxesTooltip] = useState(false);
  const [gratuityTooltip, setGratuityTooltip] = useState(false);
  const [paidByTooltip, setPaidByTooltip] = useState(false);
  const [paymentMethodTooltip, setPaymentMethodTooltip] = useState(false);
  const [paymentDueTooltip, setPaymentDueTooltip] = useState(false);
  const [whenTooltip, setWhenTooltip] = useState(false);
  const [eventTooltip, setEventTooltip] = useState(false);
  const [amountTooltip, setamountTooltip] = useState(false);

  useEffect(() => {
    if (dataEdit !== null) {
      setGratuitesTypeSelected(dataEdit.payment_type_id);
      setPaymentOptionSelected(dataEdit.payment_option_id);
      setBasedOnSelected(dataEdit.based_on_id);
      setTaxSelected(dataEdit.tax_id);
      setGratuitesSelected(dataEdit.gratuity_id);
      setPaidBySelected(dataEdit.paid_by_id);
      setMethodSelected(dataEdit.payment_methods);
      setDueSelected(dataEdit.payment_due_id);
      setWhenSelected(dataEdit.when_id);
      setEventSelected(dataEdit.payment_event_id);
    } else {
      setGratuitesTypeSelected("");
      setPaymentOptionSelected("");
      setBasedOnSelected("");
      setTaxSelected("");
      setGratuitesSelected("");
      setPaidBySelected("");
      setMethodSelected([]);
      setDueSelected("");
      setWhenSelected("");
      setEventSelected("");
    }
  }, [dataEdit]);
  function handleMulti(selected) {
    setMethodSelected(selected);
  }
  
  const validationType = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,
    initialValues: {
      gratuity_percentage: dataEdit?.amount ? dataEdit?.amount : "",
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
        payment_type_id: gratuitesTypeSelected === '' ? null : gratuitesTypeSelected,
        payment_option_id: paymentOptionSelected === '' ? null : paymentOptionSelected,
        tax_id: taxSelected === '' ? null : taxSelected,
        gratuity_id: gratuitesSelected === '' ? null : gratuitesSelected,
        amount: +values.gratuity_percentage,
        based_on_id: basedOnSelected === '' ? null : basedOnSelected,
        tour_id: id,
        paid_by_id: paidBySelected === '' ? null : paidBySelected,
        // payment_method_id: methodSelected,
        payment_due_id: dueSelected === '' ? null : dueSelected,
        when_id: whenSelected === '' ? null : whenSelected,
        payment_event_id: eventSelected === '' ? null : eventSelected,
        payment_methods: methodSelected,
      };

      if (!dataEdit?.id) {
        debugger
        postPaymentsNewAPI(data)
          .then((resp) => {
            // console.log(resp.data);
            if (resp.data.status === 201) {
              // triggerUpdate();
              Swal.fire("Created!", "Payments has been edited.", "success");
              initialRequest();
            }
          })
          .catch((error) => {
            let errorMessages = [];
            if (error.response.data.data) {
              Object.entries(error.response.data.data).map((item) =>
                errorMessages.push(item[1])
              );
            } else {
              if (
                error.response.data.message === "Array to string conversion"
              ) {
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
      } else {
        putPaymentsAPI(dataEdit.id, data)
          .then((resp) => {
            if (resp.data.status === 200) {
              // triggerUpdate();
              Swal.fire("Edited!", "Payments has been edited.", "success");
              initialRequest();
            }
          })
          .catch((err) => console.log(err));
      }
      initialRequest();
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
          <Row className="d-flex">
            <Col className="col-6">
              <img
                src={PaymentBannerOne}
                alt="PaymentBannerOne"
                style={{ width: "100%", height: "100%" }}
              />
            </Col>
            <Col className="col-6">
              <img
                src={PaymentBannerTwo}
                alt="PaymentBannerTwo"
                style={{ width: "100%", height: "100%" }}
              />
            </Col>
          </Row>
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
                <div className="d-flex justify-content-between">
                  <Label className="form-labe">Type</Label>
                  <div>
                    <i
                      className="uil-question-circle font-size-15 mx-2"
                      id="typeTooltip"
                    />
                    <Tooltip
                      placement="right"
                      isOpen={typeTooltip}
                      target="typeTooltip"
                      style={{ textAlign: "left" }}
                      toggle={() => {
                        setTypeTooltip(!typeTooltip);
                      }}
                    >
                      Choose what type of payment you are defining.
                      <br />
                      Initial Deposit - Customer pays us the deposit to reserve
                      the tour.
                      <br />
                      <br />
                      Provider Payment - Advance payment sent to the provider to
                      secure the tour. Can be from us or from the customer
                      directly.
                      <br />
                      <br />
                      Customer Payment - Payment to us by the customer. This may
                      or may not precede a Provider payment where we pass on the
                      money to the provider.
                      <br />
                      <br />
                      Final Payment - The balance due paid to the provider,
                      either by us or by the customer. Once this payment is
                      made, the balance remaining is zero and a final
                      confirmation is sent.
                    </Tooltip>
                  </div>
                </div>
                <div className="input-group">
                  <Input
                    type="select"
                    name=""
                    onChange={(e) => {
                      setGratuitesTypeSelected(+e.target.value);
                      console.log(e.target.value);
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
                <div className="d-flex justify-content-between">
                  <Label className="form-labe">Payment Option</Label>
                  <div>
                    <i
                      className="uil-question-circle font-size-15 mx-2"
                      id="paymentOptionTooltip"
                    />
                    <Tooltip
                      placement="right"
                      isOpen={paymentOptionTooltip}
                      target="paymentOptionTooltip"
                      style={{ textAlign: "left" }}
                      toggle={() => {
                        setPaymentOptionTooltip(!paymentOptionTooltip);
                      }}
                    >
                      How will the payment to be sent be calculated? Will it be
                      a fixed amount (such as $1,000.00) or a percentage (such
                      as 50%) of a certain value?
                      <br />
                      Amount - A set amount will be collected or sent to the
                      Provider, such as $1,000.00.
                      <br />
                      <br />
                      Percent % - A percentage of either the public price or net
                      price will be sent to the Provider.
                      <br />
                      <br />
                      Commission - Our commission will be collected as the
                      entire deposit.
                      <br />
                      <br />
                      Comm + Amount - We will collect or commission amount plus
                      a set amount such as $1,000.00.
                      <br />
                      <br />
                      Comm + Percent % - We will collect our commission amount
                      plus a percentage of the balance due to the provider (such
                      as 50% of the Net Price).
                    </Tooltip>
                  </div>
                </div>
                <div className="input-group">
                  <Input
                    type="select"
                    name=""
                    onChange={(e) => {
                      setPaymentOptionSelected(+e.target.value);
                      console.log(e.target.value);
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
            {(gratuitesTypeSelected !== 1 || paymentOptionSelected !== 3) &&
            !(gratuitesTypeSelected === 1 && paymentOptionSelected === 3) ? (
              <>
                <Col className="mb-2 col-2" style={{ paddingTop: "7px" }}>
                  <div className="form-outline mb-2">
                    <div className="d-flex justify-content-between">
                      <Label className="form-label">Amount</Label>
                      <div>
                        <i
                          className="uil-question-circle font-size-15"
                          id="amountTooltip"
                        />
                        <Tooltip
                          placement="right"
                          isOpen={amountTooltip}
                          target="amountTooltip"
                          style={{ textAlign: "left" }}
                          toggle={() => {
                            setamountTooltip(!amountTooltip);
                          }}
                        >
                          The fixed amount or percentage of the payment that
                          will be made. This option is dependent on the option
                          chosen in the previous drop-down.
                        </Tooltip>
                      </div>
                    </div>
                    <div className="input-group">
                      {paymentOptionSelected != 2 &&
                      paymentOptionSelected != 5 ? (
                        <span
                          className="input-group-text form-label fw-bold bg-paradise text-white border-0"
                          id="basic-addon1"
                          style={{ fontSize: "0.85em" }}
                        >
                          $
                        </span>
                      ) : null}
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
                      {paymentOptionSelected == "2" ||
                      paymentOptionSelected == "5" ? (
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
                {paymentOptionSelected !== "1" ? (
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
                ) : null}
                <Col className="mb-2 col-2" style={{ paddingTop: "7px" }}>
                  <div className="form-outline mb-2" id="voucher_currency">
                    <div className="d-flex justify-content-between">
                      <Label className="form-labe">Taxes</Label>
                      <div>
                        <i
                          className="uil-question-circle font-size-15 mx-2"
                          id="taxesTooltip"
                        />
                        <Tooltip
                          placement="right"
                          isOpen={taxesTooltip}
                          target="taxesTooltip"
                          style={{ textAlign: "left" }}
                          toggle={() => {
                            setTaxesTooltip(!taxesTooltip);
                          }}
                        >
                          Does this amount include taxes? "Unspecified" means
                          that the operator is not charging taxes. The amount is
                          assumed to be a pre-tax amount but the tax will not be
                          added.
                        </Tooltip>
                      </div>
                    </div>
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
                    <div className="d-flex justify-content-between">
                      <Label className="form-labe">Gratuity</Label>
                      <div>
                        <i
                          className="uil-question-circle font-size-15 mx-2"
                          id="gratuityTooltip"
                        />
                        <Tooltip
                          placement="right"
                          isOpen={gratuityTooltip}
                          style={{ textAlign: "left" }}
                          target="gratuityTooltip"
                          toggle={() => {
                            setGratuityTooltip(!gratuityTooltip);
                          }}
                        >
                          Does this amount include a mandatory gratuity amount?
                          <br />
                          Included - The amount includes the mandatory gratuity.
                          <br />
                          <br />
                          Not Included - The mount does not include the
                          mandatory gratuity.
                          <br />
                          <br />
                          Unspecified - The gratuity is not collected in advance
                          and no specific requirement of the amount is set. It
                          is up to the customer's discretion on the day of the
                          tour.
                        </Tooltip>
                      </div>
                    </div>
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
              </>
            ) : null}
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
                <div className="d-flex justify-content-between">
                  <Label className="form-labe">Paid By</Label>
                  <div>
                    <i
                      className="uil-question-circle font-size-15 mx-2"
                      id="paidByTooltip"
                    />
                    <Tooltip
                      placement="right"
                      isOpen={paidByTooltip}
                      style={{ textAlign: "left" }}
                      target="paidByTooltip"
                      toggle={() => {
                        setPaidByTooltip(!paidByTooltip);
                      }}
                    >
                      Who is responsible for making this payment? Who pays who?
                      Do we pay the provider, or does the customer pay them
                      directly? Or does the customer pay us?
                    </Tooltip>
                  </div>
                </div>
                <div className="input-group">
                  <Input
                    type="select"
                    name=""
                    onChange={(e) => {
                      setPaidBySelected(e.target.value);
                      console.log(e.target.value);
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
                            (dataEdit &&
                              dataEdit.paid_by_id &&
                              type.id === dataEdit.paid_by_id) ||
                            (gratuitesTypeSelected === 1 && type.id === 3)
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
                <div className="d-flex justify-content-between">
                  <Label className="form-labe">Payment Method</Label>
                  <div>
                    <i
                      className="uil-question-circle font-size-15 mx-2"
                      id="paymentMethodTooltip"
                    />
                    <Tooltip
                      placement="right"
                      isOpen={paymentMethodTooltip}
                      target="paymentMethodTooltip"
                      toggle={() => {
                        setPaymentMethodTooltip(!paymentMethodTooltip);
                      }}
                    >
                      How must the payment be made?
                    </Tooltip>
                  </div>
                </div>
                <div className="input-group">
                  <Select
                    mode="multiple"
                    allowClear
                    rows="5"
                    style={{ width: "100%", paddingTop: "5px" }}
                    onChange={handleMulti}
                    defaultValue={methodSelected}
                    //   value={validationType.values.department || ""}
                  >
                    
                    {map(methodData, (type, index) => {
                      return (
                        <option
                          key={index}
                          value={type.id}
                          // selected={
                          //   dataEdit && dataEdit.payment_method_id
                          //     ? type.id === dataEdit.payment_method_id
                          //     : false
                          // }
                        >
                          {type.name}
                        </option>
                      );
                    })}
                  </Select>
                </div>
              </div>
            </Col>
            <Col className="mb-2 col-2" style={{ paddingTop: "7px" }}>
              <div className="form-outline mb-2" id="voucher_currency">
                <div className="d-flex justify-content-between">
                  <Label className="form-labe">Payment Due</Label>
                  <div>
                    <i
                      className="uil-question-circle font-size-15 mx-2"
                      id="paymentDueTooltip"
                    />
                    <Tooltip
                      placement="right"
                      isOpen={paymentDueTooltip}
                      style={{ textAlign: "left" }}
                      target="paymentDueTooltip"
                      toggle={() => {
                        setPaymentDueTooltip(!paymentDueTooltip);
                      }}
                    >
                      When must the payment be made by?
                    </Tooltip>
                  </div>
                </div>
                <div className="input-group">
                  <Input
                    type="select"
                    name=""
                    onChange={(e) => {
                      setDueSelected(e.target.value);
                      console.log(e.target.value);
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
            {dueSelected == 1 || dueSelected == 6 ? null : (
              <>
                <Col className="mb-2 col-2" style={{ paddingTop: "7px" }}>
                  <div className="form-outline mb-2" id="voucher_currency">
                    <div className="d-flex justify-content-between">
                      <Label className="form-labe">When</Label>
                      <div>
                        <i
                          className="uil-question-circle font-size-15 mx-2"
                          id="whenTooltip"
                        />
                        <Tooltip
                          placement="right"
                          isOpen={whenTooltip}
                          style={{ textAlign: "left" }}
                          target="whenTooltip"
                          toggle={() => {
                            setWhenTooltip(!whenTooltip);
                          }}
                        >
                          Does the payment need to be made some days before the
                          tour date, or some days after the booking date, or on
                          the day of the tour?
                        </Tooltip>
                      </div>
                    </div>
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
                    <div className="d-flex justify-content-between">
                      <Label className="form-labe">Event</Label>
                      <div>
                        <i
                          className="uil-question-circle font-size-15 mx-2"
                          id="eventTooltip"
                        />
                        <Tooltip
                          placement="right"
                          isOpen={eventTooltip}
                          style={{ textAlign: "left" }}
                          target="eventTooltip"
                          toggle={() => {
                            setEventTooltip(!eventTooltip);
                          }}
                        >
                          Choose if the time frame is related to the booking
                          date or the tour date. For example, 30 days before the
                          tour date, or 7 days after the booking date.
                        </Tooltip>
                      </div>
                    </div>
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
              </>
            )}
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
                dataEdit = null;
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
