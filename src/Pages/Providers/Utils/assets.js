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
import { VscEye } from "react-icons/vsc";
import Swal from "sweetalert2";
import classnames from "classnames";
import { getAssetsAPI } from "../../../Utils/API/Providers";
import AssetModal from "../../../Components/Common/Modals/AssetsModal/assetsModal";
const Assets = ({ contacts, id }) => {
  const [col2, setcol2] = useState(false);
  const [initialData, setinitialData] = useState([]);
  const [boatData, setboatData] = useState([]);
  const [vehicleData, setvehicleData] = useState([]);
  const [othersData, setothersData] = useState([]);
  const [showDetails, setshowDetails] = useState({});
  const [assetModal, setAssetModal] = useState(false);
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

  useEffect(() => {
    getAssetsAPI(id).then((res) => {
      setinitialData(res.data.data);
      setboatData(res.data.data.filter((data) => data.asset_id === 1));
      setvehicleData(
        res.data.data.filter(
          (data) =>
            data.asset_id === 2 ||
            data.asset_id === 3 ||
            data.asset_id === 4 ||
            data.asset_id === 8
        )
      );
      setothersData(
        res.data.data.filter(
          (data) =>
            data.asset_id === 5 ||
            data.asset_id === 6 ||
            data.asset_id === 7 ||
            data.asset_id === 9
        )
      );
    });
  }, [id]);

  const toggleDetails = (index) => {
    setshowDetails((prevState) => ({
      ...prevState,
      [index]: !prevState[index],
    }));
  };
  console.log("boatData", boatData);

  console.log("initialData", initialData);

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
                                activeTab === "1" ? "#3DC7F4" : "white"
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
                                activeTab === "2" ? "#3DC7F4" : "white"
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
                                activeTab === "3" ? "#3DC7F4" : "white"
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
                          <div className="table-responsive">
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

                                        <td>
                                          {" "}
                                          <div className="d-flex gap-3">
                                            <div className="text-success">
                                              <i
                                                className="mdi mdi-pencil-outline font-size-18 text-paradise"
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
                                            <div className="text-warning">
                                              <VscEye
                                                size={30}
                                                onClick={() =>
                                                  toggleDetails(index)
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
                                              // onClick={() => {
                                              //   const rolData = cellProps.row.original;
                                              //   // setconfirm_alert(true);
                                              //   onDelete(rolData);
                                              // }}
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
                                      {showDetails[index] ? (
                                        <tr className="">
                                          <td>
                                            Accessibility: {boat.access_name}
                                          </td>
                                          <td>Sailing: {boat.sailing}</td>
                                          <td>Bathrooms: {boat.bathrooms}</td>
                                          <td>Shade: {boat.shade}</td>
                                        </tr>
                                      ) : null}
                                    </>
                                  );
                                })}
                              </tbody>
                            </Table>
                          </div>
                        </TabPane>
                        <TabPane tabId="2">
                          <div className="table-responsive">
                            <Table className="react_table">
                              <thead className="table-nowrap">
                                <tr>
                                  <th>Type</th>
                                  <th>Make</th>
                                  <th>Model</th>
                                  <th>Location</th>
                                  <th>Qty</th>
                                  <th>Max Capacity</th>
                                  <th>Actions</th>
                                </tr>
                              </thead>
                              <tbody>
                                {vehicleData.map((vehicle, index) => {
                                  return (
                                    <>
                                      <tr key={index}>
                                        <td>{vehicle.type_name}</td>
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
                                                  toggleDetails(index)
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
                                              // onClick={() => {
                                              //   const rolData = cellProps.row.original;
                                              //   // setconfirm_alert(true);
                                              //   onDelete(rolData);
                                              // }}
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
                                      {showDetails[index] ? (
                                        <tr>
                                          <td>
                                            Transmition:{" "}
                                            {vehicle.transmission_name}
                                          </td>
                                        </tr>
                                      ) : null}
                                    </>
                                  );
                                })}
                              </tbody>
                            </Table>
                          </div>
                        </TabPane>
                        <TabPane tabId="3">
                          <div className="table-responsive">
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
                                              />
                                              <UncontrolledTooltip
                                                placement="top"
                                                target="edittooltip"
                                              >
                                                Edit
                                              </UncontrolledTooltip>
                                            </div>
                                            <div
                                              className="text-danger"
                                              // onClick={() => {
                                              //   const rolData = cellProps.row.original;
                                              //   // setconfirm_alert(true);
                                              //   onDelete(rolData);
                                              // }}
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
          </Row>
      <AssetModal assetModal={assetModal} setAssetModal={setAssetModal} />
        </div>
      </Collapse>
    </div>
  );
};

export default Assets;
