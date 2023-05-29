import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getSeasonsAPI,
  getAvailableFromAPI,
  putSettingsAPI,
  getAvailableAPI,
} from "../../../Utils/API/Tours";
import SettingsImageOne from "../../../Components/Assets/images/settings1.png";
import SettingsImageTwo from "../../../Components/Assets/images/settings2.png";
import SettingsImageThree from "../../../Components/Assets/images/settings3.png";
import AvailableCheckbox from "./availableCheckbox";
import {
  TabPane,
  Row,
  Col,
  Form,
  Label,
  Input,
  FormFeedback,
  Button,
} from "reactstrap";
// import classnames from "classnames";

// import * as Yup from "yup";
import { useFormik } from "formik";
import { map } from "lodash";
import Swal from "sweetalert2";
import { Select } from "antd";
const { Option } = Select;

const Settings = ({ history, tourSettings, id, toggle }) => {
  // console.log("settings", tourSettings);

  //seasons request
  const [seasonData, setSeasonData] = useState();
  useEffect(() => {
    getSeasonsAPI().then((resp) => {
      setSeasonData(resp.data.data);
    });
  }, []);
  //seasons request
  const [availableData, setAvailableData] = useState([]);
  const [availableFromData, setAvailableFormData] = useState([])
  useEffect(() => {
    getAvailableFromAPI().then((resp) => {
      setAvailableData(resp.data.data);
    });
    getAvailableAPI().then((resp) => {
      setAvailableFormData(resp.data.data);
    });
  }, []);
  const [initialOptionsArea, setInitialOptionsArea] = useState([]);
  useEffect(() => {
    if (tourSettings && availableData) {
      let optionsArea = [];

      availableData.forEach((element) => {
        if (
          tourSettings.available_seasons &&
          tourSettings.available_seasons.includes(element.id.toString())
        ) {
          optionsArea.push({ label: element.name, value: element.id });
        }
      });
      setInitialOptionsArea(optionsArea);
    }
  }, [availableData, tourSettings]);

  //season select
  const [seasonSelected, setSeasonSelected] = useState(
    tourSettings.available_seasons
  );
  function handleMulti(selected) {
    setSeasonSelected(selected);
  }

  //available from
  const [availableFromIDs, setAvailableFromIDs] = useState([]);
  const [newListID, setNewListID] = useState([]);
  
  useEffect(() => {
    setAvailableFromIDs(tourSettings.available_from);
  }, [tourSettings]);

  //seasonal price
  const [seasonalPrice, setSeasonalPrice] = useState(null);
  useEffect(() => {
    setSeasonalPrice(
      tourSettings?.seasonality && tourSettings.seasonality === 1 ? true : false
    );
  }, [tourSettings]);
  //form creation

  // console.log('id',availableFromIDs)
  const validationType = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,
    initialValues: {
      tour_id: id,
      provider_tour_name: tourSettings.provider_tour_name
        ? tourSettings.provider_tour_name
        : "",
      available_seasons: tourSettings.available_seasons,
      provider_tour_url: tourSettings.provider_tour_url
        ? tourSettings.provider_tour_url
        : "",
      infants_range_from: tourSettings.infants_range_from
        ? tourSettings.infants_range_from
        : "",
      infants_range_to: tourSettings.infants_range_to
        ? tourSettings.infants_range_to
        : "",
      kids_range_from: tourSettings.kids_range_from
        ? tourSettings.kids_range_from
        : "",
      kids_range_to: tourSettings.kids_range_to
        ? tourSettings.kids_range_to
        : "",
      teenagers_range_from: tourSettings.teenagers_range_from
        ? tourSettings.teenagers_range_from
        : "",
      teenagers_range_to: tourSettings.teenagers_range_to
        ? tourSettings.teenagers_range_to
        : "",
    },
    // validationSchema: Yup.object().shape({
    //   tour_name: Yup.string().required("Field required"),
    //   code: Yup.string()
    //     .required("Code is required")
    //     .max(2, "Must be exactly 2 chars")
    //     .required("Max 2 chars"),
    // }),
    onSubmit: (values) => {
      let data = {
        provider_tour_name: values.provider_tour_name
          ? values.provider_tour_name
          : "",
        provider_tour_url: values.provider_tour_url
          ? values.provider_tour_url
          : "",
        available_seasons: seasonSelected,
        available_from: availableFromIDs,
        infants_range_from: values.infants_range_from
          ? values.infants_range_from
          : "",
        infants_range_to: values.infants_range_to
          ? values.infants_range_to
          : "",
        kids_range_from: values.kids_range_from ? values.kids_range_from : "",
        kids_range_to: values.kids_range_to ? values.kids_range_to : "",
        teenagers_range_from: values.teenagers_range_from
          ? values.teenagers_range_from
          : "",
        teenagers_range_to: values.teenagers_range_to
          ? values.teenagers_range_to
          : "",
        seasonality: seasonalPrice === true ? 1 : 0,
      };

    //  console.log('data a enviar', data) 

      putSettingsAPI(id, data)
        .then((resp) => {
          // console.log(resp.data);
          if (resp.data.status === 200) {
            Swal.fire("Edited!", "Settings has been created.", "success");
            toggle('3')
          }
        })
        .catch((error) => {
          // console.log(error.response);
          Swal.fire("Error!", `${error.response.data.data[0]}`, "error");
        });
    },
  });

  return (
    <Form
      onSubmit={(e) => {
        e.preventDefault();
        validationType.handleSubmit();
        return false;
      }}
      className="custom-validation"
    >
      <TabPane tabId="1" className="">
        <Row className=" d-flex justify-content-between pb-4 ">
          <Col className="col-md-4">
            <img
              src={SettingsImageThree}
              alt="image1"
              className="w-100"
            />
          </Col>
          <Col className="col-md-4">
            <img
              src={SettingsImageOne}
              alt="image1"
              className="w-100"
            />
          </Col>
          <Col className="col-md-4">
            <img
              src={SettingsImageTwo}
              alt="image1"
              className="w-100"
            />
          </Col>
        </Row>

        <Row>
          <Col className="col-12">
            <div className="mb-2 p-2" style={{ backgroundColor: "#E9F4FF" }}>
              <p
                className="px-2"
                style={{
                  fontSize: "20px",
                  fontWeight: "bold",
                  color: "#495057",
                  marginBottom: "0px",
                }}
              >
                TOUR SETTINGS
              </p>
            </div>            
          </Col>                   
          <Col className="col-1">
            <div className="form-outline mt-2">
              <Label className="form-label">Tour ID</Label>
              <Input
                name="tour_id"
                placeholder=""
                type="text"
                disabled
                value={validationType.values.tour_id || ""}
              />
            </div>
          </Col>
          <Col className="col-6">
            <div className="form-outline mt-2">
              <Label className="form-label">Provider Tour Name</Label>
              <Input
                name="provider_tour_name"
                placeholder=""
                type="text"
                onChange={validationType.handleChange}
                onBlur={validationType.handleBlur}
                value={validationType.values.provider_tour_name || ""}
                invalid={
                  validationType.touched.provider_tour_name &&
                  validationType.errors.provider_tour_name
                    ? true
                    : false
                }
              />
              {validationType.touched.provider_tour_name &&
              validationType.errors.provider_tour_name ? (
                <FormFeedback type="invalid">
                  {validationType.errors.provider_tour_name}
                </FormFeedback>
              ) : null}
            </div>
          </Col>
          <Col className="col-5">
            <div className="form-outline mt-2">
              <Label className="form-label">Provider Tour URL</Label>
              <Input
                name="provider_tour_url"
                placeholder=""
                type="text"
                onChange={validationType.handleChange}
                onBlur={validationType.handleBlur}
                value={validationType.values.provider_tour_url || ""}
                invalid={
                  validationType.touched.provider_tour_url &&
                  validationType.errors.provider_tour_url
                    ? true
                    : false
                }
              />
              {validationType.touched.provider_tour_url &&
              validationType.errors.provider_tour_url ? (
                <FormFeedback type="invalid">
                  {validationType.errors.provider_tour_url}
                </FormFeedback>
              ) : null}
            </div>
          </Col>
          </Row>  
          
          <Row>
            

              {tourSettings?.website_id !== 3 
              ? 
              <>
              <Col className="col-1">
                <Label className="form-label mt-2">Seasonal Prices</Label>
                <div className="form-check form-switch form-switch-md mx-4 ">
                  <Input
                    name="seasonality"
                    placeholder=""
                    type="checkbox"
                    checked={seasonalPrice}
                    className="form-check-input"
                    onChange={() => setSeasonalPrice(!seasonalPrice)}
                    onBlur={validationType.handleBlur}
                    value={seasonalPrice}
                    invalid={
                      validationType.touched.seasonality &&
                      validationType.errors.seasonality
                        ? true
                        : false
                    }
                  />
                  {validationType.touched.seasonality &&
                  validationType.errors.seasonality ? (
                    <FormFeedback type="invalid">
                      {validationType.errors.seasonality}
                    </FormFeedback>
                  ) : null}
                </div>
              </Col>
              <Col className="col-3">
                <div className="form-outline my-2">
                  <Label className="form-label">Available Seasons</Label>

                  <Select
                    mode="multiple"
                    allowClear
                    style={{ width: "100%", paddingTop: "5px" }}
                    placeholder="Please select"
                    defaultValue={initialOptionsArea}
                    onChange={handleMulti}
                  >
                    {map(availableData, (item, index) => {
                      return (
                        <Option key={index} value={item.id}>
                          {item.name}
                        </Option>
                      );
                    })}
                  </Select>
                </div>
              </Col>
              </>
              :
              <>
              <Col className="d-flex align-items-center">
                <Label className="form-label mb-0">Available From: </Label>
              </Col>

              
                {availableFromData.length > 0 ? (
                  <>
                    {map(availableFromData, (available, index) => {
                      return (
                        <Col key={index} className="col">
                          <div className="form-check">
                            <AvailableCheckbox
                              available={available}
                              availableFromIDs={availableFromIDs}
                              setNewListID={setNewListID}
                              setAvailableFromIDs={setAvailableFromIDs}
                            />
                          </div>
                        </Col>
                      );
                    })}
                  </>
                ) : null}
              
              </>
              }
              


              
            
          </Row>
          <Row>
            <Col className="col-12" >
            <div className="mb-4 py-2 px-3" style={{ backgroundColor: "#FFEFDE" }}>
              <p
                
                style={{
                  fontSize: "20px",
                  fontWeight: "bold",
                  color: "#495057",
                  marginBottom: "0px",
                }}
              >
                AGES
              </p>
            </div>

            </Col>
            
          </Row>
          <Row className="row">
            
              <Col className="col-md-4 col-12 d-flex align-items-center px-md-5">
                <Label className="form-label me-4 mb-md-0">Infants</Label>
                  <div className="input-group me-4">
                    <span className="input-group-text">From</span>
                    <Input
                      name="infants_range_from"
                      placeholder=""
                      type="text"
                      onChange={validationType.handleChange}
                      onBlur={validationType.handleBlur}
                      value={validationType.values.infants_range_from || ""}
                      invalid={
                        validationType.touched.infants_range_from &&
                        validationType.errors.infants_range_from
                          ? true
                          : false
                      }
                    />
                    {validationType.touched.infants_range_from &&
                    validationType.errors.infants_range_from ? (
                      <FormFeedback type="invalid">
                        {validationType.errors.infants_range_from}
                      </FormFeedback>
                    ) : null}
                  </div>              
                
                  <div className="input-group">
                    <span className="input-group-text">To</span>
                    <Input
                      name="infants_range_to"
                      placeholder=""
                      type="text"
                      onChange={validationType.handleChange}
                      onBlur={validationType.handleBlur}
                      value={validationType.values.infants_range_to || ""}
                      invalid={
                        validationType.touched.infants_range_to &&
                        validationType.errors.infants_range_to
                          ? true
                          : false
                      }
                    />
                    {validationType.touched.infants_range_to &&
                    validationType.errors.infants_range_to ? (
                      <FormFeedback type="invalid">
                        {validationType.errors.infants_range_to}
                      </FormFeedback>
                    ) : null}
                  </div>
                
              </Col>
              <Col className="col-md-4 col-12 d-flex align-items-center px-md-5">                
                <Label className="form-label me-4 mb-0">Kids</Label>                
                <div className="input-group me-4">
                <span className="input-group-text">From</span>
                  <Input
                    name="kids_range_from"
                    placeholder=""
                    type="text"
                    onChange={validationType.handleChange}
                    onBlur={validationType.handleBlur}
                    value={validationType.values.kids_range_from || ""}
                    invalid={
                      validationType.touched.kids_range_from &&
                      validationType.errors.kids_range_from
                        ? true
                        : false
                    }
                  />
                  {validationType.touched.kids_range_from &&
                  validationType.errors.kids_range_from ? (
                    <FormFeedback type="invalid">
                      {validationType.errors.kids_range_from}
                    </FormFeedback>
                  ) : null}
                </div>
                
                
                  <div className="input-group">
                  <span className="input-group-text">To</span>
                    <Input
                      name="kids_range_to"
                      placeholder=""
                      type="text"
                      onChange={validationType.handleChange}
                      onBlur={validationType.handleBlur}
                      value={validationType.values.kids_range_to || ""}
                      invalid={
                        validationType.touched.kids_range_to &&
                        validationType.errors.kids_range_to
                          ? true
                          : false
                      }
                    />
                    {validationType.touched.kids_range_to &&
                    validationType.errors.kids_range_to ? (
                      <FormFeedback type="invalid">
                        {validationType.errors.kids_range_to}
                      </FormFeedback>
                    ) : null}
                  </div>
                
              </Col>
              <Col className="d-flex col-md-4 col-12 align-items-center px-md-5">
                
                <Label className="form-label me-4 mb-0">Teenagers</Label>                
                <div className="input-group me-4">
                  <span className="input-group-text">From</span>
                  <Input
                    name="teenagers_range_from"
                    placeholder=""
                    type="text"
                    onChange={validationType.handleChange}
                    onBlur={validationType.handleBlur}
                    value={validationType.values.teenagers_range_from || ""}
                    invalid={
                      validationType.touched.teenagers_range_from &&
                      validationType.errors.teenagers_range_from
                        ? true
                        : false
                    }
                  />
                  {validationType.touched.teenagers_range_from &&
                  validationType.errors.teenagers_range_from ? (
                    <FormFeedback type="invalid">
                      {validationType.errors.teenagers_range_from}
                    </FormFeedback>
                  ) : null}
                </div>
                
                
                  <div className="input-group">
                  <span className="input-group-text">To</span>
                    <Input
                      name="teenagers_range_to"
                      placeholder=""
                      type="text"
                      onChange={validationType.handleChange}
                      onBlur={validationType.handleBlur}
                      value={validationType.values.teenagers_range_to || ""}
                      invalid={
                        validationType.touched.teenagers_range_to &&
                        validationType.errors.teenagers_range_to
                          ? true
                          : false
                      }
                    />
                    {validationType.touched.teenagers_range_to &&
                    validationType.errors.teenagers_range_to ? (
                      <FormFeedback type="invalid">
                        {validationType.errors.teenagers_range_to}
                      </FormFeedback>
                    ) : null}
                  </div>
                
              </Col>
            
          </Row>

          <Row>
            <div className="col-12 d-flex justify-content-end mt-5">
            <Button
              color="paradise"
              outline
              className="waves-effect waves-light me-2"
              type="button"
              onClick={() => toggle('1')}
            >
              <i className="uil-angle-double-left" />
              Back
            </Button>
            <Button              
              type="submit"
              className="font-16 btn-orange"
              // onClick={toggleCategory}
            >
              Continue
              <i className="uil-angle-double-right mx-1 " />
            </Button>
            </div>
            
          </Row>
        
      </TabPane>
    </Form>
  );
};

export default Settings;
