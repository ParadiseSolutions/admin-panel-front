import React, { useEffect, useMemo } from "react";
import { operatorsData } from "../../Utils/Redux/Actions/OperatorsActions";
import { deleteOperatorAPI } from "../../Utils/API/Operators";
import TableContainer from "../../Components/Common/TableContainer";
import { Name, Department, Active, LastName, Email } from "./ProvidersCols";
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  UncontrolledTooltip,
} from "reactstrap";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Swal from "sweetalert2";

const Operators = () => {
  //data request
  const dispatch = useDispatch();
  useEffect(() => {
    var providersRequest = () => dispatch(operatorsData());
    providersRequest();
  }, [dispatch]);
  const data = useSelector((state) => state.operators.operators.data);

  const onDelete = (operatorInfo) => {
    Swal.fire({
      title: "Delete Operator?",
      icon: "question",
      text: `Do you want delete ${operatorInfo.name}`,
      showCancelButton: true,
      confirmButtonText: "Yes",
      confirmButtonColor: "#F38430",
      cancelButtonText: "Cancel",
    }).then((resp) => {
      if (resp.isConfirmed) {
        deleteOperatorAPI(operatorInfo.id)
          .then((resp) => {
            var providersRequest = () => dispatch(operatorsData());
            providersRequest();
            Swal.fire("Deleted!", "Operator has been deleted.", "success");
          })
          .catch((error) => {
            // console.log(error);
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
          return <Name {...cellProps} />;
        },
      },
      {
        Header: "Code",
        accessor: "code",
        disableFilters: true,
        filterable: false,
        Cell: (cellProps) => {
          return <LastName {...cellProps} />;
        },
      },
      {
        Header: "Phone",
        accessor: "phone1",
        disableFilters: true,
        filterable: false,
        Cell: (cellProps) => {
          return <Email {...cellProps} />;
        },
      },
      {
        Header: "Email",
        accessor: "email1",
        disableFilters: true,
        filterable: false,
        Cell: (cellProps) => {
          return <Department {...cellProps} />;
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
              <Link to={`/operators/${providersData.id}  `}>
                <div className="text-success">
                  <i className="mdi mdi-pencil-outline font-size-18 text-paradise" id="edittooltip" />
                  <UncontrolledTooltip placement="top" target="edittooltip">
                    Edit
                  </UncontrolledTooltip>
                </div>
              </Link>
              <Link
                to="#"
                className="text-danger"
                onClick={() => {
                  const operatorInfo = cellProps.row.original;
                  // setconfirm_alert(true);
                  onDelete(operatorInfo);
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
    <>
      <div className="page-content">
        <Container fluid>
          <div className=" mx-1">
            <h1
              className="fw-bold cursor-pointer"
              style={{ color: "#3DC7F4" }}
            >
              OPERATORS
            </h1>
          </div>
          <Row>
            <Col xs="12">
              
                  {data ? (
                    <TableContainer
                      columns={columns}
                      data={data}
                      isGlobalFilter={true}
                      operatorsTable={true}
                      isAddOrder={true}

                      //  handleOrderClicks={() => onClickAddNew()}
                    />
                  ) : null}
                
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default Operators;
