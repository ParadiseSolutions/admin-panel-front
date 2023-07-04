import { useEffect, useMemo, useState } from "react";
import { paymentTypesData } from "../../Utils/Redux/Actions/PaymentTypesActions";
import { deletePaymentTypeAPI } from "../../Utils/API/Payments";
import AddPaymentModal from "../../Components/Common/Modals/PaymentsModal/addPaymentModal";
import EditPaymentModal from "../../Components/Common/Modals/PaymentsModal/EditPaymentModal";
import { useSelector, useDispatch } from "react-redux";
import TableContainer from "../../Components/Common/TableContainer";
import { CartName, CartID, Active } from "./PaymentCols";
import {
  Container,
  Row,
  Col,
  UncontrolledTooltip,
} from "reactstrap";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const PaymentTypes = () => {
  const dispatch = useDispatch();
  const [loadingData, setLoadingData] = useState(true);
  //modals
  const [addPaymentModal, setPaymentModal] = useState(false);
  const [editPaymentModal, setEditPaymentModal] = useState(false);
  const [paymentID, setPaymentID] = useState();
  const onClickAddNewPayment = () => {
    setPaymentModal(!addPaymentModal);
  };
  const onClickEditPayment = () => {
    setEditPaymentModal(!editPaymentModal);
  };

  //cart request
  useEffect(() => {
    const paymentDataRequest = () => dispatch(paymentTypesData());
    paymentDataRequest();
  }, [dispatch, addPaymentModal, editPaymentModal]);

  //get info
  const data = useSelector((state) => state.paymentTypes.paymentTypes.data);
  useEffect(() => {
    if (data) {
      setLoadingData(false);
    }
  }, [data]);
  // console.log(data)
  //delete

  const onDelete = (payment) => {
    Swal.fire({
      title: "Delete Payment Type?",
      icon: "question",
      text: `Do you want delete ${payment.name}`,
      showCancelButton: true,
      confirmButtonText: "Yes",
      confirmButtonColor: "#F38430",
      cancelButtonText: "Cancel",
    }).then((resp) => {
      if (resp.isConfirmed) {
        deletePaymentTypeAPI(payment.id)
          .then((resp) => {
            const paymentDataRequest = () => dispatch(paymentTypesData());
            paymentDataRequest();
            Swal.fire("Deleted!", "Payment Type has been deleted.", "success");
          })
          .catch((error) => {
            let errorMessages = [];
            if (error.response.data.data === null) {
              Swal.fire(
                "Error!",
                // {error.response.},
                String(error.response.data.message)
              );
            } else {
              Object.entries(error.response.data.data).map((item) => {
                errorMessages.push(item[1]);
              });

              Swal.fire(
                "Error!",
                // {error.response.},
                String(errorMessages[0])
              );
            }
          });
      }
    });
  };

  //columns
  const columns = useMemo(
    () => [
      {
        Header: "Name",
        accessor: "name",
        disableFilters: true,
        filterable: false,
        Cell: (cellProps) => {
          return <CartName {...cellProps} />;
        },
      },
      {
        Header: "Default Label",
        accessor: "default_label",
        disableFilters: true,
        filterable: false,
        Cell: (cellProps) => {
          return <CartID {...cellProps} />;
        },
      },

      {
        Header: "Active",
        accessor: "active",
        disableFilters: true,
        filterable: false,
        Cell: (cellProps) => {
          return <Active {...cellProps} />;
        },
      },
      {
        Header: "Action",
        accessor: "action",
        disableFilters: true,
        Cell: (cellProps) => {
          const providersData = cellProps.row.original;
          return (
            <div className="d-flex gap-3">
              <div
                className="text-paradise"
                onClick={() => {
                  setPaymentID(paymentTypesData.id);
                  setEditPaymentModal(true);
                }}
              >
                <i
                  className="mdi mdi-pencil-outline font-size-18 text-paradise"
                  id="edittooltip"
                  style={{ cursor: "pointer" }}
                />
                <UncontrolledTooltip placement="top" target="edittooltip">
                  Edit
                </UncontrolledTooltip>
              </div>
              <Link
                to="#"
                className="text-danger"
                onClick={() => {
                  const providerInfo = cellProps.row.original;
                  // setconfirm_alert(true);
                  onDelete(providerInfo);
                }}
              >
                <i
                  className="mdi mdi-delete-outline font-size-18"
                  id="deletetooltip"
                  style={{ cursor: "pointer" }}
                />
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
  return (
    <div className="page-content">
      <Container fluid>
        <div className=" mx-1">
          <h1 className="fw-bold cursor-pointer" style={{ color: "#3DC7F4", fontSize:"3.5rem" }}>
            PAYMENT TYPES
          </h1>
        </div>
        <Row>
          <Col xs="12">
            {loadingData ? (
              <div className="d-flex justify-content-center mt-5">
                <div
                  className="spinner-border text-orange"
                  role="status"
                >
                  <span className="sr-only">Loading...</span>
                </div>
                <h2 className="mx-5 text-orange">
                  Loading...
                </h2>
              </div>
            ) : (
              <>
                {data ? (
                  <TableContainer
                    columns={columns}
                    data={data}
                    isGlobalFilter={true}
                    paymentsTable={true}
                    onClickAddNewPayment={onClickAddNewPayment}
                    // handleOrderClicks={handleOrderClicks}
                  />
                ) : null}
              </>
            )}
          </Col>
        </Row>
        <AddPaymentModal
          addPaymentModal={addPaymentModal}
          setPaymentModal={setPaymentModal}
          onClickAddNewPayment={onClickAddNewPayment}
        />
        <EditPaymentModal
          editPaymentModal={editPaymentModal}
          setEditPaymentModal={setEditPaymentModal}
          onClickEditPayment={onClickEditPayment}
          paymentID={paymentID}
        />
      </Container>
    </div>
  );
};

export default PaymentTypes;
