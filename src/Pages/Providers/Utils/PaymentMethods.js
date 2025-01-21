import { useEffect, useMemo, useState } from "react";
import { deleteContactAPI } from "../../../Utils/API/Contacts";
import TableContainer from "../../../Components/Common/TableContainer";
import PaymentMethodModal from "../../../Components/Common/Modals/PaymentMethodModal/PaymentMethodModal";

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
import ACHElements from "./PaymentsComponents/ACHElements";
import CreditCardElements from "./PaymentsComponents/CreditCardElements";
import { getMethodInfo } from "../../../Utils/API/Operators";
import PaypalElement from "./PaymentsComponents/PaypalElement";
import WesternUnionElements from "./PaymentsComponents/WesternUnionElements";
import WireTransferElement from "./PaymentsComponents/WiredTransferElements";
import ZelleElements from "./PaymentsComponents/ZelleElements";
import VenmoElements from "./PaymentsComponents/VenmoElements";
const PaymentMethods = ({ contacts, id }) => {
  const [col3, setcol3] = useState(false);
  const [addContactModal, setAddContactModal] = useState(false);
  const [editContactModal, setEditContactModal] = useState(false);
  const [contactID, setContactID] = useState(false);

  function togglecol1() {
    setcol3(!col3);
  }
// table request
const [tableData, setTableData] = useState([]);

useEffect(() => {
  getMethodInfo(id).then((resp) =>{
    setTableData(resp.data.data);
  })
}, []);
  const onClickNewContactProvider = () => {
    setAddContactModal(!addContactModal);
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

  console.log(tableData);
  const columns = useMemo(
    () => [
      {
        Header: "Type",
        accessor: "first_name",
        disableFilters: true,
        filterable: false,
        Cell: (cellProps) => {
          const methodData = cellProps.row.original;
          return <p className="fw-bold">{methodData.payment_type.name}</p>;
        },
      },
      {
        Header: "Specifications",
        accessor: "",
        disableFilters: true,
        filterable: false,
        Cell: (cellProps) => {
          const methodData = cellProps.row.original;
          switch (methodData.payment_type.id) {
            case 1:
                return <ACHElements methodData={methodData} />;
            case 2:
                return <CreditCardElements methodData={methodData} />;
            case 3:
                return <PaypalElement methodData={methodData} />;
            
            case 4:
                return <WesternUnionElements methodData={methodData} />;
            
            case 5:
                return <WireTransferElement methodData={methodData} />;
            
            case 6:
                return <ZelleElements methodData={methodData} />;
            case 7:
                return <VenmoElements methodData={methodData} />;
            
            default:
                return null;}
        },
      },
      {
        Header: "E-mail",
        accessor: "",
        disableFilters: true,
        filterable: false,
        Cell: (cellProps) => {
          const methodData = cellProps.row.original;
          return <p className="fw-bold">{methodData.email}</p>;
        },
      },
      {
        Header: "Currency",
        accessor: "",
        disableFilters: true,
        filterable: false,
        Cell: (cellProps) => {
          const methodData = cellProps.row.original;
          return <p className="fw-bold">{methodData.currency}</p>;
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
                      data={tableData}
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
        <PaymentMethodModal
          addContactModal={addContactModal}
          setAddContactModal={setAddContactModal}
          onClickNewContactProvider={onClickNewContactProvider}
        />
       
      </Collapse>
    </div>
  );
};

export default PaymentMethods;
