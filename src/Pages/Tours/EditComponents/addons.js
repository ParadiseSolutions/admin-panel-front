import React, { useEffect, useState, useMemo } from "react";
import AddonsTables from "./PricingTables/addonsTables";
import Addons from "../../../Components/Common/Modals/PricingModals/addons";
import {
  getAddonsPricingAPI,
  deleteAddonAPI,
} from "../../../Utils/API/Tours";
import AddonsInstructionModal from "../../../Components/Common/Modals/AddonsModals/AddonsInstructionModal";
import { TabPane, Row, Button, UncontrolledTooltip, Col } from "reactstrap";
import { Name, Code, Price, ActiveAddon, Rate } from "./PricingTables/PricingCols";
import Swal from "sweetalert2";

const AddonsComponent = ({ id, tourData, toggle }) => {

  useEffect(() => {
    let isMounted = true; // Bandera para verificar si el componente está montado

    getAddonsPricingAPI(id).then((resp) => {
      if (isMounted) {
        setAddonsData(resp.data.data);
      }
    });

    // Función de limpieza
    return () => {
      isMounted = false;
    };
  }, [id]);

  const refreshTable = () => {
    getAddonsPricingAPI(id).then((resp) => {
      setAddonsData(resp.data.data);
    });
  };

  //
  const [addonsData, setAddonsData] = useState([]);
  const [copyProduct, setCopyProduct] = useState(false);

  //table actions
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
        .then((response) => {
          refreshTable()
        }).catch((error) => {
          let errorMessages = [];
          if (error.response && error.response.data && error.response.data.data) {
            Object.entries(error.response.data.data).map((item) => {
              errorMessages.push(item[1]);
              return true;
            });
          } else {
            errorMessages.push('An unexpected error occurred');
          }
          
          // Mostrar el error
          Swal.fire({
            title: "Error!",
            text: errorMessages.join(', '),
            icon: "error",
          });
        });
      }
    });
  };

  const [editProductID, setEditProductID] = useState(null);

  const columnsAddons = useMemo(
    () => [
      {
        Header: "ID",
        accessor: "id",
        disableFilters: false,
        filterable: true,
        Cell: (cellProps) => {
          return <Name {...cellProps} />;
        },
      },
      {
        Header: "Add-On Name",
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
          return <Rate {...cellProps} />;
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
        Header: "Invoice Amt",
        accessor: "net_price",
        disableFilters: true,
        filterable: false,
        Cell: (cellProps) => {
          return <Price {...cellProps} />;
        },
      },
      {
        Header: "Active",
        accessor: "active",
        disableFilters: true,
        filterable: false,
        Cell: (cellProps) => {
          return <ActiveAddon {...cellProps} />;
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
                  setNewAddon(true);
                  setEditProductID(depData.id);
                }}
                className="text-success"
              >
                <i className="mdi mdi-pencil font-size-18" id="edittooltip" style={{ cursor: "pointer" }} />
                <UncontrolledTooltip placement="top" target="edittooltip">
                  Edit
                </UncontrolledTooltip>
              </div>
              <div
                onClick={() => {
                  setNewAddon(true);
                  setEditProductID(depData.id);
                  setCopyProduct(true);
                }}
                className="text-warning"
              >
                <i className="mdi mdi-content-copy font-size-18" id="copytooltip" style={{ cursor: "pointer" }} />
                <UncontrolledTooltip placement="top" target="edittooltip">
                  Copy
                </UncontrolledTooltip>
              </div>
              <div
                className="text-danger"
                data-testid={`delete-addon-${depData.id}`}
                onClick={() => {
                  const depData = cellProps.row.original;
                  // setconfirm_alert(true);
                  onDeleteAddon(depData);
                }}
              >
                <i className="mdi mdi-delete font-size-18" title="Delete" id="deletetooltip" style={{ cursor: "pointer" }} />
                <UncontrolledTooltip placement="top" target="deletetooltip">
                  Delete
                </UncontrolledTooltip>
              </div>
            </div>
          );
        },
      },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    ],[]);

  //add new addon
  const [newAddon, setNewAddon] = useState(false);

  // template instruction
  const [instructionModal, setInstructionModal] = useState(false);
  const onClickInstructions = () => {
    setInstructionModal(!instructionModal);
  };

  const onClickNewAddon = () => {
    setEditProductID(null)
    setNewAddon(!newAddon);
  };

  return (
    <TabPane tabId="1" className="">
      <Row xl={12}>
        {addonsData.length > 0  ? (
          <AddonsTables
            columns={columnsAddons}
            data={addonsData}
            isGlobalFilter={true}
            addonsTable={true}
            onClickNewAddon={onClickNewAddon}
            onClickInstructions={onClickInstructions}
          />
        ) : null}
      </Row>
      <Row>
        <Col className="col-12 d-flex justify-content-end mt-5">
          <Button
            color="paradise"
            outline
            className="waves-effect waves-light mx-4"
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

      <Addons
        newAddon={newAddon}
        setNewAddon={setNewAddon}
        tourData={tourData}
        refreshTable={refreshTable}
        editProductID={editProductID}
        id={id}
        copyProduct={copyProduct}
        setCopyProduct={setCopyProduct}
      />
      <AddonsInstructionModal
        instructionModal={instructionModal}
        setInstructionModal={setInstructionModal}
        id={id}
      />
    </TabPane>
  );
};

export default AddonsComponent;
