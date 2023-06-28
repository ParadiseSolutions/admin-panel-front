import React, { useEffect, useState } from "react";

import { createLocation } from "../../../../Utils/API/Locations";

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

const AddLocationModal = ({ addModal, setAddModal, onClickAddLocation }) => {
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
        isOpen={addModal}
        toggle={() => {
          onClickAddLocation();
        }}
      >
        <div
          className="modal-header"
          style={{ backgroundColor: "#3DC7F4", border: "none" }}
        >
          <h1 className="modal-title mt-0 text-white">+ Add New Tour Type</h1>
          <button
            onClick={() => {
              setAddModal(false);
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
                  <Col lg={3}>
                    <div className="form-outline mb-4">
                      <Label className="form-label">Location Name</Label>
                      <Input
                        name="name"
                        placeholder="Cozumel"
                        type="text"
                        onChange={validationType.handleChange}
                        onBlur={validationType.handleBlur}
                        value={validationType.values.name || ""}
                        invalid={
                          validationType.touched.name &&
                          validationType.errors.name
                            ? true
                            : false
                        }
                      />
                      {validationType.touched.name &&
                      validationType.errors.name ? (
                        <FormFeedback type="invalid">
                          {validationType.errors.name}
                        </FormFeedback>
                      ) : null}
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

export default AddLocationModal;
