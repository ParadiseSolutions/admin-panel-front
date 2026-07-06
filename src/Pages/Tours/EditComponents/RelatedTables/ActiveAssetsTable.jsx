import React, { useEffect, useState } from "react";
import {
  Nav,
  NavItem,
  NavLink,
  TabContent,
  Table,
  TabPane,
  UncontrolledTooltip,
} from "reactstrap";
import classnames from "classnames";
import AssignRelatedAssetModal from "./AssignRelatedAssetModal";

const ActiveAssetsTable = ({
  relatedAssetsActiveData,
  editAsset,
  removeAsset,
  tourId,
}) => {
  const [activeTab, setactiveTab] = useState("1");
  const [boatData, setboatData] = useState([]);
  const [vehicleData, setvehicleData] = useState([]);
  const [othersData, setothersData] = useState([]);
  const [assignModalOpen, setAssignModalOpen] = useState(false);
  const [selectedAsset, setSelectedAsset] = useState(null);

  const openAssignModal = (asset) => {
    setSelectedAsset(asset);
    setAssignModalOpen(true);
  };

  const closeAssignModal = () => {
    setAssignModalOpen(false);
    setSelectedAsset(null);
  };

  const handleAssignConfirm = ({ apply_to, products }) => {
    if (selectedAsset) {
      editAsset(selectedAsset.id, { apply_to, products });
    }
    closeAssignModal();
  };

  const renderRelatedToCell = (asset) => {
    const products = asset.products || [];
    const tooltipId = `related-to-${asset.assignment_id ?? asset.id}`;

    if (!products.length) {
      return asset.apply_to_name;
    }

    return (
      <>
        <span
          id={tooltipId}
          style={{ cursor: "help" }}
        >
          {asset.apply_to_name}
        </span>
        <UncontrolledTooltip
          autohide
          placement="top"
          target={tooltipId}
          innerClassName="text-start"
          style={{ maxWidth: "460px", whiteSpace: "normal" }}
        >
          <div>
            {products.map((product) => (
              <div key={product.id}>{product.name}</div>
            ))}
          </div>
        </UncontrolledTooltip>
      </>
    );
  };

  const renderActions = (asset) => (
    <div className="d-flex gap-3">
      <div onClick={() => openAssignModal(asset)} className="text-success">
        <i
          className="mdi mdi-pencil font-size-18"
          id={`edit-asset-${asset.id}`}
          style={{ cursor: "pointer" }}
        />
        <UncontrolledTooltip placement="top" target={`edit-asset-${asset.id}`}>
          Edit
        </UncontrolledTooltip>
      </div>
      <div className="text-danger" onClick={() => removeAsset(asset.id)}>
        <i
          className="mdi mdi-delete font-size-18"
          id={`delete-asset-${asset.id}`}
          style={{ cursor: "pointer" }}
        />
        <UncontrolledTooltip
          placement="top"
          target={`delete-asset-${asset.id}`}
        >
          Delete
        </UncontrolledTooltip>
      </div>
    </div>
  );

  function toggle(tab) {
    if (activeTab !== tab) {
      setactiveTab(tab);
    }
  }

  useEffect(() => {
    if (relatedAssetsActiveData) {
      const boat = relatedAssetsActiveData.filter(
        (item) => item.asset_id === 1,
      );
      const vehicle = relatedAssetsActiveData.filter(
        (item) => item.assets.asset_type === "Vehicles",
      );
      const others = relatedAssetsActiveData.filter(
        (item) => item.assets.asset_type === "Others",
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
                  <th>Related To</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {boatData.map((boat, index) => (
                  <tr key={index}>
                    <td>{boat.name}</td>
                    <td>{boat.type_name}</td>
                    <td>{boat.length}</td>
                    <td>{boat.capacity}</td>
                    <td>{boat.make}</td>
                    <td>{boat.model}</td>
                    <td>{boat.location_name}</td>
                    <td>{boat.asset_marina_location}</td>
                    <td>{renderRelatedToCell(boat)}</td>
                    <td>{renderActions(boat)}</td>
                  </tr>
                ))}
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
                  <th>Related To</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {vehicleData.map((vehicle, index) => (
                  <tr key={index}>
                    <td>{vehicle.asset_name}</td>
                    <td>{vehicle.make}</td>
                    <td>{vehicle.model}</td>
                    <td>{vehicle.location_name}</td>
                    <td>{vehicle.quantity}</td>
                    <td>{vehicle.capacity}</td>
                    <td>{renderRelatedToCell(vehicle)}</td>
                    <td>{renderActions(vehicle)}</td>
                  </tr>
                ))}
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
                  <th>Related To</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {othersData.map((item, index) => (
                  <tr key={index}>
                    <td>{item.asset_name}</td>
                    <td>{item.quantity}</td>
                    <td>{item.location_name}</td>
                    <td>{item.cap_ea}</td>
                    <td>{item.max_cap}</td>
                    <td>{renderRelatedToCell(item)}</td>
                    <td>{renderActions(item)}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </TabPane>
      </TabContent>
      <AssignRelatedAssetModal
        isOpen={assignModalOpen}
        onClose={closeAssignModal}
        onConfirm={handleAssignConfirm}
        tourId={tourId}
        editData={selectedAsset}
      />
    </>
  );
};

export default ActiveAssetsTable;
