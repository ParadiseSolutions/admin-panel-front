import { useEffect, useState } from "react";
import NewProductPricingImage from "../../../Assets/images/newProductPricing.png";
import {
  getPricingOptionsAPI,
  postPricesAPI,
  getPriceAPI,
  updatePriceAPI,
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
} from "reactstrap";
import * as Yup from "yup";
import { useFormik } from "formik";
import { map } from "lodash";
import Swal from "sweetalert2";

const AddNewProductPricing = ({
  addNewProduct,
  setAddNewProduct,
  refreshTable,
  editProductID,
  tourData,
  copyProduct,
}) => {
  //edit data
  const [dataEdit, setDataEdit] = useState();

  
  let id = "";
  id = editProductID;

  useEffect(() => {
    setPriceTypeSelected("")
    setPriceOptionSelected("")
    setPriceCollectSelected("")
    setPriceSeasonSelected("")
    if (id) {
      getPriceAPI(id).then((resp) => {
        // console.log(
        //   "data que viene al editar-------------------",
        //   resp.data.data
        // );
        setDataEdit(resp.data.data[0]);
      });
    } else {
      setDataEdit(null)
    }
  }, [id, addNewProduct]);
  
  //combo box request
  const [priceTypeData, setPriceTypeData] = useState([]);
  const [priceOptions, setPriceOptions] = useState([]);
  const [priceCollect, setPriceCollect] = useState([]);
  const [priceSeason, setPriceSeason] = useState([]);
  const [priceTypeSelected, setPriceTypeSelected] = useState("");
  const [priceOptionSelected, setPriceOptionSelected] = useState("");
  const [priceCollectSelected, setPriceCollectSelected] = useState("");
  const [priceSeasonSelected, setPriceSeasonSelected] = useState("");
  useEffect(() => {
    if (addNewProduct) {
      getPricingOptionsAPI(1).then((resp) => {
        setPriceTypeData(resp.data.data);
      });
      getPricingOptionsAPI(2).then((resp) => {
        setPriceOptions(resp.data.data);
      });
      getPricingOptionsAPI(4).then((resp) => {
        setPriceCollect(resp.data.data);
      });
      getPricingOptionsAPI(28).then((resp) => {
        setPriceSeason(resp.data.data);
      });
    }
  }, [addNewProduct]);

  //checkbox
  const [activeCheckbox, setActiveCheckbox] = useState(null);
  const [balanceDueCheckbox, setBalanceDueCheckbox] = useState(null);

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
  // console.log(dataEdit);
  const validationType = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,
    initialValues: {
      product_name: tourData ? tourData.name : "",
      sku: dataEdit ? dataEdit.sku : "",
      public_price: dataEdit ? dataEdit.public : "",
      provider_price: dataEdit ? dataEdit.provider_price : "",
      rate: dataEdit ? dataEdit.rate : "",
      net_price: dataEdit ? dataEdit.net_rate : "",
      compare_at_url: dataEdit ? dataEdit.compare_at_url : "",
      ship_price: dataEdit ? dataEdit.ship_price : "",
      compare_at: dataEdit ? dataEdit.compare_at : "",
      our_price: dataEdit ? dataEdit.price : "",
      you_save: dataEdit ? dataEdit.you_save : "",
      eff_rate: dataEdit ? dataEdit.eff_rate : "",
      commission: dataEdit ? dataEdit.commission : "",
      deposit: dataEdit ? dataEdit.deposit : "",
      balance_due: dataEdit ? dataEdit.net_price : "",
      active: dataEdit?.active ? 1 : 0,
      balance_checkbox: dataEdit?.show_balance_due ? 1 : 0,
    },
    validationSchema: Yup.object().shape({
      our_price: Yup.string().required("Field Require"),
      commission: Yup.string().required("Field Require"),
      deposit: Yup.string().required("Field Require"),
      balance_due: Yup.string().required("Field Require"),
    }),
    onSubmit: (values, { resetForm }) => {
      let price_type = (priceTypeSelected == '' || priceTypeSelected === undefined)?(dataEdit && dataEdit.pricedetails
        ? dataEdit.pricedetails[0].source_id
        : null):priceTypeSelected

      let price_option = (priceOptionSelected == '' || priceOptionSelected === undefined)?(dataEdit && dataEdit.pricedetails
        ? dataEdit.pricedetails[1].source_id
        : null):priceOptionSelected

      let price_collect = (priceCollectSelected == '' || priceCollectSelected === undefined)?(dataEdit && dataEdit.pricedetails
        ? dataEdit.pricedetails[2].source_id
        : null):priceCollectSelected

      let price_season = (priceSeasonSelected == '' || priceSeasonSelected === undefined)?(dataEdit && dataEdit.pricedetails
        ? (dataEdit.pricedetails[3]?.source_id === undefined?null:dataEdit.pricedetails[3]?.source_id)
        : null):priceSeasonSelected
      
      if(price_type && price_option && price_collect) {
        let data = {
          tour_id: tourData.id,
          public: values.public_price,
          provider_price: values.provider_price,
          rate: values.rate,
          net_rate: values.net_price,
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
              pricing_option_id: 1,
              source_id: price_type,
              min: null,
              max: null,
              label: null,
            },
            {
              pricing_option_id: 2,
              source_id: price_option,
              min: null,
              max: null,
              label: null,
            },
            {
              pricing_option_id: 4,
              source_id: price_collect,
                min: null,
                max: null,
                label: null,
            },
            {
              pricing_option_id: 28,
              source_id: price_season,
              min: null,
              max: null,
              label: null,
            },
          ],
        };
        
        if (dataEdit && copyProduct === false) {
          updatePriceAPI(editProductID, data).then((resp) => {
            setAddNewProduct(false);
            refreshTable();
            resetForm({ values: "" });
          }).catch((error) => {
            Swal.fire("Error. Please check your info before retry")
            console.log(error.response)
          });
        } else if (copyProduct || dataEdit === undefined || dataEdit == null) {
          postPricesAPI(data).then((resp) => {
            setAddNewProduct(false);
            refreshTable();
            resetForm({ values: "" });
          }).catch((error) => {
            Swal.fire("Error. Please check your info before retry")
            console.log(error.response)
          });
        }
      } else {
        Swal.fire('Complete Required Fields')
      }
      refreshTable();
    },
  });
  return (
    <Modal
      centered
      className="modal-xl"
      isOpen={addNewProduct}
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
            <h1 className="modal-title mt-0 text-white">+ Copy Product - Tour</h1>
          ) : null
        }
        {
          copyProduct == false && dataEdit ?
          (
            <h1 className="modal-title mt-0 text-white">+ Edit Product - Tour</h1>
          ) : null
        }
        {
          copyProduct == false && !dataEdit ?
          (
            <h1 className="modal-title mt-0 text-white">+ New Product - Tour</h1>
          ) : null
        }
        
        <button
          onClick={() => {
            setAddNewProduct(false);
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
                src={NewProductPricingImage}
                alt="new-product"
                className="w-100"
              />
            </Col>
            <Col className="col-9">
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
              <Row className="d-flex">                
                <Col className="col">
                  <div className="form-outline">
                    <Label className="form-label">Price Type*</Label>
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
                          <option
                            key={index}
                            value={type.id}
                            selected={
                              dataEdit && dataEdit.pricedetails
                                ? type.id ===
                                  dataEdit.pricedetails[0].source_id
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
                    <Label className="form-label">Price Option*</Label>
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
                                  dataEdit.pricedetails[1].source_id
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
                    <Label className="form-label">Collect*</Label>
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
                          <option
                            key={index}
                            value={collect.id}
                            selected={
                              dataEdit && dataEdit.pricedetails
                                ? collect.id ===
                                  dataEdit.pricedetails[2].source_id
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
                        <option>Select....</option>
                        {map(priceSeason, (season, index) => {
                          return (
                            <option
                              key={index}
                              value={season.id}
                              selected={
                                dataEdit &&
                                dataEdit.pricedetails &&
                                dataEdit.pricedetails.length > 3
                                  ? season.id ===
                                    dataEdit.pricedetails[3]?.source_id
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
                      <Label className="form-label mt-2">Balance Due</Label>
                      <div className="form-check form-switch form-switch-md">
                        <Input
                          name="balance_checkbox"
                          placeholder=""
                          type="checkbox"
                          checked={balanceDueCheckbox}
                          className="form-check-input start-0"
                          onChange={() => onChangeBalanceDueToggle()}
                          onBlur={validationType.handleBlur}
                          value={
                            validationType.values.balance_checkbox || ""
                          }
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
                className="col-12 p-1 mt-4 mb-2"
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
                  Provider Pricing
                </p>
              </Col>
              <Row className="d-flex">
                <Col className="col-2">
                  <div className="form-outline mb-4">
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
                  <div className="form-outline mb-4">
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
                  <div className="form-outline mb-4">
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
                  <div className="form-outline mb-4">
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
                        {validationType.errors.net_rate}
                      </FormFeedback>
                    ) : null}
                  </div>
                </Col>
                <Col className="col-4">
                  <div className="form-outline mb-4">
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
              <Col
                className="col-12 p-1 mb-2"
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
                  Our Pricing
                </p>
              </Col>
              <Row className="d-flex">
                <Col className="col-3">
                  <div className="form-outline mb-4">
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
                  <div className="form-outline mb-4">
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
                  <div className="form-outline mb-4">
                    <Label className="form-label">Our Price*</Label>
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
                  <div className="form-outline mb-4">
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
              <Row className="d-flex">
                <Col className="col-3">
                  <div className="form-outline mb-4">
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
                  <div className="form-outline mb-4">
                    <Label className="form-label">Commission*</Label>
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
                  <div className="form-outline mb-4">
                    <Label className="form-label">Deposit*</Label>
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
                  <div className="form-outline mb-4">
                    <Label className="form-label">Balance Due*</Label>
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
            </Col>
          </Row>
          <Row>
            <Col
              className="col-12 d-flex justify-content-end mt-5"
              
            >
              <Button
                color="paradise"
                outline
                className="waves-effect waves-light col-2 mx-4"
                type="button"
                onClick={() => setAddNewProduct(false)}
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
        </Form>
      </div>
    </Modal>
  );
};

export default AddNewProductPricing;
