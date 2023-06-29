import { useMemo, useEffect } from "react";
import TableContainer from "../../Components/Common/TableContainer";
import { Name, Active, Date } from "./RolesCols";
import { rolesData } from "../../Utils/Redux/Actions/RolesActions";
import { deleteRol } from "../../Utils/API/Roles";
import moment from "moment";
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
const Roles = () => {
  //roles request
  const dispatch = useDispatch();
  useEffect(() => {
    const rolesRequest = () => dispatch(rolesData());
    rolesRequest();
  }, [dispatch]);

  //get info
  const data = useSelector((state) => state.roles.roles.data);

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
            Swal.fire(
              "Deleted!",
              "The Rol has been deleted.",
              "success"
            );
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
                <i className="mdi mdi-pencil-outline font-size-18 text-paradise" id="edittooltip" style={{cursor:"pointer"}}/>
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
            ROLES
          </h1>
        </div>

        <Row>
          <Col xs="12">
            
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
              
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Roles;
