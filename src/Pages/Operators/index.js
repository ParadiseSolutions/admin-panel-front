import React, { useEffect, useMemo, useState } from "react";
import { operatorsData } from "../../Utils/Redux/Actions/OperatorsActions";
import { deleteOperatorAPI } from "../../Utils/API/Operators";
import TableContainer from "../../Components/Common/TableContainer";
import { Name, Phone, Active, LastName, Email } from "./ProvidersCols";
import {
  Container,
  Row,
  Col,
  UncontrolledTooltip,
} from "reactstrap";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Swal from "sweetalert2";

const Operators = () => {
  //data request
  const dispatch = useDispatch();
  const [loadingData, setLoadingData] = useState(true);
  useEffect(() => {
    var providersRequest = () => dispatch(operatorsData());
    providersRequest();
  }, [dispatch]);
  const data = useSelector((state) => state.operators.operators.data);
  useEffect(() => {
    if (data) {
      setLoadingData(false);
    }
  }, [data]);
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
          return <Phone {...cellProps} />;
        },
      },
      {
        Header: "Email",
        accessor: "email1",
        disableFilters: true,
        filterable: false,
        Cell: (cellProps) => {
          return <Email {...cellProps} />;
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
                  <i
                    className="mdi mdi-pencil-outline font-size-18 text-paradise"
                    id="edittooltip"
                    style={{ cursor: "pointer" }}
                  />
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
    <>
      <div className="page-content pb-0 px-3">
        <Container fluid>
          <div className=" mx-1">
            <h1
              className="fw-bold cursor-pointer"
              style={{ color: "#3DC7F4", fontSize:"3.5rem" }}
            >
              OPERATORS
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
                      operatorsTable={true}
                      isAddOrder={true}

                      //  handleOrderClicks={() => onClickAddNew()}
                    />
                  ) : null}
                </>
              )}
            </Col>
          </Row>
        </Container>
        <div className="content-footer pt-2 px-4 mt-4 mx-4">
          <p>{new Date().getFullYear()} © JS Tour & Travel</p>
        </div>
      </div>
    </>
  );
};

export default Operators;
