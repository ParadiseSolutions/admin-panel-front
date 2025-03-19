import React, { useEffect, useState, useMemo } from "react";
import {
  getAddonsPricingAPI,
  getRelatedTourAPI,
  priorityRelatedAPI,
  deleteRelatedAPI,
  getActiveRelatedAsset,
  getOtherRelatedAsset,
  assingAssetAPI,
  removeAssetAPI,
} from "../../../Utils/API/Tours";
import {
  TabPane,
  Row,
  Button,
  UncontrolledTooltip,
  Col,
  Tooltip,
} from "reactstrap";
import {
  Name,
  Price,
  ActiveAddon,
  ActiveRelated,
} from "./PricingTables/PricingCols";
import Swal from "sweetalert2";
import RelatedTables from "./PricingTables/relatedTable";
import RelatedModal from "../../../Components/Common/Modals/PricingModals/relatedModal";
import { TiArrowSortedUp, TiArrowSortedDown } from "react-icons/ti";
import { FaPaperclip } from "react-icons/fa";
import { FaLink } from "react-icons/fa6";
import RelatedActionsModal from "../../../Components/Common/Modals/RelatedActionsModal/relatedModal";
import ActiveAssetsTable from "./RelatedTables/ActiveAssetsTable";
import ActiveAssetsOthersTable from "./RelatedTables/ActiveAssetsOthersTable";

const RelatedComponent = ({ id, tourData, toggle }) => {
  const [relatedData, setRelatedData] = useState([]);
  const [relatedFilter, setRelatedFilter] = useState(false);
  const [relatedEdit, setRelatedEdit] = useState(false);
  const [editRelatedData, setEditRelatedData] = useState(null);
  const [relatedAssetsActiveData, setRelatedAssetsActiveData] = useState([]);
  const [relatedAssetsOtherData, setRelatedAssetsOtherData] = useState([]);
  const columnsAddons = useMemo(
    () => [
      {
        Header: "Priority",
        accessor: "",
        Cell: (cellProps) => {
          const rowIndex = cellProps.row.index;
          const totalRows = cellProps.rows.length;

          // Función que decide el color del ícono
          const getArrowColor = (isUpArrow) => {
            if (isUpArrow && rowIndex === 0) {
              return "text-paradiseGray";
            }
            if (!isUpArrow && rowIndex === totalRows - 1) {
              return "text-paradiseGray";
            }
            return "text-paradise";
          };

          return (
            <Row>
              <TiArrowSortedUp
                size={35}
                style={{ padding: "0" }}
                className={`${getArrowColor(true)} cursor-pointer`}
                onClick={
                  rowIndex !== 0 ? () => indexSubmit(cellProps, "UP") : null
                }
              />
              <TiArrowSortedDown
                size={35}
                style={{ padding: "0" }}
                className={`${getArrowColor(false)} cursor-pointer`}
                onClick={
                  rowIndex !== totalRows - 1
                    ? () => indexSubmit(cellProps, "DOWN")
                    : null
                }
              />
            </Row>
          );
        },
      },
      {
        Header: "Tour ID",
        accessor: "related_tour_id",
        disableFilters: false,
        filterable: true,
        Cell: (cellProps) => {
          // console.log(cellProps.row)
          return (
            <>
              <a
                href={`${cellProps.row.original.admin_panel_link}`}
                target="_blank"
                className="text-paradise"
                rel="noreferrer"
              >
                {cellProps.row.original.related_tour_id}
              </a>
            </>
          );
        },
      },

      {
        Header: "Tour Name",
        accessor: "name",
        disableFilters: true,
        filterable: false,
        Cell: (cellProps) => {
          return (
            <div>
              <a
                href={`${cellProps.row.original.tour_link}`}
                target="_blank"
                className="text-paradise"
                rel="noreferrer"
              >
                {cellProps.row.original.name}
              </a>
              <>
                <FaLink
                  className="mx-2 cursor-pointer text-paradise"
                  id="copyTT"
                  size={20}
                  onClick={() => {
                    navigator.clipboard.writeText(
                      cellProps.row.original.tour_link
                    );
                  }}
                />
                <UncontrolledTooltip placement="top" target="copyTT">
                  Copy
                </UncontrolledTooltip>
              </>
            </div>
          );
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
        disableFilters: false,
        filterable: true,
        Cell: (cellProps) => {
          return <Name {...cellProps} />;
        },
      },
      {
        Header: "Operator",
        accessor: "operator_name",
        disableFilters: false,
        filterable: true,
        Cell: (cellProps) => {
          return <Name {...cellProps} />;
        },
      },
      {
        Header: "Website",
        accessor: "website_name",
        disableFilters: false,
        filterable: true,
        Cell: (cellProps) => {
          return <Name {...cellProps} />;
        },
      },
      {
        Header: "Type",
        accessor: "type_name",
        disableFilters: false,
        filterable: true,
        Cell: (cellProps) => {
          return <Name {...cellProps} />;
        },
      },
      {
        Header: "Active",
        accessor: "active",
        disableFilters: true,
        filterable: false,
        Cell: (cellProps) => {
          return <ActiveRelated {...cellProps} />;
        },
      },
      {
        Header: "Action",
        accessor: "action",
        disableFilters: true,
        Cell: (cellProps) => {
          const depData = cellProps.row.original;
          return (
            <div className="d-flex gap-3" data-testid="delete-addon">
              <div
                onClick={() => {
                  setRelatedEdit(true);
                  setEditRelatedData(depData);
                }}
                className="text-success"
              >
                <i
                  className="mdi mdi-pencil font-size-18"
                  id="edittooltip"
                  style={{ cursor: "pointer" }}
                />
                <UncontrolledTooltip placement="top" target="edittooltip">
                  Edit
                </UncontrolledTooltip>
              </div>

              <div
                className="text-danger"
                data-testid={`delete-addon-${depData.id}`}
                onClick={() => {
                  onDelete(cellProps);
                }}
              >
                <i
                  className="mdi mdi-delete font-size-18"
                  title="Delete"
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
      // eslint-disable-next-line react-hooks/exhaustive-deps
    ],
    []
  );

  useEffect(() => {
    let isMounted = true; // Bandera para verificar si el componente está montado

    let data = {
      current_tour_id: id,
    };
    getRelatedTourAPI(data).then((resp) => {
      if (isMounted) {
        setRelatedData(resp.data.data);
      }
    });

    // Función de limpieza
    return () => {
      isMounted = false;
    };
  }, [id]);

  const refreshTable = () => {
    let data = {
      current_tour_id: id,
    };
    getRelatedTourAPI(data).then((resp) => {
      setRelatedData(resp.data.data);
    });
  };

  // request related assets

  useEffect(() => {
    getActiveRelatedAsset(id).then((resp) => {
      setRelatedAssetsActiveData(resp.data.data);
    });
    getOtherRelatedAsset(id).then((resp) => {
      setRelatedAssetsOtherData(resp.data.data);
    });
  }, [id]);

  const refreshTableAssets = () => {
    getActiveRelatedAsset(id).then((resp) => {
      setRelatedAssetsActiveData(resp.data.data);
    });
    getOtherRelatedAsset(id).then((resp) => {
      setRelatedAssetsOtherData(resp.data.data);
    });
  };


  const assignAsset = (asset_id) => {
    let data = {
      tour_id: id,
      asset_provider_id: asset_id,
    };
   
    Swal.fire({
      title: "Assign Related Asset?",
      icon: "question",
      text: `Do you want assign this asset to this tour`,
      showCancelButton: true,
      confirmButtonText: "Yes",
      confirmButtonColor: "#F38430",
      cancelButtonText: "Cancel",
    }).then((resp) => {
      if (resp.isConfirmed) {
        assingAssetAPI(data).then((resp) => {
          refreshTableAssets();
        });
      }
    });
  };
  const removeAsset = (asset_id) => {
    let data = {
      tour_id: id,
      asset_provider_id: asset_id,
    };
   
    Swal.fire({
      title: "Remove Related Asset?",
      icon: "question",
      text: `Do you want remove this asset to this tour`,
      showCancelButton: true,
      confirmButtonText: "Yes",
      confirmButtonColor: "#F38430",
      cancelButtonText: "Cancel",
    }).then((resp) => {
      if (resp.isConfirmed) {
        removeAssetAPI(data).then((resp) => {
          refreshTableAssets();
        });
      }
    });
  };
  
  console.log(relatedAssetsActiveData)

  const indexSubmit = (row, position) => {
    let data = {
      current_tour_id: id,
      related_tour_index: row.row.index,
      action: position,
    };
    priorityRelatedAPI(data).then((resp) => {
      if (resp.status === 200) {
        refreshTable();
      }
    });
  };

  const onDelete = (related) => {
    Swal.fire({
      title: "Delete Related Tour?",
      icon: "question",
      text: `Do you want delete ${related.row.original.name}`,
      showCancelButton: true,
      confirmButtonText: "Yes",
      confirmButtonColor: "#F38430",
      cancelButtonText: "Cancel",
    }).then((resp) => {
      if (resp.isConfirmed) {
        deleteRelatedAPI(related.row.original.id)
          .then((response) => {
            refreshTable();
          })
          .catch((error) => {
            let errorMessages = [];
            if (
              error.response &&
              error.response.data &&
              error.response.data.data
            ) {
              Object.entries(error.response.data.data).map((item) => {
                errorMessages.push(item[1]);
                return true;
              });
            } else {
              errorMessages.push("An unexpected error occurred");
            }

            // Mostrar el error
            Swal.fire({
              title: "Error!",
              text: errorMessages.join(", "),
              icon: "error",
            });
          });
      }
    });
  };
  return (
    <TabPane tabId="1" className="">
      <Row xl={12}>
      <Col
          className="col-12 p-1 d-flex"
          style={{ backgroundColor: "#EBF9FE" }}
        >
          <p
            className="p-2"
            style={{
              fontSize: "24px",
              fontWeight: "bold",
              color: "#495057",
              marginBottom: "0px",
            }}
          >
            Related Tours
          </p>
          <span
            style={{
              fontSize: "20px",
              marginTop: "10px",
              fontWeight: "lighter",
              color: "#495057",
              marginBottom: "0px",
            }}
          >
            {" "}
            Identify tour that are either backups (direct replacement, no customer approval required), or alternatives (not quite the same, customer approval required)
            <br /> to the current tour.
          </span>
        </Col>
        {relatedData ? (
          <RelatedTables
            columns={columnsAddons}
            data={relatedData}
            isGlobalFilter={true}
            addonsTable={true}
            relatedFilter={relatedFilter}
            setRelatedFilter={setRelatedFilter}
          />
        ) : null}
      </Row>
      <Row>
        <Col
          className="col-12 p-1 my-4 d-flex"
          style={{ backgroundColor: "#FFEFDE" }}
        >
          <p
            className="p-2"
            style={{
              fontSize: "24px",
              fontWeight: "bold",
              color: "#495057",
              marginBottom: "0px",
            }}
          >
            Related Assets
          </p>
          <span
            style={{
              fontSize: "20px",
              marginTop: "10px",
              fontWeight: "lighter",
              color: "#495057",
              marginBottom: "0px",
            }}
          >
            {" "}
            The assets that are used on this tour by the operator, such as
            boats, vehicles or horses.
          </span>
        </Col>
        <Col className="col-12">
        <p
            className="p-2"
            style={{
              fontSize: "24px",
              fontWeight: "bold",
              color: "#495057",
              marginBottom: "0px",
            }}
          >
           Active Assets
          </p>
          <span
            style={{
              fontSize: "20px",
              marginTop: "10px",
              marginLeft: "10px",
              fontWeight: "lighter",
              color: "#495057",
              marginBottom: "0px",
            }}
          >
            {" "}
            These are the assets currently used on this tour. To add more, see "Other Assets" below.
          </span>
        </Col>
        <Col className="col-12">
        <ActiveAssetsTable relatedAssetsActiveData={relatedAssetsActiveData} removeAsset={removeAsset}/>
        </Col>
        <Col className="col-12 mt-5">
        <p
            className="p-2"
            style={{
              fontSize: "24px",
              fontWeight: "bold",
              color: "#495057",
              marginBottom: "0px",
            }}
          >
           Other Assets from This Operator
          </p>
          <span
            style={{
              fontSize: "20px",
              marginTop: "10px",
              marginLeft: "10px",
              fontWeight: "lighter",
              color: "#495057",
              marginBottom: "0px",
            }}
          >
            {" "}
            If any of the below assets are used on this tour, click "Add" to move that asset to the "Active Assets" list.
          </span>
        </Col>
        <Col className="col-12">
        <ActiveAssetsOthersTable relatedAssetsOtherData={relatedAssetsOtherData} assignAsset={assignAsset} />
        </Col>
      </Row>
      <Row>
        <Col className="col-12 d-flex justify-content-end mt-5">
          <Button
            color="paradise"
            outline
            className="waves-effect waves-light mx-4"
            type="button"
            onClick={() => toggle("9")}
          >
            <i className="uil-angle-double-left" />
            Previous
          </Button>
          {/* <Button
            type="submit"
            className="font-16 btn-block btn-orange"
            onClick={() => toggle("7")}
          >
            Continue
            <i className="uil-angle-double-right mx-1 " />
          </Button> */}
        </Col>
      </Row>

      <RelatedModal
        relatedFilter={relatedFilter}
        setRelatedFilter={setRelatedFilter}
        tourData={tourData}
        refreshTable={refreshTable}
        id={id}
      />
      <RelatedActionsModal
        relatedEdit={relatedEdit}
        setRelatedEdit={setRelatedEdit}
        editRelatedData={editRelatedData}
        refreshTable={refreshTable}
        id={id}
      />
    </TabPane>
  );
};

export default RelatedComponent;
