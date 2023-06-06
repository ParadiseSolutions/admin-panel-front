import React, { useEffect, useState, useMemo } from "react";
import PricingTables from "./PricingTables/pricingTables";
import AddonsTables from "./PricingTables/addonsTables";
import AddNewProductPricing from "../../../Components/Common/Modals/PricingModals/addNewProduct";
import AddNewAirportTransfer from "../../../Components/Common/Modals/PricingModals/addNewAirportTransfer";
import Fishing from "../../../Components/Common/Modals/PricingModals/fishing";
import AddNewPrivateCharter from "../../../Components/Common/Modals/PricingModals/addNewPrivateCharter";
import AddNewPrivateTour from "../../../Components/Common/Modals/PricingModals/addNewPrivateTour";
import AddNewTransportation from "../../../Components/Common/Modals/PricingModals/addNewTransportation";
import Addons from "../../../Components/Common/Modals/PricingModals/addons";
import {
  getPricesPricingAPI,
  getAddonsPricingAPI,
  deletePriceAPI,
  deleteAddonAPI,
} from "../../../Utils/API/Tours";

import { TabPane, Row, Button, UncontrolledTooltip } from "reactstrap";

import { Name, Code, Members, Price } from "./PricingTables/DepartmentsCols";

import Swal from "sweetalert2";
import { Link } from "react-router-dom";

const AddonsComponent = ({ history, id, tourData, toggle }) => {
  //prices request
  const [pricesData, setPricesData] = useState([]);
  useEffect(() => {
    getPricesPricingAPI(id).then((resp) => {
      setPricesData(resp.data.data);
    });
    getAddonsPricingAPI(id).then((resp) => {
      setAddonsData(resp.data.data);
    });
  }, [id]);

  const refreshTable = () => {
    getAddonsPricingAPI(id).then((resp) => {
      setAddonsData(resp.data.data);
    });
  };

  //
  const [addonsData, setAddonsData] = useState([]);
  useEffect(() => {
    getAddonsPricingAPI(id).then((resp) => {
      setAddonsData(resp.data.data);
    });
  }, [id]);

  //table actions
  const onDelete = (depData) => {
    Swal.fire({
      title: "Delete Price?",
      icon: "question",
      text: `Do you want delete ${depData.label}`,
      showCancelButton: true,
      confirmButtonText: "Yes",
      confirmButtonColor: "#F38430",
      cancelButtonText: "Cancel",
    }).then((resp) => {
      if (resp.isConfirmed) {
        deletePriceAPI(depData.id)
          .then((resp) => {
            getPricesPricingAPI(id).then((resp) => {
              setPricesData(resp.data.data);
            });
            Swal.fire("Deleted!", "The Price has been deleted.", "success");
          })
          .catch((error) => {
            // console.log(error);
          });
      }
    });
  };
  const onDeleteAddon = (depData) => {
    Swal.fire({
      title: "Delete Addon?",
      icon: "question",
      text: `Do you want delete ${depData.label}`,
      showCancelButton: true,
      confirmButtonText: "Yes",
      confirmButtonColor: "#F38430",
      cancelButtonText: "Cancel",
    }).then((resp) => {
      if (resp.isConfirmed) {
        deleteAddonAPI(depData.id)
          .then((resp) => {
            getAddonsPricingAPI(id).then((resp) => {
              setAddonsData(resp.data.data);
            });
            Swal.fire("Deleted!", "The Addon has been deleted.", "success");
          })
          .catch((error) => {
            // console.log(error);
          });
      }
    });
  };

  const [editProductID, setEditProductID] = useState(null);

 
  const columnsAddons = useMemo(
    () => [
      {
        Header: <h2 className="text-paradise font-weight-bold">Add-Ons</h2>,
        accessor: "name",
        disableFilters: true,
        filterable: false,
        Cell: (cellProps) => {
          return <Name {...cellProps} />;
        },
      },
      {
        Header: "SKU",
        accessor: "sku",
        disableFilters: true,
        filterable: false,
        Cell: (cellProps) => {
          return <Code {...cellProps} />;
        },
      },
      {
        Header: "Our Price",
        accessor: "price",
        disableFilters: true,
        filterable: false,
        Cell: (cellProps) => {
          return <Price {...cellProps} />;
        },
      },
      {
        Header: "Rate %",
        accessor: "rate",
        disableFilters: true,
        filterable: false,
        Cell: (cellProps) => {
          return <Members {...cellProps} />;
        },
      },
      {
        Header: "Comm.",
        accessor: "commission",
        disableFilters: true,
        filterable: false,
        Cell: (cellProps) => {
          return <Price {...cellProps} />;
        },
      },
      {
        Header: "Net Price",
        accessor: "net_price",
        disableFilters: true,
        filterable: false,
        Cell: (cellProps) => {
          return <Price {...cellProps} />;
        },
      },

      {
        Header: "Action",
        accessor: "action",
        disableFilters: true,
        Cell: (cellProps) => {
          const depData = cellProps.row.original;
          return (
            <div className="d-flex gap-3">
              <div
                onClick={() => {
                  setNewAddon(true);
                  setEditProductID(depData.id);
                }}
                className="text-success"
              >
                <i className="mdi mdi-pencil font-size-18" id="edittooltip" />
                <UncontrolledTooltip placement="top" target="edittooltip">
                  Edit
                </UncontrolledTooltip>
              </div>
              <Link
                to="#"
                className="text-danger"
                onClick={() => {
                  const depData = cellProps.row.original;
                  // setconfirm_alert(true);
                  onDeleteAddon(depData);
                }}
              >
                <i className="mdi mdi-delete font-size-18" id="deletetooltip" />
                <UncontrolledTooltip placement="top" target="deletetooltip">
                  Delete
                </UncontrolledTooltip>
              </Link>
            </div>
          );
        },
      },
    ],
    []
  );

  //add new product
  const [addNewProduct, setAddNewProduct] = useState(false);
  const [addNewAirportTransfer, setAddNewAirportTransfer] = useState(false);
  const [addNewFishing, setAddNewFishing] = useState(false);
  const [newPrivateCharter, setNewPrivateCharter] = useState(false);
  const [newPrivateTour, setNewPrivateTour] = useState(false);
  const [newTransportation, setNewTransportation] = useState(false);
  

  //add new addon
  const [newAddon, setNewAddon] = useState(false);

  const onClickNewAddon = () => {
    setNewAddon(!newAddon);
  };

  return (
    <TabPane tabId="1" className="">
      <Row xl={12}>
        {addonsData ? (
          <AddonsTables
            columns={columnsAddons}
            data={addonsData}
            isGlobalFilter={true}
            addonsTable={true}
            onClickNewAddon={onClickNewAddon}
          />
        ) : null}
      </Row>
      <Row xl={12}>
        <Row
          className="col-12 d-flex justify-content-end mt-5"
          style={{ paddingRight: "30px" }}
        >
          <Button
            color="paradise"
            outline
            className="waves-effect waves-light col-2 mx-4"
            type="button"
            onClick={() => toggle('5')}
          >
            <i className="uil-angle-double-left" />
            Back
          </Button>
          <Button
            style={{ backgroundColor: "#F6851F" }}
            type="submit"
            className="font-16 btn-block col-2"
            onClick={() => toggle('7')}
          >
            Continue
            <i className="uil-angle-double-right mx-1 " />
          </Button>
        </Row>
      </Row>
      <AddNewProductPricing
        addNewProduct={addNewProduct}
        setAddNewProduct={setAddNewProduct}
        editProductID={editProductID}
        tourData={tourData}
        refreshTable={refreshTable}
      />
      <AddNewAirportTransfer
        addNewAirportTransfer={addNewAirportTransfer}
        setAddNewAirportTransfer={setAddNewAirportTransfer}
        editProductID={editProductID}
        tourData={tourData}
        refreshTable={refreshTable}
      />
      <Fishing
        addNewFishing={addNewFishing}
        setAddNewFishing={setAddNewFishing}
        editProductID={editProductID}
        tourData={tourData}
        refreshTable={refreshTable}
      />
      <AddNewPrivateCharter
        newPrivateCharter={newPrivateCharter}
        setNewPrivateCharter={setNewPrivateCharter}
        editProductID={editProductID}
        tourData={tourData}
        refreshTable={refreshTable}
      />
      <AddNewPrivateTour
        newPrivateTour={newPrivateTour}
        setNewPrivateTour={setNewPrivateTour}
        editProductID={editProductID}
        tourData={tourData}
        refreshTable={refreshTable}
      />
      <AddNewTransportation
        newTransportation={newTransportation}
        setNewTransportation={setNewTransportation}
        editProductID={editProductID}
        tourData={tourData}
        refreshTable={refreshTable}
      />

      <Addons
        newAddon={newAddon}
        setNewAddon={setNewAddon}
        tourData={tourData}
        refreshTable={refreshTable}
        editProductID={editProductID}
      />
    </TabPane>
  );
};

export default AddonsComponent;
