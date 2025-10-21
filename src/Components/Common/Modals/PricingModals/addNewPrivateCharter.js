import { useEffect, useState } from "react";
import PrivateCharterImage from "../../../Assets/images/private-charter.png";
import {
  getPriceAPI,
  getPricingOptionsAPI,
  postPricesAPI,
  updatePriceAPI,
  triggerUpdate,
  getPricingOptions2API,
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
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";
import eyeIcon from "../../../Assets/images/eye-icon.svg";
import eyeIconSlash from "../../../Assets/images/eye-slash-icon.svg";

const AddNewPrivateCharter = ({
  addNewPrivateCharter,
  setAddNewPrivateCharter,
  refreshTable,
  tourData,
  editProductID,
  copyProduct,
  setCopyProduct,
  priceRangeCheck,
}) => {
  let id = "";
  id = editProductID;
  //edit data
  const [dataEdit, setDataEdit] = useState();
  const [loadingData, setLoadingData] = useState(true);
  const [charterTT, setCharterTT] = useState(false);
  const [durationTT, setDurationTT] = useState(false);
  const [capacityTT, setCapacityTT] = useState(false);
  const [locationTT, setLocationTT] = useState(false);
  useEffect(() => {
    if (id) {
      getPriceAPI(id).then((resp) => {
        setDataEdit(resp.data.data[0]);
        setPriceSheetSelected(resp.data.data[0].p_price_sheet);
      });
    } else {
      setDataEdit(null);
    }
  }, [id, addNewPrivateCharter]);

  const validationType = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,
    initialValues: {
      min: dataEdit
        ? dataEdit.pricedetails?.filter((x) => x.pricing_option_id === 40)[0]
            ?.min
        : "",
      max: dataEdit
        ? dataEdit.pricedetails?.filter((x) => x.pricing_option_id === 40)[0]
            ?.max
        : "",
      min_qty: dataEdit ? dataEdit.min_qty : "",
      max_qty: dataEdit ? dataEdit.max_qty : "",
      product_name: dataEdit ? dataEdit.label : "",
      sku: dataEdit ? dataEdit.sku : "",
      active: dataEdit?.active ? 1 : 0,
      balance_checkbox: dataEdit?.show_balance_due ? 1 : 0,
      public_price: dataEdit ? dataEdit.public : "",
      provider_price: dataEdit ? dataEdit.provider_price : "",
      rate: dataEdit ? setRateFormat(dataEdit.rate) : "",
      net_rate: dataEdit ? dataEdit.net_rate : "",
      compare_at_url: dataEdit ? dataEdit.compare_at_url : "",
      ship_price: dataEdit ? dataEdit.ship_price : "",
      compare_at: dataEdit ? dataEdit.compare_at : "",
      our_price: dataEdit ? dataEdit.price : "",
      you_save: dataEdit ? setYouSaveFormat(dataEdit.you_save) : "",
      eff_rate: dataEdit ? setRateFormat(dataEdit.eff_rate) : "",
      deposit: dataEdit ? dataEdit.deposit : "",
      balance_due: dataEdit ? dataEdit.net_price : "",
      voucher_balance:
        dataEdit && dataEdit.voucher_balance
          ? setDecimalFormatVBalance(
              dataEdit.voucher_balance,
              dataEdit.voucher_currency
            )
          : "",

      p_est_rate: dataEdit ? setDecimalFormat(dataEdit.p_est_rate) : "",
      p_est_commission: dataEdit ? dataEdit.p_est_commission : "",
      p_base_amount: dataEdit ? dataEdit.p_base_amount : "",
      p_iva: dataEdit ? setDecimalFormat(dataEdit.p_iva) : "",
      p_total_price: dataEdit ? dataEdit.p_total_price : "",
      p_gratuity: dataEdit ? dataEdit.p_gratuity : "",
      p_final_total: dataEdit ? dataEdit.p_final_total : "",
      provider_commission: dataEdit ? dataEdit.provider_commission : "",
      p_commission: dataEdit ? dataEdit.p_commission : "",
      t_base_amount: dataEdit ? dataEdit.t_base_amount : "",
      t_iva: dataEdit ? setDecimalFormat(dataEdit.t_iva) : "",
      t_total_price: dataEdit ? dataEdit.t_total_price : "",
      t_gratuity: dataEdit ? dataEdit.t_gratuity : "",
      t_final_total: dataEdit ? dataEdit.t_final_total : "",
      p_price_sheet: dataEdit ? dataEdit.p_price_sheet : "",

      net_price: dataEdit ? dataEdit.net_price : "",
      net_price_percentage: dataEdit ? dataEdit.net_price : "",
      net_price_fixed: dataEdit ? dataEdit.net_price : "",
      cruise_pax:
        dataEdit && dataEdit?.asset_details
          ? dataEdit.asset_details?.cruise_pax
          : null,
      budget_id:
        dataEdit && dataEdit?.asset_details
          ? dataEdit.asset_details?.budget_id
          : null,
      vibe_id:
        dataEdit && dataEdit?.asset_details
          ? dataEdit.asset_details?.vibe_id
          : null,
      meal_id:
        dataEdit && dataEdit?.asset_details
          ? dataEdit.asset_details?.meal_id
          : null,
      snack_id:
        dataEdit && dataEdit?.asset_details
          ? dataEdit.asset_details?.snack_id
          : null,
      open_bar_id:
        dataEdit && dataEdit?.asset_details
          ? dataEdit.asset_details?.open_bar_id
          : null,
      soft_drink_id:
        dataEdit && dataEdit?.asset_details
          ? dataEdit.asset_details?.soft_drink_id
          : null,
    },
    validationSchema: Yup.object().shape({
      min: Yup.number().integer().nullable(),
      max: Yup.number().integer().nullable(),
      public_price: Yup.number().nullable(),
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
      let price_type =
        priceTypeSelected === "" || priceTypeSelected === undefined
          ? dataEdit && dataEdit.pricedetails
            ? dataEdit.pricedetails.filter((x) => x.pricing_option_id === 38)[0]
                ?.source_id
            : null
          : priceTypeSelected;
      let price_type2 =
        priceTypeSelected2 === "" || priceTypeSelected2 === undefined
          ? dataEdit && dataEdit.pricedetails
            ? dataEdit.pricedetails.filter((x) => x.pricing_option_id === 68)[0]
                ?.source_id
            : null
          : priceTypeSelected2;

      let price_option =
        priceOptionSelected === "" || priceOptionSelected === undefined
          ? dataEdit && dataEdit.pricedetails
            ? dataEdit.pricedetails.filter((x) => x.pricing_option_id === 39)[0]
                ?.source_id
            : null
          : priceOptionSelected;

      let price_collect =
        priceCollectSelected === "" || priceCollectSelected === undefined
          ? dataEdit && dataEdit.pricedetails
            ? dataEdit.pricedetails.filter((x) => x.pricing_option_id === 41)[0]
                ?.source_id
            : null
          : priceCollectSelected;

      let price_season =
        priceSeasonSelected === "" || priceSeasonSelected === undefined
          ? dataEdit && dataEdit.pricedetails
            ? dataEdit.pricedetails.filter((x) => x.pricing_option_id === 44)[0]
                ?.source_id === undefined
              ? null
              : dataEdit.pricedetails.filter(
                  (x) => x.pricing_option_id === 44
                )[0]?.source_id
            : null
          : priceSeasonSelected;

      let charter_type =
        priceCharterTypeSelected === "" ||
        priceCharterTypeSelected === undefined
          ? dataEdit && dataEdit.pricedetails
            ? dataEdit.pricedetails.filter((x) => x.pricing_option_id === 48)[0]
                ?.source_id === undefined
              ? null
              : dataEdit.pricedetails.filter(
                  (x) => x.pricing_option_id === 48
                )[0]?.source_id
            : null
          : priceCharterTypeSelected;

      let price_duration =
        priceDurationSelected === "" || priceDurationSelected === undefined
          ? dataEdit && dataEdit.pricedetails
            ? dataEdit.pricedetails.filter((x) => x.pricing_option_id === 40)[0]
                ?.source_id === undefined
              ? null
              : dataEdit.pricedetails.filter(
                  (x) => x.pricing_option_id === 40
                )[0]?.source_id
            : null
          : priceDurationSelected;

      let price_location =
        priceLocationSelected === "" || priceLocationSelected === undefined
          ? dataEdit && dataEdit.pricedetails
            ? dataEdit.pricedetails.filter((x) => x.pricing_option_id === 42)[0]
                ?.source_id === undefined
              ? null
              : dataEdit.pricedetails.filter(
                  (x) => x.pricing_option_id === 42
                )[0]?.source_id
            : null
          : priceLocationSelected;

      let p_commission_value =
        +priceSheetSelected === 1
          ? values.p_est_commission
          : +priceSheetSelected === 2
          ? values.provider_commission
          : values.p_commission;

      if (price_type && price_option && price_collect) {
        let data = {
          tour_id: tourData.id,
          public: values.public_price,
          provider_price: values.provider_price,
          rate:
            values.rate !== ""
              ? values.rate > 1
                ? values.rate / 100
                : values.rate
              : null,
          net_rate: values.net_rate,
          compare_at_url: values.compare_at_url,
          ship_price: values.ship_price,
          compare_at: values.compare_at,
          price: values.our_price,
          you_save: values.you_save,
          eff_rate: values.eff_rate,
          commission: ourCommission,
          deposit: values.deposit,
          net_price:
            priceSheetSelected === 1
              ? values.net_price
              : priceSheetSelected === 2
              ? values.net_price_percentage
              : values.net_price_fixed,
          active: activeCheckbox ? 1 : 0,
          show_balance_due: balanceDueCheckbox ? 1 : 0,
          voucher_balance: values.voucher_balance,
          currencySelected: currencySelected,
          cruise_pax: cruisePaxSelected,
          budget_id: budgetSelected,
          vibe_id: vibeSelected,
          meal_id: mealSelected,
          snack_id: snackSelected,
          open_bar_id: openBarSelected,
          soft_drink_id: softDrinkSelected,

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
          t_base_amount:
            values.t_base_amount !== "" ? values.t_base_amount : null,
          t_iva: values.t_iva !== "" ? values.t_iva : null,
          t_total_price:
            values.t_total_price !== "" ? values.t_total_price : null,
          t_gratuity: values.t_gratuity !== "" ? values.t_gratuity : null,
          t_final_total:
            values.t_final_total !== "" ? values.t_final_total : null,
          p_price_sheet: priceSheetSelected,

          min_qty:
            values.min_qty === "" || values.min_qty === null
              ? 0
              : values.min_qty,
          max_qty:
            values.max_qty === "" || values.max_qty === null
              ? 20
              : values.max_qty,
          price_details: [
            {
              pricing_option_id: 38,
              source_id: price_type === "-1" ? null : price_type,
              min: null,
              max: null,
              label: null,
            },
            {
              pricing_option_id: 39,
              source_id: price_option === "-1" ? null : price_option,
              min: null,
              max: null,
              label: null,
            },
            {
              pricing_option_id: 41,
              source_id: price_collect === "-1" ? null : price_collect,
              min: null,
              max: null,
              label: null,
            },
            {
              pricing_option_id: 44,
              source_id: price_season === "-1" ? null : price_season,
              min: null,
              max: null,
              label: null,
            },
            {
              pricing_option_id: 48,
              source_id: charter_type === "-1" ? null : charter_type,
              min: null,
              max: null,
              label: null,
            },
            {
              pricing_option_id: 40,
              source_id: price_duration === "-1" ? null : price_duration,
              min: values.min === "" ? null : values.min,
              max: values.max === "" ? null : values.max,
              label: null,
            },
            {
              pricing_option_id: 42,
              source_id: price_location === "-1" ? null : price_location,
              min: null,
              max: null,
              label: null,
            },
            {
              pricing_option_id: 68,
              source_id: price_type === "-1" ? null : price_type2,
              min: null,
              max: null,
              label: null,
            },
          ],
        };

        document.getElementById("save-button").disabled = true;
        if (dataEdit && copyProduct === false) {
          updatePriceAPI(editProductID, data)
            .then((resp) => {
              triggerUpdate();
              setAddNewPrivateCharter(false);
              refreshTable();
              setCopyProduct(false);
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
        } else if (copyProduct || dataEdit === undefined || dataEdit === null) {
          postPricesAPI(data)
            .then((resp) => {
              triggerUpdate();
              setAddNewPrivateCharter(false);
              setCopyProduct(false);
              refreshTable();
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
      } else {
        Swal.fire("Complete Required Fields");
        document.getElementById("save-button").disabled = false;
      }
      refreshTable();
    },
  });

  //combo box request
  const [priceTypeData, setPriceTypeData] = useState([]);
  const [priceOptions, setPriceOptions] = useState([]);
  const [priceOptions2, setPriceOptions2] = useState([]);
  const [priceCollect, setPriceCollect] = useState([]);
  const [priceSeason, setPriceSeason] = useState([]);
  const [currency, setCurrency] = useState([]);
  const [currencySelected, setCurrencySelected] = useState("");
  const [priceCharterType, setPriceCharterType] = useState([]);
  const [priceDuration, setPriceDuration] = useState([]);
  const [priceLocation, setPriceLocation] = useState([]);
  const [priceTypeSelected, setPriceTypeSelected] = useState("");
  const [priceTypeSelected2, setPriceTypeSelected2] = useState("");
  const [priceOptionSelected, setPriceOptionSelected] = useState("");
  const [priceCollectSelected, setPriceCollectSelected] = useState("");
  const [priceCollectNameSelected, setPriceCollectNameSelected] = useState("");
  const [priceSeasonSelected, setPriceSeasonSelected] = useState("");
  const [priceCharterTypeSelected, setPriceCharterTypeSelected] = useState("");
  const [priceDurationSelected, setPriceDurationSelected] = useState("");
  const [priceLocationSelected, setPriceLocationSelected] = useState("");
  const [pricingOption2Selected, setPricingOption2Selected] = useState("");

  const [priceSheetSelected, setPriceSheetSelected] = useState("");

  useEffect(() => {
    if (addNewPrivateCharter) {
      setLoadingData(true);
      getPricingOptionsAPI(38).then((resp) => {
        setPriceTypeData(resp.data.data);
      });
      getPricingOptionsAPI(39).then((resp) => {
        setPriceOptions(resp.data.data);
      });
      getPricingOptionsAPI(41).then((resp) => {
        setPriceCollect(resp.data.data);
      });
      getPricingOptionsAPI(44).then((resp) => {
        setPriceSeason(resp.data.data);
      });
      getPricingOptionsAPI(48).then((resp) => {
        setPriceCharterType(resp.data.data);
      });
      getPricingOptionsAPI(40).then((resp) => {
        setPriceDuration(resp.data.data);
      });
      getPricingOptionsAPI(42).then((resp) => {
        setPriceLocation(resp.data.data);
      });
      getPricingOptions2API(68).then((resp) => {
        setPricingOption2Selected(resp.data.data);
      });
      getCurrency().then((resp) => {
        setCurrency(resp.data.data);
      });
      providerPricingCalc();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [addNewPrivateCharter]);

  //checkbox
  const [activeCheckbox, setActiveCheckbox] = useState(null);
  const [balanceDueCheckbox, setBalanceDueCheckbox] = useState(null);

  const [charterOptionsTab, setCharterOptionsTab] = useState(true);
  const [providerPricingTab, setProviderPricingTab] = useState(false);
  const [ourPricingTab, setOurPricingTab] = useState(false);
  const [comparisonPricingTab, setComparisonPricingTab] = useState(false);
  const [providerHeaderTooltip, setproviderHeaderTooltip] = useState(false);
  const [ourPricingHeaderTooltip, setOurPricingHeaderTooltip] = useState(false);
  const [comparisonHeaderTooltip, setComparisonHeaderTooltip] = useState(false);
  const [priceSheetTooltip, setpriceSheetTooltip] = useState(false);
  const [baseTooltip, setbaseTooltip] = useState(false);
  const [baseTooltipOP, setbaseTooltipOP] = useState(false);
  const [estRateTooltip, setestRateTooltip] = useState(false);
  const [estComTooltip, setestComTooltip] = useState(false);
  const [ivaTooltip, setivaTooltip] = useState(false);
  const [ivaTooltipOP, setivaTooltipOP] = useState(false);
  const [totalPriceTooltipOP, settotalPriceTooltipOP] = useState(false);
  const [totalPriceTooltip, settotalPriceTooltip] = useState(false);
  const [gratuityTooltip, setgratuityTooltip] = useState(false);
  const [finalTotalTooltipOP, setfinalTotalTooltipOP] = useState(false);
  const [finalTotalTooltip, setfinalTotalTooltip] = useState(false);
  const [netPriceTooltip, setnetPriceTooltip] = useState(false);
  const [gratuityTooltipOP, setgratuityTooltipOP] = useState(false);

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
  const [ttop20, setttop20] = useState(false);
  const [ttop21, setttop21] = useState(false);
  const [ttop22, setttop22] = useState(false);
  const [ttiers, setttiers] = useState(false);
  const [ttprice2, setttprice2] = useState(false);
  const [ttactive, setttactive] = useState(false);
  const [ttbd, setbd] = useState(false);

  const [providerCommission, setProviderCommission] = useState("");
  const [ourCommission, setOurCommission] = useState("");
  const [recalc, setRecalc] = useState(false);

  const [priceBrakedown, setPriceBreakdown] = useState(false);
  const [cruisePaxSelected, setCruisePaxSelected] = useState("");
  const [budgetSelected, setBudgetSelected] = useState("");
  const [vibeSelected, setVibeSelected] = useState("");
  const [mealSelected, setMealSelected] = useState("");
  const [snackSelected, setSnackSelected] = useState("");
  const [openBarSelected, setOpenBarSelected] = useState("");
  const [softDrinkSelected, setSoftDrinkSelected] = useState("");

  let changing = false;

  useEffect(() => {
    if (dataEdit && addNewPrivateCharter && priceCollect) {
      if (copyProduct) {
        setRecalc(true);
      } else {
        setRecalc(false);
      }
      setCurrencySelected(
        dataEdit.voucher_currency ? dataEdit.voucher_currency : "USD"
      );
      setPriceCollectSelected(
        dataEdit.pricedetails.filter((x) => x.pricing_option_id === 41)[0]
          ?.source_id
      );
      let priceCollectSe = priceCollect.filter(
        (x) =>
          x.id ===
          dataEdit.pricedetails.filter((x) => x.pricing_option_id === 41)[0]
            ?.source_id
      );
      if (priceCollectSe.length > 0) {
        setPriceCollectNameSelected(priceCollectSe[0].text);
      }
      setActiveCheckbox(dataEdit?.active === 1 ? true : false);
      setBalanceDueCheckbox(dataEdit?.show_balance_due === 1 ? true : false);
      setProviderCommission((dataEdit.public - dataEdit.net_rate).toFixed(2));
      setOurCommission((dataEdit.price - dataEdit.net_rate).toFixed(2));
      if (!changing) {
        changing = true;
        setTimeout(() => {
          setLoadingData(false);
          changing = false;
        }, 1000);
      }
    } else {
      setRecalc(true);
      setCurrencySelected("USD");
      setPriceTypeSelected("");
      setPriceOptionSelected("");
      setPriceCollectSelected("");
      setPriceCollectNameSelected("");
      setPriceSeasonSelected("");
      setPriceCharterTypeSelected("");
      setPriceDurationSelected("");
      setPriceLocationSelected("");
      setActiveCheckbox(false);
      setBalanceDueCheckbox(false);
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

  // provider pricing funcion
  const providerPricingCalc = () => {
    // esto es net price en price sheet select
    let netPriceInput = validationType.values.net_rate;
    let publicPriceInput = validationType.values.public_price;
    let estCommissionInput = validationType.values.p_est_commission;
    let rateInput = validationType.values.rate;
    let commissionFixedInput = validationType.values.p_commission;
    // net price
    let baseAmountInput = validationType.values.p_base_amount;
    let ivaInput = validationType.values.p_iva;
    let gratuityInput = validationType.values.p_gratuity;
    // rate %
    let netPriceInputRate = validationType.values.net_rate;
    let providerCommissionInputRate = validationType.values.provider_commission;
    // fixed commission
    let netPriceInputCommision = validationType.values.net_rate;
    if (
      priceSheetSelected === "1" &&
      netPriceInput !== "" &&
      publicPriceInput !== "" &&
      publicPriceInput > 0
    ) {
      validationType.setFieldValue(
        "p_est_rate",
        setRateFormat((publicPriceInput - netPriceInput) / publicPriceInput)
      );
      estCommissionInput = publicPriceInput - netPriceInput;
      validationType.setFieldValue(
        "p_est_commission",
        setDecimalFormat(estCommissionInput)
      );

      // tax_id
      // 1- Included
      // 2- Not Included
      // 3- Unspecified

      // gratuity_id
      // 1- Included
      // 2- Not Included
      // 3- Unspecified

      // gratuity_type_id
      // 3- Fixed Amount
      // 4- % Percent
      // 6- Unspecified

      if (
        (tourData.tax_id === 1 && tourData.gratuity_id === 3) ||
        (tourData.tax_id === 1 && tourData.gratuity_type_id === 6)
      ) {
        // Tax - Yes . Gratuity - Un
        //If the Payment Settings indicate the Net Price includes taxes but not gratuity,
        // then this field would be calculated as:
        // [Net Price] / [1.16]
        gratuityInput = "";
        validationType.setFieldValue("p_gratuity", "");
        validationType.setFieldValue("t_gratuity", "");

        let totalPriceInput = +netPriceInput;
        validationType.setFieldValue(
          "p_total_price",
          setDecimalFormat(+totalPriceInput)
        );

        baseAmountInput = setDecimalFormat(netPriceInput / 1.16);

        ivaInput = totalPriceInput - baseAmountInput;
        validationType.setFieldValue("p_iva", setDecimalFormat(ivaInput));

        validationType.setFieldValue(
          "p_final_total",
          setDecimalFormat(+totalPriceInput)
        );
      } else if (
        (tourData.tax_id === 2 && tourData.gratuity_id === 3) ||
        (tourData.tax_id === 2 && tourData.gratuity_type_id === 6) ||
        (tourData.tax_id === 3 && tourData.gratuity_id === 3) ||
        (tourData.tax_id === 3 && tourData.gratuity_type_id === 6)
      ) {
        // Tax - No . Gratuity - Un
        // If Payment Settings indicates that the Net Price does not include taxes or gratuity,
        // then this will be a straight reference, no calculation needed.
        gratuityInput = "";
        validationType.setFieldValue("p_gratuity", "");
        validationType.setFieldValue("t_gratuity", "");

        baseAmountInput = setDecimalFormat(+netPriceInput);

        ivaInput = baseAmountInput * 0.16;
        validationType.setFieldValue("p_iva", setDecimalFormat(ivaInput));

        let totalPriceInput = +baseAmountInput + +ivaInput;
        validationType.setFieldValue(
          "p_total_price",
          setDecimalFormat(+totalPriceInput)
        );

        validationType.setFieldValue(
          "p_final_total",
          setDecimalFormat(+totalPriceInput)
        );
      } else if (
        (tourData.tax_id === 1 && tourData.gratuity_type_id === 3) ||
        (tourData.tax_id === 1 && tourData.gratuity_type_id === 4)
      ) {
        // Tax - Yes . Gratuity - Fixed Amount
        // If the Payment Settings says the Net Rate includes Gratuity and Taxes then the calculation would be:
        let totalPriceInput = +netPriceInput;
        validationType.setFieldValue(
          "p_total_price",
          setDecimalFormat(+totalPriceInput)
        );

        baseAmountInput = setDecimalFormat(netPriceInput / 1.16);

        ivaInput = totalPriceInput - baseAmountInput;
        validationType.setFieldValue("p_iva", setDecimalFormat(ivaInput));

        if (tourData.gratuity_type_id === 3) {
          // Fixed
          gratuityInput = +tourData.gratuity;
        } else {
          // Percent

          // Based On
          // 1- Net Price
          // 2- Public Price

          // Apply
          // 1- Before
          // 2- After
          if (+tourData.based_on_id === 1) {
            // 1- Net Price
            if (+tourData.payment_apply_id === 1) {
              // 1- Before
              gratuityInput = (+tourData.gratuity * baseAmountInput) / 100;
            } else {
              // 2- After
              gratuityInput = (+tourData.gratuity * totalPriceInput) / 100;
            }
          } else {
            // 2- Public Price
            if (+tourData.payment_apply_id === 1) {
              // 1- Before
              baseAmountInput = setDecimalFormat(
                publicPriceInput / (1.16 + +tourData.gratuity / 100)
              );

              ivaInput = baseAmountInput * 0.16;
              validationType.setFieldValue("p_iva", setDecimalFormat(ivaInput));

              totalPriceInput = +baseAmountInput + +ivaInput;
              validationType.setFieldValue(
                "p_total_price",
                setDecimalFormat(+totalPriceInput)
              );

              gratuityInput = (+tourData.gratuity * +baseAmountInput) / 100;
            } else {
              // 2- After
              totalPriceInput = +publicPriceInput;
              validationType.setFieldValue(
                "p_total_price",
                setDecimalFormat(+totalPriceInput)
              );

              baseAmountInput = setDecimalFormat(publicPriceInput / 1.16);

              ivaInput = totalPriceInput - baseAmountInput;
              validationType.setFieldValue("p_iva", setDecimalFormat(ivaInput));

              gratuityInput = (+tourData.gratuity * +totalPriceInput) / 100;
            }
          }
        }
        validationType.setFieldValue(
          "p_gratuity",
          setDecimalFormat(gratuityInput)
        );
        validationType.setFieldValue(
          "t_gratuity",
          setDecimalFormat(gratuityInput)
        );

        validationType.setFieldValue(
          "p_final_total",
          setDecimalFormat(+totalPriceInput + +gratuityInput)
        );
      } else if (
        (tourData.tax_id === 2 && tourData.gratuity_type_id === 3) ||
        (tourData.tax_id === 3 && tourData.gratuity_type_id === 3) ||
        (tourData.tax_id === 2 && tourData.gratuity_type_id === 4) ||
        (tourData.tax_id === 3 && tourData.gratuity_type_id === 4)
      ) {
        // Tax - No/Un . Gratuity - Fixed Amount
        // If the Payment Settings says the Net Rate includes Gratuity and Taxes then the calculation would be:

        baseAmountInput = setDecimalFormat(netPriceInput);

        ivaInput = baseAmountInput * 0.16;
        validationType.setFieldValue("p_iva", setDecimalFormat(ivaInput));

        let totalPriceInput = +baseAmountInput + +ivaInput;
        validationType.setFieldValue(
          "p_total_price",
          setDecimalFormat(+totalPriceInput)
        );

        if (tourData.gratuity_type_id === 3) {
          // Fixed
          gratuityInput = +tourData.gratuity;
        } else {
          // Percent

          // Based On
          // 1- Net Price
          // 2- Public Price

          // Apply
          // 1- Before
          // 2- After
          if (+tourData.based_on_id === 1) {
            // 1- Net Price
            if (+tourData.payment_apply_id === 1) {
              // 1- Before
              gratuityInput = (+tourData.gratuity * baseAmountInput) / 100;
            } else {
              // 2- After
              gratuityInput = (+tourData.gratuity * totalPriceInput) / 100;
            }
          } else {
            // 2- Public Price

            baseAmountInput = setDecimalFormat(+publicPriceInput);

            ivaInput = baseAmountInput * 0.16;
            validationType.setFieldValue("p_iva", setDecimalFormat(ivaInput));

            totalPriceInput = +baseAmountInput + +ivaInput;
            validationType.setFieldValue(
              "p_total_price",
              setDecimalFormat(+totalPriceInput)
            );

            if (+tourData.payment_apply_id === 1) {
              // 1- Before
              gratuityInput = (+tourData.gratuity * +baseAmountInput) / 100;
            } else {
              // 2- After
              gratuityInput = (+tourData.gratuity * +totalPriceInput) / 100;
            }
          }
        }
        validationType.setFieldValue(
          "p_gratuity",
          setDecimalFormat(gratuityInput)
        );
        validationType.setFieldValue(
          "t_gratuity",
          setDecimalFormat(gratuityInput)
        );

        validationType.setFieldValue(
          "p_final_total",
          setDecimalFormat(+totalPriceInput + +gratuityInput)
        );
      }
      validationType.setFieldValue(
        "p_base_amount",
        setDecimalFormat(baseAmountInput)
      );
    }

    if (
      priceSheetSelected === "2" &&
      publicPriceInput !== "" &&
      rateInput !== "" &&
      publicPriceInput > 0
    ) {
      netPriceInputRate = publicPriceInput * (1 - rateInput / 100);
      validationType.setFieldValue(
        "net_rate",
        setDecimalFormat(netPriceInputRate)
      );
      providerCommissionInputRate = publicPriceInput * (rateInput / 100);
      validationType.setFieldValue(
        "provider_commission",
        setDecimalFormat(providerCommissionInputRate)
      );

      if (
        (tourData.tax_id === 1 && tourData.gratuity_id === 3) ||
        (tourData.tax_id === 1 && tourData.gratuity_type_id === 6)
      ) {
        // Tax - Yes . Gratuity - No
        //If the Payment Settings indicate the Net Price includes taxes but not gratuity,
        // then this field would be calculated as:
        // [Net Price] / [1.16]
        gratuityInput = "";

        validationType.setFieldValue("p_gratuity", "");
        validationType.setFieldValue("t_gratuity", "");

        let totalPriceInput = +netPriceInputRate;
        validationType.setFieldValue(
          "p_total_price",
          setDecimalFormat(+totalPriceInput)
        );

        baseAmountInput = setDecimalFormat(netPriceInputRate / 1.16);

        ivaInput = totalPriceInput - baseAmountInput;
        validationType.setFieldValue("p_iva", setDecimalFormat(ivaInput));

        validationType.setFieldValue(
          "p_final_total",
          setDecimalFormat(+totalPriceInput)
        );
      } else if (
        (tourData.tax_id === 2 && tourData.gratuity_id === 3) ||
        (tourData.tax_id === 2 && tourData.gratuity_type_id === 6) ||
        (tourData.tax_id === 3 && tourData.gratuity_id === 3) ||
        (tourData.tax_id === 3 && tourData.gratuity_type_id === 6)
      ) {
        // Tax - No . Gratuity - No
        // If Payment Settings indicates that the Net Price does not include taxes or gratuity,
        // then this will be a straight reference, no calculation needed.
        gratuityInput = "";

        validationType.setFieldValue("p_gratuity", "");
        validationType.setFieldValue("t_gratuity", "");

        baseAmountInput = setDecimalFormat(netPriceInputRate);

        ivaInput = baseAmountInput * 0.16;
        validationType.setFieldValue("p_iva", setDecimalFormat(ivaInput));

        let totalPriceInput = +baseAmountInput + +ivaInput;
        validationType.setFieldValue(
          "p_total_price",
          setDecimalFormat(+totalPriceInput)
        );

        validationType.setFieldValue(
          "p_final_total",
          setDecimalFormat(+totalPriceInput)
        );
      } else if (
        (tourData.tax_id === 1 && tourData.gratuity_type_id === 3) ||
        (tourData.tax_id === 1 && tourData.gratuity_type_id === 4)
      ) {
        // Tax - Yes . Gratuity - Yes - Fixed Amount
        // If the Payment Settings says the Net Rate includes Gratuity and Taxes then the calculation would be:
        let totalPriceInput = +netPriceInputRate;
        validationType.setFieldValue(
          "p_total_price",
          setDecimalFormat(+totalPriceInput)
        );

        baseAmountInput = setDecimalFormat(netPriceInputRate / 1.16);

        ivaInput = totalPriceInput - baseAmountInput;
        validationType.setFieldValue("p_iva", setDecimalFormat(ivaInput));

        if (tourData.gratuity_type_id === 3) {
          // Fixed
          gratuityInput = +tourData.gratuity;
        } else {
          // Percent

          // Based On
          // 1- Net Price
          // 2- Public Price

          // Apply
          // 1- Before
          // 2- After
          if (+tourData.based_on_id === 1) {
            // 1- Net Price
            if (+tourData.payment_apply_id === 1) {
              // 1- Before
              gratuityInput = (+tourData.gratuity * baseAmountInput) / 100;
            } else {
              // 2- After
              gratuityInput = (+tourData.gratuity * totalPriceInput) / 100;
            }
          } else {
            // 2- Public Price

            totalPriceInput = +publicPriceInput;
            validationType.setFieldValue(
              "p_total_price",
              setDecimalFormat(+totalPriceInput)
            );

            baseAmountInput = setDecimalFormat(publicPriceInput / 1.16);

            ivaInput = totalPriceInput - baseAmountInput;
            validationType.setFieldValue("p_iva", setDecimalFormat(ivaInput));

            if (+tourData.payment_apply_id === 1) {
              // 1- Before
              gratuityInput = (+tourData.gratuity * +baseAmountInput) / 100;
            } else {
              // 2- After
              gratuityInput = (+tourData.gratuity * +totalPriceInput) / 100;
            }
          }
        }
        validationType.setFieldValue(
          "p_gratuity",
          setDecimalFormat(gratuityInput)
        );
        validationType.setFieldValue(
          "t_gratuity",
          setDecimalFormat(gratuityInput)
        );

        validationType.setFieldValue(
          "p_final_total",
          setDecimalFormat(+totalPriceInput + +gratuityInput)
        );
      } else if (
        (tourData.tax_id === 2 && tourData.gratuity_type_id === 3) ||
        (tourData.tax_id === 3 && tourData.gratuity_type_id === 3) ||
        (tourData.tax_id === 2 && tourData.gratuity_type_id === 4) ||
        (tourData.tax_id === 3 && tourData.gratuity_type_id === 4)
      ) {
        // Tax - No/Un . Gratuity - Fixed Amount
        // If the Payment Settings says the Net Rate includes Gratuity and Taxes then the calculation would be:

        baseAmountInput = setDecimalFormat(netPriceInputRate);

        ivaInput = baseAmountInput * 0.16;
        validationType.setFieldValue("p_iva", setDecimalFormat(ivaInput));

        let totalPriceInput = +baseAmountInput + +ivaInput;
        validationType.setFieldValue(
          "p_total_price",
          setDecimalFormat(+totalPriceInput)
        );

        if (tourData.gratuity_type_id === 3) {
          // Fixed
          gratuityInput = +tourData.gratuity;
        } else {
          // Percent

          // Based On
          // 1- Net Price
          // 2- Public Price

          // Apply
          // 1- Before
          // 2- After
          if (+tourData.based_on_id === 1) {
            // 1- Net Price
            if (+tourData.payment_apply_id === 1) {
              // 1- Before
              gratuityInput = (+tourData.gratuity * baseAmountInput) / 100;
            } else {
              // 2- After
              gratuityInput = (+tourData.gratuity * totalPriceInput) / 100;
            }
          } else {
            // 2- Public Price

            baseAmountInput = setDecimalFormat(+publicPriceInput);

            ivaInput = baseAmountInput * 0.16;
            validationType.setFieldValue("p_iva", setDecimalFormat(ivaInput));

            totalPriceInput = +baseAmountInput + +ivaInput;
            validationType.setFieldValue(
              "p_total_price",
              setDecimalFormat(+totalPriceInput)
            );

            if (+tourData.payment_apply_id === 1) {
              // 1- Before
              gratuityInput = (+tourData.gratuity * +baseAmountInput) / 100;
            } else {
              // 2- After
              gratuityInput = (+tourData.gratuity * +totalPriceInput) / 100;
            }
          }
        }
        validationType.setFieldValue(
          "p_gratuity",
          setDecimalFormat(gratuityInput)
        );
        validationType.setFieldValue(
          "t_gratuity",
          setDecimalFormat(gratuityInput)
        );

        validationType.setFieldValue(
          "p_final_total",
          setDecimalFormat(+totalPriceInput + +gratuityInput)
        );
      }
      validationType.setFieldValue(
        "p_base_amount",
        setDecimalFormat(baseAmountInput)
      );
    }

    if (
      priceSheetSelected === "3" &&
      publicPriceInput !== "" &&
      commissionFixedInput !== "" &&
      publicPriceInput > 0
    ) {
      netPriceInputCommision = publicPriceInput - commissionFixedInput;
      validationType.setFieldValue(
        "net_rate",
        setDecimalFormat(netPriceInputCommision)
      );
      validationType.setFieldValue(
        "p_est_rate",
        setRateFormat(commissionFixedInput / publicPriceInput)
      );

      if (
        (tourData.tax_id === 1 && tourData.gratuity_id === 3) ||
        (tourData.tax_id === 1 && tourData.gratuity_type_id === 6)
      ) {
        // Tax - Yes . Gratuity - No
        //If the Payment Settings indicate the Net Price includes taxes but not gratuity,
        // then this field would be calculated as:
        // [Net Price] / [1.16]
        gratuityInput = "";

        validationType.setFieldValue("p_gratuity", "");
        validationType.setFieldValue("t_gratuity", "");

        let totalPriceInput = +netPriceInputCommision;
        validationType.setFieldValue(
          "p_total_price",
          setDecimalFormat(+totalPriceInput)
        );
        baseAmountInput = setDecimalFormat(netPriceInputCommision / 1.16);

        ivaInput = totalPriceInput - baseAmountInput;
        validationType.setFieldValue("p_iva", setDecimalFormat(ivaInput));

        validationType.setFieldValue(
          "p_final_total",
          setDecimalFormat(+totalPriceInput)
        );
      } else if (
        (tourData.tax_id === 2 && tourData.gratuity_id === 3) ||
        (tourData.tax_id === 2 && tourData.gratuity_type_id === 6) ||
        (tourData.tax_id === 3 && tourData.gratuity_id === 3) ||
        (tourData.tax_id === 3 && tourData.gratuity_type_id === 6)
      ) {
        // Tax - No . Gratuity - No
        // If Payment Settings indicates that the Net Price does not include taxes or gratuity,
        // then this will be a straight reference, no calculation needed.
        gratuityInput = "";

        validationType.setFieldValue("p_gratuity", "");
        validationType.setFieldValue("t_gratuity", "");

        baseAmountInput = setDecimalFormat(+netPriceInputCommision);

        ivaInput = baseAmountInput * 0.16;
        validationType.setFieldValue("p_iva", setDecimalFormat(ivaInput));

        let totalPriceInput = +baseAmountInput + +ivaInput;
        validationType.setFieldValue(
          "p_total_price",
          setDecimalFormat(+totalPriceInput)
        );

        validationType.setFieldValue(
          "p_final_total",
          setDecimalFormat(+totalPriceInput)
        );
      } else if (
        (tourData.tax_id === 1 && tourData.gratuity_type_id === 3) ||
        (tourData.tax_id === 1 && tourData.gratuity_type_id === 4)
      ) {
        // Tax - Yes . Gratuity - Fixed Amount
        // If the Payment Settings says the Net Rate includes Gratuity and Taxes then the calculation would be:
        let totalPriceInput = +netPriceInputCommision;
        validationType.setFieldValue(
          "p_total_price",
          setDecimalFormat(+totalPriceInput)
        );

        baseAmountInput = setDecimalFormat(netPriceInputCommision / 1.16);

        ivaInput = totalPriceInput - baseAmountInput;
        validationType.setFieldValue("p_iva", setDecimalFormat(ivaInput));

        if (tourData.gratuity_type_id === 3) {
          // Fixed
          gratuityInput = +tourData.gratuity;
        } else {
          // Percent

          // Based On
          // 1- Net Price
          // 2- Public Price

          // Apply
          // 1- Before
          // 2- After
          if (+tourData.based_on_id === 1) {
            // 1- Net Price
            if (+tourData.payment_apply_id === 1) {
              // 1- Before
              gratuityInput = (+tourData.gratuity * baseAmountInput) / 100;
            } else {
              // 2- After
              gratuityInput = (+tourData.gratuity * totalPriceInput) / 100;
            }
          } else {
            // 2- Public Price
            totalPriceInput = +publicPriceInput;
            validationType.setFieldValue(
              "p_total_price",
              setDecimalFormat(+totalPriceInput)
            );

            baseAmountInput = setDecimalFormat(+publicPriceInput / 1.16);

            ivaInput = totalPriceInput - baseAmountInput;
            validationType.setFieldValue("p_iva", setDecimalFormat(ivaInput));

            if (+tourData.payment_apply_id === 1) {
              // 1- Before
              gratuityInput = (+tourData.gratuity * +baseAmountInput) / 100;
            } else {
              // 2- After
              gratuityInput = (+tourData.gratuity * +totalPriceInput) / 100;
            }
          }
        }
        validationType.setFieldValue(
          "p_gratuity",
          setDecimalFormat(gratuityInput)
        );
        validationType.setFieldValue(
          "t_gratuity",
          setDecimalFormat(gratuityInput)
        );

        validationType.setFieldValue(
          "p_final_total",
          setDecimalFormat(+totalPriceInput + +gratuityInput)
        );
      } else if (
        (tourData.tax_id === 2 && tourData.gratuity_type_id === 3) ||
        (tourData.tax_id === 3 && tourData.gratuity_type_id === 3) ||
        (tourData.tax_id === 2 && tourData.gratuity_type_id === 4) ||
        (tourData.tax_id === 3 && tourData.gratuity_type_id === 4)
      ) {
        // Tax - No/Un . Gratuity - Fixed Amount
        // If the Payment Settings says the Net Rate includes Gratuity and Taxes then the calculation would be:

        baseAmountInput = setDecimalFormat(netPriceInputCommision);

        ivaInput = baseAmountInput * 0.16;
        validationType.setFieldValue("p_iva", setDecimalFormat(ivaInput));

        let totalPriceInput = +baseAmountInput + +ivaInput;
        validationType.setFieldValue(
          "p_total_price",
          setDecimalFormat(+totalPriceInput)
        );

        if (tourData.gratuity_type_id === 3) {
          // Fixed
          gratuityInput = +tourData.gratuity;
        } else {
          // Percent

          // Based On
          // 1- Net Price
          // 2- Public Price

          // Apply
          // 1- Before
          // 2- After
          if (+tourData.based_on_id === 1) {
            // 1- Net Price
            if (+tourData.payment_apply_id === 1) {
              // 1- Before
              gratuityInput = (+tourData.gratuity * baseAmountInput) / 100;
            } else {
              // 2- After
              gratuityInput = (+tourData.gratuity * totalPriceInput) / 100;
            }
          } else {
            // 2- Public Price
            baseAmountInput = setDecimalFormat(netPriceInputCommision);

            ivaInput = baseAmountInput * 0.16;
            validationType.setFieldValue("p_iva", setDecimalFormat(ivaInput));

            totalPriceInput = +baseAmountInput + +ivaInput;
            validationType.setFieldValue(
              "p_total_price",
              setDecimalFormat(+totalPriceInput)
            );
            if (+tourData.payment_apply_id === 1) {
              // 1- Before
              gratuityInput = (+tourData.gratuity * +baseAmountInput) / 100;
            } else {
              // 2- After
              gratuityInput = (+tourData.gratuity * +totalPriceInput) / 100;
            }
          }
        }
        validationType.setFieldValue(
          "p_gratuity",
          setDecimalFormat(gratuityInput)
        );
        validationType.setFieldValue(
          "t_gratuity",
          setDecimalFormat(gratuityInput)
        );

        validationType.setFieldValue(
          "p_final_total",
          setDecimalFormat(+totalPriceInput + +gratuityInput)
        );
      }
      validationType.setFieldValue(
        "p_base_amount",
        setDecimalFormat(baseAmountInput)
      );
    }
    ourPricingCalc(gratuityInput);
  };

  const ourPricingCalc = (gratuityInput) => {
    let ourPriceInput = validationType.values.our_price;
    let netPriceInput = validationType.values.net_rate;
    let ourCommisionPricing = ourPriceInput - netPriceInput;
    let depositInput = validationType.values.deposit;
    let baseAmountInput = validationType.values.t_base_amount;
    let ivaInput = validationType.values.t_iva;
    setOurCommission(setDecimalFormat(ourCommisionPricing));
    if (
      validationType.values.public_price !== null &&
      validationType.values.public_price !== "" &&
      validationType.values.public_price !== "0"
    ) {
      validationType.setFieldValue(
        "eff_rate",
        setRateFormat(
          ourCommisionPricing / validationType.values.public_price,
          1
        )
      );
    } else if (
      validationType.values.net_rate !== null &&
      validationType.values.net_rate !== "" &&
      validationType.values.net_rate !== "0" &&
      ourCommisionPricing > 0
    ) {
      validationType.setFieldValue(
        "eff_rate",
        setRateFormat(
          ourCommisionPricing /
            (+validationType.values.net_rate + +ourCommisionPricing),
          1
        )
      );
    }
    if (
      validationType.values.our_price !== "" &&
      priceCollectNameSelected !== ""
    ) {
      depositInput = calcDeposit(
        ourPriceInput,
        priceCollectNameSelected,
        ourCommisionPricing,
        depositInput
      );
      validationType.setFieldValue("deposit", depositInput);
    }

    if (
      ourPriceInput !== "" &&
      depositInput !== "" &&
      currencySelected === "USD"
    ) {
      validationType.setFieldValue(
        "voucher_balance",
        setDecimalFormatVBalance(ourPriceInput - depositInput, currencySelected)
      );
    }

    if (
      (tourData.tax_id === 1 && tourData.gratuity_id === 3) ||
      (tourData.tax_id === 1 && tourData.gratuity_type_id === 6)
    ) {
      // Tax - Yes . Gratuity - No
      //If the Payment Settings indicate the Net Price includes taxes but not gratuity,
      // then this field would be calculated as:
      // [Net Price] / [1.16]

      let totalPriceInput = +ourPriceInput;
      validationType.setFieldValue(
        "t_total_price",
        setDecimalFormat(+totalPriceInput)
      );

      baseAmountInput = setDecimalFormat(ourPriceInput / 1.16);

      ivaInput = totalPriceInput - baseAmountInput;
      validationType.setFieldValue("t_iva", setDecimalFormat(ivaInput));

      validationType.setFieldValue(
        "t_final_total",
        setDecimalFormat(+totalPriceInput)
      );
    } else if (
      (tourData.tax_id === 2 && tourData.gratuity_id === 3) ||
      (tourData.tax_id === 2 && tourData.gratuity_type_id === 6) ||
      (tourData.tax_id === 3 && tourData.gratuity_id === 3) ||
      (tourData.tax_id === 3 && tourData.gratuity_type_id === 6)
    ) {
      // Tax - No . Gratuity - No
      // If Payment Settings indicates that the Net Price does not include taxes or gratuity,
      // then this will be a straight reference, no calculation needed.

      baseAmountInput = setDecimalFormat(ourPriceInput);

      ivaInput = baseAmountInput * 0.16;
      validationType.setFieldValue("t_iva", setDecimalFormat(ivaInput));

      let totalPriceInput = +baseAmountInput + +ivaInput;
      validationType.setFieldValue(
        "t_total_price",
        setDecimalFormat(+totalPriceInput)
      );

      validationType.setFieldValue(
        "t_final_total",
        setDecimalFormat(+totalPriceInput)
      );
    } else if (
      (tourData.tax_id === 1 && tourData.gratuity_type_id === 3) ||
      (tourData.tax_id === 1 && tourData.gratuity_type_id === 4)
    ) {
      // Tax - Yes . Gratuity - Fixed Amount
      // If the Payment Settings says the Net Rate includes Gratuity and Taxes then the calculation would be:
      let totalPriceInput = +ourPriceInput;
      validationType.setFieldValue(
        "t_total_price",
        setDecimalFormat(+totalPriceInput)
      );

      baseAmountInput = setDecimalFormat(ourPriceInput / 1.16);

      ivaInput = totalPriceInput - baseAmountInput;
      validationType.setFieldValue("t_iva", setDecimalFormat(ivaInput));

      validationType.setFieldValue(
        "t_final_total",
        setDecimalFormat(+totalPriceInput + +gratuityInput)
      );
    } else if (
      (tourData.tax_id === 2 && tourData.gratuity_type_id === 3) ||
      (tourData.tax_id === 3 && tourData.gratuity_type_id === 3) ||
      (tourData.tax_id === 2 && tourData.gratuity_type_id === 4) ||
      (tourData.tax_id === 3 && tourData.gratuity_type_id === 4)
    ) {
      // Tax - No/Un . Gratuity - Fixed Amount
      // If the Payment Settings says the Net Rate includes Gratuity and Taxes then the calculation would be:

      baseAmountInput = setDecimalFormat(ourPriceInput);

      ivaInput = baseAmountInput * 0.16;
      validationType.setFieldValue("t_iva", setDecimalFormat(ivaInput));

      let totalPriceInput = +baseAmountInput + +ivaInput;
      validationType.setFieldValue(
        "t_total_price",
        setDecimalFormat(+totalPriceInput)
      );

      validationType.setFieldValue(
        "t_final_total",
        setDecimalFormat(+totalPriceInput + +gratuityInput)
      );
    }
    validationType.setFieldValue(
      "t_base_amount",
      setDecimalFormat(baseAmountInput)
    );
    if (
      ourPriceInput !== "" &&
      validationType.values.ship_price &&
      validationType.values.ship_price !== null &&
      validationType.values.ship_price !== "0.00" &&
      validationType.values.ship_price !== "0"
    ) {
      validationType.setFieldValue(
        "you_save",
        100 - setYouSaveFormat(ourPriceInput / validationType.values.ship_price)
      );
    } else if (
      ourPriceInput !== "" &&
      validationType.values.compare_at !== "" &&
      validationType.values.compare_at !== null &&
      validationType.values.compare_at !== "0.00" &&
      validationType.values.compare_at !== "0"
    ) {
      validationType.setFieldValue(
        "you_save",
        100 - setYouSaveFormat(ourPriceInput / validationType.values.compare_at)
      );
    }
    if (depositInput !== null && depositInput !== "" && depositInput !== 0) {
      validationType.setFieldValue(
        "net_price_fixed",
        (depositInput - ourCommisionPricing).toFixed(2)
      );
    }
    if (depositInput !== null && depositInput !== "" && depositInput !== 0) {
      validationType.setFieldValue(
        "net_price_percentage",
        (depositInput - ourCommisionPricing).toFixed(2)
      );
    }
    if (depositInput !== null && depositInput !== "" && depositInput !== 0) {
      validationType.setFieldValue(
        "net_price",
        (depositInput - ourCommisionPricing).toFixed(2)
      );
    }
  };

  useEffect(() => {
    if (priceCollectNameSelected) {
      providerPricingCalc();
    }
  }, [priceCollectNameSelected, currencySelected]);

  return (
    <Modal
      centered
      size="xl"
      isOpen={addNewPrivateCharter}
      toggle={() => {
        // onClickAddNew();
      }}
    >
      <div
        className="modal-header"
        style={{ backgroundColor: "#3DC7F4", border: "none" }}
      >
        {copyProduct ? (
          <h1 className="modal-title mt-0 text-white">
            + Copy Product - Private Charter
          </h1>
        ) : null}
        {copyProduct === false && dataEdit ? (
          <h1 className="modal-title mt-0 text-white">
            + Edit Product - Private Charter
          </h1>
        ) : null}
        {copyProduct === false && !dataEdit ? (
          <h1 className="modal-title mt-0 text-white">
            + New Product - Private Charter
          </h1>
        ) : null}
        <button
          onClick={() => {
            setAddNewPrivateCharter(false);
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
            <Row className="d-flex g-4">
              <Col className="col-3">
                <img
                  src={PrivateCharterImage}
                  alt="new-product"
                  className="img-fluid"
                />
              </Col>
              <Col className="col-9">
                {dataEdit ? (
                  <Row className="d-flex">
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
                ) : null}

                <Row className="d-flex">
                  <Col className="col-3">
                    <div className="form-outline">
                      <div className="d-flex justify-content-between">
                        <Label className="form-label">Price Type</Label>
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
                        //   value={validationType.values.department || ""}
                      >
                        <option value={null}>Select....</option>
                        {map(priceTypeData, (type, index) => {
                          return (
                            <option
                              key={index}
                              value={type.id}
                              selected={
                                dataEdit && dataEdit.pricedetails
                                  ? type.id ===
                                    dataEdit.pricedetails.filter(
                                      (x) => x.pricing_option_id === 38
                                    )[0]?.source_id
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
                  <Col className="col-3">
                    <div className="form-outline">
                      <div className="d-flex justify-content-between">
                        <Label className="form-label">Price Option</Label>
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
                            parenthesis, it will also show on the booking form
                            as the label for the Quantity drop-down or as an
                            option in the Choose Activity drop-down, depending
                            on the reserve page template chosen. The option
                            chosen here will automatically assign the last digit
                            of the SKU.
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
                        <option value="-1">Select....</option>
                        {map(priceOptions, (option, index) => {
                          return (
                            <option
                              key={index}
                              value={option.id}
                              selected={
                                dataEdit && dataEdit.pricedetails
                                  ? option.id ===
                                    dataEdit.pricedetails.filter(
                                      (x) => x.pricing_option_id === 39
                                    )[0]?.source_id
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

                  <Col className="col-3">
                    <div className="form-outline">
                      <div className="d-flex justify-content-between">
                        <Label className="form-label">Price Option 2</Label>
                        <div>
                          <i
                            className="uil-question-circle font-size-15 mx-2"
                            id="price2"
                          />
                          <Tooltip
                            placement="right"
                            isOpen={ttprice2}
                            target="price2"
                            toggle={() => {
                              setttprice2(!ttprice2);
                            }}
                          >
                            If chosen, this will display in the product name in
                            parentheses, it will also show on the People Msg +
                            Qty + Choose Activity booking form as a label for
                            the quantity dropdown or as an option for Choose One
                            on the Two Price Options + Choose One booking form.
                          </Tooltip>
                        </div>
                      </div>
                      <Input
                        type="select"
                        name="price_2"
                        onChange={(e) => {
                          setRecalc(true);
                          setPriceTypeSelected2(e.target.value);
                          // setPriceCollectNameSelected(
                          //   e.target.selectedOptions[0].label
                          // );
                        }}
                      >
                        <option value="-1">Select....</option>
                        {map(pricingOption2Selected, (collect, index) => {
                          return (
                            <option
                              key={index}
                              value={collect.id}
                              selected={
                                dataEdit && dataEdit.pricedetails
                                  ? collect.id ===
                                    dataEdit.pricedetails.filter(
                                      (x) => x.pricing_option_id === 68
                                    )[0]?.source_id
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
                  <Col className="col-3">
                    <div className="form-outline">
                      <div className="d-flex justify-content-between">
                        <Label className="form-label">Collect</Label>
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
                            <p>
                              Select the amount of deposit that will be
                              collected at the time of booking.
                            </p>
                            <p>
                              Commission = The deposit is equal to the amount of
                              commission we earn for the tour.
                            </p>
                            <p>
                              Afilliate = The payment is made directly through
                              the provider's website, such as the case of
                              dTraveller or Viator.
                            </p>
                            Deposit = Manually type the amount of deposit we
                            will collect in the "Deposit" field below.
                          </Tooltip>
                        </div>
                      </div>
                      <Input
                        type="select"
                        name="collect"
                        onChange={(e) => {
                          setRecalc(true);
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
                                dataEdit && dataEdit.pricedetails
                                  ? collect.id ===
                                    dataEdit.pricedetails.filter(
                                      (x) => x.pricing_option_id === 41
                                    )[0]?.source_id
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
                </Row>
                <Row className="d-flex mt-4">
                  {tourData?.seasonality === 1 ? (
                    <Col className="col">
                      <div
                        className="form-outline"
                        style={{ marginRight: "20px", marginLeft: "-20px" }}
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
                          <option value="-1">Select....</option>
                          {map(priceSeason, (season, index) => {
                            return (
                              <option
                                key={index}
                                value={season.id}
                                selected={
                                  dataEdit && dataEdit.pricedetails
                                    ? season.id ===
                                      dataEdit.pricedetails.filter(
                                        (x) => x.pricing_option_id === 44
                                      )[0]?.source_id
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
                  <Col className="col-2">
                    <div
                      className="form-outline"
                      style={{ marginRight: "20px" }}
                    >
                      <Label className="form-label">Cruise Pax</Label>
                      <Input
                        type="select"
                        name="season"
                        onChange={(e) => {
                          setCruisePaxSelected(e.target.value);
                        }}
                        onBlur={validationType.handleBlur}
                        //   value={validationType.values.department || ""}
                      >
                        <option value="-1">Select....</option>
                        <option
                          value="Yes"
                          selected={
                            dataEdit &&
                            dataEdit.asset_details?.cruise_pax === "Yes"
                              ? true
                              : false
                          }
                        >
                          Yes
                        </option>
                        <option
                          value="No"
                          selected={
                            dataEdit &&
                            dataEdit.asset_details?.cruise_pax === "No"
                              ? true
                              : false
                          }
                        >
                          No
                        </option>
                      </Input>
                    </div>
                  </Col>
                  <Col className="col-2">
                    <div className="form-outline mb-2" id="public_price">
                      <div className="d-flex justify-content-between">
                        <Label className="form-label">Price Tiers</Label>
                      </div>
                      <div className="input-group">
                        <span
                          className="input-group-text form-label fw-bold bg-paradise text-white border-0"
                          id="basic-addon1"
                          style={{ fontSize: "0.85em" }}
                        >
                          Min
                        </span>
                        <Input
                          name="min"
                          placeholder=""
                          type="text"
                          onChange={validationType.handleChange}
                          disabled={!priceRangeCheck}
                          // onBlur={(e) => {
                          //   setRecalc(true)
                          //   const value = e.target.value || "";
                          //   validationType.setFieldValue(
                          //     "min",
                          //     setDecimalFormat(value)
                          //   );
                          // }}
                          value={validationType.values.min || ""}
                          invalid={
                            validationType.touched.min &&
                            validationType.errors.min
                              ? true
                              : false
                          }
                        />
                        {validationType.touched.min &&
                        validationType.errors.min ? (
                          <FormFeedback type="invalid">
                            {validationType.errors.min}
                          </FormFeedback>
                        ) : null}
                      </div>
                    </div>
                  </Col>
                  <Col className="col-2">
                    <div className="form-outline mb-2" id="">
                      <div
                        className="d-flex justify-content-between"
                        style={{ marginTop: "6px" }}
                      >
                        <Label className="form-label"></Label>
                        <div>
                          <i
                            className="uil-question-circle font-size-15"
                            id="tiers"
                          />
                          <Tooltip
                            placement="right"
                            isOpen={ttiers}
                            target="tiers"
                            toggle={() => {
                              setttiers(!ttiers);
                            }}
                          >
                            Write the ranges of people that will appear in the
                            name of the product and will determine the price of
                            it.
                          </Tooltip>
                        </div>
                      </div>
                      <div className="input-group">
                        <span
                          className="input-group-text form-label fw-bold bg-paradise text-white border-0"
                          id="basic-addon1"
                          style={{ fontSize: "0.85em" }}
                        >
                          Max
                        </span>
                        <Input
                          name="max"
                          placeholder=""
                          type="text"
                          min="0"
                          step="any"
                          onChange={validationType.handleChange}
                          disabled={!priceRangeCheck}
                          // onBlur={(e) => {
                          //   const value = e.target.value || "";
                          //   validationType.setFieldValue(
                          //     "max",
                          //     setDecimalFormat(value)
                          //   );
                          // }}
                          value={validationType.values.max || ""}
                          invalid={
                            validationType.touched.max &&
                            validationType.errors.max
                              ? true
                              : false
                          }
                        />
                        {validationType.touched.max &&
                        validationType.errors.max ? (
                          <FormFeedback type="invalid">
                            {validationType.errors.max}
                          </FormFeedback>
                        ) : null}
                      </div>
                    </div>
                  </Col>
                  <Col className="col-2 mt-1">
                    <div className="form-outline mb-2" id="active">
                      <div className="d-flex mx-4">
                        <Label className="form-label mx-2">Active</Label>
                        <div>
                          <i
                            className="uil-question-circle font-size-15"
                            id="activeT"
                          />
                          <Tooltip
                            placement="right"
                            isOpen={ttactive}
                            target="activeT"
                            toggle={() => {
                              setttactive(!ttactive);
                            }}
                          >
                            Select if the tour is active for booking or not.
                          </Tooltip>
                        </div>
                      </div>
                      <div className="form-check form-switch form-switch-md mx-5 mt-1 ">
                        <Input
                          name="active_t"
                          placeholder=""
                          type="checkbox"
                          checked={activeCheckbox}
                          className="form-check-input"
                          onChange={() => setActiveCheckbox(!activeCheckbox)}
                          // onBlur={validationType.handleBlur}
                          value={activeCheckbox}
                        />
                      </div>
                    </div>
                  </Col>
                  <Col className="col-2">
                    <div className="form-outline mb-2" id="commission">
                      <div className="d-flex justify-content-between">
                        <Label className="form-label">Balance Notify</Label>
                        <div>
                          <i
                            className="uil-question-circle font-size-15"
                            id="balanceN"
                          />
                          <Tooltip
                            placement="right"
                            isOpen={ttbd}
                            target="balanceN"
                            toggle={() => {
                              setbd(!ttbd);
                            }}
                          >
                            Select whether the balance due should be shown to
                            the provider in the "Please Confirm" email. This
                            amount will be the same as in the "Voucher Balance"
                            below. It is the amount the customer will pay to the
                            provider on the day of the tour.
                          </Tooltip>
                        </div>
                      </div>
                      <div className="form-check form-switch form-switch-md mx-4 mt-2 ">
                        <Input
                          name="balanceT"
                          placeholder=""
                          type="checkbox"
                          checked={balanceDueCheckbox}
                          className="form-check-input"
                          onChange={() =>
                            setBalanceDueCheckbox(!balanceDueCheckbox)
                          }
                          // onBlur={validationType.handleBlur}
                          value={balanceDueCheckbox}
                        />
                      </div>
                    </div>
                  </Col>
                </Row>
                <Row className="d-flex mt-2">
                  <Col className="col-2">
                    <div
                      className="form-outline"
                      style={{ marginRight: "20px" }}
                    >
                      <Label className="form-label">Budget</Label>
                      <Input
                        type="select"
                        name="season"
                        onChange={(e) => {
                          setBudgetSelected(e.target.value);
                        }}
                        onBlur={validationType.handleBlur}
                        //   value={validationType.values.department || ""}
                      >
                        <option value="-1">Select....</option>
                        <option
                          value="1"
                          selected={
                            dataEdit &&
                            dataEdit.asset_details?.budget_id === "1"
                              ? true
                              : false
                          }
                        >
                          Basic
                        </option>
                        <option
                          value="3"
                          selected={
                            dataEdit &&
                            dataEdit.asset_details?.budget_id === "3"
                              ? true
                              : false
                          }
                        >
                          Moderate
                        </option>
                        <option
                          value="2"
                          selected={
                            dataEdit &&
                            dataEdit.asset_details?.budget_id === "2"
                              ? true
                              : false
                          }
                        >
                          Luxury
                        </option>
                      </Input>
                    </div>
                  </Col>
                  <Col className="col-2">
                    <div
                      className="form-outline"
                      style={{ marginRight: "20px" }}
                    >
                      <Label className="form-label">Vibe</Label>
                      <Input
                        type="select"
                        name="season"
                        onChange={(e) => {
                          setVibeSelected(e.target.value);
                        }}
                        onBlur={validationType.handleBlur}
                        //   value={validationType.values.department || ""}
                      >
                        <option value="-1">Select....</option>
                        <option
                          value="4"
                          selected={
                            dataEdit && dataEdit.asset_details?.vibe_id === "4"
                              ? true
                              : false
                          }
                        >
                          Casual
                        </option>
                        <option
                          value="5"
                          selected={
                            dataEdit && dataEdit.asset_details?.vibe_id === "5"
                              ? true
                              : false
                          }
                        >
                          Luxury
                        </option>
                        <option
                          value="6"
                          selected={
                            dataEdit && dataEdit.asset_details?.vibe_id === "6"
                              ? true
                              : false
                          }
                        >
                          Party
                        </option>
                        <option
                          value="7"
                          selected={
                            dataEdit && dataEdit.asset_details?.vibe_id === "7"
                              ? true
                              : false
                          }
                        >
                          Relaxed
                        </option>
                      </Input>
                    </div>
                  </Col>
                  <Col className="col-2">
                    <div
                      className="form-outline"
                      style={{ marginRight: "20px" }}
                    >
                      <Label className="form-label">Meal</Label>
                      <Input
                        type="select"
                        name="season"
                        onChange={(e) => {
                          setMealSelected(e.target.value);
                        }}
                        onBlur={validationType.handleBlur}
                        //   value={validationType.values.department || ""}
                      >
                        <option value="-1">Select....</option>
                        <option
                          value="11"
                          selected={
                            dataEdit && dataEdit.asset_details?.meal_id === "11"
                              ? true
                              : false
                          }
                        >
                          Yes
                        </option>
                        <option
                          value="13"
                          selected={
                            dataEdit && dataEdit.asset_details?.meal_id === "13"
                              ? true
                              : false
                          }
                        >
                          No
                        </option>
                        <option
                          value="12"
                          selected={
                            dataEdit && dataEdit.asset_details?.meal_id === "12"
                              ? true
                              : false
                          }
                        >
                          Available
                        </option>
                      </Input>
                    </div>
                  </Col>
                  <Col className="col-2">
                    <div
                      className="form-outline"
                      style={{ marginRight: "20px" }}
                    >
                      <Label className="form-label">Snacks</Label>
                      <Input
                        type="select"
                        name="season"
                        onChange={(e) => {
                          setSnackSelected(e.target.value);
                        }}
                        onBlur={validationType.handleBlur}
                        //   value={validationType.values.department || ""}
                      >
                        <option value="-1">Select....</option>
                        <option
                          value="8"
                          selected={
                            dataEdit && dataEdit.asset_details?.snack_id === "8"
                              ? true
                              : false
                          }
                        >
                          Yes
                        </option>
                        <option
                          value="10"
                          selected={
                            dataEdit &&
                            dataEdit.asset_details?.snack_id === "10"
                              ? true
                              : false
                          }
                        >
                          No
                        </option>
                        <option
                          value="9"
                          selected={
                            dataEdit && dataEdit.asset_details?.snack_id === "9"
                              ? true
                              : false
                          }
                        >
                          Available
                        </option>
                      </Input>
                    </div>
                  </Col>
                  <Col className="col-2">
                    <div
                      className="form-outline"
                      style={{ marginRight: "20px" }}
                    >
                      <Label className="form-label">Open Bar</Label>
                      <Input
                        type="select"
                        name="season"
                        onChange={(e) => {
                          setOpenBarSelected(e.target.value);
                        }}
                        onBlur={validationType.handleBlur}
                        //   value={validationType.values.department || ""}
                      >
                        <option value="-1">Select....</option>
                        <option
                          value="14"
                          selected={
                            dataEdit &&
                            dataEdit.asset_details?.open_bar_id === "14"
                              ? true
                              : false
                          }
                        >
                          Yes
                        </option>
                        <option
                          value="16"
                          selected={
                            dataEdit &&
                            dataEdit.asset_details?.open_bar_id === "16"
                              ? true
                              : false
                          }
                        >
                          No
                        </option>
                        <option
                          value="15"
                          selected={
                            dataEdit &&
                            dataEdit.asset_details?.open_bar_id === "15"
                              ? true
                              : false
                          }
                        >
                          Available
                        </option>
                      </Input>
                    </div>
                  </Col>
                  <Col className="col-2">
                    <div
                      className="form-outline"
                      style={{ marginRight: "20px" }}
                    >
                      <Label className="form-label">Soft Drinks</Label>
                      <Input
                        type="select"
                        name="season"
                        onChange={(e) => {
                          setSoftDrinkSelected(e.target.value);
                        }}
                        onBlur={validationType.handleBlur}
                        //   value={validationType.values.department || ""}
                      >
                        <option value="-1">Select....</option>
                        <option
                          value="17"
                          selected={
                            dataEdit &&
                            dataEdit.asset_details?.soft_drink_id === "17"
                              ? true
                              : false
                          }
                        >
                          Yes
                        </option>
                        <option
                          value="19"
                          selected={
                            dataEdit &&
                            dataEdit.asset_details?.soft_drink_id === "19"
                              ? true
                              : false
                          }
                        >
                          No
                        </option>
                        <option
                          value="18"
                          selected={
                            dataEdit &&
                            dataEdit.asset_details?.soft_drink_id === "18"
                              ? true
                              : false
                          }
                        >
                          Available
                        </option>
                      </Input>
                    </div>
                  </Col>
                </Row>
                <Col
                  className="col-12 p-1 my-2 d-flex justify-content-between"
                  style={{ backgroundColor: "#E9F4FF", cursor: "pointer" }}
                  onClick={() => setCharterOptionsTab(!charterOptionsTab)}
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
                  {charterOptionsTab ? (
                    <div
                      className="m-2"
                      style={{ cursor: "pointer" }}
                      onClick={() => setCharterOptionsTab(!charterOptionsTab)}
                    >
                      <IoIosArrowDown size={30} />
                    </div>
                  ) : (
                    <div
                      className="m-2"
                      style={{ cursor: "pointer" }}
                      onClick={() => setCharterOptionsTab(!charterOptionsTab)}
                    >
                      <IoIosArrowForward size={30} />
                    </div>
                  )}
                </Col>
                {charterOptionsTab ? (
                  <Row className="d-flex">
                    <Col className="col-3">
                      <div className="form-outline mb-2">
                        <div className="d-flex justify-content-between">
                          <Label className="form-label">Charter Type</Label>
                          <div>
                            <i
                              className="uil-question-circle font-size-15"
                              id="CharterType"
                            />
                            <Tooltip
                              placement="right"
                              isOpen={charterTT}
                              target="CharterType"
                              toggle={() => {
                                setCharterTT(!charterTT);
                              }}
                            >
                              Choose the type of charter you are defining. For
                              example, Snorkeling or Sunset. This will show in
                              the parentheses as (Snorkeling - 4 Hours - Deposit
                              Only). You will define Sunset as a separate
                              product.
                            </Tooltip>
                          </div>
                        </div>
                        <Input
                          type="select"
                          name="charterType"
                          onChange={(e) => {
                            setPriceCharterTypeSelected(e.target.value);
                          }}
                          onBlur={validationType.handleBlur}
                        >
                          <option value="-1">Select....</option>
                          {map(priceCharterType, (charterType, index) => {
                            return (
                              <option
                                key={index}
                                value={charterType.id}
                                selected={
                                  dataEdit && dataEdit.pricedetails
                                    ? charterType.id ===
                                      dataEdit.pricedetails.filter(
                                        (x) => x.pricing_option_id === 48
                                      )[0]?.source_id
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
                        <div className="d-flex justify-content-between">
                          <Label className="form-label">Duration</Label>
                          <div>
                            <i
                              className="uil-question-circle font-size-15"
                              id="Duration"
                            />
                            <Tooltip
                              placement="right"
                              isOpen={durationTT}
                              target="Duration"
                              toggle={() => {
                                setDurationTT(!durationTT);
                              }}
                            >
                              Specify the duration of the charter, for example 4
                              Hours.
                            </Tooltip>
                          </div>
                        </div>
                        <Input
                          type="select"
                          name="duration"
                          onChange={(e) => {
                            setPriceDurationSelected(e.target.value);
                          }}
                          onBlur={validationType.handleBlur}
                          //   value={validationType.values.department || ""}
                        >
                          <option value="-1">Select....</option>
                          {map(priceDuration, (duration, index) => {
                            return (
                              <option
                                key={index}
                                value={duration.id}
                                selected={
                                  dataEdit && dataEdit.pricedetails
                                    ? duration.id ===
                                      dataEdit.pricedetails.filter(
                                        (x) => x.pricing_option_id === 40
                                      )[0]?.source_id
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
                        <div className="d-flex justify-content-between">
                          <Label className="form-label">Capacity</Label>
                          <div>
                            <i
                              className="uil-question-circle font-size-15"
                              id="Capacity"
                            />
                            <Tooltip
                              placement="right"
                              isOpen={capacityTT}
                              target="Capacity"
                              toggle={() => {
                                setCapacityTT(!capacityTT);
                              }}
                            >
                              Specify the capacity of the boat. If it is up to
                              50 people same price, then leave the first box
                              empty and type 50 in the second box. If it is a
                              tiered pricing like 41 to 50 people for the
                              specified price, then you'll type 41 in the first
                              box and 50 in the second box.
                            </Tooltip>
                          </div>
                        </div>
                        <div className="input-group">
                          <span
                            className="input-group-text form-label fw-bold bg-paradise text-white border-0"
                            id="basic-addon1"
                            style={{ fontSize: "0.85em" }}
                          >
                            Min
                          </span>
                          <Input
                            name="min_qty"
                            placeholder=""
                            className="me-1"
                            type="number"
                            min="0"
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
                      </div>
                    </Col>

                    <Col className="col-2">
                      <div className="form-outline mb-2 mt-2">
                        <Label className="form-label"></Label>
                        <div className="input-group">
                        <span
                            className="input-group-text form-label fw-bold bg-paradise text-white border-0"
                            id="basic-addon1"
                            style={{ fontSize: "0.85em" }}
                          >
                            Max
                          </span>
                        <Input
                          name="max_qty"
                          placeholder=""
                          type="number"
                          min="0"
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
                      </div>
                    </Col>
                    <Col className="col-3">
                      <div className="form-outline mb-2">
                        <div className="d-flex justify-content-between">
                          <Label className="form-label">Location</Label>
                          <div>
                            <i
                              className="uil-question-circle font-size-15"
                              id="Location"
                            />
                            <Tooltip
                              placement="right"
                              isOpen={locationTT}
                              target="Location"
                              toggle={() => {
                                setLocationTT(!locationTT);
                              }}
                            >
                              Select the location of the boat. For example,
                              Puerto Morelos or Cancun.
                            </Tooltip>
                          </div>
                        </div>
                        <Input
                          type="select"
                          name="priceLocation"
                          onChange={(e) => {
                            setPriceLocationSelected(e.target.value);
                          }}
                          onBlur={validationType.handleBlur}
                          //   value={validationType.values.department || ""}
                        >
                          <option value="-1">Select....</option>
                          {map(priceLocation, (location, index) => {
                            return (
                              <option
                                key={index}
                                value={location.id}
                                selected={
                                  dataEdit && dataEdit.pricedetails
                                    ? location.id ===
                                      dataEdit.pricedetails.filter(
                                        (x) => x.pricing_option_id === 42
                                      )[0]?.source_id
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
                ) : null}
                <Col
                  className="col-12 p-1 my-2  d-flex justify-content-between"
                  style={{ backgroundColor: "#FFEFDE", cursor: "pointer" }}
                  onClick={() => setProviderPricingTab(!providerPricingTab)}
                >
                  <div className="d-flex">
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
                    <div className="m-2">
                      <i
                        className="uil-question-circle font-size-15"
                        id="providerHeaderTooltip"
                      />
                      <Tooltip
                        placement="right"
                        isOpen={providerHeaderTooltip}
                        style={{ textAlign: "left" }}
                        target="providerHeaderTooltip"
                        toggle={() => {
                          setproviderHeaderTooltip(!providerHeaderTooltip);
                        }}
                      >
                        The pricing specified by the Provider on the service
                        agreement. This is for our reference, but it is Our
                        Pricing that the customer will actually pay.
                      </Tooltip>
                    </div>
                  </div>

                  {providerPricingTab ? (
                    <div
                      className="m-2"
                      style={{ cursor: "pointer" }}
                      onClick={() => setProviderPricingTab(!providerPricingTab)}
                    >
                      <IoIosArrowDown size={30} />
                    </div>
                  ) : (
                    <div
                      className="m-2"
                      style={{ cursor: "pointer" }}
                      onClick={() => setProviderPricingTab(!providerPricingTab)}
                    >
                      <IoIosArrowForward size={30} />
                    </div>
                  )}
                </Col>
                {providerPricingTab ? (
                  <Row className="d-flex">
                    <Col className="col-2">
                      <div className="form-outline">
                        <div className="d-flex justify-content-between">
                          <Label className="form-label">Rate Type</Label>
                          <div>
                            <i
                              className="uil-question-circle font-size-15 mx-2"
                              id="priceSheetTooltip"
                            />
                            <Tooltip
                              placement="right"
                              isOpen={priceSheetTooltip}
                              target="priceSheetTooltip"
                              toggle={() => {
                                setpriceSheetTooltip(!priceSheetTooltip);
                              }}
                            >
                              Choose what type of agreement we have with the
                              provider. These options are set up to mirror our
                              Price Sheets.
                              <br />
                              <br />
                              Net Price - The Service Agreement specifies that
                              we pay a Net Rate and whatever we add to it is our
                              commission.
                              <br />
                              <br />
                              Rate % - The Service Agreement specifies a
                              commission rate off the price specified in the
                              agreement.
                              <br />
                              <br />
                              Fixed Commission - When the Provider offers a set
                              commission for the product not based on a Net Rate
                              or a Commission Rate %, such as $100.00 no matter
                              what the selling price is.
                              <br />
                              <br />
                              The exact details of these fields, such as if they
                              apply before or after taxes, gratuity, etc is set
                              up previously in the Payment Settings tab.
                            </Tooltip>
                          </div>
                        </div>
                        <Input
                          type="select"
                          name="p_price_sheet"
                          onChange={(e) => {
                            setPriceSheetSelected(e.target.value);
                            providerPricingCalc();
                          }}
                        >
                          <option value="-1">Select....</option>
                          <option
                            value={"1"}
                            selected={dataEdit?.p_price_sheet === "1"}
                          >
                            Net Price
                          </option>
                          <option
                            value={"2"}
                            selected={dataEdit?.p_price_sheet === "2"}
                          >
                            Rate %
                          </option>
                          <option
                            value={"3"}
                            selected={dataEdit?.p_price_sheet === "3"}
                          >
                            Fixed Commision
                          </option>
                        </Input>
                      </div>
                    </Col>
                    {priceSheetSelected === "1" ? (
                      <>
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
                                  The Net Price specified in our service
                                  agreement for the tour. If only a commission
                                  rate is specified in the agreement then this
                                  will automatically calculate and no entry is
                                  required.
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
                                  // setRecalc(true);
                                  const value = e.target.value || "";
                                  validationType.setFieldValue(
                                    "net_rate",
                                    setDecimalFormat(value)
                                  );
                                  providerPricingCalc();
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
                          <div className="form-outline mb-2" id="public_price">
                            <div className="d-flex justify-content-between">
                              <Label className="form-label">Est. Public</Label>
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
                                  <p>
                                    The price the provider refers to in our
                                    service agreement as the "Public Price" or
                                    "Regular Price".
                                  </p>
                                  <p>
                                    If Provider only shows a net price on the
                                    agreement, and the tour or a comparable tour
                                    is not found anywhere on the internet, leave
                                    blank.
                                  </p>
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
                                  // setRecalc()
                                  const value = e.target.value || "";
                                  validationType.setFieldValue(
                                    "public_price",
                                    setDecimalFormat(value)
                                  );
                                  providerPricingCalc();
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
                          <div
                            className="form-outline mb-2"
                            id="provider_price"
                          >
                            <div className="d-flex justify-content-between">
                              <Label className="form-label">Est. Rate %</Label>
                              <div>
                                <i
                                  className="uil-question-circle font-size-15"
                                  id="estRateTooltip"
                                />
                                <Tooltip
                                  placement="right"
                                  isOpen={estRateTooltip}
                                  target="estRateTooltip"
                                  toggle={() => {
                                    setestRateTooltip(!estRateTooltip);
                                  }}
                                >
                                  The approximate commission rate that the
                                  Provider is offering based on the difference
                                  between the Public Price and Net Price.
                                  <br />
                                  This is just informational for us to
                                  understand if the Provider is giving us a good
                                  deal or not.
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
                                name="p_est_rate"
                                placeholder=""
                                type="text"
                                min="0"
                                step="any"
                                readOnly
                                onChange={validationType.handleChange}
                                // onBlur={(e) => {
                                //   const value = e.target.value || "";
                                //   validationType.setFieldValue(
                                //     "p_est_rate",
                                //     setDecimalFormat(value)
                                //   );
                                // }}
                                value={validationType.values.p_est_rate || ""}
                                invalid={
                                  validationType.touched.p_est_rate &&
                                  validationType.errors.p_est_rate
                                    ? true
                                    : false
                                }
                              />
                            </div>
                          </div>
                        </Col>
                        <Col className="col-2">
                          <div
                            className="form-outline mb-2"
                            id="provider_price"
                          >
                            <div className="d-flex justify-content-between">
                              <Label className="form-label">Est. Com.</Label>
                              <div>
                                <i
                                  className="uil-question-circle font-size-15"
                                  id="estComTooltip"
                                />
                                <Tooltip
                                  placement="right"
                                  isOpen={estComTooltip}
                                  target="estComTooltip"
                                  toggle={() => {
                                    setestComTooltip(!estComTooltip);
                                  }}
                                >
                                  The true amount of commission that the
                                  Provider is offering us. This is calculated as
                                  the difference between the Public Price and
                                  Net Price.
                                  <br />
                                  This is just informational for us to
                                  understand if the Provider is giving us a good
                                  deal or not.
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
                                name="p_est_commission"
                                placeholder=""
                                type="text"
                                min="0"
                                step="any"
                                readOnly
                                onChange={validationType.handleChange}
                                // onBlur={(e) => {
                                //   const value = e.target.value || "";
                                //   validationType.setFieldValue(
                                //     "p_est_commission",
                                //     setDecimalFormat(value)
                                //   );
                                // }}
                                value={
                                  validationType.values.p_est_commission || ""
                                }
                                invalid={
                                  validationType.touched.p_est_commission &&
                                  validationType.errors.p_est_commission
                                    ? true
                                    : false
                                }
                              />
                            </div>
                          </div>
                        </Col>
<Col className="col-2">
                          <div
                            className="form-outline mb-2"
                            id="provider_price"
                          >
                            <div className="d-flex justify-content-between">
                              <Label className="form-label">
                                Provider Site
                              </Label>
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
                                  The price the provider sells the tour for on
                                  their own website.
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
                                  providerPricingCalc();
                                }}
                                value={
                                  validationType.values.provider_price || ""
                                }
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
                        <div
                          onClick={() => setPriceBreakdown(!priceBrakedown)}
                          style={{ cursor: "pointer" }}
                          className="d-flex align-items-center mt-2"
                        >
                          <p>Price Breakdown</p>
                          {priceBrakedown ? (
                            <img
                              src={eyeIconSlash}
                              alt="Hide Price Breakdown"
                              style={{
                                width: "20px",
                                marginLeft: "10px",
                                marginTop: "-10px",
                              }}
                            />
                          ) : (
                            <img
                              src={eyeIcon}
                              alt="Show Price Breakdown"
                              style={{
                                width: "20px",
                                marginLeft: "10px",
                                marginTop: "-10px",
                              }}
                            />
                          )}
                        </div>

                        {priceBrakedown ? (
                          <>
                            <Col
                              className="col-2"
                              style={{ backgroundColor: "#FFEFDEBF" }}
                            >
                              <div
                                className="form-outline mb-2"
                                id="balance_due"
                              >
                                <div className="d-flex justify-content-between">
                                  <Label className="form-label">
                                    Before Tax
                                  </Label>
                                  <div>
                                    <i
                                      className="uil-question-circle font-size-15"
                                      id="baseTooltip"
                                    />
                                    <Tooltip
                                      placement="right"
                                      isOpen={baseTooltip}
                                      target="baseTooltip"
                                      toggle={() => {
                                        setbaseTooltip(!baseTooltip);
                                      }}
                                    >
                                      The base price of the product before taxes
                                      and gratuities are added on.
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
                                    name="p_base_amount"
                                    placeholder=""
                                    type="text"
                                    readOnly
                                    onChange={validationType.handleChange}
                                    // onBlur={(e) => {
                                    //   const value = e.target.value || "";
                                    //   validationType.setFieldValue(
                                    //     "p_base_amount",
                                    //     setDecimalFormat(value)
                                    //   );
                                    // }}
                                    value={
                                      validationType.values.p_base_amount || ""
                                    }
                                    invalid={
                                      validationType.touched.p_base_amount &&
                                      validationType.errors.p_base_amount
                                        ? true
                                        : false
                                    }
                                  />
                                  {validationType.touched.p_base_amount &&
                                  validationType.errors.p_base_amount ? (
                                    <FormFeedback type="invalid">
                                      {validationType.errors.p_base_amount}
                                    </FormFeedback>
                                  ) : null}
                                </div>
                              </div>
                            </Col>
                            <Col
                              className="col-2"
                              style={{ backgroundColor: "#FFEFDEBF" }}
                            >
                              <div
                                className="form-outline mb-2"
                                id="balance_due"
                              >
                                <div className="d-flex justify-content-between">
                                  <Label className="form-label">16% IVA</Label>
                                  <div>
                                    <i
                                      className="uil-question-circle font-size-15"
                                      id="ivaTooltip"
                                    />
                                    <Tooltip
                                      placement="right"
                                      isOpen={ivaTooltip}
                                      target="ivaTooltip"
                                      toggle={() => {
                                        setivaTooltip(!ivaTooltip);
                                      }}
                                    >
                                      The amount of IVA (VAT) that is due to the
                                      Mexican Government.
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
                                    name="p_iva"
                                    placeholder=""
                                    type="text"
                                    readOnly
                                    onChange={validationType.handleChange}
                                    // onBlur={(e) => {
                                    //   const value = e.target.value || "";
                                    //   validationType.setFieldValue(
                                    //     "p_iva",
                                    //     setDecimalFormat(value)
                                    //   );
                                    // }}
                                    value={validationType.values.p_iva || ""}
                                    invalid={
                                      validationType.touched.p_iva &&
                                      validationType.errors.p_iva
                                        ? true
                                        : false
                                    }
                                  />
                                  {validationType.touched.p_iva &&
                                  validationType.errors.p_iva ? (
                                    <FormFeedback type="invalid">
                                      {validationType.errors.p_iva}
                                    </FormFeedback>
                                  ) : null}
                                </div>
                              </div>
                            </Col>
                            <Col
                              className="col-2"
                              style={{ backgroundColor: "#FFEFDEBF" }}
                            >
                              <div
                                className="form-outline mb-2"
                                id="balance_due"
                              >
                                <div className="d-flex justify-content-between">
                                  <Label className="form-label text-paradiseOrange">
                                    Price w/ Tax
                                  </Label>
                                  <div>
                                    <i
                                      className="uil-question-circle font-size-15"
                                      id="totalPriceTooltip"
                                    />
                                    <Tooltip
                                      placement="right"
                                      isOpen={totalPriceTooltip}
                                      target="totalPriceTooltip"
                                      toggle={() => {
                                        settotalPriceTooltip(
                                          !totalPriceTooltip
                                        );
                                      }}
                                    >
                                      Net Price including Taxes not including
                                      Gratuity. This is the main price for
                                      comparison purposes.
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
                                    name="p_total_price"
                                    placeholder=""
                                    type="text"
                                    readOnly
                                    onChange={validationType.handleChange}
                                    // onBlur={(e) => {
                                    //   const value = e.target.value || "";
                                    //   validationType.setFieldValue(
                                    //     "p_total_price",
                                    //     setDecimalFormat(value)
                                    //   );
                                    // }}
                                    value={
                                      validationType.values.p_total_price || ""
                                    }
                                    invalid={
                                      validationType.touched.p_total_price &&
                                      validationType.errors.p_total_price
                                        ? true
                                        : false
                                    }
                                  />
                                  {validationType.touched.p_total_price &&
                                  validationType.errors.p_total_price ? (
                                    <FormFeedback type="invalid">
                                      {validationType.errors.p_total_price}
                                    </FormFeedback>
                                  ) : null}
                                </div>
                              </div>
                            </Col>
                            <Col
                              className="col-2"
                              style={{ backgroundColor: "#E9F4FFBF" }}
                            >
                              <div
                                className="form-outline mb-2"
                                id="balance_due"
                              >
                                <div className="d-flex justify-content-between">
                                  <Label className="form-label">Gratuity</Label>
                                  <div>
                                    <i
                                      className="uil-question-circle font-size-15"
                                      id="gratuityTooltip"
                                    />
                                    <Tooltip
                                      placement="right"
                                      isOpen={gratuityTooltip}
                                      target="gratuityTooltip"
                                      toggle={() => {
                                        setgratuityTooltip(!gratuityTooltip);
                                      }}
                                    >
                                      The amount of mandatory Gratuity that is
                                      required by the Provider to be collected.
                                      <br />
                                      <br />
                                      This is based on the Payment Settings. If
                                      "Unspecified" is chosen, then this field
                                      will be zero. Even though a gratuity is
                                      encouraged and expected, the Provider
                                      doesn't mandate what it is. The customer
                                      can decide on the day of the tour what
                                      gratuity they will give.
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
                                    name="p_gratuity"
                                    placeholder=""
                                    type="text"
                                    readOnly
                                    onChange={validationType.handleChange}
                                    // onBlur={(e) => {
                                    //   const value = e.target.value || "";
                                    //   validationType.setFieldValue(
                                    //     "p_gratuity",
                                    //     setDecimalFormat(value)
                                    //   );
                                    // }}
                                    value={
                                      validationType.values.p_gratuity || ""
                                    }
                                    invalid={
                                      validationType.touched.p_gratuity &&
                                      validationType.errors.p_gratuity
                                        ? true
                                        : false
                                    }
                                  />
                                  {validationType.touched.p_gratuity &&
                                  validationType.errors.p_gratuity ? (
                                    <FormFeedback type="invalid">
                                      {validationType.errors.p_gratuity}
                                    </FormFeedback>
                                  ) : null}
                                </div>
                              </div>
                            </Col>
                            <Col
                              className="col-2"
                              style={{ backgroundColor: "#E9F4FFBF" }}
                            >
                              <div
                                className="form-outline mb-2"
                                id="balance_due"
                              >
                                <div className="d-flex justify-content-between">
                                  <Label className="form-label">
                                    Total Price
                                  </Label>
                                  <div>
                                    <i
                                      className="uil-question-circle font-size-15"
                                      id="finalTotalTooltip"
                                    />
                                    <Tooltip
                                      placement="right"
                                      isOpen={finalTotalTooltip}
                                      target="finalTotalTooltip"
                                      toggle={() => {
                                        setfinalTotalTooltip(
                                          !finalTotalTooltip
                                        );
                                      }}
                                    >
                                      The total cost of the boat, including
                                      taxes and any mandatory Gratuity.
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
                                    name="p_final_total"
                                    placeholder=""
                                    type="text"
                                    readOnly
                                    onChange={validationType.handleChange}
                                    // onBlur={(e) => {
                                    //   const value = e.target.value || "";
                                    //   validationType.setFieldValue(
                                    //     "p_final_total",
                                    //     setDecimalFormat(value)
                                    //   );
                                    // }}
                                    value={
                                      validationType.values.p_final_total || ""
                                    }
                                    invalid={
                                      validationType.touched.p_final_total &&
                                      validationType.errors.p_final_total
                                        ? true
                                        : false
                                    }
                                  />
                                  {validationType.touched.p_final_total &&
                                  validationType.errors.p_final_total ? (
                                    <FormFeedback type="invalid">
                                      {validationType.errors.p_final_total}
                                    </FormFeedback>
                                  ) : null}
                                </div>
                              </div>
                            </Col>
                            <Col className="col-2">
                              <div
                                className="form-outline mb-2"
                                id="balance_due"
                              >
                                <div className="d-flex justify-content-between">
                                  <Label className="form-label">
                                    Invoice Amt
                                  </Label>
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
                                      The amount due to the provider on the
                                      invoice.
                                      <br />
                                      Our Deposit - Our Commission.
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
                                    name="net_price"
                                    placeholder=""
                                    type="text"
                                    readOnly
                                    onChange={validationType.handleChange}
                                    onBlur={(e) => {
                                      const value = e.target.value || "";
                                      validationType.setFieldValue(
                                        "net_price",
                                        setDecimalFormat(value)
                                      );
                                    }}
                                    value={
                                      validationType.values.net_price || ""
                                    }
                                    invalid={
                                      validationType.touched.net_price &&
                                      validationType.errors.net_price
                                        ? true
                                        : false
                                    }
                                  />
                                  {validationType.touched.net_price &&
                                  validationType.errors.net_price ? (
                                    <FormFeedback type="invalid">
                                      {validationType.errors.net_price}
                                    </FormFeedback>
                                  ) : null}
                                </div>
                              </div>
                            </Col>
                          </>
                        ) : null}
                      </>
                    ) : null}
                    {priceSheetSelected === "2" ? (
                      <>
                        <Col className="col-2">
                          <div className="form-outline mb-2" id="public_price">
                            <div className="d-flex justify-content-between">
                              <Label className="form-label">Est. Public</Label>
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
                                  <p>
                                    The price the provider refers to in our
                                    service agreement as the "Public Price" or
                                    "Regular Price".
                                  </p>
                                  <p>
                                    If Provider only shows a net price on the
                                    agreement, and the tour or a comparable tour
                                    is not found anywhere on the internet, leave
                                    blank.
                                  </p>
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
                                  providerPricingCalc();
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
                                  The commission rate for the tour that is
                                  specified in our service agreement. If only a
                                  Net Price is specified then leave blank.
                                </Tooltip>
                              </div>
                            </div>
                            <div className="input-group">
                              <Input
                                name="rate"
                                placeholder=""
                                onChange={validationType.handleChange}
                                onBlur={(e) => {
                                  setRecalc(true);
                                  const value = e.target.value || "";
                                  validationType.setFieldValue(
                                    "rate",
                                    setRateFormat(value)
                                  );
                                  providerPricingCalc();
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
                          <div className="form-outline mb-2" id="rate">
                            <div className="d-flex justify-content-between">
                              <Label className="form-label">Net Price</Label>
                              <div>
                                <i
                                  className="uil-question-circle font-size-15 "
                                  id="netPriceTooltip"
                                />
                                <Tooltip
                                  placement="right"
                                  isOpen={netPriceTooltip}
                                  target="netPriceTooltip"
                                  toggle={() => {
                                    setnetPriceTooltip(!netPriceTooltip);
                                  }}
                                >
                                  The Net Price shown on the Service Agreement.
                                  What it represents is specified on the Payment
                                  Settings tab.
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
                                readOnly
                                onChange={validationType.handleChange}
                                // onBlur={(e) => {
                                //   setRecalc(true);
                                //   const value = e.target.value || "";
                                //   validationType.setFieldValue(
                                //     "net_rate",
                                //     setRateFormat(value)
                                //   );
                                // }}
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
                                  The agreed commission based on the service
                                  agreement before any discounts are applied.
                                  This is automatically calculated based on the
                                  Net Price so no entry is required.
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
                                onChange={validationType.handleChange}
                                // onBlur={(e) => {
                                //   setRecalc(true);
                                //   const value = e.target.value || "";
                                //   validationType.setFieldValue(
                                //     "net_rate",
                                //     setRateFormat(value)
                                //   );
                                // }}
                                value={
                                  validationType.values.provider_commission ||
                                  ""
                                }
                                invalid={
                                  validationType.touched.provider_commission &&
                                  validationType.errors.provider_commission
                                    ? true
                                    : false
                                }
                              />
                            </div>
                          </div>
                        </Col>
                        <Col className="col-2">
                          <div
                            className="form-outline mb-2"
                            id="provider_price"
                          >
                            <div className="d-flex justify-content-between">
                              <Label className="form-label">
                                Provider Site
                              </Label>
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
                                  The price the provider sells the tour for on
                                  their own website.
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
                                  providerPricingCalc();
                                }}
                                value={
                                  validationType.values.provider_price || ""
                                }
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

                        <div
                          onClick={() => setPriceBreakdown(!priceBrakedown)}
                          style={{ cursor: "pointer" }}
                          className="d-flex align-items-center mt-2"
                        >
                          <p>Price Breakdown</p>
                          {priceBrakedown ? (
                            <img
                              src={eyeIconSlash}
                              alt="Hide Price Breakdown"
                              style={{
                                width: "20px",
                                marginLeft: "10px",
                                marginTop: "-10px",
                              }}
                            />
                          ) : (
                            <img
                              src={eyeIcon}
                              alt="Show Price Breakdown"
                              style={{
                                width: "20px",
                                marginLeft: "10px",
                                marginTop: "-10px",
                              }}
                            />
                          )}
                        </div>

                        {priceBrakedown ? (
                          <>
                            <Col
                              className="col-2"
                              style={{ backgroundColor: "#FFEFDEBF" }}
                            >
                              <div
                                className="form-outline mb-2"
                                id="balance_due"
                              >
                                <div className="d-flex justify-content-between">
                                  <Label className="form-label">
                                    Before Tax
                                  </Label>
                                  <div>
                                    <i
                                      className="uil-question-circle font-size-15"
                                      id="baseTooltip"
                                    />
                                    <Tooltip
                                      placement="right"
                                      isOpen={baseTooltip}
                                      target="baseTooltip"
                                      toggle={() => {
                                        setbaseTooltip(!baseTooltip);
                                      }}
                                    >
                                      The base price of the product before taxes
                                      and gratuities are added on.
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
                                    name="p_base_amount"
                                    placeholder=""
                                    type="text"
                                    readOnly
                                    onChange={validationType.handleChange}
                                    // onBlur={(e) => {
                                    //   const value = e.target.value || "";
                                    //   validationType.setFieldValue(
                                    //     "p_base_amount",
                                    //     setDecimalFormat(value)
                                    //   );
                                    // }}
                                    value={
                                      validationType.values.p_base_amount || ""
                                    }
                                    invalid={
                                      validationType.touched.p_base_amount &&
                                      validationType.errors.p_base_amount
                                        ? true
                                        : false
                                    }
                                  />
                                  {validationType.touched.p_base_amount &&
                                  validationType.errors.p_base_amount ? (
                                    <FormFeedback type="invalid">
                                      {validationType.errors.p_base_amount}
                                    </FormFeedback>
                                  ) : null}
                                </div>
                              </div>
                            </Col>
                            <Col
                              className="col-2"
                              style={{ backgroundColor: "#FFEFDEBF" }}
                            >
                              <div
                                className="form-outline mb-2"
                                id="balance_due"
                              >
                                <div className="d-flex justify-content-between">
                                  <Label className="form-label">16% IVA</Label>
                                  <div>
                                    <i
                                      className="uil-question-circle font-size-15"
                                      id="ivaTooltip"
                                    />
                                    <Tooltip
                                      placement="right"
                                      isOpen={ivaTooltip}
                                      target="ivaTooltip"
                                      toggle={() => {
                                        setivaTooltip(!ivaTooltip);
                                      }}
                                    >
                                      The amount of IVA (VAT) that is due to the
                                      Mexican Government.
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
                                    name="p_iva"
                                    placeholder=""
                                    type="text"
                                    readOnly
                                    onChange={validationType.handleChange}
                                    // onBlur={(e) => {
                                    //   const value = e.target.value || "";
                                    //   validationType.setFieldValue(
                                    //     "p_iva",
                                    //     setDecimalFormat(value)
                                    //   );
                                    // }}
                                    value={validationType.values.p_iva || ""}
                                    invalid={
                                      validationType.touched.p_iva &&
                                      validationType.errors.p_iva
                                        ? true
                                        : false
                                    }
                                  />
                                  {validationType.touched.p_iva &&
                                  validationType.errors.p_iva ? (
                                    <FormFeedback type="invalid">
                                      {validationType.errors.p_iva}
                                    </FormFeedback>
                                  ) : null}
                                </div>
                              </div>
                            </Col>
                            <Col
                              className="col-2"
                              style={{ backgroundColor: "#FFEFDEBF" }}
                            >
                              <div
                                className="form-outline mb-2"
                                id="balance_due"
                              >
                                <div className="d-flex justify-content-between">
                                  <Label className="form-label text-paradiseOrange">
                                    Price w/Tax
                                  </Label>
                                  <div>
                                    <i
                                      className="uil-question-circle font-size-15"
                                      id="totalPriceTooltip"
                                    />
                                    <Tooltip
                                      placement="right"
                                      isOpen={totalPriceTooltip}
                                      target="totalPriceTooltip"
                                      toggle={() => {
                                        settotalPriceTooltip(
                                          !totalPriceTooltip
                                        );
                                      }}
                                    >
                                      Net Price including Taxes not including
                                      Gratuity. This is the main price for
                                      comparison purposes.
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
                                    name="p_total_price"
                                    placeholder=""
                                    type="text"
                                    readOnly
                                    onChange={validationType.handleChange}
                                    // onBlur={(e) => {
                                    //   const value = e.target.value || "";
                                    //   validationType.setFieldValue(
                                    //     "p_total_price",
                                    //     setDecimalFormat(value)
                                    //   );
                                    // }}
                                    value={
                                      validationType.values.p_total_price || ""
                                    }
                                    invalid={
                                      validationType.touched.p_total_price &&
                                      validationType.errors.p_total_price
                                        ? true
                                        : false
                                    }
                                  />
                                  {validationType.touched.p_total_price &&
                                  validationType.errors.p_total_price ? (
                                    <FormFeedback type="invalid">
                                      {validationType.errors.p_total_price}
                                    </FormFeedback>
                                  ) : null}
                                </div>
                              </div>
                            </Col>
                            <Col
                              className="col-2"
                              style={{ backgroundColor: "#E9F4FFBF" }}
                            >
                              <div
                                className="form-outline mb-2"
                                id="balance_due"
                              >
                                <div className="d-flex justify-content-between">
                                  <Label className="form-label">Gratuity</Label>
                                  <div>
                                    <i
                                      className="uil-question-circle font-size-15"
                                      id="gratuityTooltip"
                                    />
                                    <Tooltip
                                      placement="right"
                                      isOpen={gratuityTooltip}
                                      target="gratuityTooltip"
                                      toggle={() => {
                                        setgratuityTooltip(!gratuityTooltip);
                                      }}
                                    >
                                      The amount of mandatory Gratuity that is
                                      required by the Provider to be collected.
                                      <br />
                                      <br />
                                      This is based on the Payment Settings. If
                                      "Unspecified" is chosen, then this field
                                      will be zero. Even though a gratuity is
                                      encouraged and expected, the Provider
                                      doesn't mandate what it is. The customer
                                      can decide on the day of the tour what
                                      gratuity they will give.
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
                                    name="p_gratuity"
                                    placeholder=""
                                    type="text"
                                    readOnly
                                    onChange={validationType.handleChange}
                                    // onBlur={(e) => {
                                    //   const value = e.target.value || "";
                                    //   validationType.setFieldValue(
                                    //     "p_gratuity",
                                    //     setDecimalFormat(value)
                                    //   );
                                    // }}
                                    value={
                                      validationType.values.p_gratuity || ""
                                    }
                                    invalid={
                                      validationType.touched.p_gratuity &&
                                      validationType.errors.p_gratuity
                                        ? true
                                        : false
                                    }
                                  />
                                  {validationType.touched.p_gratuity &&
                                  validationType.errors.p_gratuity ? (
                                    <FormFeedback type="invalid">
                                      {validationType.errors.p_gratuity}
                                    </FormFeedback>
                                  ) : null}
                                </div>
                              </div>
                            </Col>
                            <Col
                              className="col-2"
                              style={{ backgroundColor: "#E9F4FFBF" }}
                            >
                              <div
                                className="form-outline mb-2"
                                id="balance_due"
                              >
                                <div className="d-flex justify-content-between">
                                  <Label className="form-label">
                                    Total Price
                                  </Label>
                                  <div>
                                    <i
                                      className="uil-question-circle font-size-15"
                                      id="finalTotalTooltip"
                                    />
                                    <Tooltip
                                      placement="right"
                                      isOpen={finalTotalTooltip}
                                      target="finalTotalTooltip"
                                      toggle={() => {
                                        setfinalTotalTooltip(
                                          !finalTotalTooltip
                                        );
                                      }}
                                    >
                                      The total cost of the boat, including
                                      taxes and any mandatory Gratuity.
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
                                    name="p_final_total"
                                    placeholder=""
                                    type="text"
                                    readOnly
                                    onChange={validationType.handleChange}
                                    // onBlur={(e) => {
                                    //   const value = e.target.value || "";
                                    //   validationType.setFieldValue(
                                    //     "p_final_total",
                                    //     setDecimalFormat(value)
                                    //   );
                                    // }}
                                    value={
                                      validationType.values.p_final_total || ""
                                    }
                                    invalid={
                                      validationType.touched.p_final_total &&
                                      validationType.errors.p_final_total
                                        ? true
                                        : false
                                    }
                                  />
                                  {validationType.touched.p_final_total &&
                                  validationType.errors.p_final_total ? (
                                    <FormFeedback type="invalid">
                                      {validationType.errors.p_final_total}
                                    </FormFeedback>
                                  ) : null}
                                </div>
                              </div>
                            </Col>
                            <Col className="col-2">
                              <div
                                className="form-outline mb-2"
                                id="balance_due"
                              >
                                <div className="d-flex justify-content-between">
                                  <Label className="form-label">
                                    Invoice Amt
                                  </Label>
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
                                      The amount due to the provider on the
                                      invoice.
                                      <br />
                                      Our Deposit - Our Commission.
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
                                    name="net_price_percentage"
                                    placeholder=""
                                    type="text"
                                    readOnly
                                    onChange={validationType.handleChange}
                                    // onBlur={(e) => {
                                    //   const value = e.target.value || "";
                                    //   validationType.setFieldValue(
                                    //     "net_price_percentage",
                                    //     setDecimalFormat(value)
                                    //   );
                                    // }}
                                    value={
                                      validationType.values
                                        .net_price_percentage || ""
                                    }
                                    invalid={
                                      validationType.touched
                                        .net_price_percentage &&
                                      validationType.errors.net_price_percentage
                                        ? true
                                        : false
                                    }
                                  />
                                  {validationType.touched
                                    .net_price_percentage &&
                                  validationType.errors.net_price_percentage ? (
                                    <FormFeedback type="invalid">
                                      {
                                        validationType.errors
                                          .net_price_percentage
                                      }
                                    </FormFeedback>
                                  ) : null}
                                </div>
                              </div>
                            </Col>
                          </>
                        ) : null}
                      </>
                    ) : null}
                    {priceSheetSelected === "3" ? (
                      <>
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
                                  <p>
                                    The price the provider refers to in our
                                    service agreement as the "Public Price" or
                                    "Regular Price".
                                  </p>
                                  <p>
                                    If Provider only shows a net price on the
                                    agreement, and the tour or a comparable tour
                                    is not found anywhere on the internet, leave
                                    blank.
                                  </p>
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
                                  providerPricingCalc();
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
                                  The agreed commission based on the service
                                  agreement before any discounts are applied.
                                  This is automatically calculated based on the
                                  Net Price so no entry is required.
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
                                name="p_commission"
                                placeholder=""
                                type="text"
                                onChange={validationType.handleChange}
                                value={validationType.values.p_commission || ""}
                                onBlur={(e) => {
                                  const value = e.target.value || "";
                                  validationType.setFieldValue(
                                    "p_commission",
                                    setDecimalFormat(value)
                                  );
                                  providerPricingCalc();
                                }}
                                invalid={
                                  validationType.touched.p_commission &&
                                  validationType.errors.p_commission
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
                              <Label className="form-label">Net Price</Label>
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
                                  The Net Price shown on the Service Agreement.
                                  What it represents is specified on the Payment
                                  Settings tab.
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
                                readOnly
                                onChange={validationType.handleChange}
                                // onBlur={(e) => {
                                //   setRecalc(true);
                                //   const value = e.target.value || "";
                                //   validationType.setFieldValue(
                                //     "net_rate",
                                //     setRateFormat(value)
                                //   );
                                // }}
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
                          <div
                            className="form-outline mb-2"
                            id="provider_price"
                          >
                            <div className="d-flex justify-content-between">
                              <Label className="form-label">Est. Rate %</Label>
                              <div>
                                <i
                                  className="uil-question-circle font-size-15"
                                  id="estRateTooltip"
                                />
                                <Tooltip
                                  placement="right"
                                  isOpen={estRateTooltip}
                                  target="estRateTooltip"
                                  toggle={() => {
                                    setestRateTooltip(!estRateTooltip);
                                  }}
                                >
                                  The approximate commission rate that the
                                  Provider is offering based on the difference
                                  between the Public Price and Net Price. This
                                  is just informational for us to understand if
                                  the Provider is giving us a good deal or not.
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
                                name="p_est_rate"
                                placeholder=""
                                type="text"
                                min="0"
                                step="any"
                                readOnly
                                onChange={validationType.handleChange}
                                // onBlur={(e) => {
                                //   const value = e.target.value || "";
                                //   validationType.setFieldValue(
                                //     "p_est_rate",
                                //     setDecimalFormat(value)
                                //   );
                                // }}
                                value={validationType.values.p_est_rate || ""}
                                invalid={
                                  validationType.touched.p_est_rate &&
                                  validationType.errors.p_est_rate
                                    ? true
                                    : false
                                }
                              />
                            </div>
                          </div>
                        </Col>
                        <Col className="col-2">
                          <div
                            className="form-outline mb-2"
                            id="provider_price"
                          >
                            <div className="d-flex justify-content-between">
                              <Label className="form-label">
                                Provider Site
                              </Label>
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
                                  The price the provider sells the tour for on
                                  their own website.
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
                                  providerPricingCalc();
                                }}
                                value={
                                  validationType.values.provider_price || ""
                                }
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

                        <div
                          onClick={() => setPriceBreakdown(!priceBrakedown)}
                          style={{ cursor: "pointer" }}
                          className="d-flex align-items-center mt-2"
                        >
                          <p>Price Breakdown</p>
                          {priceBrakedown ? (
                            <img
                              src={eyeIconSlash}
                              alt="Hide Price Breakdown"
                              style={{
                                width: "20px",
                                marginLeft: "10px",
                                marginTop: "-10px",
                              }}
                            />
                          ) : (
                            <img
                              src={eyeIcon}
                              alt="Show Price Breakdown"
                              style={{
                                width: "20px",
                                marginLeft: "10px",
                                marginTop: "-10px",
                              }}
                            />
                          )}
                        </div>

                        {priceBrakedown ? (
                          <>
                            <Col
                              className="col-2"
                              style={{ backgroundColor: "#FFEFDEBF" }}
                            >
                              <div
                                className="form-outline mb-2"
                                id="balance_due"
                              >
                                <div className="d-flex justify-content-between">
                                  <Label className="form-label">
                                    Before Tax
                                  </Label>
                                  <div>
                                    <i
                                      className="uil-question-circle font-size-15"
                                      id="baseTooltip"
                                    />
                                    <Tooltip
                                      placement="right"
                                      isOpen={baseTooltip}
                                      target="baseTooltip"
                                      toggle={() => {
                                        setbaseTooltip(!baseTooltip);
                                      }}
                                    >
                                      The base price of the product before taxes
                                      and gratuities are added on.
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
                                    name="p_base_amount"
                                    placeholder=""
                                    type="text"
                                    readOnly
                                    onChange={validationType.handleChange}
                                    // onBlur={(e) => {
                                    //   const value = e.target.value || "";
                                    //   validationType.setFieldValue(
                                    //     "p_base_amount",
                                    //     setDecimalFormat(value)
                                    //   );
                                    // }}
                                    value={
                                      validationType.values.p_base_amount || ""
                                    }
                                    invalid={
                                      validationType.touched.p_base_amount &&
                                      validationType.errors.p_base_amount
                                        ? true
                                        : false
                                    }
                                  />
                                  {validationType.touched.p_base_amount &&
                                  validationType.errors.p_base_amount ? (
                                    <FormFeedback type="invalid">
                                      {validationType.errors.p_base_amount}
                                    </FormFeedback>
                                  ) : null}
                                </div>
                              </div>
                            </Col>
                            <Col
                              className="col-2"
                              style={{ backgroundColor: "#FFEFDEBF" }}
                            >
                              <div
                                className="form-outline mb-2"
                                id="balance_due"
                              >
                                <div className="d-flex justify-content-between">
                                  <Label className="form-label">16% IVA</Label>
                                  <div>
                                    <i
                                      className="uil-question-circle font-size-15"
                                      id="ivaTooltip"
                                    />
                                    <Tooltip
                                      placement="right"
                                      isOpen={ivaTooltip}
                                      target="ivaTooltip"
                                      toggle={() => {
                                        setivaTooltip(!ivaTooltip);
                                      }}
                                    >
                                      The amount of IVA (VAT) that is due to the
                                      Mexican Government.
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
                                    name="p_iva"
                                    placeholder=""
                                    type="text"
                                    readOnly
                                    onChange={validationType.handleChange}
                                    // onBlur={(e) => {
                                    //   const value = e.target.value || "";
                                    //   validationType.setFieldValue(
                                    //     "p_iva",
                                    //     setDecimalFormat(value)
                                    //   );
                                    // }}
                                    value={validationType.values.p_iva || ""}
                                    invalid={
                                      validationType.touched.p_iva &&
                                      validationType.errors.p_iva
                                        ? true
                                        : false
                                    }
                                  />
                                  {validationType.touched.p_iva &&
                                  validationType.errors.p_iva ? (
                                    <FormFeedback type="invalid">
                                      {validationType.errors.p_iva}
                                    </FormFeedback>
                                  ) : null}
                                </div>
                              </div>
                            </Col>
                            <Col
                              className="col-2"
                              style={{ backgroundColor: "#FFEFDEBF" }}
                            >
                              <div
                                className="form-outline mb-2"
                                id="balance_due"
                              >
                                <div className="d-flex justify-content-between">
                                  <Label className="form-label text-paradiseOrange">
                                    Price w/Tax
                                  </Label>
                                  <div>
                                    <i
                                      className="uil-question-circle font-size-15"
                                      id="totalPriceTooltip"
                                    />
                                    <Tooltip
                                      placement="right"
                                      isOpen={totalPriceTooltip}
                                      target="totalPriceTooltip"
                                      toggle={() => {
                                        settotalPriceTooltip(
                                          !totalPriceTooltip
                                        );
                                      }}
                                    >
                                      Net Price including Taxes not including
                                      Gratuity. This is the main price for
                                      comparison purposes.
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
                                    name="p_total_price"
                                    placeholder=""
                                    type="text"
                                    readOnly
                                    onChange={validationType.handleChange}
                                    // onBlur={(e) => {
                                    //   const value = e.target.value || "";
                                    //   validationType.setFieldValue(
                                    //     "p_total_price",
                                    //     setDecimalFormat(value)
                                    //   );
                                    // }}
                                    value={
                                      validationType.values.p_total_price || ""
                                    }
                                    invalid={
                                      validationType.touched.p_total_price &&
                                      validationType.errors.p_total_price
                                        ? true
                                        : false
                                    }
                                  />
                                  {validationType.touched.p_total_price &&
                                  validationType.errors.p_total_price ? (
                                    <FormFeedback type="invalid">
                                      {validationType.errors.p_total_price}
                                    </FormFeedback>
                                  ) : null}
                                </div>
                              </div>
                            </Col>
                            <Col
                              className="col-2 "
                              style={{ backgroundColor: "#E9F4FFBF" }}
                            >
                              <div
                                className="form-outline mb-2"
                                id="balance_due"
                              >
                                <div className="d-flex justify-content-between">
                                  <Label className="form-label">Gratuity</Label>
                                  <div>
                                    <i
                                      className="uil-question-circle font-size-15"
                                      id="gratuityTooltip"
                                    />
                                    <Tooltip
                                      placement="right"
                                      isOpen={gratuityTooltip}
                                      target="gratuityTooltip"
                                      toggle={() => {
                                        setgratuityTooltip(!gratuityTooltip);
                                      }}
                                    >
                                      The amount of mandatory Gratuity that is
                                      required by the Provider to be collected.
                                      <br />
                                      <br />
                                      This is based on the Payment Settings. If
                                      "Unspecified" is chosen, then this field
                                      will be zero. Even though a gratuity is
                                      encouraged and expected, the Provider
                                      doesn't mandate what it is. The customer
                                      can decide on the day of the tour what
                                      gratuity they will give.
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
                                    name="p_gratuity"
                                    placeholder=""
                                    type="text"
                                    readOnly
                                    onChange={validationType.handleChange}
                                    // onBlur={(e) => {
                                    //   const value = e.target.value || "";
                                    //   validationType.setFieldValue(
                                    //     "p_gratuity",
                                    //     setDecimalFormat(value)
                                    //   );
                                    // }}
                                    value={
                                      validationType.values.p_gratuity || ""
                                    }
                                    invalid={
                                      validationType.touched.p_gratuity &&
                                      validationType.errors.p_gratuity
                                        ? true
                                        : false
                                    }
                                  />
                                  {validationType.touched.p_gratuity &&
                                  validationType.errors.p_gratuity ? (
                                    <FormFeedback type="invalid">
                                      {validationType.errors.p_gratuity}
                                    </FormFeedback>
                                  ) : null}
                                </div>
                              </div>
                            </Col>
                            <Col
                              className="col-2"
                              style={{ backgroundColor: "#E9F4FFBF" }}
                            >
                              <div
                                className="form-outline mb-2"
                                id="balance_due"
                              >
                                <div className="d-flex justify-content-between">
                                  <Label className="form-label">
                                    Total Price
                                  </Label>
                                  <div>
                                    <i
                                      className="uil-question-circle font-size-15"
                                      id="finalTotalTooltip"
                                    />
                                    <Tooltip
                                      placement="right"
                                      isOpen={finalTotalTooltip}
                                      target="finalTotalTooltip"
                                      toggle={() => {
                                        setfinalTotalTooltip(
                                          !finalTotalTooltip
                                        );
                                      }}
                                    >
                                      The total cost of the boat, including
                                      taxes and any mandatory Gratuity.
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
                                    name="p_final_total"
                                    placeholder=""
                                    type="text"
                                    readOnly
                                    onChange={validationType.handleChange}
                                    // onBlur={(e) => {
                                    //   const value = e.target.value || "";
                                    //   validationType.setFieldValue(
                                    //     "p_final_total",
                                    //     setDecimalFormat(value)
                                    //   );
                                    // }}
                                    value={
                                      validationType.values.p_final_total || ""
                                    }
                                    invalid={
                                      validationType.touched.p_final_total &&
                                      validationType.errors.p_final_total
                                        ? true
                                        : false
                                    }
                                  />
                                  {validationType.touched.p_final_total &&
                                  validationType.errors.p_final_total ? (
                                    <FormFeedback type="invalid">
                                      {validationType.errors.p_final_total}
                                    </FormFeedback>
                                  ) : null}
                                </div>
                              </div>
                            </Col>
                            <Col className="col-2">
                              <div
                                className="form-outline mb-2"
                                id="balance_due"
                              >
                                <div className="d-flex justify-content-between">
                                  <Label className="form-label">
                                    Invoice Amt
                                  </Label>
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
                                      The amount due to the provider on the
                                      invoice.
                                      <br />
                                      Our Deposit - Our Commission.
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
                                    name="net_price_fixed"
                                    placeholder=""
                                    type="text"
                                    readOnly
                                    onChange={validationType.handleChange}
                                    // onBlur={(e) => {
                                    //   const value = e.target.value || "";
                                    //   validationType.setFieldValue(
                                    //     "net_price_fixed",
                                    //     setDecimalFormat(value)
                                    //   );
                                    // }}
                                    value={
                                      validationType.values.net_price_fixed ||
                                      ""
                                    }
                                    invalid={
                                      validationType.touched.net_price_fixed &&
                                      validationType.errors.net_price_fixed
                                        ? true
                                        : false
                                    }
                                  />
                                  {validationType.touched.net_price_fixed &&
                                  validationType.errors.net_price_fixed ? (
                                    <FormFeedback type="invalid">
                                      {validationType.errors.net_price_fixed}
                                    </FormFeedback>
                                  ) : null}
                                </div>
                              </div>
                            </Col>
                          </>
                        ) : null}
                      </>
                    ) : null}
                  </Row>
                ) : null}

                <Col
                  className="col-12 p-1 my-2  d-flex justify-content-between"
                  style={{ backgroundColor: "#FFFBC8", cursor: "pointer" }}
                  onClick={() => setOurPricingTab(!ourPricingTab)}
                >
                  <div className="d-flex">
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
                    <div className="m-2">
                      <i
                        className="uil-question-circle font-size-15"
                        id="ourPricingTooltip"
                      />
                      <Tooltip
                        placement="right"
                        isOpen={ourPricingHeaderTooltip}
                        style={{ textAlign: "left" }}
                        target="ourPricingTooltip"
                        toggle={() => {
                          setOurPricingHeaderTooltip(!ourPricingHeaderTooltip);
                        }}
                      >
                        The price we will sell the boat for. This price will be
                        based on the settings in the Payment Settings.
                      </Tooltip>
                    </div>
                  </div>
                  {ourPricingTab ? (
                    <div
                      className="m-2"
                      style={{ cursor: "pointer" }}
                      onClick={() => setOurPricingTab(!ourPricingTab)}
                    >
                      <IoIosArrowDown size={30} />
                    </div>
                  ) : (
                    <div
                      className="m-2"
                      style={{ cursor: "pointer" }}
                      onClick={() => setOurPricingTab(!ourPricingTab)}
                    >
                      <IoIosArrowForward size={30} />
                    </div>
                  )}
                </Col>
                {ourPricingTab ? (
                  <>
                    <Row className="d-flex">
                      <Col className="col-2">
                        <div className="form-outline mb-2" id="ourPrice">
                          <div className="d-flex justify-content-between">
                            <Label className="form-label">Our Price</Label>
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
                                // setRecalc(true);
                                const value = e.target.value || "";
                                validationType.setFieldValue(
                                  "our_price",
                                  setDecimalFormat(value)
                                );
                                providerPricingCalc();
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
                            <Label className="form-label">Commission</Label>
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
                                <p>
                                  The $$ amount we earn from the sale after
                                  discount.
                                </p>
                                Calculated automatically:
                                <br />
                                Our Price - Net Price = Commission.
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
                                <p>
                                  After discounting the tour, what our effective
                                  commission rate is (what we have left after
                                  the discount). This is calculated based on
                                  (Commission / Our Price = Eff. Rate).
                                </p>
                                If there is no public price specified, then it
                                is calculated based on (Commission / (Net Price
                                + Commission))
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
                              // onBlur={(e) => {
                              //   const value = e.target.value || "";
                              //   validationType.setFieldValue(
                              //     "eff_rate",
                              //     setRateFormat(value)
                              //   );
                              // }}
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
                            <Label className="form-label">Deposit</Label>
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
                                <p>
                                  The amount we collect at the time of booking.
                                  This is calculated based on the option chosen
                                  in "Collect" above.
                                </p>
                                If "Deposit" is the Collect type then you will
                                type in the amount of Deposit you will collect.
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
                              readOnly={+priceCollectSelected !== 1}
                              type="text"
                              onChange={validationType.handleChange}
                              onBlur={(e) => {
                                const value = e.target.value || "";
                                validationType.setFieldValue(
                                  "deposit",
                                  setDecimalFormat(value)
                                );
                                providerPricingCalc();
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
                        <div
                          className="form-outline mb-2"
                          id="voucher_currency"
                        >
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
                                Choose the currency that the Balance Due on the
                                confirmation voucher will be shown in (USD or
                                MXN Pesos).
                              </Tooltip>
                            </div>
                          </div>
                          <div className="input-group">
                            <Input
                              type="select"
                              name="currency"
                              onChange={(e) => {
                                setCurrencySelected(e.target.value);
                              }}
                              // onBlur={validationType.handleBlur}
                              //   value={validationType.values.department || ""}
                            >
                              <option value="-1">Select....</option>
                              {map(currency, (curr, index) => {
                                return (
                                  <option
                                    key={index}
                                    value={curr.currency_id}
                                    selected={
                                      dataEdit && dataEdit.voucher_currency
                                        ? curr.currency_id ===
                                          dataEdit.voucher_currency
                                        : curr.currency_id === "USD $" ||
                                          curr.currency_id === "USD"
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
                            <Label
                              style={{ fontSize: "13px" }}
                              className="form-label"
                            >
                              Voucher Balance
                            </Label>
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
                                The Balance Due shown on the confirmation
                                voucher sent to the client, in either USD or MXN
                                Pesos, depending on the currency selected. If
                                USD is chosen then this is automatically
                                calculated based on (Our Price - Deposit =
                                Voucher Balance). If MXN is chosen then manually
                                enter the amount in pesos that the customer will
                                pay at check-in on the day of the tour.
                              </Tooltip>
                            </div>
                          </div>
                          <div className="input-group">
                            <Input
                              name="voucher_balance"
                              placeholder=""
                              type="text"
                              readOnly={
                                currencySelected !== "MXN $" &&
                                currencySelected !== "MXN"
                              }
                              onChange={validationType.handleChange}
                              // onBlur={(e) => {
                              //   const value = e.target.value || "";
                              //   validationType.setFieldValue(
                              //     "voucher_balance",
                              //     setDecimalFormatVBalance(
                              //       value,
                              //       currencySelected
                              //     )
                              //   );
                              // }}
                              value={
                                validationType.values.voucher_balance || ""
                              }
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
                        <div className="form-outline mb-2" id="">
                          <div className="d-flex justify-content-between">
                            <Label className="form-label">Before Tax</Label>
                            <div>
                              <i
                                className="uil-question-circle font-size-15"
                                id="baseTooltipOP"
                              />
                              <Tooltip
                                placement="right"
                                isOpen={baseTooltipOP}
                                target="baseTooltipOP"
                                toggle={() => {
                                  setbaseTooltipOP(!baseTooltipOP);
                                }}
                              >
                                The base price of the product before taxes and
                                gratuities are added on.
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
                              name="t_base_amount"
                              placeholder=""
                              type="text"
                              min="0"
                              step="any"
                              disabled
                              onChange={validationType.handleChange}
                              // onBlur={(e) => {
                              //   setRecalc(true);
                              //   const value = e.target.value || "";
                              //   validationType.setFieldValue(
                              //     "t_base_amount",
                              //     setDecimalFormat(value)
                              //   );
                              // }}
                              value={validationType.values.t_base_amount || ""}
                              invalid={
                                validationType.touched.t_base_amount &&
                                validationType.errors.t_base_amount
                                  ? true
                                  : false
                              }
                            />
                            {validationType.touched.t_base_amount &&
                            validationType.errors.t_base_amount ? (
                              <FormFeedback type="invalid">
                                {validationType.errors.t_base_amount}
                              </FormFeedback>
                            ) : null}
                          </div>
                        </div>
                      </Col>
                      <Col className="col-2">
                        <div className="form-outline mb-2" id="commission">
                          <div className="d-flex justify-content-between">
                            <Label className="form-label">16% IVA</Label>
                            <div>
                              <i
                                className="uil-question-circle font-size-15"
                                id="ivaTooltipOP"
                              />
                              <Tooltip
                                placement="right"
                                isOpen={ivaTooltipOP}
                                target="ivaTooltipOP"
                                toggle={() => {
                                  setivaTooltipOP(!ivaTooltipOP);
                                }}
                              >
                                The amount of IVA (VAT) that is due to the
                                Mexican Government.
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
                              name="t_iva"
                              placeholder=""
                              readOnly
                              type="text"
                              value={validationType.values.t_iva || ""}
                            />
                          </div>
                        </div>
                      </Col>
                      <Col className="col-2">
                        <div className="form-outline mb-2" id="eff_rate">
                          <div className="d-flex justify-content-between">
                            <Label className="form-label text-paradiseOrange">
                              Price w/Tax
                            </Label>
                            <div>
                              <i
                                className="uil-question-circle font-size-15"
                                id="totalPriceTooltipOP"
                              />
                              <Tooltip
                                placement="right"
                                isOpen={totalPriceTooltipOP}
                                target="totalPriceTooltipOP"
                                toggle={() => {
                                  settotalPriceTooltipOP(!totalPriceTooltipOP);
                                }}
                              >
                                It should back calculate Our Price if it is
                                entered in. If Our Price is entered in, then it
                                will calculate the Total Price.
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
                              name="t_total_price"
                              placeholder=""
                              type="text"
                              disabled={true}
                              onChange={validationType.handleChange}
                              // onBlur={(e) => {
                              //   const value = e.target.value || "";
                              //   validationType.setFieldValue(
                              //     "t_total_price",
                              //     setRateFormat(value)
                              //   );
                              // }}
                              value={validationType.values.t_total_price || ""}
                              invalid={
                                validationType.touched.t_total_price &&
                                validationType.errors.t_total_price
                                  ? true
                                  : false
                              }
                            />
                            {validationType.touched.t_total_price &&
                            validationType.errors.t_total_price ? (
                              <FormFeedback type="invalid">
                                {validationType.errors.t_total_price}
                              </FormFeedback>
                            ) : null}
                          </div>
                        </div>
                      </Col>
                      <Col className="col-2">
                        <div className="form-outline mb-2" id="deposit">
                          <div className="d-flex justify-content-between">
                            <Label className="form-label">Gratuity</Label>
                            <div>
                              <i
                                className="uil-question-circle font-size-15"
                                id="gratuityTooltipOP"
                              />
                              <Tooltip
                                placement="right"
                                isOpen={gratuityTooltipOP}
                                target="gratuityTooltipOP"
                                toggle={() => {
                                  setgratuityTooltipOP(!gratuityTooltipOP);
                                }}
                              >
                                The amount of mandatory Gratuity that is
                                required by the Provider to be collected.
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
                              name="t_gratuity"
                              placeholder=""
                              readOnly={+priceCollectSelected !== 1}
                              type="text"
                              onChange={validationType.handleChange}
                              // onBlur={(e) => {
                              //   const value = e.target.value || "";
                              //   validationType.setFieldValue(
                              //     "t_gratuity",
                              //     setDecimalFormat(value)
                              //   );
                              // }}
                              value={validationType.values.t_gratuity || ""}
                              invalid={
                                validationType.touched.t_gratuity &&
                                validationType.errors.t_gratuity
                                  ? true
                                  : false
                              }
                            />
                            {validationType.touched.t_gratuity &&
                            validationType.errors.t_gratuity ? (
                              <FormFeedback type="invalid">
                                {validationType.errors.t_gratuity}
                              </FormFeedback>
                            ) : null}
                          </div>
                        </div>
                      </Col>
                      <Col className="col-2">
                        <div className="form-outline mb-2" id="deposit">
                          <div className="d-flex justify-content-between">
                            <Label className="form-label">Total Price </Label>
                            <div>
                              <i
                                className="uil-question-circle font-size-15"
                                id="finalTotalTooltipOP"
                              />
                              <Tooltip
                                placement="right"
                                isOpen={finalTotalTooltipOP}
                                target="finalTotalTooltipOP"
                                toggle={() => {
                                  setfinalTotalTooltipOP(!finalTotalTooltipOP);
                                }}
                              >
                                The total cost of the boat, including taxes and
                                any mandatory Gratuity.
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
                              name="t_final_total"
                              placeholder=""
                              readOnly={+priceCollectSelected !== 1}
                              type="text"
                              onChange={validationType.handleChange}
                              // onBlur={(e) => {
                              //   const value = e.target.value || "";
                              //   validationType.setFieldValue(
                              //     "t_final_total",
                              //     setDecimalFormat(value)
                              //   );
                              // }}
                              value={validationType.values.t_final_total || ""}
                              invalid={
                                validationType.touched.t_final_total &&
                                validationType.errors.t_final_total
                                  ? true
                                  : false
                              }
                            />
                            {validationType.touched.t_final_total &&
                            validationType.errors.t_final_total ? (
                              <FormFeedback type="invalid">
                                {validationType.errors.t_final_total}
                              </FormFeedback>
                            ) : null}
                          </div>
                        </div>
                      </Col>
                    </Row>
                  </>
                ) : null}
                <Col
                  className="col-12 p-1 my-2  d-flex justify-content-between"
                  style={{ backgroundColor: "#e7ffdc", cursor: "pointer" }}
                  onClick={() => setComparisonPricingTab(!comparisonPricingTab)}
                >
                  <div className="d-flex">
                    <p
                      className="p-2"
                      style={{
                        fontSize: "20px",
                        fontWeight: "bold",
                        color: "#495057",
                        marginBottom: "0px",
                      }}
                    >
                      Comparison Pricing
                    </p>
                    <div className="m-2">
                      <i
                        className="uil-question-circle font-size-15"
                        id="comparisonPricingTooltip"
                      />
                      <Tooltip
                        placement="right"
                        isOpen={comparisonHeaderTooltip}
                        style={{ textAlign: "left" }}
                        target="comparisonPricingTooltip"
                        toggle={() => {
                          setComparisonHeaderTooltip(!comparisonHeaderTooltip);
                        }}
                      >
                        The price at which competitors sell the same or similar
                        product. This helps assess how our pricing compares
                        within the market.
                      </Tooltip>
                    </div>
                  </div>
                  {comparisonPricingTab ? (
                    <div
                      className="m-2"
                      style={{ cursor: "pointer" }}
                      onClick={() =>
                        setComparisonPricingTab(!comparisonPricingTab)
                      }
                    >
                      <IoIosArrowDown size={30} />
                    </div>
                  ) : (
                    <div
                      className="m-2"
                      style={{ cursor: "pointer" }}
                      onClick={() =>
                        setComparisonPricingTab(!comparisonPricingTab)
                      }
                    >
                      <IoIosArrowForward size={30} />
                    </div>
                  )}
                </Col>
                {comparisonPricingTab ? (
                  <>
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
                                The price that the most expensive cruise ship
                                will sell this tour at. This price should not be
                                confused with the "From" price shown on cruise
                                ship websites. It is always higher. Compare all
                                cruise websites. If the tour is not available
                                for cruise ship passengers or the ship price
                                won't shown on the website (as with Cancun
                                Discounts) then leave this blank.
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
                                // setRecalc(true);
                                const value = e.target.value || "";
                                validationType.setFieldValue(
                                  "ship_price",
                                  setDecimalFormat(value)
                                );
                                ourPricingCalc();
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
                                websites. This should generally be the most
                                expensive price for a comparable tour you can
                                commonly find on the web. Typically avoid
                                outliers where one website is far above from the
                                rest. We want the customers to be able to see
                                that they're saving money compared to other
                                options.
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
                                // setRecalc(true);
                                const value = e.target.value || "";
                                validationType.setFieldValue(
                                  "compare_at",
                                  setDecimalFormat(value)
                                );
                                ourPricingCalc();
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
                            <Label className="form-label">You Save</Label>
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
                                compared to the "other guys" from the "Compare
                                At" price or "Ship Price" whichever is higher.
                                This will be shown on the website as "You Save!"
                                or "You Save 15%" depending on the site.
                              </Tooltip>
                            </div>
                          </div>
                          <div className="input-group">
                            <Input
                              name="you_save"
                              placeholder=""
                              type="text"
                              onChange={validationType.handleChange}
                              // onBlur={(e) => {
                              //   const value = e.target.value || "";
                              //   validationType.setFieldValue(
                              //     "you_save",
                              //     setYouSaveFormat(value)
                              //   );
                              // }}
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
                            <Label className="form-label">
                              "Compare At" URL
                            </Label>
                            <div>
                              <i
                                className="uil-question-circle font-size-15"
                                id="compareAtURL"
                              />
                              <Tooltip
                                placement="right"
                                isOpen={ttop9}
                                target="compareAtURL"
                                toggle={() => {
                                  setttop9(!ttop9);
                                }}
                              >
                                Paste the URL of the web page where the "Compare
                                At" price, established during the price survey,
                                can be verified.
                              </Tooltip>
                            </div>
                          </div>
                          <Input
                            name="compare_at_url"
                            placeholder=""
                            type="text"
                            onChange={validationType.handleChange}
                            // onBlur={validationType.handleBlur}
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
                  </>
                ) : null}
                <Row>
                  <Col className="col-12 d-flex justify-content-end mt-4">
                    <Button
                      color="paradise"
                      outline
                      className="waves-effect waves-light col-2 mx-4"
                      type="button"
                      onClick={() => {
                        setAddNewPrivateCharter(false);
                        setCopyProduct(false);
                      }}
                    >
                      Close
                    </Button>
                    <Button
                      id="save-button"
                      type="submit"
                      className="font-16 btn-block col-2 btn-orange"
                      // onClick={toggleCategory}
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

export default AddNewPrivateCharter;
