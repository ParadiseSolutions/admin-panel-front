import React, { useEffect, useMemo, useState } from "react";
import {
  paymentsTaxGet,
  paymentsGratuiteGet,
  paymentsGratuiteTypeGet,
  paymentsBaseOnGet,
  paymentsApplyGet,
  postPaymentsAPI,
  paymentsIndexGet,
  paymentstypeGet,
  paymentsOptionsGet,
  paymentsPaidByGet,
  paymentsMethodGet,
  paymentsDueGet,
  paymentsWhenGet,
  paymentsEventGet,
} from "../../../Utils/API/Tours";
import { getCurrency } from "../../../Utils/API/Operators";
import SettingsImageOne from "../../../Components/Assets/images/settings1.png";
import SettingsImageTwo from "../../../Components/Assets/images/settings2.png";
import SettingsImageThree from "../../../Components/Assets/images/settings3.png";
import {
  TabPane,
  Row,
  Col,
  Form,
  Label,
  Input,
  FormFeedback,
  Button,
  UncontrolledTooltip,
} from "reactstrap";
import { useFormik } from "formik";
import Swal from "sweetalert2";
import { map } from "lodash";
import PricingTables from "./PricingTables/pricingTables";
import { Name } from "./PricingTables/PricingCols";
import PaymentsToursModal from "../../../Components/Common/Modals/PaymentsTourModal/paymentsTourModal";
import { setDecimalFormat, setRateFormat } from "../../../Utils/CommonFunctions";

const Payments = ({ history, tourSettings, id, toggle }) => {
  const [paymentData, setPaymentData] = useState([]);
  const [taxData, setTaxData] = useState([]);
  const [gratuitesData, setGratuitesData] = useState([]);
  const [gratuitesTypeData, setGratuitesTypeData] = useState([]);
  const [basedOnData, setBasedOnData] = useState([]);
  const [applyData, setApplyData] = useState([]);
  const [currencyData, setCurrencyData] = useState([]);
  const [paymentsTypeData, setPaymentsTypeData] = useState([]);
  const [paymentsOptionsData, setPaymentsOptionsData] = useState([]);
  const [paidByData, setPaidByData] = useState([]);
  const [methodData, setMethodData] = useState([]);
  const [dueData, setDueData] = useState([]);
  const [whenData, setWhenData] = useState([]);
  const [eventData, setEventData] = useState([]);
  const [taxSelected, setTaxSelected] = useState([]);
  const [gratuitesSelected, setGratuitesSelected] = useState([]);
  const [gratuitesTypeSelected, setGratuitesTypeSelected] = useState([]);
  const [basedOnSelected, setBasedOnSelected] = useState([]);
  const [applySelected, setApplySelected] = useState([]);
  const [currencySelected, setCurrencySelected] = useState([]);
  const [paymentsAdd, setPaymentsAdd] = useState(false);
  const [dataEdit, setDataEdit] = useState([])
  
  const initialRequest = () =>{
    paymentsIndexGet(id).then((resp) => {
      setPaymentData(resp.data.data);
    });
  }
  
  //initial Data
  useEffect(() => {
    paymentsIndexGet(id).then((resp) => {
      setPaymentData(resp.data.data);
    });
    paymentsTaxGet().then((resp) => {
      setTaxData(resp.data.data);
    });
    paymentsGratuiteGet().then((resp) => {
      setGratuitesData(resp.data.data);
    });
    paymentsGratuiteTypeGet().then((resp) => {
      setGratuitesTypeData(resp.data.data);
    });
    paymentsBaseOnGet().then((resp) => {
      setBasedOnData(resp.data.data);
    });
    paymentsApplyGet().then((resp) => {
      setApplyData(resp.data.data);
    });
    getCurrency().then((resp) => {
      setCurrencyData(resp.data.data);
    });
    paymentstypeGet().then((resp) => {
      setPaymentsTypeData(resp.data.data);
    });
    paymentsOptionsGet().then((resp) => {
      setPaymentsOptionsData(resp.data.data);
    });
    paymentsPaidByGet().then((resp) => {
      setPaidByData(resp.data.data);
    });
    paymentsMethodGet().then((resp) => {
      setMethodData(resp.data.data);
    });
    paymentsDueGet().then((resp) => {
      setDueData(resp.data.data);
    });
    paymentsWhenGet().then((resp) => {
      setWhenData(resp.data.data);
    });
    paymentsEventGet().then((resp) => {
      setEventData(resp.data.data);
    });

    
  }, [id]);

  useEffect(() => {
    if (tourSettings) {
      setTaxSelected(tourSettings.tax_id);
      setGratuitesSelected(tourSettings.gratuity_id);
      setGratuitesTypeSelected(tourSettings.gratuity_type_id);
      setBasedOnSelected(tourSettings.based_on_id);
      setApplySelected(tourSettings.payment_apply_id);
      setCurrencySelected(tourSettings.payment_currency);
    }
    if (tourSettings.gratuity_type_id) {
      setGratuitesTypeSelected(tourSettings.gratuity_type_id.toString());
    }
  }, [tourSettings]);

  const columnsProducts = useMemo(
    () => [
      {
        Header: "Type",
        accessor: "payment_type",
        disableFilters: false,
        filterable: true,
        Cell: (cellProps) => {
          return <Name {...cellProps} />;
        },
      },
      {
        Header: "Payment Options",
        accessor: "payment_option",
        disableFilters: false,
        filterable: true,
        Cell: (cellProps) => {
          return <Name {...cellProps} />;
        },
      },
      {
        Header: "Amount",
        accessor: "amount",
        disableFilters: false,
        filterable: true,
        Cell: (cellProps) => {
          let rowData = cellProps.row.original
          return (
            <>
            {rowData.payment_option_id === 1 && `$ ${setDecimalFormat(rowData.amount)}`}
            {rowData.payment_option_id === 2 || rowData.payment_option_id === 3 ? `${setRateFormat(rowData.amount)}%` : null}
            </>
          )
        },
      },
      {
        Header: "Based On",
        accessor: "payment_base_on",
        disableFilters: false,
        filterable: true,
        Cell: (cellProps) => {
          return <Name {...cellProps} />;
        },
      },
      {
        Header: "Taxes",
        accessor: "payment_tax",
        disableFilters: false,
        filterable: true,
        Cell: (cellProps) => {
          return <Name {...cellProps} />;
        },
      },
      {
        Header: "Gratuity",
        accessor: "payment_gratuity",
        disableFilters: false,
        filterable: true,
        Cell: (cellProps) => {
          return <Name {...cellProps} />;
        },
      },
      {
        Header: "Paid By",
        accessor: "payment_paid_by",
        disableFilters: false,
        filterable: true,
        Cell: (cellProps) => {
          return <Name {...cellProps} />;
        },
      },
      {
        Header: "Method",
        accessor: "payment_method",
        disableFilters: false,
        filterable: true,
        Cell: (cellProps) => {
          return <Name {...cellProps} />;
        },
      },
      {
        Header: "Due Date",
        accessor: "payment_due",
        disableFilters: false,
        filterable: true,
        Cell: (cellProps) => {
          return <Name {...cellProps} />;
        },
      },
      {
        Header: "When",
        accessor: "payment_when",
        disableFilters: false,
        filterable: true,
        Cell: (cellProps) => {
          return <Name {...cellProps} />;
        },
      },
      {
        Header: "Event",
        accessor: "payment_event",
        disableFilters: false,
        filterable: true,
        Cell: (cellProps) => {
          return <Name {...cellProps} />;
        },
      },
      {
        Header: "Action",
        accessor: "action",
        disableFilters: true,
        Cell: (cellProps) => {
          return (
            <div className="d-flex gap-3">
              <div
                className="text-success"
                onClick={() => {
                  const prodData = cellProps.row.original;
                  setPaymentsAdd(true);
                  setDataEdit(prodData)
                  // console.log("data del producto", prodData);
                }}
              >
                <i
                  className="mdi mdi-pencil font-size-18"
                  id="edittooltip"
                  style={{ cursor: "pointer" }}
                />
                <UncontrolledTooltip placement="top" target="edittooltip">
                  Edit
                </UncontrolledTooltip>
              </div>
              
              <div
                className="text-danger"
                onClick={() => {
                  const depData = cellProps.row.original;
                  // setconfirm_alert(true);
                  /* onDelete(depData); */
                }}
              >
                <i
                  className="mdi mdi-delete font-size-18"
                  id="deletetooltip"
                  style={{ cursor: "pointer" }}
                />
                <UncontrolledTooltip placement="top" target="deletetooltip">
                  Delete
                </UncontrolledTooltip>
              </div>
            </div>
          );
        },
      },
    ],
    []
  );
  const validationType = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,
    initialValues: {
      tour_id: id,
      gratuity_percentage: tourSettings.gratuity ? tourSettings.gratuity : "",
      exchange_rate: tourSettings.exchange_rate
        ? tourSettings.exchange_rate
        : "",
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
        tax_id: +taxSelected,
        gratuity_id: +gratuitesSelected,
        gratuity_type_id: +gratuitesTypeSelected,
        gratuity: values.gratuity_percentage,
        based_on_id: +basedOnSelected,
        payment_apply_id: +applySelected,
        payment_currency: currencySelected,
        exchange_rate: values.exchange_rate,
        tour_id: id,
      };

      postPaymentsAPI(data)
        .then((resp) => {
          // console.log(resp.data);
          if (resp.data.status === 200) {
            // triggerUpdate();
            Swal.fire("Edited!", "Payments has been edited.", "success");
            toggle("3");
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
    },
  });

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
        <TabPane tabId="1" className="">
          <Row className=" d-flex justify-content-between pb-4 ">
            <Col className="col-md-4">
              <img src={SettingsImageThree} alt="image1" className="w-100" />
            </Col>
            <Col className="col-md-4">
              <img src={SettingsImageOne} alt="image1" className="w-100" />
            </Col>
            <Col className="col-md-4">
              <img src={SettingsImageTwo} alt="image1" className="w-100" />
            </Col>
          </Row>

          <Row>
            <Col className="col-12">
              <div className="mb-2 p-2" style={{ backgroundColor: "#E9F4FF" }}>
                <p
                  className="px-2 fs-5"
                  style={{
                    fontWeight: "bold",
                    color: "#495057",
                    marginBottom: "0px",
                  }}
                >
                  TAXES & GRATUITIES
                </p>
              </div>
            </Col>
          </Row>
          <Row>
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
                            tourSettings && tourSettings.tax_id
                              ? tax.id === tourSettings.tax_id
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
                            tourSettings && tourSettings.gratuity_id
                              ? gratuites.id === tourSettings.gratuity_id
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
            <Col className="mb-2 col-2" style={{ paddingTop: "7px" }}>
              <div className="form-outline mb-2" id="voucher_currency">
                <Label className="form-label">Gratuity Type</Label>
                <div className="input-group">
                  <Input
                    type="select"
                    name=""
                    onChange={(e) => {
                      setGratuitesTypeSelected(e.target.value);
                      console.log(e.target.value)
                    }}
                    onBlur={validationType.handleBlur}
                    //   value={validationType.values.department || ""}
                  >
                    <option value="">Select....</option>
                    {map(gratuitesTypeData, (type, index) => {
                      return (
                        <option
                          key={index}
                          value={type.id}
                          selected={
                            tourSettings && tourSettings.gratuity_type_id
                              ? type.id === tourSettings.gratuity_type_id
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
            <Col className="mb-2 col-1" style={{ paddingTop: "7px" }}>
              <div className="form-outline mb-2">
                <div className="d-flex justify-content-between">
                  { gratuitesTypeSelected === '3' ? 
                  <Label className="form-label">Amount</Label>
                  :  
                  <Label className="form-label">% Gratuity</Label>
                  }
                  <div>
                    <i
                      className="uil-question-circle font-size-15"
                      id="publicPrice"
                    />
                  </div>
                </div>
                <div className="input-group">
                  {gratuitesTypeSelected === '3' ? 
                  <span
                  className="input-group-text form-label fw-bold bg-paradise text-white border-0"
                  id="basic-addon1"
                  style={{ fontSize: "0.85em" }}
                >
                  $
                </span>
                  : null}
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
                  {gratuitesTypeSelected !== '3' ? 
                  <span
                  className="input-group-text form-label fw-bold bg-paradise text-white border-0"
                  id="basic-addon1"
                  style={{ fontSize: "0.85em" }}
                >
                  %
                </span>
                  : null}
                  
                </div>
              </div>
            </Col>
            <Col className="mb-2 col-1" style={{ paddingTop: "7px" }}>
              <div className="form-outline mb-2" id="voucher_currency">
                <Label className="form-label">Based on</Label>
                <div className="input-group">
                  <Input
                    type="select"
                    name=""
                    onChange={(e) => {
                      setBasedOnSelected(e.target.value);
                    }}
                    disabled={ gratuitesTypeSelected === '3' ? true : false }
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
                            tourSettings && tourSettings.based_on_id
                              ? based.id === tourSettings.based_on_id
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
                <Label className="form-label">Apply</Label>
                <div className="input-group">
                  <Input
                    type="select"
                    name=""
                    onChange={(e) => {
                      setApplySelected(e.target.value);
                    }}
                    onBlur={validationType.handleBlur}
                    //   value={validationType.values.department || ""}
                  >
                    <option value="">Select....</option>
                    {map(applyData, (apply, index) => {
                      return (
                        <option
                          key={index}
                          value={apply.id}
                          selected={
                            tourSettings && tourSettings.payment_apply_id
                              ? apply.id === tourSettings.payment_apply_id
                              : false
                          }
                        >
                          {apply.name}
                        </option>
                      );
                    })}
                  </Input>
                </div>
              </div>
            </Col>
            <Col className="mb-2 col-1" style={{ paddingTop: "7px" }}>
              <div className="form-outline mb-2" id="voucher_currency">
                <Label className="form-label text-paradise">Currency</Label>
                <div className="input-group">
                  <Input
                    type="select"
                    name=""
                    onChange={(e) => {
                      setCurrencySelected(e.target.value);
                    }}
                    onBlur={validationType.handleBlur}
                    //   value={validationType.values.department || ""}
                  >
                    <option value="">Select....</option>
                    {map(currencyData, (currency, index) => {
                      return (
                        <option
                          key={index}
                          value={currency.currency_id}
                          selected={
                            tourSettings && tourSettings.payment_currency
                              ? currency.currency ===
                                tourSettings.payment_currency
                              : false
                          }
                        >
                          {currency.currency}
                        </option>
                      );
                    })}
                  </Input>
                </div>
              </div>
            </Col>
            <Col className="mb-2 col-1" style={{ paddingTop: "7px" }}>
              <div className="form-outline">
                <Label className="form-label text-paradise">Exchange Rate</Label>
                <Input
                  name="exchange_rate"
                  placeholder="$0.00"
                  type="number"
                  onChange={validationType.handleChange}
                  onBlur={validationType.handleBlur}
                  value={validationType.values.exchange_rate || ""}
                  invalid={
                    validationType.touched.exchange_rate &&
                    validationType.errors.exchange_rate
                      ? true
                      : false
                  }
                />
                {validationType.touched.exchange_rate &&
                validationType.errors.exchange_rate ? (
                  <FormFeedback type="invalid">
                    {validationType.errors.exchange_rate}
                  </FormFeedback>
                ) : null}
              </div>
            </Col>
          </Row>

          <Row>
            <Col className="col-xl">
              <div
                className="mb-4 py-2 px-3"
                style={{ backgroundColor: "#FFEFDE"}}
                
              >
                <p
                  className="fs-5"
                  style={{
                    fontWeight: "bold",
                    color: "#495057",
                    marginBottom: "0px",
                  }}
                >
                  PAYMENTS
                </p>
              </div>
            </Col>
            <Col className='col-1'>
            <Button
                type="button"
                className="btn-orange"
                onClick={() =>  setPaymentsAdd(true)}
                style={{fontSize:'12px', padding:'11px'}}
              >
               + Add Payment                
              </Button>
            </Col>
          </Row>
          <Row>
            {paymentData ? (
              <PricingTables
                columns={columnsProducts}
                data={paymentData}
                isGlobalFilter={true}
                productsTable={true}
                /* onClickNewProduct={onClickNewProduct} */
              />
            ) : null}
          </Row>

          <Row>
            <div className="col-12 d-flex justify-content-end mt-5">
              <Button
                color="paradise"
                outline
                className="waves-effect waves-light me-2"
                type="button"
                onClick={() => toggle("1")}
              >
                <i className="uil-angle-double-left" />
                Previous
              </Button>
              <Button
                type="submit"
                className="font-16 btn-orange"
                // onClick={toggleCategory}
              >
                Continue
                <i className="uil-angle-double-right mx-1 " />
              </Button>
            </div>
          </Row>
        </TabPane>
      </Form>
      <PaymentsToursModal
        setPaymentsAdd={setPaymentsAdd}
        paymentsAdd={paymentsAdd}
        gratuitesTypeData={gratuitesTypeData}
        basedOnData={basedOnData}
        taxData={taxData}
        gratuitesData={gratuitesData}
        paymentsTypeData={paymentsTypeData}
        paymentsOptionsData={paymentsOptionsData}
        paidByData={paidByData}
        methodData={methodData}
        dueData={dueData}
        whenData={whenData}
        eventData={eventData}
        dataEdit={dataEdit}
        id={id}
        initialRequest={initialRequest}
      />
    </>
  );
};

export default Payments;
