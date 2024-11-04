import { useEffect, useState } from "react";
import AddExtraFeeModal from "../../../Components/Common/Modals/OperatorsModals/addExtraFeeModal";
import {
  Form,
  Row,
  Input,
  Col,
  FormFeedback,
  Button,
  Table,
  Card,
  UncontrolledTooltip,
  Tooltip,
} from "reactstrap";
import * as Yup from "yup";
import { useFormik } from "formik";
import Swal from "sweetalert2";
import { Select } from "antd";
import {
  getBringList,
  getChannels,
  getSendVoucherFromAPI,
  getVoucherChannels,
} from "../../../Utils/API/Operators";
import { map } from "lodash";
import { Option } from "antd/lib/mentions";
import {
  deleteExtraFeeTours,
  getAdditionalFeeTable,
  getVoucherInfoTours,
  putVoucherInformationTours,
  getBoatLocationToursTable,
  getRestrictionsToursTable,
  getMeetingLocationToursTable,
  deleteBoatLocationsTours,
  deleteMeetingLocationsTours,
  deleteRestrictionTours,
} from "../../../Utils/API/Tours/TemplatesAPI";
import ReservePageModal from "../../../Components/Common/Modals/TourSetingsModal/ReservePageModal";
import { getNotyfyChannelAPI } from "../../../Utils/API/Providers";
import AddLocationModal from "../../../Components/Common/Modals/OperatorsModals/addLocationModal";
import AddBoatModal from "../../../Components/Common/Modals/OperatorsModals/addBoatModal";
import AddRestrictionModal from "../../../Components/Common/Modals/OperatorsModals/addRestrictionModal";

const AutomatedConfirmation = ({ tourData, id }) => {
  const tourID = tourData?.id;
  const [extraFeeInitialData, setExtraFeeInitialData] = useState({});
  const [bringListInitialData, setBringListInitialData] = useState([]);
  const [initialOptionsArea, setInitialOptionsArea] = useState([]);
  const [selectionID, setSelectionID] = useState({});
  const [voucherInitialData, setVoucherInitialData] = useState();
  const [extraFeeEditData, setExtraFeeEditData] = useState([]);
  const [restrictionList, setRestrictionList] = useState([]);
  const [channelList, setChannelList] = useState([]);
  const [primaryContactChannelSelected, setPrimaryContactChannelSelected] =
    useState();
  const [secondaryContactChannelSelected, setSecondaryContactChannelSelected] =
    useState();
  const [voucherSendSelected, setVoucherSendSelected] = useState([]);
  const [voucherSendList, setVoucherSendList] = useState([]);
  const [voucherChannelList, setVoucherChannelList] = useState([]);
  const [voucherChannelSelected, setVoucherChannelSelected] = useState([]);
  const [confirmationChannelList, setConfirmationChannelList] = useState([]);
  const [confirmationChannelSelected, setConfirmationChannelSelected] =
    useState([]);

  const [reserveModal, setReserveModal] = useState(false);
  const [rest1, setRest1] = useState();
  const [rest2, setRest2] = useState();
  const [rest3, setRest3] = useState();
  const [rest4, setRest4] = useState();
  const [ttop1, setttop1] = useState(false);
  const [ttop2, setttop2] = useState(false);
  const [ttop3, setttop3] = useState(false);
  const [ttop6, setttop6] = useState(false);
  const [ttop7, setttop7] = useState(false);
  const [ttmlocation, setttmlocation] = useState(false);
  const [ttblocation, setttblocation] = useState(false);

  const [ttdp, setdp] = useState(false);
  const [ttai, setai] = useState(false);
  const [ttpcontact, settpcontact] = useState(false);
  const [ttpchanel, settpchanel] = useState(false);
  const [ttscontact, settscontact] = useState(false);
  const [ttschanel, settschanel] = useState(false);
  const [extraFeeModal, setExtraFeeModal] = useState(false);
  const [specialInstrucionCheck, setSpecialInstructionCheck] = useState(false);
  const [ttsendvoucherdfrom, setttsendvoucherdfrom] = useState(false);
  const [ttvoucherchannel, setttvoucherchannel] = useState(false);
  const [ttconfirmationchannel, setttconfirmationchannel] = useState(false);
  const [ttrest, setttrest] = useState(false);

  const [meetingLocationTable, setMeetingLocationTable] = useState({});
  const [boatLocationTable, setBoatLocationTable] = useState({});
  const [restrictionTable, setRestrictionTable] = useState({});
  const [locationEditData, setLocationEditData] = useState([]);
  const [boatEditData, setBoatEditData] = useState([]);
  const [restrictionEditData, setRestrictionEditData] = useState([]);
  const [locationModal, setLocationModal] = useState(false);
  const [boatModal, setBoatModal] = useState(false);
  const [restrictionModal, setRestrictionModal] = useState(false);

  useEffect(() => {
    if (tourID) {
      getAdditionalFeeTable(tourID)
        .then((resp) => {
          setExtraFeeInitialData(resp.data.data);
        })
        .catch((err) => console.log(err));

      getBringList()
        .then((resp) => {
          setBringListInitialData(resp.data.data);
        })
        .catch((err) => console.log(err));

      getVoucherInfoTours(tourID)
        .then((resp) => {
          setVoucherInitialData(resp.data.data);
        })
        .catch((err) => console.log(err));
      getChannels()
        .then((resp) => {
          setChannelList(resp.data.data);
        })
        .catch((err) => console.log(err));
      getSendVoucherFromAPI()
        .then((resp) => {
          setVoucherSendList(resp.data.data);
        })
        .catch((err) => console.log(err));
      getVoucherChannels()
        .then((resp) => {
          setVoucherChannelList(resp.data.data);
        })
        .catch((err) => console.log(err));
      getNotyfyChannelAPI().then((resp) => {
        setConfirmationChannelList(resp.data.data);
      });
      getMeetingLocationToursTable(id)
        .then((resp) => {
          setMeetingLocationTable(resp.data.data);
        })
        .catch((err) => console.log(err));
      getBoatLocationToursTable(id)
        .then((resp) => {
          setBoatLocationTable(resp.data.data);
        })
        .catch((err) => console.log(err));
      getRestrictionsToursTable(id)
        .then((resp) => {
          setRestrictionTable(resp.data.data);
        })
        .catch((err) => console.log(err));
    }
  }, [tourID]);

  const refreshTable = () => {
    getAdditionalFeeTable(tourID)
      .then((resp) => {
        setExtraFeeInitialData(resp.data.data);
      })
      .catch((err) => console.log(err));
    getMeetingLocationToursTable(id)
      .then((resp) => {
        setMeetingLocationTable(resp.data.data);
      })
      .catch((err) => console.log(err));
    getBoatLocationToursTable(id)
      .then((resp) => {
        setBoatLocationTable(resp.data.data);
      })
      .catch((err) => console.log(err));
    getRestrictionsToursTable(id)
      .then((resp) => {
        setRestrictionTable(resp.data.data);
      })
      .catch((err) => console.log(err));
  };

  function handleMulti(selected) {
    setSelectionID(selected);
  }
  useEffect(() => {
    if (voucherInitialData) {
      let optionsArea = [];
      let optionsAreaShort = [];

      bringListInitialData?.forEach((element) => {
        if (voucherInitialData?.brings.includes(element.id.toString())) {
          optionsArea.push({ label: element.name, value: +element.id });
          optionsAreaShort.push(+element.id);
        }
      });
      setInitialOptionsArea(optionsArea);
      setSelectionID(optionsAreaShort);
      setRestrictionList(voucherInitialData.restrictions);
      setSpecialInstructionCheck(
        tourData.special_instruction_enable === 1 ? true : false
      );
      setVoucherSendSelected(voucherInitialData.send_voucher_from);
      setVoucherChannelSelected(voucherInitialData.send_voucher);
      setConfirmationChannelSelected(voucherInitialData.notification_email);
    }
  }, [voucherInitialData, bringListInitialData, tourData]);

  useEffect(() => {
    if (restrictionList.length > 0) {
      setRest1(restrictionList[0]?.restriction_1);
      setRest2(restrictionList[1]?.restriction_2);
      setRest3(restrictionList[2]?.restriction_3);
      setRest4(restrictionList[3]?.restriction_4);
      // setRest1(restrictionList[3]?.restriction_4)
    }
  }, [restrictionList]);

  const validationType = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,
    initialValues: {
      special_instruction_title: voucherInitialData?.special_instruction_title
        ? voucherInitialData?.special_instruction_title
        : "",
      special_instruction_description:
        voucherInitialData?.special_instruction_description
          ? voucherInitialData?.special_instruction_description
          : "",

      aditional_information: voucherInitialData?.additional_information
        ? voucherInitialData.additional_information
        : "",
      meeting_location: voucherInitialData?.meeting_location
        ? voucherInitialData.meeting_location
        : "",
      meeting_instructions: voucherInitialData?.meeting_instructions
        ? voucherInitialData.meeting_instructions
        : "",
      google_maps_url: voucherInitialData?.google_maps_url
        ? voucherInitialData.google_maps_url
        : "",
      images_url: voucherInitialData?.images_url
        ? voucherInitialData.images_url
        : "",
      arrival_instructions: voucherInitialData?.arrival_instructions
        ? voucherInitialData.arrival_instructions
        : "",
      departure_instructions: voucherInitialData?.departure_instructions
        ? voucherInitialData.departure_instructions
        : "",
      primary_contact_phone: voucherInitialData?.primary_contact_phone
        ? voucherInitialData.primary_contact_phone
        : "",
      secondary_contact_phone: voucherInitialData?.secondary_contact_phone
        ? voucherInitialData.secondary_contact_phone
        : "",
      boat_google_maps_url: voucherInitialData?.boat_google_maps_url
        ? voucherInitialData.boat_google_maps_url
        : "",
      boat_location: voucherInitialData?.boat_location
        ? voucherInitialData.boat_location
        : "",
    },
    validationSchema: Yup.object().shape({
      // name: Yup.string().required("Name is required"),
    }),
    onSubmit: (values) => {
      let restArr = [];
      if (rest1) {
        restArr.push({
          restriction_1: rest1,
          restriction_read_only_1: restrictionList[0]?.restriction_read_only_1
            ? restrictionList[0]?.restriction_read_only_1
            : 0,
        });
      }
      if (rest2) {
        restArr.push({
          restriction_2: rest2,
          restriction_read_only_2: restrictionList[1]?.restriction_read_only_2
            ? restrictionList[1]?.restriction_read_only_2
            : 0,
        });
      }
      if (rest3) {
        restArr.push({
          restriction_3: rest3,
          restriction_read_only_3: restrictionList[2]?.restriction_read_only_3
            ? restrictionList[2]?.restriction_read_only_3
            : 0,
        });
      }
      if (rest4) {
        restArr.push({
          restriction_4: rest4,
          restriction_read_only_4: restrictionList[3]?.restriction_read_only_4
            ? restrictionList[3]?.restriction_read_only_4
            : 0,
        });
      }

      let data = {
        special_instruction_title: values.special_instruction_title,
        special_instruction_description: values.special_instruction_description,
        special_instruction_enable: specialInstrucionCheck === true ? 1 : 0,
        additional_information: values.aditional_information,
        additional_information_read_only:
          voucherInitialData.additional_information_read_only,
        brings: selectionID,
        brings_read_only: voucherInitialData.brings_read_only,
        restrictions: restArr,
        meeting_location: values.meeting_location,
        meeting_location_read_only:
          voucherInitialData.meeting_location_read_only,
        meeting_instructions: values.meeting_instructions,
        meeting_instructions_read_only:
          voucherInitialData.meeting_instructions_read_only,
        google_maps_url: values.google_maps_url,
        google_maps_url_read_only: voucherInitialData.google_maps_url_read_only,
        images_url: values.images_url,
        images_url_read_only: voucherInitialData.images_url_read_only,
        arrival_instructions: values.arrival_instructions,
        arrival_instructions_read_only:
          voucherInitialData.arrival_instructions_read_only,
        departure_instructions: values.departure_instructions,
        departure_instructions_read_only:
          voucherInitialData.departure_instructions_read_only,
        primary_contact_phone: values.primary_contact_phone,
        primary_contact_phone_read_only:
          voucherInitialData.primary_contact_channel_read_only,
        primary_contact_channel: primaryContactChannelSelected
          ? primaryContactChannelSelected
          : voucherInitialData.primary_contact_channel,
        primary_contact_channel_read_only:
          voucherInitialData.primary_contact_channel_read_only,
        secondary_contact_phone: values.secondary_contact_phone,
        secondary_contact_phone_read_only:
          voucherInitialData.secondary_contact_phone_read_only,
        secondary_contact_channel: secondaryContactChannelSelected
          ? secondaryContactChannelSelected
          : voucherInitialData.secondary_contact_channel,
        secondary_contact_channel_read_only:
          voucherInitialData.secondary_contact_channel_read_only,

        boat_google_maps_url: values.boat_google_maps_url,
        boat_location: values.boat_location,
        boat_google_maps_url_read_only:
          voucherInitialData.boat_google_maps_url_read_only,
        boat_location_read_only: voucherInitialData.boat_location_read_only,
        send_voucher_from:
          voucherSendSelected === "" ? null : voucherSendSelected,
        send_voucher:
          voucherChannelSelected === "" ? null : voucherChannelSelected,
        notification_email:
          confirmationChannelSelected === ""
            ? null
            : confirmationChannelSelected,
        send_voucher_from_read_only:
          voucherInitialData.send_voucher_from_read_only,
        send_voucher_read_only: voucherInitialData.send_voucher_read_only,
        notification_email_read_only:
          voucherInitialData.notification_email_read_only,
      };
      putVoucherInformationTours(voucherInitialData.tour_id, data)
        .then((resp) => {
          if (resp.data.status === 201) {
            Swal.fire(
              "Edited!",
              "Automated Confirmation Information has been edited.",
              "success"
            ).then(() => {});
          }
        })
        .catch((error) => {
          Swal.fire(
            "Error!",
            `${
              error.response.data.data.name
                ? error.response.data.data.name
                : error.response.data.data.code
            }`,
            "error"
          );
        });
    },
  });
  console.log("data inicial", meetingLocationTable);
  const onDelete = (feeID) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteExtraFeeTours(feeID).then((resp) => {
          if (resp.data.status === 200) {
            refreshTable();
            Swal.fire("deleted!", "Extra fee has been edited.", "success");
          }
        });
      }
    });
  };

  const onDeleteLocation = (locationID) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteMeetingLocationsTours(locationID).then((resp) => {
          if (resp.data.status === 200) {
            refreshTable();
            Swal.fire(
              "deleted!",
              "Meeting Location has been deleted.",
              "success"
            );
          }
        });
      }
    });
  };
  const onDeleteBoatLocation = (locationID) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteBoatLocationsTours(locationID).then((resp) => {
          if (resp.data.status === 200) {
            refreshTable();
            Swal.fire("deleted!", "Boat Location has been deleted.", "success");
          }
        });
      }
    });
  };
  const onDeleteRestriction = (locationID) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteRestrictionTours(locationID).then((resp) => {
          if (resp.data.status === 200) {
            refreshTable();
            Swal.fire("deleted!", "Restriction has been deleted.", "success");
          }
        });
      }
    });
  };

  return (
    <div>
      <div>
        <Form
          onSubmit={(e) => {
            e.preventDefault();
            validationType.handleSubmit();
            return false;
          }}
          className="custom-validation"
        >
          <Row>
            <Col
              className="col-12 p-1 my-2"
              style={{ backgroundColor: "#3DC7F41A" }}
            >
              <p
                className="p-2"
                style={{
                  fontSize: "20px",
                  fontWeight: "bold",
                  color: "#495057",
                  marginBottom: "0px",
                }}
              >
                Define Reserve Page
              </p>
            </Col>
          </Row>
          <Row className="d-flex ">
            <Col className="col-2">
              <Col className="mb-2 " style={{ paddingTop: "23px" }}>
                <Button
                  type="button"
                  className="font-16 btn-orange"
                  onClick={() => {
                    setReserveModal(true);
                  }}
                >
                  {" "}
                  + Set Up Reserve Page Template
                </Button>
              </Col>
              <div className="col-12 mt-4">
                <input
                  type="checkbox"
                  onChange={() =>
                    setSpecialInstructionCheck(!specialInstrucionCheck)
                  }
                  value={specialInstrucionCheck}
                  checked={specialInstrucionCheck}
                />
                <label className="mx-2">Add Special Instructions box</label>
              </div>
            </Col>
            <Col className="col-8 my-3 d-flex flex-column">
              {specialInstrucionCheck ? (
                <>
                  <div>
                    <label>Special Instructions Box - Title</label>
                    <i
                      className="uil-question-circle font-size-15 mx-2"
                      id="special_instruction_title"
                    />
                    <Tooltip
                      placement="right"
                      isOpen={ttop6}
                      target="special_instruction_title"
                      toggle={() => {
                        setttop6(!ttop6);
                      }}
                    >
                      Help us Create Your Itinerary!
                    </Tooltip>
                    <div className="col-8 d-flex">
                      <Input
                        name="special_instruction_title"
                        placeholder=""
                        type="text"
                        className="my-1"
                        onChange={validationType.handleChange}
                        value={
                          validationType.values.special_instruction_title || ""
                        }
                      />
                    </div>
                  </div>

                  <div>
                    <label>Special Instructions Box - Description</label>
                    <i
                      className="uil-question-circle font-size-15 mx-2"
                      id="special_instruction_description"
                    />
                    <Tooltip
                      placement="right"
                      isOpen={ttop7}
                      target="special_instruction_description"
                      toggle={() => {
                        setttop7(!ttop7);
                      }}
                    >
                      Tell us how you would like your day to look like, what you
                      would like to do or see, or any special requests.
                    </Tooltip>
                    <div className="col-10">
                      <Input
                        name="special_instruction_description"
                        placeholder=""
                        type="text"
                        className="my-1"
                        onChange={validationType.handleChange}
                        value={
                          validationType.values
                            .special_instruction_description || ""
                        }
                      />
                    </div>
                  </div>
                </>
              ) : null}
            </Col>
          </Row>
          <Row>
            <Col
              className="col-12 p-1 my-2"
              style={{ backgroundColor: "#FFEFDE" }}
            >
              <p
                className="p-2"
                style={{
                  fontSize: "20px",
                  fontWeight: "bold",
                  color: "#495057",
                  marginBottom: "0px",
                }}
              >
                Define Voucher Templates
              </p>
            </Col>
          </Row>
          <Row>
            <Col className="col-12">
              <div className="p-3" style={{ backgroundColor: "#d9f0ff" }}>
                <p className="mb-0 lh-2" style={{ fontSize: "16px" }}>
                  <i
                    class="far fa-lightbulb bg-paradise text-white p-2 rounded-circle text-center"
                    style={{ width: "32px", height: "32px" }}
                  ></i>{" "}
                  The details below will be shown on the customer's confirmation
                  voucher. Some of the details will also show on the website. If
                  any details appear greyed out, they have been specified in the
                  operator panel and apply to all of the tours for this operator
                  or are not used for this tour type. They can only be changed
                  in the operator panel. New details added here will only
                  display for this tour and not for other tours from this
                  operator.
                </p>
              </div>
            </Col>
          </Row>
          <Row className="mt-3">
            <Col className="col-4">
              <div className="d-flex justify-content-between">
                <div className="d-flex">
                  <label>Additional Fees</label>
                  <i
                    className="uil-question-circle font-size-15 mx-2"
                    id="zfees"
                  />
                  <Tooltip
                    placement="right"
                    isOpen={ttop1}
                    target="zfees"
                    toggle={() => {
                      setttop1(!ttop1);
                    }}
                  >
                    These are the additional fees that will be shown on the
                    website and the voucher for this tour, in the order they are
                    displayed in the list.
                    <br />
                    <br />
                    To add a fee to the list, click on "Add Extra Fee". To edit
                    a fee, click on the pencil icon next to the fee.
                  </Tooltip>
                </div>

                <label
                  className="text-paradise"
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    setExtraFeeEditData([]);
                    setExtraFeeModal(!extraFeeModal);
                  }}
                >
                  + Add Extra Fee
                </label>
              </div>
              <div className="table-responsive" style={{ height: "127px" }}>
                <Card>
                  <Table className="table mb-0">
                    <tbody>
                      {map(extraFeeInitialData, (fee, index) => {
                        return (
                          <tr
                            key={index}
                            style={{
                              backgroundColor:
                                fee.read_only === 1 ? "#f5f6f8" : "#ffffff",
                            }}
                          >
                            <th className="col-11">{`${index + 1}. ${
                              fee.fee_type
                            }`}</th>
                            <td className="col-1">
                              <div className="d-flex gap-3">
                                <div className="text-paradise">
                                  <div
                                    className="text-success"
                                    onClick={() => {
                                      setExtraFeeEditData([]);
                                      setExtraFeeEditData(fee);
                                      setExtraFeeModal(true);
                                    }}
                                  >
                                    {fee.read_only === 0 ? (
                                      <>
                                        <i
                                          className="mdi mdi-pencil-outline font-size-17 text-paradise"
                                          id="edittooltip"
                                          style={{ cursor: "pointer" }}
                                        />
                                        <UncontrolledTooltip
                                          placement="top"
                                          target="edittooltip"
                                        >
                                          Edit
                                        </UncontrolledTooltip>
                                      </>
                                    ) : null}
                                  </div>
                                </div>
                                {fee.read_only === 0 ? (
                                  <div
                                    className="text-danger"
                                    onClick={() => {
                                      // const tourData = cellProps.row.original;
                                      // // setconfirm_alert(true);
                                      onDelete(fee.fee_id);
                                    }}
                                  >
                                    <i
                                      className="mdi mdi-delete-outline font-size-17"
                                      id="deletetooltip"
                                      style={{ cursor: "pointer" }}
                                    />
                                    <UncontrolledTooltip
                                      placement="top"
                                      target="deletetooltip"
                                    >
                                      Delete
                                    </UncontrolledTooltip>
                                  </div>
                                ) : null}
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </Table>
                </Card>
              </div>
            </Col>
            {voucherInitialData?.brings && initialOptionsArea.length > 0 ? (
              <Col className="col-4">
                <label>Bring </label>
                <i
                  className="uil-question-circle font-size-15 mx-2"
                  id="bring"
                />
                <Tooltip
                  placement="right"
                  isOpen={ttop3}
                  target="bring"
                  toggle={() => {
                    setttop3(!ttop3);
                  }}
                >
                  Add the items the client will need to bring on the day of the
                  tour.
                  <br />
                  <br />
                  This will be shown on the voucher and on the website.
                  <br />
                  <br />
                  The items will be shown in the order they are selected.
                </Tooltip>
                <Select
                  mode="multiple"
                  allowClear
                  rows="5"
                  style={{ width: "100%", paddingTop: "5px" }}
                  placeholder="Please select"
                  defaultValue={initialOptionsArea}
                  onChange={handleMulti}
                  disabled={
                    voucherInitialData?.brings_read_only === 1 ? true : false
                  }
                >
                  {map(bringListInitialData, (item, index) => {
                    return (
                      <Option key={index} value={item.id}>
                        {item.name}
                      </Option>
                    );
                  })}
                </Select>
              </Col>
            ) : null}
            {voucherInitialData?.brings && initialOptionsArea.length === 0 ? (
              <Col className="col-4 ">
                <label>Bring </label>
                <i
                  className="uil-question-circle font-size-15 mx-2"
                  id="bring"
                />
                <Tooltip
                  placement="right"
                  isOpen={ttop3}
                  target="bring"
                  toggle={() => {
                    setttop3(!ttop3);
                  }}
                >
                  Add the items the client will need to bring on the day of the
                  tour.
                  <br />
                  <br />
                  This will be shown on the voucher and on the website.
                  <br />
                  <br />
                  The items will be shown in the order they are selected.
                </Tooltip>
                <Select
                  mode="multiple"
                  allowClear
                  rows="5"
                  style={{ width: "100%", paddingTop: "5px" }}
                  placeholder="Please select"
                  defaultValue={initialOptionsArea}
                  onChange={handleMulti}
                >
                  {map(bringListInitialData, (item, index) => {
                    return (
                      <Option key={index} value={item.id}>
                        {item.name}
                      </Option>
                    );
                  })}
                </Select>
                {/* {serviceAreaError && <p style={{color:'#f46a6a', fontSize:'13px', marginTop:'4px'}}>Select a Service Area</p>  } */}
              </Col>
            ) : null}
            <Col className="col-4">
              <label>Additional Information</label>
              <i
                className="uil-question-circle font-size-15 mx-2"
                id="additionalInfo"
              />
              <Tooltip
                placement="right"
                isOpen={ttop2}
                target="additionalInfo"
                toggle={() => {
                  setttop2(!ttop2);
                }}
              >
                Any additional information that needs to be shown on the voucher
                that isn't already specified in other fields.
              </Tooltip>
              <Input
                name="aditional_information"
                placeholder=""
                type="textarea"
                rows="5"
                onChange={validationType.handleChange}
                onBlur={validationType.handleBlur}
                disabled={
                  voucherInitialData?.additional_information_read_only === 0
                    ? false
                    : true
                }
                value={validationType.values.aditional_information || ""}
                invalid={
                  validationType.touched.aditional_information &&
                  validationType.errors.aditional_information
                    ? true
                    : false
                }
              />
              {validationType.touched.aditional_information &&
              validationType.errors.aditional_information ? (
                <FormFeedback type="invalid">
                  {validationType.errors.aditional_information}
                </FormFeedback>
              ) : null}
            </Col>
          </Row>

          <Row className="mt-3">
            <Col className="col-4">
              <div className="d-flex justify-content-between">
                <div className="d-flex">
                  <label>Meeting Locations</label>
                  <i
                    className="uil-question-circle font-size-15 mx-2"
                    id="mlocations"
                  />
                  <Tooltip
                    placement="right"
                    isOpen={ttmlocation}
                    target="mlocations"
                    toggle={() => {
                      setttmlocation(!ttmlocation);
                    }}
                  >
                    missing tooltip definition
                  </Tooltip>
                </div>

                {tourData?.type_id !== 3 ? (
                  <label
                    className="text-paradise"
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      setLocationEditData([]);
                      setLocationModal(!locationModal);
                    }}
                  >
                    + Add Location
                  </label>
                ) : null}
              </div>
              <div className="table-responsive" style={{ height: "127px" }}>
                <Card>
                  <Table className="table mb-0">
                    <tbody>
                      {map(meetingLocationTable, (location, index) => {
                        return (
                          <tr
                            style={{
                              backgroundColor:
                                location.read_only === 1
                                  ? "#f5f6f8"
                                  : "#ffffff",
                            }}
                          >
                            <th className="col-11">{`${index + 1}. ${
                              location.title
                            }`}</th>

                            <td className="col-1">
                              {location.read_only !== 1 ? (
                                <div className="d-flex gap-3">
                                  <div className="text-paradise">
                                    <div
                                      className="text-success"
                                      onClick={() => {
                                        setLocationEditData([]);
                                        setLocationEditData(location);
                                        setLocationModal(true);
                                      }}
                                    >
                                      <i
                                        className="mdi mdi-pencil-outline font-size-17 text-paradise"
                                        id="edittooltip"
                                        style={{ cursor: "pointer" }}
                                      />
                                      <UncontrolledTooltip
                                        placement="top"
                                        target="edittooltip"
                                      >
                                        Edit
                                      </UncontrolledTooltip>
                                    </div>
                                  </div>
                                  <div
                                    className="text-danger"
                                    onClick={() => {
                                      // const tourData = cellProps.row.original;
                                      // // setconfirm_alert(true);
                                      onDeleteLocation(location.id);
                                    }}
                                  >
                                    <i
                                      className="mdi mdi-delete-outline font-size-17"
                                      id="deletetooltip"
                                      style={{ cursor: "pointer" }}
                                    />
                                    <UncontrolledTooltip
                                      placement="top"
                                      target="deletetooltip"
                                    >
                                      Delete
                                    </UncontrolledTooltip>
                                  </div>
                                </div>
                              ) : null}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </Table>
                </Card>
              </div>
            </Col>
            <Col className="col-4">
              <div className="d-flex justify-content-between">
                <div className="d-flex">
                  <label>Boat Locations</label>
                  <i
                    className="uil-question-circle font-size-15 mx-2"
                    id="blocation"
                  />
                  <Tooltip
                    placement="right"
                    isOpen={ttblocation}
                    target="blocation"
                    toggle={() => {
                      setttblocation(!ttblocation);
                    }}
                  >
                    missing tooltip definition
                  </Tooltip>
                </div>
                {tourData?.type_id !== 3 ? (
                  <label
                    className="text-paradise"
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      setBoatEditData([]);
                      setBoatModal(!boatModal);
                    }}
                  >
                    + Add Boat
                  </label>
                ) : null}
              </div>
              <div className="table-responsive" style={{ height: "127px" }}>
                <Card>
                  <Table className="table mb-0">
                    <tbody>
                      {map(boatLocationTable, (fee, index) => {
                        return (
                          <tr
                            style={{
                              backgroundColor:
                                fee.read_only === 1 ? "#f5f6f8" : "#ffffff",
                            }}
                          >
                            <th className="col-11">{`${index + 1}. ${
                              fee.title
                            }`}</th>
                            <td className="col-1">
                              {fee.read_only !== 1 ? (
                                <div className="d-flex gap-3">
                                  <div className="text-paradise">
                                    <div
                                      className="text-success"
                                      onClick={() => {
                                        setBoatEditData([]);
                                        setBoatEditData(fee);
                                        setBoatModal(true);
                                      }}
                                    >
                                      <i
                                        className="mdi mdi-pencil-outline font-size-17 text-paradise"
                                        id="edittooltip"
                                        style={{ cursor: "pointer" }}
                                      />
                                      <UncontrolledTooltip
                                        placement="top"
                                        target="edittooltip"
                                      >
                                        Edit
                                      </UncontrolledTooltip>
                                    </div>
                                  </div>
                                  <div
                                    className="text-danger"
                                    onClick={() => {
                                      // const tourData = cellProps.row.original;
                                      // // setconfirm_alert(true);
                                      onDeleteBoatLocation(fee.id);
                                    }}
                                  >
                                    <i
                                      className="mdi mdi-delete-outline font-size-17"
                                      id="deletetooltip"
                                      style={{ cursor: "pointer" }}
                                    />
                                    <UncontrolledTooltip
                                      placement="top"
                                      target="deletetooltip"
                                    >
                                      Delete
                                    </UncontrolledTooltip>
                                  </div>
                                </div>
                              ) : null}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </Table>
                </Card>
              </div>
            </Col>
            <Col className="col-4">
              <div className="d-flex justify-content-between">
                <div className="d-flex">
                  <label>Restrictions</label>
                  <i
                    className="uil-question-circle font-size-15 mx-2"
                    id="restrictionstt"
                  />
                  <Tooltip
                    placement="right"
                    isOpen={ttrest}
                    target="restrictionstt"
                    toggle={() => {
                      setttrest(!ttrest);
                    }}
                  >
                    If the tour has any restrictions specify them one line at a
                    time. They will be shown on the voucher and on the website
                    in the order displayed.
                    <br />
                    <br />
                    To add additional restrictions, click on "+ Add".
                  </Tooltip>
                </div>

                <label
                  className="text-paradise"
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    setRestrictionEditData([]);
                    setRestrictionModal(!restrictionModal);
                  }}
                >
                  + Add Restriction
                </label>
              </div>
              <div className="table-responsive" style={{ height: "127px" }}>
                <Card>
                  <Table className="table mb-0">
                    <tbody>
                      {map(restrictionTable, (fee, index) => {
                        return (
                          <tr
                            style={{
                              backgroundColor:
                                fee.read_only === 1 ? "#f5f6f8" : "#ffffff",
                            }}
                          >
                            <th className="col-11">{`${index + 1}. ${
                              fee.restriction
                            }`}</th>
                            <td className="col-1">
                              {fee.read_only !== 1 ? (
                                <div className="d-flex gap-3">
                                  <div className="text-paradise">
                                    <div
                                      className="text-success"
                                      onClick={() => {
                                        setRestrictionEditData([]);
                                        setRestrictionEditData(fee);
                                        setRestrictionModal(true);
                                      }}
                                    >
                                      <i
                                        className="mdi mdi-pencil-outline font-size-17 text-paradise"
                                        id="edittooltip"
                                        style={{ cursor: "pointer" }}
                                      />
                                      <UncontrolledTooltip
                                        placement="top"
                                        target="edittooltip"
                                      >
                                        Edit
                                      </UncontrolledTooltip>
                                    </div>
                                  </div>
                                  <div
                                    className="text-danger"
                                    onClick={() => {
                                      // const tourData = cellProps.row.original;
                                      // // setconfirm_alert(true);
                                      onDeleteRestriction(fee.id);
                                    }}
                                  >
                                    <i
                                      className="mdi mdi-delete-outline font-size-17"
                                      id="deletetooltip"
                                      style={{ cursor: "pointer" }}
                                    />
                                    <UncontrolledTooltip
                                      placement="top"
                                      target="deletetooltip"
                                    >
                                      Delete
                                    </UncontrolledTooltip>
                                  </div>
                                </div>
                              ) : null}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </Table>
                </Card>
              </div>
            </Col>
          </Row>
          {/* 
          <Row className="mt-3">
            <Col className="col-4">
              <label>Meeting Location</label>
              <i
                className="uil-question-circle font-size-15 mx-2"
                id="meeting_location"
              />
              <Tooltip
                placement="right"
                isOpen={ttml}
                target="meeting_location"
                toggle={() => {
                  setml(!ttml);
                }}
              >
                The exact meeting location of the tour.
                <br />
                <br />
                Examples:
                <br />
                <br />
                "Your Hotel's Front Door"
                <br />
                "Meet at the Security Gate at your Hotel"
                <br />
                "Aquaworld Marina at Km 15.2 of the Hotel Zone."
              </Tooltip>
              <div className="">
                <Input
                  name="meeting_location"
                  placeholder=""
                  type="text"
                  onChange={validationType.handleChange}
                  onBlur={validationType.handleBlur}
                  disabled={
                    voucherInitialData?.meeting_location_read_only === 0
                      ? false
                      : true
                  }
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
            </Col>
            <Col className="col-4 ">
              <label>Meeting Instructions</label>
              <i
                className="uil-question-circle font-size-15 mx-2"
                id="meeting_instructions"
              />
              <Tooltip
                placement="right"
                isOpen={ttmi}
                target="meeting_instructions"
                toggle={() => {
                  setmi(!ttmi);
                }}
              >
                Specific Instructions of how to meet the tour or transfer.
              </Tooltip>
              <div className="">
                <Input
                  name="meeting_instructions"
                  placeholder=""
                  type="text"
                  onChange={validationType.handleChange}
                  maxLength={80}
                  onBlur={validationType.handleBlur}
                  disabled={
                    tourData?.type_id === 3 ||
                    voucherInitialData?.meeting_instructions_read_only !== 0
                      ? true
                      : false
                  }
                  value={validationType.values.meeting_instructions || ""}
                  invalid={
                    validationType.touched.meeting_instructions &&
                    validationType.errors.meeting_instructions
                      ? true
                      : false
                  }
                />
                <p
                  style={{
                    fontSize: "12px",
                    fontWeight: "lighter",
                    textAlign: "right",
                    marginBottom: 0,
                  }}
                >
                  80 characters max
                </p>
                {validationType.touched.meeting_instructions &&
                validationType.errors.meeting_instructions ? (
                  <FormFeedback type="invalid">
                    {validationType.errors.meeting_instructions}
                  </FormFeedback>
                ) : null}
              </div>
            </Col>
            <Col className="col-4 ">
              <label>Restrictions</label>
              <i
                className="uil-question-circle font-size-15 mx-2"
                id="restrictions"
              />
              <Tooltip
                placement="right"
                isOpen={ttop4}
                target="restrictions"
                toggle={() => {
                  setttop4(!ttop4);
                }}
              >
                If the tour has any restrictions specify them one line at a
                time. They will be shown on the voucher and on the website in
                the order displayed.
              </Tooltip>
              <div className="col-12">
                <Input
                  name="rest_one"
                  placeholder="Add Restriction #1"
                  type="text"
                  className=""
                  disabled={
                    voucherInitialData?.restrictions[0]
                      ?.restriction_read_only_1 === 1
                      ? true
                      : false
                  }
                  onChange={(e) => setRest1(e.target.value)}
                  value={rest1}
                />
              </div>
            </Col>
          </Row> */}
          {/* <Row>
            <Col className="col-4">
              <label>Google Maps URL</label>
              <i
                className="uil-question-circle font-size-15 mx-2"
                id="google_maps_url"
              />
              <Tooltip
                placement="right"
                isOpen={ttGM}
                target="google_maps_url"
                toggle={() => {
                  settGm(!ttGM);
                }}
              >
                Paste the URL from Google Maps of the exact meeting location, so
                the customer can view exact directions of how to get there.
                <br />
                <br />
                Be very specific, zoom in and make certain that the pin is
                exactly where the customer should stand.
              </Tooltip>
              <div className="">
                <Input
                  name="google_maps_url"
                  placeholder=""
                  type="text"
                  onChange={validationType.handleChange}
                  onBlur={validationType.handleBlur}
                  disabled={
                    voucherInitialData?.google_maps_url_read_only !== 0
                      ? true
                      : false
                  }
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
            </Col>
            <Col className="col-4 ">
              <label>Images URL</label>
              <i
                className="uil-question-circle font-size-15 mx-2"
                id="images_url"
              />
              <Tooltip
                placement="right"
                isOpen={ttimg}
                target="images_url"
                toggle={() => {
                  setimg(!ttimg);
                }}
              >
                Paste the URL of an image or a gallery where the customer can
                see photos of the exact meeting location, or of a map showing
                how to get to the location.
              </Tooltip>
              <div className="">
                <Input
                  name="images_url"
                  placeholder=""
                  type="text"
                  onChange={validationType.handleChange}
                  onBlur={validationType.handleBlur}
                  disabled={
                    voucherInitialData?.images_url_read_only !== 0
                      ? true
                      : false
                  }
                  value={validationType.values.images_url || ""}
                  invalid={
                    validationType.touched.images_url &&
                    validationType.errors.images_url
                      ? true
                      : false
                  }
                />
                {validationType.touched.images_url &&
                validationType.errors.images_url ? (
                  <FormFeedback type="invalid">
                    {validationType.errors.images_url}
                  </FormFeedback>
                ) : null}
              </div>
            </Col>
            <Col className="col-4">
              <div className="col-12 d-flex mt-4">
                <Input
                  name="rest_two"
                  placeholder="Add Restriction #2"
                  className="my-2"
                  type="text"
                  disabled={
                    voucherInitialData?.restrictions[1]
                      ?.restriction_read_only_2 === 1
                      ? true
                      : false
                  }
                  onChange={(e) => setRest2(e.target.value)}
                  value={rest2}
                />
              </div>
            </Col>
          </Row> */}
          <Row className="mt-2">
            {tourData?.type_id === 5 || tourData?.type_id === 6 ? (
              <>
                <Col className="col-4 ">
                  <label>Boat Location</label>
                  <i
                    className="uil-question-circle font-size-15 mx-2"
                    id="boat_location"
                  />
                  <Tooltip
                    placement="right"
                    isOpen={ttai}
                    target="boat_location"
                    toggle={() => {
                      setai(!ttai);
                    }}
                  >
                    Enter the address where the actual boat is located, for
                    example the marina it is located in. Be specific, if there
                    is a certain dock or slip or area. This will be shown on the
                    customer's voucher.
                    <br />
                    <br />
                    Example: Marina Puerto Aventuras, next to Dolphin Discovery.
                    <br />
                    Example: El Cid Marina in Puerto Morelos.
                    <br />
                    Example: Marina Las Perlas at Km 2 of the Cancun Hotel Zone.
                    <br />
                    Example: Marina Los Peines, Marina Vallarta, Dock K, Slip
                    12.
                  </Tooltip>
                  <div className="">
                    <Input
                      name="boat_location"
                      placeholder=""
                      type="text"
                      onChange={validationType.handleChange}
                      onBlur={validationType.handleBlur}
                      disabled={
                        tourData?.type_id === 1 ||
                        tourData?.type_id === 2 ||
                        voucherInitialData?.boat_location_read_only !== 0 ||
                        tourData?.type_id === 4
                          ? true
                          : false
                      }
                      value={validationType.values.boat_location || ""}
                      invalid={
                        validationType.touched.boat_location &&
                        validationType.errors.boat_location
                          ? true
                          : false
                      }
                    />
                    {validationType.touched.boat_location &&
                    validationType.errors.boat_location ? (
                      <FormFeedback type="invalid">
                        {validationType.errors.boat_location}
                      </FormFeedback>
                    ) : null}
                  </div>
                </Col>
                <Col className="col-4 ">
                  <label>Google Maps URL</label>
                  <i
                    className="uil-question-circle font-size-15 mx-2"
                    id="boat_google_maps_url"
                  />
                  <Tooltip
                    placement="right"
                    isOpen={ttdp}
                    target="boat_google_maps_url"
                    toggle={() => {
                      setdp(!ttdp);
                    }}
                  >
                    Paste the URL from Google Maps of the exact boat location,
                    so the customer can view exact directions of how to get
                    there.
                    <br />
                    <br />
                    Be very specific, zoom in and make certain that the pin is
                    exactly where the customer should stand.
                  </Tooltip>
                  <div className="">
                    <Input
                      name="boat_google_maps_url"
                      placeholder=""
                      type="text"
                      onChange={validationType.handleChange}
                      onBlur={validationType.handleBlur}
                      disabled={
                        tourData?.type_id === 1 ||
                        tourData?.type_id === 2 ||
                        voucherInitialData?.boat_google_maps_url_read_only !==
                          0 ||
                        tourData?.type_id === 4
                          ? true
                          : false
                      }
                      value={validationType.values.boat_google_maps_url || ""}
                      invalid={
                        validationType.touched.boat_google_maps_url &&
                        validationType.errors.boat_google_maps_url
                          ? true
                          : false
                      }
                    />
                    {validationType.touched.boat_google_maps_url &&
                    validationType.errors.boat_google_maps_url ? (
                      <FormFeedback type="invalid">
                        {validationType.errors.boat_google_maps_url}
                      </FormFeedback>
                    ) : null}
                  </div>
                </Col>
              </>
            ) : (
              <>
                <Col className="col-4 ">
                  <label>Arrival Instructions</label>
                  <i
                    className="uil-question-circle font-size-15 mx-2"
                    id="arrival_instructions"
                  />
                  <Tooltip
                    placement="right"
                    isOpen={ttai}
                    target="arrival_instructions"
                    toggle={() => {
                      setai(!ttai);
                    }}
                  >
                    Provide clear directions to the customer of what will happen
                    on arrival to the airport, or where to find their driver.
                  </Tooltip>
                  <div className="">
                    <Input
                      name="arrival_instructions"
                      placeholder=""
                      type="textarea"
                      rows={1}
                      onChange={validationType.handleChange}
                      onBlur={validationType.handleBlur}
                      disabled={
                        tourData?.type_id === 1 ||
                        tourData?.type_id === 2 ||
                        voucherInitialData?.arrival_instructions_read_only !==
                          0 ||
                        tourData?.type_id === 4
                          ? true
                          : false
                      }
                      value={validationType.values.arrival_instructions || ""}
                      invalid={
                        validationType.touched.arrival_instructions &&
                        validationType.errors.arrival_instructions
                          ? true
                          : false
                      }
                    />

                    {validationType.touched.arrival_instructions &&
                    validationType.errors.arrival_instructions ? (
                      <FormFeedback type="invalid">
                        {validationType.errors.arrival_instructions}
                      </FormFeedback>
                    ) : null}
                  </div>
                </Col>
                <Col className="col-4 ">
                  <label>Departure Instructions</label>
                  <i
                    className="uil-question-circle font-size-15 mx-2"
                    id="departure_instructions"
                  />
                  <Tooltip
                    placement="right"
                    isOpen={ttdp}
                    target="departure_instructions"
                    toggle={() => {
                      setdp(!ttdp);
                    }}
                  >
                    Provide clear directions to the customer as to where they
                    will meet their transfer for their departure, or any
                    clarifications of what they need to do.
                  </Tooltip>
                  <div className="">
                    <Input
                      name="departure_instructions"
                      placeholder=""
                      type="textarea"
                      rows={1}
                      onChange={validationType.handleChange}
                      onBlur={validationType.handleBlur}
                      disabled={
                        tourData?.type_id === 1 ||
                        tourData?.type_id === 2 ||
                        voucherInitialData?.departure_instructions_read_only !==
                          0 ||
                        tourData?.type_id === 4
                          ? true
                          : false
                      }
                      value={validationType.values.departure_instructions || ""}
                      invalid={
                        validationType.touched.departure_instructions &&
                        validationType.errors.departure_instructions
                          ? true
                          : false
                      }
                    />
                    {validationType.touched.departure_instructions &&
                    validationType.errors.departure_instructions ? (
                      <FormFeedback type="invalid">
                        {validationType.errors.departure_instructions}
                      </FormFeedback>
                    ) : null}
                  </div>
                </Col>
              </>
            )}
            <Col className="col-2">
              <label>Request Availability Via</label>
              <i
                className="uil-question-circle font-size-15 mx-2"
                id="request_availa"
              />
              <Tooltip
                placement="right"
                isOpen={ttconfirmationchannel}
                target="request_availa"
                toggle={() => {
                  setttconfirmationchannel(!ttconfirmationchannel);
                }}
              >
                Select how this provider wants to receive their "please confirm"
                request for this tour. If this value is set in the provider
                tool, then it will appear greyed out.
              </Tooltip>
              <div className="">
                <div className="">
                  <Input
                    type="select"
                    name="confirmation_channel"
                    onChange={(e) => {
                      setConfirmationChannelSelected(e.target.value);
                    }}
                    onBlur={validationType.handleBlur}
                    //   value={validationType.values.department || ""}
                    disabled={
                      voucherInitialData?.notification_email_read_only === 1
                        ? true
                        : false
                    }
                  >
                    <option value="">Select....</option>
                    {map(confirmationChannelList, (voucher, index) => {
                      return (
                        <option
                          key={index}
                          value={voucher.id}
                          selected={
                            voucherInitialData?.notification_email ===
                            voucher.id
                          }
                        >
                          {voucher.channel}
                        </option>
                      );
                    })}
                  </Input>
                </div>
              </div>
            </Col>
            <Col className="col-2">
              <label>Issue Voucher Via</label>
              <i
                className="uil-question-circle font-size-15 mx-2"
                id="issue_voucher"
              />
              <Tooltip
                placement="right"
                isOpen={ttvoucherchannel}
                target="issue_voucher"
                toggle={() => {
                  setttvoucherchannel(!ttvoucherchannel);
                }}
              >
                Select how this provider wants to receive a copy of the voucher
                for this tour. If this value is set in the provider tool, then
                it will appear greyed out.
              </Tooltip>

              <div className="">
                <Input
                  type="select"
                  name="voucher_channel"
                  onChange={(e) => {
                    setVoucherChannelSelected(e.target.value);
                  }}
                  onBlur={validationType.handleBlur}
                  //   value={validationType.values.department || ""}
                  disabled={
                    voucherInitialData?.send_voucher_read_only === 1
                      ? true
                      : false
                  }
                >
                  <option value="">Select....</option>
                  {map(voucherChannelList, (voucher, index) => {
                    return (
                      <option
                        key={index}
                        value={voucher.id}
                        selected={
                          voucherInitialData?.send_voucher == voucher.id
                        }
                      >
                        {voucher.channel}
                      </option>
                    );
                  })}
                </Input>
              </div>
            </Col>
          </Row>
          <Row className="mt-2">
            <Col className="col-2">
              <label>Voucher Contact</label>
              <i
                className="uil-question-circle font-size-15 mx-2"
                id="primary_contact_phone"
              />
              <Tooltip
                placement="right"
                isOpen={ttpcontact}
                target="primary_contact_phone"
                toggle={() => {
                  settpcontact(!ttpcontact);
                }}
              >
                This will be the primary contact for the customer if they have
                trouble finding their driver or meeting location. It will be
                shown on their voucher.
                <br />
                <br />
                Use format +52 (998) 123-4567.
              </Tooltip>
              <div className="">
                <Input
                  name="primary_contact_phone"
                  placeholder=""
                  type="text"
                  onChange={validationType.handleChange}
                  onBlur={validationType.handleBlur}
                  disabled={
                    voucherInitialData?.primary_contact_phone_read_only === 0
                      ? false
                      : true
                  }
                  value={validationType.values.primary_contact_phone || ""}
                  invalid={
                    validationType.touched.primary_contact_phone &&
                    validationType.errors.primary_contact_phone
                      ? true
                      : false
                  }
                />
                {validationType.touched.primary_contact_phone &&
                validationType.errors.primary_contact_phone ? (
                  <FormFeedback type="invalid">
                    {validationType.errors.primary_contact_phone}
                  </FormFeedback>
                ) : null}
              </div>
            </Col>
            <Col className="col-2">
              <label>Channel(s)</label>
              <i
                className="uil-question-circle font-size-15 mx-2"
                id="channel_contact1"
              />
              <Tooltip
                placement="right"
                isOpen={ttpchanel}
                target="channel_contact1"
                toggle={() => {
                  settpchanel(!ttpchanel);
                }}
              >
                Choose which type of contact number you just entered in the
                "Voucher Contact" field.
              </Tooltip>
              <div className="">
                <Input
                  type="select"
                  name="primary_contact_channel"
                  onChange={(e) => {
                    setPrimaryContactChannelSelected(e.target.value);
                  }}
                  disabled={
                    voucherInitialData?.primary_contact_channel_read_only === 0
                      ? false
                      : true
                  }
                  onBlur={validationType.handleBlur}
                  //   value={validationType.values.department || ""}
                >
                  <option value={null}>Select....</option>
                  {map(channelList, (channel, index) => {
                    return (
                      <option
                        key={index}
                        value={channel.name}
                        selected={
                          voucherInitialData?.primary_contact_channel ===
                          channel.name
                        }
                      >
                        {channel.name}
                      </option>
                    );
                  })}
                </Input>
              </div>
            </Col>
            <Col className="col-2">
              <label>Voucher Contact</label>
              <i
                className="uil-question-circle font-size-15 mx-2"
                id="secondary_contact_phone"
              />
              <Tooltip
                placement="right"
                isOpen={ttscontact}
                target="secondary_contact_phone"
                toggle={() => {
                  settscontact(!ttscontact);
                }}
              >
                Alternate contact for the customer to contact in case they can't
                find their driver or meeting location and the first number isn't
                available. This will be shown on the customer's voucher.
                <br />
                <br />
                Use format +52 (998) 123-4567
              </Tooltip>
              <div className="">
                <Input
                  name="secondary_contact_phone"
                  placeholder=""
                  type="text"
                  onChange={validationType.handleChange}
                  onBlur={validationType.handleBlur}
                  value={validationType.values.secondary_contact_phone || ""}
                  disabled={
                    voucherInitialData?.secondary_contact_phone_read_only === 0
                      ? false
                      : true
                  }
                  invalid={
                    validationType.touched.secondary_contact_phone &&
                    validationType.errors.secondary_contact_phone
                      ? true
                      : false
                  }
                />
                {validationType.touched.secondary_contact_phone &&
                validationType.errors.secondary_contact_phone ? (
                  <FormFeedback type="invalid">
                    {validationType.errors.secondary_contact_phone}
                  </FormFeedback>
                ) : null}
              </div>
            </Col>
            <Col className="col-2">
              <label>Channel(s)</label>
              <i
                className="uil-question-circle font-size-15 mx-2"
                id="channels2"
              />
              <Tooltip
                placement="right"
                isOpen={ttschanel}
                target="channels2"
                toggle={() => {
                  settschanel(!ttschanel);
                }}
              >
                Choose which type of contact number you just entered in the
                "Voucher Contact" field.
              </Tooltip>
              <div className="">
                <Input
                  type="select"
                  name="secondary_contact_channel"
                  onChange={(e) => {
                    setSecondaryContactChannelSelected(e.target.value);
                  }}
                  disabled={
                    voucherInitialData?.secondary_contact_channel_read_only ===
                    0
                      ? false
                      : true
                  }
                  onBlur={validationType.handleBlur}
                  //   value={validationType.values.department || ""}
                >
                  <option value={null}>Select....</option>
                  {map(channelList, (channel, index) => {
                    return (
                      <option
                        key={index}
                        value={channel.name}
                        selected={
                          voucherInitialData?.secondary_contact_channel ===
                          channel.name
                        }
                      >
                        {channel.name}
                      </option>
                    );
                  })}
                </Input>
              </div>
            </Col>

            <Col className="col-4">
              <label>Send Voucher As</label>
              <i
                className="uil-question-circle font-size-15 mx-2"
                id="channel55"
              />
              <Tooltip
                placement="right"
                isOpen={ttsendvoucherdfrom}
                target="channel55"
                toggle={() => {
                  setttsendvoucherdfrom(!ttsendvoucherdfrom);
                }}
              >
                Choose which brand this tour will use for Emails and Vouchers.
                Default is the website the tour is located on, but can be
                changed for providers that are conflictive due to MF and prefer
                to see other brands such as JS Tour & Travel or Cancun
                Discounts. If this value is set in the provider tool, then it
                will appear greyed out.
              </Tooltip>

              <div className="">
                <Input
                  type="select"
                  name="voucher_send"
                  onChange={(e) => {
                    setVoucherSendSelected(e.target.value);
                  }}
                  onBlur={validationType.handleBlur}
                  //   value={validationType.values.department || ""}
                  disabled={
                    voucherInitialData?.send_voucher_from_read_only === 1
                      ? true
                      : false
                  }
                >
                  <option value="">Select....</option>
                  {map(voucherSendList, (voucher, index) => {
                    return (
                      <option
                        key={index}
                        value={voucher.id}
                        selected={
                          voucherInitialData?.send_voucher_from === voucher.id
                        }
                      >
                        {voucher.name}
                      </option>
                    );
                  })}
                </Input>
              </div>
            </Col>
          </Row>
          <Row className="mt-4"></Row>

          <Row>
            <Col className=" d-flex justify-content-end">
              <Button
                type="submit"
                style={{ backgroundColor: "#F6851F", border: "none" }}
                className="waves-effect waves-light mb-3 btn btn-success"
              >
                <i className="mdi mdi-plus me-1" />
                Save Changes
              </Button>
            </Col>
          </Row>
        </Form>
      </div>
      <AddExtraFeeModal
        extraFeeModal={extraFeeModal}
        setExtraFeeModal={setExtraFeeModal}
        extraFeeEditData={extraFeeEditData}
        id={tourID}
        section={"tours"}
        refreshTable={refreshTable}
      />
      <AddLocationModal
        locationModal={locationModal}
        setLocationModal={setLocationModal}
        locationEditData={locationEditData}
        id={tourID}
        section={"tours"}
        refreshTable={refreshTable}
      />
      <AddBoatModal
        locationModal={boatModal}
        setLocationModal={setBoatModal}
        locationEditData={boatEditData}
        id={tourID}
        section={"tours"}
        refreshTable={refreshTable}
      />
      <AddRestrictionModal
        locationModal={restrictionModal}
        setLocationModal={setRestrictionModal}
        locationEditData={restrictionEditData}
        id={tourID}
        section={"tours"}
        refreshTable={refreshTable}
      />
      <ReservePageModal
        reserveModal={reserveModal}
        setReserveModal={setReserveModal}
        id={id}
      />
    </div>
  );
};

export default AutomatedConfirmation;
