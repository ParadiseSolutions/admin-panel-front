import React, { useEffect, useState } from "react";
import { departmentsData } from "../../../../Utils/Redux/Actions/DepartmentsActions";
import { rolesData } from "../../../../Utils/Redux/Actions/RolesActions";
import {
  getUserAPI,
  editUserAPI,
  getRolesDepAPI,
  getUserDepAPI,
} from "../../../../Utils/API/Users";
import { useSelector, useDispatch } from "react-redux";
import {
  Row,
  Col,
  Modal,
  Form,
  Label,
  Input,
  FormFeedback,
  Button,
} from "reactstrap";
import * as Yup from "yup";
import { useFormik } from "formik";
import { map } from "lodash";
import Swal from "sweetalert2";

const EditUserModal = ({ userId, editModal, setEditModal, onClickEdit }) => {
  //user data Request
  const [data, setData] = useState();
  useEffect(() => {
    if (userId) {
      getUserAPI(userId).then((resp) => {
        setData(resp.data.data);
      });
    }
  }, [userId]);

  //departments request
  const [dataDepartments, setDataDepartments] = useState([]);
  const [dataRoles, setDataRoles] = useState([]);
  useEffect(() => {
    getUserDepAPI().then((resp) => {
      setDataDepartments(resp.data.data);
    });
    getRolesDepAPI().then((response) => {
      setDataRoles(response.data.data);
    });
  }, []);
  // selects
  const [department, setDepartment] = useState([]);
  const onChangeSelectionDep = (value) => {
    setDepartment(value);
  };
  const [rol, setRol] = useState([]);
  const onChangeSelectionRol = (value) => {
    setRol(value);
  };

  const validationType = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,
    initialValues: {
      first_name: data ? data.first_name : "",
      last_name: data ? data.last_name : "",
      email: data ? data.email : "",
      password: "",
      repeat_password: "",
      job_title: data ? data.job_title : "",
      role: "",
      department: "",
    },
    validationSchema: Yup.object().shape({
      first_name: Yup.string().required("First Name is required"),
      last_name: Yup.string().required("Last Name is required"),
      email: Yup.string()
        .email("Must be a valid Email")
        .max(255)
        .required("Email is required"),

      job_title: Yup.string().required("Job Title is required"),
    }),
    onSubmit: (values) => {
      let data = {
        department_id: department,
        role_id: rol,
        first_name: values.first_name,
        last_name: values.last_name,
        email: values.email,
        job_title: values.job_title,
      };

      editUserAPI(userId, data)
        .then((resp) => {
          if (resp.data.status === 200) {
            Swal.fire("Edited!", "The User has been edited.", "success").then(
              () => {
                setEditModal(false);
              }
            );
          }
        })
        .catch((error) => {
          console.log(error.response);
          Swal.fire("Error!", `${error.response.data.data[0]}`, "error");
        });
    },
  });

  return (
    <Modal
      size="lg"
      isOpen={editModal}
      toggle={() => {
        onClickEdit();
      }}
    >
      <div
        className="modal-header"
        style={{ backgroundColor: "#3DC7F4", border: "none" }}
      >
        <h1 className="modal-title mt-0 text-white">+ Edit User</h1>
        <button
          onClick={() => {
            setEditModal(false);
          }}
          type="button"
          className="close"
          data-dismiss="modal"
          aria-label="Close"
        >
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div className="modal-body">
        <Form
          onSubmit={(e) => {
            e.preventDefault();
            validationType.handleSubmit();
            return false;
          }}
          className="custom-validation"
        >
          <Row>
            <Col className="col-12 mx-5">
              <Row>
                <Col lg={5}>
                  <div className="form-outline mb-4">
                    <Label className="form-label">Name</Label>
                    <Input
                      name="first_name"
                      placeholder=""
                      type="text"
                      onChange={validationType.handleChange}
                      onBlur={validationType.handleBlur}
                      value={validationType.values.first_name || ""}
                      invalid={
                        validationType.touched.first_name &&
                        validationType.errors.first_name
                          ? true
                          : false
                      }
                    />
                    {validationType.touched.first_name &&
                    validationType.errors.first_name ? (
                      <FormFeedback type="invalid">
                        {validationType.errors.first_name}
                      </FormFeedback>
                    ) : null}
                  </div>
                </Col>
                <Col className="col-5 mx-4">
                  <div className="form-outline mb-4">
                    <Label className="form-label">Last Name</Label>
                    <Input
                      name="last_name"
                      placeholder=""
                      type="text"
                      onChange={validationType.handleChange}
                      onBlur={validationType.handleBlur}
                      value={validationType.values.last_name || ""}
                      invalid={
                        validationType.touched.last_name &&
                        validationType.errors.last_name
                          ? true
                          : false
                      }
                    />
                    {validationType.touched.last_name &&
                    validationType.errors.last_name ? (
                      <FormFeedback type="invalid">
                        {validationType.errors.last_name}
                      </FormFeedback>
                    ) : null}
                  </div>
                </Col>
              </Row>

              <Row>
                <Col lg={5}>
                  <div className="form-outline mb-4">
                    <Label className="form-label">Email</Label>
                    <Input
                      name="email"
                      placeholder=""
                      type="text"
                      onChange={validationType.handleChange}
                      onBlur={validationType.handleBlur}
                      value={validationType.values.email || ""}
                      invalid={
                        validationType.touched.email &&
                        validationType.errors.email
                          ? true
                          : false
                      }
                    />
                    {validationType.touched.email &&
                    validationType.errors.email ? (
                      <FormFeedback type="invalid">
                        {validationType.errors.email}
                      </FormFeedback>
                    ) : null}
                  </div>
                </Col>
                <Col className="col-5 mx-4">
                  <div className="form-outline mb-4">
                    <Label className="form-label">Job Title</Label>
                    <Input
                      name="job_title"
                      placeholder=""
                      type="text"
                      onChange={validationType.handleChange}
                      onBlur={validationType.handleBlur}
                      value={validationType.values.job_title || ""}
                      invalid={
                        validationType.touched.job_title &&
                        validationType.errors.job_title
                          ? true
                          : false
                      }
                    />
                    {validationType.touched.job_title &&
                    validationType.errors.job_title ? (
                      <FormFeedback type="invalid">
                        {validationType.errors.job_title}
                      </FormFeedback>
                    ) : null}
                  </div>
                </Col>
              </Row>
              <Row>
                <Col lg={5}>
                  <div className="form-outline mb-4">
                    <Label className="form-label">Department</Label>

                    <Input
                      type="select"
                      name="department"
                      onChange={(e) => onChangeSelectionDep(e.target.value)}
                      onBlur={validationType.handleBlur}
                      //   value={validationType.values.department || ""}
                    >
                      <option>Select....</option>
                      {map(dataDepartments, (department, index) => {
                        return (
                          <option
                            selected={
                              data && data.department_id === department.id
                                ? true
                                : false
                            }
                            value={department.id}
                          >
                            {department.name}
                          </option>
                        );
                      })}
                    </Input>
                  </div>
                </Col>
                <Col className="col-5 mx-4">
                  <div className="form-outline mb-4">
                    <Label className="form-label">Rol</Label>

                    <Input
                      type="select"
                      name="roles"
                      onChange={(e) => onChangeSelectionRol(e.target.value)}
                      onBlur={validationType.handleBlur}
                      //   value={validationType.values.department || ""}
                    >
                      <option>Select....</option>
                      {map(dataRoles, (rol, index) => {
                        return (
                          <option
                            selected={
                              data && data.role_id === rol.id ? true : false
                            }
                            value={rol.id}
                          >
                            {rol.name}
                          </option>
                        );
                      })}
                    </Input>
                  </div>
                </Col>
              </Row>
              <Row>
                <Col className="col-10 mx-4 mt-2 d-flex justify-content-end">
                  <Button
                    type="submit"
                    style={{ backgroundColor: "#F6851F", border: "none" }}
                    className="waves-effect waves-light mb-3 btn btn-success"
                  >
                    <i className="mdi mdi-plus me-1" />
                    Submit
                  </Button>
                </Col>
              </Row>
            </Col>
          </Row>
        </Form>
      </div>
    </Modal>
  );
};

export default EditUserModal;
