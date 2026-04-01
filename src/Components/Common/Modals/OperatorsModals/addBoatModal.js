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
import axios from "axios";
import { map } from "lodash";
import {
  getCurrency,
  getExtraFee,
  getPriceType,
  postLocationBoat,
  postLocationFee,
  putBoatLocationFee,
  putLocationFee,
} from "../../../../Utils/API/Operators";
import { API_URL, imagesOptions } from "../../../../Utils/API";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

const AddBoatModal = ({
  id,
  locationModal,
  setLocationModal,
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
      setImageLink(dataEdit?.image_url || null);
    }
  }, [dataEdit]);

  console.log("data desde boat", dataEdit);

  // console.log(dataEdit.length);
  const validationType = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      title: dataEdit?.title ? dataEdit.title : "",
      meeting_location: dataEdit?.boat_location ? dataEdit.boat_location : "",
      google_maps_url: dataEdit?.google_maps_url
        ? dataEdit.google_maps_url
        : "",
      image_url: dataEdit?.image_url ? dataEdit.image_url : "",
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
        boat_location: values.meeting_location,
        google_maps_url: values.google_maps_url ? values.google_maps_url : "",
        image_url: values.image_url ? values.image_url : "",
      };
      // console.log(data);
      if (dataEdit.length === 0) {
        postLocationBoat(data)
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
              String(errorMessages[0]),
            );
          });
      } else {
        putBoatLocationFee(dataEdit.id, data)
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
              String(errorMessages[0]),
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
          setReadOnlyModal(false);
        }}
      >
        <div
          className="modal-header"
          style={{ backgroundColor: "#3DC7F4", border: "none" }}
        >
          <h1 className="modal-title mt-0 text-white">
            {dataEdit.length === 0
              ? "+ Add Boat Location"
              : readOnlyModal
                ? "View Boat Location"
                : "Edit Existing Boat Location"}
          </h1>
          <button
            onClick={() => {
              setLocationModal(false);
              setDataEdit([]);
              setReadOnlyModal(false);
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
                      <div className="d-flex align-items-center justify-content-between">
                        <Label className="form-label">Title</Label>
                        <div>
                          <i
                            className="uil-question-circle font-size-15"
                            id="ttitleTT"
                          />
                          <UncontrolledTooltip
                            autohide={true}
                            placement="top"
                            target="ttitleTT"
                          >
                            The Title is how the Meeting Location will show in
                            the admin panel, in the provider form drop-down and
                            our internal tools such as Adventure Finder.
                            <br />
                            <br />
                            It will not be shown on the voucher, and the
                            customer will not see it, only us and the provider.
                            <br />
                            <br />
                            This doesn't need to be the same name as the
                            provider calls it, just something that makes it
                            identifiable. Try to keep it standardized and
                            consistent using proper punctuation and
                            capitalization.
                            <br />
                            <br />
                            Examples:
                            <br />
                            <br />
                            Hotel (for Hotel Pick-Up)
                            <br />
                            Cruise Ship (for Cruise Pick-Up)
                            <br />
                            Mega Soriana
                            <br />
                            Coco Bongo
                            <br />
                            Plaza Antigua
                            <br />
                            <br />
                            Use clarifiers where there may be more than one, for
                            example Oxxo or Mega, where there may be that
                            location in Cancun and Playa del Carmen, such as
                            Mega Playa del Carmen or Oxxo Nuevo Vallarta.
                          </UncontrolledTooltip>
                        </div>
                      </div>
                      <div className="input-group">
                        <Input
                          name="title"
                          placeholder="e.g. Cancun Hotel"
                          disabled={readOnlyModal ? true : false}
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
                      <div className="d-flex align-items-center justify-content-between">
                        <Label className="form-label">Boat Location</Label>
                        <div>
                          <i
                            className="uil-question-circle font-size-15"
                            id="boatTT"
                          />
                          <UncontrolledTooltip
                            autohide={true}
                            placement="top"
                            target="boatTT"
                          >
                            This field is used to clarify where the boat is
                            located, for example if the Meeting Location is In
                            Front of Your Hotel Lobby if pick-up is included,
                            the Boat might be located at Punta Langosta Pier, Km
                            3.2 of the Cancun Hotel Zone.
                            <br />
                            If the meeting location is Cafe Bamboo at Marina
                            Puerto Aventuras, the boat location might be Row A,
                            Slip 12.
                            <br />
                            Boat Location is optional and only should be used if
                            the Meeting Location and Meeting Instructions don't
                            tell the whole story, such as at marinas or with
                            hotel pickup included.
                          </UncontrolledTooltip>
                        </div>
                      </div>
                      <div className="input-group">
                        <Input
                          name="meeting_location"
                          placeholder="e.g. In front of the main lobby of your hotel"
                          disabled={readOnlyModal ? true : false}
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
                      <div className="d-flex align-items-center justify-content-between">
                        <Label className="form-label">Google Maps URL</Label>
                        <div>
                          <i
                            className="uil-question-circle font-size-15"
                            id="googleMapsTT"
                          />
                          <UncontrolledTooltip
                            autohide={true}
                            placement="top"
                            target="googleMapsTT"
                          >
                            Upload a photo or map of the meeting location. This
                            is usually a screen snip taken from Google Maps
                            street view, but can also be a map or photograph.
                            <br />
                            Make sure the exact meeting location is clearly
                            noted in the image, use an arrow if you need to, to
                            avoid any confusion.
                            <br />
                            This will appear as a clickable link on the voucher.
                          </UncontrolledTooltip>
                        </div>
                      </div>
                      <div className="input-group">
                        <Input
                          name="google_maps_url"
                          // placeholder="e.g. Cancun Hotel"
                          disabled={readOnlyModal ? true : false}
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
                      <div className="d-flex align-items-center justify-content-between">
                        <div className="d-flex">
                          <Label className="form-label">Image URL</Label>
                          {imageLink && (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              height="18"
                              width="18"
                              className="mx-2"
                              viewBox="0 0 640 640"
                              style={{ cursor: "pointer" }}
                              onClick={() => {
                                window.open(
                                  imageLink,
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
                          disabled={readOnlyModal ? true : false}
                          onChange={(e) => {
                            const file = e.target.files[0];
                            const formData = new FormData();
                            formData.append("document", file);
                            formData.append(
                              "media_type_name",
                              "boat_location_image",
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
                                const url = response.data.data.url;
                                setImageLink(url);
                                validationType.setFieldValue("image_url", url);
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
                              setLocationModal(false);
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
                            setLocationModal(false);
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

export default AddBoatModal;
