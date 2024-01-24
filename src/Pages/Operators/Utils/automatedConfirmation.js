import { useEffect, useState } from "react";
import {
  getProviderAPI,
  updateProviderAPI,
  updateSocialProviderAPI,
} from "../../../Utils/API/Providers";
import AddExtraFeeModal from "../../../Components/Common/Modals/OperatorsModals/addExtraFeeModal";
import {
  Collapse,
  Form,
  Row,
  Input,
  Label,
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
import { useHistory } from "react-router-dom";
import { Select } from "antd";
import { getExtraFeeTable } from "../../../Utils/API/Operators";
import { map } from "lodash";

const AutomatedConfirmation = ({ socialData, id }) => {
  // const {id} = useHistory()
  // console.log(id)
  //initial info
  const [initialData, setInitialData] = useState({});
  const [extraFeeInitialData, setExtraFeeInitialData] = useState({});
  const [extraFeeEditData, setExtraFeeEditData] = useState([]);
  const [addMore, setAddMore] = useState(false);
  const [ttop1, setttop1] = useState(false);
  const [ttop2, setttop2] = useState(false);
  const [ttop3, setttop3] = useState(false);
  const [ttop4, setttop4] = useState(false);
  const [ttop5, setttop5] = useState(false);
  const [extraFeeModal, setExtraFeeModal] = useState(false);

  useEffect(() => {
   getExtraFeeTable(id).then((resp) =>{
    setExtraFeeInitialData(resp.data.data)
   }).catch((err) => console.log(err))
  }, [id]);

  const refreshTable = () =>{
    getExtraFeeTable(id).then((resp) =>{
      setExtraFeeInitialData(resp.data.data)
     }).catch((err) => console.log(err))
  }
  // console.log('social media',initialData)
  const [col1, setcol1] = useState(false);

  function togglecol1() {
    setcol1(!col1);
  }
console.log(extraFeeInitialData)

  const validationType = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,
    initialValues: {
      facebook: initialData && initialData[0]?.url ? initialData[0].url : "",
      instagram: initialData && initialData[1]?.url ? initialData[1].url : "",
      youtube: initialData && initialData[2]?.url ? initialData[2].url : "",
      twitter: initialData && initialData[3]?.url ? initialData[3].url : "",
      trip_advisor:
        initialData && initialData[4]?.url ? initialData[4].url : "",
      yelp: initialData && initialData[5]?.url ? initialData[5].url : "",
      others: initialData && initialData[6]?.url ? initialData[6].url : "",
    },
    validationSchema: Yup.object().shape({
      // name: Yup.string().required("Name is required"),
    }),
    onSubmit: (values) => {
      let data = {
        facebook: values.facebook ? values.facebook : "",
        instagram: values.instagram ? values.instagram : "",
        youtube: values.youtube ? values.youtube : "",
        twitter: values.twitter ? values.instagram : "",
        trip_advisor: values.trip_advisor ? values.trip_advisor : "",
        yelp: values.yelp ? values.yelp : "",
        others: values.others ? values.others : "",
        foreign_key: id,
      };
      //  console.log(data)
      updateSocialProviderAPI(initialData.id, data)
        .then((resp) => {
          // console.log(resp.data);
          if (resp.data.status === 200) {
            Swal.fire(
              "Edited!",
              "Social Media Information has been edited.",
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
                <p
                  style={{
                    color: "#495057",
                    fontSize: "15px",
                    fontWeight: "bold",
                  }}
                >
                  Enter the details that will be shown on the customer's
                  confirmation voucher. Some of the details will also show on
                  the website. Everything defined here will be applied to ALL of
                  the tours for this operator. If a field may be different for
                  certain tours then leave it blank. You will define it for each
                  tour in the Voucher Templates tab of the Tour Panel.
                </p>
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
                      onClick={() => setExtraFeeModal(!extraFeeModal)}
                    >
                      + Add Extra Fee
                    </label>
                  </div>
                  <div className="table-responsive" style={{ height: "127px" }}>
                    <Card>
                      <Table className="table mb-0">
                        <tbody>
                          {map(extraFeeInitialData, (fee, index) =>{
                            return(
                            <tr>
                             <th className="col-11">{`${index + 1}. ${fee.fee_type}`}</th>
                             <td className="col-1">
                               <div className="d-flex gap-3">
                                 <div className="text-paradise">
                                   <div className="text-success"
                                   onClick={() =>{
                                    setExtraFeeModal(true)
                                    setExtraFeeEditData(fee)
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
                                     // onDelete(tourData);
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
                             </tr>)
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
                    name="textarea"
                    placeholder=""
                    type="textarea"
                    rows="5"
                    onChange={validationType.handleChange}
                    onBlur={validationType.handleBlur}
                    value={validationType.values.textarea || ""}
                    invalid={
                      validationType.touched.textarea &&
                      validationType.errors.textarea
                        ? true
                        : false
                    }
                  />
                  {validationType.touched.textarea &&
                  validationType.errors.textarea ? (
                    <FormFeedback type="invalid">
                      {validationType.errors.textarea}
                    </FormFeedback>
                  ) : null}
                </Col>
              </Row>
              <Row>
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
                    // defaultValue={initialOptionsArea}
                    // onChange={handleMulti}
                  >
                    {/* {map(dataAreas, (item, index) => {
                          return (
                            <Option key={index} value={item.id}>
                              {item.name}
                            </Option>
                          );
                        })} */}
                  </Select>
                  {/* {serviceAreaError && <p style={{color:'#f46a6a', fontSize:'13px', marginTop:'4px'}}>Select a Service Area</p>  } */}
                </Col>
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
                    If the tour has any restrictions specify them one line at a
                    time. They will be shown on the voucher and on the website
                    in the order displayed.
                    <br />
                    To add additional restrictions, click on "+ Add".
                  </Tooltip>
                  <div className="col-10">
                    <Input
                      name="name"
                      placeholder="Add Restriction #1"
                      type="text"
                      className="my-1"
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
                  <div className="col-12 d-flex">
                    <Input
                      name="name"
                      placeholder="Add Restriction #2"
                      className="my-1"
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

                    <div className="col-2">
                      <p
                        style={{ marginLeft: "15px", marginTop: "1px" }}
                        className="text-paradise"
                        onClick={() => setAddMore(!addMore)}
                      >
                        {" "}
                        + Add More
                      </p>
                    </div>
                  </div>
                  {addMore ? (
                    <div className="col-10 d-flex">
                      <Input
                        name="name"
                        placeholder="Add Restriction #3"
                        className="my-1"
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
                  ) : null}
                </Col>
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
                      name="name"
                      placeholder=""
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
        extraFeeModal = {extraFeeModal}
        setExtraFeeModal = {setExtraFeeModal}
        extraFeeEditData={extraFeeEditData}
        id={id}
        refreshTable={refreshTable}
      />
    </div>
  );
};

export default AutomatedConfirmation;
