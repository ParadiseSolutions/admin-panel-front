import React, { useEffect, useState } from "react";
import {
  getTourAPI,
  updateBookingSettings,
} from "../../../../Utils/API/Tours/setingsTemplate";
import { updateAddonsInstructions } from "../../../../Utils/API/Tours/AddonsInstructions";
import {
  Row,
  Col,
  Modal,
  Form,
  Label,
  Input,
  Button,
  FormFeedback,
} from "reactstrap";
import * as Yup from "yup";
import { useFormik } from "formik";
import Swal from "sweetalert2";
import { map } from "lodash";

const AddonsInstructionModal = ({ instructionModal, setInstructionModal, id }) => {
  const [titleExample, setTitleExample] = useState("Example Title");
  const [instructionDescriptionExample, setInstructionDescriptionExample] =
    useState("");

  const [initialData, setInitialData] = useState();
  useEffect(() => {
    getTourAPI(id)
      .then((resp) => {
        setInitialData(resp.data.data);
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
  }, []);

  // console.log(initialData);
  useEffect(() => {
    if (initialData) {
      setTitleExample(initialData.addons_title);
      setInstructionDescriptionExample(initialData.addons_details);
    }
  }, [initialData]);

  const validationType = useFormik({
    enableReinitialize: true,
    initialValues: {
      description: "",
      title: "",
    },
    validationSchema: Yup.object().shape({
      
    }),

    onSubmit: (values) => {
      let data = {
        // template_id: templateType,
        addons_title: titleExample,
        addons_details: instructionDescriptionExample,
      };
      updateAddonsInstructions(id, data)
        .then((resp) => {
          if (resp.data.status === 200) {
            Swal.fire(
              "Success!",
              "Addons Instructions has been edited",
              "success"
            ).then(() => {
              setInstructionModal(!instructionModal);
            });
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
        size="xl"
        style={{ maxWidth: "1700px", width: "100%" }}
        isOpen={instructionModal}
        toggle={() => {
          setInstructionModal(!instructionModal);
        }}
      >
        <div
          className="modal-header"
          style={{ backgroundColor: "#3DC7F4", border: "none" }}
        >
          <h1 className="modal-title mt-0 text-white">
            {" "}
            Add Ons Instructions Set Up
          </h1>
          <button
            onClick={() => {
              setInstructionModal(false);
            }}
            type="button"
            className="close"
            data-dismiss="modal"
            aria-label="Close"
          >
            <span aria-hidden="true">&times;</span>
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
           
            <Row className="mt-4">
              <Col className="col-12">
                <div
                  className="mb-4 py-2 px-3 d-flex"
                  style={{ backgroundColor: "#3CC6F31A" }}
                >
                  <Label
                    className="fs-5 form-label mt-2"
                    style={{
                      fontSize: "20px",
                      fontWeight: "bold",
                      color: "#495057",
                      marginBottom: "0px",
                    }}
                  >
                    Add Instructions
                  </Label>
                  
                </div>
              </Col>
            </Row>

            
              <Row className="row-12">
                <Col>
                  <div className="form-outline mb-2 col-11">
                    <Label className="form-label">Instruction Title</Label>
                    <Input
                      name="title"
                      placeholder=""
                      type="text"
                      onChange={(e) => setTitleExample(e.target.value)}
                      value={titleExample}
                      maxLength={50}
                    />
                    
                      <p style={{fontSize: '12px', fontWeight:'lighter'}}>
                      * Title should be max 50 chars
                      </p>
                   
                  </div>
                  <div className="form-outline mb-2 col-11">
                    <Label className="form-label">
                      Instruction Description
                    </Label>
                    <Input
                      name="description"
                      placeholder=""
                      type="textarea"
                      style={{ height: 200 }}
                      onChange={(e) =>
                        setInstructionDescriptionExample(e.target.value)
                      }
                      value={instructionDescriptionExample}
                      maxLength={210}
                    />
                    <p style={{fontSize: '12px', fontWeight:'lighter'}}>
                      * Description should be max 210 chars
                      </p>
                  </div>
                </Col>
                <Col>
                  <Row
                    style={{
                      height: "285px",
                      backgroundColor: "#3CC6F31A",
                      marginTop: "28px",
                      marginRight: "5px",
                    }}
                    className="d-flex justify-content-center"
                  >
                    <Col className="col-12 m-2" style={{ color: "#495057" }}>
                      <p>
                        Please use the small preview of your title and text
                        shown below as a guide to make sure everything fits in
                        with the rest of the reserve page settings. This is a
                        small preview with the actual settings of a Reserve
                        Page. You have a maximum of 50 characters for the Title
                        Field and 210 characters for the Text Field.
                      </p>
                    </Col>
                    <Col className="col-12 d-flex justify-content-center">
                      <div className="form-outline mb-2">
                        <Input
                          name="Instruction_title"
                          placeholder=""
                          style={{
                            width: "425px",
                            height: "39px",
                            border: "1px solid #3CC6F380",
                            borderRadius: "4px",
                            textAlign: "center",
                            color: "#707070",
                            fontWeight: "bold",
                            fontSize: "16px",
                            fontFamily: "Arial, sans-serif",
                            fontWeight: "700"
                          }}
                          type="text"
                          value={titleExample}
                          disabled
                        />
                      </div>
                    </Col>
                    <Col className="col-12 d-flex justify-content-center">
                      <div className="form-outline mb-2">
                        <Input
                          name="instruction_description"
                          placeholder=""
                          style={{
                            width: "470px",
                            height: "90px",
                            border: "1px solid #3CC6F380",
                            borderRadius: "4px",
                            textAlign: "center",
                            fontFamily: "Arial, sans-serif",
                            fontSize: "13px",
                            fontWeight: "400",
                            lineHeight: "17px",
                            padding: "16px 24px"
                          }}
                          type="textarea"
                          value={instructionDescriptionExample}
                          disabled
                        />
                      </div>
                    </Col>
                  </Row>
                </Col>
              </Row>
            
            <Row className="row-12 d-flex justify-content-end mt-3">
              <Button type="submit" className="font-16 btn-orange col-1 mx-3">
                {" "}
                Save and Close
              </Button>
            </Row>
          </Form>
        </div>
      </Modal>
    </>
  );
};

export default AddonsInstructionModal;
