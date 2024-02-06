import { useEffect, useState } from "react";

import { updateOperator } from "../../../Utils/API/Operators";
import {
  Collapse,
  Form,
  Row,
  Input,
  Label,
  Col,
  FormFeedback,
  Button,
} from "reactstrap";
import classnames from "classnames";
import * as Yup from "yup";
import { useFormik } from "formik";
import Swal from "sweetalert2";
import Switch from "react-switch";
import { useDispatch, useSelector } from "react-redux";
import { serviceAreaData } from "../../../Utils/Redux/Actions/ServiceAreaActions";
// import Select from "react-select";
import 'antd/dist/antd.min.css';
import { Select } from 'antd';
import { map } from "lodash";

const { Option } = Select;
const Offsymbol = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        fontSize: 12,
        color: "#fff",
        // width: "200px",
        paddingRight: 2,
      }}
    >
      {" "}
     No
    </div>
  );
};

const OnSymbol = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        fontSize: 12,
        color: "#fff",
        paddingLeft: 2,
      }}
    >
      {" "}
      Yes
    </div>
  );
};
const EditGeneralInformation = ({ data }) => {
  //initial info
  const [initialData, setInitialData] = useState();
  const [addMore1, setAddMore1] = useState(false);
  const [addMore2, setAddMore2] = useState(false);
  const [selectionID, setSelectionID] = useState({});
  const [serviceAreaError, setServiceAreaError] = useState(false)
  const [switchProvider, setSwitchProvider] = useState(false)
  useEffect(() => {
    setInitialData(data);
  }, [data]);

  useEffect(() => {
    if (initialData && initialData.is_provider === 1) {
      setSwitchProvider(true);
    }else{
      setSwitchProvider(false)
    }
  }, [initialData]);

  useEffect(() => {
    if (initialData && initialData.phone2 !== "") {
      setAddMore1(true);
    }
    if (initialData && initialData.phone3 !== "") {
      setAddMore2(true);
    }
  }, [initialData]);

  // console.log(initialData);
  // console.log(notification);
  const [col1, setcol1] = useState(true);

  function togglecol1() {
    setcol1(!col1);
  }

    //service area options
    const dispatch = useDispatch();
    useEffect(() => {
      var serviceAreaRequest = () => dispatch(serviceAreaData());
      serviceAreaRequest();
    }, [dispatch]);
    const dataAreas = useSelector((state) => state.serviceArea.serviceArea.data);
  
    const [initialOptionsArea, setInitialOptionsArea] = useState([]);

    useEffect(() => {
      if (initialData && dataAreas) {
        let optionsArea = [];
        let optionsAreaShort = [];
  
        dataAreas.forEach((element) => {
          if (initialData.service_areas_ids.includes(element.id)) {
            optionsArea.push({ label: element.name, value: element.id });
            optionsAreaShort.push(element.id)
          }
        });
        setInitialOptionsArea(optionsArea);
        setSelectionID(optionsAreaShort);
      }
    }, [dataAreas, initialData]);
  
    useEffect(() => {
      if (selectionID.length === 0) {
        setServiceAreaError(true)
      } else {
        setServiceAreaError(false)
      }
    }, [selectionID]);
  
    function handleMulti(selected) {
      setSelectionID(selected);
    }

  const validationType = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,
    initialValues: {
      name: initialData ? initialData.name : "",
      legal_name: initialData ? initialData.legal_name : "",
      code: initialData ? initialData.code : "",
      address1: initialData ? initialData.address1 : "",
      address2: initialData ? initialData.address2 : "",
      city: initialData ? initialData.city : "",
      state: initialData ? initialData.state : "",
      zip: initialData ? initialData.zip : "",
      country: initialData ? initialData.country : "",
      website_url: initialData ? initialData.website_url : "",
      is_provider: switchProvider === true ? 1 : 0,
      description: initialData ? initialData.description : "",
      phone1: initialData ? initialData.phone1 : "",
      phone2: initialData ? initialData.phone2 : "",
      phone3: initialData ? initialData.phone3 : "",
      whatsapp1: initialData ? initialData.whatsapp1 : "",
      whatsapp2: initialData ? initialData.whatsapp2 : "",
      whatsapp3: initialData ? initialData.whatsapp3 : "",
      email1: initialData ? initialData.email1 : "",
      email2: initialData ? initialData.email2 : "",
      email3: initialData ? initialData.email3 : "",
    },
    validationSchema: Yup.object().shape({
      name: Yup.string().required("Name is required"),
      code: Yup.string()
        .required("Code is required")
        .max(2, "Must be exactly 2 chars")
        .required("Max 2 chars"),
      country: Yup.string().required("Country code is required"),
        
    }),
    onSubmit: (values) => {
      // console.log(values);
      if (selectionID.length === 0 || selectionID.length === undefined ) {
        setServiceAreaError(true)
      } else {
        setServiceAreaError(false)
        let data = {
          name: values.name ? values.name : "",
          legal_name: values.legal_name ? values.legal_name : "",
          code: values.code ? values.code : "",
          address1: values.address1 ? values.address1 : "",
          address2: values.address2 ? values.address2 : "",
          city: values.city ? values.city : "",
          state: values.state ? values.state : "",
          zip: values.zip ? values.zip : "",
          country: values.country ? values.country : "",
          website_url: values.website_url ? values.website_url : "",
          is_provider: switchProvider === true ? 1 : 0,
          description: values.description ? values.description : "",
          phone1: values.phone1 ? values.phone1 : "",
          phone2: values.phone2 ? values.phone2 : "",
          phone3: values.phone3 ? values.phone3 : "",
          whatsapp1: values.whatsapp1 ? values.whatsapp1 : "",
          whatsapp2: values.whatsapp2 ? values.whatsapp2 : "",
          whatsapp3: values.whatsapp3 ? values.whatsapp3 : "",
          email1: values.email1 ? values.email1 : "",
          email2: values.email2 ? values.email2 : "",
          email3: values.email3 ? values.email3 : "",
          service_area_ids:
            selectionID.length > 0 ? selectionID : initialData.service_areas_ids,
        
        };

        updateOperator(initialData.id, data)
          .then((resp) => {
            // console.log(resp.data);
            if (resp.data.status === 200) {
              Swal.fire(
                "Edited!",
                "General Information has been edited.",
                "success"
              ).then(() => {});
            }
          })
          .catch((error) => {
            if(error.response.data.data === null) {
              Swal.fire(
                "Error!",
                // {error.response.},
                String(error.response.data.message)
              );
            } else {
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
            }
          });
      }
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
            General Information
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
                <Col className="col-5">
                  <div className="form-outline mb-2">
                    <Label className="form-label">Name*</Label>
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
                <Col className="col-5">
                  <div className="form-outline mb-2">
                    <Label className="form-label">Legal Name</Label>
                    <Input
                      name="legal_name"
                      placeholder=""
                      type="text"
                      onChange={validationType.handleChange}
                      onBlur={validationType.handleBlur}
                      value={validationType.values.legal_name || ""}
                      invalid={
                        validationType.touched.legal_name &&
                        validationType.errors.legal_name
                          ? true
                          : false
                      }
                    />
                    {validationType.touched.legal_name &&
                    validationType.errors.legal_name ? (
                      <FormFeedback type="invalid">
                        {validationType.errors.legal_name}
                      </FormFeedback>
                    ) : null}
                  </div>
                </Col>
                <Col className="col-2">
                  <div className="form-outline mb-2">
                    <Label className="form-label">2-Digit Code*</Label>
                    <Input
                      disabled="true"
                      name="code"
                      placeholder=""
                      type="text"
                      onChange={validationType.handleChange}
                      onBlur={validationType.handleBlur}
                      value={validationType.values.code || ""}
                      invalid={
                        validationType.touched.code &&
                        validationType.errors.code
                          ? true
                          : false
                      }
                    />
                    {validationType.touched.code &&
                    validationType.errors.code ? (
                      <FormFeedback type="invalid">
                        {validationType.errors.code}
                      </FormFeedback>
                    ) : null}
                  </div>
                </Col>
              </Row>
              <Row>
                <Col className="col-5">
                  <div className="form-outline mb-2">
                    <Label className="form-label">Address Line 1</Label>
                    <Input
                      name="address1"
                      placeholder=""
                      type="text"
                      onChange={validationType.handleChange}
                      onBlur={validationType.handleBlur}
                      value={validationType.values.address1 || ""}
                      invalid={
                        validationType.touched.address1 &&
                        validationType.errors.address1
                          ? true
                          : false
                      }
                    />
                    {validationType.touched.address1 &&
                    validationType.errors.address1 ? (
                      <FormFeedback type="invalid">
                        {validationType.errors.address1}
                      </FormFeedback>
                    ) : null}
                  </div>
                </Col>
                <Col className="col-5">
                  <div className="form-outline mb-2">
                    <Label className="form-label">Address Line 2</Label>
                    <Input
                      name="address2"
                      placeholder=""
                      type="text"
                      onChange={validationType.handleChange}
                      onBlur={validationType.handleBlur}
                      value={validationType.values.address2 || ""}
                      invalid={
                        validationType.touched.address2 &&
                        validationType.errors.address2
                          ? true
                          : false
                      }
                    />
                    {validationType.touched.address2 &&
                    validationType.errors.address2 ? (
                      <FormFeedback type="invalid">
                        {validationType.errors.address2}
                      </FormFeedback>
                    ) : null}
                  </div>
                </Col>
                <Col className="col-1">
                    <Label className="form-label mt-2">Provider</Label>
                  <div className="">
                  <Switch
                      uncheckedIcon={<Offsymbol />}
                      checkedIcon={<OnSymbol />}
                      onColor="#3DC7F4"
                      width={70}
                      onChange={() => {
                        setSwitchProvider(!switchProvider);
                      }}
                      checked={switchProvider}
                    />
                   
                  </div>
                </Col>
              </Row>

              <Row>
                <Col className="col-3">
                  <div className="form-outline mb-2">
                    <Label className="form-label">Phone</Label>
                    <Input
                      name="phone1"
                      placeholder=""
                      type="text"
                      onChange={validationType.handleChange}
                      onBlur={validationType.handleBlur}
                      value={validationType.values.phone1 || ""}
                      invalid={
                        validationType.touched.phone1 &&
                        validationType.errors.phone1
                          ? true
                          : false
                      }
                    />
                    {validationType.touched.phone1 &&
                    validationType.errors.phone1 ? (
                      <FormFeedback type="invalid">
                        {validationType.errors.phone1}
                      </FormFeedback>
                    ) : null}
                  </div>
                </Col>

                <Col className="col-3">
                  <div className="form-outline mb-2">
                    <Label className="form-label">WhatsApp</Label>
                    <Input
                      name="whatsapp1"
                      placeholder=""
                      type="text"
                      onChange={validationType.handleChange}
                      onBlur={validationType.handleBlur}
                      value={validationType.values.whatsapp1 || ""}
                      invalid={
                        validationType.touched.whatsapp1 &&
                        validationType.errors.whatsapp1
                          ? true
                          : false
                      }
                    />
                    {validationType.touched.whatsapp1 &&
                    validationType.errors.whatsapp1 ? (
                      <FormFeedback type="invalid">
                        {validationType.errors.whatsapp1}
                      </FormFeedback>
                    ) : null}
                  </div>
                </Col>

                <Col className="col-3">
                  <div className="form-outline mb-2">
                    <Label className="form-label">Email</Label>
                    <Input
                      name="email1"
                      placeholder=""
                      type="text"
                      onChange={validationType.handleChange}
                      onBlur={validationType.handleBlur}
                      value={validationType.values.email1 || ""}
                      invalid={
                        validationType.touched.email1 &&
                        validationType.errors.email1
                          ? true
                          : false
                      }
                    />
                    {validationType.touched.email1 &&
                    validationType.errors.email1 ? (
                      <FormFeedback type="invalid">
                        {validationType.errors.email1}
                      </FormFeedback>
                    ) : null}
                  </div>
                </Col>

                <Col className="col-3">
                  <div className="form-outline mb-2 mt-4">
                    <Label
                      className="form-label text-info"
                      onClick={() => setAddMore1(!addMore1)}
                      style={{ cursor: "pointer" }}
                    >
                      Add more +
                    </Label>
                  </div>
                </Col>
              </Row>

              {addMore1 && (
                <Row>
                  <Col className="col-3">
                    <div className="form-outline mb-2">
                      <Label className="form-label">Phone 2</Label>
                      <Input
                        name="phone2"
                        placeholder=""
                        type="text"
                        onChange={validationType.handleChange}
                        onBlur={validationType.handleBlur}
                        value={validationType.values.phone2 || ""}
                        invalid={
                          validationType.touched.phone2 &&
                          validationType.errors.phone2
                            ? true
                            : false
                        }
                      />
                      {validationType.touched.phone2 &&
                      validationType.errors.phone2 ? (
                        <FormFeedback type="invalid">
                          {validationType.errors.phone2}
                        </FormFeedback>
                      ) : null}
                    </div>
                  </Col>

                  <Col className="col-3">
                    <div className="form-outline mb-2">
                      <Label className="form-label">WhatsApp 2</Label>
                      <Input
                        name="whatsapp2"
                        placeholder=""
                        type="text"
                        onChange={validationType.handleChange}
                        onBlur={validationType.handleBlur}
                        value={validationType.values.whatsapp2 || ""}
                        invalid={
                          validationType.touched.whatsapp2 &&
                          validationType.errors.whatsapp2
                            ? true
                            : false
                        }
                      />
                      {validationType.touched.whatsapp2 &&
                      validationType.errors.whatsapp2 ? (
                        <FormFeedback type="invalid">
                          {validationType.errors.whatsapp2}
                        </FormFeedback>
                      ) : null}
                    </div>
                  </Col>

                  <Col className="col-3">
                    <div className="form-outline mb-2">
                      <Label className="form-label">Email 2</Label>
                      <Input
                        name="email2"
                        placeholder=""
                        type="text"
                        onChange={validationType.handleChange}
                        onBlur={validationType.handleBlur}
                        value={validationType.values.email2 || ""}
                        invalid={
                          validationType.touched.email2 &&
                          validationType.errors.email2
                            ? true
                            : false
                        }
                      />
                      {validationType.touched.email2 &&
                      validationType.errors.email2 ? (
                        <FormFeedback type="invalid">
                          {validationType.errors.email2}
                        </FormFeedback>
                      ) : null}
                    </div>
                  </Col>

                  <Col className="col-3">
                    <div className="form-outline mb-2 mt-4">
                      <Label
                        className="form-label text-info"
                        onClick={() => setAddMore2(!addMore2)}
                        style={{ cursor: "pointer" }}
                      >
                        Add more +
                      </Label>
                    </div>
                  </Col>
                </Row>
              )}
              {addMore2 && (
                <Row>
                  <Col className="col-3">
                    <div className="form-outline mb-2">
                      <Label className="form-label">Phone 3</Label>
                      <Input
                        name="phone3"
                        placeholder=""
                        type="text"
                        onChange={validationType.handleChange}
                        onBlur={validationType.handleBlur}
                        value={validationType.values.phone3 || ""}
                        invalid={
                          validationType.touched.phone3 &&
                          validationType.errors.phone3
                            ? true
                            : false
                        }
                      />
                      {validationType.touched.phone3 &&
                      validationType.errors.phone3 ? (
                        <FormFeedback type="invalid">
                          {validationType.errors.phone3}
                        </FormFeedback>
                      ) : null}
                    </div>
                  </Col>

                  <Col className="col-3">
                    <div className="form-outline mb-2">
                      <Label className="form-label">WhatsApp 3</Label>
                      <Input
                        name="whatsapp3"
                        placeholder=""
                        type="text"
                        onChange={validationType.handleChange}
                        onBlur={validationType.handleBlur}
                        value={validationType.values.whatsapp3 || ""}
                        invalid={
                          validationType.touched.whatsapp3 &&
                          validationType.errors.whatsapp3
                            ? true
                            : false
                        }
                      />
                      {validationType.touched.whatsapp3 &&
                      validationType.errors.whatsapp3 ? (
                        <FormFeedback type="invalid">
                          {validationType.errors.whatsapp3}
                        </FormFeedback>
                      ) : null}
                    </div>
                  </Col>

                  <Col className="col-3">
                    <div className="form-outline mb-2">
                      <Label className="form-label">Email 3</Label>
                      <Input
                        name="email3"
                        placeholder=""
                        type="text"
                        onChange={validationType.handleChange}
                        onBlur={validationType.handleBlur}
                        value={validationType.values.email3 || ""}
                        invalid={
                          validationType.touched.email3 &&
                          validationType.errors.email3
                            ? true
                            : false
                        }
                      />
                      {validationType.touched.email3 &&
                      validationType.errors.email3 ? (
                        <FormFeedback type="invalid">
                          {validationType.errors.email3}
                        </FormFeedback>
                      ) : null}
                    </div>
                  </Col>
                </Row>
              )}

              <Row>
                <Col className="col-3">
                  <div className="form-outline mb-2">
                    <Label className="form-label">City</Label>
                    <Input
                      name="city"
                      placeholder=""
                      type="text"
                      onChange={validationType.handleChange}
                      onBlur={validationType.handleBlur}
                      value={validationType.values.city || ""}
                      invalid={
                        validationType.touched.city &&
                        validationType.errors.city
                          ? true
                          : false
                      }
                    />
                    {validationType.touched.city &&
                    validationType.errors.city ? (
                      <FormFeedback type="invalid">
                        {validationType.errors.city}
                      </FormFeedback>
                    ) : null}
                  </div>
                </Col>
                <Col className="col-3">
                  <div className="form-outline mb-2">
                    <Label className="form-label">State/Province/Region</Label>
                    <Input
                      name="state"
                      placeholder=""
                      type="text"
                      onChange={validationType.handleChange}
                      onBlur={validationType.handleBlur}
                      value={validationType.values.state || ""}
                      invalid={
                        validationType.touched.state &&
                        validationType.errors.state
                          ? true
                          : false
                      }
                    />
                    {validationType.touched.state &&
                    validationType.errors.state ? (
                      <FormFeedback type="invalid">
                        {validationType.errors.state}
                      </FormFeedback>
                    ) : null}
                  </div>
                </Col>
                <Col className="col-3">
                  <div className="form-outline mb-2">
                    <Label className="form-label">ZIP/Postal Code</Label>
                    <Input
                      name="zip"
                      placeholder=""
                      type="text"
                      onChange={validationType.handleChange}
                      onBlur={validationType.handleBlur}
                      value={validationType.values.zip || ""}
                      invalid={
                        validationType.touched.zip && validationType.errors.zip
                          ? true
                          : false
                      }
                    />
                    {validationType.touched.zip && validationType.errors.zip ? (
                      <FormFeedback type="invalid">
                        {validationType.errors.zip}
                      </FormFeedback>
                    ) : null}
                  </div>
                </Col>
                <Col className="col-3">
                  <div className="form-outline mb-2">
                    <Label className="form-label">Country Code*</Label>
                    <Input
                      name="country"
                      placeholder="MX"
                      type="text"
                      onChange={validationType.handleChange}
                      onBlur={validationType.handleBlur}
                      value={validationType.values.country || ""}
                      invalid={
                        validationType.touched.country &&
                        validationType.errors.country
                          ? true
                          : false
                      }
                    />
                    {validationType.touched.country &&
                    validationType.errors.country ? (
                      <FormFeedback type="invalid">
                        {validationType.errors.country}
                      </FormFeedback>
                    ) : null}
                  </div>
                </Col>
              </Row>
              <Row>
                <Col className="col-3">
                  <div className="form-outline mb-2">
                    <Label className="form-label">Website URL</Label>
                    <Input
                      name="website_url"
                      placeholder=""
                      type="text"
                      onChange={validationType.handleChange}
                      onBlur={validationType.handleBlur}
                      value={validationType.values.website_url || ""}
                      invalid={
                        validationType.touched.website_url &&
                        validationType.errors.website_url
                          ? true
                          : false
                      }
                    />
                    {validationType.touched.website_url &&
                    validationType.errors.website_url ? (
                      <FormFeedback type="invalid">
                        {validationType.errors.website_url}
                      </FormFeedback>
                    ) : null}
                  </div>
                </Col>
                <Col className="col-3">
                {dataAreas && initialOptionsArea.length > 0 ? (
                    <div className="form-outline mb-4">
                      <Label className="form-label">Service Area</Label>

                      <Select
                        mode="multiple"
                        allowClear
                        style={{ width: "100%", paddingTop: "5px" }}
                        placeholder="Please select"
                        defaultValue={initialOptionsArea}
                        onChange={handleMulti}
                      >
                        {map(dataAreas, (item, index) => {
                          return (
                            <Option key={index} value={item.id}>
                              {item.name}
                            </Option>
                          );
                        })}
                      </Select>
                      {serviceAreaError && <p style={{color:'#f46a6a', fontSize:'13px', marginTop:'4px'}}>Select a Service Area</p>  }
                    </div>
                  ) : null}
                  {dataAreas && initialOptionsArea.length === 0 ? (
                    <div className="form-outline mb-4">
                      <Label className="form-label">Service Area</Label>

                      <Select
                        mode="multiple"
                        allowClear
                        style={{ width: "100%", paddingTop: "5px" }}
                        placeholder="Please select"
                        onChange={handleMulti}
                      >
                        {map(dataAreas, (item, index) => {
                          return (
                            <Option key={index} value={item.id}>
                              {item.name}
                            </Option>
                          );
                        })}
                      </Select>
                      {serviceAreaError && <p style={{color:'#f46a6a', fontSize:'13px', marginTop:'4px'}}>Select a Service Area</p>  }
                    </div>
                  ) : null}
                </Col>
              </Row>

              <Row>
                <Col className="col-12">
                  <div className="form-outline mb-2">
                    <Label className="form-label">Operators Description</Label>
                    <Input
                      name="description"
                      placeholder=""
                      type="textarea"
                      rows="5"
                      onChange={validationType.handleChange}
                      onBlur={validationType.handleBlur}
                      value={validationType.values.description || ""}
                      invalid={
                        validationType.touched.description &&
                        validationType.errors.description
                          ? true
                          : false
                      }
                    />
                    {validationType.touched.description &&
                    validationType.errors.description ? (
                      <FormFeedback type="invalid">
                        {validationType.errors.description}
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
    </div>
  );
};

export default EditGeneralInformation;
