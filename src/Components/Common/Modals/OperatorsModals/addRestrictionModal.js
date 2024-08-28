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
  postLocationBoat,
  postLocationFee,
  postRestriction,
  putBoatLocationFee,
  putLocationFee,
  putRestriction,
} from "../../../../Utils/API/Operators";

const AddRestrictionModal = ({
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
      restriction: dataEdit?.restriction ? dataEdit.restriction : "",
      
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
        restriction: values.restriction,
        
      };
      console.log(data);
      if (dataEdit.length === 0) {
        postRestriction(data)
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
        putRestriction(dataEdit.id, data)
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
              ? "+ Add Restriction"
              : "Edit Existing Restriction"}
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
                  <Col className="col-12">
                    <div className="form-outline mb-2 mx-2" id="amount">
                      <Label className="form-label">Write Restriction</Label>
                      <div className="input-group">
                        <Input
                          name="restriction"
                          placeholder=""
                          
                          onChange={validationType.handleChange}
                          
                          value={validationType.values.restriction || ""}
                          invalid={
                            validationType.touched.restriction &&
                            validationType.errors.restriction
                              ? true
                              : false
                          }
                        />
                        {validationType.touched.restriction &&
                        validationType.errors.restriction ? (
                          <FormFeedback type="invalid">
                            {validationType.errors.restriction}
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

export default AddRestrictionModal;
