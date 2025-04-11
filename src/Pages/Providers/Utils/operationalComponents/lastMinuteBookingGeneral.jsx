import React, { useEffect, useState } from "react";
import { Row, Table, UncontrolledTooltip } from "reactstrap";
import { useParams } from "react-router-dom";
import {
  deletePolicyAPI,
  getLastMinuteAPI,
} from "../../../../Utils/API/Providers/index.js";
import LastMinutePolicyModal from "./Modals/lastMinutePolicyModal.jsx";
import Swal from "sweetalert2";

const LastMinuteBooking = () => {
  const { id } = useParams();
  const [initialData, setInitialData] = useState([]);
  const [
    createLastMinutePolicyModalAction,
    setCreateLastMinutePolicyModalAction,
  ] = useState(false);
  const [idEdit, setIdEdit] = useState(null);
  //initial request
  useEffect(() => {
    getLastMinuteAPI(id).then((res) => {
      setInitialData(res.data.data);
    });
  }, [id]);

  const refresh = () => {
    getLastMinuteAPI(id).then((res) => {
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
            setCreateLastMinutePolicyModalAction(
              !createLastMinutePolicyModalAction
            )
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
              <th>Tour ID</th>
              <th>Tour</th>
              <th>Same Day</th>
              <th>Next Day</th>
              <th>Notice</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {initialData.map((item, index) => {
              return (
                <tr key={index}>
                  <td>{item.tour_id}</td>
                  <td>pending</td>
                  <td>{item.same_day}</td>
                  <td>{item.next_day}</td>
                  <td>{item.notice_label}</td>
                  <td>
                    <div className="d-flex gap-3">
                      <div className="text-success">
                        <i
                          className="mdi mdi-pencil-outline font-size-18 text-paradise"
                          id="edittooltipLM"
                          style={{ cursor: "pointer" }}
                          onClick={() => {
                            setIdEdit(item.id);
                            setCreateLastMinutePolicyModalAction(true);
                          }}
                        />
                        <UncontrolledTooltip
                          placement="top"
                          target="edittooltipLM"
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
                          id="deletetooltipLM"
                          style={{ cursor: "pointer" }}
                        />
                        <UncontrolledTooltip
                          placement="top"
                          target="deletetooltipLM"
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
      <LastMinutePolicyModal
        setCreateLastMinutePolicyModalAction={
          setCreateLastMinutePolicyModalAction
        }
        createLastMinutePolicyModalAction={createLastMinutePolicyModalAction}
        refresh={refresh}
        idEdit={idEdit}
        setIdEdit={setIdEdit}
      />
    </Row>
  );
};

export default LastMinuteBooking;
