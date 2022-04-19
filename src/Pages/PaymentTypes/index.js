import { useEffect, useMemo, useState } from "react";
import { paymentTypesData } from "../../Utils/Redux/Actions/PaymentTypesActions";
import { deletePaymentTypeAPI } from "../../Utils/API/Payments";
import AddPaymentModal from "../../Components/Common/Modals/PaymentsModal/addPaymentModal";
import EditPaymentModal from "../../Components/Common/Modals/PaymentsModal/EditPaymentModal";
import { useSelector, useDispatch } from "react-redux";
import TableContainer from "../../Components/Common/TableContainer";
import { CartName, CartID, Active } from "./PaymentCols";
import { Container, Row, Col, Card, CardBody, UncontrolledTooltip } from "reactstrap";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const PaymentTypes = () => {
  const dispatch = useDispatch();
   //modals
   const [addPaymentModal, setPaymentModal] = useState(false)
   const [editPaymentModal, setEditPaymentModal] = useState(false)
   const [paymentID, setPaymentID] = useState()
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

  console.log(data)
 //delete

 const onDelete = (payment) =>{
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
          console.log(error);
        });
    }
  });
 }
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
          const cartData = cellProps.row.original;
          return (
            <div className="d-flex gap-3">
              <div
                
                className="text-success"
                onClick={() => {
                  setPaymentID(cartData.id)
                  setEditPaymentModal(true)
                }}
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
                  const paymentData = cellProps.row.original;
                  // setconfirm_alert(true);
                  onDelete(paymentData);
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
    return ( 
        <div className="page-content">
        <Container fluid>
          <div className=" mx-5">
            <h1 className="display-5 fw-bold cursor-pointer" style={{ color: "#3DC7F4" }}>
              + PAYMENT TYPES
            </h1>
          </div>
          <Row>
            <Col xs="12">
              <Card>
                <CardBody>
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
                </CardBody>
              </Card>
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
}
 
export default PaymentTypes;