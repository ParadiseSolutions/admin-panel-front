import { useMemo, useEffect, useState } from "react";
import TableContainer from "../../Components/Common/TableContainer";
import { Name, Department, Active, LastName, Email, Rol, Job } from "./UsersCols";
import { usersData } from "../../Utils/Redux/Actions/UsersActions";
import { deleteUser } from "../../Utils/API/Users";
import AddUserModal from "../../Components/Common/Modals/UsersModals/addUserModal";
import EditUserModal from "../../Components/Common/Modals/UsersModals/EditUserModal";
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

const Users = () => {
  const [addModal, setAddModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [userId, setUserId] = useState({});
  //roles request
  const dispatch = useDispatch();
  useEffect(() => {
    var usersRequest = () => dispatch(usersData());
    usersRequest();
  }, [dispatch, addModal, editModal]);


  //get info
  const data = useSelector((state) => state.users.users.data);

  const onDelete = (userData) => {
    Swal.fire({
      title: "Delete User?",
      icon: "question",
      text: `${userData.first_name} ${userData.last_name}`,
      showCancelButton: true,
      confirmButtonText: "Yes",
      confirmButtonColor: "#F38430",
      cancelButtonText: "Cancel",
      cancelButtonColor: "#a7b6c4",
    }).then((resp) => {
      if (resp.isConfirmed) {
        deleteUser(userData.id)
          .then((resp) => {
            const usersRequest = () => dispatch(usersData());
            usersRequest();
            Swal.fire("Deleted!", "The User has been deleted.", "success");
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
        accessor: "first_name",
        disableFilters: true,
        filterable: false,
        Cell: (cellProps) => {
          return <Name {...cellProps} />;
        },
      },
      {
        Header: "Last Name",
        accessor: "last_name",
        disableFilters: true,
        filterable: false,
        Cell: (cellProps) => {
          return <LastName {...cellProps} />;
        },
      },
      {
        Header: "Email",
        accessor: "email",
        disableFilters: true,
        filterable: false,
        Cell: (cellProps) => {
          return <Email {...cellProps} />;
        },
      },
      {
        Header: "Job Title",
        accessor: "job_title",
        disableFilters: true,
        filterable: false,
        Cell: (cellProps) => {
          return <Job {...cellProps} />;
        },
      },
      {
        Header: "Department",
        accessor: "department",
        disableFilters: true,
        filterable: false,
        Cell: (cellProps) => {
          return <Department {...cellProps} />;
        },
      },
      {
        Header: "Role",
        accessor: "role",
        disableFilters: true,
        filterable: false,
        Cell: (cellProps) => {
          return <Rol {...cellProps} />;
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
          const userData = cellProps.row.original;
          return (
            <div className="d-flex gap-3">
              <div className="text-paradise">
                <i
                  className="mdi mdi-pencil-outline font-size-18"
                  id="edittooltip"
                  onClick={() => {
                    setUserId(userData.id);
                    setEditModal(true);
                  }}
                />
                <UncontrolledTooltip placement="top" target="edittooltip">
                  Edit
                </UncontrolledTooltip>
              </div>
              <Link
                to="#"
                className="text-danger"
                onClick={() => {
                  const userData = cellProps.row.original;
                  // setconfirm_alert(true);
                  onDelete(userData);
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

  //modal new

  const onClickAddNew = () => {
    setAddModal(!addModal);
  };
  const onClickEdit = () => {
    setEditModal(!editModal);
  };
  return (
    <div className="page-content">
      <Container fluid>
        <div className=" mx-2">
          <h1
            className="fw-bold cursor-pointer"
            style={{ color: "#3DC7F4" }}
          >
            USERS
          </h1>
        </div>

        <Row>
          <Col xs="12">
            
                {data ? (
                  <TableContainer
                    columns={columns}
                    data={data}
                    isGlobalFilter={true}
                    usersTable={true}
                    
                    onClickAddNew={onClickAddNew}
                    //  handleOrderClicks={() => onClickAddNew()}
                  />
                ) : null}
              
          </Col>
        </Row>

        <div className="modal-dialog-centered">
          <div className="modal-content" style={{border:'none'}}>
            <AddUserModal
              addModal={addModal}
              setAddModal={setAddModal}
              onClickAddNew={onClickAddNew}
            />
          </div>
        </div>

        <EditUserModal
          userId={userId}
          editModal={editModal}
          setEditModal={setEditModal}
          onClickEdit={onClickEdit}
        />
      </Container>
    </div>
  );
};

export default Users;
