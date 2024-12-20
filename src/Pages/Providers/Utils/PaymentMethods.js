import { useMemo, useState } from "react";
import { deleteContactAPI } from "../../../Utils/API/Contacts";
import TableContainer from "../../../Components/Common/TableContainer";
import AddContactProviderModal from "../../../Components/Common/Modals/ContactsProviderModal/addContactProviderModal";
import { Name, Department, Active, LastName } from "./ProvidersCols";
import {
  Collapse,
  Row,
  Col,
  Card,
  CardBody,
  UncontrolledTooltip,
} from "reactstrap";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import classnames from "classnames";
import EditContactProviderModal from "../../../Components/Common/Modals/ContactsProviderModal/editContactProviderModal";
const PaymentMethods = ({ contacts }) => {
  const [col3, setcol3] = useState(false);
  const [addContactModal, setAddContactModal] = useState(false);
  const [editContactModal, setEditContactModal] = useState(false);
  const [contactID, setContactID] = useState(false);

  function togglecol1() {
    setcol3(!col3);
  }

  const onClickNewContactProvider = () => {
    setAddContactModal(!addContactModal);
  };
  const onClickEditContactProvider = () => {
    setEditContactModal(!editContactModal);
  };

  //delete contact
  const onDelete = (depData) => {
    Swal.fire({
      title: "Delete Contact?",
      icon: "question",
      text: `Do you want delete ${depData.first_name}`,
      showCancelButton: true,
      confirmButtonText: "Yes",
      confirmButtonColor: "#F38430",
      cancelButtonText: "Cancel",
    }).then((resp) => {
      if (resp.isConfirmed) {
        deleteContactAPI(depData.id)
          .then((resp) => {
            Swal.fire("Deleted!", "Contact has been deleted.", "success");
            document.location.reload();
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
        Header: "Type",
        accessor: "first_name",
        disableFilters: true,
        filterable: false,
        Cell: (cellProps) => {
          const methodData = cellProps.row.original;
          return <p className="fw-bold">{methodData.first_name}</p>;
        },
      },
      {
        Header: "Specifications",
        accessor: "",
        disableFilters: true,
        filterable: false,
        Cell: (cellProps) => {
          const methodData = cellProps.row.original;
          return (
            <>
            <div className="d-flex flex-wrap">
              <span className="fw-bold">Bank Name:</span>
              <span className="mx-2">Bank of America</span>
            </div>
            <div className="d-flex flex-wrap">
              <span className="fw-bold">ABA Routing:</span>
              <span className="mx-2">123456789012</span>
            </div>
            <div className="d-flex flex-wrap">
              <span className="fw-bold">Account Number:</span>
              <span className="mx-2">123456789012</span>
            </div>
            <br />
            <div className="d-flex flex-wrap">
              <span className="fw-bold">Account Name:</span>
              <span className="mx-2">123456789012</span>
            </div>
            <div className="d-flex flex-wrap">
              <span className="fw-bold">Address:</span>
              <span className="mx-2">123456789012</span>
            </div>
            <div className="d-flex flex-wrap">
              <span className="fw-bold">Country:</span>
              <span className="mx-2">123456789012</span>
            </div>
            <div className="d-flex flex-wrap">
              <span className="fw-bold">City:</span>
              <span className="mx-2">123456789012</span>
            </div>
            <div className="d-flex flex-wrap">
              <span className="fw-bold">State:</span>
              <span className="mx-2">123456789012</span>
            </div>
            <div className="d-flex flex-wrap">
              <span className="fw-bold">Postal:</span>
              <span className="mx-2">123456789012</span>
            </div>
            <div className="d-flex flex-wrap">
              <span className="fw-bold">Phone:</span>
              <span className="mx-2">123456789012</span>
            </div>
            </>
          );
        },
      },
      {
        Header: "E-mail",
        accessor: "",
        disableFilters: true,
        filterable: false,
        Cell: (cellProps) => {
          const methodData = cellProps.row.original;
          return <p className="fw-bold">{methodData.first_name}</p>;
        },
      },
      {
        Header: "Currency",
        accessor: "",
        disableFilters: true,
        filterable: false,
        Cell: (cellProps) => {
          const methodData = cellProps.row.original;
          return <p className="fw-bold">{methodData.first_name}</p>;
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
              <div
                onClick={() => {
                  setContactID(providersData.id);
                  setEditContactModal(true);
                }}
                className="text-info"
              >
                <i className="mdi mdi-pencil font-size-18" id="edittooltip" />
                <UncontrolledTooltip placement="top" target="edittooltip">
                  Edit
                </UncontrolledTooltip>
              </div>

              <Link
                to="#"
                className="text-danger"
                onClick={() => {
                  const contactInfo = cellProps.row.original;

                  onDelete(contactInfo);
                }}
              >
                <i className="mdi mdi-delete font-size-18" id="deletetooltip" />
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
    <div className="accordion-item">
      <h2 className="accordion-header" id="headingTwo">
        <button
          className={classnames("accordion-button", "fw-medium", {
            collapsed: !col3,
          })}
          type="button"
          onClick={togglecol1}
          style={{
            cursor: "pointer",
            backgroundColor: "#F6851F",
            color: "white",
          }}
        >
          Payment Methods
        </button>
      </h2>
      <Collapse id="collapseTwo" className="accordion-collapse" isOpen={col3}>
        <div className="accordion-body">
          <Row>
            <Col xs="12">
              <Card>
                <CardBody>
                  {contacts ? (
                    <TableContainer
                      columns={columns}
                      data={contacts}
                      paymentsProvidersTable={true}
                      isAddOrder={true}
                      onClickNewContactProvider={onClickNewContactProvider}
                      //  handleOrderClicks={() => onClickAddNew()}
                    />
                  ) : null}
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
        <AddContactProviderModal
          addContactModal={addContactModal}
          setAddContactModal={setAddContactModal}
          onClickNewContactProvider={onClickNewContactProvider}
        />
        <EditContactProviderModal
          editContactModal={editContactModal}
          setEditContactModal={setEditContactModal}
          onClickEditContactProvider={onClickEditContactProvider}
          contactID={contactID}
        />
      </Collapse>
    </div>
  );
};

export default PaymentMethods;
