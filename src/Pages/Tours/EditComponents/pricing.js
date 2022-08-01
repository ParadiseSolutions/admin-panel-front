import React, { useEffect, useState, useMemo } from "react";
import PricingTables from "./PricingTables/pricingTables";
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
  deleteAddonAPI
} from "../../../Utils/API/Tours";

import { TabPane, Row, Button, UncontrolledTooltip } from "reactstrap";

import {
  Name,
  Code,
  Members,
} from "../EditComponents/PricingTables/DepartmentsCols";

import Swal from "sweetalert2";
import { Link } from "react-router-dom";

const Pricing = ({ history, id, tourData }) => {
  
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

  const refreshTable = () =>{
    getPricesPricingAPI(id).then((resp) => {
      setPricesData(resp.data.data);
    });
  }
  

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
            Swal.fire(
              "Deleted!",
              "The Price has been deleted.",
              "success"
            );
          })
          .catch((error) => {
            console.log(error);
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
            Swal.fire(
              "Deleted!",
              "The Addon has been deleted.",
              "success"
            );
          })
          .catch((error) => {
            console.log(error);
          });
      }
    });
  };

  const [editProductID, setEditProductID] = useState(null)

  const columnsProducts = useMemo(() => [
    {
      Header: <h2 className="text-paradise font-weight-bold">Products</h2>,
      accessor: "label",
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
      Header: "Reg. Price",
      accessor: "public",
      disableFilters: true,
      filterable: false,
      Cell: (cellProps) => {
        return <Members {...cellProps} />;
      },
    },
    {
      Header: "Our Price",
      accessor: "price",
      disableFilters: true,
      filterable: false,
      Cell: (cellProps) => {
        return <Members {...cellProps} />;
      },
    },
    {
      Header: "Save",
      accessor: "you_save",
      disableFilters: true,
      filterable: false,
      Cell: (cellProps) => {
        return <Members {...cellProps} />;
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
        return <Members {...cellProps} />;
      },
    },
    {
      Header: "Net Price",
      accessor: "net_price",
      disableFilters: true,
      filterable: false,
      Cell: (cellProps) => {
        return <Members {...cellProps} />;
      },
    },
    

    {
      Header: "Action",
      accessor: "action",
      disableFilters: true,
      Cell: (cellProps) => {
        
        return (
          <div className="d-flex gap-3">
            <div 
            className="text-success"
            onClick={() =>{
              const prodData = cellProps.row.original
              console.log("data del producto", prodData)
              
              switch (tourData.type_id) {
                case 2:
                  setAddNewProduct(!addNewProduct);
                  setEditProductID(prodData.id)
                  break;
                case 3:
                  setAddNewAirportTransfer(!addNewAirportTransfer);
                  setEditProductID(prodData.id)
                  break;
                case 4:
                  setNewTransportation(!newTransportation);
                  setEditProductID(prodData.id)
                  break;
                case 5:
                  setAddNewFishing(!addNewFishing);
                  setEditProductID(prodData.id)
                  break;
                case 6:
                  setNewPrivateCharter(!newPrivateCharter);
                  setEditProductID(prodData.id)
                  break;
          
                default:
                  setAddNewProduct(!addNewProduct);
                  setEditProductID(prodData.id)
                  break;
              }
            }}
            >
              <i className="mdi mdi-pencil font-size-18" id="edittooltip" />
              <UncontrolledTooltip placement="top" target="edittooltip">
                Edit
              </UncontrolledTooltip>
            </div>
            <div
            
              className="text-danger"
              onClick={() => {
                const depData = cellProps.row.original;
                // setconfirm_alert(true);
                onDelete(depData);

              }}
            >
              <i className="mdi mdi-delete font-size-18" id="deletetooltip" />
              <UncontrolledTooltip placement="top" target="deletetooltip">
                Delete
              </UncontrolledTooltip>
            </div>
          </div>
        );
      },
    },
  ]);
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
        Header: "Reg. Price",
        accessor: "reg_price",
        disableFilters: true,
        filterable: false,
        Cell: (cellProps) => {
          return <Members {...cellProps} />;
        },
      },
      {
        Header: "Our Price",
        accessor: "our_price",
        disableFilters: true,
        filterable: false,
        Cell: (cellProps) => {
          return <Members {...cellProps} />;
        },
      },
      {
        Header: "Save",
        accessor: "save",
        disableFilters: true,
        filterable: false,
        Cell: (cellProps) => {
          return <Members {...cellProps} />;
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
          return <Members {...cellProps} />;
        },
      },
      {
        Header: "Net Price",
        accessor: "net_price",
        disableFilters: true,
        filterable: false,
        Cell: (cellProps) => {
          return <Members {...cellProps} />;
        },
      },
      {
        Header: "Balance",
        accessor: "balance",
        disableFilters: true,
        filterable: false,
        Cell: (cellProps) => {
          return <Members {...cellProps} />;
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
              onClick={() =>{ 
                setNewAddon(true)
                setEditProductID(depData.id)
              }}
              className="text-success">
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
  const onClickNewProduct = () => {
    switch (tourData.type_id) {
      case 2:
        setAddNewProduct(!addNewProduct);
        break;
      case 3:
        setAddNewAirportTransfer(!addNewAirportTransfer);
        break;
      case 4:
        setNewTransportation(!newTransportation);
        break;
      case 5:
        setAddNewFishing(!addNewFishing);
        break;
      case 6:
        setNewPrivateCharter(!newPrivateCharter);
        break;

      default:
        setAddNewProduct(!addNewProduct);
        break;
    }
  };

  //add new addon
  const [newAddon, setNewAddon] = useState(false)
  
  const onClickNewAddon = () =>{
    
    setNewAddon(!newAddon)
  }

  return (
    <TabPane tabId="1" className="">
      <Row xl={12}>
        {pricesData ? (
          <PricingTables
            columns={columnsProducts}
            data={pricesData}
            isGlobalFilter={true}
            productsTable={true}
            onClickNewProduct={onClickNewProduct}
          />
        ) : null}
      </Row>
      <Row xl={12}>
        {addonsData ? (
          <PricingTables
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
            // onClick={() => history.goBack()}
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

export default Pricing;
