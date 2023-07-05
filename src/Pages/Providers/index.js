import { useMemo, useEffect, useState } from "react";
import TableContainer from "../../Components/Common/TableContainer";
import {
  Name,
  Phone,
  Active,
  LastName,
  Email,
} from "./ProvidersCols";
import { providersData } from "../../Utils/Redux/Actions/ProvidersActions";
import { deleteProviderAPI } from "../../Utils/API/Providers";
import AddUserModal from "../../Components/Common/Modals/UsersModals/addUserModal";
import EditUserModal from "../../Components/Common/Modals/UsersModals/EditUserModal";
import {
  Container,
  Row,
  Col,
  UncontrolledTooltip,
} from "reactstrap";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Swal from "sweetalert2";

const Providers = () => {
  const [addModal, setAddModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [userId, setUserId] = useState({});
  const [loadingData, setLoadingData] = useState(true);
  //data request
  const dispatch = useDispatch();
  useEffect(() => {
    var providersRequest = () => dispatch(providersData());
    providersRequest();
  }, [dispatch, addModal, editModal]);

  //get info
  const data = useSelector((state) => state.providers.providers.data);
  useEffect(() => {
    if (data) {
      setLoadingData(false);
    }
  }, [data]);

  const onDelete = (providerInfo) => {
    Swal.fire({
      title: "Delete Provider?",
      icon: "question",
      text: `Do you want delete ${providerInfo.name}`,
      showCancelButton: true,
      confirmButtonText: "Yes",
      confirmButtonColor: "#F38430",
      cancelButtonText: "Cancel",
    }).then((resp) => {
      if (resp.isConfirmed) {
        deleteProviderAPI(providerInfo.id)
          .then((resp) => {
            var providersRequest = () => dispatch(providersData());
            providersRequest();
            Swal.fire("Deleted!", "Provider has been deleted.", "success");
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
        Header: "Reservation Email",
        accessor: "reservation_email",
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
              <Link to={`/providers/${providersData.id}  `}>
                <div className="text-paradise">
                  <i
                    className="mdi mdi-pencil-outline font-size-18"
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
                  const providerInfo = cellProps.row.original;
                  // setconfirm_alert(true);
                  onDelete(providerInfo);
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

  //modal new

  const onClickNewProvider = () => {
    setAddModal(!addModal);
  };
  const onClickEdit = () => {
    setEditModal(!editModal);
  };
  return (
    <div className="page-content pb-0">
      <Container fluid>
        <div className=" mx-1">
          <h1
            className="fw-bold cursor-pointer"
            style={{ color: "#3DC7F4", fontSize:"3.5rem" }}
          >
            PROVIDERS
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
                    providersTable={true}
                    isAddOrder={true}
                    onClickNewProvider={onClickNewProvider}
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
              onClickNewProvider={onClickNewProvider}
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
      <div className="content-footer pt-2 px-4 mt-4 mx-4">
          <p>{new Date().getFullYear()} © JS Tour & Travel</p>
        </div>
    </div>
  );
};

export default Providers;
