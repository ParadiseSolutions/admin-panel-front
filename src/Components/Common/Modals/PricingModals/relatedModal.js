import { useEffect, useState, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { map } from "lodash";
import {
  Row,
  Col,
  Modal,
  Form,
  Label,
  Input,
  FormFeedback,
  Button,
  Tooltip,
} from "reactstrap";
import { websitesData } from "../../../../Utils/Redux/Actions/WebsitesActions";
import { providersData } from "../../../../Utils/Redux/Actions/ProvidersActions";
import { categoriesData } from "../../../../Utils/Redux/Actions/CategoriesActions";
import { operatorsData } from "../../../../Utils/Redux/Actions/OperatorsActions";
import { locationsData } from "../../../../Utils/Redux/Actions/LocationsActions";
import {
  typeRelatedTourSelect,
  getCategoryWebsiteAPI,
  getLocationWebsitePI,
  operatorWebsite,
  providerWebsite,
  postRelatedFilterByName,
  postRelatedAdvanceFilter,
  postAddRelated,
  deleteRelated,
} from "../../../../Utils/API/Tours";
import FilteredTable from "../../../../Pages/Tours/EditComponents/PricingTables/filteredTable";
import { Name } from "../../../../Pages/Tours/EditComponents/PricingTables/PricingCols";

const RelatedModal = ({
  setRelatedFilter,
  relatedFilter,
  editProductID,
  tourData,
  copyProduct,
  setCopyProduct,
  id,
}) => {
  // initial request
  const [typeSelectData, setTypeSelectData] = useState([]);
  const [typeSelectSelected, setTypeSelectSelected] = useState([]);
  // filter by name
  const [filterByNameData, setFilterByNameData] = useState("");
  // website data request
  const [websiteData, setWebsiteData] = useState([]);
  const [websiteSelected, setWebsiteSelected] = useState(null);
  const [providerData, setProviderData] = useState([]);
  const [providerSelected, setProviderSelected] = useState(null);
  const [categoryData, setCategoryData] = useState([]);
  const [categorySelected, setCategorySelected] = useState(null);
  const [operatorData, setOperatorData] = useState([]);
  const [operatorSelected, setOperatorSelected] = useState(null);
  const [locationData, setLocationData] = useState([]);
  const [locationSelected, setLocationSelected] = useState(null);
  // filtered data
  const [filteredData, setFilteredData] = useState([]);
  const [buttonToogle, setButtonToogle] = useState(true);
  const [submitType, setSubmitType] = useState(1);
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    typeRelatedTourSelect().then((resp) => {
      setTypeSelectData(resp.data.data);
    });
  }, [relatedFilter]);

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
  }, [dispatch]);
  const websiteInfo = useSelector((state) => state.websites.websites.data);
  const providerInfo = useSelector((state) => state.providers.providers.data);
  const categoriesInfo = useSelector(
    (state) => state.categories.categories.data
  );
  const operatorInfo = useSelector((state) => state.operators.operators.data);
  const locationInfo = useSelector((state) => state.locations.locations.data);

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
  };
  useEffect(() => {
    initialData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [websiteInfo, providerInfo, categoriesInfo, operatorInfo, locationInfo]);

  const columnsAddons = useMemo(
    () => [
      {
        Header: "Tour ID",
        accessor: "id",
        disableFilters: false,
        filterable: true,
        Cell: (cellProps) => {
          return <Name {...cellProps} />;
        },
      },
      {
        Header: "Tour Name",
        accessor: "tour_link",
        disableFilters: true,
        filterable: false,
        Cell: (cellProps) => {
          return cellProps.cell.value ? (
            <a
              href={`${cellProps.cell.value}`}
              target="_blank"
              rel="noreferrer"
            >
              {cellProps.cell.row.original.name}
            </a>
          ) : (
            <>{cellProps.cell.row.original.name}</>
          );
        },
      },
      {
        Header: "Operator",
        accessor: "operator_name",
        disableFilters: true,
        filterable: false,
        Cell: (cellProps) => {
          return <Name {...cellProps} />;
        },
      },
      {
        Header: "Category",
        accessor: "category_name",
        disableFilters: false,
        filterable: true,
        Cell: (cellProps) => {
          return <Name {...cellProps} />;
        },
      },
      {
        Header: "Location",
        accessor: "location_name",
        disableFilters: true,
        filterable: false,
        Cell: (cellProps) => {
          return <Name {...cellProps} />;
        },
      },
      {
        Header: "Website",
        accessor: "website_name",
        disableFilters: true,
        filterable: false,
        Cell: (cellProps) => {
          return <Name {...cellProps} />;
        },
      },
      {
        Header: "Provider URL",
        accessor: "provider_tour_link",
        disableFilters: true,
        filterable: false,
        Cell: (cellProps) => {
          return cellProps.cell.value ? (
            <a
              href={`${cellProps.cell.value}`}
              target="_blank"
              rel="noreferrer"
            >
              {cellProps.cell.value.substring(0, 30)}...
            </a>
          ) : (
            <>{cellProps.cell.value}</>
          );
        },
      },
      {
        Header: "Type",
        accessor: "type",
        disableFilters: true,
        filterable: false,
        Cell: (cellProps) => {
          return (
            <Input
              type="select"
              id={`type-select-${cellProps.cell.row.original.id}`}
              name=""
              onChange={(e) => {
                /* console.log(cellProps.cell.row.original); */
                setTypeSelectSelected(e.target.value);
              }}
              //   value={validationType.values.department || ""}
            >
              <option value="-1">Select....</option>
              <option value="1">Backup</option>
              <option value="2">Alternative</option>
            </Input>
          );
        },
      },
      {
        Header: "Actions",
        accessor: "",
        disableFilters: true,
        filterable: false,
        Cell: (cellProps) => {
          return (
            <>
              <p
                id={`toogle-button-add-${cellProps.cell.row.original.id}`}
                style={{ color: "#F6851F", cursor: "pointer" }}
                onClick={() => onSubmitRelation(cellProps.cell.row.original)}
              >
                + Add
              </p>
              <p
                id={`toogle-button-delete-${cellProps.cell.row.original.id}`}
                style={{ color: "#3CC6F3", cursor: "pointer" }}
                className="hide-element-ps"
                onClick={() => deleteRelation(cellProps.cell.row.original)}
              >
                - Remove
              </p>
            </>
          );
        },
      },
      // eslint-disable-next-line react-hooks/exhaustive-deps
    ],
    []
  );

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
    }
  };

  const onsubmitNameFilter = () => {
    setSubmitType(1);
    debugger;
    let data = {
      current_tour_id: id,
      search: filterByNameData,
    };
    postRelatedFilterByName(data)
      .then((resp) => {
        setFilteredData(resp.data.data);
      })
      .catch((err) => console.log(err));
  };
  const submitAdvanceFilters = () => {
    setSubmitType(2);
    let data = {
      current_tour_id: id,
      website_id: websiteSelected === "-1" ? null : websiteSelected,
      provider_id: providerSelected === "-1" ? null : providerSelected,
      category_id: categorySelected === "-1" ? null : categorySelected,
      operator_id: operatorSelected === "-1" ? null : operatorSelected,
      location_id: locationSelected === "-1" ? null : locationSelected,
    };
    postRelatedAdvanceFilter(data)
      .then((resp) => {
        setFilteredData(resp.data.data);
      })
      .catch((err) => console.log(err));
  };

  const onSubmitRelation = (row) => {
    let data = {
      current_tour_id: id,
      related_tour_id: row.id,
      type_id: document.querySelector(`#type-select-${row.id}`).value,
    };
    postAddRelated(data)
      .then((resp) => {
        if (resp.data.status === 201) {
          setButtonToogle(false);
          document
            .querySelector(`#toogle-button-add-${row.id}`)
            .classList.add("hide-element-ps");
          document
            .querySelector(`#toogle-button-delete-${row.id}`)
            .classList.remove("hide-element-ps");
          document
            .querySelector(`#row-selected-${row.id}`)
            .classList.add("selected-row");

          setCounter((counter) => counter + 1);
        }
      })
      .catch((err) => console.log(err));
  };

  const deleteRelation = (row) => {
    deleteRelated(id, row.id).then((resp) => {
      if (resp.data.status === 200) {
        document
          .querySelector(`#toogle-button-add-${row.id}`)
          .classList.remove("hide-element-ps");
        document
          .querySelector(`#toogle-button-delete-${row.id}`)
          .classList.add("hide-element-ps");
        document
          .querySelector(`#row-selected-${row.id}`)
          .classList.remove("selected-row");

        setCounter((counter) => counter - 1);
      }
    });
  };

  const refreshFilters = () => {
    setFilteredData([]);
    setWebsiteData([]);
    setProviderData([]);
    setCategoryData([]);
    setOperatorData([]);
    setLocationData([]);
    setFilterByNameData("");
    const websitesRequest = () => dispatch(websitesData());
    websitesRequest();
    
  };

  return (
    <Modal
      centered
      size="xl"
      style={{ maxWidth: "1700px", width: "100%" }}
      isOpen={relatedFilter}
    >
      <div
        className="modal-header"
        style={{ backgroundColor: "#3DC7F4", border: "none" }}
      >
        <h1 className="modal-title mt-0 text-white">Add Related Tour</h1>

        <button
          onClick={() => {
            setRelatedFilter(false);
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
      <div className="modal-body">
        <Row xl={12}>
          <Row className="flex mx-3">
            <Col className="col-11 mt-2">
              <div className="form-outline mb-4">
                <Label className="form-label">Quick Search</Label>
                <Input
                  name="product_name"
                  placeholder=""
                  type="text"
                  value={filterByNameData}
                  onChange={(e) => setFilterByNameData(e.target.value)}
                />
              </div>
            </Col>
            <Col className="pt-2">
              <Button
                color="paradise"
                outline
                className="waves-effect waves-light mt-4 p-0"
                type="button"
                onClick={() => onsubmitNameFilter()}
              >
                <i
                  className="bx bx-search-alt-2"
                  id="search"
                  style={{
                    fontSize: "30px",
                    color: "#3DC7F4",
                    margin: "5px",
                    cursor: "pointer",
                  }}
                ></i>
              </Button>
            </Col>
          </Row>
          <Row className="flex mx-3">
            <Label className="form-label">or Browse</Label>
            <Col className="col-3">
              <div className="form-outline mb-4">
                <Label className="form-label">Website</Label>
                <Input
                  type="select"
                  name=""
                  onChange={(e) => {
                    setWebsiteSelected(e.target.value);
                    onChangeWebsite(e.target.value);
                  }}
                  //   value={validationType.values.department || ""}
                >
                  <option value="-1">Select....</option>
                  {map(websiteData, (website, index) => {
                    return (
                      <option key={index} value={website.id}>
                        {website.company_name}
                      </option>
                    );
                  })}
                </Input>
              </div>
            </Col>
            <Col className="col-2">
              <div className="form-outline mb-4">
                <Label className="form-label">Provider</Label>
                <Input
                  type="select"
                  name=""
                  onChange={(e) => {
                    setProviderSelected(e.target.value);
                  }}
                  //   value={validationType.values.department || ""}
                >
                  <option value="-1">Select....</option>
                  {map(providerData, (provider, index) => {
                    return (
                      <option
                        key={index}
                        value={
                          provider.provider_id
                            ? provider.provider_id
                            : provider.id
                        }
                      >
                        {provider.name}
                      </option>
                    );
                  })}
                </Input>
              </div>
            </Col>
            <Col className="col-2">
              <div className="form-outline mb-4">
                <Label className="form-label">Category</Label>
                <Input
                  type="select"
                  name=""
                  onChange={(e) => {
                    setCategorySelected(e.target.value);
                  }}
                  //   value={validationType.values.department || ""}
                >
                  <option value="-1">Select....</option>
                  {map(categoryData, (category, index) => {
                    return (
                      <option
                        key={index}
                        value={
                          category.category_id
                            ? category.category_id
                            : category.id
                        }
                      >
                        {category.name}
                      </option>
                    );
                  })}
                </Input>
              </div>
            </Col>
            <Col className="col-2">
              <div className="form-outline mb-4">
                <Label className="form-label">Operator</Label>
                <Input
                  type="select"
                  name=""
                  onChange={(e) => {
                    setOperatorSelected(e.target.value);
                  }}
                  //   value={validationType.values.department || ""}
                >
                  <option value="-1">Select....</option>
                  {map(operatorData, (operator, index) => {
                    return (
                      <option
                        key={index}
                        value={
                          operator.operator_id
                            ? operator.operator_id
                            : operator.id
                        }
                      >
                        {operator.name}
                      </option>
                    );
                  })}
                </Input>
              </div>
            </Col>
            <Col className="col-2">
              <div className="form-outline mb-4">
                <Label className="form-label">Location</Label>
                <Input
                  type="select"
                  name=""
                  onChange={(e) => {
                    setLocationSelected(e.target.value);
                  }}
                  //   value={validationType.values.department || ""}
                >
                  <option value="-1">Select....</option>
                  {map(locationData, (location, index) => {
                    return (
                      <option key={index} value={location.id}>
                        {location.name}
                      </option>
                    );
                  })}
                </Input>
              </div>
            </Col>

            <Col className="pt-1">
              <Button
                color="paradise"
                outline
                className="waves-effect waves-light mt-4 p-0"
                type="button"
                onClick={() => submitAdvanceFilters()}
              >
                <i
                  className="bx bx-search-alt-2"
                  id="search"
                  style={{
                    fontSize: "30px",
                    color: "#3DC7F4",
                    margin: "5px",
                    cursor: "pointer",
                  }}
                ></i>
              </Button>
            </Col>
          </Row>
          <Row>
            <Col
              className="col-12 p-1 my-2"
              style={{ backgroundColor: "#FFEFDE" }}
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
                Results
              </p>
            </Col>
          </Row>

          <Row>
            <FilteredTable
              columns={columnsAddons}
              data={filteredData}
              addonsTable={true}
            />
          </Row>
          <Row>
            <div className="mx-5 mt-5">
              <h4>{counter} Tours added to Related Tours.</h4>
            </div>
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
              onClick={() => {
                refreshFilters();
              }}
            >
              Refresh
            </Button>
            <Button
              id="save-button"
              type="submit"
              className="font-16 btn-block col-2 btn-orange"
              onClick={() => {
                setRelatedFilter(false);
              }}
            >
              Close
            </Button>
          </Row>
        </Row>
      </div>
    </Modal>
  );
};

export default RelatedModal;
