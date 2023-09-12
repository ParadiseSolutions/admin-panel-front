import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import newTourGi from "../../Components/Assets/images/newTourGI.jpg";
import { tourTypesData } from "../../Utils/Redux/Actions/TourTypesActions";
import { websitesData } from "../../Utils/Redux/Actions/WebsitesActions";
import { locationsData } from "../../Utils/Redux/Actions/LocationsActions";
import { categoriesData } from "../../Utils/Redux/Actions/CategoriesActions";
import { getSubCategory } from "../../Utils/API/Categories";
import {
  shoppingCartWebsite,
  providerWebsite,
  operatorWebsite,
  createTourAPI, 
  getLocationWebsitePI,
  getCategoryWebsiteAPI,
  triggerUpdate
} from "../../Utils/API/Tours";
import {
  TabContent,
  TabPane,
  NavLink,
  NavItem,
  Nav,
  Card,
  Row,
  Col,
  CardBody,
  Container,
  Form,
  Label,
  Input,
  FormFeedback,
  Button,
} from "reactstrap";
import classnames from "classnames";
import * as Yup from "yup";
import { useFormik } from "formik";
import { map } from "lodash";
import Swal from "sweetalert2";
import { cleanUpSpecialCharacters, capitalizeWords2, codeFormat } from "../../Utils/CommonFunctions";
import { Link } from "react-router-dom";

const NewTour = ({ history }) => {
  //tabs
  const [activeTab, setactiveTab] = useState("1");
  function toggle(tab) {
    if (activeTab !== tab) {
      setactiveTab(tab);
    }
  }

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
  
  //categories request
  useEffect(() => {
    const categoryRequest = () => dispatch(categoriesData());
    categoryRequest();
  }, [dispatch]);
  const dataCategories = useSelector((state) => state.categories.categories.data);
  

  //combo boxs
  const [tourTypeID, setTourTypeID] = useState(null)
  const [websiteID, setWebsiteID] = useState(null)
  const [shoppingCartID, setShoppingCartID] = useState(null)
  const [providerID, setProviderID] = useState(null)
  const [operatorID, setOperatorID] = useState(null)
  const [locationID, setLocationID] = useState(null)
  const [mainCatID, setMainCatID] = useState(null)
  const [categoryId, setCategoryId] = useState(null)
  
  //sub categories request
  const [subCategoriesData, setSubCategoriesData] = useState(null)
  const [secondCatID, setSecondCatID] = useState(null)
    useEffect(() => {
      //console.log(mainCatID)
      if(mainCatID) {
        getSubCategory(websiteID, categoryId).then((resp) =>{
          setSubCategoriesData(resp.data.data)
          if (resp.data.data.length === 1) {
            setSecondCatID(resp.data.data[0].id)
          }else{
            setSecondCatID(null)
          }
        })
      }
    }, [mainCatID]);
    

  //request based on website id
  const [shoppingCartData, setShoppingCartData] = useState(null);
  const [providerData, setProviderData] = useState(null);
  const [operatorData, setOperatorData] = useState(null);
  const [locationData, setLocationData] = useState(null)
  const [categoryData, setCategoryData] = useState(null)

  const onChangeWebsite = (id) => {
    shoppingCartWebsite(id).then((resp) => {
      setShoppingCartData(resp.data.data);
      if (resp.data.data.length === 1) {
        setShoppingCartID(resp.data.data[0].id)
      }else{
        setShoppingCartID(null)
      }
    });
    providerWebsite(id).then((resp) => {
      setProviderData(resp.data.data);
      if (resp.data.data.length === 1) {
        setProviderID(resp.data.data[0].id)
      }else{
        setProviderID(null)
      }
    });
    operatorWebsite(id).then((resp) => {
      setOperatorData(resp.data.data);
      if (resp.data.data.length === 1) {
        setOperatorID(resp.data.data[0].id)
      }else{
        setOperatorID(null)
      }
    });
    getLocationWebsitePI(id).then((resp) =>{
      setLocationData(resp.data.data)
      if (resp.data.data.length === 1) {
        setLocationID(resp.data.data[0].id)
      }else{
        setLocationID(null)
      }
    })
    getCategoryWebsiteAPI(id).then((resp) => {
      setCategoryData(resp.data.data)
      if (resp.data.data.length === 1) {
        setMainCatID(resp.data.data[0].id)
      }else{
        setMainCatID(null)
      }
    })
    //setCategoryId(id)
  };

  //console.log('location', locationData)
  
  //form creation
  const validationType = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,
    initialValues: {
      tour_name: "",
      code: "",
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
        cart_id: shoppingCartID,
        website_id: websiteID,
        type_id: tourTypeID,
        category_id: mainCatID,
        location_id: locationID,
        provider_id: providerID,
        operator_id: operatorID,
        name: values.tour_name,
        code: values.code,
      };
      //console.log(data);
      createTourAPI(data)
        .then((resp) => {
          // console.log(resp.data);
          if (resp.data.status === 201) {
            Swal.fire(
              "Created!",
              "Tour has been created.",
              "success"
            ).then(() => {
              triggerUpdate()
              history.push(`/tours/${resp.data.data.id}`);
            });
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
    <div className="page-content pb-0">
      <Container fluid>
      <Row xl={12}>
        <div className="col-11">
          <h1 className="fw-bold" style={{ color: "#3DC7F4", fontSize: "3.5rem" }}>
           + CREATE NEW TOUR
          </h1>
        </div>
        <div className="col-1" style={{paddingTop:"12px"}}>
                <Link to="/tours" className=" waves-effect">{"Edit Tours"}</Link>
            </div>
        </Row>
      </Container>
      <Row className="px-4">
        <Col xl={12}>
          <Card>
            <div className="p-0 card-header">
              <Nav tabs className="nav-justified border-orange border-3">
                <NavItem>
                  <NavLink
                    style={{
                      cursor: "pointer",
                      backgroundColor: `${activeTab === "1" ? "#F6851F" : ""}`,
                      color: `${activeTab === "1" ? "white" : ""}`,
                    }}
                    className={classnames({
                      active: activeTab === "1",
                    })}
                    onClick={() => {
                      toggle("1");
                    }}
                  >
                    <span className="d-block d-sm-none">
                      <i className="fas fa-home"></i>
                    </span>
                    <span className="d-none d-sm-block">
                      + General Information
                    </span>
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    style={{ cursor: "cursor" }}
                    className={classnames({
                      active: activeTab === "2",
                    })}
                  >
                    <span className="d-block d-sm-none">
                      <i className="far fa-user"></i>
                    </span>
                    <span className="d-none d-sm-block">+ Settings</span>
                  </NavLink>
                </NavItem>
                <NavItem className="d-flex">
                  <NavLink
                    style={{
                      cursor: "cursor",
                      backgroundColor: `${activeTab === "3" ? "#F6851F" : ""}`,
                      color: `${activeTab === "3" ? "white" : ""}`,
                      border:"none",
                      flexWrap: "wrap",
                      display:"grid",
                      alignContent: "center",
                    }}
                    className={classnames({
                      active: activeTab === "3",
                    })}
                  >
                    <span className="d-block d-sm-none">
                      <i className="far fa-user"></i>
                    </span>
                    <span className="d-none d-sm-block">+ High Season Dates</span>
                  </NavLink>
                </NavItem>

                  <NavItem className="d-flex">
                    <NavLink
                      style={{
                        cursor: "pointer",
                        backgroundColor: `${
                          activeTab === "4" ? "#F6851F" : ""
                        }`,
                        color: `${activeTab === "4" ? "white" : ""}`,
                        border:"none",
                        flexWrap: "wrap",
                        display:"grid",
                        alignContent: "center",
                      }}
                      className={classnames({
                        active: activeTab === "4",
                      })}
                      /*onClick={() => {
                        toggle("4");
                      }}*/
                    >
                      <span className="d-block d-sm-none">
                        <i className="far fa-envelope"></i>
                      </span>
                      <span className="d-none d-sm-block">+ URLs</span>
                    </NavLink>
                  </NavItem>

                <NavItem className="d-flex">
                  <NavLink
                    style={{
                      cursor: "cursor",
                      backgroundColor: `${activeTab === "5" ? "#F6851F" : ""}`,
                      color: `${activeTab === "5" ? "white" : ""}`,
                      border:"none",
                      flexWrap: "wrap",
                      display:"grid",
                      alignContent: "center",
                    }}
                    className={classnames({
                      active: activeTab === "5",
                    })}
                  >
                    <span className="d-block d-sm-none">
                      <i className="far fa-envelope"></i>
                    </span>
                    <span className="d-none d-sm-block">+ Products</span>
                  </NavLink>
                </NavItem>
                <NavItem className="d-flex">
                  <NavLink
                    style={{
                      cursor: "cursor",
                      backgroundColor: `${activeTab === "6" ? "#F6861F" : ""}`,
                      color: `${activeTab === "6" ? "white" : ""}`,
                      border:"none",
                      flexWrap: "wrap",
                      display:"grid",
                      alignContent: "center",
                    }}
                    className={classnames({
                      active: activeTab === "6",
                    })}
                  >
                    <span className="d-block d-sm-none">
                      <i className="far fa-envelope"></i>
                    </span>
                    <span className="d-none d-sm-block">+ Addons</span>
                  </NavLink>
                </NavItem>
                <NavItem className="d-flex">
                  <NavLink
                    style={{
                      cursor: "cursor",
                      backgroundColor: `${activeTab === "7" ? "#F6851F" : ""}`,
                      color: `${activeTab === "7" ? "white" : ""}`,
                      border:"none",
                      flexWrap: "wrap",
                      display:"grid",
                      alignContent: "center",                      
                    }}
                    className={classnames({
                      active: activeTab === "7",
                    })}
                  >
                    <span className="d-block d-sm-none">
                      <i className="far fa-envelope"></i>
                    </span>
                    <span className="d-none d-sm-block">+ Schedule</span>
                  </NavLink>
                </NavItem>
              </Nav>
            </div>
            <CardBody className="p-0">
              <TabContent activeTab={activeTab} className="p-4 text-muted">
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
                        <img src={newTourGi} alt="new tour girl" className="img-fluid w-100"/>
                      </Col>
                      <Col className="col-8">
                        <Row className="d-flex justify-content-start mb-3">
                        <Col className="col-12">
                          <div className="p-3" style={{backgroundColor: "#d9f0ff"}}>
                            <p className="mb-0 lh-2" style={{fontSize:"16px"}}>
                            <i class="far fa-lightbulb bg-paradise text-white p-2 rounded-circle text-center" style={{width:"32px",height:"32px"}}></i> To create a new tour please fill out the following
                              information. Once you've completed this first screen, you can through the tabs and complete the information. Once you're
                              done with a section, press "Continue" to save your changes.
                              navigate
                            </p>
                          </div>                          
                        </Col>
                        </Row>                        
                        <Row className="mb-3">     
                          <Col className="col-12">
                            <div className="p-3" style={{ backgroundColor: "#E9F4FF" }}>
                              <p className="fs-4 fw-bold text-uppercase text-dark mb-0">
                                TOUR SETTINGS
                              </p>
                            </div>                        
                          </Col>                     
                          <Col className="col-md-4">
                            <div className="form-outline mt-2">
                              <Label className="form-label">Tour Type</Label>
                              <Input
                                type="select"
                                name=""
                                onChange={(e) =>{
                                  setTourTypeID(e.target.value)
                                }}
                                onBlur={validationType.handleBlur}
                                //   value={validationType.values.department || ""}
                              >
                                <option>Select....</option>
                                {map(dataTourType, (tourType, index) => {
                                  return (
                                    <option key={index} value={tourType.id}>
                                      {tourType.name}
                                    </option>
                                  );
                                })}
                              </Input>
                            </div>
                          </Col>
                          <Col className="col-md-4">
                            <div className="form-outline mt-2">
                              <Label className="form-label">Website</Label>
                              <Input
                                type="select"
                                name=""
                                onChange={(e) =>{
                                  onChangeWebsite(e.target.value)
                                  setWebsiteID(e.target.value)
                                }}
                                onBlur={validationType.handleBlur}
                                //   value={validationType.values.department || ""}
                              >
                                <option>Select....</option>
                                {map(dataWebsite, (website, index) => {
                                  return (
                                    <option key={index} value={website.id}>
                                      {website.company_name}
                                    </option>
                                  );
                                })}
                              </Input>
                            </div>
                          </Col>
                          <Col className="col-md-4">
                            <div className="form-outline mt-2">
                              <Label className="form-label">
                                Shopping Cart
                              </Label>
                              <Input
                                type="select"
                                name="department"
                                disabled={shoppingCartData ? false : true}
                                onChange={(e) =>{
                                  setShoppingCartID(e.target.value)
                                }}
                                onBlur={validationType.handleBlur}
                                //   value={validationType.values.department || ""}
                              >
                                <option>Select....</option>
                                {map(
                                  shoppingCartData,
                                  (shoppingCart, index) => {
                                    return (
                                      <option
                                        key={index}
                                        value={shoppingCart.id}
                                        selected={ index === 0 && shoppingCartData.length === 1 ? true : false }
                                      >
                                        {shoppingCart.name}
                                      </option>
                                    );
                                  }
                                )}
                              </Input>
                            </div>
                          </Col>
                          <Col className="col-md-4">
                              <div className="form-outline my-2">
                                <Label className="form-label">Provider</Label>
                                <Input
                                  type="select"
                                  name=""
                                  disabled={providerData ? false : true}
                                  onChange={(e) =>{
                                    setProviderID(e.target.value)
                                  }}
                                  onBlur={validationType.handleBlur}
                                  //   value={validationType.values.department || ""}
                                >
                                  <option>Select....</option>
                                  {map(providerData, (provider, index) => {
                                    return (
                                      <option
                                        key={index}
                                        value={provider.provider_id}
                                        selected={ index === 0 && providerData.length === 1 ? true : false }
                                      >
                                        {provider.provider_name}
                                      </option>
                                    );
                                  })}
                                </Input>
                              </div>
                            </Col>
                            <Col className="col-md-4">
                              <div className="form-outline my-2">
                                <Label className="form-label">Operator</Label>
                                <Input
                                  type="select"
                                  name=""
                                  disabled={operatorData ? false : true}
                                  onChange={(e) =>{
                                    setOperatorID(e.target.value)
                                  }}
                                  onBlur={validationType.handleBlur}
                                  //   value={validationType.values.department || ""}
                                >
                                  <option>Select....</option>
                                  {map(operatorData, (operator, index) => {
                                    return (
                                      <option
                                        key={index}
                                        value={operator.operator_id}
                                        selected={ index === 0 && operatorData.length === 1 ? true : false }
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
                              <p className="fs-4 fw-bold text-uppercase text-dark mb-0">
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
                                  onBlur={(e)=>{
                                    const value = e.target.value || "";
                                    validationType.setFieldValue('tour_name', capitalizeWords2(cleanUpSpecialCharacters(value)));
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
                                  onChange={(e) =>{
                                    setLocationID(e.target.value)
                                  }}
                                  disabled={locationData ? false : true}
                                  onBlur={validationType.handleBlur}
                                  //   value={validationType.values.department || ""}
                                >
                                  <option>Select....</option>
                                  {map(locationData, (location, index) => {
                                    return (
                                      <option
                                        key={index}
                                        value={location.id}
                                        selected={ index === 0 && locationData.length === 1 ? true : false }
                                      >
                                        {location.name}
                                      </option>
                                    );
                                  })}
                                </Input>
                              </div>
                            </Col>
                          
                        </Row>
                        <Row className="d-flex justify-content-start">
                          
                            <Col className="col-4">
                              <div className="form-outline my-2">
                                <Label className="form-label">
                                  Main Category
                                </Label>
                                <Input
                                  type="select"
                                  name=""
                                  disabled={categoryData ? false : true}
                                  onChange={(e) =>{
                                    setMainCatID(e.target.value)
                                    setCategoryId(e.target.value)
                                  }}
                                  onBlur={validationType.handleBlur}
                                  //   value={validationType.values.department || ""}
                                >
                                  <option>Select....</option>
                                  {map(categoryData, (category, index) => {
                                    return (
                                      <option
                                        key={index}
                                        value={category.category_id}
                                        selected={ index === 0 && categoryData.length === 1 ? true : false }
                                      >
                                        {category.category_name}
                                      </option>
                                    );
                                  })}
                                </Input>
                              </div>
                            </Col>
                                {subCategoriesData && subCategoriesData.length > 0 ?
                            <Col className="col-4">
                              <div className="form-outline my-2">
                                <Label className="form-label">
                                  Sub-Category
                                </Label>
                                <Input
                                type="select"
                                name=""
                                disabled={subCategoriesData ? false : true}
                                onChange={(e) =>{
                                  setSecondCatID(e.target.value)
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
                                      selected={ index === 0 && subCategoriesData.length === 1 ? true : false }
                                    >
                                      {subCategory.category_name}
                                    </option>
                                  );
                                })}
                              </Input>
                              </div>
                            </Col>
                                : null}
                                
                            <Col className="col-4">
                              <div className="form-outline my-2">
                                <Label className="form-label">
                                  2-Digit Code
                                </Label>
                                <Input
                                  name="code"
                                  placeholder="SE"
                                  type="text"
                                  max="2"
                                  onChange={validationType.handleChange}
                                  onBlur={(e)=>{
                                    const value = e.target.value || "";
                                    validationType.setFieldValue('code', codeFormat(cleanUpSpecialCharacters(value)));
                                  }}
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
                          <Col className="col-12 d-flex justify-content-end mt-5">
                            <Button
                              color="paradise"
                              outline
                              className="waves-effect waves-light me-2 fw-bold border-3 fs-5 rounded-3"
                              style={{minWidth:"106px"}}
                              type="button"
                              onClick={() => history.goBack()}
                            >
                              <i className="uil-angle-double-left" />
                              Back
                            </Button>
                            <Button
                              
                              type="submit"
                              className="font-16 btn-block btn-orange fs-5 rounded-3"
                              // onClick={toggleCategory}
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
              </TabContent>
            </CardBody>
          </Card>
        </Col>
      </Row>
      <div className="content-footer pt-2 px-4 mx-4">
          <p>{new Date().getFullYear()} © JS Tour & Travel</p>
        </div>
    </div>
  );
};

export default NewTour;
