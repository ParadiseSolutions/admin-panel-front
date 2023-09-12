import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { websitesData } from "../../../../Utils/Redux/Actions/WebsitesActions";
import PrivateCharterImage from "../../../Assets/images/private-charter.png";
import FiltersImage from "../../../Assets/images/filters.jpg";
import {
  Row,
  Col,
  Modal,
  Form,
  Label,
  Input,
  FormFeedback,
  Button,
  UncontrolledTooltip,
} from "reactstrap";
import * as Yup from "yup";
import { useFormik } from "formik";

import { map } from "lodash";
import Swal from "sweetalert2";
import { providersData } from "../../../../Utils/Redux/Actions/ProvidersActions";
import { categoriesData } from "../../../../Utils/Redux/Actions/CategoriesActions";
import { operatorsData } from "../../../../Utils/Redux/Actions/OperatorsActions";
import { locationsData } from "../../../../Utils/Redux/Actions/LocationsActions";
import { toursData } from "../../../../Utils/Redux/Actions/ToursActions";
import {
  getCategoryWebsiteAPI,
  getLocationWebsitePI,
  operatorWebsite,
  providerWebsite,
  toursWebsite,
} from "../../../../Utils/API/Tours";

const ToursFilters = ({ filters, setFilters, onSubmitFilters }) => {
  //initial Data
  const [websiteData, setWebsiteData] = useState([]);
  const [websiteSelected, setWebsiteSelected] = useState([]);
  const [providerData, setProviderData] = useState([]);
  const [providerSelected, setProviderSelected] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const [categorySelected, setCategorySelected] = useState([]);
  const [operatorData, setOperatorData] = useState([]);
  const [operatorSelected, setOperatorSelected] = useState([]);
  const [locationData, setLocationData] = useState([]);
  const [locationSelected, setLocationSelected] = useState([]);
  const [tourData, setTourData] = useState([]);
  const [tourSelected, setTourSelected] = useState([]);

  const dispatch = useDispatch();
  useEffect(() => {
    const websitesRequest = () => dispatch(websitesData());
    websitesRequest();
    const providersRequest = () => dispatch(providersData());
    providersRequest();
    const categoriesRequest = () => dispatch(categoriesData());
    categoriesRequest();
    const operatorsRequest = () => dispatch(operatorsData());
    operatorsRequest();
    const locationsRequest = () => dispatch(locationsData());
    locationsRequest();
    const toursRequest = () => dispatch(toursData());
    toursRequest();
  }, [dispatch]);

  const websiteInfo = useSelector((state) => state.websites.websites.data);
  const providerInfo = useSelector((state) => state.providers.providers.data);
  const categoriesInfo = useSelector(
    (state) => state.categories.categories.data
  );
  const operatorInfo = useSelector((state) => state.operators.operators.data);
  const locationInfo = useSelector((state) => state.locations.locations.data);
  const tourInfo = useSelector((state) => state.tours.tours.data);

  const initialData = () => {
    if (websiteInfo) {
      setWebsiteData(websiteInfo);
    }
    if (providerInfo) {
      setProviderData(providerInfo);
    }
    if (categoriesInfo) {
      setCategoryData(categoriesInfo);
    }
    if (operatorInfo) {
      setOperatorData(operatorInfo);
    }
    if (locationInfo) {
      setLocationData(locationInfo);
    }
    if (tourInfo) {
      setTourData(tourInfo);
    }
  };
  useEffect(() => {
    initialData();
  }, [
    websiteInfo,
    providerInfo,
    categoriesInfo,
    operatorInfo,
    locationInfo,
    tourInfo,
  ]);
  //on change website
  const onChangeWebsite = (id) => {
    if (id > 0) {
      providerWebsite(id).then((resp) => {
        setProviderData(resp.data.data);
        // if (resp.data.data.length === 1) {
        //   setProviderID(resp.data.data[0].id)
        // }else{
        //   setProviderID(null)
        // }
      });
      operatorWebsite(id).then((resp) => {
        setOperatorData(resp.data.data);
        // if (resp.data.data.length === 1) {
        //   setOperatorID(resp.data.data[0].id)
        // }else{
        //   setOperatorID(null)
        // }
      });
      toursWebsite(id).then((resp) => {
        setTourData(resp.data.data);
        // if (resp.data.data.length === 1) {
        //   setOperatorID(resp.data.data[0].id)
        // }else{
        //   setOperatorID(null)
        // }
      });
      getLocationWebsitePI(id).then((resp) => {
        setLocationData(resp.data.data);
        // if (resp.data.data.length === 1) {
        //   setLocationID(resp.data.data[0].id)
        // }else{
        //   setLocationID(null)
        // }
      });
      getCategoryWebsiteAPI(id).then((resp) => {
        setCategoryData(resp.data.data);
        // if (resp.data.data.length === 1) {
        //   setMainCatID(resp.data.data[0].id)
        // }else{
        //   setMainCatID(null)
        // }
      });
    } else {
      setWebsiteData(websiteInfo);
      setProviderData(providerInfo);
      setCategoryData(categoriesInfo);
      setOperatorData(operatorInfo);
      setLocationData(locationInfo);
      setTourData(tourInfo);
    }

    //setCategoryId(id)
  };

  //submit advance search
  const submitAdvanceFilters = () => {
    let data = {
      website_id: websiteSelected.length > 0 ? websiteSelected : null,
      provider_id: providerSelected.length > 0 ? providerSelected : null,
      category_id: categorySelected.length > 0 ? categorySelected : null,
      operator_id: operatorSelected.length > 0 ? operatorSelected : null,
      location_id: locationSelected.length > 0 ? locationSelected : null,
      tour_id: tourSelected.length > 0 ? tourSelected : null,
    };

    onSubmitFilters(data);
    setFilters(false);
    setWebsiteSelected(null);
    setProviderSelected(null);
    setCategorySelected(null);
    setOperatorSelected(null);
    setLocationSelected(null);
    setTourSelected(null);
  };

  const validationType = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      search: "",
    },
    validationSchema: Yup.object().shape({
      /*  company_name: Yup.string().required("Name is required"),
      code: Yup.string()
        .required("Code is required")
        .min(2, "Code must be 2-character long")
        .max(2, "Code must be 2-character long"),
      domain: Yup.string().required("Domain is required"),
      url: Yup.string().required("URL is required").matches(
        /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
        "Enter correct url!"
      ), */
      // cpanel_account: Yup.string().required("cPanel Account Name is required"),
      // root_folder: Yup.string().required("Root Folder Name is required"),
      // user_folder: Yup.string().required("User Folder Name is required"),
      // accent_color: Yup.string().required("Accent Color is required"),
      // primary_color: Yup.string().required("Primary Color is required"),
      // secondary_color: Yup.string().required("Secondary Color is required"),
    }),
    onSubmit: (values) => {
      onSubmitFilters(values);
      setFilters(false);
    },
  });
  return (
    <Modal
      centered
      size="xl"
      isOpen={filters}
      toggle={() => {
        // onClickAddNew();
      }}
    >
      <div
        className="modal-header"
        style={{ backgroundColor: "#3DC7F4", border: "none" }}
      >
        <div className="d-flex" target="edittooltip">
          <h1 className="modal-title mt-0 text-white">Choose Filters</h1>
          <i
            className="ul uil-question-circle mx-3"
            style={{ fontSize: "35px", color: "white" }}
            id="edittooltip"
          ></i>
          <UncontrolledTooltip placement="top" target="edittooltip">
            Choose to filter your search either by URL or Advanced.
          </UncontrolledTooltip>
        </div>

        <button
          onClick={() => {
            setFilters(false);
          }}
          type="button"
          className="close"
          style={{ color: "white" }}
          data-dismiss="modal"
          aria-label="Close"
        >
          <span aria-hidden="true" className="text-white bg-white">
            &times;
          </span>
        </button>
      </div>
      <div className="modal-body p-4">
        <Form
          onSubmit={(e) => {
            e.preventDefault();
            validationType.handleSubmit();
            return false;
          }}
          className="custom-validation"
        >
          <Row className="d-flex g-4">
            <Col className="col-5">
              <img
                src={FiltersImage}
                alt="new-product"
                style={{ width: "400px", height: "450px" }}
              />
            </Col>
            <Col className="col-7">
              <Col lg={10} className="d-flex">
                <div className="form-outline mb-4 col-10">
                  <h4 className="form-label font-weight-bold">
                    Tour Name or URL
                  </h4>
                  <Input
                    name="search"
                    placeholder="Cancun Discount"
                    type="text"
                    onChange={validationType.handleChange}
                    onBlur={validationType.handleBlur}
                    value={validationType.values.search || ""}
                    invalid={
                      validationType.touched.search &&
                      validationType.errors.search
                        ? true
                        : false
                    }
                  />
                  {validationType.touched.search &&
                  validationType.errors.search ? (
                    <FormFeedback type="invalid">
                      {validationType.errors.search}
                    </FormFeedback>
                  ) : null}
                </div>
                <Button
                  color="paradise"
                  outline
                  className="waves-effect waves-light mx-2 col-1"
                  style={{ height: "40px", marginTop: "33px" }}
                  type="submit"
                  // onClick={() => setFilters(false)}
                >
                  <i className="bx bx-search-alt-2"></i>
                </Button>
              </Col>
              <Col
                className="col-12 p-1 my-2"
                style={{ backgroundColor: "#FFFBC8" }}
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
                  Advance Search
                </p>
              </Col>

              <Col lg={10}>
                <div className="col-12 d-flex justify-content-between">
                  <div className="form-outline col-5 mt-3">
                    <h4 className="form-label  font-weight-bold">Website</h4>
                    <Input
                      type="select"
                      name="website"
                      onChange={(e) => {
                        setWebsiteSelected(e.target.value);
                        onChangeWebsite(e.target.value);
                      }}
                      onBlur={validationType.handleBlur}
                      //   value={validationType.values.department || ""}
                    >
                      <option value={0}>Select....</option>
                      {map(websiteData, (website, index) => {
                        return (
                          <option key={index} value={website.id}>
                            {website.company_name}
                          </option>
                        );
                      })}
                    </Input>
                  </div>
                  <div className="form-outline col-5 mt-3">
                    <h4 className="form-label  font-weight-bold">Provider</h4>
                    <Input
                      type="select"
                      name="provider"
                      onChange={(e) => {
                        setProviderSelected(e.target.value);
                      }}
                      onBlur={validationType.handleBlur}
                      //   value={validationType.values.department || ""}
                    >
                      <option value={null}>Select....</option>
                      {map(providerData, (provider, index) => {
                        return (
                          <option key={index} value={provider.provider_id}>
                            {provider.name}
                          </option>
                        );
                      })}
                    </Input>
                  </div>
                </div>
              </Col>
              <Col lg={10}>
                <div className="col-12 d-flex justify-content-between">
                  <div className="form-outline col-5 mt-3">
                    <h4 className="form-label font-weight-bold">Category</h4>
                    <Input
                      type="select"
                      name="category"
                      onChange={(e) => {
                        setCategorySelected(e.target.value);
                      }}
                      onBlur={validationType.handleBlur}
                      //   value={validationType.values.department || ""}
                    >
                      <option value={null}>Select....</option>
                      {map(categoryData, (category, index) => {
                        return (
                          <option key={index} value={category.category_id}>
                            {category.name}
                          </option>
                        );
                      })}
                    </Input>
                  </div>
                  <div className="form-outline col-5 mt-3">
                    <h4 className="form-label font-weight-bold">Operator</h4>
                    <Input
                      type="select"
                      name="operator"
                      onChange={(e) => {
                        setOperatorSelected(e.target.value);
                      }}
                      onBlur={validationType.handleBlur}
                      //   value={validationType.values.department || ""}
                    >
                      <option value={null}>Select....</option>
                      {map(operatorData, (operator, index) => {
                        return (
                          <option key={index} value={operator.operator_id}>
                            {operator.name}
                          </option>
                        );
                      })}
                    </Input>
                  </div>
                </div>
              </Col>
              <Col lg={10}>
                <div className="col-12 d-flex justify-content-between">
                  <div className="form-outline col-5 mt-3">
                    <h4 className="form-label font-weight-bold">Location</h4>
                    <Input
                      type="select"
                      name="location"
                      onChange={(e) => {
                        setLocationSelected(e.target.value);
                      }}
                      onBlur={validationType.handleBlur}
                      //   value={validationType.values.department || ""}
                    >
                      <option value={null}>Select....</option>
                      {map(locationData, (location, index) => {
                        return (
                          <option key={index} value={location.id}>
                            {location.name}
                          </option>
                        );
                      })}
                    </Input>
                  </div>
                  <div className="form-outline col-5 mt-3">
                    <h4 className="form-label font-weight-bold">Tour</h4>
                    <Input
                      type="select"
                      name="tour"
                      onChange={(e) => {
                        setTourSelected(e.target.value);
                      }}
                      onBlur={validationType.handleBlur}
                      //   value={validationType.values.department || ""}
                    >
                      <option value={null}>Select....</option>
                      {map(tourData, (tour, index) => {
                        return (
                          <option key={index} value={tour.id}>
                            {tour.name}
                          </option>
                        );
                      })}
                    </Input>
                  </div>
                </div>
              </Col>
            </Col>

            <Row>
              <Col className="col-12 d-flex justify-content-end mt-4">
                <Button
                  color="paradise"
                  outline
                  className="waves-effect waves-light"
                  type="button"
                  onClick={() => {
                    setWebsiteData([]);
                    setProviderData([]);
                    setCategoryData([]);
                    setOperatorData([]);
                    setLocationData([]);
                    setTourData([]);
                  }}
                >
                  <i className="ul uil-redo size"></i>
                </Button>
                <Button
                  color="paradise"
                  outline
                  className="waves-effect waves-light mx-4"
                  type="button"
                  onClick={() => submitAdvanceFilters()}
                >
                  <i className="bx bx-search-alt-2 size"></i>
                </Button>
                {/* <Button
                  type="submit"
                  className="font-16 btn-block col-2 btn-orange"
                  // onClick={toggleCategory}
                >
                  Save
                </Button> */}
              </Col>
            </Row>
          </Row>
        </Form>
      </div>
    </Modal>
  );
};

export default ToursFilters;
