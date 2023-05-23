import { useEffect, useMemo, useState } from "react";
import { shoppingCartsData } from "../../Utils/Redux/Actions/ShoppingCartActions";
import { deleteCartAPI } from "../../Utils/API/ShoppingCarts";
import AddCartModal from "../../Components/Common/Modals/ShoppingCartsModals/addCartModal";
import EditCartModal from "../../Components/Common/Modals/ShoppingCartsModals/EditCartModal";
import { useSelector, useDispatch } from "react-redux";
import TableContainer from "../../Components/Common/TableContainer";
import { CartName, CartID, Server, Website, TestLink, Active } from "./CartsCols";
import { Container, Row, Col, Card, CardBody, UncontrolledTooltip } from "reactstrap";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const ShoppingCarts = () => {
  const dispatch = useDispatch();
   //modals
   const [addCartModal, setAddCartModal] = useState(false)
   const [editCartModal, setEditCartModal] = useState(false)
   const [cartID, setCartID] = useState()
   const onClickAddNewCart = () => {
     setAddCartModal(!addCartModal);
   };
   const onClickEditCart = () => {
    setEditCartModal(!editCartModal);
   };

  //cart request
  useEffect(() => {
    const cartsRequest = () => dispatch(shoppingCartsData());
    cartsRequest();
  }, [dispatch, addCartModal, editCartModal]);
  
  //get info
  const data = useSelector((state) => state.carts.carts.data);

 //delete

 const onDelete = (cart) =>{
  Swal.fire({
    title: "Delete Shopping Cart?",
    icon: "question",
    text: `Do you want delete ${cart.name}`,
    showCancelButton: true,
    confirmButtonText: "Yes",
    confirmButtonColor: "#F38430",
    cancelButtonText: "Cancel",
  }).then((resp) => {
    if (resp.isConfirmed) {
      deleteCartAPI(cart.id)
        .then((resp) => {
          const cartsRequest = () => dispatch(shoppingCartsData());
    cartsRequest();
          Swal.fire("Deleted!", "The Cart has been deleted.", "success");
        })
        .catch((error) => {
          // console.log(error);
        });
    }
  });
 }
  const columns = useMemo(
    () => [
      {
        Header: "Cart Name",
        accessor: "name",
        disableFilters: true,
        filterable: false,
        Cell: (cellProps) => {
          return <CartName {...cellProps} />;
        },
      },
      {
        Header: "Cart ID",
        accessor: "cart_number",
        disableFilters: true,
        filterable: false,
        Cell: (cellProps) => {
          return <CartID {...cellProps} />;
        },
      },
      {
        Header: "Server",
        accessor: "server",
        disableFilters: true,
        filterable: false,
        Cell: (cellProps) => {
          return <Server {...cellProps} />;
        },
      },
      {
        Header: "Website",
        accessor: "website",
        disableFilters: true,
        filterable: false,
        Cell: (cellProps) => {
          return <Website {...cellProps} />;
        },
      },
      {
        Header: "URL",
        accessor: "domain",
        disableFilters: true,
        filterable: false,
        Cell: (cellProps) => {
          return <TestLink {...cellProps} />;
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
                
                className="text-paradise"
                onClick={() => {
                  setCartID(cartData.id)
                  setEditCartModal(true)
                }}
              >
                <i className="mdi mdi-pencil-outline font-size-18" id="edittooltip" />
                <UncontrolledTooltip placement="top" target="edittooltip">
                  Edit
                </UncontrolledTooltip>
              </div>
              <Link
                to="#"
                className="text-danger"
                onClick={() => {
                  const cartData = cellProps.row.original;
                  // setconfirm_alert(true);
                  onDelete(cartData);
                }}
              >
                <i className="mdi mdi-delete-outline font-size-18" id="deletetooltip" />
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
            <h1 className="fw-bold cursor-pointer" style={{ color: "#3DC7F4" }}>
              + SHOPPING CARTS
            </h1>
          </div>
          <Row>
            <Col xs="12">
              
                  {data ? (
                    <TableContainer
                      columns={columns}
                      data={data}
                      isGlobalFilter={true}
                      cartsTable={true}
                      onClickAddNewCart={onClickAddNewCart}
                      // handleOrderClicks={handleOrderClicks}
                    />
                  ) : null}
                
            </Col>
          </Row>
          <AddCartModal 
            addCartModal={addCartModal}
            setAddCartModal={setAddCartModal}
            onClickAddNewCart={onClickAddNewCart}
          />
          <EditCartModal 
          editCartModal={editCartModal}
          setEditCartModal={setEditCartModal}
          onClickEditCart={onClickEditCart}
          cartID={cartID}
          />
          </Container>
          </div>
     );
}
 
export default ShoppingCarts;