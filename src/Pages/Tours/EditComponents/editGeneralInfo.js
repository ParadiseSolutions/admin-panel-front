import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
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
  putCopyTourAPI,
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
import { categoriesData } from "../../../Utils/Redux/Actions/CategoriesActions";
import { getCookie, setCookie, switchTourTab } from "../../../Utils/API";

const EditGeneralInformation = ({ tourData, toggle }) => {
  //get initial data tour types
  const dispatch = useDispatch();
  const [editMode] = useState(
    tourData.edit_mode === 1 ? false : true
  );
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

  //categories request
  useEffect(() => {
    const categoryRequest = () => dispatch(categoriesData());
    categoryRequest();
  }, [dispatch]);

  //combo boxs

  const [websiteID, setWebsiteID] = useState(tourData.website_id);
  const [shoppingCartID, setShoppingCartID] = useState(tourData.cart_id);
  const [providerID, setProviderID] = useState(tourData.provider_id);
  const [operatorID, setOperatorID] = useState(tourData.operator_id);
  const [locationID, setLocationID] = useState(tourData.location_id);
  const [mainCatID, setMainCatID] = useState(null);
  const [categoryId, setCategoryId] = useState(tourData.category_id);
  const [secondCatID, setSecondCatID] = useState(null);

  const [subCategoriesData, setSubCategoriesData] = useState(null);

  useEffect(() => {
    if (mainCatID) {
      getSubCategory(websiteID, mainCatID).then((resp) => {
        setSubCategoriesData(resp.data.data);
        setSecondCatID(null);
        // if (resp.data.data.length === 1) {
        //   setSecondCatID(resp.data.data[0].category_id);
        // } else {
        //   setSecondCatID(null);
        // }
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mainCatID]);
  //request based on website id
  const [shoppingCartData, setShoppingCartData] = useState(null);
  const [providerData, setProviderData] = useState(null);
  const [operatorData, setOperatorData] = useState(null);
  const [locationData, setLocationData] = useState(null);
  const [categoryData, setCategoryData] = useState(null);

  const onChangeWebsite = (id) => {
    shoppingCartWebsite(id).then((resp) => {
      setShoppingCartData(resp.data.data);
      if (resp.data.data.length === 1) {
        setShoppingCartID(resp.data.data[0].id);
      } else {
        setShoppingCartID(null);
      }
    });
    providerWebsite(id).then((resp) => {
      setProviderData(resp.data.data);
      if (resp.data.data.length === 1) {
        setProviderID(resp.data.data[0].id);
      } else {
        setProviderID(null);
      }
    });
    operatorWebsite(id).then((resp) => {
      setOperatorData(resp.data.data);
      if (resp.data.data.length === 1) {
        setOperatorID(resp.data.data[0].id);
      } else {
        setOperatorID(null);
      }
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
        setMainCatID(tourData.category_info.main_category_id);
      }
    });
    //setCategoryId(id)
  };

  useEffect(() => {
    if (dataWebsite) {
      onChangeWebsite(tourData.website_id)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataWebsite]);
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
      if (!editMode) {
        let data = {
          cart_id: shoppingCartID ? shoppingCartID : tourData.cart_id,
          website_id: websiteID ? websiteID : tourData.website_id,
          type_id: tourData.type_id,
          category_id: secondCatID ? secondCatID : (categoryId ? categoryId : tourData.category_id),
          location_id: locationID ? locationID : tourData.location_id,
          provider_id: providerID ? providerID : tourData.provider_id,
          operator_id: operatorID ? operatorID : tourData.operator_id,
          name: values.tour_name,
          // operator_tour_name: null,
          // sku: "CDSH-PRXH-",
          code: values.code,
          edit_mode: 0,
        };
        putCopyTourAPI(tourData.id, data)
          .then((resp) => {
            if (resp.data.status === 200) {
              triggerUpdate();
              Swal.fire(
                "Edited!",
                "Tour has been edited.",
                "success"
              ).then(() => {
                onChangeWebsite();
                updateLocalStorageStatus(resp.data.data)
                window.location.href = switchTourTab(2)
              });
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
                return true
              });

              Swal.fire(
                "Error!",
                // {error.response.},
                String(errorMessages[0])
              );
            }
          });
      } else {
        let data = {
          name: values.tour_name,
        };
        putTourNameEditAPI(tourData.id, data)
          .then((resp) => {
            if (resp.data.status === 200) {
              triggerUpdate();
              Swal.fire(
                "Edited!",
                "Tour Name has been edited.",
                "success"
              ).then(() => {
                onChangeWebsite();
                updateLocalStorageStatus(resp.data.data)
                window.location.href = switchTourTab(2)
              });
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

  const updateLocalStorageStatus = (newInfo) => {
    let tourInfo = getCookie("tour_data", true);
    if(tourInfo && newInfo?.id) {
      let indexToUpdate = tourInfo.findIndex(x => x.id === newInfo?.id)
      if(indexToUpdate >= 0) {
        tourInfo[indexToUpdate] = newInfo
      }
      setCookie("tour_data", JSON.stringify(tourInfo), 24 * 60 * 60)
    }
  }
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
                      className="far fa-lightbulb bg-paradise text-white p-2 rounded-circle text-center"
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
                    name="tour_type"
                    disabled
                    onBlur={validationType.handleBlur}
                    //   value={validationType.values.department || ""}
                  >
                    <option value="">Select....</option>
                    {map(dataTourType, (tourType, index) => {
                      return (
                        <option
                          key={tourType.id}
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
                    name="website"
                    disabled={editMode}
                    onChange={(e) => {
                      onChangeWebsite(e.target.value);
                      setWebsiteID(e.target.value);
                    }}
                    onBlur={validationType.handleBlur}
                    //   value={validationType.values.department || ""}
                  >
                    <option value="">Select....</option>
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
                    name="shopping_cart"
                    disabled={editMode}
                    onChange={(e) => {
                      setShoppingCartID(e.target.value);
                    }}
                    onBlur={validationType.handleBlur}
                    //   value={validationType.values.department || ""}
                  >
                    {/* {editMode ? <option>{tourData.cart_name}</option> : null} */}
                    
                    {map(shoppingCartData, (shoppingCart, index) => {
                      return (
                        <option
                          key={index}
                          value={shoppingCart.id}
                          selected={
                            tourData.cart_id === shoppingCart.id ? true : false
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
                    name="provider"
                    disabled={editMode}
                    onChange={(e) => {
                      setProviderID(e.target.value);
                    }}
                    onBlur={validationType.handleBlur}
                    //   value={validationType.values.department || ""}
                  >
                    {/* { editMode ? <option>{tourData.provider_name}</option> : null } */}
                    
                    {map(providerData, (provider, index) => {
                      return (
                        <option
                          key={index}
                          value={provider.provider_id}
                          selected={
                            tourData.provider_id === provider.provider_id ? true : false
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
                    name="operator"
                    disabled={editMode}
                    onChange={(e) => {
                      setOperatorID(e.target.value);
                    }}
                    onBlur={validationType.handleBlur}
                    //   value={validationType.values.department || ""}
                  >
                    {/* {editMode ? <option>{tourData.operator_name}</option> : null} */}
                    
                    {map(operatorData, (operator, index) => {
                      return (
                        <option
                          key={index}
                          value={operator.operator_id}
                          selected={
                            tourData.operator_id === operator.operator_id ? true : false
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
                    name="location"
                    disabled={editMode}
                    onChange={(e) => {
                      setLocationID(e.target.value);
                    }}
                    onBlur={validationType.handleBlur}
                    //   value={validationType.values.department || ""}
                  >
                    <option value="">Select....</option>
                    {map(locationData, (location, index) => {
                      return (
                        <option
                          key={index}
                          value={location.id}
                          selected={
                            tourData.location_id === location.id ? true : false
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
                    name="main-category"
                    disabled={editMode}
                    onChange={(e) => {
                      setMainCatID(e.target.value);
                      setCategoryId(e.target.value);
                    }}
                    onBlur={validationType.handleBlur}
                    //   value={validationType.values.department || ""}
                  >
                    {/* {editMode ? <option>{tourData.category_name}</option> : null} */}
                    
                    {map(categoryData, (category, index) => {
                      return (
                        <option
                          key={index}
                          value={category.category_id}
                          selected={
                            /* index === 0 && categoryData.length === 1 */
                            tourData.category_info.main_category_id === category.category_id
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
                    name="sub-category"
                    disabled={providerData ? editMode : true}
                    onChange={(e) => {
                      setSecondCatID(e.target.value);
                    }}
                    onBlur={validationType.handleBlur}
                    //   value={validationType.values.department || ""}
                  >
                    <option value="">Select....</option>
                    {map(subCategoriesData, (subCategory, index) => {
                      return (
                        <option
                          key={index}
                          value={subCategory.category_id}
                          selected={
                            tourData.category_info.sub_category_id === subCategory.category_id
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
                    disabled={editMode}
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
