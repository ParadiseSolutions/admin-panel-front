import React from "react";
import { createTourType } from "../../../../Utils/API/TourTypes";
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

const AddTourTypeModal = ({ addModal, setAddModal, onClickAddTourType }) => {
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

      createTourType(data)
        .then((resp) => {
          if (resp.data.status === 201) {
            Swal.fire("Success!", "Tour Type has been created", "success").then(
              () => {
                window.location.href = "/tour-types";
              }
            );
          }
        })
        .catch((error) => {
          let errorMessages = [];
          Object.entries(error.response.data.data).map((item) => {
            errorMessages.push(item[1]);
            return true
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
          onClickAddTourType();
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
                      <Label className="form-label">Tour Type Name</Label>
                      <Input
                        name="name"
                        placeholder="Private Tour"
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

export default AddTourTypeModal;
