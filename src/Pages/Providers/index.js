import { useMemo, useEffect, useState } from "react";
import TableContainer from "../../Components/Common/TableContainer";
import {
  Name,
  Department,
  Active,
  LastName,
  Email,
  Rol,
} from "./ProvidersCols";
import { providersData } from "../../Utils/Redux/Actions/ProvidersActions";
import { deleteProviderAPI } from "../../Utils/API/Providers";
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

const Providers = () => {
  const [addModal, setAddModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [userId, setUserId] = useState({});

  //data request
  const dispatch = useDispatch();
  useEffect(() => {
    var providersRequest = () => dispatch(providersData());
    providersRequest();
  }, [dispatch, addModal, editModal]);

  //get info
  const data = useSelector((state) => state.providers.providers.data);

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
        accessor: "email",
        disableFilters: true,
        filterable: false,
        Cell: (cellProps) => {
          return <Email {...cellProps} />;
        },
      },
      {
        Header: "Reservation Email",
        accessor: "department",
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
              <Link
              to={`/providers/${providersData.id}  `}
              >
              
              <div className="text-paradise">
                <i
                  className="mdi mdi-pencil-outline font-size-18"
                  id="edittooltip"
                  
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

  const onClickNewProvider = () => {
    setAddModal(!addModal);
  };
  const onClickEdit = () => {
    setEditModal(!editModal);
  };
  return (
    <div className="page-content">
      <Container fluid>
        <div className=" mx-1">
          <h1
            className="fw-bold cursor-pointer"
            style={{ color: "#3DC7F4" }}
          >
            PROVIDERS
          </h1>
        </div>

        <Row>
          <Col xs="12">
            
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
    </div>
  );
};

export default Providers;
