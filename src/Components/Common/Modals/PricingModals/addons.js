import { useEffect, useState } from "react";
import AddonsImage from "../../../Assets/images/addons.png";
import {
  getPricingOptionsAPI,
  getAddonAPI,
  postAddonsAPI,
  putAddonAPI,
  triggerUpdate,
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
  calcDeposit,
  setYouSaveFormat,
} from "../../../../Utils/CommonFunctions";

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
  id,
}) => {
  //edit data
  let editID = editProductID
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

  //combo box request
  const [priceMatchQuantityData, setPriceMatchQuantityData] = useState([]);
  const [priceTypeData, setPriceTypeData] = useState([]);
  const [priceOptions, setPriceOptions] = useState([]);
  const [priceCollect, setPriceCollect] = useState([]);
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
  const [isUpgrade, setIsUpgrade] = useState(dataEdit?.type === 2 ? true : false);

  useEffect(() => {
    if (newAddon) {
      setLoadingData(true)
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
    }
  }, [newAddon]);

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

  const [recalc, setRecalc] = useState(false)
  let changing = false

  useEffect(() => {
    if (dataEdit && newAddon && priceCollect) {
      setRecalc(false)
      setPriceCollectSelected(dataEdit.collect_id)
      let priceCollectSe = priceCollect.filter(x => x.id === dataEdit.collect_id)
      if (priceCollectSe.length > 0) {
        setPriceCollectNameSelected(priceCollectSe[0].text)
      }
      if (dataEdit?.collect_id === 25 && dataEdit.display_option === 10) {
        setIsCustomMessage(true)
        setAddonTypeNameSelected(dataEdit?.add_on_type)
        setPriceTypeNameSelected(dataEdit?.price_type)
      } else {
        setIsCustomMessage(false)
      }

      setBalance(dataEdit?.active === 1 ? true : false);
      setIsUpgrade(dataEdit?.type === 2 ? true : false);
      setDisplayOptionSelected(dataEdit?.display_option);
      setCustomMessage(dataEdit?.custom_text === 0 ? false : true)

      if (!changing) {
        changing = true
        setTimeout(() => {
          setLoadingData(false)
          changing = false
        }, 1000);
      }
    } else {
      setRecalc(true)
      setPriceTypeSelected("")
      setAddonTypeSelected("")
      setPriceOptionSelected("")
      setPriceCollectSelected("")
      setPriceCollectNameSelected("")
      setAddonTypeNameSelected("")
      setPriceTypeNameSelected("")
      setAddonLabelSelected("")
      setDisplayOptionSelected("")
      setMatchQuantitySelected("")
      setBalance(false)
      setCustomMessage(false)
      setIsCustomMessage(false)
      setIsUpgrade(false)
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

  useEffect(() => {
    if (priceCollectSelected === "25" &&
      displayOptionSelected === 10) {
      setIsCustomMessage(true)
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

  const validationType = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,
    initialValues: {
      product_name: dataEdit ? dataEdit.name : "",
      sku: dataEdit ? dataEdit.sku : "",
      min_qty: dataEdit ? dataEdit.min_qty : "",
      max_qty: dataEdit ? dataEdit.max_qty : "",
      addon_description: dataEdit ? dataEdit.description : "",
      rate: dataEdit ? setRateFormat(dataEdit.net_rate) : "",
      our_price: dataEdit ? dataEdit.price : "",
      you_save: dataEdit ? setYouSaveFormat(dataEdit.you_save) : "",
      commission: dataEdit ? dataEdit.commission : "",
      deposit: dataEdit ? dataEdit.deposit : "",
      balance_due: dataEdit ? dataEdit.net_price : "",
      custom_message: dataEdit ? dataEdit.option_label : ""
    },
    validationSchema: Yup.object().shape({
      min_qty: Yup.number().integer().nullable(),
      max_qty: Yup.number().integer().nullable(),
      rate: Yup.number().nullable(),
      our_price: Yup.number().required("Field Required"),
      commission: Yup.number().required("Field Required"),
      deposit: Yup.number().required("Field Required"),
      balance_due: Yup.number().required("Field Required"),
    }),
    onSubmit: (values, { resetForm }) => {
      let data = {
        tour_id: +id,
        match_qty_id: matchQuantitySelected ? matchQuantitySelected : (dataEdit ? dataEdit.match_qty_id : null),
        price_type_id: priceTypeSelected ? priceTypeSelected : (dataEdit ? dataEdit.price_type_id : null),
        add_on_type_id: addonTypeSelected ? addonTypeSelected : (dataEdit ? dataEdit.add_on_type_id : null),
        price_option_id: priceOptionSelected ? priceOptionSelected : (dataEdit ? dataEdit.price_option_id : null),
        collect_id: priceCollectSelected ? priceCollectSelected : (dataEdit ? dataEdit.collect_id : null),
        display_option: displayOptionSelected ? displayOptionSelected : (dataEdit ? dataEdit.display_option : null),
        instruction_label_id: addonLabelSelected ? addonLabelSelected : (dataEdit ? dataEdit.instruction_label_id : null),
        description: values.addon_description,
        show_balance_due: balance,
        price: values.our_price,
        you_save: values.you_save,
        net_rate:
          values.rate !== ""
            ? values.rate > 1
              ? values.rate / 100
              : values.rate
            : values.rate,
        commission: values.commission,
        deposit: values.deposit,
        net_price: values.balance_due,
        type: isUpgrade ? 2 : 1,
        custom_text: customMessage === true ? 1 : 0,
        option_label: customMessage === true ? values.custom_message : addonTypeNameSelected ? `We want to ${addonTypeNameSelected !== ""
          ? addonTypeNameSelected
          : "[Add-On Type]"
          } for $ ${validationType.values.our_price !== ""
            ? validationType.values.our_price
            : "[Price]"
          } ${priceTypeNameSelected !== ""
            ? priceTypeNameSelected
            : "[Price Type]"
          }, paid in cash on the day of the tour.` : values.custom_message,
        min_qty: values.min_qty,
        max_qty: values.max_qty
      };

      document.getElementById("save-button").disabled = true;
      if (dataEdit) {
        putAddonAPI(editProductID, data)
          .then((resp) => {
            triggerUpdate();
            editID = null
            setNewAddon(false);
            refreshTable();
            resetForm({ values: "" });
            document.getElementById("save-button").disabled = false;
          })
          .catch((error) => {
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
      } else {
        postAddonsAPI(data)
          .then((resp) => {
            triggerUpdate();
            editID = null
            setNewAddon(false);
            refreshTable();
            resetForm({ values: "" });
            document.getElementById("save-button").disabled = false;
          })
          .catch((error) => {
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
      refreshTable();
    },
  });

  useEffect(() => {
    if (validationType.values.our_price !== "" && validationType.values.our_price !== 0 && validationType.values.commission !== "" && validationType.values.commission !== 0) {
      validationType.setFieldValue("balance_due", (validationType.values.our_price - validationType.values.commission).toFixed(2))
    }
  }, [validationType.values.our_price, validationType.values.commission])

  useEffect(() => {
    if (validationType.values.our_price !== "" && priceCollectNameSelected !== "") {
      validationType.setFieldValue(
        "deposit",
        calcDeposit(
          validationType.values.our_price,
          priceCollectNameSelected,
          validationType.values.commission,
          validationType.values.deposit
        )
      )
    }
  }, [validationType.values.our_price, priceCollectNameSelected])

  return (
    <Modal
      centered
      size="xl"
      isOpen={newAddon}
      toggle={() => {
        // onClickAddNew();
        editID = 0
      }}
    >
      <div
        className="modal-header"
        style={{ backgroundColor: "#3DC7F4", border: "none" }}
      >
        {dataEdit?.id ? (
          <h1 className="modal-title mt-0 text-white">Edit Add-On</h1>
        ) : (
          <h1 className="modal-title mt-0 text-white">+ New Add-On</h1>
        )}
        <button
          onClick={() => {
            setNewAddon(false);
            // setDataEdit()
            editID = 0
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
                  <Col className="col-2">
                    <div className="form-outline mb-4">
                      <Label className="form-label">Match Quantity to</Label>
                      <Input
                        type="select"
                        name="match_qty_id"
                        onChange={(e) => {
                          setMatchQuantitySelected(e.target.value);
                        }}
                        onBlur={validationType.handleBlur}
                      //   value={validationType.values.department || ""}
                      >
                        <option value="">Select....</option>
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
                                customTextAssing({
                                  type: "price_type",
                                  label: e.target.selectedOptions[0].label,
                                });
                              }}
                              onBlur={validationType.handleBlur}
                            //   value={validationType.values.department || ""}
                            >
                              <option value="">Select....</option>
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
                              <option value="">Select....</option>
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
                              <option value="">Select....</option>
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
                                          ? option.id === dataEdit.price_option_id
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
                                setPriceCollectSelected(e.target.value);
                                setPriceCollectNameSelected(
                                  e.target.selectedOptions[0].label
                                );
                              }}
                            >
                              <option value="">Select....</option>
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
                              <option value="">Select....</option>
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
                              <option value="">Select....</option>
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
                              <option value="">Select....</option>
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
                                          ? option.id === dataEdit.price_option_id
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
                              <option value="">Select....</option>
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
                            Select whether the balance due should be shown to the provider in the "Please Confirm" email. This amount will be the same as in the "Voucher Balance" below. It is the amount the customer will pay to the provider on the day of the tour.
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
                  {displayOptionSelected === 1 || displayOptionSelected === 5 || displayOptionSelected === 4 ?
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
                    </Col> : null
                  }
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
                            console.log(+e.target.value);
                          }}
                          onBlur={validationType.handleBlur}
                        >
                          <option value="">Select....</option>
                          {map(displayOptionData.filter(x => x.id !== 2), (type, index) => {
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
                          })}
                        </Input>
                      </div>
                    </Col>
                    {displayOptionSelected === 1 ||
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
                    ) : displayOptionSelected === 3 ||
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
                              <option value="">Select....</option>
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
                          <p>{`We want to ${addonTypeNameSelected !== ""
                            ? addonTypeNameSelected
                            : "[Add-On Type]"
                            } for $ ${validationType.values.our_price !== ""
                              ? validationType.values.our_price
                              : "[Price]"
                            } ${priceTypeNameSelected !== ""
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
                                onChange={() => setCustomMessage(!customMessage)}
                              />
                            </div>
                          </Col>
                        </div>
                      </Col>
                    </>
                  ) : null}
                </Row>

                <Row
                  className="col-12 p-1 mt-4 mb-2"
                  style={{ backgroundColor: "#FFEFDE" }}
                >
                  <p
                    className="py-2"
                    style={{
                      fontSize: "20px",
                      fontWeight: "bold",
                      color: "#495057",
                      marginBottom: "0px",
                    }}
                  >
                    Pricing
                  </p>
                </Row>
                <Row className="col-12 d-flex">
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
                            The price we will sell the addon for.
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
                          onChange={validationType.handleChange}
                          onBlur={(e) => {
                            setRecalc(true)
                            const value = e.target.value || "";
                            customTextAssing({
                              type: "ourPrice",
                              label: value,
                            });
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
                      </div>
                      {validationType.touched.our_price &&
                        validationType.errors.our_price ? (
                        <FormFeedback type="invalid">
                          {validationType.errors.our_price}
                        </FormFeedback>
                      ) : null}
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
                            This is the amount they save by booking with us compared
                            to the "other guys" from the compare at price.
                          </Tooltip>
                        </div>
                      </div>
                      <div className="input-group">
                        <Input
                          name="you_save"
                          placeholder=""
                          type="text"
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
                        <span
                          className="input-group-text form-label fw-bold bg-paradise text-white border-0"
                          id="basic-addon1"
                          style={{ fontSize: "0.85em" }}
                        >
                          %
                        </span>
                      </div>
                      {validationType.touched.you_save &&
                        validationType.errors.you_save ? (
                        <FormFeedback type="invalid">
                          {validationType.errors.you_save}
                        </FormFeedback>
                      ) : null}
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
                            The commission rate for the addon that is specified in our
                            service agreement.
                          </Tooltip>
                        </div>
                      </div>
                      <div className="input-group">
                        <Input
                          name="rate"
                          placeholder=""
                          type="text"
                          onChange={validationType.handleChange}
                          onBlur={(e) => {
                            setRecalc(true)
                            const value = e.target.value || "";
                            validationType.setFieldValue(
                              "rate",
                              setRateFormat(value)
                            );
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
                      {validationType.touched.rate &&
                        validationType.errors.rate ? (
                        <FormFeedback type="invalid">
                          {validationType.errors.rate}
                        </FormFeedback>
                      ) : null}
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
                          type="text"
                          onChange={validationType.handleChange}
                          onBlur={(e) => {
                            const value = e.target.value || "";
                            validationType.setFieldValue(
                              "commission",
                              setDecimalFormat(value),
                              validationType.handleBlur
                            );
                          }}
                          value={validationType.values.commission || ""}
                          invalid={
                            validationType.touched.commission &&
                              validationType.errors.commission
                              ? true
                              : false
                          }
                        />
                      </div>
                      {validationType.touched.commission &&
                        validationType.errors.commission ? (
                        <FormFeedback type="invalid">
                          {validationType.errors.commission}
                        </FormFeedback>
                      ) : null}
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
                          readOnly={priceCollectSelected !== "1" && priceCollectSelected !== "25" && priceCollectSelected !== "3"}
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
                      </div>
                      {validationType.touched.deposit &&
                        validationType.errors.deposit ? (
                        <FormFeedback type="invalid">
                          {validationType.errors.deposit}
                        </FormFeedback>
                      ) : null}
                    </div>
                  </Col>
                  <Col className="col-2">
                    <div className="form-outline mb-2" id="balance_due">
                      <div className="d-flex justify-content-between">
                        <Label className="form-label">Balance Due*</Label>
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
                              setDecimalFormat(value),
                              validationType.handleBlur
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
                  onClick={() => setNewAddon(false)}
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
