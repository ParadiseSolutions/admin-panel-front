import React, { useEffect, useState } from "react";
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
import newFeeImg from "../../../Assets/images/addfee.jpg";
import editFeeImg from "../../../Assets/images/editfee.jpg";
import * as Yup from "yup";
import { useFormik } from "formik";
import Swal from "sweetalert2";
import { Select } from "antd";
import { map } from "lodash";
import {
  getCurrency,
  getExtraFee,
  getPriceType,
  postExtraFee,
  putExtraFee
} from "../../../../Utils/API/Operators";

const { Option } = Select;

const AddExtraFeeModal = ({
  id,
  extraFeeModal,
  setExtraFeeModal,
  extraFeeEditData,
  refreshTable,
  section
}) => {
  const [extraFeeData, setExtraFeeData] = useState([]);
  const [dataEdit, setDataEdit] = useState([]);
  const [currencyData, setCurrencyData] = useState([]);
  const [priceTypeData, setPriceTypeData] = useState([]);
  const [optionalCheck, setOptionalCheck] = useState(false);
  const [extraFeeSelected, setExtraFeeSelected] = useState([]);
  const [currencySelected, setCurrencySelected] = useState([]);
  const [priceTypeSelected, setPriceTypeSelected] = useState([]);

  useEffect(() => {
    getExtraFee()
      .then((resp) => {
        setExtraFeeData(resp.data.data);
      })
      .catch((err) => console.log(err));
    getCurrency()
      .then((resp) => {
        setCurrencyData(resp.data.data);
      })
      .catch((err) => console.log(err));
    getPriceType()
      .then((resp) => {
        setPriceTypeData(resp.data.data);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    if (extraFeeEditData) {
      setDataEdit(extraFeeEditData);
    }
  }, [extraFeeEditData]);
  useEffect(() => {
    if (dataEdit) {
      setExtraFeeSelected(dataEdit.fee_type_id)
      setCurrencySelected(dataEdit.currency)
      setPriceTypeSelected(dataEdit.price_type)
      setOptionalCheck(dataEdit.optional == 1 ? true : false)
    }
  }, [dataEdit]);

  // console.log(dataEdit);
  // console.log(dataEdit.length);
  const validationType = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      amount: dataEdit?.amount ? dataEdit.amount : "",
    },
    // validationSchema: Yup.object().shape({
    //   // cpanel_account: Yup.string().required("cPanel Account Name is required"),
    //   // root_folder: Yup.string().required("Root Folder Name is required"),
    //   // user_folder: Yup.string().required("User Folder Name is required"),
    //   // accent_color: Yup.string().required("Accent Color is required"),
    //   // primary_color: Yup.string().required("Primary Color is required"),
    //   // secondary_color: Yup.string().required("Secondary Color is required"),
    // }),
    onSubmit: (values) => {
      let data = {
        section: section,
        id: id,
        fee_type_id: extraFeeSelected,
        amount: values.amount,
        currency: currencySelected,
        price_type: priceTypeSelected,
        optional: optionalCheck === true ? 1 : 0,
      };
      console.log(data);
      if (dataEdit.length === 0) {
        postExtraFee(data)
        .then((resp) => {
          // console.log(resp.data);
          if (resp.data.status === 201) {
            Swal.fire("Success!", "Fee Added.", "success").then(() => {
              setExtraFeeModal(false);
              //history.goBack()
              setDataEdit([])
              refreshTable()
            });
          }
        })
        .catch((error) => {
          let errorMessages = [];
          Object.entries(error.response.data.data).map((item) => {
            return errorMessages.push(item[1]);
          });

          Swal.fire(
            "Error!",
            // {error.response.},
            String(errorMessages[0])
          );
        });
      }else{
        putExtraFee(dataEdit.fee_id, data)
        .then((resp) => {
          // console.log(resp.data);
          if (resp.data.status === 200) {
            Swal.fire("Success!", "Fee Edited.", "success").then(() => {
              setExtraFeeModal(false);
              //history.goBack()
              setDataEdit([])
              refreshTable()
            });
          }
        })
        .catch((error) => {
          let errorMessages = [];
          Object.entries(error.response.data.data).map((item) => {
            return errorMessages.push(item[1]);
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

  ////

  return (
    <>
      <Modal
        centered
        size="xl"
        isOpen={extraFeeModal}
        toggle={() => {
          setExtraFeeModal(false);
          setDataEdit([])
        }}
      >
        <div
          className="modal-header"
          style={{ backgroundColor: "#3DC7F4", border: "none" }}
        >
          <h1 className="modal-title mt-0 text-white">
            {dataEdit.length === 0
              ? "+ Add Fee to Voucher Template"
              : "Edit Existing Additional Fee"}
          </h1>
          <button
            onClick={() => {
              setExtraFeeModal(false);
              setDataEdit([])
            }}
            type="button"
            className="close"
            data-dismiss="modal"
            aria-label="Close"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>

        {
          //modal body
        }
        <div className="modal-body">
          <Form
            onSubmit={(e) => {
              e.preventDefault();
              validationType.handleSubmit();
              return false;
            }}
            className="custom-validation"
          >
            <Row>
              <Col className="col-12 mx-5">
                <Row>
                  <img
                    src={dataEdit.length === 0 ? newFeeImg : editFeeImg}
                    alt="banner"
                    style={{ height: "158px", width: "1048px" }}
                  />
                </Row>

                <Row className="mt-5">
                  <Col className="col-3">
                    <div className="form-outline mb-4">
                      <Label className="form-label">Fee Type</Label>
                      <Input
                        type="select"
                        name="match_qty_id"
                        onChange={(e) => {
                          setExtraFeeSelected(e.target.value);
                        }}
                        onBlur={validationType.handleBlur}
                        //   value={validationType.values.department || ""}
                        disabled={dataEdit?.length === 0 ? false : true}
                      >
                        <option>Select....</option>
                        {map(extraFeeData, (fee, index) => {
                          return (
                            <option
                              key={index}
                              value={fee.fee_type_id}
                              selected={
                                fee.fee_type_id === dataEdit?.fee_type_id
                                  ? true
                                  : false
                              }
                            >
                              {fee.fee_type}
                            </option>
                          );
                        })}
                      </Input>
                    </div>
                  </Col>
                  <Col className="col-2">
                    <div className="form-outline mb-2 mx-2" id="amount">
                      <Label className="form-label">Amount</Label>
                      <div className="input-group">
                        <span
                          class="input-group-text form-label fw-bold bg-paradise text-white border-0"
                          id="basic-addon1"
                          style={{ fontSize: "0.85em" }}
                        >
                          $
                        </span>
                        <Input
                          name="amount"
                          placeholder="0.00"
                          type="number"
                          min="0"
                          step="any"
                          onChange={validationType.handleChange}
                          onBlur={(e) => {
                            const value = e.target.value || "";
                            //  setOurPriceValue(value)

                            validationType.setFieldValue("amount", value);
                          }}
                          value={validationType.values.amount || ""}
                          invalid={
                            validationType.touched.amount &&
                            validationType.errors.amount
                              ? true
                              : false
                          }
                        />
                        {validationType.touched.amount &&
                        validationType.errors.amount ? (
                          <FormFeedback type="invalid">
                            {validationType.errors.amount}
                          </FormFeedback>
                        ) : null}
                      </div>
                    </div>
                  </Col>
                  <Col className="col-2">
                    <div className="form-outline mb-4">
                      <Label className="form-label">Currency</Label>
                      <Input
                        type="select"
                        name="match_qty_id"
                        onChange={(e) => {
                          setCurrencySelected(e.target.value);
                        }}
                        onBlur={validationType.handleBlur}
                        //   value={validationType.values.department || ""}
                      >
                        <option>Select....</option>
                        {map(currencyData, (currency, index) => {
                          return (
                            <option
                              key={index}
                              value={currency.currency_id}
                              selected={
                                currency.currency === dataEdit?.currency
                                ? true
                                : false
                              }
                            >
                              {currency.currency}
                            </option>
                          );
                        })}
                      </Input>
                    </div>
                  </Col>
                  <Col className="col-3">
                    <div className="form-outline mb-4">
                      <Label className="form-label">Price Type</Label>
                      <Input
                        type="select"
                        name="match_qty_id"
                        onChange={(e) => {
                          setPriceTypeSelected(e.target.value);
                        }}
                        onBlur={validationType.handleBlur}
                        //   value={validationType.values.department || ""}
                      >
                        <option>Select....</option>
                        {map(priceTypeData, (priceType, index) => {
                          return (
                            <option
                              key={index}
                              value={priceType.price_type_id}
                              selected={
                                priceType.price_type === dataEdit?.price_type
                                ? true
                                : false
                              }
                            >
                              {priceType.price_type}
                            </option>
                          );
                        })}
                      </Input>
                    </div>
                  </Col>
                  <Col className="col-2 mt-5">
                    <div className="form-outline mb-4">
                      <input
                        type="checkbox"
                        name="optional"
                        onChange={() => setOptionalCheck(!optionalCheck)}
                        checked={optionalCheck}
                      />
                      <Label className="form-label mx-2">optional</Label>
                    </div>
                  </Col>
                </Row>

                <Row>
                  <Col className="col-10 mx-4 mt-2 d-flex justify-content-end">
                    <Button
                      type="submit"
                      style={{ backgroundColor: "#F6851F", border: "none" }}
                      className="waves-effect waves-light mb-3 btn btn-success"
                    >
                      <i className="mdi mdi-plus me-1" />
                      Submit
                    </Button>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Form>
        </div>
      </Modal>
    </>
  );
};

export default AddExtraFeeModal;
