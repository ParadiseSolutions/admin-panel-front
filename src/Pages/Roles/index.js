import { useMemo, useEffect, useState } from "react";
import TableContainer from "../../Components/Common/TableContainer";
import { Name, Active, Date } from "./RolesCols";
import { rolesData } from "../../Utils/Redux/Actions/RolesActions";
import { deleteRol } from "../../Utils/API/Roles";
import moment from "moment";
import {
  Container,
  Row,
  Col,
  UncontrolledTooltip,
} from "reactstrap";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Swal from "sweetalert2";
const Roles = () => {
  //roles request
  const [loadingData, setLoadingData] = useState(true);
  const dispatch = useDispatch();
  useEffect(() => {
    const rolesRequest = () => dispatch(rolesData());
    rolesRequest();
  }, [dispatch]);

  //get info
  const data = useSelector((state) => state.roles.roles.data);
  useEffect(() => {
    if (data) {
      setLoadingData(false);
    }
  }, [data]);
  // console.log(data);
  const onDelete = (rolData) => {
    Swal.fire({
      title: "Delete Department?",
      icon: "question",
      text: `Do you want delete ${rolData.name}`,
      showCancelButton: true,
      confirmButtonText: "Yes",
      confirmButtonColor: "#F38430",
      cancelButtonText: "Cancel",
    }).then((resp) => {
      if (resp.isConfirmed) {
        deleteRol(rolData.id)
          .then((resp) => {
            const rolesRequest = () => dispatch(rolesData());
            rolesRequest();
            Swal.fire("Deleted!", "The Role has been deleted.", "success");
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
          const rolData = cellProps.row.original;
          return (
            <div className="d-flex gap-3">
              <Link to={`/roles/${rolData.id}`} className="text-success">
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
                  const rolData = cellProps.row.original;
                  // setconfirm_alert(true);
                  onDelete(rolData);
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
          <h1
            className="fw-bold cursor-pointer"
            style={{ color: "#3DC7F4", fontSize:"3.5rem" }}
          >
            ROLES
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
                    rolesTable={true}
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
  );
};

export default Roles;
