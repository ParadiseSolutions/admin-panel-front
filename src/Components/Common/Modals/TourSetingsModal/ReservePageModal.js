import React, { useEffect, useState } from "react";
import OneVariantIMG from "../../../Assets/images/reservePages/onevariant.jpg";
import TwoVariantsIMG from "../../../Assets/images/reservePages/twovariants.jpg";
import TwoVariantsIMG2 from "../../../Assets/images/reservePages/twovariantspreview.jpg";
import ThreeVariantsIMG from "../../../Assets/images/reservePages/threevariants.jpg";
import ChoseActivityIMG from "../../../Assets/images/reservePages/chooseactivity.jpg";
import {
  getTourAPI,
  updateBookingSettings,
} from "../../../../Utils/API/Tours/setingsTemplate";
import { triggerUpdate } from "../../../../Utils/API/Tours";
import { Row, Col, Modal, Form, Label, Input, Button } from "reactstrap";
import * as Yup from "yup";
import { useFormik } from "formik";
import Swal from "sweetalert2";
const ReservePageModal = ({ reserveModal, setReserveModal, id }) => {
  const [instructionArea, setInstructionArea] = useState(false);
  const [titleExample, setTitleExample] = useState("Example Title");
  const [templateType, setTemplateType] = useState(1);
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
      setTitleExample(initialData.instructions_title);
      setInstructionDescriptionExample(initialData.instructions_details);
      setTemplateType(initialData.template_id);
    }
  }, [initialData]);

  const validationType = useFormik({
    enableReinitialize: true,
    initialValues: {
      description: "",
      title: "",
    },
    validationSchema: Yup.object().shape({
      // description: Yup.string().min(1).max(10).required(),
      // title: Yup.string().min(1).max(10).required()
      // description: Yup.string()
      //   .required("Description should be max 210 chars")
      //   .min(1)
      //   .max(210, "Description should be max 210 chars"),
      // title: Yup.string()
      // .min(1)
      // .max(50, "Title should be max 50 chars")
      // .required("Title should be max 50 chars")
      // code: Yup.string().required("Code is required"),
    }),

    onSubmit: (values) => {
      let data = {
        template_id: templateType,
        instructions_title: titleExample,
        instructions_details: instructionDescriptionExample,
      };
      updateBookingSettings(id, data)
        .then((resp) => {
          if (resp.data.status === 200) {
            Swal.fire(
              "Success!",
              "Booking Form Information has been edited",
              "success"
            ).then(() => {
              triggerUpdate();
              setReserveModal(!reserveModal);
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
        isOpen={reserveModal}
        toggle={() => {
          setReserveModal(!reserveModal);
        }}
      >
        <div
          className="modal-header"
          style={{ backgroundColor: "#3DC7F4", border: "none" }}
        >
          <h1 className="modal-title mt-0 text-white">
            {" "}
            + Reserve Page Set Up
          </h1>
          <button
            onClick={() => {
              setReserveModal(false);
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
            <Row>
              <Col className="col-12">
                <div
                  className="mb-4 py-2 px-3"
                  style={{ backgroundColor: "#FFEFDE" }}
                >
                  <p
                    className="fs-5"
                    style={{
                      fontWeight: "bold",
                      color: "#495057",
                      marginBottom: "0px",
                    }}
                  >
                    Choose Distribution Layout
                  </p>
                </div>
              </Col>
            </Row>
            <Row className="">
              <Col className="col-3">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="type1"
                    id="type1"
                    onChange={(e) => setTemplateType(+e.target.value)}
                    value={1}
                    checked={templateType === 1 ? true : false}
                  />
                  <label className="form-check-label" htmlFor="type1">
                    One Variant
                  </label>
                </div>
                <div className="col-1">
                  <img
                    src={OneVariantIMG}
                    alt="one-variant"
                    style={{
                      width: "350px",
                      margin: "10px",
                      marginTop: "13px",
                    }}
                  />
                </div>
              </Col>
              <Col className="col-3">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="type2"
                    id="type2"
                    onChange={(e) => setTemplateType(+e.target.value)}
                    value={2}
                    checked={templateType === 2 ? true : false}
                  />
                  <label className="form-check-label" htmlFor="type2">
                    Two Variants
                  </label>
                </div>
                <div className="col-1">
                  <img
                    src={TwoVariantsIMG2}
                    alt="one-variant"
                    style={{ width: "350px", margin: "10px" }}
                  />
                </div>
              </Col>
              <Col className="col-3">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="type3"
                    id="type3"
                    onChange={(e) => setTemplateType(+e.target.value)}
                    value={3}
                    checked={templateType === 3 ? true : false}
                  />
                  <label className="form-check-label" htmlFor="type3">
                    Three Variants
                  </label>
                </div>
                <div className="col-1">
                  <img
                    src={ThreeVariantsIMG}
                    alt="one-variant"
                    style={{ width: "350px", margin: "10px" }}
                  />
                </div>
              </Col>
              <Col className="col-3">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="type4"
                    id="type4"
                    onChange={(e) => setTemplateType(+e.target.value)}
                    value={4}
                    checked={templateType === 4 ? true : false}
                  />
                  <label className="form-check-label" htmlFor="type4">
                    Choose Activity
                  </label>
                </div>
                <div className="col-1">
                  <img
                    src={ChoseActivityIMG}
                    alt="one-variant"
                    style={{ width: "350px", margin: "10px" }}
                  />
                </div>
              </Col>
            </Row>
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
                  <div className="form-check form-switch form-switch-md mx-4 mt-2 ">
                    <Input
                      name="seasonality"
                      placeholder=""
                      type="checkbox"
                      // checked={seasonalPrice}
                      className="form-check-input"
                      onChange={() => setInstructionArea(!instructionArea)}
                      onBlur={validationType.handleBlur}
                      // value={seasonalPrice}
                    />
                  </div>
                </div>
              </Col>
            </Row>

            {instructionArea ? (
              <Row className="row-12">
                <div style={{width: "calc(100% - 500px)"}}>
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

                    <p style={{ fontSize: "12px", fontWeight: "lighter", textAlign: "right" }}>
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
                      style={{ height: 147 }}
                      onChange={(e) =>
                        setInstructionDescriptionExample(e.target.value)
                      }
                      value={instructionDescriptionExample}
                      maxLength={210}
                    />
                    <p style={{ fontSize: "12px", fontWeight: "lighter", textAlign: "right" }}>
                      * Description should be max 210 chars
                    </p>
                  </div>
                </div>
                <div style={{width:"490px"}}>
                  <div className="form-outline mb-2 col-11">
                    <Label className="form-label">
                      Reserve Page Preview
                    </Label>
                  </div>
                  <div
                    style={{
                      background: "#FFEEE6",
                      border: "1px solid #FFDECC",
                      borderRadius: "4px",
                      margin: "4px 0",
                      fontFamily: "Arial, sans-serif",
                      fontSize: "16px",
                      fontWeight: "bold",
                      textAlign: "center",
                      color: "#373737",
                      padding: "16px 24px",
                      borderRadius: "4px"
                    }}
                  >
                    <i
                      class="fa fa-info"
                      style={{
                        fontSize: "10px",
                        borderRadius: "29px",
                        border: "2px solid #D54500",
                        color: "#D54500",
                        padding: "1px 4px 3px 4px",
                        width: "16px",
                        height: "16px",
                        marginBottom: "4px"
                      }}
                    /><br></br>
                    {titleExample}
                    <p
                      name="instruction_description"
                      placeholder=""
                      style={{
                        marginBottom: "0",
                        fontFamily: "Arial",
                        fontStyle: "normal",
                        fontWeight: "400",
                        fontSize: "13px",
                        lineHeight: "17px",
                        marginTop: "8px",
                        textAlign: "center",
                        color: "#000000"
                      }}
                    >
                      {instructionDescriptionExample}
                    </p>
                  </div>
                  <img
                    src={templateType === 1 ? OneVariantIMG : templateType === 2 ? TwoVariantsIMG2 : templateType === 3 ? ThreeVariantsIMG : templateType === 4 ? ChoseActivityIMG : TwoVariantsIMG2}
                    alt="two-variant"
                    style={{ width: "472.5px", marginTop: "-1px", marginLeft: "-1px"}}
                  />
                </div>
              </Row>
            ) : null}
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

export default ReservePageModal;
