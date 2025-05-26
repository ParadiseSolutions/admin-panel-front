import React, { useEffect, useState } from "react";
import { Row, Table, UncontrolledTooltip } from "reactstrap";
import { useParams } from "react-router-dom";
import {
  deleteContactAPI,
  deletePaymentPolicyAPI,
  getOperationalContactsAPI,
} from "../../../../../Utils/API/Providers/index.js";
import Swal from "sweetalert2";
import OperationalContactModal from "../../modals/OperationalContactModal.jsx";

const GroupsContacts = ({ availabilityData, refreshData }) => {
  const { id } = useParams();

  const [operationalContactAction, setOperationalContactAction] =
    useState(false);
  const [idEdit, setIdEdit] = useState(null);
  const [editData, setEditData] = useState(null);
  

  //delete
  const deletePolicy = (id) => {
    Swal.fire({
      title: "Delete Contact?",
      icon: "question",
      // text: `Do you want delete ${depData.first_name}`,
      showCancelButton: true,
      confirmButtonText: "Yes",
      confirmButtonColor: "#F38430",
      cancelButtonText: "Cancel",
    }).then((resp) => {
      deleteContactAPI(id)
        .then((res) => {
           refreshData();
          Swal.fire({
            icon: "success",
            title: "Deleted!",
            text: "Policy has been deleted.",
          });
        })
        .catch((err) => {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong!",
          });
        });
    });
  };
  return (
    <Row className="col-12 m-1 d-flex flex-col">
      <div
        className="col-12 d-flex flex-col table-responsive"
        style={{ height: "127px" }}
      >
        <Table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Channel</th>
              <th>Contact</th>
              <th>Schedule</th>
              <th>Urgent Assistance</th>
              <th>Urgent Schedule</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {availabilityData?.map((item, index) => {
              return (
                <tr key={index}>
                  <td>{item.contact_name}</td>
                  <td>{item.channel_name}</td>
                  <td>{item.contact}</td>
                  <td>
                    {item.available_from} - {item.available_to}
                  </td>
                  <td> {item.urgent_assistance_label}</td>
                  <td>
                    {item.urgent_from} - {item.urgent_to}
                  </td>
                  <td>
                    <div className="d-flex gap-3">
                      <div className="text-success">
                        <i
                          className="mdi mdi-pencil-outline font-size-18 text-paradise"
                          id="edittooltipCancellation"
                          style={{ cursor: "pointer" }}
                          onClick={() => {
                            setEditData(item.id);
                            setOperationalContactAction(true);
                          }}
                        />
                        <UncontrolledTooltip
                          placement="top"
                          target="edittooltipCancellation"
                        >
                          Edit
                        </UncontrolledTooltip>
                      </div>

                      <div
                        className="text-danger"
                        onClick={() => {
                          deletePolicy(item.id);
                        }}
                      >
                        <i
                          className="mdi mdi-delete-outline font-size-18"
                          id="deletetooltipCancellation"
                          style={{ cursor: "pointer" }}
                        />
                        <UncontrolledTooltip
                          placement="top"
                          target="deletetooltipCancellation"
                        >
                          Delete
                        </UncontrolledTooltip>
                      </div>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
      <OperationalContactModal
        operationalContactAction={operationalContactAction}
        setOperationalContactAction={setOperationalContactAction}
        refreshData={refreshData}
        editData={editData}
        // setIdEdit={setIdEdit}
      />
    </Row>
  );
};

export default GroupsContacts;
