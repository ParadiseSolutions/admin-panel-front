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
  deleteExtraFee,
  getBringList,
  getExtraFeeTable,
  getVoucherInfo,
  putVoucherInformation,
} from "../../../Utils/API/Operators";
import { map } from "lodash";
import { Option } from "antd/lib/mentions";

const AutomatedConfirmation = ({ socialData, id }) => {
  // const {id} = useHistory()
  // console.log(id)
  //initial info
  // const [initialData, setInitialData] = useState({});
  const [extraFeeInitialData, setExtraFeeInitialData] = useState({});
  const [bringListInitialData, setBringListInitialData] = useState([]);
  const [initialOptionsArea, setInitialOptionsArea] = useState([]);
  const [selectionID, setSelectionID] = useState({});
  const [voucherInitialData, setVoucherInitialData] = useState();
  const [extraFeeEditData, setExtraFeeEditData] = useState([]);
  const [restrictionList, setRestrictionList] = useState([]);
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
  const [extraFeeModal, setExtraFeeModal] = useState(false);

  useEffect(() => {
    getExtraFeeTable(id)
      .then((resp) => {
        setExtraFeeInitialData(resp.data.data);
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
  }, [id]);

  const refreshTable = () => {
    getExtraFeeTable(id)
      .then((resp) => {
        setExtraFeeInitialData(resp.data.data);
      })
      .catch((err) => console.log(err));
  };

  const [col1, setcol1] = useState(false);

  function togglecol1() {
    setcol1(!col1);
  }
  // console.log("lista de brings", bringListInitialData);
  console.log("data inicial", voucherInitialData);
  // console.log("opciones que deberian de ir en el select", initialOptionsArea);
  //----- bring list
  function handleMulti(selected) {
    setSelectionID(selected);
    console.log(selectionID);
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
      // console.log('option area', optionsArea)
      setInitialOptionsArea(optionsArea);
      setSelectionID(optionsAreaShort);
      setRestrictionList(voucherInitialData.restrictions);
    }
  }, [voucherInitialData, bringListInitialData]);

  console.log(selectionID);

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
      aditional_information: voucherInitialData?.additional_information
        ? voucherInitialData.additional_information
        : "",
      meeting_location: voucherInitialData?.meeting_location
        ? voucherInitialData.meeting_location
        : "",
      // youtube: initialData && initialData[2]?.url ? initialData[2].url : "",
      // twitter: initialData && initialData[3]?.url ? initialData[3].url : "",
      // trip_advisor:
      //   initialData && initialData[4]?.url ? initialData[4].url : "",
      // yelp: initialData && initialData[5]?.url ? initialData[5].url : "",
      // others: initialData && initialData[6]?.url ? initialData[6].url : "",
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
      };
      console.log("data a enviar", data);
      putVoucherInformation(voucherInitialData.operator_id, data)
        .then((resp) => {
          // console.log(resp.data);
          if (resp.data.status === 201) {
            Swal.fire(
              "Edited!",
              "Automated Confirmation Information has been edited.",
              "success"
            ).then(() => {});
          }
        })
        .catch((error) => {
          // console.log(error.response);
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
    console.log(feeID);
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
          console.log(resp.data.data);
          if (resp.data.status === 200) {
            refreshTable();
            Swal.fire("deleted!", "Extra fee has been edited.", "success");
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
                      The details below will be shown on the customer's
                      confirmation voucher. Some of the details will also show
                      on the website. If any details appear greyed out, they
                      have been specified in the operator panel and apply to all
                      of the tours for this operator. They can only be changed
                      in the operator panel. New details added here will only
                      display for this tour and not for other tours from this
                      operator.
                    </p>
                  </div>
                </Col>
              </Row>
              <Row className="mt-3">
                <Col className="col-6">
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
                        are displayed in the list. To add a fee to the list,
                        click on "Add Extra Fee". To edit a fee, click on the
                        pencil icon next to the fee.
                      </Tooltip>
                    </div>

                    <label
                      className="text-paradise"
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        setExtraFeeEditData([]);
                        setExtraFeeModal(!extraFeeModal)
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
                <Col className="col-6">
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
              <Row>
                {voucherInitialData?.brings && initialOptionsArea.length > 0 ? (
                  <Col className="col-6 mt-3">
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
                      the tour. This will be shown on the voucher and on the
                      website. The items will be shown in the order they are
                      selected.
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
                  <Col className="col-6 mt-3">
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
                      the tour. This will be shown on the voucher and on the
                      website. The items will be shown in the order they are
                      selected.
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

                {restrictionList ? (
                  <Col className="col-6 my-3">
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
                      If the tour has any restrictions specify them one line at
                      a time. They will be shown on the voucher and on the
                      website in the order displayed.
                      <br />
                      To add additional restrictions, click on "+ Add".
                    </Tooltip>
                    <div className="col-10">
                      <Input
                        name="rest_one"
                        placeholder="Add Restriction #1"
                        type="text"
                        className="my-1"
                        onChange={(e) => setRest1(e.target.value)}
                        value={rest1}
                      />
                    </div>
                    <div className="col-12 d-flex">
                      <Input
                        name="rest_two"
                        placeholder="Add Restriction #2"
                        className="my-1"
                        type="text"
                        onChange={(e) => setRest2(e.target.value)}
                        value={rest2}
                      />

                      <div className="col-2">
                        <p
                          style={{
                            marginLeft: "15px",
                            marginTop: "10px",
                            cursor: "pointer",
                          }}
                          className="text-paradise"
                          onClick={() => setAddMore(!addMore)}
                        >
                          {addMore
                            ? null && restrictionList.length > 0
                            : "+ Add"}
                        </p>
                      </div>
                    </div>
                    {addMore || restrictionList.length > 2 ? (
                      <>
                        <div className="col-10 d-flex">
                          <Input
                            name="rest_three"
                            placeholder="Add Restriction #3"
                            className="my-1"
                            type="text"
                            onChange={(e) => setRest3(e.target.value)}
                            value={rest3}
                          />
                        </div>
                        <div className="col-10 d-flex">
                          <Input
                            name="rest_four"
                            placeholder="Add Restriction #4"
                            className="my-1"
                            type="text"
                            onChange={(e) => setRest4(e.target.value)}
                            value={rest4}
                          />
                        </div>
                      </>
                    ) : null}
                  </Col>
                ) : null}
              </Row>
              <Row>
                <Col className="col-6 my-3">
                  <label>Meeting Location</label>
                  <i
                    className="uil-question-circle font-size-15 mx-2"
                    id="meetingLocation"
                  />
                  <Tooltip
                    placement="right"
                    isOpen={ttop5}
                    target="meetingLocation"
                    toggle={() => {
                      setttop5(!ttop5);
                    }}
                  >
                    Fill this field only if the meeting location will always be
                    the same. If the meeting location could be different, leave
                    it blank and the provider will specify it when confirming
                    the tour.
                  </Tooltip>
                  <div className="">
                    <Input
                      name="meeting_location"
                      placeholder=""
                      type="text"
                      onChange={validationType.handleChange}
                      onBlur={validationType.handleBlur}
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
    </div>
  );
};

export default AutomatedConfirmation;
