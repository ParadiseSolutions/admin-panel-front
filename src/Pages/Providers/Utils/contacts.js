import { useMemo, useState } from "react";
import { deleteContactAPI } from "../../../Utils/API/Contacts";
import TableContainer from "../../../Components/Common/TableContainer";
import AddContactProviderModal from "../../../Components/Common/Modals/ContactsProviderModal/addContactProviderModal";
import {
  Name,
  Department,
  Active,
  LastName,
  
} from "./ProvidersCols";
import { Collapse, Row, Col, Card, CardBody,   UncontrolledTooltip, } from "reactstrap";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import classnames from "classnames";
import EditContactProviderModal from "../../../Components/Common/Modals/ContactsProviderModal/editContactProviderModal";
const Contacts = ({contacts}) => {

  const [col2, setcol2] = useState(false);
  const [addContactModal, setAddContactModal] = useState(false)
  const [editContactModal, setEditContactModal] = useState(false)
  const [contactID, setContactID] = useState(false)
  
  function togglecol1() {
    setcol2(!col2);
  }


  const onClickNewContactProvider = () => {
    setAddContactModal(!addContactModal)
  };
  const onClickEditContactProvider = () => {
    setEditContactModal(!editContactModal)
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
            
            Swal.fire(
              "Deleted!",
              "Contact has been deleted.",
              "success"
            );
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
        Header: "Position",
        accessor: "job_title",
        disableFilters: true,
        filterable: false,
        Cell: (cellProps) => {
          return <Department {...cellProps} />;
        },
      },
      {
        Header: "Mobile",
        accessor: "mobile_phone",
        disableFilters: true,
        filterable: false,
        Cell: (cellProps) => {
          return <Department {...cellProps} />;
        },
      },
      {
        Header: "Email",
        accessor: "primary_email",
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
              
              
              <div 
              onClick={() => {
                setContactID(providersData.id)
                setEditContactModal(true)}}
              className="text-info">
                <i
                  className="mdi mdi-pencil font-size-18"
                  id="edittooltip"
                  
                />
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
              collapsed: !col2,
            })}
            type="button"
            onClick={togglecol1}
            style={{
              cursor: "pointer",
              backgroundColor: "#F6851F",
              color: "white",
            }}
          >
            Contacts
          </button>
        </h2>
        <Collapse id="collapseTwo" className="accordion-collapse" isOpen={col2}>
          <div className="accordion-body">
          <Row>
          <Col xs="12">
            <Card>
              <CardBody>
                {contacts ? (
                  <TableContainer
                    columns={columns}
                    data={contacts}
                    isGlobalFilter={true}
                    contactsProvidersTable={true}
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
}
 
export default Contacts;