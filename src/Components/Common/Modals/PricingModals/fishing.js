import { useEffect, useState } from "react";
import FishingImage from "../../../Assets/images/fishing.png";
import {
  getPriceAPI,
  getPricingOptionsAPI,
  postPricesAPI,
  updatePriceAPI,
  triggerUpdate
} from "../../../../Utils/API/Tours";
import {
  Row,
  Col,
  Modal,
  Form,
  Label,
  Input,
  FormFeedback,
  Button,
  Tooltip,
} from "reactstrap";
import * as Yup from "yup";
import { useFormik } from "formik";
import { map } from "lodash";
import Swal from "sweetalert2";
import {
  setDecimalFormat,
  setRateFormat,
  calcNetRate,
  calcDeposit,
  setDecimalFormatVBalance,
  setYouSaveFormat,
} from "../../../../Utils/CommonFunctions";
import { getCurrency } from "../../../../Utils/API/Operators";

const Fishing = ({
  addNewFishing,
  setAddNewFishing,
  refreshTable,
  editProductID,
  tourData,
  copyProduct,
}) => {
  let id = "";
  id = editProductID;
  //edit data
  const [dataEdit, setDataEdit] = useState();
  const [loadingData, setLoadingData] = useState(true);
  useEffect(() => {
    if (id) {
      getPriceAPI(id).then((resp) => {
        setDataEdit(resp.data.data[0]);
      });
    } else {
      setDataEdit(null)
    }
  }, [id, addNewFishing]);

  //combo box request
  const [priceTypeData, setPriceTypeData] = useState([]);
  const [priceOptions, setPriceOptions] = useState([]);
  const [priceCollect, setPriceCollect] = useState([]);
  const [priceSeason, setPriceSeason] = useState([]);
  const [priceTypeSelected, setPriceTypeSelected] = useState("");
  const [priceOptionSelected, setPriceOptionSelected] = useState("");
  const [priceCollectSelected, setPriceCollectSelected] = useState("");
  const [priceCollectNameSelected, setPriceCollectNameSelected] = useState("");
  const [priceSeasonSelected, setPriceSeasonSelected] = useState("");
  const [currency, setCurrency] = useState([])
  const [currencySelected, setCurrencySelected] = useState('')
  const [priceCharterType, setPriceCharterType] = useState([]);
  const [priceDuration, setPriceDuration] = useState([]);
  const [priceLocation, setPriceLocation] = useState([]);
  const [priceCharterTypeSelected, setPriceCharterTypeSelected] = useState("");
  const [priceDurationSelected, setPriceDurationSelected] = useState("");
  const [priceLocationSelected, setPriceLocationSelected] = useState("");

  useEffect(() => {
    if (addNewFishing) {
      setLoadingData(true)
      getPricingOptionsAPI(33).then((resp) => {
        setPriceTypeData(resp.data.data);
      });
      getPricingOptionsAPI(34).then((resp) => {
        setPriceOptions(resp.data.data);
      });
      getPricingOptionsAPI(36).then((resp) => {
        setPriceCollect(resp.data.data);
      });
      getPricingOptionsAPI(32).then((resp) => {
        setPriceSeason(resp.data.data);
      });
      getPricingOptionsAPI(47).then((resp) => {
        setPriceCharterType(resp.data.data);
      });
      getPricingOptionsAPI(35).then((resp) => {
        setPriceDuration(resp.data.data);
      });
      getPricingOptionsAPI(37).then((resp) => {
        setPriceLocation(resp.data.data);
      });
      getCurrency().then((resp) => {
        setCurrency(resp.data.data)
      })
    }
  }, [addNewFishing]);

  //checkbox
  const [activeCheckbox, setActiveCheckbox] = useState(null);
  const [balanceDueCheckbox, setBalanceDueCheckbox] = useState(null);

  const [ttop1, setttop1] = useState(false);
  const [ttop2, setttop2] = useState(false);
  const [ttop3, setttop3] = useState(false);
  const [ttop5, setttop5] = useState(false);
  const [ttop6, setttop6] = useState(false);
  const [ttop7, setttop7] = useState(false);
  const [ttop8, setttop8] = useState(false);
  const [ttop9, setttop9] = useState(false);
  const [ttop10, setttop10] = useState(false);
  const [ttop11, setttop11] = useState(false);
  const [ttop12, setttop12] = useState(false);
  const [ttop13, setttop13] = useState(false);
  const [ttop14, setttop14] = useState(false);
  const [ttop15, setttop15] = useState(false);
  const [ttop16, setttop16] = useState(false);
  const [ttop17, setttop17] = useState(false);
  const [ttop18, setttop18] = useState(false);
  const [ttop19, setttop19] = useState(false);
  const [ttop20, setttop20] = useState(false);
  const [ttop21, setttop21] = useState(false);
  const [ttop22, setttop22] = useState(false);

  const [providerCommission, setProviderCommission] = useState('')
  const [ourCommission, setOurCommission] = useState('')
  const [recalc, setRecalc] = useState(false)
  let changing = false

  useEffect(() => {
    if (dataEdit && addNewFishing && priceCollect) {
      if (copyProduct) {
        setRecalc(true)
      } else {
        setRecalc(false)
      }
      setCurrencySelected(dataEdit.voucher_currency ? dataEdit.voucher_currency : "USD")
      setPriceCollectSelected(dataEdit.pricedetails.filter((x) => x.pricing_option_id === 36)[0]
        ?.source_id)
      let priceCollectSe = priceCollect.filter(x => x.id === dataEdit.pricedetails.filter((x) => x.pricing_option_id === 14)[0]
        ?.source_id)
      if (priceCollectSe.length > 0) {
        setPriceCollectNameSelected(priceCollectSe[0].text)
      }
      setActiveCheckbox(dataEdit?.active === 1 ? true : false);
      setBalanceDueCheckbox(dataEdit?.show_balance_due === 1 ? true : false);
      setProviderCommission((dataEdit.public - dataEdit.net_rate).toFixed(2));
      setOurCommission((dataEdit.price - dataEdit.net_rate).toFixed(2));
      if (!changing) {
        changing = true
        setTimeout(() => {
          setLoadingData(false)
          changing = false
        }, 1000);
      }
    } else {
      setRecalc(true)
      setCurrencySelected("")
      setPriceTypeSelected("")
      setPriceOptionSelected("")
      setPriceCollectSelected("")
      setPriceCollectNameSelected("")
      setPriceSeasonSelected("")
      setPriceCharterTypeSelected("")
      setPriceDurationSelected("")
      setPriceLocationSelected("")
      setActiveCheckbox(false)
      setBalanceDueCheckbox(false)
      setProviderCommission("")
      setOurCommission("")
      if (validationType) {
        validationType.resetForm()
      }
      if (!changing) {
        changing = true
        setTimeout(() => {
          setLoadingData(false)
          changing = false
        }, 1000);
      }
    }
  }, [dataEdit, priceCollect]);

  const onChangeActiveToggle = () => {
    setActiveCheckbox(!activeCheckbox);
  };
  const onChangeBalanceDueToggle = () => {
    setBalanceDueCheckbox(!balanceDueCheckbox);
  };

  const validationType = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,
    initialValues: {
      min: dataEdit ? dataEdit?.pricedetails?.filter((x) => x.pricing_option_id === 35)[0]?.min : "",
      max: dataEdit ? dataEdit?.pricedetails?.filter((x) => x.pricing_option_id === 35)[0]?.max : "",
      product_name: dataEdit ? dataEdit.label : "",
      sku: dataEdit ? dataEdit.sku : "",
      active: dataEdit?.active ? 1 : 0,
      balance_checkbox: dataEdit?.show_balance_due ? 1 : 0,
      public_price: dataEdit ? dataEdit.public : "",
      provider_price: dataEdit ? dataEdit.provider_price : "",
      rate: dataEdit ? setRateFormat(dataEdit.provider_rate) : "",
      net_rate: dataEdit ? dataEdit.net_rate : "",
      compare_at_url: dataEdit ? dataEdit.compare_at_url : "",
      ship_price: dataEdit ? dataEdit.ship_price : "",
      compare_at: dataEdit ? dataEdit.compare_at : "",
      our_price: dataEdit ? dataEdit.price : "",
      you_save: dataEdit ? setYouSaveFormat(dataEdit.you_save) : "",
      eff_rate: dataEdit ? setRateFormat(dataEdit.eff_rate) : "",
      deposit: dataEdit ? dataEdit.deposit : "",
      balance_due: dataEdit ? dataEdit.net_price : "",
      voucher_balance: dataEdit ? (dataEdit.voucher_balance ? setDecimalFormatVBalance(dataEdit.voucher_balance, dataEdit.voucher_currency) : setDecimalFormatVBalance(dataEdit.price - dataEdit.deposit)) : ""
    },
    validationSchema: Yup.object().shape({
      min: Yup.number().integer().nullable(),
      max: Yup.number().integer().nullable(),
      public_price: Yup.number().required("Field Required"),
      provider_price: Yup.number().nullable(),
      rate: Yup.number().nullable(),
      net_rate: Yup.number().nullable(),
      ship_price: Yup.number().nullable(),
      compare_at: Yup.number().nullable(),
      compare_at_url: Yup.string().url("URL invalid format").trim().nullable(),
      our_price: Yup.number().required("Field Required"),
      deposit: Yup.number().required("Field Required"),
      balance_due: Yup.number(),
    }),
    onSubmit: (values, { resetForm }) => {
      let price_type = (priceTypeSelected === '' || priceTypeSelected === undefined) ? (dataEdit && dataEdit.pricedetails
        ? dataEdit.pricedetails.filter(x => x.pricing_option_id === 33)[0]?.source_id
        : null) : priceTypeSelected

      let price_option = (priceOptionSelected === '' || priceOptionSelected === undefined) ? (dataEdit && dataEdit.pricedetails
        ? dataEdit.pricedetails.filter(x => x.pricing_option_id === 34)[0]?.source_id
        : null) : priceOptionSelected

      let price_collect = (priceCollectSelected === '' || priceCollectSelected === undefined) ? (dataEdit && dataEdit.pricedetails
        ? dataEdit.pricedetails.filter(x => x.pricing_option_id === 36)[0]?.source_id
        : null) : priceCollectSelected

      let price_season = (priceSeasonSelected === '' || priceSeasonSelected === undefined) ? (dataEdit && dataEdit.pricedetails
        ? (dataEdit.pricedetails.filter(x => x.pricing_option_id === 32)[0]?.source_id === undefined ? null : dataEdit.pricedetails.filter(x => x.pricing_option_id === 32)[0]?.source_id)
        : null) : priceSeasonSelected

      let charter_type = (priceCharterTypeSelected === '' || priceCharterTypeSelected === undefined) ? (dataEdit && dataEdit.pricedetails
        ? (dataEdit.pricedetails.filter(x => x.pricing_option_id === 47)[0]?.source_id === undefined ? null : dataEdit.pricedetails.filter(x => x.pricing_option_id === 47)[0]?.source_id)
        : null) : priceCharterTypeSelected

      let price_duration = (priceDurationSelected === '' || priceDurationSelected === undefined) ? (dataEdit && dataEdit.pricedetails
        ? (dataEdit.pricedetails.filter(x => x.pricing_option_id === 35)[0]?.source_id === undefined ? null : dataEdit.pricedetails.filter(x => x.pricing_option_id === 35)[0]?.source_id)
        : null) : priceDurationSelected

      let price_location = (priceLocationSelected === '' || priceLocationSelected === undefined) ? (dataEdit && dataEdit.pricedetails
        ? (dataEdit.pricedetails.filter(x => x.pricing_option_id === 37)[0]?.source_id === undefined ? null : dataEdit.pricedetails.filter(x => x.pricing_option_id === 37)[0]?.source_id)
        : null) : priceLocationSelected

      if (price_type && price_option && price_collect) {
        let data = {
          tour_id: tourData.id,
          public: values.public_price,
          provider_price: values.provider_price,
          provider_rate: ((values.rate !== "") ? ((values.rate > 1) ? values.rate / 100 : values.rate) : values.rate),
          net_rate: values.net_rate,
          compare_at_url: values.compare_at_url,
          ship_price: values.ship_price,
          compare_at: values.compare_at,
          price: values.our_price,
          you_save: values.you_save,
          eff_rate: values.eff_rate,
          commission: ourCommission,
          deposit: values.deposit,
          net_price: values.balance_due,
          active: activeCheckbox ? 1 : 0,
          show_balance_due: balanceDueCheckbox ? 1 : 0,
          voucher_balance: values.voucher_balance,
          currencySelected: currencySelected,
          price_details: [
            {
              pricing_option_id: 33,
              source_id: price_type,
              min: null,
              max: null,
              label: null,
            },
            {
              pricing_option_id: 34,
              source_id: price_option,
              min: null,
              max: null,
              label: null,
            },
            {
              pricing_option_id: 36,
              source_id: price_collect,
              min: null,
              max: null,
              label: null,
            },
            {
              pricing_option_id: 32,
              source_id: price_season,
              min: null,
              max: null,
              label: null,
            },
            {
              pricing_option_id: 47,
              source_id: charter_type,
              min: null,
              max: null,
              label: null,
            },
            {
              pricing_option_id: 35,
              source_id: price_duration,
              min: (values.min === "") ? null : values.min,
              max: (values.max === "") ? null : values.max,
              label: null,
            },
            {
              pricing_option_id: 37,
              source_id: price_location,
              min: null,
              max: null,
              label: null,
            },
          ],
        };

        document.getElementById("save-button").disabled = true;
        if (dataEdit && copyProduct === false) {
          updatePriceAPI(editProductID, data).then((resp) => {
            // console.log(resp);
            triggerUpdate()
            setAddNewFishing(false);
            refreshTable();
            resetForm({ values: "" });
            document.getElementById("save-button").disabled = false;
          }).catch((error) => {
            if (error.response.data.data === null) {
              Swal.fire(
                "Error!",
                String(error.response.data.message)
              );
            } else {
              let errorMessages = [];
              Object.entries(error.response.data.data).map((item) => {
                errorMessages.push(item[1]);
                return true
              });

              Swal.fire(
                "Error!",
                String(errorMessages[0])
              );
            }
            document.getElementById("save-button").disabled = false;
          });
        } else if (copyProduct || dataEdit === undefined || dataEdit === null) {
          postPricesAPI(data).then((resp) => {
            triggerUpdate()
            setAddNewFishing(false);
            refreshTable();
            resetForm({ values: "" });
            document.getElementById("save-button").disabled = false;
          }).catch((error) => {
            if (error.response.data.data === null) {
              Swal.fire(
                "Error!",
                String(error.response.data.message)
              );
            } else {
              let errorMessages = [];
              Object.entries(error.response.data.data).map((item) => {
                errorMessages.push(item[1]);
                return true
              });

              Swal.fire(
                "Error!",
                String(errorMessages[0])
              );
            }
            document.getElementById("save-button").disabled = false;
          });
        }
      } else {
        Swal.fire('Complete Required Fields')
        document.getElementById("save-button").disabled = false;
      }
      refreshTable();
    },
  });
  

  // Pricing Validations
  useEffect(() => {
    if (recalc) {
      if (validationType.values.public_price !== "" && validationType.values.public_price !== 0) {
        if (validationType.values.rate !== "" && validationType.values.rate !== 0) {
          let net_rate = calcNetRate(validationType.values.public_price, validationType.values.rate, validationType.values.net_rate)
          validationType.setFieldValue("net_rate", net_rate)
        }
      }
    }
  }, [validationType.values.public_price, validationType.values.rate])

  useEffect(() => {
    if (validationType.values.net_rate !== "" && validationType.values.net_rate !== 0) {
      setProviderCommission((validationType.values.public_price - validationType.values.net_rate).toFixed(2))
      if (recalc) {
        if (validationType.values.our_price !== "" && validationType.values.our_price !== 0 && validationType.values.net_rate !== "" && validationType.values.net_rate !== 0) {
          setOurCommission((validationType.values.our_price - validationType.values.net_rate).toFixed(2))
        }
      }
    }
  }, [validationType.values.net_rate, validationType.values.our_price])

  useEffect(() => {
    if (validationType.values.our_price !== "" && validationType.values.our_price !== 0) {
      validationType.setFieldValue("balance_due", (validationType.values.our_price - ourCommission).toFixed(2))
      validationType.setFieldValue("eff_rate", setRateFormat(ourCommission / validationType.values.our_price, 1))
    }
  }, [validationType.values.our_price, ourCommission])

  useEffect(() => {
    if (currencySelected) {
      validationType.setFieldValue("voucher_balance", setDecimalFormatVBalance(validationType.values.voucher_balance, currencySelected))
    }
  }, [currencySelected])

  useEffect(() => {
    if (validationType.values.our_price !== "" && validationType.values.deposit !== "") {
      validationType.setFieldValue("voucher_balance", setDecimalFormatVBalance((validationType.values.our_price - validationType.values.deposit), currencySelected))
    }
  }, [validationType.values.our_price, validationType.values.deposit])

  useEffect(() => {
    if (validationType.values.our_price !== "" && priceCollectNameSelected !== "") {
      validationType.setFieldValue(
        "deposit",
        calcDeposit(
          validationType.values.our_price,
          priceCollectNameSelected,
          ourCommission,
          validationType.values.deposit
        )
      )
    }
  }, [validationType.values.our_price, priceCollectNameSelected])

  useEffect(() => {
    if (recalc) {
      if (validationType.values.our_price !== "" && validationType.values.ship_price && validationType.values.ship_price !== null && validationType.values.ship_price !== "0.00") {
        validationType.setFieldValue("you_save", setYouSaveFormat((validationType.values.our_price / validationType.values.ship_price)))
      } else if (validationType.values.our_price !== "" && validationType.values.compare_at !== "" && validationType.values.compare_at !== null && validationType.values.compare_at !== "0.00") {
        validationType.setFieldValue("you_save", setYouSaveFormat((validationType.values.our_price / validationType.values.compare_at)))
      }
    }
  }, [validationType.values.our_price, validationType.values.ship_price, validationType.values.compare_at])

  return (
    <Modal
      centered
      size="xl"
      isOpen={addNewFishing}
      toggle={() => {
        // onClickAddNew();
      }}
    >
      <div
        className="modal-header"
        style={{ backgroundColor: "#3DC7F4", border: "none" }}
      >
        {
          copyProduct ?
            (
              <h1 className="modal-title mt-0 text-white">+ Copy Product - Fishing</h1>
            ) : null
        }
        {
          copyProduct === false && dataEdit ?
            (
              <h1 className="modal-title mt-0 text-white">+ Edit Product - Fishing</h1>
            ) : null
        }
        {
          copyProduct === false && !dataEdit ?
            (
              <h1 className="modal-title mt-0 text-white">+ New Product - Fishing</h1>
            ) : null
        }
        <button
          onClick={() => {
            setAddNewFishing(false);
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
      <div className="modal-body p-4">
        {loadingData ? (
          <div className="d-flex justify-content-center">
            <div className="spinner-border text-orange" role="status">
              <span className="sr-only">Loading...</span>
            </div>
            <h2 className="mx-5 text-orange">Loading...</h2>
          </div>
        ) : (
          <Form
            onSubmit={(e) => {
              e.preventDefault();
              validationType.handleSubmit();
              return false;
            }}
            className="custom-validation"
          >
            <Row className="g-4">
              <Col className="col-3">
                <img
                  src={FishingImage}
                  alt="new-product"
                  className="w-100"
                />
              </Col>
              <Col className="col-9">
                {
                  dataEdit ? (
                    <Row>
                      <Col className="col-9">
                        <div className="form-outline mb-4">
                          <Label className="form-label">Product Name</Label>
                          <Input
                            name="product_name"
                            placeholder=""
                            type="text"
                            disabled
                            value={validationType.values.product_name || ""}
                          />
                        </div>
                      </Col>
                      <Col className="col-3">
                        <div className="form-outline mb-4">
                          <Label className="form-label">SKU</Label>
                          <Input
                            name="sku"
                            placeholder=""
                            type="text"
                            disabled
                            value={validationType.values.sku || ""}
                          />
                        </div>
                      </Col>
                    </Row>
                  ) : null
                }
                <Row>
                  <Col className="col">
                    <div className="form-outline">
                      <div className="d-flex justify-content-between">
                        <Label className="form-label">Price Type*</Label>
                        <div>
                          <i
                            className="uil-question-circle font-size-15 mx-2"
                            id="priceType"
                          />
                          <Tooltip
                            placement="right"
                            isOpen={ttop1}
                            target="priceType"
                            toggle={() => {
                              setttop1(!ttop1);
                            }}
                          >
                            Select how the product will be priced. Example: "Per
                            Item" could be Per ATV, or Per Boat. "Per Person"
                            could be Per Adult, or Per Child.
                          </Tooltip>
                        </div>
                      </div>
                      <Input
                        type="select"
                        name="price_type"
                        onChange={(e) => {
                          setPriceTypeSelected(e.target.value);
                        }}
                        onBlur={validationType.handleBlur}
                      >
                        <option value="">Select....</option>
                        {map(priceTypeData, (type, index) => {
                          return (
                            <option
                              key={index}
                              value={type.id}
                              selected={
                                dataEdit && dataEdit.pricedetails
                                  ? type.id ===
                                  dataEdit.pricedetails.filter(x => x.pricing_option_id === 33)[0]?.source_id
                                  : false
                              }
                            >
                              {type.text}
                            </option>
                          );
                        })}
                      </Input>
                    </div>
                  </Col>
                  <Col className="col">
                    <div className="form-outline">
                      <div className="d-flex justify-content-between">
                        <Label className="form-label">Price Option*</Label>
                        <div>
                          <i
                            className="uil-question-circle font-size-15 mx-2"
                            id="priceOptions"
                          />
                          <Tooltip
                            placement="right"
                            isOpen={ttop2}
                            target="priceOptions"
                            toggle={() => {
                              setttop2(!ttop2);
                            }}
                          >
                            This option will display in the product name in
                            parenthesis, it will also show on the booking form as
                            the label for the Quantity drop-down or as an option
                            in the Choose Activity drop-down, depending on the
                            reserve page template chosen. The option chosen here
                            will automatically assign the last digit of the SKU.
                          </Tooltip>
                        </div>
                      </div>
                      <Input
                        type="select"
                        name="price_options"
                        onChange={(e) => {
                          setPriceOptionSelected(e.target.value);
                        }}
                        onBlur={validationType.handleBlur}
                      //   value={validationType.values.department || ""}
                      >
                        <option value="">Select....</option>
                        {map(priceOptions, (option, index) => {
                          return (
                            <option
                              key={index}
                              value={option.id}
                              selected={
                                dataEdit && dataEdit.pricedetails
                                  ? option.id ===
                                  dataEdit.pricedetails.filter(x => x.pricing_option_id === 34)[0]?.source_id
                                  : false
                              }
                            >
                              {option.text}
                            </option>
                          );
                        })}
                      </Input>
                    </div>
                  </Col>
                  <Col className="col">
                    <div className="form-outline">
                      <div className="d-flex justify-content-between">
                        <Label className="form-label">Collect*</Label>
                        <div>
                          <i
                            className="uil-question-circle font-size-15 mx-2"
                            id="collect_t"
                          />
                          <Tooltip
                            placement="right"
                            isOpen={ttop3}
                            target="collect_t"
                            toggle={() => {
                              setttop3(!ttop3);
                            }}
                          >
                            Select the amount of deposit that will be collected at
                            the time of booking. Commission = The deposit is equal
                            to the amount of commission we earn for the tour.
                            Afilliate = The payment is made directly through the
                            provider's website, such as the case of dTraveller or
                            Viator. Deposit = Manually type the amount of deposit
                            we will collect in the "Deposit" field below.
                          </Tooltip>
                        </div>
                      </div>
                      <Input
                        type="select"
                        name="collect"
                        onChange={(e) => {
                          setRecalc(true)
                          setPriceCollectSelected(e.target.value);
                          setPriceCollectNameSelected(e.target.selectedOptions[0].label);
                        }}
                      >
                        <option value="">Select....</option>
                        {map(priceCollect, (collect, index) => {
                          return (
                            <option
                              key={index}
                              value={collect.id}
                              selected={
                                dataEdit && dataEdit.pricedetails
                                  ? collect.id ===
                                  dataEdit.pricedetails.filter(x => x.pricing_option_id === 36)[0]?.source_id
                                  : false
                              }
                            >
                              {collect.text}
                            </option>
                          );
                        })}
                      </Input>
                    </div>
                  </Col>
                  {tourData?.seasonality === 1 ? (
                    <Col className="col">

                      <div
                        className="form-outline"

                      >
                        <Label className="form-label">Season*</Label>
                        <Input
                          type="select"
                          name="season"
                          onChange={(e) => {
                            setPriceSeasonSelected(e.target.value);
                          }}
                          onBlur={validationType.handleBlur}
                        //   value={validationType.values.department || ""}
                        >
                          <option value="">Select....</option>
                          {map(priceSeason, (season, index) => {
                            return (
                              <option
                                key={index}
                                value={season.id}
                                selected={
                                  dataEdit && dataEdit.pricedetails
                                    ? season.id ===
                                    dataEdit.pricedetails.filter(x => x.pricing_option_id === 32)[0]?.source_id
                                    : false
                                }
                              >
                                {season.text}
                              </option>
                            );
                          })}
                        </Input>
                      </div>
                    </Col>
                  ) : null}

                  <Col className="col-3 d-flex">
                    {activeCheckbox !== null ? (
                      <div className="d-flex flex-column align-items-center mx-1">
                        <div className="d-flex justify-content-between">
                          <Label className="form-label">Active</Label>
                          <i
                            className="uil-question-circle font-size-15 mx-2"
                            id="active-t"
                          />
                          <Tooltip
                            placement="right"
                            isOpen={ttop18}
                            target="active-t"
                            toggle={() => {
                              setttop18(!ttop18);
                            }}
                          >
                            Select if the tour is active for booking or not.
                          </Tooltip>
                        </div>
                        <div className="form-check form-switch form-switch-md">
                          <Input
                            name="active"
                            placeholder=""
                            type="checkbox"
                            checked={activeCheckbox}
                            className={activeCheckbox ? "form-check-input start-0 blue-switch-filled-mini" : "form-check-input start-0"}
                            onChange={() => onChangeActiveToggle()}
                            onBlur={validationType.handleBlur}
                            value={validationType.values.active || ""}
                            invalid={
                              validationType.touched.active &&
                                validationType.errors.active
                                ? true
                                : false
                            }
                          />
                          {validationType.touched.active &&
                            validationType.errors.active ? (
                            <FormFeedback type="invalid">
                              {validationType.errors.active}
                            </FormFeedback>
                          ) : null}
                        </div>
                      </div>
                    ) : null}

                    {balanceDueCheckbox !== null ? (
                      <div className="d-flex flex-column align-items-center">
                        <div className="d-flex justify-content-between">
                          <Label className="form-label">Balance Due</Label>
                          <i
                            className="uil-question-circle font-size-15 mx-1"
                            id="active-t"
                          />
                          <Tooltip
                            placement="right"
                            isOpen={ttop19}
                            target="active-t"
                            toggle={() => {
                              setttop19(!ttop19);
                            }}
                          >
                            Select whether the balance due should be shown to the provider in the "Please Confirm" email. This amount will be the same as in the "Voucher Balance" below. It is the amount the customer will pay to the provider on the day of the tour.
                          </Tooltip>
                        </div>
                        <div className="form-check form-switch form-switch-md">
                          <Input
                            name="balance_checkbox"
                            placeholder=""
                            type="checkbox"
                            checked={balanceDueCheckbox}
                            className={balanceDueCheckbox ? "form-check-input start-0 blue-switch-filled-mini" : "form-check-input start-0"}
                            onChange={() => onChangeBalanceDueToggle()}
                            onBlur={validationType.handleBlur}
                            value={validationType.values.balance_checkbox || ""}
                            invalid={
                              validationType.touched.balance_checkbox &&
                                validationType.errors.balance_checkbox
                                ? true
                                : false
                            }
                          />
                          {validationType.touched.balance_checkbox &&
                            validationType.errors.balance_checkbox ? (
                            <FormFeedback type="invalid">
                              {validationType.errors.balance_checkbox}
                            </FormFeedback>
                          ) : null}
                        </div>
                      </div>
                    ) : null}
                  </Col>
                </Row>
                <Col
                  className="col-12 p-1 my-2"
                  style={{ backgroundColor: "#E9F4FF" }}
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
                    Charter Options
                  </p>
                </Col>
                <Row className="d-flex">
                  <Col className="col-3">
                    <div className="form-outline mb-2">
                      <Label className="form-label">Charter Type</Label>
                      <Input
                        type="select"
                        name="charterType"
                        onChange={(e) => {
                          setPriceCharterTypeSelected(e.target.value);
                        }}
                        onBlur={validationType.handleBlur}
                      //   value={validationType.values.department || ""}
                      >
                        <option value="">Select....</option>
                        {map(priceCharterType, (charterType, index) => {
                          return (
                            <option
                              key={index}
                              value={charterType.id}
                              selected={
                                dataEdit && dataEdit.pricedetails
                                  ? charterType.id ===
                                  dataEdit.pricedetails.filter(x => x.pricing_option_id === 47)[0]?.source_id
                                  : false
                              }
                            >
                              {charterType.text}
                            </option>
                          );
                        })}
                      </Input>
                    </div>
                  </Col>
                  <Col className="col-2">
                    <div className="form-outline mb-2">
                      <Label className="form-label">Duration</Label>
                      <Input
                        type="select"
                        name="duration"
                        onChange={(e) => {
                          setPriceDurationSelected(e.target.value);
                        }}
                        onBlur={validationType.handleBlur}
                      //   value={validationType.values.department || ""}
                      >
                        <option value="">Select....</option>
                        {map(priceDuration, (duration, index) => {
                          return (
                            <option
                              key={index}
                              value={duration.id}
                              selected={
                                dataEdit && dataEdit.pricedetails
                                  ? duration.id ===
                                  dataEdit.pricedetails.filter(x => x.pricing_option_id === 35)[0]?.source_id
                                  : false
                              }
                            >
                              {duration.text}
                            </option>
                          );
                        })}
                      </Input>
                    </div>
                  </Col>
                  <Col className="col-2">
                    <div className="form-outline mb-2">
                      <Label className="form-label">Min. Pax.</Label>
                      <Input
                        name="min"
                        placeholder=""
                        className="me-1"
                        type="number"
                        min="0"
                        onChange={validationType.handleChange}
                        onBlur={validationType.handleBlur}
                        value={validationType.values.min || ""}
                        invalid={
                          validationType.touched.min && validationType.errors.min
                            ? true
                            : false
                        }
                      />
                      {validationType.touched.min && validationType.errors.min ? (
                        <FormFeedback type="invalid">
                          {validationType.errors.min}
                        </FormFeedback>
                      ) : null}
                    </div>
                  </Col>

                  <Col className="col-2">
                    <div className="form-outline mb-2">
                      <Label className="form-label">Max. Pax.</Label>
                      <Input
                        name="max"
                        placeholder=""
                        type="number"
                        min="0"
                        onChange={validationType.handleChange}
                        onBlur={validationType.handleBlur}
                        value={validationType.values.max || ""}
                        invalid={
                          validationType.touched.max && validationType.errors.max
                            ? true
                            : false
                        }
                      />
                      {validationType.touched.max && validationType.errors.max ? (
                        <FormFeedback type="invalid">
                          {validationType.errors.max}
                        </FormFeedback>
                      ) : null}
                    </div>
                  </Col>
                  <Col className="col-3">
                    <div className="form-outline mb-2">
                      <Label className="form-label">Meeting Location</Label>
                      <Input
                        type="select"
                        name="meetingLocation"
                        onChange={(e) => {
                          setPriceLocationSelected(e.target.value);
                        }}
                        onBlur={validationType.handleBlur}
                      //   value={validationType.values.department || ""}
                      >
                        <option value="">Select....</option>
                        {map(priceLocation, (location, index) => {
                          return (
                            <option
                              key={index}
                              value={location.id}
                              selected={
                                dataEdit && dataEdit.pricedetails
                                  ? location.id ===
                                  dataEdit.pricedetails.filter(x => x.pricing_option_id === 37)[0]?.source_id
                                  : false
                              }
                            >
                              {location.text}
                            </option>
                          );
                        })}
                      </Input>
                    </div>
                  </Col>
                </Row>
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
                    Provider Pricing
                  </p>
                </Col>
                <Row className="d-flex">
                  <Col className="col-2">
                    <div className="form-outline mb-2" id="public_price">
                      <div className="d-flex justify-content-between">
                        <Label className="form-label">Public Price</Label>
                        <div>
                          <i
                            className="uil-question-circle font-size-15"
                            id="publicPrice"
                          />
                          <Tooltip
                            placement="right"
                            isOpen={ttop5}
                            target="publicPrice"
                            toggle={() => {
                              setttop5(!ttop5);
                            }}
                          >
                            The price the provider refers to in our service agreement as the "Public Price" or "Regular Price".
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
                          name="public_price"
                          placeholder=""
                          type="text"
                          onChange={validationType.handleChange}
                          onBlur={(e) => {
                            const value = e.target.value || "";
                            validationType.setFieldValue(
                              "public_price",
                              setDecimalFormat(value)
                            );
                          }}
                          value={validationType.values.public_price || ""}
                          invalid={
                            validationType.touched.public_price &&
                              validationType.errors.public_price
                              ? true
                              : false
                          }
                        />

                      </div>
                    </div>
                  </Col>
                  <Col className="col-2">
                    <div className="form-outline mb-2" id="provider_price">
                      <div className="d-flex justify-content-between">
                        <Label className="form-label">Provider Price</Label>
                        <div>
                          <i
                            className="uil-question-circle font-size-15"
                            id="providerPrice"
                          />
                          <Tooltip
                            placement="right"
                            isOpen={ttop6}
                            target="providerPrice"
                            toggle={() => {
                              setttop6(!ttop6);
                            }}
                          >
                            The price the provider sells the tour for on their own
                            website.
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
                          name="provider_price"
                          placeholder=""
                          type="text"
                          min="0"
                          step="any"
                          onChange={validationType.handleChange}
                          onBlur={(e) => {
                            const value = e.target.value || "";
                            validationType.setFieldValue(
                              "provider_price",
                              setDecimalFormat(value)
                            );
                          }}
                          value={validationType.values.provider_price || ""}
                          invalid={
                            validationType.touched.provider_price &&
                              validationType.errors.provider_price
                              ? true
                              : false
                          }
                        />

                      </div>

                    </div>
                  </Col>
                  <Col className="col-2">
                    <div className="form-outline mb-2" id="rate">
                      <div className="d-flex justify-content-between">
                        <Label className="form-label">Rate %</Label>
                        <div>
                          <i
                            className="uil-question-circle font-size-15 "
                            id="rate_t"
                          />
                          <Tooltip
                            placement="right"
                            isOpen={ttop7}
                            target="rate_t"
                            toggle={() => {
                              setttop7(!ttop7);
                            }}
                          >
                            The commission rate for the tour that is specified in
                            our service agreement. If only a Net Price is
                            specified then leave blank.
                          </Tooltip>
                        </div>
                      </div>
                      <div className="input-group">
                        <Input
                          name="rate"
                          placeholder=""
                          onChange={validationType.handleChange}
                          onBlur={(e) => {
                            setRecalc(true)
                            const value = e.target.value || "";
                            validationType.setFieldValue(
                              "rate",
                              setRateFormat(value));
                          }}
                          value={validationType.values.rate || ""}
                          invalid={
                            validationType.touched.rate &&
                              validationType.errors.rate
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
                  <Col className="col-2">
                    <div className="form-outline mb-2" id="net_rate">
                      <div className="d-flex justify-content-between">
                        <Label className="form-label">Net Price</Label>
                        <div>
                          <i
                            className="uil-question-circle font-size-15"
                            id="netRate"
                          />
                          <Tooltip
                            placement="right"
                            isOpen={ttop8}
                            target="netRate"
                            toggle={() => {
                              setttop8(!ttop8);
                            }}
                          >
                            The Net Price specified in our service agreement for
                            the tour. If only a commission rate is specified in
                            the agreement then this will automatically calculate
                            and no entry is required.
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
                          name="net_rate"
                          placeholder=""
                          type="text"
                          min="0"
                          step="any"
                          onChange={validationType.handleChange}
                          onBlur={(e) => {
                            const value = e.target.value || "";
                            validationType.setFieldValue(
                              "net_rate",
                              setDecimalFormat(value)
                            );
                          }}
                          value={validationType.values.net_rate || ""}
                          invalid={
                            validationType.touched.net_rate &&
                              validationType.errors.net_rate
                              ? true
                              : false
                          }
                        />

                      </div>

                    </div>
                  </Col>
                  <Col className="col-2">
                    <div className="form-outline mb-2" id="commission">
                      <div className="d-flex justify-content-between">
                        <Label className="form-label">Commission</Label>
                        <div>
                          <i
                            className="uil-question-circle font-size-15"
                            id="commission_p"
                          />
                          <Tooltip
                            placement="right"
                            isOpen={ttop20}
                            target="commission_p"
                            toggle={() => {
                              setttop20(!ttop20);
                            }}
                          >
                            The agreed commission based on the service agreement before any discounts are applied. This is automatically calculated based on the Net Price so no entry is required.
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
                          name="provider_commission"
                          readOnly
                          placeholder=""
                          type="text"
                          value={providerCommission}
                        />
                      </div>
                    </div>
                  </Col>
                  <Col className="col-2">
                    <div className="form-outline mb-2" id="balance_due">
                      <div className="d-flex justify-content-between">
                        <Label className="form-label">Balance Due</Label>
                        <div>
                          <i
                            className="uil-question-circle font-size-15"
                            id="balanceDue"
                          />
                          <Tooltip
                            placement="right"
                            isOpen={ttop17}
                            target="balanceDue"
                            toggle={() => {
                              setttop17(!ttop17);
                            }}
                          >
                            The amount due to the provider on the invoice.<br />Our Price - Our Commission.
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
                          name="balance_due"
                          placeholder=""
                          type="text"
                          readOnly
                          onChange={validationType.handleChange}
                          onBlur={(e) => {
                            const value = e.target.value || "";
                            validationType.setFieldValue(
                              "balance_due",
                              setDecimalFormat(value)
                            );
                          }}
                          value={validationType.values.balance_due || ""}
                          invalid={
                            validationType.touched.balance_due &&
                              validationType.errors.balance_due
                              ? true
                              : false
                          }
                        />
                        {validationType.touched.balance_due &&
                          validationType.errors.balance_due ? (
                          <FormFeedback type="invalid">
                            {validationType.errors.balance_due}
                          </FormFeedback>
                        ) : null}
                      </div>

                    </div>
                  </Col>


                </Row>
                <Col
                  className="col-12 p-1 my-2"
                  style={{ backgroundColor: "#FFFBC8" }}
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
                    Our Pricing
                  </p>
                </Col>
                <Row className="d-flex">

                  <Col className="col-2">
                    <div className="form-outline mb-2" id="our_price">
                      <div className="d-flex justify-content-between">
                        <Label className="form-label">Our Price*</Label>
                        <div>
                          <i
                            className="uil-question-circle font-size-15"
                            id="ourPrice"
                          />
                          <Tooltip
                            placement="right"
                            isOpen={ttop12}
                            target="ourPrice"
                            toggle={() => {
                              setttop12(!ttop12);
                            }}
                          >
                            The price we will sell the tour for.
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
                          name="our_price"
                          placeholder=""
                          type="text"
                          min="0"
                          step="any"
                          onChange={validationType.handleChange}
                          onBlur={(e) => {
                            setRecalc(true)
                            const value = e.target.value || "";
                            validationType.setFieldValue(
                              "our_price",
                              setDecimalFormat(value)
                            );
                          }}
                          value={validationType.values.our_price || ""}
                          invalid={
                            validationType.touched.our_price &&
                              validationType.errors.our_price
                              ? true
                              : false
                          }
                        />
                        {validationType.touched.our_price &&
                          validationType.errors.our_price ? (
                          <FormFeedback type="invalid">
                            {validationType.errors.our_price}
                          </FormFeedback>
                        ) : null}
                      </div>

                    </div>
                  </Col>
                  <Col className="col-2">
                    <div className="form-outline mb-2" id="commission">
                      <div className="d-flex justify-content-between">
                        <Label className="form-label">Commission*</Label>
                        <div>
                          <i
                            className="uil-question-circle font-size-15"
                            id="commission_t"
                          />
                          <Tooltip
                            placement="right"
                            isOpen={ttop15}
                            target="commission_t"
                            toggle={() => {
                              setttop15(!ttop15);
                            }}
                          >
                            The $$ amount that we earn from the sale.
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
                          name="commission"
                          placeholder=""
                          readOnly
                          type="text"
                          value={ourCommission}
                        />
                      </div>
                    </div>
                  </Col>
                  <Col className="col-2">
                    <div className="form-outline mb-2" id="eff_rate">
                      <div className="d-flex justify-content-between">
                        <Label className="form-label">Eff. Rate</Label>
                        <div>
                          <i
                            className="uil-question-circle font-size-15"
                            id="effRate"
                          />
                          <Tooltip
                            placement="right"
                            isOpen={ttop14}
                            target="effRate"
                            toggle={() => {
                              setttop14(!ttop14);
                            }}
                          >
                            After discounting the tour, what our effective
                            commission rate is (what we have left after the
                            discount). This is calculated based on (Commission /
                            Our Price = Eff. Rate).
                          </Tooltip>
                        </div>
                      </div>
                      <div className="input-group">
                        <Input
                          name="eff_rate"
                          placeholder=""
                          type="text"
                          readOnly
                          onChange={validationType.handleChange}
                          onBlur={(e) => {
                            const value = e.target.value || "";
                            validationType.setFieldValue(
                              "eff_rate",
                              setRateFormat(value)
                            );
                          }}
                          value={validationType.values.eff_rate || ""}
                          invalid={
                            validationType.touched.eff_rate &&
                              validationType.errors.eff_rate
                              ? true
                              : false
                          }
                        />
                        {validationType.touched.eff_rate &&
                          validationType.errors.eff_rate ? (
                          <FormFeedback type="invalid">
                            {validationType.errors.eff_rate}
                          </FormFeedback>
                        ) : null}
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
                  <Col className="col-2">
                    <div className="form-outline mb-2" id="deposit">
                      <div className="d-flex justify-content-between">
                        <Label className="form-label">Deposit*</Label>
                        <div>
                          <i
                            className="uil-question-circle font-size-15"
                            id="deposit_t"
                          />
                          <Tooltip
                            placement="right"
                            isOpen={ttop16}
                            target="deposit_t"
                            toggle={() => {
                              setttop16(!ttop16);
                            }}
                          >
                            The amount we collect at the time of booking. This is
                            calculated based on the option chosen in "Collect"
                            above.
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
                          name="deposit"
                          placeholder=""
                          readOnly={+priceCollectSelected !== 1 && +priceCollectSelected !== 25 && +priceCollectSelected !== 3}
                          type="text"
                          onChange={validationType.handleChange}
                          onBlur={(e) => {
                            const value = e.target.value || "";
                            validationType.setFieldValue(
                              "deposit",
                              setDecimalFormat(value)
                            );
                          }}
                          value={validationType.values.deposit || ""}
                          invalid={
                            validationType.touched.deposit &&
                              validationType.errors.deposit
                              ? true
                              : false
                          }
                        />
                        {validationType.touched.deposit &&
                          validationType.errors.deposit ? (
                          <FormFeedback type="invalid">
                            {validationType.errors.deposit}
                          </FormFeedback>
                        ) : null}
                      </div>

                    </div>
                  </Col>
                  <Col className="col-2">
                    <div className="form-outline mb-2" id="voucher_currency">
                      <div className="d-flex justify-content-between">
                        <Label className="form-label">Vchr. Currency</Label>
                        <div>
                          <i
                            className="uil-question-circle font-size-15"
                            id="v_currency"
                          />
                          <Tooltip
                            placement="right"
                            isOpen={ttop21}
                            target="v_currency"
                            toggle={() => {
                              setttop21(!ttop21);
                            }}
                          >
                            Choose the currency that the Balance Due on the confirmation voucher will be shown in (USD or MXN Pesos).
                          </Tooltip>
                        </div>
                      </div>
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
                          {map(currency, (curr, index) => {
                            return (
                              <option
                                key={index}
                                value={curr.currency_id}
                                selected={
                                  dataEdit && dataEdit.voucher_currency
                                    ? curr.currency_id === dataEdit.voucher_currency
                                    : (curr.currency_id === "USD" || curr.currency_id === "USD")
                                }
                              >
                                {curr.currency}
                              </option>
                            );
                          })}
                        </Input>

                      </div>

                    </div>
                  </Col>
                  <Col className="col-2">
                    <div className="form-outline mb-2" id="voucher_balance">
                      <div className="d-flex justify-content-between">
                        <Label style={{ "fontSize": "13px" }} className="form-label">Voucher Balance</Label>
                        <div>
                          <i
                            className="uil-question-circle font-size-15"
                            id="v_balance"
                          />
                          <Tooltip
                            placement="right"
                            isOpen={ttop22}
                            target="v_balance"
                            toggle={() => {
                              setttop22(!ttop22);
                            }}
                          >
                            The Balance Due shown on the confirmation voucher sent to the client, in either USD or MXN Pesos, depending on the currency selected. If USD is chosen then this is automatically calculated based on  (Our Price - Deposit = Voucher Balance). If MXN is chosen then manually enter the amount in pesos that the customer will pay at check-in on the day of the tour.
                          </Tooltip>
                        </div>
                      </div>
                      <div className="input-group">
                        <Input
                          name="voucher_balance"
                          placeholder=""
                          type="text"
                          readOnly={currencySelected !== "MXN $" && currencySelected !== "MXN"}
                          onChange={validationType.handleChange}
                          onBlur={(e) => {
                            const value = e.target.value || "";
                            validationType.setFieldValue(
                              "voucher_balance",
                              setDecimalFormatVBalance(value, currencySelected)
                            );
                          }}
                          value={validationType.values.voucher_balance || ""}
                          invalid={
                            validationType.touched.voucher_balance &&
                              validationType.errors.voucher_balance
                              ? true
                              : false
                          }
                        />
                        {validationType.touched.voucher_balance &&
                          validationType.errors.voucher_balance ? (
                          <FormFeedback type="invalid">
                            {validationType.errors.voucher_balance}
                          </FormFeedback>
                        ) : null}
                        <span
                          className="input-group-text form-label fw-bold bg-paradise text-white border-0"
                          id="basic-addon1"
                          style={{ fontSize: "0.85em" }}
                        >
                          $
                        </span>
                      </div>

                    </div>
                  </Col>
                </Row>
                <Row className="d-flex">
                  <Col className="col-2">
                    <div className="form-outline mb-2" id="ship_price">
                      <div className="d-flex justify-content-between">
                        <Label className="form-label">Ship Price</Label>
                        <div>
                          <i
                            className="uil-question-circle font-size-15"
                            id="shipPrice"
                          />
                          <Tooltip
                            placement="right"
                            isOpen={ttop10}
                            target="shipPrice"
                            toggle={() => {
                              setttop10(!ttop10);
                            }}
                          >
                            The price that the most expensive cruise ship will
                            sell this tour at. This price should not be confused
                            with the "From" price shown on cruise ship websites.
                            It is always higher. Compare all cruise websites. If
                            the tour is not available for cruise ship passengers
                            or the ship price won't shown on the website (as with
                            Cancun Discounts) then leave this blank.
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
                          name="ship_price"
                          placeholder=""
                          type="text"
                          min="0"
                          step="any"
                          onChange={validationType.handleChange}
                          onBlur={(e) => {
                            setRecalc(true)
                            const value = e.target.value || "";
                            validationType.setFieldValue(
                              "ship_price",
                              setDecimalFormat(value)
                            );
                          }}
                          value={validationType.values.ship_price || ""}
                          invalid={
                            validationType.touched.ship_price &&
                              validationType.errors.ship_price
                              ? true
                              : false
                          }
                        />
                        {validationType.touched.ship_price &&
                          validationType.errors.ship_price ? (
                          <FormFeedback type="invalid">
                            {validationType.errors.ship_price}
                          </FormFeedback>
                        ) : null}
                      </div>

                    </div>
                  </Col>
                  <Col className="col-2">
                    <div className="form-outline mb-2" id="compare_at">
                      <div className="d-flex justify-content-between">
                        <Label className="form-label">Compare At</Label>
                        <div>
                          <i
                            className="uil-question-circle font-size-15"
                            id="compareAt"
                          />
                          <Tooltip
                            placement="right"
                            isOpen={ttop11}
                            target="compareAt"
                            toggle={() => {
                              setttop11(!ttop11);
                            }}
                          >
                            The price that shows as the "reg price" on our
                            websites. This should generally be the most expensive
                            price for a comparable tour you can commonly find on
                            the web. Typically avoid outliers where one website is
                            far above from the rest. We want the customers to be
                            able to see that they're saving money compared to
                            other options.
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
                          name="compare_at"
                          placeholder=""
                          type="text"
                          min="0"
                          step="any"
                          onChange={validationType.handleChange}
                          onBlur={(e) => {
                            setRecalc(true)
                            const value = e.target.value || "";
                            validationType.setFieldValue(
                              "compare_at",
                              setDecimalFormat(value)
                            );
                          }}
                          value={validationType.values.compare_at || ""}
                          invalid={
                            validationType.touched.compare_at &&
                              validationType.errors.compare_at
                              ? true
                              : false
                          }
                        />
                        {validationType.touched.compare_at &&
                          validationType.errors.compare_at ? (
                          <FormFeedback type="invalid">
                            {validationType.errors.compare_at}
                          </FormFeedback>
                        ) : null}
                      </div>

                    </div>
                  </Col>
                  <Col className="col-2">
                    <div className="form-outline mb-2" id="you_save">
                      <div className="d-flex justify-content-between">
                        <Label className="form-label">You Save*</Label>
                        <div>
                          <i
                            className="uil-question-circle font-size-15"
                            id="youSave"
                          />
                          <Tooltip
                            placement="right"
                            isOpen={ttop13}
                            target="youSave"
                            toggle={() => {
                              setttop13(!ttop13);
                            }}
                          >
                            This is the amount they save by booking with us
                            compared to the "other guys" from the "Compare At"
                            price or "Ship Price" whichever is higher. This will
                            be shown on the website as "You Save!" or "You Save
                            15%" depending on the site.
                          </Tooltip>
                        </div>
                      </div>
                      <div className="input-group">
                        <Input
                          name="you_save"
                          placeholder=""
                          type="text"
                          min="0"
                          step="any"
                          onChange={validationType.handleChange}
                          onBlur={(e) => {
                            const value = e.target.value || "";
                            validationType.setFieldValue(
                              "you_save",
                              setYouSaveFormat(value)
                            );
                          }}
                          value={validationType.values.you_save || ""}
                          invalid={
                            validationType.touched.you_save &&
                              validationType.errors.you_save
                              ? true
                              : false
                          }
                        />
                        {validationType.touched.you_save &&
                          validationType.errors.you_save ? (
                          <FormFeedback type="invalid">
                            {validationType.errors.you_save}
                          </FormFeedback>
                        ) : null}
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
                  <Col className="col-6">
                    <div className="form-outline mb-2" id="compare_at_url">
                      <div className="d-flex justify-content-between">
                        <Label className="form-label">"Compare At" URL</Label>
                        <div>
                          <i
                            className="uil-question-circle font-size-15"
                            id="compareAt"
                          />
                          <Tooltip
                            placement="right"
                            isOpen={ttop9}
                            target="compareAt"
                            toggle={() => {
                              setttop9(!ttop9);
                            }}
                          >
                            Paste the URL of the web page where the "Compare At"
                            price, established during the price survey, can be
                            verified.
                          </Tooltip>
                        </div>
                      </div>
                      <Input
                        name="compare_at_url"
                        placeholder=""
                        type="text"
                        onChange={validationType.handleChange}
                        onBlur={validationType.handleBlur}
                        value={validationType.values.compare_at_url || ""}
                        invalid={
                          validationType.touched.compare_at_url &&
                            validationType.errors.compare_at_url
                            ? true
                            : false
                        }
                      />
                      {validationType.touched.compare_at_url &&
                        validationType.errors.compare_at_url ? (
                        <FormFeedback type="invalid">
                          {validationType.errors.compare_at_url}
                        </FormFeedback>
                      ) : null}
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col
                    className="col-12 d-flex justify-content-end mt-4"

                  >
                    <Button
                      color="paradise"
                      outline
                      className="waves-effect waves-light col-2 mx-4"
                      type="button"
                      onClick={() => setAddNewFishing(false)}
                    >
                      Close
                    </Button>
                    <Button
                      id="save-button"
                      type="submit"
                      className="font-16 btn-block col-2 btn-orange"
                    >
                      Save
                    </Button>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Form>
        )}
      </div>
    </Modal>
  );
};

export default Fishing;
