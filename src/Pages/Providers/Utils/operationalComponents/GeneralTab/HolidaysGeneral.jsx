import React, { useEffect, useState } from "react";
import { Row, Table, UncontrolledTooltip } from "reactstrap";
import { useParams } from "react-router-dom";
import { deleteHolidayAPI, deletePolicyAPI, getHolidaysAPI } from "../../../../../Utils/API/Providers/index.js";
import HolidaysModal from "./Modals/holidaysModal.jsx";
import Swal from "sweetalert2";

const HolidaysGeneral = () => {
  const { id } = useParams();
  const [initialData, setInitialData] = useState([]);
  const [idEdit, setIdEdit] = useState(null);
  const [holidaysModalCreate, setHolidaysModalCreate] = useState(false);
  //initial request
  useEffect(() => {
    getHolidaysAPI(id).then((res) => {
      setInitialData(res.data.data);
    });
  }, [id]);

  const refresh = () => {
    getHolidaysAPI(id).then((res) => {
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
        deleteHolidayAPI(id)
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
          onClick={() => setHolidaysModalCreate(!holidaysModalCreate)}
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
              <th>Holiday</th>
              <th>Office</th>
              <th>Schedule</th>
              <th>Tour</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {initialData.map((item, index) => {
              return (
                <tr key={index}>
                  <td>{item.holiday_name}</td>
                  <td>{item.office_status_label}</td>
                  <td>
                    {item.from} - {item.to}
                  </td>
                  <td>{item.tour_status_label}</td>
                  <td>
                    <div className="d-flex gap-3">
                      <div className="text-success">
                        <i
                          className="mdi mdi-pencil-outline font-size-18 text-paradise"
                          id="edittooltip"
                          style={{ cursor: "pointer" }}
                          onClick={() => {
                            setIdEdit(item.id);
                            setHolidaysModalCreate(true);
                          }}
                        />
                        <UncontrolledTooltip
                          placement="top"
                          target="edittooltip"
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
                          id="deletetooltip"
                          style={{ cursor: "pointer" }}
                        />
                        <UncontrolledTooltip
                          placement="top"
                          target="deletetooltip"
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
      <HolidaysModal
        holidaysModalCreate={holidaysModalCreate}
        setHolidaysModalCreate={setHolidaysModalCreate}
        refresh={refresh}
        idEdit={idEdit}
        setIdEdit={setIdEdit}
      />
    </Row>
  );
};

export default HolidaysGeneral;
