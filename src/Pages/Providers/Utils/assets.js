import { Fragment, useEffect, useState } from "react";
import {
  Collapse,
  Row,
  Col,
  Card,
  CardBody,
  UncontrolledTooltip,
  Button,
  NavLink,
  NavItem,
  Nav,
  TabContent,
  TabPane,
  Table,
} from "reactstrap";
import { ActiveBoat } from "../ProvidersCols";
import { VscEye } from "react-icons/vsc";
import Switch from "react-switch";
import Swal from "sweetalert2";
import classnames from "classnames";
import { getAssetsAPI } from "../../../Utils/API/Providers";
import AssetModal from "../../../Components/Common/Modals/AssetsModal/assetsModal";
import { deleteAsset } from "../../../Utils/API/Assets";
const Assets = ({ contacts, id }) => {
  const [col2, setcol2] = useState(false);
  const [boatData, setboatData] = useState([]);
  const [vehicleData, setvehicleData] = useState([]);
  const [othersData, setothersData] = useState([]);
  const [editID, setEditID] = useState(null);
  const [showDetails, setshowDetails] = useState(false);
  const [assetModal, setAssetModal] = useState(false);
  const [selectedAsset, setSelectedAsset] = useState(null);
  const [isEdit, setIsEdit] = useState(false);

    useEffect(() => {
    getAssetsAPI(id).then((res) => {
      setboatData(res.data.data.filter((data) => data.asset_id === 1));
      setvehicleData(
        res.data.data.filter((data) => data.assets.asset_type === "Vehicles")
      );
      setothersData(
        res.data.data.filter((data) => data.assets.asset_type === "Others")
      );
    });
  }, [id]);

  function togglecol1() {
    setcol2(!col2);
  }

  //tabs
  const [activeTab, setactiveTab] = useState("1");
  function toggle(tab) {
    if (activeTab !== tab) {
      setactiveTab(tab);
    }
  }


  function toggleDetails(index, type) {
    let selectedAsset = null;
    if (type === "boat") {
      selectedAsset = boatData[index];
    } else if (type === "vehicle") {
      selectedAsset = vehicleData[index];
    } else if (type === "other") {
      selectedAsset = othersData[index];
    }
    setSelectedAsset(selectedAsset);
    setshowDetails(true);
  }

  const resetTable = () => {
    getAssetsAPI(id).then((res) => {
      setboatData(res.data.data.filter((data) => data.asset_id === 1));
      setvehicleData(
        res.data.data.filter((data) => data.assets.asset_type === "Vehicles")
      );
      setothersData(
        res.data.data.filter((data) => data.assets.asset_type === "Others")
      );
    });
  };

  const deleteAssetSelected = (id) => {
    Swal.fire({
      title: "Delete Asset?",
      icon: "question",
      // text: `Do you want delete ${depData.first_name}`,
      showCancelButton: true,
      confirmButtonText: "Yes",
      confirmButtonColor: "#F38430",
      cancelButtonText: "Cancel",
    }).then((resp) => {
      deleteAsset(id)
        .then((res) => {
          resetTable();
          Swal.fire({
            icon: "success",
            title: "Deleted!",
            text: "Asset has been deleted.",
          });
        })
        .catch((err) => {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong!",
          });
        });
    });
  };
  return (
    <div className="accordion-item">
      <h2 className="accordion-header" id="headingTwo">
        <button
          className={classnames("accordion-button", "fw-medium", {
            collapsed: !col2,
          })}
          type="button"
          onClick={togglecol1}
          style={{
            cursor: "pointer",
            backgroundColor: "#F6851F",
            color: "white",
          }}
        >
          Assets
        </button>
      </h2>
      <Collapse id="collapseTwo" className="accordion-collapse" isOpen={col2}>
        <div className="accordion-body">
          <Row>
            <Col xs="12">
              <Card>
                <CardBody>
                  <Row className="m-4 flex justify-content-end">
                    <Col>
                      <div className="text-sm-end">
                        <Button
                          type="button"
                          className="waves-effect waves-light mb-3 btn btn-orange"
                          onClick={() => setAssetModal(true)}
                        >
                          <i className="mdi mdi-plus me-1" />
                          New
                        </Button>
                      </div>
                    </Col>
                    <div className="p-0 card-header mt-4 bg-transparent">
                      <Nav
                        tabs
                        className="nav-justified border-paradise border-3"
                      >
                        <NavItem style={{ flexGrow: "unset" }}>
                          <NavLink
                            style={{
                              cursor: "pointer",
                              backgroundColor: `${
                                activeTab === "1" ? "#3DC7F4" : "transparent"
                              }`,
                              borderColor: "transparent",
                              color: `${
                                activeTab === "1" ? "white" : "#3DC7F4"
                              }`,
                              padding: "10px 40px",
                            }}
                            className={classnames({
                              active: activeTab === "1",
                            })}
                            onClick={() => {
                              toggle("1");
                              setshowDetails(false);
                            }}
                          >
                            <span className="d-block d-sm-none">
                              <i className="fas fa-home"></i>
                            </span>
                            <span className="d-none d-sm-block">Boats</span>
                          </NavLink>
                        </NavItem>
                        <NavItem style={{ flexGrow: "unset" }}>
                          <NavLink
                            style={{
                              cursor: "pointer",
                              backgroundColor: `${
                                activeTab === "2" ? "#3DC7F4" : "transparent"
                              }`,
                              borderColor: "transparent",
                              color: `${
                                activeTab === "2" ? "white" : "#3DC7F4"
                              }`,
                              padding: "10px 40px",
                            }}
                            className={classnames({
                              active: activeTab === "2",
                            })}
                            onClick={() => {
                              toggle("2");
                              setshowDetails(false);
                              
                            }}
                          >
                            <span className="d-block d-sm-none">
                              <i className="fas fa-home"></i>
                            </span>
                            <span className="d-none d-sm-block">Vehicles</span>
                          </NavLink>
                        </NavItem>
                        <NavItem style={{ flexGrow: "unset" }}>
                          <NavLink
                            style={{
                              cursor: "pointer",
                              backgroundColor: `${
                                activeTab === "3" ? "#3DC7F4" : "transparent"
                              }`,
                              borderColor: "transparent",
                              color: `${
                                activeTab === "3" ? "white" : "#3DC7F4"
                              }`,
                              padding: "10px 40px",
                            }}
                            className={classnames({
                              active: activeTab === "3",
                            })}
                            onClick={() => {
                              toggle("3");
                              setshowDetails(false);
                            }}
                          >
                            <span className="d-block d-sm-none">
                              <i className="fas fa-home"></i>
                            </span>
                            <span className="d-none d-sm-block">Others</span>
                          </NavLink>
                        </NavItem>
                      </Nav>
                    </div>
                    <CardBody className="p-0">
                      <TabContent
                        activeTab={activeTab}
                        className="p-4 text-muted"
                      >
                        <TabPane tabId="1">
                          <div className="table-responsive overflow-hidden">
                            <Table className="react_table">
                              <thead className="table-nowrap">
                                <tr>
                                  <th>Boat Name</th>
                                  <th>Type</th>
                                  <th>Length</th>
                                  <th>Capacity</th>
                                  <th>Make</th>
                                  <th>Model</th>
                                  <th>Location</th>
                                  <th>Marina Location</th>
                                  <th>Active</th>

                                  <th>Actions</th>
                                </tr>
                              </thead>
                              <tbody>
                                {boatData.map((boat, index) => {
                                  return (
                                    <>
                                      <tr>
                                        <td>{boat.name}</td>
                                        <td>{boat.type_name}</td>
                                        <td>{boat.length}</td>
                                        <td>{boat.capacity}</td>
                                        <td>{boat.make}</td>
                                        <td>{boat.model}</td>
                                        <td>{boat.location_name}</td>
                                        <td>{boat.asset_marina_location}</td>
                                        <td>
                                          <ActiveBoat cell={boat} />
                                        </td>

                                        <td>
                                          {" "}
                                          <div className="d-flex gap-3">
                                            <div className="text-success">
                                              <i
                                                className="mdi mdi-pencil-outline font-size-18 text-paradise"
                                                id="edittooltip"
                                                style={{ cursor: "pointer" }}
                                                onClick={() => {
                                                  setEditID(boat.id);
                                                  setAssetModal(true);
                                                  setIsEdit(true);
                                                }}
                                              />
                                              <UncontrolledTooltip
                                                placement="top"
                                                target="edittooltip"
                                              >
                                                Edit
                                              </UncontrolledTooltip>
                                            </div>
                                            <div className="text-warning">
                                              <VscEye
                                                size={30}
                                                onClick={() =>
                                                  toggleDetails(index, "boat")
                                                }
                                                style={{ cursor: "pointer" }}
                                              />
                                              <UncontrolledTooltip
                                                placement="top"
                                                target="edittooltip"
                                              >
                                                Details
                                              </UncontrolledTooltip>
                                            </div>
                                            <div
                                              className="text-danger"
                                              onClick={() => {
                                                deleteAssetSelected(boat.id);
                                              }}
                                            >
                                              <i
                                                className="mdi mdi-delete-outline font-size-18"
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
                                    </>
                                  );
                                })}
                              </tbody>
                            </Table>
                          </div>
                        </TabPane>
                        <TabPane tabId="2">
                          <div className="table-responsive overflow-hidden">
                            <Table className="react_table">
                              <thead className="table-nowrap">
                                <tr>
                                  <th>Type</th>
                                  <th>Make</th>
                                  <th>Model</th>
                                  <th>Location</th>
                                  <th>Qty</th>
                                  <th>Capacity</th>
                                  <th>Actions</th>
                                </tr>
                              </thead>
                              <tbody>
                                {vehicleData.map((vehicle, index) => {
                                  return (
                                    <>
                                      <tr key={index}>
                                        <td>{vehicle.asset_name}</td>
                                        <td>{vehicle.make}</td>
                                        <td>{vehicle.model}</td>
                                        <td>{vehicle.location_name}</td>
                                        <td>{vehicle.quantity}</td>

                                        <td>{vehicle.capacity}</td>

                                        <td>
                                          {" "}
                                          <div className="d-flex gap-3">
                                            <div className="text-success">
                                              <i
                                                className="mdi mdi-pencil-outline font-size-18 text-paradise"
                                                id="edittooltip"
                                                style={{ cursor: "pointer" }}
                                                onClick={() => {
                                                  setEditID(vehicle.id);
                                                  setAssetModal(true);
                                                }}
                                              />
                                              <UncontrolledTooltip
                                                placement="top"
                                                target="edittooltip"
                                              >
                                                Edit
                                              </UncontrolledTooltip>
                                            </div>
                                            <div className="text-warning">
                                              <VscEye
                                                size={30}
                                                onClick={() =>
                                                  toggleDetails(
                                                    index,
                                                    "vehicle"
                                                  )
                                                }
                                                style={{ cursor: "pointer" }}
                                              />
                                              <UncontrolledTooltip
                                                placement="top"
                                                target="edittooltip"
                                              >
                                                Details
                                              </UncontrolledTooltip>
                                            </div>
                                            <div
                                              className="text-danger"
                                              onClick={() => {
                                                deleteAssetSelected(vehicle.id);
                                              }}
                                            >
                                              <i
                                                className="mdi mdi-delete-outline font-size-18"
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
                                    </>
                                  );
                                })}
                              </tbody>
                            </Table>
                          </div>
                        </TabPane>
                        <TabPane tabId="3">
                          <div className="table-responsive overflow-hidden">
                            <Table className="react_table">
                              <thead className="table-nowrap">
                                <tr>
                                  <th>Asset</th>

                                  <th>Qty</th>
                                  <th>Location</th>
                                  <th>Capacity Ea.</th>
                                  <th>Max Capacity</th>
                                  <th>Actions</th>
                                </tr>
                              </thead>
                              <tbody>
                                {othersData.map((item, index) => {
                                  return (
                                    <>
                                      <tr>
                                        <td>{item.asset_name}</td>
                                        <td>{item.quantity}</td>
                                        <td>{item.location_name}</td>
                                        <td>{item.cap_ea}</td>
                                        <td>{item.max_cap}</td>
                                        <td>
                                          {" "}
                                          <div className="d-flex gap-3">
                                            <div className="text-success">
                                              <i
                                                className="mdi mdi-pencil-outline font-size-18 text-paradise"
                                                id="edittooltip"
                                                style={{ cursor: "pointer" }}
                                                onClick={() => {
                                                  setEditID(item.id);
                                                  setAssetModal(true);
                                                }}
                                              />
                                              <UncontrolledTooltip
                                                placement="top"
                                                target="edittooltip"
                                              >
                                                Edit
                                              </UncontrolledTooltip>
                                            </div>
                                            <div className="text-warning">
                                              <VscEye
                                                size={30}
                                                onClick={() =>
                                                  toggleDetails(index, "other")
                                                }
                                                style={{ cursor: "pointer" }}
                                              />
                                              <UncontrolledTooltip
                                                placement="top"
                                                target="edittooltip"
                                              >
                                                Details
                                              </UncontrolledTooltip>
                                            </div>
                                            <div
                                              className="text-danger"
                                              onClick={() => {
                                                deleteAssetSelected(item.id);
                                              }}
                                            >
                                              <i
                                                className="mdi mdi-delete-outline font-size-18"
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
                                    </>
                                  );
                                })}
                              </tbody>
                            </Table>
                          </div>
                        </TabPane>
                      </TabContent>
                    </CardBody>
                  </Row>
                </CardBody>
              </Card>
            </Col>
            {showDetails && (
              <>
                {selectedAsset && (
                  <Col xs="12">
                    <Card>
                      <CardBody>
                        <Row className="m-4 flex flex-column">
                          {selectedAsset && (
                            <Row>
                              {selectedAsset.asset_id === 1 && (
                                <div>
                                  <h1 className="text-paradise fw-bold fs-1">
                                    {selectedAsset.name} More Details
                                  </h1>
                                  <Col className="col-12 flex">
                                    <p className="d-inline-block mx-4">
                                      <span className="fw-bold">
                                        Accessibility:
                                      </span>{" "}
                                      {selectedAsset.access_name}
                                    </p>
                                    <p className="d-inline-block mx-4">
                                      <span className="fw-bold">Sailing:</span>{" "}
                                      {selectedAsset.sailing}
                                    </p>
                                    <p className="d-inline-block mx-4">
                                      <span className="fw-bold">
                                        Bathrooms:
                                      </span>{" "}
                                      {selectedAsset.bathrooms}
                                    </p>
                                    <p className="d-inline-block mx-4">
                                      <span className="fw-bold">Shade:</span>{" "}
                                      {selectedAsset.shade}
                                    </p>
                                    <p className="d-inline-block mx-4">
                                      <span className="fw-bold">A/C:</span>{" "}
                                      {selectedAsset.ac}
                                    </p>
                                  </Col>
                                </div>
                              )}
                              {selectedAsset.asset_id === 2 ||
                              selectedAsset.asset_id === 3 ||
                              selectedAsset.asset_id === 4 ? (
                                <div>
                                  <h1 className="text-paradise fw-bold fs-1">
                                    {selectedAsset.type_name} More Details
                                  </h1>
                                  <Col className="col-12 flex">
                                    <p className="d-inline-block mx-4">
                                      <span className="fw-bold">Sub-Type:</span>{" "}
                                      {selectedAsset.asset_vehicle_subtype}
                                    </p>
                                    <p className="d-inline-block mx-4">
                                      <span className="fw-bold">
                                        Transmission:
                                      </span>{" "}
                                      {selectedAsset.transmission_name}
                                    </p>
                                    <p className="d-inline-block mx-4">
                                      <span className="fw-bold">A/C:</span>{" "}
                                      {selectedAsset.ac}
                                    </p>
                                  </Col>
                                </div>
                              ) : null}
                              <Row>
                                <div className="table-responsive overflow-hidden">
                                  <Row>
                                    <h1 className="text-paradise fw-bold fs-1 my-5">
                                      Current Tour
                                    </h1>
                                  </Row>
                                  <Table className="react_table">
                                    <thead className="table-nowrap">
                                      <tr>
                                        <th>Tour ID</th>
                                        <th>Tour Name</th>
                                        <th>Category</th>
                                        <th>Link</th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      {selectedAsset?.assets_related_tours.map(
                                        (item, index) => {
                                          return (
                                            <>
                                              <tr key={index}>
                                                <td>{item.tour_id}</td>
                                                <td>{item.tour_name}</td>
                                                <td>
                                                  {item.tour_category_name}
                                                </td>
                                                <td>
                                                  <a
                                                    href={item.admin_link}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                  >
                                                    {item.admin_link}
                                                  </a>{" "}
                                                </td>
                                              </tr>
                                            </>
                                          );
                                        }
                                      )}
                                    </tbody>
                                  </Table>
                                </div>
                              </Row>
                            </Row>
                          )}
                        </Row>
                      </CardBody>
                    </Card>
                  </Col>
                )}
              </>
            )}
          </Row>
          <AssetModal
            assetModal={assetModal}
            setAssetModal={setAssetModal}
            editID={editID}
            resetTable={resetTable}
            isEdit={isEdit}
            setIsEdit={setIsEdit}
          />
        </div>
      </Collapse>
    </div>
  );
};

export default Assets;
