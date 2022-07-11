import React, { useEffect, useState, useMemo } from "react";
import PricingTables from "./PricingTables/pricingTables";
import AddNewProductPricing from "../../../Components/Common/Modals/PricingModals/addNewProduct";
import AddNewAirportTransfer from "../../../Components/Common/Modals/PricingModals/addNewAirportTransfer";
import Fishing from "../../../Components/Common/Modals/PricingModals/fishing";
import AddNewPrivateCharter from "../../../Components/Common/Modals/PricingModals/addNewPrivateCharter";
import AddNewPrivateTour from "../../../Components/Common/Modals/PricingModals/addNewPrivateTour";
import AddNewTransportation from "../../../Components/Common/Modals/PricingModals/addNewTransportation";
import {
  getPricesPricingAPI,
  getAddonsPricingAPI,
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
  console.log(tourData);
  //prices request
  const [pricesData, setPricesData] = useState([]);
  useEffect(() => {
    getPricesPricingAPI("28").then((resp) => {
      setPricesData(resp.data.data);
    });
  }, [id]);

  //
  const [addonsData, setAddonsData] = useState([]);
  useEffect(() => {
    getAddonsPricingAPI("30").then((resp) => {
      setAddonsData(resp.data.data);
    });
  }, [id]);

  //table actions
  const onDelete = (depData) => {
    Swal.fire({
      title: "Delete Department?",
      icon: "question",
      text: `Do you want delete ${depData.name}`,
      showCancelButton: true,
      confirmButtonText: "Yes",
      confirmButtonColor: "#F38430",
      cancelButtonText: "Cancel",
    }).then((resp) => {
      if (resp.isConfirmed) {
        // departmentDelete(depData.id)
        //   .then((resp) => {
        //     const departmentsRequest = () => dispatch(departmentsData());
        //     departmentsRequest();
        //     Swal.fire(
        //       "Deleted!",
        //       "The department has been deleted.",
        //       "success"
        //     );
        //   })
        //   .catch((error) => {
        //     console.log(error);
        //   });
      }
    });
  };

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
      accessor: "comm",
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
            <Link to={`/departments/${depData.id}`} className="text-success">
              <i className="mdi mdi-pencil font-size-18" id="edittooltip" />
              <UncontrolledTooltip placement="top" target="edittooltip">
                Edit
              </UncontrolledTooltip>
            </Link>
            <Link
              to="#"
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
            </Link>
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
              <Link to={`/departments/${depData.id}`} className="text-success">
                <i className="mdi mdi-pencil font-size-18" id="edittooltip" />
                <UncontrolledTooltip placement="top" target="edittooltip">
                  Edit
                </UncontrolledTooltip>
              </Link>
              <Link
                to="#"
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
            isAddOrder={true}
            // handleOrderClicks={handleOrderClicks}
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
        onClickNewProduct={onClickNewProduct}
        tourData={tourData}
      />
      <AddNewAirportTransfer
        addNewAirportTransfer={addNewAirportTransfer}
        setAddNewAirportTransfer={setAddNewAirportTransfer}
        tourData={tourData}
      />
      <Fishing
        addNewFishing={addNewFishing}
        setAddNewFishing={setAddNewFishing}
        tourData={tourData}
      />
      <AddNewPrivateCharter
        newPrivateCharter={newPrivateCharter}
        setNewPrivateCharter={setNewPrivateCharter}
        tourData={tourData}
      />
      <AddNewPrivateTour
        newPrivateTour={newPrivateTour}
        setNewPrivateTour={setNewPrivateTour}
        tourData={tourData}
      />
      <AddNewTransportation
        newTransportation={newTransportation}
        setNewTransportation={setNewTransportation}
        tourData={tourData}
      />
    </TabPane>
  );
};

export default Pricing;
