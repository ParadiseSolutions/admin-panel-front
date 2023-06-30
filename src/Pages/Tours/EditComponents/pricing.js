import React, { useEffect, useState, useMemo } from "react";
import PricingTables from "./PricingTables/pricingTables";
import AddNewProductPricing from "../../../Components/Common/Modals/PricingModals/addNewProduct";
import AddNewAirportTransfer from "../../../Components/Common/Modals/PricingModals/addNewAirportTransfer";
import Fishing from "../../../Components/Common/Modals/PricingModals/fishing";
import AddNewPrivateCharter from "../../../Components/Common/Modals/PricingModals/addNewPrivateCharter";
import AddNewPrivateTour from "../../../Components/Common/Modals/PricingModals/addNewPrivateTour";
import AddNewTransportation from "../../../Components/Common/Modals/PricingModals/addNewTransportation";
import Addons from "../../../Components/Common/Modals/PricingModals/addons";
//import EditProductPricing from "../../../Components/Common/Modals/PricingModals/EditModals/editNewProduct";
//import EditAirportTransfer from "../../../Components/Common/Modals/PricingModals/EditModals/editNewAirportTransfer";
//import EditFishing from "../../../Components/Common/Modals/PricingModals/EditModals/editfishing";
//import EditPrivateCharter from "../../../Components/Common/Modals/PricingModals/EditModals/editNewPrivateCharter";
//import EditPrivateTour from "../../../Components/Common/Modals/PricingModals/EditModals/editNewPrivateTour";
//import EditTransportation from "../../../Components/Common/Modals/PricingModals/EditModals/editNewTransportation";
//import EditAddons from "../../../Components/Common/Modals/PricingModals/EditModals/editAddons";
import {
  getPricesPricingAPI,
  getAddonsPricingAPI,
  deletePriceAPI,
  deleteAddonAPI,
} from "../../../Utils/API/Tours";

import { TabPane, Row, Col, Button, UncontrolledTooltip } from "reactstrap";

import {
  Name,
  Code,
  Members,
  Price,
} from "../EditComponents/PricingTables/DepartmentsCols";

import Swal from "sweetalert2";
import { Link } from "react-router-dom";

const Pricing = ({ history, id, tourData, toggle }) => {
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
    getPricesPricingAPI(id).then((resp) => {
      setPricesData(resp.data.data);
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
            let errorMessages = [];
            Object.entries(error.response.data.data).map((item) => {
              errorMessages.push(item[1]);
            });
  
            Swal.fire(
              "Error!",
              // {error.response.},
              String(errorMessages[0])
            );
          });
      }
    });
  };

  const [editProductID, setEditProductID] = useState(null);
  const [copyProduct, setCopyProduct] = useState(false)

  const columnsProducts = useMemo(() => [
    {
      Header: 'Product Name',
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
      Header: "Our Price",
      accessor: "price",
      disableFilters: true,
      filterable: false,
      Cell: (cellProps) => {
        return <Price {...cellProps} />;
      },
    },
    {
      Header: "Deposit",
      accessor: "deposit",
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
        return (
          <div className="d-flex gap-3">
            <div
              className="text-success"
              onClick={() => {
                const prodData = cellProps.row.original;
                // console.log("data del producto", prodData);
                setCopyProduct(false);
                setEditProductID(null)

                switch (tourData.type_id) {
                  case 2:
                    // setAddNewProduct(!addNewProduct);
                    setAddNewPrivateTour(!addNewPrivateTour)
                    setEditProductID(prodData.id);
                    break;
                  case 3:
                    setAddNewAirportTransfer(!addNewAirportTransfer);
                    setEditProductID(prodData.id);
                    break;
                  case 4:
                    setAddNewTransportation(!addNewTransportation);
                    setEditProductID(prodData.id);
                    break;
                  case 5:
                    setAddNewFishing(!addNewFishing);
                    setEditProductID(prodData.id);
                    break;
                  case 6:
                    setAddNewPrivateCharter(!addNewPrivateCharter);
                    setEditProductID(prodData.id);
                    break;

                  default:
                    setAddNewProduct(!addNewProduct);
                    setEditProductID(prodData.id);
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
              className="text-warning"
              onClick={() => {
                const prodData = cellProps.row.original;
                // console.log("data del producto", prodData);
                setEditProductID(null)
                setCopyProduct(true);

                switch (tourData.type_id) {
                  case 2:
                    // setAddNewProduct(!addNewProduct);
                    setAddNewPrivateTour(!addNewPrivateTour)
                    setEditProductID(prodData.id);
                    break;
                  case 3:
                    setAddNewAirportTransfer(!addNewAirportTransfer);
                    setEditProductID(prodData.id);
                    break;
                  case 4:
                    setAddNewTransportation(!newTransportation);
                    setEditProductID(prodData.id);
                    break;
                  case 5:
                    setAddNewFishing(!addNewFishing);
                    setEditProductID(prodData.id);
                    break;
                  case 6:
                    setAddNewPrivateCharter(!addNewPrivateCharter);
                    setEditProductID(prodData.id);
                    break;

                  default:
                    setAddNewProduct(!addNewProduct);
                    setEditProductID(prodData.id);
                    break;
                }
              }}
            >
              <i className="mdi mdi-content-copy font-size-18" id="copytooltip" />
              <UncontrolledTooltip placement="top" target="copytooltip">
                Copy
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
  //add new product
  const [addNewProduct, setAddNewProduct] = useState(false);
  const [addNewAirportTransfer, setAddNewAirportTransfer] = useState(false);
  const [addNewFishing, setAddNewFishing] = useState(false);
  
  const [addNewPrivateCharter, setAddNewPrivateCharter] = useState(false);
  const [addNewPrivateTour, setAddNewPrivateTour] = useState(false);
  const [addNewTransportation, setAddNewTransportation] = useState(false);

  const [newProduct, setNewProduct] = useState(false);
  const [newAirportTransfer, setNewAirportTransfer] = useState(false);
  const [newFishing, setNewFishing] = useState(false);
  const [newPrivateCharter, setNewPrivateCharter] = useState(false);
  const [newPrivateTour, setNewPrivateTour] = useState(false);
  const [newTransportation, setNewTransportation] = useState(false);
  const onClickNewProduct = () => {
    setEditProductID(null)
    setCopyProduct(false)
    switch (tourData.type_id) {
      case 2:
        // setNewProduct(!addNewProduct);
        setAddNewPrivateTour(!addNewPrivateTour)
        break;
      case 3:
        setAddNewAirportTransfer(!addNewAirportTransfer);
        break;
      case 4:
        setAddNewTransportation(!addNewTransportation);
        break;
      case 5:
        setAddNewFishing(!addNewFishing);
        break;
      case 6:
        setAddNewPrivateCharter(!addNewPrivateCharter);
        break;

      default:
        setAddNewProduct(!addNewProduct);
        break;
    }
  };

  //add new addon
  const [newAddon, setNewAddon] = useState(false);

  const onClickNewAddon = () => {
    setNewAddon(!newAddon);
  };

  return (
    <TabPane tabId="1" className="">
      <Row>
        <Col className="col-4">
        
        <h1 className="text-paradise">Products</h1>
        </Col>
        <Col>
        
        <div className="text-sm-end">
            <Button
              type="button"
              
              className="waves-effect waves-light mb-3 btn btn-orange"
              onClick={onClickNewProduct}
            >
              <i className="mdi mdi-plus me-1" />
              New Products
            </Button>
          </div>
        </Col>
      </Row>
      <Row>
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

      <Row>
        <Col
          className="col-12 d-flex justify-content-end mt-5"          
        >
          <Button
            color="paradise"
            outline
            className="waves-effect waves-light me-3"
            type="button"
             onClick={() => toggle('4')}
          >
            <i className="uil-angle-double-left" />
            Back
          </Button>
          <Button
            
            type="submit"
            className="font-16 btn-block btn-orange"
             onClick={() => toggle('6')}
          >
            Continue
            <i className="uil-angle-double-right mx-1 " />
          </Button>
        </Col>
      </Row>
      <AddNewProductPricing
        addNewProduct={addNewProduct}
        setAddNewProduct={setAddNewProduct}
        editProductID={editProductID}
        tourData={tourData}
        refreshTable={refreshTable}
        copyProduct={copyProduct}
      />
      <AddNewAirportTransfer
        addNewAirportTransfer={addNewAirportTransfer}
        setAddNewAirportTransfer={setAddNewAirportTransfer}
        editProductID={editProductID}
        tourData={tourData}
        refreshTable={refreshTable}
        copyProduct={copyProduct}
      />
      <Fishing
        addNewFishing={addNewFishing}
        setAddNewFishing={setAddNewFishing}
        editProductID={editProductID}
        tourData={tourData}
        refreshTable={refreshTable}
        copyProduct={copyProduct}
      />
      <AddNewPrivateCharter
        addNewPrivateCharter={addNewPrivateCharter}
        setAddNewPrivateCharter={setAddNewPrivateCharter}
        editProductID={editProductID}
        tourData={tourData}
        refreshTable={refreshTable}
        copyProduct={copyProduct}
      />
      <AddNewPrivateTour
        addNewPrivateTour={addNewPrivateTour}
        setAddNewPrivateTour={setAddNewPrivateTour}
        editProductID={editProductID}
        tourData={tourData}
        refreshTable={refreshTable}
        copyProduct={copyProduct}
      />
      <AddNewTransportation
        addNewTransportation={addNewTransportation}
        setAddNewTransportation={setAddNewTransportation}
        editProductID={editProductID}
        tourData={tourData}
        refreshTable={refreshTable}
        copyProduct={copyProduct}
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
