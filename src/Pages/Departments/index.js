import { useEffect, useMemo, useState } from "react";
import moment from "moment";
import { useSelector, useDispatch } from "react-redux";
import { departmentsData } from "../../Utils/Redux/Actions/DepartmentsActions";
import { Container } from "reactstrap";
import { Row, Col, Card, CardBody, UncontrolledTooltip } from "reactstrap";
import { Link } from "react-router-dom";
import TableContainer from "../../Components/Common/TableContainer";
import { Name, Code, Date, Members, Active } from "./DepartmentsCols";
import Swal from "sweetalert2";
import { departmentDelete } from "../../Utils/API/Departments";
const Departments = () => {
  const dispatch = useDispatch();
  const [loadingData, setLoadingData] = useState(true);
  //departments request
  useEffect(() => {
    const departmentsRequest = () => dispatch(departmentsData());
    departmentsRequest();
  }, [dispatch]);

  //get info
  const data = useSelector((state) => state.departments.departments.data);
  useEffect(() => {
    if (data) {
      setLoadingData(false);
    }
  }, [data]);
  //table actions
  const onDelete = (depData) => {
    Swal.fire({
      title: "Delete Department?",
      icon: "question",
      text: `Do you want delete ${depData.name}`,
      showCancelButton: true,
      confirmButtonText: "Yes",
      confirmButtonColor: "#F38430",
      cancelButtonText: "Cancel",
    }).then((resp) => {
      if (resp.isConfirmed) {
        departmentDelete(depData.id)
          .then((resp) => {
            const departmentsRequest = () => dispatch(departmentsData());
            departmentsRequest();
            Swal.fire(
              "Deleted!",
              "The department has been deleted.",
              "success"
            );
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
          return <Name {...cellProps} />;
        },
      },
      {
        Header: "Code",
        accessor: "code",
        disableFilters: true,
        filterable: false,
        Cell: (cellProps) => {
          return <Code {...cellProps} />;
        },
      },
      {
        Header: "Members",
        accessor: "members.length",
        disableFilters: true,
        filterable: false,
        Cell: (cellProps) => {
          return <Members {...cellProps} />;
        },
      },
      {
        Header: "Date Created",
        accessor: (d) => {
          return moment(d.updated_at).format("MMM-DD-YYYY");
        },
        disableFilters: true,
        filterable: false,
        Cell: (cellProps) => {
          return <Date {...cellProps} />;
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
              <Link to={`/departments/${depData.id}`} className="text-success">
                <i
                  className="mdi mdi-pencil-outline font-size-18 text-paradise"
                  id="edittooltip"
                  style={{ cursor: "pointer" }}
                />
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
                  onDelete(depData);
                }}
              >
                <i
                  className="mdi mdi-delete-outline font-size-18"
                  id="deletetooltip"
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
      <div className="page-content">
        <Container fluid>
          <div className=" mx-2">
            <h1 className="fw-bold cursor-pointer" style={{ color: "#3DC7F4" }}>
              DEPARTMENTS
            </h1>
          </div>

          <Row>
            <Col xs="12">
              {loadingData ? (
                <div className="d-flex justify-content-center mt-5">
                  <div
                    className="spinner-border"
                    style={{ color: "#3DC7F4" }}
                    role="status"
                  >
                    <span className="sr-only">Loading...</span>
                  </div>
                  <h2 className="mx-5" style={{ color: "#3DC7F4" }}>
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
                      departmentTable={true}
                      isAddOrder={true}
                      // handleOrderClicks={handleOrderClicks}
                    />
                  ) : null}
                </>
              )}
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default Departments;
