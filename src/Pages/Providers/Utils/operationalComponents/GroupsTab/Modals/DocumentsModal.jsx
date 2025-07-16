import { useEffect, useState } from "react";
import {
  Row,
  Col,
  Form,
  Label,
  Input,
  FormFeedback,
  Button,
  UncontrolledTooltip,
  Modal,
} from "reactstrap";
import axios from "axios";
import { useFormik } from "formik";
import Swal from "sweetalert2";
import { map } from "lodash";
import { useParams } from "react-router-dom";
import CancellationBanner from "../../../../../../Components/Assets/images/CancellationBanner.png";
import {
  createPaymentGroupPolicy,
  getDocumentEditGroupsAPI,
  getDocumentTypeGroupsAPI,
  updatedocumentGroup,
  updatePaymentGroupPolicy,
} from "../../../../../../Utils/API/Providers";
import { API_URL, imagesOptions } from "../../../../../../Utils/API";

const DocumentsModal = ({
  documentsModalAction,
  setDocumentsModalAction,
  refresh,
  idEdit,
  setIdEdit,
}) => {
  const { id } = useParams();

  //initial request
  const [documentTypeData, setDocumentTypeData] = useState([]);
  const [dataEdit, setDataEdit] = useState(null);
  const [documentTypeSelected, setDocumentTypeSelected] = useState(null);
  const [fileId, setFileId] = useState(null);

  useEffect(() => {
    getDocumentTypeGroupsAPI()
      .then((res) => {
        setDocumentTypeData(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  let userInfo = localStorage.getItem("token");
  userInfo = JSON.parse(userInfo);
  //edit request
  useEffect(() => {
    if (idEdit) {
      getDocumentEditGroupsAPI(idEdit)
        .then((res) => {
          setDataEdit(res.data.data);
          setDocumentTypeSelected(res.data.data.type_id);
          setFileId(res.data.data.id);
        })
        .catch((err) => {
          //console.log(err);
        });
    }
  }, [idEdit]);

  const clearData = () => {
    setDocumentTypeSelected(null);
    setFileId(null);
    setDataEdit(null);
    setIdEdit(null);
  };

  const validationType = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,
    initialValues: {},
    // validationSchema: Yup.object().shape({
    //   name: Yup.string().required("Name is required"),
    //   default_label: Yup.string().required("Default Label is required"),
    // }),
    onSubmit: (values) => {
      let data = {
        type_id: documentTypeSelected,
      };
      updatedocumentGroup(fileId, data)
        .then((res) => {
          if (res.data.status === 200) {
            Swal.fire({
              icon: "success",
              title: "Success",
              text: "Document Saved Successfully",
            });
            refresh();
            clearData();
            setDocumentsModalAction(false);
          } else {
            Swal.fire({
              icon: "error",
              title: "Error",
              text: res.data.message,
            });
          }
        })
        .catch((err) => {
          console.log(err);
          Swal.fire({
            icon: "error",
            title: "Error",
            text: err.response.data.message,
          });
        });
    },
  });
  return (
    <Modal
      centered
      size="lg"
      isOpen={documentsModalAction}
      toggle={() => {
        setDocumentsModalAction(!documentsModalAction);
        clearData();
      }}
    >
      <div
        className="modal-header"
        style={{ backgroundColor: "#3DC7F4", border: "none" }}
      >
        <h1 className="modal-title mt-0 text-white">+ Add Document</h1>
        {/* {
          contactID === false ? (
            <h1 className="modal-title mt-0 text-white">+ Add Cancellation Policy</h1>
          ):(<h1 className="modal-title mt-0 text-white">Edit Cancellation Policy</h1>)
        } */}
        <button
          onClick={() => {
            setDocumentsModalAction(!documentsModalAction);
            clearData();
          }}
          type="button"
          className="close"
          data-dismiss="modal"
          aria-label="Close"
        >
          <span aria-hidden="true" style={{ color: "white" }}>
            &times;
          </span>
        </button>
      </div>
      <div className="modal-body p-4">
        <Form
          onSubmit={(e) => {
            e.preventDefault();
            validationType.handleSubmit();
          }}
          className="custom-validation"
        >
          <Row className=" d-flex justify-content-between pb-4 ">
            <Col className="col-md-12">
              <img src={CancellationBanner} alt="image1" className="w-100" />
            </Col>
          </Row>
          <Row>
            <Col className="col-6">
              <div className="d-flex justify-content-between">
                <Label className="form-label">Upload Document</Label>
                <div>
                  <i
                    className="uil-question-circle font-size-15"
                    id="boat_type"
                  />
                  <UncontrolledTooltip
                    autohide={true}
                    placement="top"
                    target="boat_type"
                  >
                    Choose the type of boat you are defining.
                  </UncontrolledTooltip>
                </div>
              </div>

              <Input
                type="file"
                id="fileInput"
                name="file"
                // accept=".pdf, .doc, .docx, .xls, .xlsx, .ppt, .pptx, .txt"
                onChange={(e) => {
                  const file = e.target.files[0];
                  const formData = new FormData();
                  formData.append("document", file);
                  formData.append("provider_id", id);
                  formData.append("type_id", documentTypeSelected);
                  formData.append("user_id", userInfo.user.id);
                  if (fileId) {
                    formData.append("document_id", fileId);
                  }
                  axios
                    .post(
                      `${API_URL}/operational-info/document-edit`,
                      formData,
                      {
                        headers: imagesOptions,
                      }
                    )
                    .then((response) => {
                      console.log("respuesta", response);
                      setFileId(response.data.id);
                    })
                    .catch((error) => {
                      console.error(error);
                    });
                }}
              />
            </Col>
            <Col className="col-6">
              <div className="d-flex justify-content-between">
                <Label className="form-label">Document Type</Label>
                <div>
                  <i
                    className="uil-question-circle font-size-15"
                    id="boat_type"
                  />
                  <UncontrolledTooltip
                    autohide={true}
                    placement="top"
                    target="boat_type"
                  >
                    Choose the type of boat you are defining.
                  </UncontrolledTooltip>
                </div>
              </div>
              <Input
                type="select"
                name=""
                onChange={(e) => {
                  setDocumentTypeSelected(+e.target.value);
                }}
                onBlur={validationType.handleBlur}
                //   value={validationType.values.department || ""}
              >
                <option value={null}>Select....</option>
                {map(documentTypeData, (item, index) => {
                  return (
                    <option
                      key={index}
                      value={item.id}
                      selected={dataEdit ? item.id === dataEdit.type_id : false}
                    >
                      {item.name}
                    </option>
                  );
                })}
              </Input>
            </Col>
          </Row>
          <Row className="mt-2">
            <Col className="col-12 mt-4 d-flex justify-content-end">
              <Button
                color="paradise"
                outline
                className="waves-effect waves-light mb-3 btn col-2 mx-2"
                type="button"
                onClick={() => {
                  setDocumentsModalAction(false);
                  setIdEdit(null);
                  clearData();
                }}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                style={{ backgroundColor: "#F6851F", border: "none" }}
                className="waves-effect waves-light mb-3 btn btn-success mx-1 col-2"
              >
                Save
              </Button>
            </Col>
          </Row>
        </Form>
      </div>
    </Modal>
  );
};

export default DocumentsModal;
