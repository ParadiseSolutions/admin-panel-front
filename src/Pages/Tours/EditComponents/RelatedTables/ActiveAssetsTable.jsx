import React, { useEffect, useState } from "react";
import {
  Nav,
  NavItem,
  NavLink,
  TabContent,
  Table,
  TabPane,

} from "reactstrap";
import classnames from "classnames";

const ActiveAssetsTable = ({ relatedAssetsActiveData, removeAsset }) => {
  const [activeTab, setactiveTab] = useState("1");
  const [boatData, setboatData] = useState([]);
  const [vehicleData, setvehicleData] = useState([]);
  const [othersData, setothersData] = useState([]);

  function toggle(tab) {
    if (activeTab !== tab) {
      setactiveTab(tab);
    }
  }

  useEffect(() => {
    if (relatedAssetsActiveData) {
      const boat = relatedAssetsActiveData.filter(
        (item) => item.asset_id === 1
      );
      const vehicle = relatedAssetsActiveData.filter(
        (item) =>
          item.assets.asset_type === "Vehicles"
      );
      const others = relatedAssetsActiveData.filter(
        (item) =>
          item.assets.asset_type === "Others"
      );
      setboatData(boat);
      setvehicleData(vehicle);
      setothersData(others);
    }
  }, [relatedAssetsActiveData]);


  return (
    <>
      <div className="p-0 card-header mt-4 bg-transparent">
        <Nav tabs className="nav-justified border-paradise border-3">
          <NavItem style={{ flexGrow: "unset" }}>
            <NavLink
              style={{
                cursor: "pointer",
                backgroundColor: `${activeTab === "1" ? "#3DC7F4" : "transparent"}`,
                borderColor: "transparent",
                color: `${activeTab === "1" ? "white" : "#3DC7F4"}`,
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
                backgroundColor: `${activeTab === "2" ? "#3DC7F4" : "transparent"}`,
                borderColor: "transparent",
                color: `${activeTab === "2" ? "white" : "#3DC7F4"}`,
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
                backgroundColor: `${activeTab === "3" ? "#3DC7F4" : "transparent"}`,
                borderColor: "transparent",
                color: `${activeTab === "3" ? "white" : "#3DC7F4"}`,
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
      <TabContent activeTab={activeTab} className="p-4 text-muted">
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
                  <th>Boat / Marina Location</th>

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
                          {" "}
                          <span style={{cursor:'pointer', color:"#3DC7F4"}} onClick={() => removeAsset(boat.id)} >- Remove</span>
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
          <div className="table-responsive">
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
                          <span style={{cursor:'pointer', color:"#3DC7F4"}} onClick={() => removeAsset(vehicle.id)}>- Remove</span>
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
                          <span style={{cursor:'pointer', color:"#3DC7F4"}} onClick={() => removeAsset(item.id)}>- Remove</span>
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
    </>
  );
};

export default ActiveAssetsTable;
