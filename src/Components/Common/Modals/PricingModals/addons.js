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
  UncontrolledTooltip,
} from "reactstrap";
import * as Yup from "yup";
import { useFormik } from "formik";
import { map } from "lodash";
import Switch from "react-switch";
import Swal from "sweetalert2";
import {
  setDecimalFormat,
  setRateFormat,
  calcNetRate,
  calcYouSave,
  calcEffRate,
  calcCommission,
  calcDeposit,
  calcNetPrice,
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
  id
}) => {
  //edit data
  const [dataEdit, setDataEdit] = useState();
  useEffect(() => {
    if (editProductID !== null) {
      getAddonAPI(editProductID).then((resp) => {
        setDataEdit(resp.data.data[0]);
      });
    }
  }, [editProductID]);
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
  const [displayOptionSelected, setDisplayOptionSelected] = useState();
  const [addonLabelSelected, setAddonLabelSelected] = useState("");
  const [matchQuantitySelected, setMatchQuantitySelected] = useState();
  const [balance, setBalance] = useState(dataEdit?.active === 1 ? true : false);
  const [isUpgrade, setIsUpgrade] = useState(dataEdit?.type === 1 ? true : false);
  useEffect(() => {
    if (newAddon) {
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

  useEffect(() => {
    setBalance(dataEdit?.active === 1 ? true : false);
    setIsUpgrade(dataEdit?.type === 1 ? true : false)
    setDisplayOptionSelected(dataEdit?.display_option)
  }, [dataEdit]);

  // console.log(priceOptions);
  // console.log(priceTypeSelected);
  console.log("addon ------------:",addonTypeSelected)
// console.log(dataEdit)
  const validationType = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,
    initialValues: {
      product_name: dataEdit ? dataEdit.name : "",
      sku: dataEdit ? dataEdit.sku : "",
      min_qty: dataEdit?.min_qty ? dataEdit?.min_qty : "",
      max_qty: dataEdit?.max_qty ? dataEdit?.max_qty : "",
      // tour_id: 37,
      match_qty_id: matchQuantitySelected
        ? matchQuantitySelected
        : dataEdit?.match_qty_id,
      price_type_id: priceTypeSelected
        ? priceTypeSelected
        : dataEdit?.price_type_id,
      price_option_id: priceOptionSelected
        ? priceOptionSelected
        : dataEdit?.price_option_id,
      collect_id: priceCollectSelected
        ? priceCollectSelected
        : dataEdit?.collect_id,
      display_option: 1,
      title: "",
      addon_description: dataEdit?.description ? dataEdit?.description : "",
      option_label: null,
      show_balance_due: balance,
      rate: dataEdit?.net_rate ? setRateFormat(dataEdit?.net_rate) : "",
      our_price: dataEdit?.price ? dataEdit?.price : "",
      you_save: dataEdit?.you_save ? dataEdit?.you_save : "",
      commission: dataEdit?.commission ? dataEdit?.commission : "",
      deposit: dataEdit?.deposit ? dataEdit?.deposit : "",
      balance_due: dataEdit?.net_price ? dataEdit?.net_price : "",
    },
    validationSchema: Yup.object().shape({
      min: Yup.number().integer().nullable(),
      max: Yup.number().integer().nullable(),
      rate: Yup.number().nullable(),
      our_price: Yup.number().required("Field Required"),
      commission: Yup.number().required("Field Required"),
      deposit: Yup.number().required("Field Required"),
      balance_due: Yup.number().required("Field Required"),
    }),
    onSubmit: (values, { resetForm }) => {
      let data = {
        tour_id: +id,
        match_qty_id: matchQuantitySelected
          ? matchQuantitySelected
          : dataEdit?.match_qty_id,
        price_type_id: priceTypeSelected
          ? priceTypeSelected
          : dataEdit?.price_type_id,
        price_option_id: priceOptionSelected
          ? priceOptionSelected
          : dataEdit?.price_option_id,
        collect_id: priceCollectSelected
          ? priceCollectSelected
          : dataEdit?.collect_id,
        display_option: displayOptionSelected,
        // title: "Masseuse ($300)",
        // description: null,
        // option_label: null,
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
        min_qty: values.min_qty,
        max_qty: values.max_qty,
        add_on_type_id: displayOptionSelected,
        instruction_label_id: addonLabelSelected === "" ? null : addonLabelSelected,
        description: values.addon_description
      };

      // console.log(data)

      if (dataEdit) {
        putAddonAPI(editProductID, data)
          .then((resp) => {
            triggerUpdate();
            // console.log(resp);
            setNewAddon(false);
            refreshTable();
            resetForm({ values: "" });
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
              });

              Swal.fire(
                "Error!",
                // {error.response.},
                String(errorMessages[0])
              );
            }
          });
      } else {
        postAddonsAPI(data)
          .then((resp) => {
            // console.log(resp);
            triggerUpdate();
            setNewAddon(false);
            refreshTable();
            resetForm({ values: "" });
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
              });

              Swal.fire(
                "Error!",
                // {error.response.},
                String(errorMessages[0])
              );
            }
          });
      }
      refreshTable();
    },
  });

  const multipleRateCalcs = (value) => {
    const rate = setRateFormat(value);
    const commission = calcCommission(
      validationType.values.our_price,
      rate,
      validationType.values.commission
    );
    const balance_due = calcNetPrice(
      validationType.values.our_price,
      commission,
      validationType.values.balance_due
    );

    validationType.setFieldValue("rate", rate);
    validationType.setFieldValue("commission", commission);
    validationType.setFieldValue("balance_due", balance_due);
    return rate;
  };

  const multipleOurPriceCalcs = (value) => {
    const our_price = setDecimalFormat(value);
    //const you_save = calcYouSave(our_price, validationType.values.ship_price, validationType.values.compare_at, validationType.values.you_save)
    const commission = calcCommission(
      our_price,
      validationType.values.rate,
      validationType.values.commission
    );
    const balance_due = calcNetPrice(
      our_price,
      commission,
      validationType.values.balance_due
    );
    const deposit = calcDeposit(
      our_price,
      priceCollectNameSelected,
      commission,
      validationType.values.deposit
    );

    //validationType.setFieldValue('you_save', you_save)
    validationType.setFieldValue("deposit", deposit);
    validationType.setFieldValue("commission", commission);
    validationType.setFieldValue("balance_due", balance_due);
    return our_price;
  };

  const multipleCommissionCalcs = (value) => {
    const commission = setDecimalFormat(value);

    validationType.setFieldValue("commission", commission);
    validationType.setFieldValue(
      "deposit",
      calcDeposit(
        validationType.values.our_price,
        priceCollectNameSelected,
        commission,
        validationType.values.deposit
      )
    );
    validationType.setFieldValue(
      "balance_due",
      calcNetPrice(
        validationType.values.our_price,
        commission,
        validationType.values.balance_due
      )
    );

    return commission;
  };

  const onChangeUpgrade = () => {
    setIsUpgrade(!isUpgrade);
  };

  return (
    <Modal
      centered
      size="xl"
      isOpen={newAddon}
      toggle={() => {
        // onClickAddNew();
      }}
    >
      <div
        className="modal-header"
        style={{ backgroundColor: "#3DC7F4", border: "none" }}
      >
        <h1 className="modal-title mt-0 text-white">+ New Add-On</h1>
        <button
          onClick={() => {
            setNewAddon(false);
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
                      <option>Select....</option>
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
              <Row className="d-flex">
                <Col className="col-9 d-flex justify-content-between">
                  {isUpgrade === false ? (
                    <>
                      <Col className="col-2">
                        <div className="form-outline">
                          <Label className="form-label">Price Type</Label>
                          <Input
                            type="select"
                            name="price_type"
                            onChange={(e) => {
                              setPriceTypeSelected(e.target.value);
                            }}
                            onBlur={validationType.handleBlur}
                            //   value={validationType.values.department || ""}
                          >
                            <option>Select....</option>
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
                            }}
                            onBlur={validationType.handleBlur}
                            //   value={validationType.values.department || ""}
                          >
                            <option>Select....</option>
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
                            <option>Select....</option>
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
                          <Label className="form-label">Collect</Label>
                          <Input
                            type="select"
                            name="collect"
                            onChange={(e) => {
                              setPriceCollectSelected(e.target.value);
                              setPriceCollectNameSelected(
                                e.target.selectedOptions[0].label
                              );
                            }}
                            onBlur={(e) => {
                              const value = e.target.value || "";
                              validationType.setFieldValue(
                                "collect",
                                value,
                                validationType.setFieldValue(
                                  "deposit",
                                  calcDeposit(
                                    validationType.values.our_price,
                                    priceCollectNameSelected,
                                    validationType.values.commission,
                                    validationType.values.deposit
                                  )
                                ),
                                validationType.handleBlur
                              );
                            }}
                          >
                            <option>Select....</option>
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
                          <Label className="form-label">Price Type</Label>
                          <Input
                            type="select"
                            name="price_type"
                            onChange={(e) => {
                              setPriceTypeSelected(e.target.value);
                            }}
                            onBlur={validationType.handleBlur}
                            //   value={validationType.values.department || ""}
                          >
                            <option>Select....</option>
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
                          <Label className="form-label">Addon Type</Label>
                          <Input
                            type="select"
                            name="addon_type"
                            onChange={(e) => {
                              setAddonTypeSelected(+e.target.value);
                            }}
                            onBlur={validationType.handleBlur}
                            //   value={validationType.values.department || ""}
                          >
                            <option>Select....</option>
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
                            <option>Select....</option>
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
                          <Label className="form-label">Collect</Label>
                          <Input
                            type="select"
                            name="collect"
                            onChange={(e) => {
                              setPriceCollectSelected(e.target.value);
                              setPriceCollectNameSelected(
                                e.target.selectedOptions[0].label
                              );
                            }}
                            onBlur={(e) => {
                              const value = e.target.value || "";
                              validationType.setFieldValue(
                                "collect",
                                value,
                                validationType.setFieldValue(
                                  "deposit",
                                  calcDeposit(
                                    validationType.values.our_price,
                                    priceCollectNameSelected,
                                    validationType.values.commission,
                                    validationType.values.deposit
                                  )
                                ),
                                validationType.handleBlur
                              );
                            }}
                          >
                            <option>Select....</option>
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
                    <div
                      className="form-outline"
                      style={{ marginRight: "20px", marginLeft: "-20px" }}
                    >
                      <Label className="form-label">Balance Due</Label>
                      <Col className="col-4">
                        <div className="form-check form-switch form-switch-md mx-2">
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
                      </Col>
                    </div>
                  </Col>
                </Col>
                <Col className="col-3 d-flex justify-content-between">
                  <Col className="col-4">
                    <Label className="form-label ">Min. Qty.</Label>
                    <div className="form-outline mb-4">
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
                    <Label className="form-label">Max. Qty.</Label>
                    <div className="form-outline mb-4">
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
              </Row>

              <Row className="d-flex">
                <Col className="col-10 d-flex justify-content-start">
                  <Col className="col-4">
                    <div className="form-outline">
                      <Label className="form-label">Display Option</Label>
                      <Input
                        type="select"
                        name="display_option"
                        onChange={(e) => {
                          setDisplayOptionSelected(+e.target.value);
                        }}
                        onBlur={validationType.handleBlur}
                        //   value={validationType.values.department || ""}
                        
                      >
                        <option>Select....</option>
                        {map(displayOptionData, (type, index) => {
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
                  {/* {console.log(displayOptionSelected)} */}

                  {displayOptionSelected === 1 || 
                  displayOptionSelected === 2 ? (
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
                    displayOptionSelected === 5 ? (
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
                            <option>Select....</option>
                            {map(addonLabelData, (type, index) => {
                              return (
                                <option
                                  key={index}
                                  value={type.id}
                                  selected={
                                    dataEdit
                                      ? type.id === dataEdit.instruction_label_id
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
                    <Label className="form-label">Our Price*</Label>
                    <div className="input-group">
                      <span
                        class="input-group-text form-label fw-bold bg-paradise text-white border-0"
                        id="basic-addon1"
                        style={{ fontSize: "0.85em" }}
                      >
                        $
                      </span>
                      <Input
                        name="our_price"
                        placeholder="0.00"
                        type="number"
                        min="0"
                        step="any"
                        onChange={validationType.handleChange}
                        onBlur={(e) => {
                          const value = e.target.value || "";
                          validationType.setFieldValue(
                            "our_price",
                            multipleOurPriceCalcs(value)
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
                    <UncontrolledTooltip placement="top" target="our_price">
                      The price we will sell the tour for.
                    </UncontrolledTooltip>
                  </div>
                </Col>
                <Col className="col-2">
                  <div className="form-outline mb-2" id="you_save">
                    <Label className="form-label">You Save*</Label>
                    <div className="input-group">
                      <Input
                        name="you_save"
                        placeholder="0.00"
                        type="number"
                        min="0"
                        step="any"
                        onChange={validationType.handleChange}
                        onBlur={(e) => {
                          const value = e.target.value || "";
                          validationType.setFieldValue(
                            "you_save",
                            setDecimalFormat(value)
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
                        class="input-group-text form-label fw-bold bg-paradise text-white border-0"
                        id="basic-addon1"
                        style={{ fontSize: "0.85em" }}
                      >
                        %
                      </span>
                    </div>
                    <UncontrolledTooltip placement="top" target="you_save">
                      This is the amount they save by booking with us compared
                      to the "other guys" from the compare at price.
                    </UncontrolledTooltip>
                  </div>
                </Col>
                <Col className="col-2">
                  <div className="form-outline mb-2" id="rate">
                    <Label className="form-label">Rate %</Label>
                    <div className="input-group">
                      <Input
                        name="rate"
                        placeholder="0.00"
                        type="number"
                        step="any"
                        onChange={validationType.handleChange}
                        onBlur={(e) => {
                          const value = e.target.value || "";
                          validationType.setFieldValue(
                            "rate",
                            multipleRateCalcs(value)
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
                      {validationType.touched.rate &&
                      validationType.errors.rate ? (
                        <FormFeedback type="invalid">
                          {validationType.errors.rate}
                        </FormFeedback>
                      ) : null}
                      <span
                        class="input-group-text form-label fw-bold bg-paradise text-white border-0"
                        id="basic-addon1"
                        style={{ fontSize: "0.85em" }}
                      >
                        %
                      </span>
                    </div>
                    <UncontrolledTooltip placement="top" target="rate">
                      The commission rate for the tour that is specified in our
                      service agreement.
                    </UncontrolledTooltip>
                  </div>
                </Col>
                <Col className="col-2">
                  <div className="form-outline mb-2" id="commission">
                    <Label className="form-label">Commission*</Label>
                    <div className="input-group">
                      <span
                        class="input-group-text form-label fw-bold bg-paradise text-white border-0"
                        id="basic-addon1"
                        style={{ fontSize: "0.85em" }}
                      >
                        $
                      </span>
                      <Input
                        name="commission"
                        placeholder="0.00"
                        type="number"
                        min="0"
                        step="any"
                        onChange={validationType.handleChange}
                        onBlur={(e) => {
                          const value = e.target.value || "";
                          validationType.setFieldValue(
                            "commission",
                            multipleCommissionCalcs(value),
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
                      {validationType.touched.commission &&
                      validationType.errors.commission ? (
                        <FormFeedback type="invalid">
                          {validationType.errors.commission}
                        </FormFeedback>
                      ) : null}
                      <UncontrolledTooltip placement="top" target="commission">
                        The $$ amount that we earn from the sale.
                      </UncontrolledTooltip>
                    </div>
                  </div>
                </Col>
                <Col className="col-2">
                  <div className="form-outline mb-2" id="deposit">
                    <Label className="form-label">Deposit*</Label>
                    <div className="input-group">
                      <span
                        class="input-group-text form-label fw-bold bg-paradise text-white border-0"
                        id="basic-addon1"
                        style={{ fontSize: "0.85em" }}
                      >
                        $
                      </span>
                      <Input
                        name="deposit"
                        placeholder="0.00"
                        type="number"
                        min="0"
                        step="any"
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
                    <UncontrolledTooltip placement="top" target="deposit">
                      The amount we collect at the time of booking.
                    </UncontrolledTooltip>
                  </div>
                </Col>
                <Col className="col-2">
                  <div className="form-outline mb-2" id="balance_due">
                    <Label className="form-label">Net Price*</Label>
                    <div className="input-group">
                      <span
                        class="input-group-text form-label fw-bold bg-paradise text-white border-0"
                        id="basic-addon1"
                        style={{ fontSize: "0.85em" }}
                      >
                        $
                      </span>
                      <Input
                        name="balance_due"
                        placeholder="0.00"
                        type="number"
                        min="0"
                        step="any"
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
                    <UncontrolledTooltip placement="top" target="balance_due">
                      The amount due to the provider on the day of the tour.
                    </UncontrolledTooltip>
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
                style={{ backgroundColor: "#F6851F" }}
                type="submit"
                className="font-16 btn-block col-2"
                // onClick={toggleCategory}
              >
                Save
              </Button>
            </Row>
          </Row>
        </Form>
      </div>
    </Modal>
  );
};

export default Addons;
