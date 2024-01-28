import { useEffect, useState } from "react";
import TransportationImage from "../../../Assets/images/transportation.png";
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
  Tooltip,
} from "reactstrap";
import * as Yup from "yup";
import { useFormik } from "formik";
import {
  getPriceAPI,
  getPricingOptionsAPI,
  getPricingZoneOptionsAPI,
  postPricesAPI,
  updatePriceAPI,
  triggerUpdate,
} from "../../../../Utils/API/Tours";
import { map } from "lodash";
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

const AddNewTransportation = ({
  addNewTransportation,
  setAddNewTransportation,
  refreshTable,
  editProductID,
  tourData,
  copyProduct,
}) => {
  let id = "";
  id = editProductID;
  //edit data
  const [dataEdit, setDataEdit] = useState();
  useEffect(() => {
    setPriceTypeSelected("");
    setPriceOptionSelected("");
    setPriceCollectSelected("");
    setPriceCollectNameSelected("");
    setPriceSeasonSelected("");
    setPriceTransferTypeSelected("");
    setPriceDirectionSelected("");
    setPriceZoneSelected("");
    setPriceVehicleSelected("");
    if (id) {
      getPriceAPI(id).then((resp) => {
        // console.log(
        //   "data que viene al editar-------------------",
        //   resp.data.data
        // );
        setDataEdit(resp.data.data[0]);
      });
    } else {
      setDataEdit(null);
    }
  }, [id, addNewTransportation]);
  // console.log(copyProduct)

  //combo box request
  const [priceTypeData, setPriceTypeData] = useState([]);
  const [priceOptions, setPriceOptions] = useState([]);
  const [priceCollect, setPriceCollect] = useState([]);
  const [priceSeason, setPriceSeason] = useState([]);
  const [priceZone, setPriceZone] = useState([]);
  const [priceTransferType, setPriceTransferType] = useState([]);
  const [priceDirection, setPriceDirection] = useState([]);
  const [priceVehicle, setVehicleZone] = useState([]);
  const [priceTypeSelected, setPriceTypeSelected] = useState("");
  const [priceOptionSelected, setPriceOptionSelected] = useState("");
  const [priceCollectSelected, setPriceCollectSelected] = useState("");
  const [priceCollectNameSelected, setPriceCollectNameSelected] = useState("");
  const [priceSeasonSelected, setPriceSeasonSelected] = useState("");
  const [priceTransferTypeSelected, setPriceTransferTypeSelected] =
    useState("");
  const [priceDirectionSelected, setPriceDirectionSelected] = useState("");
  const [priceZoneSelected, setPriceZoneSelected] = useState("");
  const [priceVehicleSelected, setPriceVehicleSelected] = useState("");
  useEffect(() => {
    if (addNewTransportation) {
      getPricingOptionsAPI(20).then((resp) => {
        setPriceTypeData(resp.data.data);
      });
      getPricingOptionsAPI(21).then((resp) => {
        setPriceOptions(resp.data.data);
      });
      getPricingOptionsAPI(22).then((resp) => {
        setPriceCollect(resp.data.data);
      });
      getPricingOptionsAPI(31).then((resp) => {
        setPriceSeason(resp.data.data);
      });
      getPricingOptionsAPI(46).then((resp) => {
        setPriceTransferType(resp.data.data);
      });
      getPricingOptionsAPI(49).then((resp) => {
        setPriceDirection(resp.data.data);
      });
      getPricingOptionsAPI(24).then((resp) => {
        setVehicleZone(resp.data.data);
      });
      getPricingZoneOptionsAPI(51, tourData.provider_id).then((resp) => {
        setPriceZone(resp.data.data);
      });
    }
  }, [addNewTransportation]);

  //checkbox
  const [activeCheckbox, setActiveCheckbox] = useState(null);
  const [balanceDueCheckbox, setBalanceDueCheckbox] = useState(null);
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

  useEffect(() => {
    setActiveCheckbox(dataEdit?.active === 1 ? true : false);
    setBalanceDueCheckbox(dataEdit?.show_balance_due === 1 ? true : false);
  }, [dataEdit]);
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
      product_name: dataEdit ? dataEdit.label : "",
      sku: dataEdit ? dataEdit.sku : "",
      min: dataEdit ? dataEdit?.pricedetails[6]?.min : "",
      max: dataEdit ? dataEdit?.pricedetails[6]?.max : "",
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
      you_save: dataEdit ? dataEdit.you_save : "",
      eff_rate: dataEdit ? dataEdit.eff_rate : "",
      commission: dataEdit ? dataEdit.commission : "",
      deposit: dataEdit ? dataEdit.deposit : "",
      balance_due: dataEdit ? dataEdit.net_price : "",
    },
    validationSchema: Yup.object().shape({
      min: Yup.number().integer().nullable(),
      max: Yup.number().integer().nullable(),
      public_price: Yup.number().required("Field Required"),
      provider_price: Yup.number().nullable(),
      rate: Yup.number().nullable(),
      net_rate: Yup.number().nullable(),
      ship_price: Yup.number().nullable(),
      compare_at: Yup.number().required("Field Required"),
      compare_at_url: Yup.string().url("URL invalid format").trim().nullable(),
      our_price: Yup.number().required("Field Required"),
      commission: Yup.number().required("Field Required"),
      deposit: Yup.number().required("Field Required"),
      balance_due: Yup.number().required("Field Required"),
    }),
    onSubmit: (values, { resetForm }) => {
      let price_type =
        priceTypeSelected === "" || priceTypeSelected === undefined
          ? dataEdit && dataEdit.pricedetails
            ? dataEdit.pricedetails.filter((x) => x.pricing_option_id === 20)[0]
                ?.source_id
            : null
          : priceTypeSelected;

      let price_option =
        priceOptionSelected === "" || priceOptionSelected === undefined
          ? dataEdit && dataEdit.pricedetails
            ? dataEdit.pricedetails.filter((x) => x.pricing_option_id === 21)[0]
                ?.source_id
            : null
          : priceOptionSelected;

      let price_collect =
        priceCollectSelected === "" || priceCollectSelected === undefined
          ? dataEdit && dataEdit.pricedetails
            ? dataEdit.pricedetails.filter((x) => x.pricing_option_id === 22)[0]
                ?.source_id
            : null
          : priceCollectSelected;

      let price_season =
        priceSeasonSelected === "" || priceSeasonSelected === undefined
          ? dataEdit && dataEdit.pricedetails
            ? dataEdit.pricedetails.filter((x) => x.pricing_option_id === 31)[0]
                ?.source_id === undefined
              ? null
              : dataEdit.pricedetails.filter(
                  (x) => x.pricing_option_id === 31
                )[0]?.source_id
            : null
          : priceSeasonSelected;

      let transfer_type =
        priceTransferTypeSelected === "" ||
        priceTransferTypeSelected === undefined
          ? dataEdit && dataEdit.pricedetails
            ? dataEdit.pricedetails.filter((x) => x.pricing_option_id === 46)[0]
                ?.source_id === undefined
              ? null
              : dataEdit.pricedetails.filter(
                  (x) => x.pricing_option_id === 46
                )[0]?.source_id
            : null
          : priceTransferTypeSelected;

      let direction =
        priceDirectionSelected === "" || priceDirectionSelected === undefined
          ? dataEdit && dataEdit.pricedetails
            ? dataEdit.pricedetails.filter((x) => x.pricing_option_id === 49)[0]
                ?.source_id === undefined
              ? null
              : dataEdit.pricedetails.filter(
                  (x) => x.pricing_option_id === 49
                )[0]?.source_id
            : null
          : priceDirectionSelected;

      let vehicle =
        priceVehicleSelected === "" || priceVehicleSelected === undefined
          ? dataEdit && dataEdit.pricedetails
            ? dataEdit.pricedetails.filter((x) => x.pricing_option_id === 24)[0]
                ?.source_id === undefined
              ? null
              : dataEdit.pricedetails.filter(
                  (x) => x.pricing_option_id === 24
                )[0]?.source_id
            : null
          : priceVehicleSelected;

      let price_zone =
        priceZoneSelected === "" || priceZoneSelected === undefined
          ? dataEdit && dataEdit.pricedetails
            ? dataEdit.pricedetails.filter((x) => x.pricing_option_id === 51)[0]
                ?.source_id === undefined
              ? null
              : dataEdit.pricedetails.filter(
                  (x) => x.pricing_option_id === 51
                )[0]?.source_id
            : null
          : priceZoneSelected;

      if (
        price_type &&
        price_option &&
        price_collect &&
        transfer_type
      ) {
        let data = {
          tour_id: tourData.id,
          public: values.public_price,
          provider_price: values.provider_price,
          rate:
            values.rate !== ""
              ? values.rate > 1
                ? values.rate / 100
                : values.rate
              : values.rate,
          net_rate: values.net_rate,
          compare_at_url: values.compare_at_url,
          ship_price: values.ship_price,
          compare_at: values.compare_at,
          price: values.our_price,
          you_save: values.you_save,
          eff_rate: values.eff_rate,
          commission: values.commission,
          deposit: values.deposit,
          net_price: values.balance_due,
          active: activeCheckbox ? 1 : 0,
          show_balance_due: balanceDueCheckbox ? 1 : 0,
          price_details: [
            {
              pricing_option_id: 20,
              source_id: price_type,
              min: null,
              max: null,
              label: null,
            },
            {
              pricing_option_id: 21,
              source_id: price_option,
              min: null,
              max: null,
              label: null,
            },
            {
              pricing_option_id: 22,
              source_id: price_collect,
              min: null,
              max: null,
              label: null,
            },
            {
              pricing_option_id: 31,
              source_id: price_season,
              min: null,
              max: null,
              label: null,
            },
            {
              pricing_option_id: 46,
              source_id: transfer_type,
              min: null,
              max: null,
              label: null,
            },
            {
              pricing_option_id: 49,
              source_id: direction,
              min: null,
              max: null,
              label: null,
            },
            {
              pricing_option_id: 24,
              source_id: vehicle,
              min: values.min === "" ? null : values.min,
              max: values.max === "" ? null : values.max,
              label: null,
            },
            {
              pricing_option_id: 51,
              source_id: price_zone,
              min: null,
              max: null,
              label: null,
            },
          ],
        };

        if (dataEdit && copyProduct === false) {
          updatePriceAPI(editProductID, data)
            .then((resp) => {
              triggerUpdate();
              setAddNewTransportation(false);
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
        } else if (copyProduct || dataEdit === undefined || dataEdit === null) {
          postPricesAPI(data)
            .then((resp) => {
              triggerUpdate();
              setAddNewTransportation(false);
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
      } else {
        Swal.fire("Complete Required Fields");
      }
      refreshTable();
    },
  });

  const multipleRateCalcs = (value) => {
    const rate = setRateFormat(value);
    const net_rate = calcNetRate(
      validationType.values.public_price,
      rate,
      validationType.values.net_rate
    );
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
    validationType.setFieldValue("net_rate", net_rate);
    validationType.setFieldValue("commission", commission);
    validationType.setFieldValue("balance_due", balance_due);
    return rate;
  };

  const multipleOurPriceCalcs = (value) => {
    const our_price = setDecimalFormat(value);
    const you_save = calcYouSave(
      our_price,
      validationType.values.ship_price,
      validationType.values.compare_at,
      validationType.values.you_save
    );
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
    const eff_rate = calcEffRate(
      balance_due,
      our_price,
      validationType.values.eff_rate
    );
    const deposit = calcDeposit(
      our_price,
      priceCollectNameSelected,
      commission,
      validationType.values.deposit
    );

    validationType.setFieldValue("you_save", you_save);
    validationType.setFieldValue("eff_rate", eff_rate);
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

  return (
    <Modal
      centered
      size="xl"
      isOpen={addNewTransportation}
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
            + Copy Product - Transportation
          </h1>
        ) : null}
        {copyProduct === false && dataEdit ? (
          <h1 className="modal-title mt-0 text-white">
            + Edit Product - Transportation
          </h1>
        ) : null}
        {copyProduct === false && !dataEdit ? (
          <h1 className="modal-title mt-0 text-white">
            + New Product - Transportation
          </h1>
        ) : null}
        <button
          onClick={() => {
            setAddNewTransportation(false);
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
                src={TransportationImage}
                alt="new-product"
                className="w-100"
              />
            </Col>
            <Col className="col-9">
              {dataEdit ? (
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
              ) : null}
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
                      //   value={validationType.values.department || ""}
                    >
                      <option value={null}>Select.....</option>
                      {map(priceTypeData, (type, index) => {
                        return (
                          <option
                            key={index}
                            value={type.id}
                            selected={
                              dataEdit && dataEdit.pricedetails
                                ? type.id ===
                                  dataEdit.pricedetails.filter(
                                    (x) => x.pricing_option_id === 20
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
                      <option>Select....</option>
                      {map(priceOptions, (option, index) => {
                        return (
                          <option
                            key={index}
                            value={option.id}
                            selected={
                              dataEdit && dataEdit.pricedetails
                                ? option.id ===
                                  dataEdit.pricedetails.filter(
                                    (x) => x.pricing_option_id === 21
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
                <Col className="col">
                  <div className="form-outline">
                  <div className="d-flex justify-content-between">
                      <Label className="form-label">Collect*</Label>
                      <div>
                        <i
                          className="uil-question-circle font-size-15 mx-2"
                          id="collect"
                        />
                        <Tooltip
                          placement="right"
                          isOpen={ttop3}
                          target="collect"
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
                      //   value={validationType.values.department || ""}
                    >
                      <option>Select....</option>
                      {map(priceCollect, (collect, index) => {
                        return (
                          <option
                            key={index}
                            value={collect.id}
                            selected={
                              dataEdit && dataEdit.pricedetails
                                ? collect.id ===
                                  dataEdit.pricedetails.filter(
                                    (x) => x.pricing_option_id === 22
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
                        <option>Select....</option>
                        {map(priceSeason, (season, index) => {
                          return (
                            <option
                              key={index}
                              value={season.id}
                              selected={
                                dataEdit && dataEdit.pricedetails
                                  ? season.id ===
                                    dataEdit.pricedetails.filter(
                                      (x) => x.pricing_option_id === 31
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

                <Col className="col-3 d-flex">
                  {activeCheckbox !== null ? (
                    <div className="d-flex flex-column align-items-center w-50">
                      <Label className="form-label mt-2">Active</Label>
                      <div className="form-check form-switch form-switch-md">
                        <Input
                          name="active"
                          placeholder=""
                          type="checkbox"
                          checked={activeCheckbox}
                          className="form-check-input start-0"
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
                    <div className="d-flex flex-column align-items-center w-50">
                      <Label className="form-label mt-2">Balance Notify</Label>
                      <div className="form-check form-switch form-switch-md">
                        <Input
                          name="balance_checkbox"
                          placeholder=""
                          type="checkbox"
                          checked={balanceDueCheckbox}
                          className="form-check-input start-0"
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
                  Transfer Options
                </p>
              </Col>
              <Row className="d-flex">
                <Col className="col-2">
                  <div className="form-outline mb-2">
                    <Label className="form-label">Transfer Type*</Label>
                    <Input
                      type="select"
                      name=""
                      onChange={(e) => {
                        setPriceTransferTypeSelected(e.target.value);
                      }}
                      onBlur={validationType.handleBlur}
                      //   value={validationType.values.department || ""}
                    >
                      <option>Select....</option>
                      {map(priceTransferType, (transferType, index) => {
                        return (
                          <option
                            key={index}
                            value={transferType.id}
                            selected={
                              dataEdit && dataEdit.pricedetails
                                ? transferType.id ===
                                dataEdit.pricedetails.filter(
                                  (x) => x.pricing_option_id === 46
                                )[0]?.source_id
                                : false
                            }
                          >
                            {transferType.text}
                          </option>
                        );
                      })}
                    </Input>
                  </div>
                </Col>
                <Col className="col-2">
                  <div className="form-outline mb-2">
                    <Label className="form-label">Direction</Label>
                    <Input
                      type="select"
                      name=""
                      onChange={(e) => {
                        setPriceDirectionSelected(e.target.value);
                      }}
                      onBlur={validationType.handleBlur}
                      //   value={validationType.values.department || ""}
                    >
                      <option>Select....</option>
                      {map(priceDirection, (direction, index) => {
                        return (
                          <option
                            key={index}
                            value={direction.id}
                            selected={
                              dataEdit && dataEdit.pricedetails
                                ? direction.id ===
                                  dataEdit.pricedetails.filter(
                                    (x) => x.pricing_option_id === 49
                                  )[0]?.source_id
                                : false
                            }
                          >
                            {direction.text}
                          </option>
                        );
                      })}
                    </Input>
                  </div>
                </Col>
                <Col className="col-2">
                  <div className="form-outline mb-2">
                    <Label className="form-label">Vehicle</Label>
                    <Input
                      type="select"
                      name=""
                      onChange={(e) => {
                        setPriceVehicleSelected(e.target.value);
                      }}
                      onBlur={validationType.handleBlur}
                      //   value={validationType.values.department || ""}
                    >
                      <option>Select....</option>
                      {map(priceVehicle, (vehicle, index) => {
                        return (
                          <option
                            key={index}
                            value={vehicle.id}
                            selected={
                              dataEdit && dataEdit.pricedetails
                                ? vehicle.id ===
                                  dataEdit.pricedetails.filter(
                                    (x) => x.pricing_option_id === 24
                                  )[0]?.source_id
                                : false
                            }
                          >
                            {vehicle.text}
                          </option>
                        );
                      })}
                    </Input>
                  </div>
                </Col>
                <Col className="col-3">
                  <div className="form-outline mb-2">
                    <Label className="form-label">Zone Name</Label>
                    <Input
                      type="select"
                      name=""
                      onChange={(e) => {
                        setPriceZoneSelected(e.target.value);
                      }}
                      onBlur={validationType.handleBlur}
                      //   value={validationType.values.department || ""}
                    >
                      <option>Select....</option>
                      {map(priceZone, (zone, index) => {
                        return (
                          <option
                            key={index}
                            value={zone.id}
                            selected={
                              dataEdit && dataEdit.pricedetails
                                ? zone.id ===
                                  dataEdit.pricedetails.filter(
                                    (x) => x.pricing_option_id === 51
                                  )[0]?.source_id
                                : false
                            }
                          >
                            {zone.text}
                          </option>
                        );
                      })}
                    </Input>
                  </div>
                </Col>
                <Col className="col-3">
                  <div className="form-outline mb-2">
                    <Label className="form-label">Passangers</Label>
                    <div className="input-group">
                      <span
                        class="input-group-text form-label fw-bold bg-paradise text-white border-0"
                        id="basic-addon1"
                        style={{ fontSize: "0.85em" }}
                      >
                        Min
                      </span>
                      <Input
                        name="min"
                        placeholder="0"
                        className="me-1"
                        type="number"
                        min="0"
                        onChange={validationType.handleChange}
                        onBlur={validationType.handleBlur}
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
                      <span
                        class="input-group-text fw-bold bg-paradise text-white border-0 ms-1"
                        id="basic-addon1"
                        style={{ fontSize: "0.85em" }}
                      >
                        Max
                      </span>
                      <Input
                        name="max"
                        placeholder="0"
                        type="number"
                        min="0"
                        onChange={validationType.handleChange}
                        onBlur={validationType.handleBlur}
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
                      <Label className="form-label">Public Price*</Label>
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
                          The price refers to in our service agreement as the
                          "Public Price" or "Regular Price".
                        </Tooltip>
                      </div>
                    </div>
                    <div className="input-group">
                      <span
                        class="input-group-text form-label fw-bold bg-paradise text-white border-0"
                        id="basic-addon1"
                        style={{ fontSize: "0.85em" }}
                      >
                        $
                      </span>
                      <Input
                        name="public_price"
                        placeholder="0.00"
                        type="number"
                        min="0"
                        step="any"
                        onChange={validationType.handleChange}
                        onBlur={(e) => {
                          const value = e.target.value || "";
                          validationType.setFieldValue(
                            "public_price",
                            setDecimalFormat(value),
                            validationType.setFieldValue(
                              "net_rate",
                              calcNetRate(
                                validationType.values.public_price,
                                validationType.values.rate,
                                validationType.values.net_rate
                              )
                            )
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
                      {validationType.touched.public_price &&
                      validationType.errors.public_price ? (
                        <FormFeedback type="invalid">
                          {validationType.errors.public_price}
                        </FormFeedback>
                      ) : null}
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
                        class="input-group-text form-label fw-bold bg-paradise text-white border-0"
                        id="basic-addon1"
                        style={{ fontSize: "0.85em" }}
                      >
                        $
                      </span>
                      <Input
                        name="provider_price"
                        placeholder="0.00"
                        type="number"
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
                      {validationType.touched.provider_price &&
                      validationType.errors.provider_price ? (
                        <FormFeedback type="invalid">
                          {validationType.errors.provider_price}
                        </FormFeedback>
                      ) : null}
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
                          id="rate"
                        />
                        <Tooltip
                          placement="right"
                          isOpen={ttop7}
                          target="rate"
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
                   
                  </div>
                </Col>
                <Col className="col-2">
                  <div className="form-outline mb-2" id="net_rate">
                  <div className="d-flex justify-content-between">
                      <Label className="form-label">Net Rate</Label>
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
                        class="input-group-text form-label fw-bold bg-paradise text-white border-0"
                        id="basic-addon1"
                        style={{ fontSize: "0.85em" }}
                      >
                        $
                      </span>
                      <Input
                        name="net_rate"
                        placeholder="0.00"
                        type="number"
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
                      {validationType.touched.net_rate &&
                      validationType.errors.net_rate ? (
                        <FormFeedback type="invalid">
                          {validationType.errors.net_rate}
                        </FormFeedback>
                      ) : null}
                    </div>
                    
                  </div>
                </Col>
                <Col className="col-4">
                  <div className="form-outline mb-2" id="compare_at_url">
                    <Label className="form-label">"Compare At" URL</Label>
                    <Input
                      name="compare_at_url"
                      placeholder="https://provider.com/mitour.html"
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
                  <UncontrolledTooltip placement="top" target="compare_at_url">
                    The URL of the web page where the "compare at" price can be
                    verified.
                  </UncontrolledTooltip>
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
                <Col className="col-3">
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
                        class="input-group-text form-label fw-bold bg-paradise text-white border-0"
                        id="basic-addon1"
                        style={{ fontSize: "0.85em" }}
                      >
                        $
                      </span>
                      <Input
                        name="ship_price"
                        placeholder="0.00"
                        type="number"
                        min="0"
                        step="any"
                        onChange={validationType.handleChange}
                        onBlur={(e) => {
                          const value = e.target.value || "";
                          validationType.setFieldValue(
                            "ship_price",
                            setDecimalFormat(value),
                            validationType.setFieldValue(
                              "you_save",
                              calcYouSave(
                                validationType.values.our_price,
                                validationType.values.ship_price,
                                validationType.values.compare_at,
                                validationType.values.you_save
                              )
                            ),
                            validationType.handleBlur
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
                <Col className="col-3">
                  <div className="form-outline mb-2" id="compare_at">
                  <div className="d-flex justify-content-between">
                      <Label className="form-label">Compare At*</Label>
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
                        class="input-group-text form-label fw-bold bg-paradise text-white border-0"
                        id="basic-addon1"
                        style={{ fontSize: "0.85em" }}
                      >
                        $
                      </span>
                      <Input
                        name="compare_at"
                        placeholder="0.00"
                        type="number"
                        min="0"
                        step="any"
                        onChange={validationType.handleChange}
                        onBlur={(e) => {
                          const value = e.target.value || "";
                          validationType.setFieldValue(
                            "compare_at",
                            setDecimalFormat(value),
                            validationType.setFieldValue(
                              "you_save",
                              calcYouSave(
                                validationType.values.our_price,
                                validationType.values.ship_price,
                                validationType.values.compare_at,
                                validationType.values.you_save
                              )
                            ),
                            validationType.handleBlur
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
                <Col className="col-3">
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
                   
                  </div>
                </Col>
                <Col className="col-3">
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
                   
                  </div>
                </Col>
              </Row>
              <Row className="d-flex">
                <Col className="col-3">
                  <div className="form-outline mb-2" id="eff_rate">
                  <div className="d-flex justify-content-between">
                      <Label className="form-label">Eff. Rate*</Label>
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
                        placeholder="0.00"
                        type="number"
                        min="0"
                        step="any"
                        onChange={validationType.handleChange}
                        onBlur={(e) => {
                          const value = e.target.value || "";
                          validationType.setFieldValue(
                            "eff_rate",
                            setDecimalFormat(value)
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
                        class="input-group-text form-label fw-bold bg-paradise text-white border-0"
                        id="basic-addon1"
                        style={{ fontSize: "0.85em" }}
                      >
                        %
                      </span>
                    </div>
                    
                  </div>
                </Col>
                <Col className="col-3">
                  <div className="form-outline mb-2" id="commission">
                  <div className="d-flex justify-content-between">
                      <Label className="form-label">Commission*</Label>
                      <div>
                        <i
                          className="uil-question-circle font-size-15"
                          id="commission"
                        />
                        <Tooltip
                          placement="right"
                          isOpen={ttop15}
                          target="commission"
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
                      
                    </div>
                  </div>
                </Col>
                <Col className="col-3">
                  <div className="form-outline mb-2" id="deposit">
                  <div className="d-flex justify-content-between">
                      <Label className="form-label">Deposit*</Label>
                      <div>
                        <i
                          className="uil-question-circle font-size-15"
                          id="deposit"
                        />
                        <Tooltip
                          placement="right"
                          isOpen={ttop16}
                          target="deposit"
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
                  </div>
                </Col>
                <Col className="col-3">
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
                          The amount due to the provider on the day of the tour.
                        </Tooltip>
                      </div>
                    </div>
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
                            validationType.setFieldValue(
                              "eff_rate",
                              calcEffRate(
                                validationType.values.balance_due,
                                validationType.values.our_price,
                                validationType.values.eff_rate
                              )
                            ),
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
              <Row>
                <Col className="col-12 d-flex justify-content-end mt-4">
                  <Button
                    color="paradise"
                    outline
                    className="waves-effect waves-light col-2 mx-4"
                    type="button"
                    onClick={() => setAddNewTransportation(false)}
                  >
                    Close
                  </Button>
                  <Button
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
      </div>
    </Modal>
  );
};

export default AddNewTransportation;
