import React, { useEffect, useState } from "react";
import {
  getTourAPI,
} from "../../../../Utils/API/Tours/setingsTemplate";
import { triggerUpdate } from "../../../../Utils/API/Tours";
import { updateAddonsInstructions } from "../../../../Utils/API/Tours/AddonsInstructions";
import {
  Row,
  Col,
  Modal,
  Form,
  Label,
  Input,
  Button,
} from "reactstrap";
import * as Yup from "yup";
import { useFormik } from "formik";
import Swal from "sweetalert2";

const AddonsInstructionModal = ({
  instructionModal,
  setInstructionModal,
  id,
}) => {
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
          return true
        });

        Swal.fire(
          "Error!",
          // {error.response.},
          String(errorMessages[0])
        );
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //console.log(initialData);
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
    validationSchema: Yup.object().shape({}),

    onSubmit: (values) => {
      let data = {
        // template_id: templateType,
        addons_title: titleExample,
        addons_details: instructionDescriptionExample,
      };
      updateAddonsInstructions(id, data)
        .then((resp) => {
          if (resp.data.status === 200) {
            triggerUpdate();
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
              <div style={{ width: "calc(100% - 500px)" }}>
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

                  <p
                    style={{
                      fontSize: "12px",
                      fontWeight: "lighter",
                      textAlign: "right",
                    }}
                  >
                    * Title should be max 50 chars
                  </p>
                </div>
                <div className="form-outline mb-2 col-11">
                  <Label className="form-label">Instruction Description</Label>
                  <Input
                    name="description"
                    placeholder=""
                    type="textarea"
                    style={{ height: 147 }}
                    onChange={(e) =>
                      setInstructionDescriptionExample(e.target.value)
                    }
                    value={instructionDescriptionExample}
                    maxLength={210}
                  />
                  <p
                    style={{
                      fontSize: "12px",
                      fontWeight: "lighter",
                      textAlign: "right",
                    }}
                  >
                    * Description should be max 210 chars
                  </p>
                </div>
              </div>
              <div style={{ width: "490px" }}>
                <div className="form-outline mb-2 col-11">
                  <Label className="form-label">Reserve Page Preview</Label>
                </div>
                <div
                  style={{
                    border: "1px solid #FFF1BD",
                    background: "#FFFAE7",
                    fontFamily: "Arial, sans-serif",
                    fontSize: "15px",
                    fontStyle: "normal",
                    fontWeight:"700",
                    textAlign: "center",
                    color: "#373737",
                    padding: "16px 24px"
                  }}
                >
                  {titleExample}
                  <p
                    name="instruction_description"
                    placeholder=""
                    style={{
                      fontsize: "12px",
                      marginBottom: "0",
                      fontWeight: "lighter"
                    }}
                  >
                    {instructionDescriptionExample}
                  </p>
                </div>
                {/* <img
                    src={TwoVariantsIMG2}
                    alt="two-variant"
                    style={{ width: "472.5px", marginTop: "-1px", marginLeft: "-1px"}}
                  /> */}
              </div>
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
