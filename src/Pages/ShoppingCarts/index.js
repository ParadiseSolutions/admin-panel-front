import { useEffect, useMemo } from "react";
import { shoppingCartsData } from "../../Utils/Redux/Actions/ShoppingCartActions";
import moment from "moment";
import { useSelector, useDispatch } from "react-redux";
import TableContainer from "../../Components/Common/TableContainer";
import { CartName, CartID, Server, Website, TestLink, Active } from "./CartsCols";
import { Container, Row, Col, Card, CardBody, UncontrolledTooltip } from "reactstrap";
import { Link } from "react-router-dom";

const ShoppingCarts = () => {
  const dispatch = useDispatch();

  //departments request
  useEffect(() => {
    const cartsRequest = () => dispatch(shoppingCartsData());
    cartsRequest();
  }, [dispatch]);
  
  //get info
  const data = useSelector((state) => state.carts.carts.data);

console.log(data)

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
        accessor: "website_id",
        disableFilters: true,
        filterable: false,
        Cell: (cellProps) => {
          return <Website {...cellProps} />;
        },
      },
      {
        Header: "Test Link",
        accessor: "test_link",
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
          const depData = cellProps.row.original;
          return (
            <div className="d-flex gap-3">
              <Link
                to={`/departments/${depData.id}`}
                className="text-success"
                
              >
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
                  // onDelete(depData);
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
              + SHOPPING CARTS
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
                      cartsTable={true}
                      // handleOrderClicks={handleOrderClicks}
                    />
                  ) : null}
                </CardBody>
              </Card>
            </Col>
          </Row>
          </Container>
          </div>
     );
}
 
export default ShoppingCarts;