import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom";
import { Row, Table, UncontrolledTooltip } from "reactstrap";
import { deletePolicyAPI, getChangePolicyAPI } from "../../../../../Utils/API/Providers";
import ChangePolicyModal from "./Modals/changePolicyModal";
import Swal from "sweetalert2";

const ChangePolicy = () => {
  const { id } = useParams();
  const [initialData, setInitialData] = useState([]);
  const [changePolicyModalAction, setChangePolicyModalAction] = useState(false);
  const [idEdit, setIdEdit] = useState(null);
  //initial request
  useEffect(() => {
    getChangePolicyAPI(id).then((res) => {
      setInitialData(res.data.data);
    });
  }, [id]);

  const refresh = () => {
    getChangePolicyAPI(id).then((res) => {
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
          onClick={() => setChangePolicyModalAction(!changePolicyModalAction)}
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
                          id="edittooltipChange"
                          style={{ cursor: "pointer" }}
                          onClick={() => {
                            setIdEdit(item.id);
                            setChangePolicyModalAction(true);
                          }}
                        />
                        <UncontrolledTooltip
                          placement="top"
                          target="edittooltipChange"
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
                          id="deletetooltipChange"
                          style={{ cursor: "pointer" }}
                        />
                        <UncontrolledTooltip
                          placement="top"
                          target="deletetooltipChange"
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
      <ChangePolicyModal
        changePolicyModalAction={changePolicyModalAction}
        setChangePolicyModalAction={setChangePolicyModalAction}
        refresh={refresh}
        idEdit={idEdit}
        setIdEdit={setIdEdit}
      />
    </Row>
  );
};

export default ChangePolicy;
