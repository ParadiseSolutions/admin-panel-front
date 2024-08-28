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
} from "reactstrap";
import newFeeImg from "../../../Assets/images/addfee.jpg";
import editFeeImg from "../../../Assets/images/editfee.jpg";
import { useFormik } from "formik";
import Swal from "sweetalert2";
import { map } from "lodash";
import {
  getCurrency,
  getExtraFee,
  getPriceType,
  postExtraFee,
  postLocationFee,
  putExtraFee,
  putLocationFee,
} from "../../../../Utils/API/Operators";
import { setDecimalFormat } from "../../../../Utils/CommonFunctions";

const AddLocationModal = ({
  id,
  locationModal,
  setLocationModal,
  locationEditData,
  refreshTable,
  section,
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
    setDataEdit(locationEditData);
  }, [locationEditData, locationModal]);
  useEffect(() => {
    if (dataEdit) {
      setExtraFeeSelected(dataEdit.fee_type_id);
      setCurrencySelected(dataEdit.currency);
      setPriceTypeSelected(dataEdit.price_type);
      setOptionalCheck(+dataEdit.optional === 1 ? true : false);
    }
  }, [dataEdit]);

  console.log(dataEdit);

  // console.log(dataEdit.length);
  const validationType = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      title: dataEdit?.title ? dataEdit.title : "",
      meeting_location: dataEdit?.meeting_location ? dataEdit.meeting_location : "",
      google_maps_url: dataEdit?.google_maps_url ? dataEdit.google_maps_url : "",
      image_url: dataEdit?.image_url ? dataEdit.google_maps_url : "",
      meeting_instructions: dataEdit?.meeting_instructions ? dataEdit.google_maps_url : "",
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
        title: values.title,
        meeting_location: values.meeting_location,
        google_maps_url:values.google_maps_url ? values.google_maps_url : '',
        image_url:values.image_url ? values.image_url : '',
        meeting_instructions: values.meeting_instructions
      };
      console.log(data);
      if (dataEdit.length === 0) {
        postLocationFee(data)
          .then((resp) => {
            // console.log(resp.data);
            if (resp.data.status === 201) {
              Swal.fire("Success!", "Location Added.", "success").then(() => {
                setLocationModal(false);
                //history.goBack()
                setDataEdit([]);
                refreshTable();
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
      } else {
        putLocationFee(dataEdit.id, data)
          .then((resp) => {
            // console.log(resp.data);
            if (resp.data.status === 200) {
              Swal.fire("Success!", "Location Edited.", "success").then(() => {
                setLocationModal(false);
                //history.goBack()
                setDataEdit([]);
                refreshTable();
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
        isOpen={locationModal}
        toggle={() => {
          setLocationModal(false);
          setDataEdit([]);
        }}
      >
        <div
          className="modal-header"
          style={{ backgroundColor: "#3DC7F4", border: "none" }}
        >
          <h1 className="modal-title mt-0 text-white">
            {dataEdit.length === 0
              ? "+ Add Meeting Location"
              : "Edit Existing Meeting Location"}
          </h1>
          <button
            onClick={() => {
              setLocationModal(false);
              setDataEdit([]);
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
              <Col className="col-12">
                <Row>
                  <img
                    src={dataEdit.length === 0 ? newFeeImg : editFeeImg}
                    alt="banner"
                    style={{ height: "158px" }}
                  />
                </Row>

                <Row className="mt-5">
                  <Col className="col-4">
                    <div className="form-outline mb-2 mx-2" id="amount">
                      <Label className="form-label">Title</Label>
                      <div className="input-group">
                        <Input
                          name="title"
                          placeholder="e.g. Cancun Hotel"
                          
                          onChange={validationType.handleChange}
                          
                          value={validationType.values.title || ""}
                          invalid={
                            validationType.touched.title &&
                            validationType.errors.title
                              ? true
                              : false
                          }
                        />
                        {validationType.touched.title &&
                        validationType.errors.title ? (
                          <FormFeedback type="invalid">
                            {validationType.errors.title}
                          </FormFeedback>
                        ) : null}
                      </div>
                    </div>
                  </Col>
                  <Col className="col-8">
                    <div className="form-outline mb-2 mx-2" id="amount">
                      <Label className="form-label">Location</Label>
                      <div className="input-group">
                        <Input
                          name="meeting_location"
                          placeholder="e.g. In front of the main lobby of your hotel"
                          
                          onChange={validationType.handleChange}
                         
                          value={validationType.values.meeting_location || ""}
                          invalid={
                            validationType.touched.meeting_location &&
                            validationType.errors.meeting_location
                              ? true
                              : false
                          }
                        />
                        {validationType.touched.meeting_location &&
                        validationType.errors.meeting_location ? (
                          <FormFeedback type="invalid">
                            {validationType.errors.meeting_location}
                          </FormFeedback>
                        ) : null}
                      </div>
                    </div>
                  </Col>
                </Row>
                <Row className="">
                  <Col className="col-6">
                    <div className="form-outline mb-2 mx-2" id="amount">
                      <Label className="form-label">Google Maps URL</Label>
                      <div className="input-group">
                        <Input
                          name="google_maps_url"
                          // placeholder="e.g. Cancun Hotel"
                          
                          onChange={validationType.handleChange}
                         
                          value={validationType.values.google_maps_url || ""}
                          invalid={
                            validationType.touched.google_maps_url &&
                            validationType.errors.google_maps_url
                              ? true
                              : false
                          }
                        />
                        {validationType.touched.google_maps_url &&
                        validationType.errors.google_maps_url ? (
                          <FormFeedback type="invalid">
                            {validationType.errors.google_maps_url}
                          </FormFeedback>
                        ) : null}
                      </div>
                    </div>
                  </Col>
                  <Col className="col-6">
                    <div className="form-outline mb-2 mx-2" id="amount">
                      <Label className="form-label">Image URL</Label>
                      <div className="input-group">
                        <Input
                          name="image_url"
                          // placeholder="e.g. In front of the main lobby of your hotel"
                          
                          onChange={validationType.handleChange}
                    
                          value={validationType.values.image_url || ""}
                          invalid={
                            validationType.touched.image_url &&
                            validationType.errors.image_url
                              ? true
                              : false
                          }
                        />
                        {validationType.touched.image_url &&
                        validationType.errors.image_url ? (
                          <FormFeedback type="invalid">
                            {validationType.errors.image_url}
                          </FormFeedback>
                        ) : null}
                      </div>
                    </div>
                  </Col>
                </Row>
                <Row className="">
                  <Col className="col-12">
                    <div className="form-outline mb-2 mx-2" id="amount">
                      <Label className="form-label">Meeting Instructions</Label>
                      <div className="input-group">
                        <Input
                          name="meeting_instructions"
                          type="textarea"
                          placeholder="e.g. Wait outside and look for a white van with a branded sign."
                          
                          onChange={validationType.handleChange}
                          value={validationType.values.meeting_instructions || ""}
                          invalid={
                            validationType.touched.meeting_instructions &&
                            validationType.errors.meeting_instructions
                              ? true
                              : false
                          }
                        />
                        {validationType.touched.meeting_instructions &&
                        validationType.errors.meeting_instructions ? (
                          <FormFeedback type="invalid">
                            {validationType.errors.meeting_instructions}
                          </FormFeedback>
                        ) : null}
                      </div>
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col className="col-12 mt-4 d-flex justify-content-end">
                    <Button
                      type="submit"
                      style={{ backgroundColor: "#F6851F", border: "none" }}
                      className="waves-effect waves-light mb-3 btn btn-success"
                    >
                      <i className="mdi mdi-plus me-1" />
                      Save and Close
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

export default AddLocationModal;
