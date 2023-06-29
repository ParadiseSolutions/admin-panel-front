import { useEffect, useMemo, useState } from "react";
import { toursData } from "../../Utils/Redux/Actions/ToursActions";
import { deleteTourAPI } from "../../Utils/API/Tours";
import { useSelector, useDispatch } from "react-redux";
import TableContainer from "../../Components/Common/TableContainer";
import { CartName, CartID, Server, Active } from "./ToursCols";
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  UncontrolledTooltip,
} from "reactstrap";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const Tours = () => {
  const dispatch = useDispatch();

  //cart request
  useEffect(() => {
    const toursRequest = () => dispatch(toursData());
    toursRequest();
  }, [dispatch]);

  //get info
  const data = useSelector((state) => state.tours.tours.data);

  //delete

  const onDelete = (tour) => {
    Swal.fire({
      title: "Delete Tour?",
      icon: "question",
      text: `Do you want delete ${tour.name}`,
      showCancelButton: true,
      confirmButtonText: "Yes",
      confirmButtonColor: "#F38430",
      cancelButtonText: "Cancel",
    }).then((resp) => {
      if (resp.isConfirmed) {
        deleteTourAPI(tour.id)
          .then((resp) => {
            const toursRequest = () => dispatch(toursData());
            toursRequest();
            Swal.fire("Deleted!", "The Tour has been deleted.", "success");
          })
          .catch((error) => {
            // console.log(error);
          });
      }
    });
  };
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
        Header: "Website",
        accessor: "website_name",
        disableFilters: true,
        filterable: false,
        Cell: (cellProps) => {
          return <CartID {...cellProps} />;
        },
      },
      {
        Header: "Provider",
        accessor: "provider_name",
        disableFilters: true,
        filterable: false,
        Cell: (cellProps) => {
          return <Server {...cellProps} />;
        },
      },
      {
        Header: "Category",
        accessor: "category_name",
        disableFilters: true,
        filterable: false,
        Cell: (cellProps) => {
          return <Server {...cellProps} />;
        },
      },
      {
        Header: "Operator",
        accessor: "operator_name",
        disableFilters: true,
        filterable: false,
        Cell: (cellProps) => {
          return <Server {...cellProps} />;
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
          const tourData = cellProps.row.original;
          return (
            <div className="d-flex gap-3">
              <div className="text-paradise">
              <Link
                to={`/tours/${tourData.id}`}
                className="text-success"
                
              >
                <i className="mdi mdi-pencil-outline font-size-18 text-paradise" id="edittooltip" style={{cursor:"pointer"}}/>
                <UncontrolledTooltip placement="top" target="edittooltip">
                  Edit
                </UncontrolledTooltip>
              </Link>
              </div>
              <Link
                to="#"
                className="text-danger"
                onClick={() => {
                  const tourData = cellProps.row.original;
                  // setconfirm_alert(true);
                  onDelete(tourData);
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
          <h1
            className="fw-bold cursor-pointer"
            style={{ color: "#3DC7F4" }}
          >
            + TOURS
          </h1>
        </div>
        <Row>
          <Col xs="12">
            
                {data ? (
                  <TableContainer
                    columns={columns}
                    data={data}
                    isGlobalFilter={true}
                    toursTable={true}
                    // handleOrderClicks={handleOrderClicks}
                  />
                ) : null}
              
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Tours;
