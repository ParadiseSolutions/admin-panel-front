import React, { useEffect, useState } from "react";
import { Row, Table, UncontrolledTooltip } from "reactstrap";
import { useParams } from "react-router-dom";
import {
  deleteDocumentAPI,
  deletePaymentPolicyAPI,
  downloadDocumentAPI,
  getDocumentsGroupsAPI,
} from "../../../../../Utils/API/Providers/index.js";
import Swal from "sweetalert2";
import DocumentsModal from "./Modals/DocumentsModal.jsx";
import { API_URL } from "../../../../../Utils/API/index.js";

const DocumentsGroup = () => {
  const { id } = useParams();
  const [initialData, setInitialData] = useState([]);
  const [idEdit, setIdEdit] = useState(null);
  const [documentsModalAction, setDocumentsModalAction] =
    useState(false);
  //initial request
  useEffect(() => {
    getDocumentsGroupsAPI(id).then((res) => {
      setInitialData(res.data.data);
    });
  }, [id]);

  const refresh = () => {
    getDocumentsGroupsAPI(id).then((res) => {
      setInitialData(res.data.data);
    });
  };

  //delete
  const deletePolicy = (id) => {
    Swal.fire({
      title: "Delete Document?",
      icon: "question",
      // text: `Do you want delete ${depData.first_name}`,
      showCancelButton: true,
      confirmButtonText: "Yes",
      confirmButtonColor: "#F38430",
      cancelButtonText: "Cancel",
    }).then((resp) => {
      deleteDocumentAPI(id)
        .then((res) => {
          refresh();
          Swal.fire({
            icon: "success",
            title: "Deleted!",
            text: "Document has been deleted.",
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
          onClick={() => setDocumentsModalAction(!documentsModalAction)}
        >
          + Add Document
        </p>
      </div>
      <div
        className="col-12 d-flex flex-col table-responsive"
        style={{ height: "127px" }}
      >
        <Table>
          <thead>
            <tr>
              <th>Document</th>
              <th>Type</th>
              <th>Date</th>
              <th>Uploaded By</th>
              <th>Format</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {initialData.map((item, index) => {
              return (
                <tr key={index}>
                  <td>
                    <a href={`${API_URL}/documents/download/${item.id}`} target="_blank" rel="noreferrer">
                    {item.file_name} 
                    </a>
                    </td>
                  <td>{item.type_name}</td>
                  <td>{item.date}</td>
                  <td>{item.created_by_name}</td>
                  <td>
                    <img
                      src={item.url_icon}
                      alt={item.extension}
                      style={{  height: 20 }}
                    />
                  </td>
                  <td>
                    <div className="d-flex gap-3">
                      <div className="text-success">
                        <i
                          className="mdi mdi-pencil-outline font-size-18 text-paradise"
                          id="edittooltipCancellation"
                          style={{ cursor: "pointer" }}
                          onClick={() => {
                            setIdEdit(item.id);
                            setDocumentsModalAction(true);
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
      <DocumentsModal
        documentsModalAction={documentsModalAction}
        setDocumentsModalAction={setDocumentsModalAction}
        refresh={refresh}
        idEdit={idEdit}
        setIdEdit={setIdEdit}
      />
    </Row>
  );
};

export default DocumentsGroup;
