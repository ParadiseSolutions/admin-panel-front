import React, { useEffect, useState } from "react";
import OverriteDateImg from "../../../../Components/Assets/images/overriteDates.png";
import { createLocation } from "../../../../Utils/API/Locations";
import CheckBoxs from "./Components/checkboxs";
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
import Swal from "sweetalert2";

const AddNewOverriteDate = ({
  newOverriteDate,
  setNewOverriteDate,
  onClickAddLocation,
}) => {
  //initial data
  const [typeSelected, setTypeSelected] = useState(null);
console.log(typeSelected)

//checkbox list
const [daysList, setDayList] = useState([]);
const onAddDay = (day) => {
  const selection = +day;
  const selectionFlag = daysList.includes(selection);
  if (!selectionFlag) {
    setDayList([...daysList, +day]);
  }
  if (selectionFlag) {
    setDayList(daysList.filter((ele) => ele !== selection));
  }
};

  const validationType = useFormik({
    ableReinitialize: true,

    initialValues: {
      name: "",
    },
    validationSchema: Yup.object().shape({
      name: Yup.string().required("Name is required"),
    }),

    onSubmit: (values) => {
      let data = {
        name: values.name,
      };

      createLocation(data)
        .then((resp) => {
          if (resp.data.status === 201) {
            Swal.fire("Success!", "Location has been created", "success").then(
              () => {
                window.location.href = "/locations";
              }
            );
          }
        })
        .catch((error) => {
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
    },
  });
  return (
    <>
      <Modal
        size="lg"
        centered
        isOpen={newOverriteDate}
        toggle={() => {
          onClickAddLocation();
        }}
      >
        <div
          className="modal-header"
          style={{ backgroundColor: "#3DC7F4", border: "none" }}
        >
          <h1 className="modal-title mt-0 text-white">+ Calendar Override</h1>
          <button
            onClick={() => {
              setNewOverriteDate(false);
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
              <Col className="col-6 ">
                <img
                  src={OverriteDateImg}
                  alt="overrite"
                  style={{ width: "350px", height:'370px' }}
                />
              </Col>
              <Col className="col-6">
                <Row>
                  <Col className="col-6">
                    <div className="form-outline mb-4">
                      <Label className="form-label">Type</Label>
                      <Input
                        type="select"
                        name=""
                        onChange={(e) => {
                          setTypeSelected(e.target.value);
                        }}
                        onBlur={validationType.handleBlur}
                      >
                        <option>Select....</option>
                        <option value={'1'}>Range</option>
                        <option value={'2'}>Weekdays</option>
                        <option value={'3'}>Month</option>
                        <option value={'4'}>Fixed Date</option>
                        {/* {map(productsData, (product, index) => {
                        return (
                          <option key={index} value={product.id}>
                            {product.label}
                          </option>
                        );
                      })} */}
                      </Input>
                    </div>
                  </Col>
                  <Col className="col-6">
                    <div className="form-outline mb-4">
                      <Label className="form-label">Recurrency</Label>
                      <Input
                        type="select"
                        name=""
                        //   onChange={(e) => {
                        //     setProductSelected(e.target.value);
                        //   }}
                        onBlur={validationType.handleBlur}
                      >
                        <option>Select....</option>
                        {/* {map(productsData, (product, index) => {
                        return (
                          <option key={index} value={product.id}>
                            {product.label}
                          </option>
                        );
                      })} */}
                      </Input>
                    </div>
                  </Col>
                </Row>
                
                {typeSelected === '1' ? 
                  <Row>
                    <Col className="col-12">
                  <div className="form-outline my-3">
                    <div className="d-flex">
                      <div className="input-group">
                        <div className="input-group-text">From</div>
                        <Input
                          name="range_from_date"
                          className="form-control"
                          type="date"
                          // defaultValue="2019-08-19"
                          id="example-date-input"
                          onChange={validationType.handleChange}
                          onBlur={validationType.handleBlur}
                          value={validationType.values.range_from_date || ""}
                          invalid={
                            validationType.touched.range_from_date &&
                            validationType.errors.range_from_date
                              ? true
                              : false
                          }
                        />
                        {validationType.touched.range_from_date &&
                        validationType.errors.range_from_date ? (
                          <FormFeedback type="invalid">
                            {validationType.errors.range_from_date}
                          </FormFeedback>
                        ) : null}
                      </div>
                    </div>
                  </div>
                </Col>
                    <Col className="col-12">
                  <div className="form-outline my-3">
                    <div className="d-flex">
                      <div className="input-group">
                        <div className="input-group-text">To</div>
                        <Input
                          name="range_to_date"
                          className="form-control"
                          type="date"
                          // defaultValue="2019-08-19"
                          id="example-date-input"
                          onChange={validationType.handleChange}
                          onBlur={validationType.handleBlur}
                          value={validationType.values.range_to_date || ""}
                          invalid={
                            validationType.touched.range_to_date &&
                            validationType.errors.range_to_date
                              ? true
                              : false
                          }
                        />
                        {validationType.touched.range_to_date &&
                        validationType.errors.range_to_date ? (
                          <FormFeedback type="invalid">
                            {validationType.errors.range_to_date}
                          </FormFeedback>
                        ) : null}
                      </div>
                    </div>
                  </div>
                </Col>
                  </Row>
                : null}
                {typeSelected === '2' ? 
                  <Row>
                    <Col className="col-12">
                    <div className="form-outline mb-4">
                      <Label className="form-label">Choose</Label>
                      <Input
                        type="select"
                        name=""
                        //   onChange={(e) => {
                        //     setProductSelected(e.target.value);
                        //   }}
                        onBlur={validationType.handleBlur}
                      >
                        <option>Monday</option>
                        {/* {map(productsData, (product, index) => {
                        return (
                          <option key={index} value={product.id}>
                            {product.label}
                          </option>
                        );
                      })} */}
                      </Input>
                    </div>
                  </Col>
                    <Col className="col-12">
                  <div className="form-outline my-3">
                    <div className="d-flex">
                      <div className="input-group">
                        <div className="input-group-text">From</div>
                        <Input
                          name="weekdays_from_date"
                          className="form-control"
                          type="date"
                          // defaultValue="2019-08-19"
                          id="example-date-input"
                          onChange={validationType.handleChange}
                          onBlur={validationType.handleBlur}
                          value={validationType.values.weekdays_from_date || ""}
                          invalid={
                            validationType.touched.weekdays_from_date &&
                            validationType.errors.weekdays_from_date
                              ? true
                              : false
                          }
                        />
                        {validationType.touched.weekdays_from_date &&
                        validationType.errors.weekdays_from_date ? (
                          <FormFeedback type="invalid">
                            {validationType.errors.weekdays_from_date}
                          </FormFeedback>
                        ) : null}
                      </div>
                    </div>
                  </div>
                </Col>
                    <Col className="col-12">
                  <div className="form-outline my-3">
                    <div className="d-flex">
                      <div className="input-group">
                        <div className="input-group-text">To</div>
                        <Input
                          name="weekdays_to_date"
                          className="form-control"
                          type="date"
                          // defaultValue="2019-08-19"
                          id="example-date-input"
                          onChange={validationType.handleChange}
                          onBlur={validationType.handleBlur}
                          value={validationType.values.weekdays_to_date || ""}
                          invalid={
                            validationType.touched.weekdays_to_date &&
                            validationType.errors.weekdays_to_date
                              ? true
                              : false
                          }
                        />
                        {validationType.touched.weekdays_to_date &&
                        validationType.errors.weekdays_to_date ? (
                          <FormFeedback type="invalid">
                            {validationType.errors.weekdays_to_date}
                          </FormFeedback>
                        ) : null}
                      </div>
                    </div>
                  </div>
                </Col>
                  </Row>
                : null}
                {typeSelected === '3' ? 
                  <Row>
                     <CheckBoxs onAddDay={onAddDay} />
                  </Row>
                : null}
{typeSelected === '4' ? 
                  <Row>
                    <Col className="col-12">
                  <div className="form-outline my-3">
                    <div className="d-flex">
                      <div className="input-group">
                        <div className="input-group-text">Date</div>
                        <Input
                          name="fixed_date"
                          className="form-control"
                          type="date"
                          // defaultValue="2019-08-19"
                          id="example-date-input"
                          onChange={validationType.handleChange}
                          onBlur={validationType.handleBlur}
                          value={validationType.values.fixed_date || ""}
                          invalid={
                            validationType.touched.fixed_date &&
                            validationType.errors.fixed_date
                              ? true
                              : false
                          }
                        />
                        {validationType.touched.fixed_date &&
                        validationType.errors.fixed_date ? (
                          <FormFeedback type="invalid">
                            {validationType.errors.fixed_date}
                          </FormFeedback>
                        ) : null}
                      </div>
                    </div>
                  </div>
                </Col>
                    
                  </Row>
                : null}

                <Row>
                  <Col className="col-12 mt-2 d-flex justify-content-end">
                    <Button
                      type="submit"
                      style={{ backgroundColor: "#F6851F", border: "none" }}
                      className="waves-effect waves-light btn btn-success"
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

export default AddNewOverriteDate;
