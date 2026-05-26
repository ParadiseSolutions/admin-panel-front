import { useEffect, useState } from "react";
import AddonsImage from "../../../Assets/images/addons.png";
import {
  getPricingOptionsAPI,
  getAddonAPI,
  postAddonsAPI,
  putAddonAPI,
  triggerUpdate,
  getApplyOptionsAPI,
  getPricesPricingAPI,
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
import Switch from "react-switch";
import Swal from "sweetalert2";
import {
  setDecimalFormat,
  setRateFormat,
  setYouSaveFormat,
  setDecimalFormatVBalance,
} from "../../../../Utils/CommonFunctions";
import { getCurrency } from "../../../../Utils/API/Operators";
import { Select } from "antd";
import { Option } from "antd/lib/mentions";
import AddonPricingSections from "./AddonPricingSections";
import {
  createProviderPricingCalc,
  createOurPricingCalc,
} from "./tourPricingCalculations";

const Offsymbol = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        fontSize: 12,
        color: "#fff",
        // width: "200px",
        paddingRight: 15,
      }}
    >
      Addon
    </div>
  );
};
const OnSymbol = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        fontSize: 12,
        color: "#fff",
        paddingLeft: 15,
      }}
    >
      Upgrade
    </div>
  );
};

const Addons = ({
  newAddon,
  setNewAddon,
  refreshTable,
  editProductID,
  tourData,
  copyProduct,
  setCopyProduct,
  id,
}) => {
  //edit data
  let editID = editProductID;
  const [dataEdit, setDataEdit] = useState();
  const [loadingData, setLoadingData] = useState(true);
  useEffect(() => {
    if (editID !== null && newAddon) {
      getAddonAPI(editID).then((resp) => {
        setDataEdit(resp.data.data[0]);
      });
    } else {
      setDataEdit(null);
    }
  }, [editID, newAddon]);
// console.log(copyProduct);

  //combo box request
  const [priceMatchQuantityData, setPriceMatchQuantityData] = useState([]);
  const [priceTypeData, setPriceTypeData] = useState([]);
  const [priceOptions, setPriceOptions] = useState([]);
  const [priceCollect, setPriceCollect] = useState([]);
  const [applyOptions, setApplyOptions] = useState([]);
  const [applyOptionsSelected, setApplyOptionsSelected] = useState();
  const [matchingProducts, setMatchingProducts] = useState([]);
  const [matchingProductsSelected, setMatchingProductsSelected] = useState([]);
  const [initialProductsList, setInitialProductList] = useState([])
  const [addonType, setAddonType] = useState([]);
  const [displayOptionData, setDisplayOptionData] = useState([]);
  const [addonLabelData, setAddonLabelData] = useState([]);
  const [priceTypeSelected, setPriceTypeSelected] = useState("");
  const [addonTypeSelected, setAddonTypeSelected] = useState("");
  const [priceOptionSelected, setPriceOptionSelected] = useState("");
  const [priceCollectSelected, setPriceCollectSelected] = useState("");
  const [priceCollectNameSelected, setPriceCollectNameSelected] = useState("");
  const [addonTypeNameSelected, setAddonTypeNameSelected] = useState("");
  const [priceTypeNameSelected, setPriceTypeNameSelected] = useState("");
  const [displayOptionSelected, setDisplayOptionSelected] = useState();
  const [addonLabelSelected, setAddonLabelSelected] = useState("");
  const [matchQuantitySelected, setMatchQuantitySelected] = useState("");
  const [balance, setBalance] = useState(dataEdit?.active === 1 ? true : false);
  const [customMessage, setCustomMessage] = useState(false);
  const [isCustomMessage, setIsCustomMessage] = useState(false);
  const [isUpgrade, setIsUpgrade] = useState(
    dataEdit?.type === 2 ? true : false
  );

  useEffect(() => {
    if (newAddon) {
      setLoadingData(true);
      getPricingOptionsAPI(52).then((resp) => {
        setPriceMatchQuantityData(resp.data.data);
      });
      getPricingOptionsAPI(56).then((resp) => {
        setPriceTypeData(resp.data.data);
      });
      getPricingOptionsAPI(58).then((resp) => {
        setPriceOptions(resp.data.data);
      });
      getPricingOptionsAPI(55).then((resp) => {
        setPriceCollect(resp.data.data);
      });
      getPricingOptionsAPI(57).then((resp) => {
        setAddonType(resp.data.data);
      });
      getPricingOptionsAPI(59).then((resp) => {
        setDisplayOptionData(resp.data.data);
      });
      getPricingOptionsAPI(60).then((resp) => {
        setAddonLabelData(resp.data.data);
      });
      getApplyOptionsAPI().then((resp) => {
        setApplyOptions(resp.data.data);
      });
      getPricesPricingAPI(id).then((resp) => {
        setMatchingProducts(resp.data.data);
      });
      getCurrency().then((resp) => {
        setCurrency(resp.data.data);
      });
    }
    setApplyOptionsSelected(0)
  }, [newAddon]);
  // console.log(applyOptions);
  // console.log('apply options------>', applyOptionsSelected);
  const [ttop1, setttop1] = useState(false);
  const [ttop2, setttop2] = useState(false);
  const [ttop3, setttop3] = useState(false);
  const [ttop4, setttop4] = useState(false);
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

  const [recalc, setRecalc] = useState(false);
  const [priceSheetSelected, setPriceSheetSelected] = useState("");
  const [priceBreakdown, setPriceBreakdown] = useState(false);
  const [currency, setCurrency] = useState([]);
  const [currencySelected, setCurrencySelected] = useState("USD");
  const [providerCommission, setProviderCommission] = useState("");
  const [ourCommission, setOurCommission] = useState("");
  const [providerPricingTab, setProviderPricingTab] = useState(true);
  const [ourPricingTab, setOurPricingTab] = useState(true);
  const [comparisonPricingTab, setComparisonPricingTab] = useState(true);
  const [providerHeaderTooltip, setproviderHeaderTooltip] = useState(false);
  const [comparisonHeaderTooltip, setComparisonHeaderTooltip] = useState(false);
  const [priceSheetTooltip, setpriceSheetTooltip] = useState(false);
  const [estRateTooltip, setestRateTooltip] = useState(false);
  const [estComTooltip, setestComTooltip] = useState(false);
  const [netPriceTooltip, setnetPriceTooltip] = useState(false);
  const [baseTooltip, setbaseTooltip] = useState(false);
  const [ivaTooltip, setivaTooltip] = useState(false);
  const [totalPriceTooltip, settotalPriceTooltip] = useState(false);
  const [gratuityTooltip, setgratuityTooltip] = useState(false);
  const [finalTotalTooltip, setfinalTotalTooltip] = useState(false);
  const [baseTooltipOP, setbaseTooltipOP] = useState(false);
  const [ivaTooltipOP, setivaTooltipOP] = useState(false);
  const [totalPriceTooltipOP, settotalPriceTooltipOP] = useState(false);
  const [gratuityTooltipOP, setgratuityTooltipOP] = useState(false);
  const [finalTotalTooltipOP, setfinalTotalTooltipOP] = useState(false);
  let changing = false;

  useEffect(() => {
    if (dataEdit && newAddon && priceCollect) {
      setRecalc(false);
      setPriceCollectSelected(dataEdit.collect_id);
      setInitialProductList(dataEdit.products)
      setApplyOptionsSelected(dataEdit.apply_to)
      let priceCollectSe = priceCollect.filter(
        (x) => x.id === dataEdit.collect_id
      );
      if (priceCollectSe.length > 0) {
        setPriceCollectNameSelected(priceCollectSe[0].text);
      }
      if (dataEdit?.collect_id === 25 && dataEdit.display_option === 10) {
        setIsCustomMessage(true);
        setAddonTypeNameSelected(dataEdit?.add_on_type);
        setPriceTypeNameSelected(dataEdit?.price_type);
      } else {
        setIsCustomMessage(false);
      }

      setBalance(dataEdit?.active === 1 ? true : false);
      setIsUpgrade(dataEdit?.type === 2 ? true : false);
      setDisplayOptionSelected(dataEdit?.display_option);
      setCustomMessage(dataEdit?.custom_text === 0 ? false : true);
      setPriceSheetSelected(
        dataEdit.p_price_sheet ? String(dataEdit.p_price_sheet) : "1"
      );
      setCurrencySelected(
        dataEdit.voucher_currency ? dataEdit.voucher_currency : "USD"
      );
      if (dataEdit?.price != null && dataEdit?.net_rate != null) {
        setOurCommission((dataEdit.price - dataEdit.net_rate).toFixed(2));
      } else {
        setOurCommission("");
      }

      if (!changing) {
        changing = true;
        setTimeout(() => {
          setLoadingData(false);
          changing = false;
        }, 1000);
      }
    } else {
      setRecalc(true);
      setPriceTypeSelected("");
      setAddonTypeSelected("");
      setPriceOptionSelected("");
      setPriceCollectSelected("");
      setPriceCollectNameSelected("");
      setAddonTypeNameSelected("");
      setPriceTypeNameSelected("");
      setAddonLabelSelected("");
      setDisplayOptionSelected("");
      setMatchQuantitySelected("");
      setBalance(false);
      setCustomMessage(false);
      setIsCustomMessage(false);
      setIsUpgrade(false);
      setPriceSheetSelected("1");
      setCurrencySelected("USD");
      setPriceBreakdown(false);
      setProviderCommission("");
      setOurCommission("");
      if (validationType) {
        validationType.resetForm();
      }
      if (!changing) {
        changing = true;
        setTimeout(() => {
          setLoadingData(false);
          changing = false;
        }, 1000);
      }
    }
  }, [dataEdit, priceCollect]);

  useEffect(() => {
    if (priceCollectSelected === "25" && displayOptionSelected === 10) {
      setIsCustomMessage(true);
    }
  }, [priceCollectSelected, displayOptionSelected]);

  //custom text assign
  const customTextAssing = (values) => {
    if (values.type === "price_type") {
      setPriceTypeNameSelected(values.label);
    }
    if (values.type === "addon_type") {
      setAddonTypeNameSelected(values.label);
    }
  };

  const onChangeUpgrade = () => {
    setIsUpgrade(!isUpgrade);
  };

  // apply selected
  function handleMulti(selected) {
    setMatchingProductsSelected(selected);
  }
  const validationType = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,
    initialValues: {
      product_name: dataEdit ? dataEdit.name : "",
      sku: dataEdit ? dataEdit.sku : "",
      min_qty: dataEdit ? dataEdit.min_qty : "",
      max_qty: dataEdit ? dataEdit.max_qty : "",
      addon_description: dataEdit ? dataEdit.description : "",
      public_price: dataEdit?.public ?? "",
      provider_price: dataEdit?.provider_price ?? "",
      rate: dataEdit?.rate ? setRateFormat(dataEdit.rate) : "",
      net_rate: dataEdit?.net_rate ?? "",
      our_price: dataEdit ? dataEdit.price : "",
      you_save: dataEdit ? setYouSaveFormat(dataEdit.you_save) : "",
      eff_rate: dataEdit?.eff_rate ? setRateFormat(dataEdit.eff_rate) : "",
      commission: dataEdit ? dataEdit.commission : "",
      deposit: dataEdit ? dataEdit.deposit : "",
      balance_due: dataEdit ? dataEdit.net_price : "",
      net_price: dataEdit?.net_price ?? "",
      net_price_percentage: dataEdit?.net_price ?? "",
      net_price_fixed: dataEdit?.net_price ?? "",
      ship_price: dataEdit?.ship_price ?? "",
      compare_at: dataEdit?.compare_at ?? "",
      compare_at_url: dataEdit?.compare_at_url ?? "",
      voucher_balance:
        dataEdit && dataEdit.voucher_balance
          ? setDecimalFormatVBalance(
              dataEdit.voucher_balance,
              dataEdit.voucher_currency
            )
          : "",
      p_est_rate: dataEdit ? setRateFormat(dataEdit.p_est_rate) : "",
      p_est_commission: dataEdit?.p_est_commission ?? "",
      p_base_amount: dataEdit?.p_base_amount ?? "",
      p_iva: dataEdit?.p_iva ?? "",
      p_total_price: dataEdit?.p_total_price ?? "",
      p_gratuity: dataEdit?.p_gratuity ?? "",
      p_final_total: dataEdit?.p_final_total ?? "",
      provider_commission: dataEdit?.provider_commission ?? "",
      p_commission: dataEdit?.p_commission ?? "",
      t_base_amount: dataEdit?.t_base_amount ?? "",
      t_iva: dataEdit?.t_iva ?? "",
      t_total_price: dataEdit?.t_total_price ?? "",
      t_gratuity: dataEdit?.t_gratuity ?? "",
      t_final_total: dataEdit?.t_final_total ?? "",
      custom_message: dataEdit ? dataEdit.option_label : "",
    },
    validationSchema: Yup.object().shape({
      min_qty: Yup.number().integer().nullable(),
      max_qty: Yup.number().integer().nullable(),
      public_price: Yup.number().nullable(),
      provider_price: Yup.number().nullable(),
      rate: Yup.number().nullable(),
      net_rate: Yup.number().nullable(),
      ship_price: Yup.number().nullable(),
      compare_at: Yup.number().nullable(),
      compare_at_url: Yup.string().url("URL invalid format").trim().nullable(),
      our_price: Yup.number().required("Field Required"),
      deposit: Yup.number().required("Field Required"),
      balance_due: Yup.number().nullable(),
    }),
    onSubmit: (values, { resetForm }) => {
      let match_qty = matchQuantitySelected
        ? matchQuantitySelected
        : dataEdit
        ? dataEdit.match_qty_id
        : null;
      let price_type = priceTypeSelected
        ? priceTypeSelected
        : dataEdit
        ? dataEdit.price_type_id
        : null;
      let addon_type = addonTypeSelected
        ? addonTypeSelected
        : dataEdit
        ? dataEdit.add_on_type_id
        : null;
      let price_option = priceOptionSelected
        ? priceOptionSelected
        : dataEdit
        ? dataEdit.price_option_id
        : null;
      let collect = priceCollectSelected
        ? priceCollectSelected
        : dataEdit
        ? dataEdit.collect_id
        : null;
      let display_option = displayOptionSelected
        ? displayOptionSelected
        : dataEdit
        ? dataEdit.display_option
        : null;
      let instruction_label = addonLabelSelected
        ? addonLabelSelected
        : dataEdit
        ? dataEdit.instruction_label_id
        : null;

      const p_commission_value =
        +priceSheetSelected === 1
          ? values.p_est_commission
          : +priceSheetSelected === 2
          ? values.provider_commission
          : values.p_commission;

      let data = {
        tour_id: +id,
        match_qty_id: match_qty === "-1" ? null : match_qty,
        price_type_id: price_type === "-1" ? null : price_type,
        add_on_type_id: addon_type === "-1" ? null : addon_type,
        price_option_id: price_option === "-1" ? null : price_option,
        collect_id: collect === "-1" ? null : collect,
        display_option: display_option === "-1" ? null : display_option,
        instruction_label_id:
          instruction_label === "-1" ? null : instruction_label,
        description: values.addon_description,
        show_balance_due: balance,
        public: values.public_price !== "" ? values.public_price : null,
        provider_price:
          values.provider_price !== "" ? values.provider_price : null,
        rate:
          values.rate !== ""
            ? values.rate > 1
              ? values.rate / 100
              : values.rate
            : null,
        net_rate: values.net_rate !== "" ? values.net_rate : null,
        price: values.our_price,
        you_save: values.you_save,
        eff_rate:
          values.eff_rate !== ""
            ? values.eff_rate > 1
              ? values.eff_rate / 100
              : values.eff_rate
            : null,
        commission: ourCommission !== "" ? ourCommission : values.commission,
        deposit: values.deposit,
        net_price:
          priceSheetSelected === "1"
            ? values.net_price
            : priceSheetSelected === "2"
            ? values.net_price_percentage
            : values.net_price_fixed,
        voucher_balance: values.voucher_balance,
        voucher_currency: currencySelected,
        currencySelected: currencySelected,
        p_est_rate: values.p_est_rate !== "" ? values.p_est_rate : null,
        p_est_commission:
          values.p_est_commission !== "" ? values.p_est_commission : null,
        p_base_amount:
          values.p_base_amount !== "" ? values.p_base_amount : null,
        p_iva: values.p_iva !== "" ? values.p_iva : null,
        p_total_price:
          values.p_total_price !== "" ? values.p_total_price : null,
        p_gratuity: values.p_gratuity !== "" ? values.p_gratuity : null,
        p_final_total:
          values.p_final_total !== "" ? values.p_final_total : null,
        p_commission: p_commission_value !== "" ? p_commission_value : null,
        p_price_sheet: priceSheetSelected,
        t_base_amount:
          values.t_base_amount !== "" ? values.t_base_amount : null,
        t_iva: values.t_iva !== "" ? values.t_iva : null,
        t_total_price:
          values.t_total_price !== "" ? values.t_total_price : null,
        t_gratuity: values.t_gratuity !== "" ? values.t_gratuity : null,
        t_final_total:
          values.t_final_total !== "" ? values.t_final_total : null,
        ship_price: values.ship_price !== "" ? values.ship_price : null,
        compare_at: values.compare_at !== "" ? values.compare_at : null,
        compare_at_url: values.compare_at_url || null,
        type: isUpgrade ? 2 : 1,
        custom_text: customMessage === true ? 1 : 0,
        option_label:
          customMessage === true
            ? values.custom_message
            : addonTypeNameSelected
            ? `We want to ${
                addonTypeNameSelected !== ""
                  ? addonTypeNameSelected
                  : "[Add-On Type]"
              } for $ ${
                validationType.values.our_price !== ""
                  ? validationType.values.our_price
                  : "[Price]"
              } ${
                priceTypeNameSelected !== ""
                  ? priceTypeNameSelected
                  : "[Price Type]"
              }, paid in cash on the day of the tour.`
            : values.custom_message,
        min_qty:
          values.min_qty === "" || values.min_qty === null ? 0 : values.min_qty,
        max_qty:
          values.max_qty === "" || values.max_qty === null
            ? 20
            : values.max_qty,
        apply_to: applyOptionsSelected,
        products: matchingProductsSelected.length === 0 ? dataEdit?.products : matchingProductsSelected
      };

      
      document.getElementById("save-button").disabled = true;
      if (dataEdit && !copyProduct) {
        putAddonAPI(editProductID, data)
       
          .then((resp) => {
            // triggerUpdate();
            editID = null;
            setNewAddon(false);
            refreshTable();
            setCopyProduct(false)
            resetForm({ values: "" });
            document.getElementById("save-button").disabled = false;
          })
          .catch((error) => {
            if (error.response.data.data === null) {
              Swal.fire("Error!", String(error.response.data.message));
            } else {
              let errorMessages = [];
              Object.entries(error.response.data.data).map((item) => {
                errorMessages.push(item[1]);
                return true;
              });

              Swal.fire("Error!", String(errorMessages[0]));
            }
            document.getElementById("save-button").disabled = false;
          });
      } 
      else if (copyProduct || dataEdit === undefined || dataEdit === null) {
       
        postAddonsAPI(data)
          .then((resp) => {
            // triggerUpdate();
            editID = null;
            setNewAddon(false);
            refreshTable();
            setCopyProduct(false)
            resetForm({ values: "" });
            document.getElementById("save-button").disabled = false;
          })
          .catch((error) => {
            if (error.response.data.data === null) {
              Swal.fire("Error!", String(error.response.data.message));
            } else {
              let errorMessages = [];
              Object.entries(error.response.data.data).map((item) => {
                errorMessages.push(item[1]);
                return true;
              });

              Swal.fire("Error!", String(errorMessages[0]));
            }
            document.getElementById("save-button").disabled = false;
          });
      }
      refreshTable();
    },
  });

  const pricingCalcCtx = {
    validationType,
    tourData: tourData || {},
    priceSheetSelected,
    priceCollectNameSelected,
    currencySelected,
    setOurCommission,
  };

  const ourPricingCalc = createOurPricingCalc(pricingCalcCtx);

  const providerPricingCalc = () => {
    if (!tourData || !validationType) return;
    const gratuityInput = createProviderPricingCalc(pricingCalcCtx)();
    ourPricingCalc(gratuityInput);
  };

  useEffect(() => {
    if (newAddon && priceCollectNameSelected && tourData && !loadingData) {
      providerPricingCalc();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    priceCollectNameSelected,
    currencySelected,
    priceSheetSelected,
    loadingData,
    newAddon,
  ]);

  useEffect(() => {
    if (currencySelected && validationType) {
      validationType.setFieldValue(
        "voucher_balance",
        setDecimalFormatVBalance(
          validationType.values.voucher_balance,
          currencySelected
        )
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currencySelected]);

  const handleProviderFieldBlur = (field, value, isRate = false) => {
    if (isRate) {
      validationType.setFieldValue(field, setRateFormat(value || ""));
    } else {
      validationType.setFieldValue(field, setDecimalFormat(value || ""));
    }
    providerPricingCalc();
  };

  const handleOurPriceBlur = (e) => {
    setRecalc(true);
    const value = e.target.value || "";
    customTextAssing({ type: "ourPrice", label: value });
    validationType.setFieldValue("our_price", setDecimalFormat(value));
    providerPricingCalc();
  };

  const handleComparisonFieldBlur = (field, value) => {
    setRecalc(true);
    validationType.setFieldValue(field, setDecimalFormat(value || ""));
    providerPricingCalc();
  };

  // console.log("---", dataEdit);

  return (
    <Modal
      centered
      size="xl"
      isOpen={newAddon}
      toggle={() => {
        // onClickAddNew();
        editID = 0;
      }}
    >
      <div
        className="modal-header"
        style={{ backgroundColor: "#3DC7F4", border: "none" }}
      >
        {dataEdit?.id ? (
          <h1 className="modal-title mt-0 text-white">Edit Add-On</h1>
        ) :
        (
          <h1 className="modal-title mt-0 text-white">+ New Add-On</h1>
        )}
        <button
          onClick={() => {
            setNewAddon(false);
            // setDataEdit()
            editID = 0;
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
            <Row xl={12} className="d-flex">
              <Col className="col-12">
                <img src={AddonsImage} alt="addons" className="img-fluid" />
              </Col>

              <Col className="col-12 mt-4">
                <Row className="col-12 d-flex">
                  <Col className="col-6">
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
                  <Col className="col-2">
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
                  {displayOptionSelected === 10 ||
                  displayOptionSelected === 1 ? (
                    <Col className="col-2">
                      <div className="form-outline mb-4">
                        <Label className="form-label">Match Quantity</Label>
                        <Input
                          type="select"
                          name="match_qty_id"
                          onChange={(e) => {
                            setMatchQuantitySelected(e.target.value);
                          }}
                          onBlur={validationType.handleBlur}
                          //   value={validationType.values.department || ""}
                        >
                          <option value="-1">Select....</option>
                          {map(priceMatchQuantityData, (quantity, index) => {
                            return (
                              <option
                                key={index}
                                value={quantity.id}
                                selected={
                                  dataEdit
                                    ? quantity.id === dataEdit.match_qty_id
                                    : false
                                }
                              >
                                {quantity.text}
                              </option>
                            );
                          })}
                        </Input>
                      </div>
                    </Col>
                  ) : null}
                  <Col className="col-2">
                    <div className="m-2">
                      <Switch
                        uncheckedIcon={<Offsymbol />}
                        checkedIcon={<OnSymbol />}
                        onColor="#3DC7F4"
                        className="mt-4"
                        width={90}
                        // style={{width:"100px"}}
                        onChange={() => onChangeUpgrade()}
                        checked={isUpgrade}
                      />
                    </div>
                  </Col>
                </Row>
                <Row className="d-flex mb-4">
                  <Col className="col-9 d-flex justify-content-between">
                    {isUpgrade === false ? (
                      <>
                        <Col className="col-2">
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
                                  Select how the product will be priced.
                                  Example: "Per Item" could be Per ATV, or Per
                                  Boat. "Per Person" could be Per Adult, or Per
                                  Child.
                                </Tooltip>
                              </div>
                            </div>
                            <Input
                              type="select"
                              name="price_type"
                              onChange={(e) => {
                                setPriceTypeSelected(e.target.value);
                                customTextAssing({
                                  type: "price_type",
                                  label: e.target.selectedOptions[0].label,
                                });
                              }}
                              onBlur={validationType.handleBlur}
                              //   value={validationType.values.department || ""}
                            >
                              <option value="-1">Select....</option>
                              {map(priceTypeData, (type, index) => {
                                if (
                                  type.add_on_type === 1 ||
                                  type.add_on_type === 3
                                ) {
                                  return (
                                    <option
                                      key={index}
                                      value={type.id}
                                      selected={
                                        dataEdit
                                          ? type.id === dataEdit.price_type_id
                                          : false
                                      }
                                    >
                                      {type.text}
                                    </option>
                                  );
                                }
                              })}
                            </Input>
                          </div>
                        </Col>
                        <Col className="col-2">
                          <div className="form-outline">
                            <Label className="form-label">Addon Type</Label>
                            <Input
                              type="select"
                              name="addon_type"
                              onChange={(e) => {
                                setAddonTypeSelected(+e.target.value);
                                customTextAssing({
                                  type: "addon_type",
                                  label: e.target.selectedOptions[0].label,
                                });
                              }}
                              onBlur={validationType.handleBlur}
                              //   value={validationType.values.department || ""}
                            >
                              <option value="-1">Select....</option>
                              {map(addonType, (type, index) => {
                                if (
                                  type.add_on_type === 1 ||
                                  type.add_on_type === 3
                                ) {
                                  return (
                                    <option
                                      key={index}
                                      value={type.id}
                                      selected={
                                        dataEdit
                                          ? type.id === dataEdit.add_on_type_id
                                          : false
                                      }
                                    >
                                      {type.text}
                                    </option>
                                  );
                                }
                              })}
                            </Input>
                          </div>
                        </Col>
                        <Col className="col-2">
                          <div className="form-outline">
                            <Label className="form-label">
                              Price Option (Label)
                            </Label>
                            <Input
                              type="select"
                              name="price_option"
                              onChange={(e) => {
                                setPriceOptionSelected(e.target.value);
                              }}
                              onBlur={validationType.handleBlur}
                              //   value={validationType.values.department || ""}
                            >
                              <option value="-1">Select....</option>
                              {map(priceOptions, (option, index) => {
                                if (
                                  option.add_on_type === 1 ||
                                  option.add_on_type === 3
                                ) {
                                  return (
                                    <option
                                      key={index}
                                      value={option.id}
                                      selected={
                                        dataEdit
                                          ? option.id ===
                                            dataEdit.price_option_id
                                          : false
                                      }
                                    >
                                      {option.text}
                                    </option>
                                  );
                                }
                              })}
                            </Input>
                          </div>
                        </Col>
                        <Col className="col-2">
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
                                  Select the amount of deposit that will be
                                  collected at the time of booking. Commission =
                                  The deposit is equal to the amount of
                                  commission we earn for the tour. Afilliate =
                                  The payment is made directly through the
                                  provider's website, such as the case of
                                  dTraveller or Viator. Deposit = Manually type
                                  the amount of deposit we will collect in the
                                  "Deposit" field below.
                                </Tooltip>
                              </div>
                            </div>
                            <Input
                              type="select"
                              name="collect"
                              onChange={(e) => {
                                setPriceCollectSelected(e.target.value);
                                setPriceCollectNameSelected(
                                  e.target.selectedOptions[0].label
                                );
                              }}
                            >
                              <option value="-1">Select....</option>
                              {map(priceCollect, (collect, index) => {
                                return (
                                  <option
                                    key={index}
                                    value={collect.id}
                                    selected={
                                      dataEdit
                                        ? collect.id === dataEdit.collect_id
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
                      </>
                    ) : (
                      <>
                        <Col className="col-2">
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
                                  Select how the product will be priced.
                                  Example: "Per Item" could be Per ATV, or Per
                                  Boat. "Per Person" could be Per Adult, or Per
                                  Child.
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
                              //   value={validationType.values.department || ""}
                            >
                              <option value="-1">Select....</option>
                              {map(priceTypeData, (type, index) => {
                                if (
                                  type.add_on_type === 2 ||
                                  type.add_on_type === 3
                                ) {
                                  return (
                                    <option
                                      key={index}
                                      value={type.id}
                                      selected={
                                        dataEdit
                                          ? type.id === dataEdit.price_type_id
                                          : false
                                      }
                                    >
                                      {type.text}
                                    </option>
                                  );
                                }
                              })}
                            </Input>
                          </div>
                        </Col>
                        <Col className="col-2">
                          <div className="form-outline">
                            <Label className="form-label">Addon Type*</Label>
                            <Input
                              type="select"
                              name="addon_type"
                              onChange={(e) => {
                                setAddonTypeSelected(+e.target.value);
                              }}
                              onBlur={validationType.handleBlur}
                              //   value={validationType.values.department || ""}
                            >
                              <option value="-1">Select....</option>
                              {map(addonType, (type, index) => {
                                if (
                                  type.add_on_type === 2 ||
                                  type.add_on_type === 3
                                ) {
                                  return (
                                    <option
                                      key={index}
                                      value={type.id}
                                      selected={
                                        dataEdit
                                          ? type.id === dataEdit.add_on_type_id
                                          : false
                                      }
                                    >
                                      {type.text}
                                    </option>
                                  );
                                }
                              })}
                            </Input>
                          </div>
                        </Col>
                        <Col className="col-2">
                          <div className="form-outline">
                            <Label className="form-label">
                              Price Option (Label)
                            </Label>
                            <Input
                              type="select"
                              name="price_option"
                              onChange={(e) => {
                                setPriceOptionSelected(e.target.value);
                              }}
                              onBlur={validationType.handleBlur}
                              //   value={validationType.values.department || ""}
                            >
                              <option value="-1">Select....</option>
                              {map(priceOptions, (option, index) => {
                                if (
                                  option.add_on_type === 2 ||
                                  option.add_on_type === 3
                                ) {
                                  return (
                                    <option
                                      key={index}
                                      value={option.id}
                                      selected={
                                        dataEdit
                                          ? option.id ===
                                            dataEdit.price_option_id
                                          : false
                                      }
                                    >
                                      {option.text}
                                    </option>
                                  );
                                }
                              })}
                            </Input>
                          </div>
                        </Col>
                        <Col className="col-2">
                          <div className="form-outline">
                            <Label className="form-label">Collect*</Label>
                            <Input
                              type="select"
                              name="collect"
                              onChange={(e) => {
                                setPriceCollectSelected(e.target.value);
                                setPriceCollectNameSelected(
                                  e.target.selectedOptions[0].label
                                );
                              }}
                            >
                              <option value="-1">Select....</option>
                              {map(priceCollect, (collect, index) => {
                                return (
                                  <option
                                    key={index}
                                    value={collect.id}
                                    selected={
                                      dataEdit
                                        ? collect.id === dataEdit.collect_id
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
                      </>
                    )}

                    <Col className="col-2">
                      <div className="d-flex flex-column align-items-center">
                        <div className="d-flex justify-content-between">
                          <Label className="form-label">Balance Due</Label>
                          <i
                            className="uil-question-circle font-size-15 mx-1"
                            id="balance-t"
                          />
                          <Tooltip
                            placement="right"
                            isOpen={ttop19}
                            target="balance-t"
                            toggle={() => {
                              setttop19(!ttop19);
                            }}
                          >
                            Select whether the balance due should be shown to
                            the provider in the "Please Confirm" email. This
                            amount will be the same as in the "Voucher Balance"
                            below. It is the amount the customer will pay to the
                            provider on the day of the tour.
                          </Tooltip>
                        </div>
                        <div className="form-check form-switch form-switch-md">
                          <Input
                            name="active"
                            placeholder=""
                            type="checkbox"
                            checked={balance}
                            className="form-check-input"
                            onChange={() => setBalance(!balance)}
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
                    </Col>
                  </Col>
                  {displayOptionSelected === 13 ||
                  displayOptionSelected === 15 ||
                  displayOptionSelected === 5 ||
                  displayOptionSelected === 4 ? (
                    <Col className="col-3 d-flex justify-content-between">
                      <Col className="col-4">
                        <Label className="form-label ">Min. Qty.*</Label>
                        <div className="form-outline">
                          <Input
                            name="min_qty"
                            placeholder=""
                            type="text"
                            onChange={validationType.handleChange}
                            onBlur={validationType.handleBlur}
                            value={validationType.values.min_qty || ""}
                            invalid={
                              validationType.touched.min_qty &&
                              validationType.errors.min_qty
                                ? true
                                : false
                            }
                          />
                          {validationType.touched.min_qty &&
                          validationType.errors.min_qty ? (
                            <FormFeedback type="invalid">
                              {validationType.errors.min_qty}
                            </FormFeedback>
                          ) : null}
                        </div>
                      </Col>
                      <Col className="col-4 mx-4">
                        <Label className="form-label">Max. Qty.*</Label>
                        <div className="form-outline">
                          <Input
                            name="max_qty"
                            placeholder=""
                            type="text"
                            onChange={validationType.handleChange}
                            onBlur={validationType.handleBlur}
                            value={validationType.values.max_qty || ""}
                            invalid={
                              validationType.touched.max_qty &&
                              validationType.errors.max_qty
                                ? true
                                : false
                            }
                          />
                          {validationType.touched.max_qty &&
                          validationType.errors.max_qty ? (
                            <FormFeedback type="invalid">
                              {validationType.errors.max_qty}
                            </FormFeedback>
                          ) : null}
                        </div>
                      </Col>
                    </Col>
                  ) : null}
                </Row>

                <Row className="d-flex">
                  <Col className="col-10 d-flex justify-content-start">
                    <Col className="col-4">
                      <div className="form-outline">
                        <Label className="form-label">Display Option*</Label>
                        <Input
                          type="select"
                          name="display_option"
                          onChange={(e) => {
                            setDisplayOptionSelected(+e.target.value);
                            // console.log(+e.target.value);
                          }}
                          onBlur={validationType.handleBlur}
                        >
                          <option value="-1">Select....</option>
                          {map(
                            displayOptionData.filter(
                              (display) =>
                                display.id !== 2 &&
                                display.id !== 13 &&
                                display.id !== 9
                            ),
                            (type, index) => {
                              return (
                                <option
                                  key={index}
                                  value={type.id}
                                  selected={
                                    dataEdit
                                      ? type.id === dataEdit.display_option
                                      : false
                                  }
                                >
                                  {type.text}
                                </option>
                              );
                            }
                          )}
                        </Input>
                      </div>
                    </Col>
                    {displayOptionSelected === 13 ||
                    displayOptionSelected === 15 ||
                    displayOptionSelected === 2 ||
                    displayOptionSelected === 5 ? (
                      <>
                        <Col className="col-6 mx-4">
                          <div className="form-outline">
                            <Label className="form-label">
                              Add-On Description
                            </Label>
                            <Input
                              name="addon_description"
                              placeholder=""
                              type="text"
                              onChange={validationType.handleChange}
                              onBlur={validationType.handleBlur}
                              value={
                                validationType.values.addon_description || ""
                              }
                              invalid={
                                validationType.touched.addon_description &&
                                validationType.errors.addon_description
                                  ? true
                                  : false
                              }
                            />
                          </div>
                        </Col>
                      </>
                    ) : displayOptionSelected === 1 ||
                      displayOptionSelected === 3 ||
                      displayOptionSelected === 4 ||
                      displayOptionSelected === 10 ? (
                      <>
                        <Col className="col-3 mx-4">
                          <div className="form-outline">
                            <Label className="form-label">
                              Instruction Label
                            </Label>
                            <Input
                              type="select"
                              name="addon_label"
                              onChange={(e) => {
                                setAddonLabelSelected(e.target.value);
                              }}
                              onBlur={validationType.handleBlur}
                              //   value={validationType.values.department || ""}
                            >
                              <option value="-1">Select....</option>
                              {map(addonLabelData, (type, index) => {
                                return (
                                  <option
                                    key={index}
                                    value={type.id}
                                    selected={
                                      dataEdit
                                        ? type.id ===
                                          dataEdit.instruction_label_id
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
                        <Col className="col-6 mx-4">
                          <div className="form-outline">
                            <Label className="form-label">
                              Add-On Description
                            </Label>
                            <Input
                              name="addon_description"
                              placeholder=""
                              type="text"
                              onChange={validationType.handleChange}
                              onBlur={validationType.handleBlur}
                              value={
                                validationType.values.addon_description || ""
                              }
                              invalid={
                                validationType.touched.addon_description &&
                                validationType.errors.addon_description
                                  ? true
                                  : false
                              }
                            />
                          </div>
                        </Col>
                      </>
                    ) : null}
                  </Col>
                </Row>
                <Row className="d-flex mt-4">
                  <Col className="col-10 d-flex justify-content-start">
                    <Col className="col-4">
                      <div className="form-outline">
                        <Label className="form-label">Apply to</Label>
                        <Input
                          type="select"
                          name="apply_to"
                          onChange={(e) => {
                            setApplyOptionsSelected(+e.target.value);
                            // console.log(+e.target.value);
                            setMatchingProductsSelected([])
                            setInitialProductList([])
                          }}
                          onBlur={validationType.handleBlur}
                        >
                          <option value="-1">Select....</option>
                          {map(applyOptions, (option, index) => {
                            return (
                              <option
                                key={index}
                                value={option.apply_id}
                                selected={
                                  dataEdit
                                    ? option.apply_id === dataEdit.apply_to
                                    : false
                                }
                              >
                                {option.currency}
                              </option>
                            );
                          })}
                        </Input>
                      </div>
                    </Col>
                    <Col className="col-6 mx-4">
                      <div className="form-outline">
                        {applyOptionsSelected === 1 ? (
                          <>
                            <Label className="form-label">
                              Matching Product(s)
                            </Label>
                            <Input
                              type="select"
                              name="apply_to"
                              onChange={(e) => {
                                setMatchingProductsSelected([+e.target.value]);
                               
                              }}
                              
                              onBlur={validationType.handleBlur}
                            >
                              <option value="-1">Select....</option>
                              {map(matchingProducts, (item, index) => {
                                return (
                                  <option key={index} value={item.id}
                                  selected={
                                    dataEdit
                                      ? item.id === dataEdit?.products[0]
                                      : false
                                  }
                                  >
                                    {item.label}
                                  </option>
                                );
                              })}
                            </Input>
                          </>
                        ) : applyOptionsSelected === 2 ? (
                          <>
                            <Label className="form-label">
                              Matching Product(s)
                            </Label>
                            <Select
                              mode="multiple"
                              allowClear
                              rows="5"
                              style={{ width: "100%", paddingTop: "5px" }}
                              placeholder="Please select"
                              defaultValue={initialProductsList}
                              onChange={handleMulti}
                              // disabled={
                              //   voucherInitialData?.brings_read_only === 1 ? true : false
                              // }
                            >
                              {map(matchingProducts, (item, index) => {
                                return (
                                  <Option key={index} value={item.id}>
                                    {item.label}
                                  </Option>
                                );
                              })}
                             
                            </Select>
                          </>
                        ) : null}
                      </div>
                    </Col>
                  </Col>
                </Row>
                <Row>
                  {isCustomMessage ? (
                    <>
                      <Col className="d-flex flex-column justify-content-start mt-4 col-7">
                        <p style={{ color: "#495057", fontWeight: "bold" }}>
                          Mal's Message
                        </p>
                        {customMessage === true ? (
                          <Input
                            name="custom_message"
                            placeholder=""
                            type="text"
                            onChange={validationType.handleChange}
                            onBlur={validationType.handleBlur}
                            value={validationType.values.custom_message || ""}
                            invalid={
                              validationType.touched.custom_message &&
                              validationType.errors.custom_message
                                ? true
                                : false
                            }
                          />
                        ) : (
                          <p>{`We want to ${
                            addonTypeNameSelected !== ""
                              ? addonTypeNameSelected
                              : "[Add-On Type]"
                          } for $ ${
                            validationType.values.our_price !== ""
                              ? validationType.values.our_price
                              : "[Price]"
                          } ${
                            priceTypeNameSelected !== ""
                              ? priceTypeNameSelected
                              : "[Price Type]"
                          }, paid in cash on the day of the tour.`}</p>
                        )}
                      </Col>
                      <Col className="col-1 mt-4">
                        <div
                          className="form-outline"
                          style={{ marginRight: "20px" }}
                        >
                          <Label className="form-label">Custom</Label>
                          <Col className="col-4">
                            <div className="form-check form-switch form-switch-md mx-2">
                              <Input
                                name="custom"
                                placeholder=""
                                type="checkbox"
                                checked={customMessage}
                                className="form-check-input"
                                onChange={() =>
                                  setCustomMessage(!customMessage)
                                }
                              />
                            </div>
                          </Col>
                        </div>
                      </Col>
                    </>
                  ) : null}
                </Row>

                <AddonPricingSections
                  validationType={validationType}
                  priceSheetSelected={priceSheetSelected}
                  setPriceSheetSelected={setPriceSheetSelected}
                  priceBreakdown={priceBreakdown}
                  setPriceBreakdown={setPriceBreakdown}
                  dataEdit={dataEdit}
                  providerPricingCalc={providerPricingCalc}
                  ourCommission={ourCommission}
                  currency={currency}
                  currencyList={currency}
                  setCurrencySelected={setCurrencySelected}
                  currencySelected={currencySelected}
                  priceCollectSelected={priceCollectSelected}
                  setRecalc={setRecalc}
                  providerPricingTab={providerPricingTab}
                  setProviderPricingTab={setProviderPricingTab}
                  ourPricingTab={ourPricingTab}
                  setOurPricingTab={setOurPricingTab}
                  comparisonPricingTab={comparisonPricingTab}
                  setComparisonPricingTab={setComparisonPricingTab}
                  providerHeaderTooltip={providerHeaderTooltip}
                  setproviderHeaderTooltip={setproviderHeaderTooltip}
                  comparisonHeaderTooltip={comparisonHeaderTooltip}
                  setComparisonHeaderTooltip={setComparisonHeaderTooltip}
                  priceSheetTooltip={priceSheetTooltip}
                  setpriceSheetTooltip={setpriceSheetTooltip}
                  estRateTooltip={estRateTooltip}
                  setestRateTooltip={setestRateTooltip}
                  estComTooltip={estComTooltip}
                  setestComTooltip={setestComTooltip}
                  netPriceTooltip={netPriceTooltip}
                  setnetPriceTooltip={setnetPriceTooltip}
                  baseTooltip={baseTooltip}
                  setbaseTooltip={setbaseTooltip}
                  ivaTooltip={ivaTooltip}
                  setivaTooltip={setivaTooltip}
                  totalPriceTooltip={totalPriceTooltip}
                  settotalPriceTooltip={settotalPriceTooltip}
                  gratuityTooltip={gratuityTooltip}
                  setgratuityTooltip={setgratuityTooltip}
                  finalTotalTooltip={finalTotalTooltip}
                  setfinalTotalTooltip={setfinalTotalTooltip}
                  baseTooltipOP={baseTooltipOP}
                  setbaseTooltipOP={setbaseTooltipOP}
                  ivaTooltipOP={ivaTooltipOP}
                  setivaTooltipOP={setivaTooltipOP}
                  totalPriceTooltipOP={totalPriceTooltipOP}
                  settotalPriceTooltipOP={settotalPriceTooltipOP}
                  gratuityTooltipOP={gratuityTooltipOP}
                  setgratuityTooltipOP={setgratuityTooltipOP}
                  finalTotalTooltipOP={finalTotalTooltipOP}
                  setfinalTotalTooltipOP={setfinalTotalTooltipOP}
                  ttop5={ttop5}
                  setttop5={setttop5}
                  ttop6={ttop6}
                  setttop6={setttop6}
                  ttop7={ttop7}
                  setttop7={setttop7}
                  ttop8={ttop8}
                  setttop8={setttop8}
                  ttop9={ttop9}
                  setttop9={setttop9}
                  ttop10={ttop10}
                  setttop10={setttop10}
                  ttop11={ttop11}
                  setttop11={setttop11}
                  ttop12={ttop12}
                  setttop12={setttop12}
                  ttop13={ttop13}
                  setttop13={setttop13}
                  ttop14={ttop14}
                  setttop14={setttop14}
                  ttop15={ttop15}
                  setttop15={setttop15}
                  ttop16={ttop16}
                  setttop16={setttop16}
                  ttop17={ttop17}
                  setttop17={setttop17}
                  ttop20={ttop20}
                  setttop20={setttop20}
                  ttop21={ttop21}
                  setttop21={setttop21}
                  ttop22={ttop22}
                  setttop22={setttop22}
                  onOurPriceBlur={handleOurPriceBlur}
                  onProviderFieldBlur={handleProviderFieldBlur}
                  onComparisonFieldBlur={handleComparisonFieldBlur}
                />
              </Col>
            </Row>
            <Row xl={12}>
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
                    setNewAddon(false)
                    setCopyProduct(false)
                  }}
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
              </Row>
            </Row>
          </Form>
        )}
      </div>
    </Modal>
  );
};

export default Addons;
