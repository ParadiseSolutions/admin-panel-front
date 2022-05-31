import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import newTourGi from "../../Components/Assets/images/newTourGI.jpg";
import { tourTypesData } from "../../Utils/Redux/Actions/TourTypesActions";
import { websitesData } from "../../Utils/Redux/Actions/WebsitesActions";
import { locationsData } from "../../Utils/Redux/Actions/LocationsActions";
import {
  shoppingCartWebsite,
  providerWebsite,
  operatorWebsite,
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

  //combo boxs
  const [tourTypeID, setTourTypeID] = useState(null)
  const [websiteID, setWebsiteID] = useState(null)
  const [shoppingCartID, setShoppingCartID] = useState(null)
  const [providerID, setProviderID] = useState(null)
  const [operatorID, setOperatorID] = useState(null)
  const [locationID, setLocationID] = useState(null)
  const [mainCatID, setMainCatID] = useState(null)
  const [secondCatID, setSecondCatID] = useState(null)

  //request based on website id
  const [shoppingCartData, setShoppingCartData] = useState(null);
  const [providerData, setProviderData] = useState(null);
  const [operatorData, setOperatorData] = useState(null);
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
  };

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
      console.log(data);
      //   createRol(data)
      //     .then((resp) => {
      //       console.log(resp.data);
      //       if (resp.data.status === 201) {
      //         Swal.fire(
      //           "Created!",
      //           "The Rol has been created.",
      //           "success"
      //         ).then(() => {
      //           history.goBack();
      //         });
      //       }
      //     })
      //     .catch((error) => {
      //       console.log(error.response);
      //       Swal.fire(
      //         "Error!",
      //         `${
      //           error.response.data.data[0]
      //         }`,
      //         "error"
      //       );
      //     });
    },
  });
  return (
    <div className="page-content">
      <Container fluid>
        <div className=" mx-4">
          <h1 className="display-5 fw-bold" style={{ color: "#3DC7F4" }}>
            CREATE NEW TOUR
          </h1>
        </div>
      </Container>
      <Row>
        <Col xl={12}>
          <Card>
            <CardBody>
              <Nav tabs className="nav-justified">
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
                    style={{ cursor: "pointer" }}
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
                <NavItem>
                  <NavLink
                    style={{ cursor: "pointer" }}
                    className={classnames({
                      active: activeTab === "3",
                    })}
                  >
                    <span className="d-block d-sm-none">
                      <i className="far fa-envelope"></i>
                    </span>
                    <span className="d-none d-sm-block">+ URLs</span>
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    style={{ cursor: "pointer" }}
                    className={classnames({
                      active: activeTab === "3",
                    })}
                  >
                    <span className="d-block d-sm-none">
                      <i className="far fa-envelope"></i>
                    </span>
                    <span className="d-none d-sm-block">+ Pricing</span>
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    style={{ cursor: "pointer" }}
                    className={classnames({
                      active: activeTab === "3",
                    })}
                  >
                    <span className="d-block d-sm-none">
                      <i className="far fa-envelope"></i>
                    </span>
                    <span className="d-none d-sm-block">+ Extras</span>
                  </NavLink>
                </NavItem>
              </Nav>

              <TabContent activeTab={activeTab} className="p-3 text-muted">
                <Form
                  onSubmit={(e) => {
                    e.preventDefault();
                    validationType.handleSubmit();
                    return false;
                  }}
                  className="custom-validation"
                >
                  <TabPane tabId="1">
                    <Row xl={12}>
                      <Col className="col-4">
                        <img src={newTourGi} alt="new tour girl" />
                      </Col>
                      <Col className="col-8">
                        <Row className="d-flex justify-content-start">
                          <div className="col-2">
                            <p
                              style={{
                                fontSize: "20px",
                                fontWeight: "bold",
                                color: "#495057",
                              }}
                            >
                              {" "}
                              INSTRUCTIONS.
                            </p>
                          </div>
                          <Col>
                            <p style={{ fontSize: "16px", marginTop: "5px" }}>
                              To create a new tour please fill out the following
                              information. Once you've completed this first
                              screen, you can navigate
                            </p>
                          </Col>
                        </Row>
                        <Row className="d-flex justify-content-start">
                          <Col>
                            <p style={{ fontSize: "16px", marginTop: "-12px" }}>
                              through the tabs and complete the information.
                              Once you're done with a section, press "Continue"
                              to save your changes.
                            </p>
                          </Col>
                        </Row>
                        <Row
                          className="col-12 p-1"
                          style={{ backgroundColor: "#E9F4FF" }}
                        >
                          <p
                            className="py-2"
                            style={{
                              fontSize: "20px",
                              fontWeight: "bold",
                              color: "#495057",
                              marginBottom: "0px",
                            }}
                          >
                            TOUR SETTINGS
                          </p>
                        </Row>
                        <Row className="col-12 d-flex justify-content-start">
                          <Row>
                            <Col className="col-4">
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
                            <Col className="col-4">
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
                                        {website.url}
                                      </option>
                                    );
                                  })}
                                </Input>
                              </div>
                            </Col>
                            <Col className="col-4">
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
                                        >
                                          {shoppingCart.name}
                                        </option>
                                      );
                                    }
                                  )}
                                </Input>
                              </div>
                            </Col>
                          </Row>
                        </Row>
                        <Row className="col-12 d-flex justify-content-start">
                          <Row>
                            <Col className="col-4">
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
                                      >
                                        {operator.operator_name}
                                      </option>
                                    );
                                  })}
                                </Input>
                              </div>
                            </Col>
                          </Row>
                        </Row>
                        <Row
                          className="col-12 p-1"
                          style={{ backgroundColor: "#FFEFDE" }}
                        >
                          <p
                            className="py-2"
                            style={{
                              fontSize: "20px",
                              fontWeight: "bold",
                              color: "#495057",
                              marginBottom: "0px",
                            }}
                          >
                            TOUR DETAILS
                          </p>
                        </Row>
                        <Row className="col-12 d-flex justify-content-start">
                          <Row>
                            <Col className="col-8">
                              <div className="form-outline mt-2">
                                <Label className="form-label">Tour Name</Label>
                                <Input
                                  name="tour_name"
                                  placeholder=""
                                  type="text"
                                  onChange={validationType.handleChange}
                                  onBlur={validationType.handleBlur}
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
                                  onBlur={validationType.handleBlur}
                                  //   value={validationType.values.department || ""}
                                >
                                  <option>Select....</option>
                                  {map(dataLocations, (location, index) => {
                                    return (
                                      <option key={index} value={location.id}>
                                        {location.name}
                                      </option>
                                    );
                                  })}
                                </Input>
                              </div>
                            </Col>
                          </Row>
                        </Row>
                        <Row className="col-12 d-flex justify-content-start">
                          <Row>
                            <Col className="col-4">
                              <div className="form-outline my-2">
                                <Label className="form-label">
                                  Main Category
                                </Label>
                                <Input
                                  type="select"
                                  name=""
                                  disabled={providerData ? false : true}
                                  onChange={(e) =>{
                                    setMainCatID(e.target.value)
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
                                <Label className="form-label">
                                  Sub-Category
                                </Label>
                                <Input
                                  type="select"
                                  name=""
                                  disabled={providerData ? false : true}
                                  onChange={(e) =>{
                                    setSecondCatID(e.target.value)
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
                                      >
                                        {operator.operator_name}
                                      </option>
                                    );
                                  })}
                                </Input>
                              </div>
                            </Col>
                            <Col className="col-4">
                              <div className="form-outline my-2">
                                <Label className="form-label">
                                  2-Digit Code
                                </Label>
                                <Input
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
                        </Row>
                        <Row
                          className="col-12 d-flex justify-content-end mt-5"
                          style={{ paddingRight: "30px" }}
                        >
                          <Button
                            color="paradise"
                            outline
                            className="waves-effect waves-light col-2 mx-4"
                            type="button"
                            onClick={() => history.goBack()}
                          >
                            <i className="uil-angle-double-left" />
                            Back
                          </Button>
                          <Button
                            style={{ backgroundColor: "#F6851F" }}
                            type="submit"
                            className="font-16 btn-block col-2"
                            // onClick={toggleCategory}
                          >
                            Continue
                            <i className="uil-angle-double-right mx-1 " />
                          </Button>
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
    </div>
  );
};

export default NewTour;
