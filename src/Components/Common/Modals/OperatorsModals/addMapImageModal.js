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
import { useFormik } from "formik";
import Swal from "sweetalert2";
import { add, map } from "lodash";
import {
  getCurrency,
  getExtraFee,
  getPriceType,
  postExtraFee,
  postLocationFee,
  putAirportImages,
  putExtraFee,
  putLocationFee,
} from "../../../../Utils/API/Operators";
import { setDecimalFormat } from "../../../../Utils/CommonFunctions";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import axios from "axios";
import { API_URL, imagesOptions } from "../../../../Utils/API";

const AddMapImageModal = ({
  id,
  addAirportMapModal,
  setAddAirportMapModal,
  locationEditData,
  refreshTable,
  section,
  readOnlyModal,
  setReadOnlyModal,
  tourData,
}) => {
  const [extraFeeData, setExtraFeeData] = useState([]);
  const [dataEdit, setDataEdit] = useState([]);
  const [currencyData, setCurrencyData] = useState([]);
  const [priceTypeData, setPriceTypeData] = useState([]);
  const [optionalCheck, setOptionalCheck] = useState(false);
  const [extraFeeSelected, setExtraFeeSelected] = useState([]);
  const [currencySelected, setCurrencySelected] = useState([]);
  const [priceTypeSelected, setPriceTypeSelected] = useState([]);
  const [imageLink, setImageLink] = useState(null);
  const [airportMapImage, setAirportMapImage] = useState(null);
  const [meetingPointImage, setMeetingPointImage] = useState(null);

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
    setAirportMapImage(tourData?.airport_map_image_url || null);
      setMeetingPointImage(tourData?.meeting_point_image_url || null);
  }, [tourData, addAirportMapModal]);


  console.log("data edit map", tourData);

  // console.log(dataEdit.length);
  const validationType = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
    
      airport_map_image_url: tourData?.airport_map_image_url ? tourData.airport_map_image_url : "",
      meeting_point_image_url: tourData?.meeting_point_image_url ? tourData.meeting_point_image_url : "",
    
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
        airport_map_image_url:airportMapImage ?airportMapImage : "",
        meeting_point_image_url: meetingPointImage ? meetingPointImage : "",
     
      };
      // console.log(data);
      putAirportImages(tourData.id, data)
          .then((resp) => {
            // console.log(resp.data);
            if (resp.data.status === 200) {
              Swal.fire("Success!", "Airport Info Updated.", "success").then(() => {
                setAddAirportMapModal(false);
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
              String(errorMessages[0]),
            );
          });
    },
  });

  ////

  return (
    <>
      <Modal
        centered
        size="xl"
        isOpen={addAirportMapModal}
        toggle={() => {
          setAddAirportMapModal(false);
          setDataEdit([]);
          setReadOnlyModal(false);
        }}
      >
        <div
          className="modal-header"
          style={{ backgroundColor: "#3DC7F4", border: "none" }}
        >
          <h1 className="modal-title mt-0 text-white">
           + Set Up Airport Map
          </h1>
          <button
            onClick={() => {
              setAddAirportMapModal(false);
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
                  
                  <Col className="col-6">
                    <div className="form-outline mb-2 mx-2" id="amount">
                      <div className="d-flex align-items-center justify-content-between">
                        <div className="d-flex">
                          <Label className="form-label">Airport Map</Label>
                          {airportMapImage && (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              height="18"
                              width="18"
                              className="mx-2"
                              viewBox="0 0 640 640"
                              style={{ cursor: "pointer" }}
                              onClick={() => {
                                window.open(
                                  airportMapImage,
                                  "_blank",
                                  "noopener,noreferrer",
                                );
                              }}
                            >
                              <path d="M384 64C366.3 64 352 78.3 352 96C352 113.7 366.3 128 384 128L466.7 128L265.3 329.4C252.8 341.9 252.8 362.2 265.3 374.7C277.8 387.2 298.1 387.2 310.6 374.7L512 173.3L512 256C512 273.7 526.3 288 544 288C561.7 288 576 273.7 576 256L576 96C576 78.3 561.7 64 544 64L384 64zM144 160C99.8 160 64 195.8 64 240L64 496C64 540.2 99.8 576 144 576L400 576C444.2 576 480 540.2 480 496L480 416C480 398.3 465.7 384 448 384C430.3 384 416 398.3 416 416L416 496C416 504.8 408.8 512 400 512L144 512C135.2 512 128 504.8 128 496L128 240C128 231.2 135.2 224 144 224L224 224C241.7 224 256 209.7 256 192C256 174.3 241.7 160 224 160L144 160z" />
                            </svg>
                          )}
                        </div>
                        <div>
                          <i
                            className="uil-question-circle font-size-15"
                            id="upload_image"
                          />
                          <UncontrolledTooltip
                            autohide={true}
                            placement="top"
                            target="upload_image"
                          >
                            How the customer can find the meeting location. Be
                            as specific as needed, but don't restate the Meeting
                            Location Field. This is so they know what to do once
                            they get to the meeting location, where to stand,
                            what to look for, where to go, or maybe how to find
                            the meeting location.
                            <br />
                            Show your voucher at the guard shack at the marina
                            entrance. The guard will show you to your boat.
                            <br />
                            Once inside the marina, turn right at Lorenzillo's
                            Lobster house and walk toward the sign that says
                            "Dock 1", about 100 yards down on the right. Wait at
                            the sign and your captain will find you.
                            <br />
                            This field is optional, as sometimes the meeting
                            location is enough, such as in the case of In Front
                            of Your Hotel Lobby. Only need to add meeting
                            instructions if it makes sense and clarifies where
                            to go. This field will be shown just below the
                            Meeting Location on the voucher.
                          </UncontrolledTooltip>
                        </div>
                      </div>
                      <div className="input-group">
                        <Input
                          type="file"
                          id="fileInput"
                          name="file"
                          accept=".jpg, .jpeg, .png"
                          onChange={(e) => {
                            const file = e.target.files[0];
                            const formData = new FormData();
                            formData.append("document", file);
                            formData.append(
                              "media_type_name",
                              "airport_map_image",
                            );

                            axios
                              .post(
                                `${API_URL}/media-library/upload`,
                                formData,
                                {
                                  headers: imagesOptions,
                                },
                              )
                              .then((response) => {
                                console.log(
                                  "respuesta",
                                  response.data.data.url,
                                );
                                const url = response.data.data.url;
                                setAirportMapImage(url);
                                // validationType.setFieldValue("image_url", url);
                              })
                              .catch((error) => {
                                console.error(error);
                              });
                          }}
                        />
                      </div>
                    </div>
                  </Col>
                  <Col className="col-6">
                    <div className="form-outline mb-2 mx-2" id="amount">
                      <div className="d-flex align-items-center justify-content-between">
                        <div className="d-flex">
                          <Label className="form-label">Meeting Point Reference Image</Label>
                          {meetingPointImage && (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              height="18"
                              width="18"
                              className="mx-2"
                              viewBox="0 0 640 640"
                              style={{ cursor: "pointer" }}
                              onClick={() => {
                                window.open(
                                  meetingPointImage,
                                  "_blank",
                                  "noopener,noreferrer",
                                );
                              }}
                            >
                              <path d="M384 64C366.3 64 352 78.3 352 96C352 113.7 366.3 128 384 128L466.7 128L265.3 329.4C252.8 341.9 252.8 362.2 265.3 374.7C277.8 387.2 298.1 387.2 310.6 374.7L512 173.3L512 256C512 273.7 526.3 288 544 288C561.7 288 576 273.7 576 256L576 96C576 78.3 561.7 64 544 64L384 64zM144 160C99.8 160 64 195.8 64 240L64 496C64 540.2 99.8 576 144 576L400 576C444.2 576 480 540.2 480 496L480 416C480 398.3 465.7 384 448 384C430.3 384 416 398.3 416 416L416 496C416 504.8 408.8 512 400 512L144 512C135.2 512 128 504.8 128 496L128 240C128 231.2 135.2 224 144 224L224 224C241.7 224 256 209.7 256 192C256 174.3 241.7 160 224 160L144 160z" />
                            </svg>
                          )}
                        </div>
                        <div>
                          <i
                            className="uil-question-circle font-size-15"
                            id="upload_image"
                          />
                          <UncontrolledTooltip
                            autohide={true}
                            placement="top"
                            target="upload_image"
                          >
                            How the customer can find the meeting location. Be
                            as specific as needed, but don't restate the Meeting
                            Location Field. This is so they know what to do once
                            they get to the meeting location, where to stand,
                            what to look for, where to go, or maybe how to find
                            the meeting location.
                            <br />
                            Show your voucher at the guard shack at the marina
                            entrance. The guard will show you to your boat.
                            <br />
                            Once inside the marina, turn right at Lorenzillo's
                            Lobster house and walk toward the sign that says
                            "Dock 1", about 100 yards down on the right. Wait at
                            the sign and your captain will find you.
                            <br />
                            This field is optional, as sometimes the meeting
                            location is enough, such as in the case of In Front
                            of Your Hotel Lobby. Only need to add meeting
                            instructions if it makes sense and clarifies where
                            to go. This field will be shown just below the
                            Meeting Location on the voucher.
                          </UncontrolledTooltip>
                        </div>
                      </div>
                      <div className="input-group">
                        <Input
                          type="file"
                          id="fileInput"
                          name="file"
                          accept=".jpg, .jpeg, .png"
                          onChange={(e) => {
                            const file = e.target.files[0];
                            const formData = new FormData();
                            formData.append("document", file);
                            formData.append(
                              "media_type_name",
                              "meeting_point_image",
                            );

                            axios
                              .post(
                                `${API_URL}/media-library/upload`,
                                formData,
                                {
                                  headers: imagesOptions,
                                },
                              )
                              .then((response) => {
                                console.log(
                                  "respuesta",
                                  response.data.data.url,
                                );
                                const url = response.data.data.url;
                                setMeetingPointImage(url);
                                // validationType.setFieldValue("image_url", url);
                              })
                              .catch((error) => {
                                console.error(error);
                              });
                          }}
                        />
                      </div>
                    </div>
                  </Col>
                </Row>
            
                <Row>
                  <Col className="col-12 mt-4 d-flex justify-content-end">
                    {readOnlyModal ? (
                      <>
                        <Link to={`/operators/${tourData?.operator_id}`}>
                          <Button
                            type="button"
                            style={{ border: "none" }}
                            className="waves-effect waves-light mb-3 btn btn-paradise mx-2"
                            onClick={() => {
                              setAddAirportMapModal(false);
                              setDataEdit([]);
                              setReadOnlyModal(false);
                            }}
                          >
                            <i className="mdi mdi-plus me-1" />
                            Go to Operator
                          </Button>
                        </Link>

                        <Button
                          type="button"
                          style={{ backgroundColor: "#F6851F", border: "none" }}
                          className="waves-effect waves-light mb-3 btn btn-paradiseBlue"
                          onClick={() => {
                            setAddAirportMapModal(false);
                            setDataEdit([]);
                            setReadOnlyModal(false);
                          }}
                        >
                          <i className="mdi mdi-plus me-1" />
                          Close
                        </Button>
                      </>
                    ) : (
                      <Button
                        type="submit"
                        style={{ backgroundColor: "#F6851F", border: "none" }}
                        className="waves-effect waves-light mb-3 btn btn-success"
                      >
                        <i className="mdi mdi-plus me-1" />
                        Submit
                      </Button>
                    )}
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

export default AddMapImageModal;
