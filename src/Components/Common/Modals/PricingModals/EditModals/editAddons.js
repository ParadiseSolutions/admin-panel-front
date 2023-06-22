import { useEffect, useState } from "react";
import AddonsImage from "../../../../Assets/images/addons.png";
import {
  getPricingOptionsAPI,
  getAddonAPI,
  postAddonsAPI,
  putAddonAPI,
} from "../../../../../Utils/API/Tours";
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

const EditAddons = ({
  newAddon,
  setNewAddon,
  refreshTable,
  editProductID,
  tourData,
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

  // console.log("addons", dataEdit);

  //combo box request
  const [priceMatchQuantityData, setPriceMatchQuantityData] = useState([]);
  const [priceTypeData, setPriceTypeData] = useState([]);
  const [priceOptions, setPriceOptions] = useState([]);
  const [priceCollect, setPriceCollect] = useState([]);

  const [priceTypeSelected, setPriceTypeSelected] = useState(
    dataEdit ? dataEdit?.price_type_id : ""
  );
  const [priceOptionSelected, setPriceOptionSelected] = useState(
    dataEdit ? dataEdit?.price_option_id : ""
  );
  const [priceCollectSelected, setPriceCollectSelected] = useState(
    dataEdit ? dataEdit?.collect_id : ""
  );
  const [matchQuantitySelected, setMatchQuantitySelected] = useState(
    dataEdit ? dataEdit?.match_qty_id : ""
  );
  const [balance, setBalance] = useState(
    dataEdit?.active === 1 ? true : false
  );
  useEffect(() => {
    if (newAddon) {
      getPricingOptionsAPI(52).then((resp) => {
        setPriceMatchQuantityData(resp.data.data);
      });
      getPricingOptionsAPI(53).then((resp) => {
        setPriceTypeData(resp.data.data);
      });
      getPricingOptionsAPI(54).then((resp) => {
        setPriceOptions(resp.data.data);
      });
      getPricingOptionsAPI(55).then((resp) => {
        setPriceCollect(resp.data.data);
      });
      
    }

  }, [newAddon]);

  useEffect(() => {
    setBalance(dataEdit?.active === 1 ? true : false)
  }, [dataEdit]);


  // console.log(priceOptions);
  // console.log(priceTypeSelected);

  const validationType = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,
    initialValues: {
      product_name: tourData ? tourData.name : "",
      sku: tourData ? tourData.sku : "",
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
      title: "Masseuse ($300)",
      description: null,
      option_label: null,
      show_balance_due: balance,
      price: dataEdit?.price ? dataEdit?.price : "",
      you_save: dataEdit?.you_save ? dataEdit?.you_save : "",
      net_rate: dataEdit?.net_rate ? dataEdit?.net_rate : "",
      commission: dataEdit?.commission ? dataEdit?.commission : "",
      deposit: dataEdit?.deposit ? dataEdit?.deposit : "",
      net_price: dataEdit?.net_price ? dataEdit?.net_price : "",
      min_qty: dataEdit?.min_qty ? dataEdit?.min_qty : "",
      max_qty: dataEdit?.max_qty ? dataEdit?.max_qty : "",
    },
    validationSchema: Yup.object().shape({
      our_price: Yup.string().required("Field Require"),
      commission: Yup.string().required("Field Require"),
      deposit: Yup.string().required("Field Require"),
      balance_due: Yup.string().required("Field Require"),
    }),
    onSubmit: (values, {resetForm}) => {
      let data = {
        tour_id: tourData.id,
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
        // title: "Masseuse ($300)",
        // description: null,
        // option_label: null,
        show_balance_due: balance,
        price: values.price,
        you_save: values.you_save,
        net_rate: values.net_rate,
        commission: values.commission,
        deposit: values.deposit,
        net_price: values.net_price,
        min_qty: values.min_qty,
        max_qty: values.max_qty,
      };

      if (dataEdit) {
        putAddonAPI(editProductID, data).then((resp) => {
          // console.log(resp);
          setNewAddon(false);
          refreshTable();
          resetForm({values: ''})
        }).catch((error) => {
          let errorMessages = [];
          Object.entries(error.response.data.data).map((item) => {
            errorMessages.push(item[1]);
          });

          Swal.fire(
            "Error!",
            // {error.response.},
            String(errorMessages[0])
          );
        });
      } else {
        postAddonsAPI(data).then((resp) => {
          // console.log(resp);
          setNewAddon(false);
          refreshTable();
          resetForm({values: ''})
        }).catch((error) => {
          let errorMessages = [];
          Object.entries(error.response.data.data).map((item) => {
            errorMessages.push(item[1]);
          });

          Swal.fire(
            "Error!",
            // {error.response.},
            String(errorMessages[0])
          );
        });
      }
    },
  });
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
                <Col className="col-3">
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
                  <div className="form-outline mb-4">
                    <Label className="form-label">Our Price</Label>
                    <Input
                      name="price"
                      placeholder=""
                      type="text"
                      onChange={validationType.handleChange}
                      onBlur={validationType.handleBlur}
                      value={validationType.values.price || ""}
                      invalid={
                        validationType.touched.price &&
                        validationType.errors.price
                          ? true
                          : false
                      }
                    />
                    {validationType.touched.price &&
                    validationType.errors.price ? (
                      <FormFeedback type="invalid">
                        {validationType.errors.price}
                      </FormFeedback>
                    ) : null}
                  </div>
                </Col>
                <Col className="col-2">
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
                <Col className="col-2">
                  <div className="form-outline mb-4">
                    <Label className="form-label">Rate %</Label>
                    <Input
                      name="net_rate"
                      placeholder=""
                      type="text"
                      onChange={validationType.handleChange}
                      onBlur={validationType.handleBlur}
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
                </Col>
                <Col className="col-2">
                  <div className="form-outline mb-4">
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
                <Col className="col-2">
                  <div className="form-outline mb-4">
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
                <Col className="col-2">
                  <div className="form-outline mb-4">
                    <Label className="form-label">Net Price</Label>
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

export default EditAddons;
