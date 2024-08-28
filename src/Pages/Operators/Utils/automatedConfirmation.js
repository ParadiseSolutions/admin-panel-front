import { useEffect, useState } from "react";
import AddExtraFeeModal from "../../../Components/Common/Modals/OperatorsModals/addExtraFeeModal";
import {
  Collapse,
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
import classnames from "classnames";
import * as Yup from "yup";
import { useFormik } from "formik";
import Swal from "sweetalert2";
import { Select } from "antd";
import {
  deleteBoatLocation,
  deleteExtraFee,
  deleteMeetingLocation,
  deleteRestriction,
  getBoatLocationTable,
  getBringList,
  getChannels,
  getExtraFeeTable,
  getMeetingLocationTable,
  getRestrictionsTable,
  getSendVoucherFromAPI,
  getVoucherChannels,
  getVoucherInfo,
  putVoucherInformation,
} from "../../../Utils/API/Operators";
import { map } from "lodash";
import { Option } from "antd/lib/mentions";
import AddLocationModal from "../../../Components/Common/Modals/OperatorsModals/addLocationModal";
import AddBoatModal from "../../../Components/Common/Modals/OperatorsModals/addBoatModal";
import AddRestrictionModal from "../../../Components/Common/Modals/OperatorsModals/addRestrictionModal";

const AutomatedConfirmation = ({ socialData, id }) => {
  // const {id} = useHistory()
  // console.log(id)
  //initial info
  // const [initialData, setInitialData] = useState({});
  const [extraFeeInitialData, setExtraFeeInitialData] = useState({});
  const [meetingLocationTable, setMeetingLocationTable] = useState({});
  const [boatLocationTable, setBoatLocationTable] = useState({});
  const [restrictionTable, setRestrictionTable] = useState({});
  const [bringListInitialData, setBringListInitialData] = useState([]);
  const [initialOptionsArea, setInitialOptionsArea] = useState([]);
  const [selectionID, setSelectionID] = useState({});
  const [voucherInitialData, setVoucherInitialData] = useState();
  const [extraFeeEditData, setExtraFeeEditData] = useState([]);
  const [locationEditData, setLocationEditData] = useState([]);
  const [boatEditData, setBoatEditData] = useState([]);
  const [restrictionEditData, setRestrictionEditData] = useState([]);
  const [restrictionList, setRestrictionList] = useState([]);
  const [channelList, setChannelList] = useState([]);
  const [voucherChannelList, setVoucherChannelList] = useState([]);
  const [voucherChannelSelected, setVoucherChannelSelected] = useState([]);
  const [voucherSendList, setVoucherSendList] = useState([]);
  const [voucherSendSelected, setVoucherSendSelected] = useState([]);
  const [primaryContactChannelSelected, setPrimaryContactChannelSelected] =
    useState();
  const [secondaryContactChannelSelected, setSecondaryContactChannelSelected] =
    useState();
  const [sendVoucherChk, setSendVoucherChk] = useState();
  const [rest1, setRest1] = useState();
  const [rest2, setRest2] = useState();
  const [rest3, setRest3] = useState();
  const [rest4, setRest4] = useState();
  const [addMore, setAddMore] = useState(false);
  const [ttop1, setttop1] = useState(false);
  const [ttop2, setttop2] = useState(false);
  const [ttop3, setttop3] = useState(false);
  const [ttop4, setttop4] = useState(false);
  const [ttop5, setttop5] = useState(false);
  const [ttGM, settGm] = useState(false);
  const [ttimg, setimg] = useState(false);
  const [ttml, setml] = useState(false);
  const [ttmi, setmi] = useState(false);
  const [ttdp, setdp] = useState(false);
  const [ttai, setai] = useState(false);
  const [extraFeeModal, setExtraFeeModal] = useState(false);
  const [locationModal, setLocationModal] = useState(false);
  const [boatModal, setBoatModal] = useState(false);
  const [restrictionModal, setRestrictionModal] = useState(false);

  useEffect(() => {
    getExtraFeeTable(id)
      .then((resp) => {
        setExtraFeeInitialData(resp.data.data);
      })
      .catch((err) => console.log(err));

    getMeetingLocationTable(id)
      .then((resp) => {
        setMeetingLocationTable(resp.data.data);
      })
      .catch((err) => console.log(err));
    getBoatLocationTable(id)
      .then((resp) => {
        setBoatLocationTable(resp.data.data);
      })
      .catch((err) => console.log(err));
    getRestrictionsTable(id)
      .then((resp) => {
        setRestrictionTable(resp.data.data);
      })
      .catch((err) => console.log(err));

    getBringList()
      .then((resp) => {
        setBringListInitialData(resp.data.data);
      })
      .catch((err) => console.log(err));

    getVoucherInfo(id)
      .then((resp) => {
        setVoucherInitialData(resp.data.data);
      })
      .catch((err) => console.log(err));

    getChannels()
      .then((resp) => {
        setChannelList(resp.data.data);
      })
      .catch((err) => console.log(err));
    getVoucherChannels()
      .then((resp) => {
        setVoucherChannelList(resp.data.data);
      })
      .catch((err) => console.log(err));
    getSendVoucherFromAPI()
      .then((resp) => {
        setVoucherSendList(resp.data.data);
      })
      .catch((err) => console.log(err));
  }, [id]);

  const refreshTable = () => {
    getExtraFeeTable(id)
      .then((resp) => {
        setExtraFeeInitialData(resp.data.data);
      })
      .catch((err) => console.log(err));
    getMeetingLocationTable(id)
      .then((resp) => {
        setMeetingLocationTable(resp.data.data);
      })
      .catch((err) => console.log(err));
    getBoatLocationTable(id)
      .then((resp) => {
        setBoatLocationTable(resp.data.data);
      })
      .catch((err) => console.log(err));
    getRestrictionsTable(id)
      .then((resp) => {
        setRestrictionTable(resp.data.data);
      })
      .catch((err) => console.log(err));
  };

  const [col1, setcol1] = useState(false);

  function togglecol1() {
    setcol1(!col1);
  }
  //----- bring list
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
      setSendVoucherChk(voucherInitialData.send_voucher === 1 ? true : false);
      setVoucherSendSelected(voucherInitialData.send_voucher_from)
      setVoucherChannelSelected(voucherInitialData.send_voucher)
    }
  }, [voucherInitialData, bringListInitialData]);

  useEffect(() => {
    if (restrictionList.length > 0) {
      setRest1(restrictionList[0]?.restriction_1);
      setRest2(restrictionList[1]?.restriction_2);
      setRest3(restrictionList[2]?.restriction_3);
      setRest4(restrictionList[3]?.restriction_4);
      // setRest1(restrictionList[3]?.restriction_4)
    }
  }, [restrictionList]);
  console.log("locations", meetingLocationTable);

  const validationType = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,
    initialValues: {
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
        send_voucher:
          voucherChannelSelected === "" ? null : voucherChannelSelected,
        send_voucher_from:
          voucherSendSelected === "" ? null : voucherSendSelected,
      };
      putVoucherInformation(voucherInitialData.operator_id, data)
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
        deleteExtraFee(feeID).then((resp) => {
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
        deleteMeetingLocation(locationID).then((resp) => {
          if (resp.data.status === 200) {
            refreshTable();
            Swal.fire("deleted!", "Meeting Location has been deleted.", "success");
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
        deleteBoatLocation(locationID).then((resp) => {
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
        deleteRestriction(locationID).then((resp) => {
          if (resp.data.status === 200) {
            refreshTable();
            Swal.fire("deleted!", "Restriction has been deleted.", "success");
          }
        });
      }
    });
  };

  return (
    <div className="accordion" id="accordionExample">
      <div className="accordion-item">
        <h2 className="accordion-header" id="headingOne">
          <button
            className={classnames("accordion-button", "fw-medium", {
              collapsed: !col1,
            })}
            type="button"
            onClick={togglecol1}
            style={{
              cursor: "pointer",
              backgroundColor: "#F6851F",
              color: "white",
            }}
          >
            Automated Confirmation
          </button>
        </h2>
        <Collapse id="collapseOne" className="accordion-collapse" isOpen={col1}>
          <div className="accordion-body">
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
                  <div className="p-3" style={{ backgroundColor: "#d9f0ff" }}>
                    <p className="mb-0 lh-2" style={{ fontSize: "16px" }}>
                      <i
                        class="far fa-lightbulb bg-paradise text-white p-2 rounded-circle text-center"
                        style={{ width: "32px", height: "32px" }}
                      ></i>{" "}
                      Enter the details that will be shown on the customer's
                      confirmation voucher. Some of the details will also show
                      on the website. Everything defined here will be applied to
                      ALL of the tours for this operator. If a field may be
                      different for certain tours then leave it blank. You will
                      define it for each tour in the Voucher Templates tab of
                      the Tour Panel.
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
                        website and the voucher for this tour, in the order they
                        are displayed in the list.
                        <br />
                        <br />
                        To add a fee to the list, click on "Add Extra Fee". To
                        edit a fee, click on the pencil icon next to the fee.
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
                              <tr>
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
                      Add the items the client will need to bring on the day of
                      the tour.
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
                {voucherInitialData?.brings &&
                initialOptionsArea.length === 0 ? (
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
                      Add the items the client will need to bring on the day of
                      the tour.
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
                    Any additional information that needs to be shown on the
                    voucher that isn't already specified in other fields.
                  </Tooltip>
                  <Input
                    name="aditional_information"
                    placeholder=""
                    type="textarea"
                    rows="5"
                    onChange={validationType.handleChange}
                    onBlur={validationType.handleBlur}
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
                        {/* These are the additional fees that will be shown on the
                        website and the voucher for this tour, in the order they
                        are displayed in the list.
                        <br />
                        <br />
                        To add a fee to the list, click on "Add Extra Fee". To
                        edit a fee, click on the pencil icon next to the fee. */}
                      </Tooltip>
                    </div>

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
                  </div>
                  <div className="table-responsive" style={{ height: "127px" }}>
                    <Card>
                      <Table className="table mb-0">
                        <tbody>
                          {map(meetingLocationTable, (location, index) => {
                            return (
                              <tr>
                                <th className="col-11">{`${index + 1}. ${
                                  location.title
                                }`}</th>
                                <td className="col-1">
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
                        {/* These are the additional fees that will be shown on the
                        website and the voucher for this tour, in the order they
                        are displayed in the list.
                        <br />
                        <br />
                        To add a fee to the list, click on "Add Extra Fee". To
                        edit a fee, click on the pencil icon next to the fee. */}
                      </Tooltip>
                    </div>

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
                  </div>
                  <div className="table-responsive" style={{ height: "127px" }}>
                    <Card>
                      <Table className="table mb-0">
                        <tbody>
                          {map(boatLocationTable, (fee, index) => {
                            return (
                              <tr>
                                <th className="col-11">{`${index + 1}. ${
                                  fee.title
                                }`}</th>
                                <td className="col-1">
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
                        {/* These are the additional fees that will be shown on the
                        website and the voucher for this tour, in the order they
                        are displayed in the list.
                        <br />
                        <br />
                        To add a fee to the list, click on "Add Extra Fee". To
                        edit a fee, click on the pencil icon next to the fee. */}
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
                              <tr>
                                <th className="col-11">{`${index + 1}. ${
                                  fee.restriction
                                }`}</th>
                                <td className="col-1">
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
             
              
              <Row className="mt-2">
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
                <Col className="col-2">
                  <label>Send Voucher From</label>

                  <div className="">
                    <Input
                      type="select"
                      name="voucher_send"
                      onChange={(e) => {
                        setVoucherSendSelected(e.target.value);
                      }}
                      onBlur={validationType.handleBlur}
                      //   value={validationType.values.department || ""}
                    >
                      <option value="">Select....</option>
                      {map(voucherSendList, (voucher, index) => {
                        return (
                          <option
                            key={index}
                            value={voucher.id}
                            selected={
                              voucherInitialData?.send_voucher_from ===
                              voucher.id
                            }
                          >
                            {voucher.name}
                          </option>
                        );
                      })}
                    </Input>
                  </div>
                </Col>
                <Col className="col-2">
                  <label>Voucher Channel</label>

                  <div className="">
                    <Input
                      type="select"
                      name="voucher_channel"
                      onChange={(e) => {
                        setVoucherChannelSelected(e.target.value);
                      }}
                      onBlur={validationType.handleBlur}
                      //   value={validationType.values.department || ""}
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
                  {/* <i
                    className="uil-question-circle font-size-15 mx-2"
                    id="primary_contact_phone"
                  />
                  <Tooltip
                    placement="right"
                    isOpen={ttop5}
                    target="primary_contact_phone"
                    toggle={() => {
                      setttop5(!ttop5);
                    }}
                  >
                    Fill this field only if the meeting location will always be
                    the same. If the meeting location could be different, leave
                    it blank and the provider will specify it when confirming
                    the tour.
                  </Tooltip> */}
                  <div className="">
                    <Input
                      name="primary_contact_phone"
                      placeholder=""
                      type="text"
                      onChange={validationType.handleChange}
                      onBlur={validationType.handleBlur}
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
                  {/* <i
                    className="uil-question-circle font-size-15 mx-2"
                    id="channel_contact1"
                  />
                  <Tooltip
                    placement="right"
                    isOpen={ttop5}
                    target="channel_contact1"
                    toggle={() => {
                      setttop5(!ttop5);
                    }}
                  >
                    Fill this field only if the meeting location will always be
                    the same. If the meeting location could be different, leave
                    it blank and the provider will specify it when confirming
                    the tour.
                  </Tooltip> */}
                  <div className="">
                    <Input
                      type="select"
                      name="primary_contact_channel"
                      onChange={(e) => {
                        setPrimaryContactChannelSelected(e.target.value);
                      }}
                      onBlur={validationType.handleBlur}
                      //   value={validationType.values.department || ""}
                    >
                      <option value="">Select....</option>
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
                  {/* <i
                    className="uil-question-circle font-size-15 mx-2"
                    id="secondary_contact_phone"
                  />
                  <Tooltip
                    placement="right"
                    isOpen={ttop5}
                    target="secondary_contact_phone"
                    toggle={() => {
                      setttop5(!ttop5);
                    }}
                  >
                    Fill this field only if the meeting location will always be
                    the same. If the meeting location could be different, leave
                    it blank and the provider will specify it when confirming
                    the tour.
                  </Tooltip> */}
                  <div className="">
                    <Input
                      name="secondary_contact_phone"
                      placeholder=""
                      type="text"
                      onChange={validationType.handleChange}
                      onBlur={validationType.handleBlur}
                      value={
                        validationType.values.secondary_contact_phone || ""
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
                  {/* <i
                    className="uil-question-circle font-size-15 mx-2"
                    id="channels2"
                  />
                  <Tooltip
                    placement="right"
                    isOpen={ttop5}
                    target="channels2"
                    toggle={() => {
                      setttop5(!ttop5);
                    }}
                  >
                    Fill this field only if the meeting location will always be
                    the same. If the meeting location could be different, leave
                    it blank and the provider will specify it when confirming
                    the tour.
                  </Tooltip> */}
                  <div className="">
                    <Input
                      type="select"
                      name="secondary_contact_channel"
                      onChange={(e) => {
                        setSecondaryContactChannelSelected(e.target.value);
                      }}
                      onBlur={validationType.handleBlur}
                      //   value={validationType.values.department || ""}
                    >
                      <option value="">Select....</option>
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
              
              </Row>
              <Row>
                {/* <Col className=" d-flex justify-content-end my-2">
                  <Input
                    name="send_voucher"
                    className="my-2 mx-2"
                    type="checkbox"
                    checked={sendVoucherChk}
                    onChange={() => setSendVoucherChk(!sendVoucherChk)}
                    value={sendVoucherChk}
                  />
                  <label className="mt-1">Send Voucher to Provider</label>
                </Col> */}
                
              </Row>
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
        </Collapse>
      </div>
      <AddExtraFeeModal
        extraFeeModal={extraFeeModal}
        setExtraFeeModal={setExtraFeeModal}
        extraFeeEditData={extraFeeEditData}
        id={id}
        section={"operators"}
        refreshTable={refreshTable}
      />
      <AddLocationModal
        locationModal={locationModal}
        setLocationModal={setLocationModal}
        locationEditData={locationEditData}
        id={id}
        section={"operators"}
        refreshTable={refreshTable}
      />
      <AddBoatModal
        locationModal={boatModal}
        setLocationModal={setBoatModal}
        locationEditData={boatEditData}
        id={id}
        section={"operators"}
        refreshTable={refreshTable}
      />
      <AddRestrictionModal
        locationModal={restrictionModal}
        setLocationModal={setRestrictionModal}
        locationEditData={restrictionEditData}
        id={id}
        section={"operators"}
        refreshTable={refreshTable}
      />
    </div>
  );
};

export default AutomatedConfirmation;
