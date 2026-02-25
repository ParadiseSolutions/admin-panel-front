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
  deletePaymentsAPI,
  paymentsTaxesBaseOnGet,
  paymentsCommissionBaseOnGet,
  paymentsCommissionApplyGet,
} from "../../../Utils/API/Tours";
import { getCurrency } from "../../../Utils/API/Operators";
import SettingsImageOne from "../../../Components/Assets/images/header-one.png";
import SettingsImageTwo from "../../../Components/Assets/images/header-two.png";
import SettingsImageThree from "../../../Components/Assets/images/header-three.png";
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
  Tooltip,
} from "reactstrap";
import { useFormik } from "formik";
import Swal from "sweetalert2";
import { map } from "lodash";
import PricingTables from "./PricingTables/pricingTables";
import { Name } from "./PricingTables/PricingCols";
import PaymentsToursModal from "../../../Components/Common/Modals/PaymentsTourModal/paymentsTourModal";
import {
  setDecimalFormat,
  setRateFormat,
} from "../../../Utils/CommonFunctions";
import { switchTourTab } from "../../../Utils/API";
import Switch from "react-switch";
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
  const [dataEdit, setDataEdit] = useState([]);

  const [advanceSettings, setAdvanceSettings] = useState(false);
  const [taxesBasedOnData, setTaxesBasedOnData] = useState([]);
  const [taxesBasedOnSelected, setTaxesBasedOnSelected] = useState(null);
  const [commissionBasedOnData, setCommissionBasedOnData] = useState([]);
  const [commissionBasedOnSelected, setCommissionBasedOnSelected] = useState(null);
  const [applyCommissionData, setApplyCommissionData] = useState([]);
  const [applyCommissionSelected, setApplyCommissionSelected] = useState(null);


  //tooltips
  const [taxTooltip, setTaxTooltip] = useState(false);
  const [gratuitiesTooltip, setGratuitiesTooltip] = useState(false);
  const [gratuityTypeTooltip, setGratuityTypeTooltip] = useState(false);
  const [amountTooltip, setAmountTooltip] = useState(false);
  const [basedOnTooltip, setBasedOnTooltip] = useState(false);
  const [applyTooltip, setApplyTooltip] = useState(false);
  const [currencyTooltip, setCurrencyTooltip] = useState(false);
  const [exchangeTooltip, setExchangeTooltip] = useState(false);
  const [gratPercentageTooltip, setgratPercentageTooltip] = useState(false);
  const [headerTT, setheaderTT] = useState(false);

  const initialRequest = () => {
    paymentsIndexGet(id).then((resp) => {
      setPaymentData(resp.data.data);
    }).catch((error) => {
          Swal.fire({
            title: 'Error',
            text: 'Something happened with the connection. Refresh the page and try again.',
            icon: 'error',
            confirmButtonText: 'OK'
          });
        });
  };

  //initial Data
  useEffect(() => {
    paymentsIndexGet(id).then((resp) => {
      setPaymentData(resp.data.data);
    }).catch((error) => {
          Swal.fire({
            title: 'Error',
            text: 'Something happened with the connection. Refresh the page and try again.',
            icon: 'error',
            confirmButtonText: 'OK'
          });
        });
    paymentsTaxGet().then((resp) => {
      setTaxData(resp.data.data);
    }).catch((error) => {
          Swal.fire({
            title: 'Error',
            text: 'Something happened with the connection. Refresh the page and try again.',
            icon: 'error',
            confirmButtonText: 'OK'
          });
        });
    paymentsGratuiteGet().then((resp) => {
      setGratuitesData(resp.data.data);
    }).catch((error) => {
          Swal.fire({
            title: 'Error',
            text: 'Something happened with the connection. Refresh the page and try again.',
            icon: 'error',
            confirmButtonText: 'OK'
          });
        });
    paymentsGratuiteTypeGet().then((resp) => {
      setGratuitesTypeData(resp.data.data);
    }).catch((error) => {
          Swal.fire({
            title: 'Error',
            text: 'Something happened with the connection. Refresh the page and try again.',
            icon: 'error',
            confirmButtonText: 'OK'
          });
        });
    paymentsBaseOnGet().then((resp) => {
      setBasedOnData(resp.data.data);
    }).catch((error) => {
          Swal.fire({
            title: 'Error',
            text: 'Something happened with the connection. Refresh the page and try again.',
            icon: 'error',
            confirmButtonText: 'OK'
          });
        });
    paymentsApplyGet().then((resp) => {
      setApplyData(resp.data.data);
    }).catch((error) => {
          Swal.fire({
            title: 'Error',
            text: 'Something happened with the connection. Refresh the page and try again.',
            icon: 'error',
            confirmButtonText: 'OK'
          });
        });
    getCurrency().then((resp) => {
      setCurrencyData(resp.data.data);
    }).catch((error) => {
          Swal.fire({
            title: 'Error',
            text: 'Something happened with the connection. Refresh the page and try again.',
            icon: 'error',
            confirmButtonText: 'OK'
          });
        });
    paymentstypeGet().then((resp) => {
      setPaymentsTypeData(resp.data.data);
    }).catch((error) => {
          Swal.fire({
            title: 'Error',
            text: 'Something happened with the connection. Refresh the page and try again.',
            icon: 'error',
            confirmButtonText: 'OK'
          });
        });
    paymentsOptionsGet().then((resp) => {
      setPaymentsOptionsData(resp.data.data);
    }).catch((error) => {
          Swal.fire({
            title: 'Error',
            text: 'Something happened with the connection. Refresh the page and try again.',
            icon: 'error',
            confirmButtonText: 'OK'
          });
        });
    paymentsPaidByGet().then((resp) => {
      setPaidByData(resp.data.data);
    }).catch((error) => {
          Swal.fire({
            title: 'Error',
            text: 'Something happened with the connection. Refresh the page and try again.',
            icon: 'error',
            confirmButtonText: 'OK'
          });
        });
    paymentsMethodGet().then((resp) => {
      setMethodData(resp.data.data);
    }).catch((error) => {
          Swal.fire({
            title: 'Error',
            text: 'Something happened with the connection. Refresh the page and try again.',
            icon: 'error',
            confirmButtonText: 'OK'
          });
        });
    paymentsDueGet().then((resp) => {
      setDueData(resp.data.data);
    }).catch((error) => {
          Swal.fire({
            title: 'Error',
            text: 'Something happened with the connection. Refresh the page and try again.',
            icon: 'error',
            confirmButtonText: 'OK'
          });
        });
    paymentsWhenGet().then((resp) => {
      setWhenData(resp.data.data);
    }).catch((error) => {
          Swal.fire({
            title: 'Error',
            text: 'Something happened with the connection. Refresh the page and try again.',
            icon: 'error',
            confirmButtonText: 'OK'
          });
        });
    paymentsEventGet().then((resp) => {
      setEventData(resp.data.data);
    }).catch((error) => {
          Swal.fire({
            title: 'Error',
            text: 'Something happened with the connection. Refresh the page and try again.',
            icon: 'error',
            confirmButtonText: 'OK'
          });
        });
    
    paymentsTaxesBaseOnGet().then((resp) => {
      setTaxesBasedOnData(resp.data.data);
    }).catch((error) => {
          Swal.fire({
            title: 'Error',
            text: 'Something happened with the connection. Refresh the page and try again.',
            icon: 'error',
            confirmButtonText: 'OK'
          });
        });
    paymentsCommissionBaseOnGet().then((resp) => {
      setCommissionBasedOnData(resp.data.data);
    }).catch((error) => {
          Swal.fire({
            title: 'Error',
            text: 'Something happened with the connection. Refresh the page and try again.',
            icon: 'error',
            confirmButtonText: 'OK'
          });
        });
    paymentsCommissionApplyGet().then((resp) => {
      setApplyCommissionData(resp.data.data);
    }).catch((error) => {
          Swal.fire({
            title: 'Error',
            text: 'Something happened with the connection. Refresh the page and try again.',
            icon: 'error',
            confirmButtonText: 'OK'
          });
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

  const onDelete = (depData) => {
    Swal.fire({
      title: "Delete Payment?",
      icon: "question",
      text: `Do you want delete ${depData.payment_option}`,
      showCancelButton: true,
      confirmButtonText: "Yes",
      confirmButtonColor: "#F38430",
      cancelButtonText: "Cancel",
    }).then((resp) => {
      if (resp.isConfirmed) {
        deletePaymentsAPI(depData.id)
          .then((resp) => {
            initialRequest();
            Swal.fire("Deleted!", "The Payment has been deleted.", "success");
          })
          .catch((error) => {
            if (error.response.data.data === null) {
              Swal.fire(
                "Error!",
                // {error.response.},
                String(error.response.data.message)
              );
            } else {
              let errorMessages = [];
              Object.entries(error.response.data.data).map((item) => {
                errorMessages.push(item[1]);
                return true;
              });

              Swal.fire(
                "Error!",
                // {error.response.},
                String(errorMessages[0])
              );
            }
          });
      }
    });
  };

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
        Header: "Paid By",
        accessor: "payment_paid_by",
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
          let rowData = cellProps.row.original;
          return (
            <>
              {rowData.payment_option_id === 3 ||
              rowData.payment_option_id === 6
                ? ``
                : null}
              {rowData.payment_option_id === 1 ||
              rowData.payment_option_id === 4
                ? `$ ${setDecimalFormat(rowData.amount)}`
                : null}
              {rowData.payment_option_id === 2 ||
              rowData.payment_option_id === 5
                ? `${setRateFormat(rowData.amount)}%`
                : null}
            </>
          );
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
        Header: "Method",
        accessor: "payment_method",
        disableFilters: false,
        filterable: true,
        Cell: (cellProps) => {
          const methodData = cellProps.row.original;
          return cellProps.cell.value ? (
            <>
              <span id={`payment_method_tooltip-${methodData.id}`}>
                {cellProps.cell.value.substring(0, 25)}...
              </span>
              <UncontrolledTooltip
                placement="top"
                target={`payment_method_tooltip-${methodData.id}`}
              >
                {cellProps.cell.value}
              </UncontrolledTooltip>
            </>
          ) : (
            <>{cellProps.cell.value}</>
          );
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
                  setDataEdit(prodData);
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
                  onDelete(depData);
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
        tax_based_on: +taxesBasedOnSelected,
        commission_based_on: +commissionBasedOnSelected,
        apply_commission: +applyCommissionSelected,
      };

      postPaymentsAPI(data)
        .then((resp) => {
          // console.log(resp.data);
          if (resp.data.status === 200) {
            // triggerUpdate();
            Swal.fire("Edited!", "Payments has been edited.", "success");
            window.location.href = switchTourTab(4);
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
              <div
                className="mb-2 p-2 d-flex justify-content-between"
                style={{ backgroundColor: "#E9F4FF" }}
              >
                <div className="d-flex">
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
                  <div>
                    <i
                      className="uil-question-circle font-size-15"
                      id="headerTT"
                    />
                    <Tooltip
                      placement="right"
                      isOpen={headerTT}
                      target="headerTT"
                      toggle={() => {
                        setheaderTT(!headerTT);
                      }}
                    >
                      Use this section to define how the provider prices the
                      tour on the service agreement.
                      <br />
                      <br />
                      These settings will be applied to your entries in the
                      price modal when adding a product.
                    </Tooltip>
                  </div>
                </div>
                <div className="d-flex mt-2 form-check form-switch">
                  <Label className="mx-2">Advanced Settings</Label>
                  <input
                     type="checkbox"
                     className="form-check-input mx-1"
                     id="customSwitchsizesm"
                    checked={advanceSettings}
                    onChange={(e) => setAdvanceSettings(e.target.checked)}
                  />
                </div>
              </div>
            </Col>
          </Row>
          <Row>
            <Col className="mb-2 col-2" style={{ paddingTop: "7px" }}>
              <div className="form-outline mb-2" id="voucher_currency">
                <div className="d-flex justify-content-between">
                  <Label className="form-label">Taxes</Label>
                  <div>
                    <i
                      className="uil-question-circle font-size-15 mx-2"
                      id="taxtooltip"
                    />
                    <Tooltip
                      placement="right"
                      isOpen={taxTooltip}
                      target="taxtooltip"
                      toggle={() => {
                        setTaxTooltip(!taxTooltip);
                      }}
                    >
                      Does the price include tax (16% IVA) or is it priced
                      before taxes are included? If the operator will not charge
                      tax, such as when paying in cash on the day of the tour,
                      then select "Not Applicable".
                    </Tooltip>
                  </div>
                </div>
                <div className="input-group">
                  <Input
                    type="select"
                    name="tax_select_1"
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
                <div className="d-flex justify-content-between">
                  <Label className="form-label">Gratuities</Label>
                  <div>
                    <i
                      className="uil-question-circle font-size-15 mx-2"
                      id="gratuitiestooltip"
                    />
                    <Tooltip
                      placement="right"
                      isOpen={gratuitiesTooltip}
                      target="gratuitiestooltip"
                      toggle={() => {
                        setGratuitiesTooltip(!gratuitiesTooltip);
                      }}
                    >
                      Does the price include gratuity or are gratuities extra?
                    </Tooltip>
                  </div>
                </div>
                <div className="input-group">
                  <Input
                    type="select"
                    name="gratuity_select_1"
                    onChange={(e) => {
                      setGratuitesSelected(e.target.value);
                      // console.log(e.target.value);
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
            {+gratuitesSelected !== 3 ? (
              <>
                <Col className="mb-2 col-2" style={{ paddingTop: "7px" }}>
                  <div className="form-outline mb-2" id="voucher_currency">
                    <div className="d-flex justify-content-between">
                      <Label className="form-label">Gratuity Type</Label>
                      <div>
                        <i
                          className="uil-question-circle font-size-15 mx-2"
                          id="gratuityTypeTooltip"
                        />
                        <Tooltip
                          placement="right"
                          isOpen={gratuityTypeTooltip}
                          target="gratuityTypeTooltip"
                          toggle={() => {
                            setGratuityTypeTooltip(!gratuityTypeTooltip);
                          }}
                        >
                          How does the provider price the gratuity?
                          <br />
                          <br />
                          Unspecified - The provider doesn't require a certain
                          gratuity. It is up to the customer to decide how much
                          to pay on the day of the tour.
                          <br />
                          <br />
                          % Percent - The provider requires a certain percentage
                          of the price as gratuity, such as a 15% gratuity.
                          <br />
                          <br />
                          Fixed Amount - The provider requires a set amount,
                          like $500.00, as a gratuity.
                        </Tooltip>
                      </div>
                    </div>
                    <div className="input-group">
                      <Input
                        type="select"
                        name="gratuity_type_select_1"
                        onChange={(e) => {
                          setGratuitesTypeSelected(+e.target.value);
                        }}
                        onBlur={validationType.handleBlur}
                        value={
                          gratuitesSelected == 3 ? "" : gratuitesTypeSelected
                        }
                        disabled={gratuitesSelected == 3 ? true : false}
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
                {gratuitesTypeSelected != "6" ? (
                  <Col className="mb-2 col-1" style={{ paddingTop: "7px" }}>
                    <div className="form-outline mb-2">
                      <div className="">
                        {gratuitesTypeSelected === "3" ? (
                          <div className="d-flex justify-content-between">
                            <Label className="form-label">Amount</Label>
                            <div>
                              <i
                                className="uil-question-circle font-size-15 mx-2"
                                id="amountTooltip"
                              />
                              <Tooltip
                                placement="right"
                                isOpen={amountTooltip}
                                target="amountTooltip"
                                toggle={() => {
                                  setAmountTooltip(!amountTooltip);
                                }}
                              >
                                The amount of gratuity required by the provider.
                              </Tooltip>
                            </div>
                          </div>
                        ) : (
                          <div className="d-flex justify-content-between">
                            <Label className="form-label">% Gratuity</Label>
                            <div>
                              <i
                                className="uil-question-circle font-size-15"
                                id="gratPercentageTooltip"
                              />
                              <Tooltip
                                placement="right"
                                isOpen={gratPercentageTooltip}
                                target="gratPercentageTooltip"
                                toggle={() => {
                                  setgratPercentageTooltip(
                                    !gratPercentageTooltip
                                  );
                                }}
                              >
                                The percentage of gratuity required by the
                                provider.
                              </Tooltip>
                            </div>
                          </div>
                        )}
                      </div>
                      <div className="input-group">
                        {gratuitesTypeSelected === "3" ? (
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
                          type="text"
                          onChange={validationType.handleChange}
                          onBlur={(e) => {
                            const value = e.target.value || "";
                            validationType.setFieldValue(
                              "gratuity_percentage",
                              setDecimalFormat(value)
                            );
                          }}
                          value={
                            validationType.values.gratuity_percentage || ""
                          }
                          disabled={
                            gratuitesTypeSelected === "6" ||
                            gratuitesSelected == 3
                              ? true
                              : false
                          }
                          invalid={
                            validationType.touched.gratuity_percentage &&
                            validationType.errors.gratuity_percentage
                              ? true
                              : false
                          }
                        />
                        {gratuitesTypeSelected !== "3" ? (
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
                ) : null}

                {gratuitesTypeSelected == "3" ||
                gratuitesTypeSelected == "6" ||
                gratuitesSelected == 3 ? null : (
                  <>
                    <Col className="mb-2 col-1" style={{ paddingTop: "7px" }}>
                      <div className="form-outline mb-2" id="voucher_currency">
                        <div className="d-flex justify-content-between">
                          <Label className="form-label">Based On</Label>
                          <div>
                            <i
                              className="uil-question-circle font-size-15 mx-2"
                              id="basedOnTooltip"
                            />
                            <Tooltip
                              placement="right"
                              isOpen={basedOnTooltip}
                              target="basedOnTooltip"
                              toggle={() => {
                                setBasedOnTooltip(!basedOnTooltip);
                              }}
                            >
                              If the gratuity is a percentage, specify what it
                              is a percentage of - for example 15% of the Net
                              Price Before Taxes, or 15% of the Total Price
                              Including Taxes.
                            </Tooltip>
                          </div>
                        </div>
                        <div className="input-group">
                          <Input
                            type="select"
                            name="based_on_select_1"
                            onChange={(e) => {
                              setBasedOnSelected(e.target.value);
                            }}
                            disabled={
                              gratuitesTypeSelected == "3" ||
                              gratuitesTypeSelected == "6" ||
                              gratuitesSelected == 3
                                ? true
                                : false
                            }
                            onBlur={validationType.handleBlur}
                            value={
                              gratuitesSelected == 3 ? "" : basedOnSelected
                            }
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
                    <Col className="mb-2 col-1" style={{ paddingTop: "7px" }}>
                      <div className="form-outline mb-2" id="voucher_currency">
                        <div className="d-flex justify-content-between">
                          <Label className="form-label">Apply</Label>
                          <div>
                            <i
                              className="uil-question-circle font-size-15 mx-2"
                              id="applyTooltip"
                            />
                            <Tooltip
                              placement="right"
                              isOpen={applyTooltip}
                              target="applyTooltip"
                              toggle={() => {
                                setApplyTooltip(!applyTooltip);
                              }}
                            >
                              Is the amount of gratuity calculated on the net
                              price of the tour before taxes, or on the total
                              price of the tour including taxes?.
                            </Tooltip>
                          </div>
                        </div>
                        <div className="input-group">
                          <Input
                            type="select"
                            name="apply_select_1"
                            onChange={(e) => {
                              setApplySelected(e.target.value);
                            }}
                            onBlur={validationType.handleBlur}
                            disabled={
                              gratuitesTypeSelected == "3" ||
                              gratuitesTypeSelected == "6" ||
                              gratuitesSelected == 3
                                ? true
                                : false
                            }
                            value={gratuitesSelected == 3 ? "" : applySelected}
                          >
                            <option value="">Select....</option>
                            {map(applyData, (apply, index) => {
                              return (
                                <option
                                  key={index}
                                  value={apply.id}
                                  selected={
                                    tourSettings &&
                                    tourSettings.payment_apply_id
                                      ? apply.id ===
                                        tourSettings.payment_apply_id
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
                  </>
                )}
              </>
            ) : null}
            <Col className="mb-2 col-1" style={{ paddingTop: "7px" }}>
              <div className="form-outline mb-2" id="voucher_currency">
                <div className="d-flex justify-content-between">
                  <Label className="form-label text-paradise">Currency</Label>
                  <div>
                    <i
                      className="uil-question-circle font-size-15 mx-2"
                      id="currencyTooltip"
                    />
                    <Tooltip
                      placement="right"
                      isOpen={currencyTooltip}
                      target="currencyTooltip"
                      toggle={() => {
                        setCurrencyTooltip(!currencyTooltip);
                      }}
                    >
                      Specify the currency that the provider is quoting the
                      price in.
                    </Tooltip>
                  </div>
                </div>
                <div className="input-group">
                  <Input
                    type="select"
                    name="currency_select_1"
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
            <Col className="mb-2 col-2" style={{ paddingTop: "7px" }}>
              <div className="form-outline">
                <div className="d-flex justify-content-between">
                  <Label className="form-label text-paradise">
                    Exchange Rate
                  </Label>
                  <div>
                    <i
                      className="uil-question-circle font-size-15 mx-2"
                      id="exchangeTooltip"
                    />
                    <Tooltip
                      placement="right"
                      isOpen={exchangeTooltip}
                      target="exchangeTooltip"
                      toggle={() => {
                        setExchangeTooltip(!exchangeTooltip);
                      }}
                    >
                      Specify the exchange rate that we will use if the price is
                      in MXN.
                    </Tooltip>
                  </div>
                </div>
                <div className="input-group">
                  <span
                    className="input-group-text form-label fw-bold bg-paradise text-white border-0"
                    id="basic-addon1"
                    style={{ fontSize: "0.85em" }}
                  >
                    $
                  </span>
                  <Input
                    name="exchange_rate"
                    placeholder=""
                    type="text"
                    disabled={currencySelected === "USD"}
                    onChange={validationType.handleChange}
                    onBlur={(e) => {
                      const value = e.target.value || "";
                      validationType.setFieldValue(
                        "exchange_rate",
                        setDecimalFormat(value)
                      );
                    }}
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
              </div>
            </Col>
          </Row>
          {advanceSettings ? (
            <Row>
              <Col className="mb-2 col-2" style={{ paddingTop: "7px" }}>
                <div className="form-outline mb-2" id="voucher_currency">
                  <div className="d-flex justify-content-between">
                    <Label className="form-label">Taxes Based On</Label>
                    <div>
                      <i
                        className="uil-question-circle font-size-15 mx-2"
                        id="taxtooltip"
                      />
                      {/* <Tooltip
                        placement="right"
                        isOpen={taxTooltip}
                        target="taxtooltip"
                        toggle={() => {
                          setTaxTooltip(!taxTooltip);
                        }}
                      >
                        Does the price include tax (16% IVA) or is it priced
                        before taxes are included? If the operator will not
                        charge tax, such as when paying in cash on the day of
                        the tour, then select "Not Applicable".
                      </Tooltip> */}
                    </div>
                  </div>
                  <div className="input-group">
                    <Input
                      type="select"
                      name="tax_select_1"
                      onChange={(e) => {
                        setTaxesBasedOnSelected(e.target.value);
                      }}
                      onBlur={validationType.handleBlur}
                      //   value={validationType.values.department || ""}
                    >
                      <option value="">Select....</option>
                      {map(taxesBasedOnData, (tax, index) => {
                        return (
                          <option
                            key={index}
                            value={tax.id}
                            selected={
                              tourSettings && tourSettings.tax_based_on
                                ? tax.id === tourSettings.tax_based_on
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
                    <Label className="form-label">Commission Based On</Label>
                    <div>
                      <i
                        className="uil-question-circle font-size-15 mx-2"
                        id="gratuitiestooltip"
                      />
                      {/* <Tooltip
                        placement="right"
                        isOpen={gratuitiesTooltip}
                        target="gratuitiestooltip"
                        toggle={() => {
                          setGratuitiesTooltip(!gratuitiesTooltip);
                        }}
                      >
                        Does the price include gratuity or are gratuities extra?
                      </Tooltip> */}
                    </div>
                  </div>
                  <div className="input-group">
                    <Input
                      type="select"
                      name="gratuity_select_1"
                      onChange={(e) => {
                        setCommissionBasedOnSelected(e.target.value);
                        // console.log(e.target.value);
                      }}
                      onBlur={validationType.handleBlur}
                      //   value={validationType.values.department || ""}
                    >
                      <option value="">Select....</option>
                      {map(commissionBasedOnData, (gratuites, index) => {
                        return (
                          <option
                            key={index}
                            value={gratuites.id}
                            selected={
                              tourSettings && tourSettings.commission_based_on
                                ? gratuites.id === tourSettings.commission_based_on
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
                  <div className="d-flex justify-content-between">
                    <Label className="form-label">Apply Commission</Label>
                    <div>
                      <i
                        className="uil-question-circle font-size-15 mx-2"
                        id="gratuitiestooltip"
                      />
                      {/* <Tooltip
                        placement="right"
                        isOpen={gratuitiesTooltip}
                        target="gratuitiestooltip"
                        toggle={() => {
                          setGratuitiesTooltip(!gratuitiesTooltip);
                        }}
                      >
                        Does the price include gratuity or are gratuities extra?
                      </Tooltip> */}
                    </div>
                  </div>
                  <div className="input-group">
                    <Input
                      type="select"
                      name="gratuity_select_1"
                      onChange={(e) => {
                        setApplyCommissionSelected(e.target.value);
                        // console.log(e.target.value);
                      }}
                      onBlur={validationType.handleBlur}
                      //   value={validationType.values.department || ""}
                    >
                      <option value="">Select....</option>
                      {map(applyCommissionData, (gratuites, index) => {
                        return (
                          <option
                            key={index}
                            value={gratuites.id}
                            selected={
                              tourSettings && tourSettings.apply_commission
                                ? gratuites.id === tourSettings.apply_commission
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
          ) : null}
          <Row>
            <Col className="col-xl">
              <div
                className="mb-4 py-2 px-3"
                style={{ backgroundColor: "#FFEFDE" }}
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
            <Col className="col-1">
              <Button
                type="button"
                className="btn-orange"
                onClick={() => {
                  setPaymentsAdd(true);
                  setDataEdit(null);
                }}
                style={{ fontSize: "12px", padding: "11px" }}
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
                onClick={() => toggle("2")}
              >
                <i className="uil-angle-double-left" />
                Previous
              </Button>
              <Button
                type="submit"
                className="font-16 btn-orange"
                // onClick={toggleCategory}
              >
                Save and Continue
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
