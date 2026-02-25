import React, { useEffect, useState, useMemo } from "react";
import PricingTables from "./PricingTables/pricingTables";
import BulkEditModal from "../../../Components/Common/Modals/BulkEditModal/BulkEditModal";
import AddNewProductPricing from "../../../Components/Common/Modals/PricingModals/addNewProduct";
import AddNewAirportTransfer from "../../../Components/Common/Modals/PricingModals/addNewAirportTransfer";
import Fishing from "../../../Components/Common/Modals/PricingModals/fishing";
import AddNewPrivateCharter from "../../../Components/Common/Modals/PricingModals/addNewPrivateCharter";
import AddNewPrivateTour from "../../../Components/Common/Modals/PricingModals/addNewPrivateTour";
import AddNewTransportation from "../../../Components/Common/Modals/PricingModals/addNewTransportation";
import {
  getPricesPricingAPI,
  deletePriceAPI,
  triggerUpdate,
  putPriceRangesAPI,
  getPricingOptionsAPI,
  getPricingOptions2API,
  getPricingZoneOptionsAPI,
  getPricingZoneArrivalOptionsAPI,
} from "../../../Utils/API/Tours";
import {
  TabPane,
  Row,
  Col,
  Button,
  UncontrolledTooltip,
  Label,
  Input,
  Tooltip,
} from "reactstrap";
import { Name, Code, Price, Rate, Active } from "./PricingTables/PricingCols";
import Swal from "sweetalert2";
import AddPezGato from "../../../Components/Common/Modals/PricingModals/addPezGato";
import { getCurrency } from "../../../Utils/API/Operators";
import { getActivities } from "../../../Utils/API/Assets";

const Pricing = ({ history, id, tourData, toggle }) => {
  //prices request
  const [pricesData, setPricesData] = useState([]);
  const [priceRangeCheck, setPriceRangeCheck] = useState(false);

  //add new product
  const [addNewProduct, setAddNewProduct] = useState(false);
  const [addNewAirportTransfer, setAddNewAirportTransfer] = useState(false);
  const [addNewFishing, setAddNewFishing] = useState(false);
  const [addNewPrivateCharter, setAddNewPrivateCharter] = useState(false);
  const [addNewPrivateTour, setAddNewPrivateTour] = useState(false);
  const [addNewTransportation, setAddNewTransportation] = useState(false);

  // data request
  const [priceTypeData, setPriceTypeData] = useState([]);
  const [priceOptions, setPriceOptions] = useState([]);
  const [priceCollect, setPriceCollect] = useState([]);
  const [priceSeason, setPriceSeason] = useState([]);
  const [priceCharterType, setPriceCharterType] = useState([]);
  const [priceDuration, setPriceDuration] = useState([]);
  const [priceLocation, setPriceLocation] = useState([]);
  const [pricingOption2Selected, setPricingOption2Selected] = useState([]);
  const [currency, setCurrency] = useState([]);
  const [activityData, setActivityData] = useState([]);
  const [priceTransferType, setPriceTransferType] = useState([]);
  const [priceDirection, setPriceDirection] = useState([]);
  const [priceVehicle, setPriceVehicle] = useState([]);
  const [priceZone, setPriceZone] = useState([]);
  const [arrivalZone, setArrivalZone] = useState([]);
    // const [priceVehicle, setVehicleZone] = useState([]);

  useEffect(() => {
    const type = tourData?.type_id;
    const provider = tourData?.provider_id;
    if (!type) return;

    let mounted = true;
    const requests = [];
    const setters = [];

    const add = (promise, setter) => {
      requests.push(promise);
      setters.push(setter);
    };

    if (type === 6 && provider != 147) {
      add(getPricingOptionsAPI(38), setPriceTypeData);
      add(getPricingOptionsAPI(39), setPriceOptions);
      add(getPricingOptionsAPI(41), setPriceCollect);
      add(getPricingOptionsAPI(44), setPriceSeason);
      add(getPricingOptionsAPI(48), setPriceCharterType);
      add(getPricingOptionsAPI(40), setPriceDuration);
      add(getPricingOptionsAPI(42), setPriceLocation);
      add(getPricingOptions2API(68), setPricingOption2Selected);
      add(getCurrency(), setCurrency);
    } else { 
      switch (type) {
        case 5:
          add(getPricingOptionsAPI(33), setPriceTypeData);
          add(getPricingOptionsAPI(34), setPriceOptions);
          add(getPricingOptionsAPI(36), setPriceCollect);
          add(getPricingOptionsAPI(32), setPriceSeason);
          add(getPricingOptionsAPI(47), setPriceCharterType);
          add(getPricingOptionsAPI(35), setPriceDuration);
          add(getPricingOptionsAPI(37), setPriceLocation);
          add(getCurrency(), setCurrency);
          add(
            getActivities({ search: "", tipo: "boats", list: "admin_cargarActivityCombo" }),
            setActivityData,
          );
          break;
        case 2:
          add(getPricingOptionsAPI(6), setPriceTypeData);
          add(getPricingOptionsAPI(7), setPriceOptions);
          add(getPricingOptionsAPI(9), setPriceCollect);
          add(getPricingOptionsAPI(29), setPriceSeason);
          add(getPricingOptions2API(64), setPricingOption2Selected);
          add(getCurrency(), setCurrency);
          break;
        case 1:
          add(getPricingOptionsAPI(1), setPriceTypeData);
          add(getPricingOptionsAPI(2), setPriceOptions);
          add(getPricingOptionsAPI(4), setPriceCollect);
          add(getPricingOptionsAPI(28), setPriceSeason);
          add(getPricingOptions2API(63), setPricingOption2Selected);
          add(getCurrency(), setCurrency);
          break;
        case 3:
          add(getPricingOptionsAPI(10), setPriceTypeData);
          add(getPricingOptionsAPI(11), setPriceOptions);
          add(getPricingOptionsAPI(14), setPriceCollect);
          add(getPricingOptionsAPI(30), setPriceSeason);
          add(getPricingOptionsAPI(12), setPriceTransferType);
          add(getPricingOptionsAPI(13), setPriceDirection);
          add(getPricingOptionsAPI(17), setPriceVehicle);
          add(getPricingZoneOptionsAPI(50, provider), setPriceZone);
          add(getCurrency(), setCurrency);
          break;
        case 4:
          add(getPricingOptionsAPI(20), setPriceTypeData);
          add(getPricingOptionsAPI(21), setPriceOptions);
          add(getPricingOptionsAPI(22), setPriceCollect);
          add(getPricingOptionsAPI(31), setPriceSeason);
          add(getPricingOptionsAPI(46), setPriceTransferType);
          add(getPricingOptionsAPI(49), setPriceDirection);
          add(getPricingOptionsAPI(24), setPriceVehicle);
          add(getPricingZoneOptionsAPI(51, provider), setPriceZone);
          add(getPricingZoneArrivalOptionsAPI(69, provider), setArrivalZone);
          add(getCurrency(), setCurrency);
          break;
        default:
          break;
      }
    }

    if (requests.length === 0) return () => (mounted = false);

    Promise.all(requests.map((p) => p.catch((e) => e))).then((responses) => {
      if (!mounted) return;
      let hasError = false;
      responses.forEach((resp, idx) => {
        if (!mounted) return;
        const setter = setters[idx];
        if (!resp || resp instanceof Error) {
          hasError = true;
          return;
        }
        const payload = resp.data?.data ?? resp.data?.results;
        if (typeof setter === "function") setter(payload);
      });
      if (hasError) {
        Swal.fire({
          title: 'Error',
          text: 'Something happened with the connection. Refresh the page and try again.',
          icon: 'error',
          confirmButtonText: 'OK'
        });
      }
    });

    return () => {
      mounted = false;
    };
  }, [tourData?.type_id, tourData?.provider_id]);

  useEffect(() => {
    getPricesPricingAPI(id).then((resp) => {
      setPricesData(resp.data.data);
    });
  }, [id]);

  const refreshTable = () => {
    getPricesPricingAPI(id).then((resp) => {
      setPricesData(resp.data.data);
    });
  };

  useEffect(() => {
    if (tourData !== undefined) {
      tourData?.range_price === 0
        ? setPriceRangeCheck(false)
        : setPriceRangeCheck(true);
    }
  }, [tourData]);

  // console.log(tourData);
  const postPriceRange = () => {
    let data = { active: priceRangeCheck === false ? 1 : 0 };
    putPriceRangesAPI(id, data).then((resp) => {});
  };

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
              // triggerUpdate();
            });
            Swal.fire("Deleted!", "The Price has been deleted.", "success");
          })
          .catch((error) => {
            if (error.response.data.data === null) {
              Swal.fire(
                "Error!",
                // {error.response.},
                String(error.response.data.message),
              );
            } else {
              let errorMessages = [];
              Object.entries(error.response.data.data).map((item) => {
                errorMessages.push(item[1]);
                return true;
              });

              Swal.fire(
                "Error!",
                // {error.response.},
                String(errorMessages[0]),
              );
            }
          });
      }
    });
  };

  const [editProductID, setEditProductID] = useState(null);
  const [copyProduct, setCopyProduct] = useState(false);
  const [ttop4, setttop4] = useState(false);
  const columnsProducts = useMemo(() => [
    {
      Header: "Prod ID",
      accessor: "id",
      disableFilters: false,
      filterable: true,
      Cell: (cellProps) => {
        return <Name {...cellProps} />;
      },
    },
    {
      Header: "Product Name",
      accessor: "label",
      disableFilters: false,
      filterable: true,
      Cell: (cellProps) => {
        return <Name {...cellProps} />;
      },
    },
    {
      Header: "SKU",
      accessor: "sku",
      disableFilters: false,
      filterable: true,
      Cell: (cellProps) => {
        return <Code {...cellProps} />;
      },
    },
    {
      Header: "Deposit",
      accessor: "deposit",
      disableFilters: false,
      filterable: true,
      Cell: (cellProps) => {
        return <Price {...cellProps} />;
      },
    },
    {
      Header: "Our Price",
      accessor: "price",
      disableFilters: false,
      filterable: true,
      Cell: (cellProps) => {
        return <Price {...cellProps} />;
      },
    },
    {
      Header: "Rate %",
      accessor: "rate",
      disableFilters: true,
      filterable: true,
      Cell: (cellProps) => {
        return <Rate {...cellProps} />;
      },
    },
    {
      Header: "Comm.",
      accessor: "commission",
      disableFilters: false,
      filterable: true,
      Cell: (cellProps) => {
        return <Price {...cellProps} />;
      },
    },
    {
      Header: "Net Price",
      accessor: "net_rate",
      disableFilters: false,
      filterable: true,
      Cell: (cellProps) => {
        return <Price {...cellProps} />;
      },
    },
    {
      Header: "Invoice Amt",
      accessor: "net_price",
      disableFilters: false,
      filterable: true,
      Cell: (cellProps) => {
        return <Price {...cellProps} />;
      },
    },
    {
      Header: "Active",
      accessor: "active",
      disableFilters: false,
      filterable: true,
      Cell: (cellProps) => {
        return <Active {...cellProps} />;
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
                setEditProductID(null);

                switch (tourData?.type_id) {
                  case 2:
                    // setAddNewProduct(!addNewProduct);
                    setAddNewPrivateTour(!addNewPrivateTour);
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
              <i
                className="mdi mdi-pencil font-size-18"
                id="edit_tooltip"
                style={{ cursor: "pointer" }}
              />
              <UncontrolledTooltip placement="top" target="edit_tooltip">
                Edit
              </UncontrolledTooltip>
            </div>
            <div
              className="text-warning"
              onClick={() => {
                const prodData = cellProps.row.original;
                // console.log("data del producto", prodData);
                setEditProductID(null);
                setCopyProduct(true);

                switch (tourData?.type_id) {
                  case 2:
                    // setAddNewProduct(!addNewProduct);
                    setAddNewPrivateTour(!addNewPrivateTour);
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
              <i
                className="mdi mdi-content-copy font-size-18"
                id="copytooltip"
                style={{ cursor: "pointer" }}
              />
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
              <i
                className="mdi mdi-delete font-size-18"
                id="deletetooltip"
                style={{ cursor: "pointer" }}
              />
              <UncontrolledTooltip placement="top" target="deletetooltip">
                Delete
              </UncontrolledTooltip>
            </div>
          </div>
        );
      },
    },
  ]);

  // bulk edit
  const [bulkEditModal, setBulkEditModal] = useState(false);

  //price range

  const onClickNewProduct = () => {
    setEditProductID(null);
    setCopyProduct(false);
    switch (tourData?.type_id) {
      case 2:
        // setNewProduct(!addNewProduct);
        setAddNewPrivateTour(!addNewPrivateTour);
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

  return (
    <TabPane tabId="1" className="">
      <Row>
        <Col className="col-4">
          <h1 className="text-paradise">Products</h1>
        </Col>
        <Col>
          <div className="text-sm-end">
            <div className="waves-effect waves-light mx-2">
              <div className="d-flex">
                <div className="d-flex justify-content-between align-items-center">
                  <Label
                    className="form-label mt-2"
                    style={{
                      // fontWeight: "bold",
                      color: "#495057",
                      marginBottom: "0px",
                    }}
                  >
                    Price Ranges
                  </Label>
                  <div>
                    <i
                      className="uil-question-circle font-size-15 p-2"
                      id="priceRanges"
                    />
                    <Tooltip
                      placement="right"
                      isOpen={ttop4}
                      target="priceRanges"
                      toggle={() => {
                        setttop4(!ttop4);
                      }}
                    >
                      Toggle to specify price ranges based on the number of
                      <br />
                      people. Applies only to "Fixed" price type.
                      <br />
                      Example:
                      <br />
                      <br />
                      1-10 People is $100.00
                      <br />
                      11-20 People is $200.00
                      <br />
                      21-30 People is $300.00
                    </Tooltip>
                  </div>
                </div>
                <div className="form-check form-switch form-switch-md mx-4 mt-2 ">
                  <Input
                    name="seasonality"
                    placeholder=""
                    type="checkbox"
                    checked={priceRangeCheck}
                    className="form-check-input"
                    onChange={() => {
                      setPriceRangeCheck(!priceRangeCheck);
                      postPriceRange();
                    }}
                    // onBlur={validationType.handleBlur}
                    value={priceRangeCheck}
                  />
                </div>
              </div>
            </div>
            <Button
              type="button"
              className="waves-effect waves-light mb-3 btn btn-orange mx-2"
              onClick={() => setBulkEditModal(true)}
            >
              <i className="mdi mdi-plus me-1" />
              Bulk Edit
            </Button>
            <Button
              type="button"
              className="waves-effect waves-light mb-3 btn btn-orange"
              onClick={onClickNewProduct}
            >
              <i className="mdi mdi-plus me-1" />
              Add New Products
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
        <Col className="col-12 d-flex justify-content-end mt-5">
          <Button
            color="paradise"
            outline
            className="waves-effect waves-light me-3"
            type="button"
            onClick={() => toggle("5")}
          >
            <i className="uil-angle-double-left" />
            Previous
          </Button>
          <Button
            type="submit"
            className="font-16 btn-block btn-orange"
            onClick={() => toggle("7")}
          >
            Continue
            <i className="uil-angle-double-right mx-1 " />
          </Button>
        </Col>
      </Row>
      {tourData?.type_id === 1 ? (
        <AddNewProductPricing
          addNewProduct={addNewProduct}
          setAddNewProduct={setAddNewProduct}
          editProductID={editProductID}
          tourData={tourData}
          refreshTable={refreshTable}
          copyProduct={copyProduct}
          setCopyProduct={setCopyProduct}
          priceRangeCheck={priceRangeCheck}
          setPriceRangeCheck={setPriceRangeCheck}
          priceTypeData={priceTypeData}
          priceOptions={priceOptions}
          priceCollect={priceCollect}
          priceSeason={priceSeason}
          priceCharterType={priceCharterType}
          priceDuration={priceDuration}
          priceLocation={priceLocation}
          pricingOption2Selected={pricingOption2Selected}
          currency={currency}
        />
      ) : null}
      {tourData?.type_id === 2 ? (
        <AddNewPrivateTour
          addNewPrivateTour={addNewPrivateTour}
          setAddNewPrivateTour={setAddNewPrivateTour}
          editProductID={editProductID}
          tourData={tourData}
          refreshTable={refreshTable}
          copyProduct={copyProduct}
          setCopyProduct={setCopyProduct}
          priceRangeCheck={priceRangeCheck}
          setPriceRangeCheck={setPriceRangeCheck}
          priceTypeData={priceTypeData}
          priceOptions={priceOptions}
          priceCollect={priceCollect}
          priceSeason={priceSeason}
          priceCharterType={priceCharterType}
          priceDuration={priceDuration}
          priceLocation={priceLocation}
          pricingOption2Selected={pricingOption2Selected}
          currency={currency}
        />
      ) : null}
      {tourData?.type_id === 3 ? (
        <AddNewAirportTransfer
          addNewAirportTransfer={addNewAirportTransfer}
          setAddNewAirportTransfer={setAddNewAirportTransfer}
          editProductID={editProductID}
          tourData={tourData}
          refreshTable={refreshTable}
          copyProduct={copyProduct}
          setCopyProduct={setCopyProduct}
          priceRangeCheck={priceRangeCheck}
          setPriceRangeCheck={setPriceRangeCheck}
          priceTypeData={priceTypeData}
          priceOptions={priceOptions}
          priceCollect={priceCollect}
          priceSeason={priceSeason}
          priceCharterType={priceCharterType}
          priceDuration={priceDuration}
          priceLocation={priceLocation}
          pricingOption2Selected={pricingOption2Selected}
          currency={currency}
          priceTransferType={priceTransferType}
          priceDirection={priceDirection}
          priceVehicle={priceVehicle}
          priceZone={priceZone}
        />
      ) : null}
      {tourData?.type_id === 4 ? (
        <AddNewTransportation
          addNewTransportation={addNewTransportation}
          setAddNewTransportation={setAddNewTransportation}
          editProductID={editProductID}
          tourData={tourData}
          refreshTable={refreshTable}
          copyProduct={copyProduct}
          setCopyProduct={setCopyProduct}
          priceRangeCheck={priceRangeCheck}
          setPriceRangeCheck={setPriceRangeCheck}
           priceTypeData={priceTypeData}
          priceOptions={priceOptions}
          priceCollect={priceCollect}
          priceSeason={priceSeason}
          currency={currency}
          priceTransferType={priceTransferType}
          priceVehicle={priceVehicle}
          priceZone={priceZone}
          arrivalZone={arrivalZone}
        />
      ) : null}
      {tourData?.type_id === 5 ? (
        <Fishing
          addNewFishing={addNewFishing}
          setAddNewFishing={setAddNewFishing}
          editProductID={editProductID}
          tourData={tourData}
          refreshTable={refreshTable}
          copyProduct={copyProduct}
          setCopyProduct={setCopyProduct}
          priceRangeCheck={priceRangeCheck}
          setPriceRangeCheck={setPriceRangeCheck}
          priceTypeData={priceTypeData}
          priceOptions={priceOptions}
          priceCollect={priceCollect}
          priceSeason={priceSeason}
          priceCharterType={priceCharterType}
          priceDuration={priceDuration}
          priceLocation={priceLocation}
          pricingOption2Selected={pricingOption2Selected}
          currency={currency}
          activityData={activityData}
        />
      ) : null}
      {tourData?.type_id === 6 && tourData?.provider_id != 147 ? (
        <AddNewPrivateCharter
          addNewPrivateCharter={addNewPrivateCharter}
          setAddNewPrivateCharter={setAddNewPrivateCharter}
          editProductID={editProductID}
          tourData={tourData}
          refreshTable={refreshTable}
          copyProduct={copyProduct}
          setCopyProduct={setCopyProduct}
          priceRangeCheck={priceRangeCheck}
          setPriceRangeCheck={setPriceRangeCheck}
          priceTypeData={priceTypeData}
          priceOptions={priceOptions}
          priceCollect={priceCollect}
          priceSeason={priceSeason}
          priceCharterType={priceCharterType}
          priceDuration={priceDuration}
          priceLocation={priceLocation}
          pricingOption2Selected={pricingOption2Selected}
          currency={currency}
        />
      ) : null}
      {tourData?.type_id === 6 && tourData?.provider_id === 147 ? (
        <AddPezGato
          addNewPrivateCharter={addNewPrivateCharter}
          setAddNewPrivateCharter={setAddNewPrivateCharter}
          editProductID={editProductID}
          tourData={tourData}
          refreshTable={refreshTable}
          copyProduct={copyProduct}
          setCopyProduct={setCopyProduct}
          priceRangeCheck={priceRangeCheck}
          setPriceRangeCheck={setPriceRangeCheck}
          priceTypeData={priceTypeData}
          priceOptions={priceOptions}
          priceCollect={priceCollect}
          priceSeason={priceSeason}
          priceCharterType={priceCharterType}
          priceDuration={priceDuration}
          priceLocation={priceLocation}
          pricingOption2Selected={pricingOption2Selected}
          currency={currency}
        />
      ) : null}

      <BulkEditModal
        bulkEditModal={bulkEditModal}
        setBulkEditModal={setBulkEditModal}
        pricesData={pricesData}
        refreshTable={refreshTable}
        tourData={tourData}
      />
    </TabPane>
  );
};

export default Pricing;
