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
} from "reactstrap";
import * as Yup from "yup";
import { useFormik } from "formik";
import {
  getPriceAPI,
  getPricingOptionsAPI,
  postPricesAPI,
  updatePriceAPI,
} from "../../../../Utils/API/Tours";
import { map } from "lodash";

const AddNewTransportation = ({
  newTransportation,
  setNewTransportation,
  editProductID,
  tourData,
}) => {

   //edit data
   const [dataEdit, setDataEdit] = useState();
   useEffect(() => {
     if (editProductID !== null) {
       getPriceAPI(editProductID).then((resp) => {
         setDataEdit(resp.data.data[0]);
       });
     }
   }, [editProductID]);
 
   console.log(dataEdit);
  //combo box request
  const [priceTypeData, setPriceTypeData] = useState([]);
  const [priceOptions, setPriceOptions] = useState([]);
  const [priceCollect, setPriceCollect] = useState([]);
  const [priceSeason, setPriceSeason] = useState([]);
  const [priceZone, setPriceZone] = useState([]);
  const [priceVehicle, setVehicleZone] = useState([]);
  const [priceTypeSelected, setPriceTypeSelected] = useState(dataEdit && dataEdit.pricedetails ? dataEdit.pricedetails[0].source_id : '');
  const [priceOptionSelected, setPriceOptionSelected] = useState(dataEdit && dataEdit.pricedetails ? dataEdit.pricedetails[1].source_id : '');
  const [priceCollectSelected, setPriceCollectSelected] = useState(dataEdit && dataEdit.pricedetails ? dataEdit.pricedetails[2].source_id : '');
  const [priceSeasonSelected, setPriceSeasonSelected] = useState(dataEdit && dataEdit.pricedetails ? dataEdit.pricedetails[3].source_id : '');
  const [priceZoneSelected, setPriceZoneSelected] = useState();
  const [priceVehicleSelected, setPriceVehicleSelected] = useState();
  useEffect(() => {
    if (newTransportation) {
      getPricingOptionsAPI(6).then((resp) => {
        setPriceTypeData(resp.data.data);
      });
      getPricingOptionsAPI(7).then((resp) => {
        setPriceOptions(resp.data.data);
      });
      getPricingOptionsAPI(9).then((resp) => {
        setPriceCollect(resp.data.data);
      });
      getPricingOptionsAPI(29).then((resp) => {
        setPriceSeason(resp.data.data);
      });
      getPricingOptionsAPI(42).then((resp) => {
        setPriceZone(resp.data.data);
      });
      getPricingOptionsAPI(24).then((resp) => {
        setVehicleZone(resp.data.data);
      });
    }
  }, [newTransportation]);
  const validationType = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,
    initialValues: {
      product_name: tourData ? tourData.name : "",
      sku: tourData ? tourData.sku : "",
      public_price: dataEdit ? dataEdit.public : "",
      provider_price: dataEdit ? dataEdit.public_price : "",
      rate: dataEdit ? dataEdit.rate : "",
      net_price: dataEdit ? dataEdit.net_price : "",
      compare_at_url: dataEdit ? dataEdit.compare_at_url : "",
      ship_price: dataEdit ? dataEdit.ship_price : "",
      compare_at: dataEdit ? dataEdit.compare_at : "",
      our_price: dataEdit ? dataEdit.price : "",
      you_save: dataEdit ? dataEdit.you_save : "",
      eff_rate: dataEdit ? dataEdit.eff_rate : "",
      commission: dataEdit ? dataEdit.commission : "",
      deposit: dataEdit ? dataEdit.deposit : "",
      balance_due: dataEdit ? dataEdit.balance_due : "",
    },
    // validationSchema: Yup.object().shape({
    //   first_name: Yup.string().required("First Name is required"),
    //   last_name: Yup.string().required("Last Name is required"),
    //   phone_number: Yup.string().required("Phone Number is required"),
    // }),
    onSubmit: (values) => {
      let data = {
        tour_id: tourData.id,
        sku: tourData.sku,
        public: values.public_price,
        provider_price: values.provider_price,
        rate: values.rate,
        net_price: values.net_price,
        compare_at_url: values.compare_at_url,
        ship_price: values.ship_price,
        compare_at: values.compare_at,
        price: values.our_price,
        you_save: values.you_save,
        eff_rate: values.eff_rate,
        commission: values.commission,
        deposit: values.deposit,
        balance_due: values.balance_due,
        price_details: [
          {
            pricing_option_id: 6,
            source_id: priceTypeSelected,
            min: null,
            max: null,
            label: null,
          },
          {
            pricing_option_id: 7,
            source_id: priceOptionSelected,
            min: null,
            max: null,
            label: null,
          },
          {
            pricing_option_id: 9,
            source_id: priceCollectSelected,
            min: 1,
            max: 3,
            label: "px",
          },
          {
            pricing_option_id: 29,
            source_id: priceSeasonSelected,
            min: null,
            max: null,
            label: null,
          },
          {
            pricing_option_id: 23,
            source_id: priceZoneSelected,
            min: null,
            max: null,
            label: null,
          },
          {
            pricing_option_id: 24,
            source_id: priceVehicleSelected,
            min: null,
            max: null,
            label: null,
          },
         
        ],
        
      };

      if (dataEdit) {
        updatePriceAPI(editProductID, data).then((resp) => {
          console.log(resp);
          setNewTransportation(false);
        });
      } else {
        postPricesAPI(data).then((resp) => {
          console.log(resp);
          setNewTransportation(false);
        });
      }
    },
  });
  return (
    <Modal
      centered
      size="xl"
      isOpen={newTransportation}
      toggle={() => {
        // onClickAddNew();
      }}
    >
      <div
        className="modal-header"
        style={{ backgroundColor: "#3DC7F4", border: "none" }}
      >
        <h1 className="modal-title mt-0 text-white">
          + New Product - Transportation
        </h1>
        <button
          onClick={() => {
            setNewTransportation(false);
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
            <Col className="col-3">
              <img
                src={TransportationImage}
                alt="new-product"
                style={{ height: "770px", width: "260px" }}
              />
            </Col>
            <Col className="col-9">
              <Row className="col-12 d-flex">
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
              <Row className="d-flex">
                <Col className="col-9 d-flex justify-content-between">
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
                          return (
                            <option key={index} value={type.id} selected={ dataEdit && dataEdit.pricedetails ? type.id === dataEdit.pricedetails[0].source_id : false}>
                              {type.text}
                            </option>
                          );
                        })}
                      </Input>
                    </div>
                  </Col>
                  <Col className="col-2">
                    <div className="form-outline">
                      <Label className="form-label">Price Option</Label>
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
                            <option key={index} value={option.id} selected={ dataEdit && dataEdit.pricedetails ?  option.id === dataEdit.pricedetails[1].source_id : false}>
                              {option.text}
                            </option>
                          );
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
                        }}
                        onBlur={validationType.handleBlur}
                        //   value={validationType.values.department || ""}
                      >
                        <option>Select....</option>
                        {map(priceCollect, (collect, index) => {
                          return (
                            <option key={index} value={collect.id} selected={ dataEdit && dataEdit.pricedetails ? collect.id === dataEdit.pricedetails[2].source_id : false}>
                              {collect.text}
                            </option>
                          );
                        })}
                      </Input>
                    </div>
                  </Col>
                  <Col className="col-2">
                    <div
                      className="form-outline"
                      style={{ marginRight: "20px", marginLeft: "-20px" }}
                    >
                      <Label className="form-label">Season</Label>
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
                            <option key={index} value={season.id} selected={dataEdit && dataEdit.pricedetails ? season.id === dataEdit.pricedetails[3].source_id: false}>
                              {season.text}
                            </option>
                          );
                        })}
                      </Input>
                    </div>
                  </Col>
                </Col>
                <Col className="col-3 d-flex justify-content-between">
                  <Col className="col-6">
                    <Label className="form-label mt-2">Active</Label>
                    <div className="form-check form-switch form-switch-md mx-2">
                      <Input
                        name="notification_email"
                        placeholder=""
                        type="checkbox"
                        className="form-check-input"
                        onChange={validationType.handleChange}
                        onBlur={validationType.handleBlur}
                        value={validationType.values.notification_email || ""}
                        invalid={
                          validationType.touched.notification_email &&
                          validationType.errors.notification_email
                            ? true
                            : false
                        }
                      />
                      {validationType.touched.notification_email &&
                      validationType.errors.notification_email ? (
                        <FormFeedback type="invalid">
                          {validationType.errors.notification_email}
                        </FormFeedback>
                      ) : null}
                    </div>
                  </Col>
                  <Col className="col-6">
                    <Label className="form-label mt-2">Balance Due</Label>
                    <div className="form-check form-switch form-switch-md mx-4">
                      <Input
                        name="notification_email"
                        placeholder=""
                        type="checkbox"
                        className="form-check-input"
                        onChange={validationType.handleChange}
                        onBlur={validationType.handleBlur}
                        value={validationType.values.notification_email || ""}
                        invalid={
                          validationType.touched.notification_email &&
                          validationType.errors.notification_email
                            ? true
                            : false
                        }
                      />
                      {validationType.touched.notification_email &&
                      validationType.errors.notification_email ? (
                        <FormFeedback type="invalid">
                          {validationType.errors.notification_email}
                        </FormFeedback>
                      ) : null}
                    </div>
                  </Col>
                </Col>
              </Row>
              <Row
                className="col-12 p-1 my-2"
                style={{ backgroundColor: "#E9F4FF" }}
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
                  Transfer Options
                </p>
              </Row>
              <Row className="col-12 d-flex">
                <Col className="col-2">
                  <div className="form-outline mb-2">
                    <Label className="form-label">Transfer Type</Label>
                    <Input
                      type="select"
                      name=""
                      // onChange={(e) =>{
                      //   setTourTypeID(e.target.value)
                      // }}
                      onBlur={validationType.handleBlur}
                      //   value={validationType.values.department || ""}
                    >
                      <option>Select....</option>
                      {/* {map(dataTourType, (tourType, index) => {
                                    return (
                                      <option key={index} value={tourType.id} selected={ tourData.type_id === tourType.id ? true : false }>
                                        {tourType.name}
                                      </option>
                                    );
                                  })} */}
                    </Input>
                  </div>
                </Col>
                <Col className="col-2">
                  <div className="form-outline mb-2">
                    <Label className="form-label">Direction</Label>
                    <Input
                      type="select"
                      name=""
                      // onChange={(e) =>{
                      //   setTourTypeID(e.target.value)
                      // }}
                      onBlur={validationType.handleBlur}
                      //   value={validationType.values.department || ""}
                    >
                      <option>Select....</option>
                      {/* {map(dataTourType, (tourType, index) => {
                                    return (
                                      <option key={index} value={tourType.id} selected={ tourData.type_id === tourType.id ? true : false }>
                                        {tourType.name}
                                      </option>
                                    );
                                  })} */}
                    </Input>
                  </div>
                </Col>
                <Col className="col-2">
                  <div className="form-outline mb-2">
                    <Label className="form-label">Vehicle</Label>
                    <Input
                      type="select"
                      name=""
                      onChange={(e) =>{
                        setPriceVehicleSelected(e.target.value)
                      }}
                      onBlur={validationType.handleBlur}
                      //   value={validationType.values.department || ""}
                    >
                      <option>Select....</option>
                      {map(priceVehicle, (vehicle, index) => {
                                    return (
                                      <option key={index} value={vehicle.id} >
                                        {vehicle.text}
                                      </option>
                                    );
                                  })}
                    </Input>
                  </div>
                </Col>
                <Col className="col-2">
                  <div className="form-outline mb-2">
                    <Label className="form-label">Zone Name</Label>
                    <Input
                      type="select"
                      name=""
                      onChange={(e) =>{
                        setPriceZoneSelected(e.target.value)
                      }}
                      onBlur={validationType.handleBlur}
                      //   value={validationType.values.department || ""}
                    >
                      <option>Select....</option>
                      {map(priceZone, (zone, index) => {
                        return (
                          <option key={index} value={zone.id}>
                            {zone.name}
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
                      name="first_name"
                      placeholder=""
                      type="text"
                      onChange={validationType.handleChange}
                      onBlur={validationType.handleBlur}
                      value={validationType.values.first_name || ""}
                      invalid={
                        validationType.touched.first_name &&
                        validationType.errors.first_name
                          ? true
                          : false
                      }
                    />
                    {validationType.touched.first_name &&
                    validationType.errors.first_name ? (
                      <FormFeedback type="invalid">
                        {validationType.errors.first_name}
                      </FormFeedback>
                    ) : null}
                  </div>
                </Col>

                <Col className="col-2">
                  <div className="form-outline mb-2">
                    <Label className="form-label">Max. Pax.</Label>
                    <Input
                      name="first_name"
                      placeholder=""
                      type="text"
                      onChange={validationType.handleChange}
                      onBlur={validationType.handleBlur}
                      value={validationType.values.first_name || ""}
                      invalid={
                        validationType.touched.first_name &&
                        validationType.errors.first_name
                          ? true
                          : false
                      }
                    />
                    {validationType.touched.first_name &&
                    validationType.errors.first_name ? (
                      <FormFeedback type="invalid">
                        {validationType.errors.first_name}
                      </FormFeedback>
                    ) : null}
                  </div>
                </Col>
              </Row>
              <Row
                className="col-12 p-1 my-2"
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
                  Provider Pricing
                </p>
              </Row>
              <Row className="col-12 d-flex">
                <Col className="col-2">
                  <div className="form-outline mb-2">
                    <Label className="form-label">Public Price</Label>
                    <Input
                      name="public_price"
                      placeholder=""
                      type="text"
                      onChange={validationType.handleChange}
                      onBlur={validationType.handleBlur}
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
                </Col>
                <Col className="col-2">
                  <div className="form-outline mb-2">
                    <Label className="form-label">Provider Price</Label>
                    <Input
                      name="provider_price"
                      placeholder=""
                      type="text"
                      onChange={validationType.handleChange}
                      onBlur={validationType.handleBlur}
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
                </Col>
                <Col className="col-2">
                  <div className="form-outline mb-2">
                    <Label className="form-label">Rate %</Label>
                    <Input
                      name="rate"
                      placeholder=""
                      type="text"
                      onChange={validationType.handleChange}
                      onBlur={validationType.handleBlur}
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
                  </div>
                </Col>
                <Col className="col-2">
                  <div className="form-outline mb-2">
                    <Label className="form-label">Net Rate</Label>
                    <Input
                      name="net_price"
                      placeholder=""
                      type="text"
                      onChange={validationType.handleChange}
                      onBlur={validationType.handleBlur}
                      value={validationType.values.net_price || ""}
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
                </Col>
                <Col className="col-4">
                  <div className="form-outline mb-2">
                    <Label className="form-label">"Compare At" URL</Label>
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
              <Row
                className="col-12 p-1 my-2"
                style={{ backgroundColor: "#FFFBC8" }}
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
                  Our Pricing
                </p>
              </Row>
              <Row className="col-12 d-flex">
                <Col className="col-3">
                  <div className="form-outline mb-2">
                    <Label className="form-label">Ship Price</Label>
                    <Input
                      name="ship_price"
                      placeholder=""
                      type="text"
                      onChange={validationType.handleChange}
                      onBlur={validationType.handleBlur}
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
                </Col>
                <Col className="col-3">
                  <div className="form-outline mb-2">
                    <Label className="form-label">Compare At</Label>
                    <Input
                      name="compare_at"
                      placeholder=""
                      type="text"
                      onChange={validationType.handleChange}
                      onBlur={validationType.handleBlur}
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
                </Col>
                <Col className="col-3">
                  <div className="form-outline mb-2">
                    <Label className="form-label">Our Price</Label>
                    <Input
                      name="our_price"
                      placeholder=""
                      type="text"
                      onChange={validationType.handleChange}
                      onBlur={validationType.handleBlur}
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
                </Col>
                <Col className="col-3">
                  <div className="form-outline mb-2">
                    <Label className="form-label">You Save</Label>
                    <Input
                      name="you_save"
                      placeholder=""
                      type="text"
                      onChange={validationType.handleChange}
                      onBlur={validationType.handleBlur}
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
                  </div>
                </Col>
              </Row>
              <Row className="col-12 d-flex">
                <Col className="col-3">
                  <div className="form-outline mb-2">
                    <Label className="form-label">Eff. Rate</Label>
                    <Input
                      name="eff_rate"
                      placeholder=""
                      type="text"
                      onChange={validationType.handleChange}
                      onBlur={validationType.handleBlur}
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
                  </div>
                </Col>
                <Col className="col-3">
                  <div className="form-outline mb-2">
                    <Label className="form-label">Commission</Label>
                    <Input
                      name="commission"
                      placeholder=""
                      type="text"
                      onChange={validationType.handleChange}
                      onBlur={validationType.handleBlur}
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
                </Col>
                <Col className="col-3">
                  <div className="form-outline mb-2">
                    <Label className="form-label">Deposit</Label>
                    <Input
                      name="deposit"
                      placeholder=""
                      type="text"
                      onChange={validationType.handleChange}
                      onBlur={validationType.handleBlur}
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
                </Col>
                <Col className="col-3">
                  <div className="form-outline mb-2">
                    <Label className="form-label">Balance Due</Label>
                    <Input
                      name="balance_due"
                      placeholder=""
                      type="text"
                      onChange={validationType.handleChange}
                      onBlur={validationType.handleBlur}
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
                </Col>
              </Row>
              <Row xl={12}>
                <Row
                  className="col-12 d-flex justify-content-end mt-4"
                  style={{ paddingRight: "30px" }}
                >
                  <Button
                    color="paradise"
                    outline
                    className="waves-effect waves-light col-2 mx-4"
                    type="button"
                    onClick={() => setNewTransportation(false)}
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
            </Col>
          </Row>
        </Form>
      </div>
    </Modal>
  );
};

export default AddNewTransportation;
