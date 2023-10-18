import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import newTourGi from "../../../Components/Assets/images/newTourGI.jpg";
import { tourTypesData } from "../../../Utils/Redux/Actions/TourTypesActions";
import { websitesData } from "../../../Utils/Redux/Actions/WebsitesActions";
import { locationsData } from "../../../Utils/Redux/Actions/LocationsActions";

import {
  shoppingCartWebsite,
  providerWebsite,
  operatorWebsite,
  putTourNameEditAPI,
  triggerUpdate,
  getLocationWebsitePI,
  getCategoryWebsiteAPI,
} from "../../../Utils/API/Tours";
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
import * as Yup from "yup";
import { useFormik } from "formik";
import { map } from "lodash";
import Swal from "sweetalert2";
import {
  cleanUpSpecialCharacters,
  capitalizeWords2,
} from "../../../Utils/CommonFunctions";
import { getSubCategory } from "../../../Utils/API/Categories";

const EditGeneralInformation = ({ tourData, toggle }) => {
  const history = useHistory();
  //get initial data tour types
  const dispatch = useDispatch();

  //tour types request
  useEffect(() => {
    const tourTypesRequest = () => dispatch(tourTypesData());
    tourTypesRequest();
  }, [dispatch]);
  const dataTourType = useSelector((state) => state.tourTypes.tourTypes.data);

  //websites request
  useEffect(() => {
    const websitesRequest = () => dispatch(websitesData());
    websitesRequest();
  }, [dispatch]);
  const dataWebsite = useSelector((state) => state.websites.websites.data);

  //location request
  useEffect(() => {
    const locationRequest = () => dispatch(locationsData());
    locationRequest();
  }, [dispatch]);
  const dataLocations = useSelector((state) => state.locations.locations.data);

  //combo boxs
  const [tourTypeID, setTourTypeID] = useState(tourData.type_id);
  const [websiteID, setWebsiteID] = useState(tourData.website_id);
  const [shoppingCartID, setShoppingCartID] = useState(null);
  const [providerID, setProviderID] = useState(null);
  const [operatorID, setOperatorID] = useState(null);
  const [locationID, setLocationID] = useState(null);
  const [mainCatID, setMainCatID] = useState(null);
  const [categoryId, setCategoryId] = useState(null);
  const [secondCatID, setSecondCatID] = useState(null);

  const [subCategoriesData, setSubCategoriesData] = useState(null);

  useEffect(() => {
    //console.log(mainCatID)
    if (mainCatID) {
      getSubCategory(websiteID, categoryId).then((resp) => {
        setSubCategoriesData(resp.data.data);
        if (resp.data.data.length === 1) {
          setSecondCatID(resp.data.data[0].id);
        } else {
          setSecondCatID(null);
        }
      });
    }
  }, [mainCatID]);

  //request based on website id
  const [shoppingCartData, setShoppingCartData] = useState(null);
  const [providerData, setProviderData] = useState(null);
  const [operatorData, setOperatorData] = useState(null);
  const [locationData, setLocationData] = useState(null);
  const [categoryData, setCategoryData] = useState(null); /*  */
  const onChangeWebsite = (id) => {
    shoppingCartWebsite(id).then((resp) => {
      setShoppingCartData(resp.data.data);
    });
    providerWebsite(id).then((resp) => {
      setProviderData(resp.data.data);
    });
    operatorWebsite(id).then((resp) => {
      setOperatorData(resp.data.data);
    });
    getLocationWebsitePI(id).then((resp) => {
      setLocationData(resp.data.data);
      if (resp.data.data.length === 1) {
        setLocationID(resp.data.data[0].id);
      } else {
        setLocationID(null);
      }
    });
    getCategoryWebsiteAPI(id).then((resp) => {
      setCategoryData(resp.data.data);
      if (resp.data.data.length === 1) {
        setMainCatID(resp.data.data[0].id);
      } else {
        setMainCatID(null);
      }
    });
  };

  //form creation
  const validationType = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,
    initialValues: {
      tour_name: tourData.name,
      code: tourData.code,
    },
    validationSchema: Yup.object().shape({
      tour_name: Yup.string().required("Field required"),
      code: Yup.string()
        .required("Code is required")
        .max(2, "Must be exactly 2 chars")
        .required("Max 2 chars"),
    }),
    onSubmit: (values) => {
      let data = {
        name: values.tour_name,
      };
      //console.log(data);
      putTourNameEditAPI(tourData.id, data)
        .then((resp) => {
          //console.log(resp.data);
          if (resp.data.status === 200) {
            triggerUpdate();
            Swal.fire("Edited!", "Tour Name has been edited.", "success").then(
              () => {
                onChangeWebsite();
                toggle("2");
              }
            );
          }
        })
        .catch((error) => {
          if (error.response.data.data === null) {
            Swal.fire(
              "Error!",
              // {error.response.},
              String(error.response.data.message)
            );
          } else {
            let errorMessages = [];
            Object.entries(error.response.data.data).map((item) => {
              errorMessages.push(item[1]);
            });

            Swal.fire(
              "Error!",
              // {error.response.},
              String(errorMessages[0])
            );
          }
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
      <TabPane tabId="1">
        <Row className="g-5">
          <Col className="col-4">
            <img
              src={newTourGi}
              alt="new tour girl"
              className="img-fluid w-100"
            />
          </Col>
          <Col className="col-8">
            <Row className="d-flex justify-content-start mb-3">
              <Col className="col-12">
                <div className="p-3" style={{ backgroundColor: "#d9f0ff" }}>
                  <p className="mb-0 lh-2" style={{ fontSize: "16px" }}>
                    <i
                      class="far fa-lightbulb bg-paradise text-white p-2 rounded-circle text-center"
                      style={{ width: "32px", height: "32px" }}
                    ></i>{" "}
                    To create a new tour please fill out the following
                    information. Once you've completed this first screen, you
                    can through the tabs and complete the information. Once
                    you're done with a section, press "Continue" to save your
                    changes. navigate
                  </p>
                </div>
              </Col>
            </Row>
            <Row className="mb-3">
              <Col className="col-12">
                <div className="p-3" style={{ backgroundColor: "#E9F4FF" }}>
                  <p className="fs-5 fw-bold text-uppercase text-dark mb-0">
                    TOUR SETTINGS
                  </p>
                </div>
              </Col>
              <Col className="col-4">
                <div className="form-outline mt-2">
                  <Label className="form-label">Tour Type</Label>
                  <Input
                    type="select"
                    name=""
                    disabled
                    onChange={(e) => {
                      setTourTypeID(e.target.value);
                    }}
                    onBlur={validationType.handleBlur}
                    //   value={validationType.values.department || ""}
                  >
                    <option>Select....</option>
                    {map(dataTourType, (tourType, index) => {
                      return (
                        <option
                          key={index}
                          value={tourType.id}
                          selected={
                            tourData.type_id === tourType.id ? true : false
                          }
                        >
                          {tourType.name}
                        </option>
                      );
                    })}
                  </Input>
                </div>
              </Col>
              <Col className="col-4">
                <div className="form-outline mt-2">
                  <Label className="form-label">Website</Label>
                  <Input
                    type="select"
                    name=""
                    disabled
                    onChange={(e) => {
                      onChangeWebsite(e.target.value);
                      setWebsiteID(e.target.value);
                    }}
                    onBlur={validationType.handleBlur}
                    //   value={validationType.values.department || ""}
                  >
                    <option>Select....</option>
                    {map(dataWebsite, (website, index) => {
                      return (
                        <option
                          key={index}
                          value={website.id}
                          selected={
                            tourData.website_id === website.id ? true : false
                          }
                        >
                          {website.company_name}
                        </option>
                      );
                    })}
                  </Input>
                </div>
              </Col>
              <Col className="col-4">
                <div className="form-outline mt-2">
                  <Label className="form-label">Shopping Cart</Label>
                  <Input
                    type="select"
                    name="department"
                    disabled
                    onChange={(e) => {
                      setShoppingCartID(e.target.value);
                    }}
                    onBlur={validationType.handleBlur}
                    //   value={validationType.values.department || ""}
                  >
                    <option>{tourData.cart_name}</option>
                    {map(shoppingCartData, (shoppingCart, index) => {
                      return (
                        <option
                          key={index}
                          value={shoppingCart.id}
                          selected={
                            index === 0 && shoppingCartData.length === 1
                              ? true
                              : false
                          }
                        >
                          {shoppingCart.name}
                        </option>
                      );
                    })}
                  </Input>
                </div>
              </Col>
              <Col className="col-4">
                <div className="form-outline my-2">
                  <Label className="form-label">Provider</Label>
                  <Input
                    type="select"
                    name=""
                    disabled
                    onChange={(e) => {
                      setProviderID(e.target.value);
                    }}
                    onBlur={validationType.handleBlur}
                    //   value={validationType.values.department || ""}
                  >
                    <option>{tourData.provider_name}</option>
                    {map(providerData, (provider, index) => {
                      return (
                        <option
                          key={index}
                          value={provider.provider_id}
                          selected={
                            index === 0 && providerData.length === 1
                              ? true
                              : false
                          }
                        >
                          {provider.provider_name}
                        </option>
                      );
                    })}
                  </Input>
                </div>
              </Col>
              <Col className="col-4">
                <div className="form-outline my-2">
                  <Label className="form-label">Operator</Label>
                  <Input
                    type="select"
                    name=""
                    disabled
                    onChange={(e) => {
                      setOperatorID(e.target.value);
                    }}
                    onBlur={validationType.handleBlur}
                    //   value={validationType.values.department || ""}
                  >
                    <option>{tourData.operator_name}</option>
                    {map(operatorData, (operator, index) => {
                      return (
                        <option
                          key={index}
                          value={operator.operator_id}
                          selected={
                            index === 0 && operatorData.length === 1
                              ? true
                              : false
                          }
                        >
                          {operator.operator_name}
                        </option>
                      );
                    })}
                  </Input>
                </div>
              </Col>
            </Row>

            <Row>
              <Col className="col-12">
                <div className="p-3" style={{ backgroundColor: "#FFEFDE" }}>
                  <p className="fs-5 fw-bold text-uppercase text-dark mb-0">
                    TOUR DETAILS
                  </p>
                </div>
              </Col>
            </Row>
            <Row className="d-flex justify-content-start">
              <Col className="col-8">
                <div className="form-outline mt-2">
                  <Label className="form-label">Tour Name</Label>
                  <Input
                    name="tour_name"
                    placeholder="ATV Tour"
                    type="text"
                    onChange={validationType.handleChange}
                    onBlur={(e) => {
                      const value = e.target.value || "";
                      validationType.setFieldValue(
                        "tour_name",
                        capitalizeWords2(cleanUpSpecialCharacters(value))
                      );
                    }}
                    value={validationType.values.tour_name || ""}
                    invalid={
                      validationType.touched.tour_name &&
                      validationType.errors.tour_name
                        ? true
                        : false
                    }
                  />
                  {validationType.touched.tour_name &&
                  validationType.errors.tour_name ? (
                    <FormFeedback type="invalid">
                      {validationType.errors.tour_name}
                    </FormFeedback>
                  ) : null}
                </div>
              </Col>

              <Col className="col-4">
                <div className="form-outline mt-2">
                  <Label className="form-label">Location</Label>
                  <Input
                    type="select"
                    name=""
                    disabled
                    onChange={(e) => {
                      setLocationID(e.target.value);
                    }}
                    onBlur={validationType.handleBlur}
                    //   value={validationType.values.department || ""}
                  >
                    <option>{tourData.location_name}</option>
                    {map(locationData, (location, index) => {
                      return (
                        <option
                          key={index}
                          value={location.id}
                          selected={
                            index === 0 && locationData.length === 1
                              ? true
                              : false
                          }
                        >
                          {location.name}
                        </option>
                      );
                    })}
                  </Input>
                </div>
              </Col>
              <Col className="col-4">
                <div className="form-outline my-2">
                  <Label className="form-label">Main Category</Label>
                  <Input
                    type="select"
                    name=""
                    disabled
                    onChange={(e) => {
                      setMainCatID(e.target.value);
                      setCategoryId(e.target.value);
                    }}
                    onBlur={validationType.handleBlur}
                    //   value={validationType.values.department || ""}
                  >
                    <option>{tourData.category_name}</option>
                    {map(categoryData, (category, index) => {
                      return (
                        <option
                          key={index}
                          value={category.category_id}
                          selected={
                            /* index === 0 && categoryData.length === 1 */
                            tourData.category_id === category.category_id
                              ? true
                              : false
                          }
                        >
                          {category.category_name}
                        </option>
                      );
                    })}
                  </Input>
                </div>
              </Col>
              <Col className="col-4">
                <div className="form-outline my-2">
                  <Label className="form-label">Sub-Category</Label>
                  <Input
                    type="select"
                    name=""
                    disabled={providerData ? false : true}
                    onChange={(e) => {
                      setSecondCatID(e.target.value);
                    }}
                    onBlur={validationType.handleBlur}
                    //   value={validationType.values.department || ""}
                  >
                    <option>Select....</option>
                    {map(subCategoriesData, (subCategory, index) => {
                      return (
                        <option
                          key={index}
                          value={subCategory.category_id}
                          selected={
                            index === 0 && subCategoriesData.length === 1
                              ? true
                              : false
                          }
                        >
                          {subCategory.category_name}
                        </option>
                      );
                    })}
                  </Input>
                </div>
              </Col>
              <Col className="col-4">
                <div className="form-outline my-2">
                  <Label className="form-label">2-Digit Code</Label>
                  <Input
                    name="code"
                    placeholder=""
                    type="text"
                    disabled
                    onChange={validationType.handleChange}
                    onBlur={validationType.handleBlur}
                    value={validationType.values.code || ""}
                    invalid={
                      validationType.touched.code && validationType.errors.code
                        ? true
                        : false
                    }
                  />
                  {validationType.touched.code && validationType.errors.code ? (
                    <FormFeedback type="invalid">
                      {validationType.errors.code}
                    </FormFeedback>
                  ) : null}
                </div>
              </Col>
            </Row>

            <Row>
              <Col className="col-12 d-flex justify-content-end mt-5">
                <Button
                  type="submit"
                  className="font-16 btn-block col-2 btn-orange"
                  // onClick={() => toggle("2")}
                >
                  Continue
                  <i className="uil-angle-double-right mx-1 " />
                </Button>
              </Col>
            </Row>
          </Col>
        </Row>
      </TabPane>
    </Form>
  );
};

export default EditGeneralInformation;
