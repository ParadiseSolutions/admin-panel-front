import React, { useEffect, useState } from "react";
import { Row, Table, UncontrolledTooltip } from "reactstrap";
import { useParams } from "react-router-dom";
import {
  deletePolicyAPI,
  getCancellationPolicyAPI,
} from "../../../../Utils/API/Providers/index.js";
import CancellationPolicyModal from "./Modals/cancellationPolicyModal.jsx";
import Swal from "sweetalert2";

const CancellationPolicy = () => {
  const { id } = useParams();
  const [initialData, setInitialData] = useState([]);
  const [idEdit, setIdEdit] = useState(null);
  const [cancellationPolicyModalAction, setCancellationPolicyModalAction] =
    useState(false);
  //initial request
  useEffect(() => {
    getCancellationPolicyAPI(id).then((res) => {
      setInitialData(res.data.data);
    });
  }, [id]);

  const refresh = () => {
    getCancellationPolicyAPI(id).then((res) => {
      setInitialData(res.data.data);
    });
  };

  //delete
  const deletePolicy = (id) => {
    Swal.fire({
      title: "Delete Policy?",
      icon: "question",
      // text: `Do you want delete ${depData.first_name}`,
      showCancelButton: true,
      confirmButtonText: "Yes",
      confirmButtonColor: "#F38430",
      cancelButtonText: "Cancel",
    }).then((resp) => {
      deletePolicyAPI(id)
        .then((res) => {
          refresh();
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
      <div className="col-12 m-1 d-flex flex-col align-items-end justify-content-end">
        <p
          className="cursor-pointer text-paradise"
          onClick={() =>
            setCancellationPolicyModalAction(!cancellationPolicyModalAction)
          }
        >
          + Add Policy
        </p>
      </div>
      <div
        className="col-12 d-flex flex-col table-responsive"
        style={{ height: "127px" }}
      >
        <Table>
          <thead>
            <tr>
              <th>If Cancelled</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {initialData.map((item, index) => {
              return (
                <tr key={index}>
                  <td>{item.ifcancel_label}</td>
                  <td>{item.action_label}</td>
                  <td>
                    <div className="d-flex gap-3">
                      <div className="text-success">
                        <i
                          className="mdi mdi-pencil-outline font-size-18 text-paradise"
                          id="edittooltipCancellation"
                          style={{ cursor: "pointer" }}
                          onClick={() => {
                            setIdEdit(item.id);
                            setCancellationPolicyModalAction(true);
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
      <CancellationPolicyModal
        cancellationPolicyModalAction={cancellationPolicyModalAction}
        setCancellationPolicyModalAction={setCancellationPolicyModalAction}
        refresh={refresh}
        idEdit={idEdit}
        setIdEdit={setIdEdit}
      />
    </Row>
  );
};

export default CancellationPolicy;
