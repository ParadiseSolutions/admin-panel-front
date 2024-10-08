import { useMemo, useEffect, useState } from "react";
import TableContainer from "../../Components/Common/TableContainer";
import { FullName, Job, Department, Active, Email, Rol } from "./UsersCols";
import { usersData } from "../../Utils/Redux/Actions/UsersActions";
import { deleteUser } from "../../Utils/API/Users";
import AddUserModal from "../../Components/Common/Modals/UsersModals/addUserModal";
import EditUserModal from "../../Components/Common/Modals/UsersModals/EditUserModal";
import { Container, Row, Col, UncontrolledTooltip } from "reactstrap";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Swal from "sweetalert2";

const Users = () => {
  const [addModal, setAddModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [userId, setUserId] = useState({});
  const [loadingData, setLoadingData] = useState(true);
  //roles request
  const dispatch = useDispatch();
  useEffect(() => {
    var usersRequest = () => dispatch(usersData());
    usersRequest();
  }, [dispatch, addModal, editModal]);

  //get info
  const data = useSelector((state) => state.users.users.data);
  useEffect(() => {
    if (data) {
      setLoadingData(false);
    }
  }, [data]);

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
                return true
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
        accessor: "fullname",
        disableFilters: false,
        filterable: true,
        Cell: (cellProps) => {
          const userData = cellProps.row.original;
          return (
            <div style={{ width: "166px" }}>
              <img
                className="rounded-circle header-profile-user"
                src={
                  userData.picture
                    ? userData.picture
                    : "https://jstourandtravel.com/js-websites/global-resources/adminpanel/undefined.png"
                }
                alt="Header Avatar"
              />{" "}
              <FullName {...cellProps} />
            </div>
          );
        },
      },
      {
        Header: "Email",
        accessor: "email",
        disableFilters: false,
        filterable: true,
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
        disableFilters: false,
        filterable: true,
        Cell: (cellProps) => {
          return <Department {...cellProps} />;
        },
      },
      {
        Header: "Role",
        accessor: "role",
        disableFilters: false,
        filterable: true,
        Cell: (cellProps) => {
          return <Rol {...cellProps} />;
        },
      },
      {
        Header: "Active",
        accessor: "active",
        disableFilters: false,
        filterable: true,
        Cell: (cellProps) => {
          return <Active {...cellProps} />;
        },
      },
      {
        Header: "Action",
        accessor: "action",
        disableFilters: false,
        Cell: (cellProps) => {
          const userData = cellProps.row.original;
          return (
            <div className="d-flex gap-3">
              <div className="text-paradise">
                <i
                  className="mdi mdi-pencil-outline font-size-18"
                  id="edittooltip"
                  style={{ cursor: "pointer" }}
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
      // eslint-disable-next-line react-hooks/exhaustive-deps
    ],[]);

  //modal new

  const onClickAddNew = () => {
    setAddModal(!addModal);
  };
  const onClickEdit = () => {
    setEditModal(!editModal);
  };
  return (
    <div className="page-content pb-0 px-3">
      <Container fluid>
        <div className=" mx-2">
          <h1
            className="fw-bold cursor-pointer"
            style={{ color: "#3DC7F4", fontSize:"3.5rem" }}
          >
            USERS
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
                    usersTable={true}
                    onClickAddNew={onClickAddNew}
                    //  handleOrderClicks={() => onClickAddNew()}
                  />
                ) : null}
              </>
            )}
          </Col>
        </Row>

        <div className="modal-dialog-centered">
          <div className="modal-content" style={{ border: "none" }}>
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
      <div className="content-footer pt-2 px-4 mt-3 mx-4">
          <p>{new Date().getFullYear()} © JS Tour & Travel</p>
        </div>
    </div>
  );
};

export default Users;
