import React, { useEffect, useState } from "react";
import { departmentsData } from "../../../Utils/Redux/Actions/DepartmentsActions";
import { rolesData } from "../../../Utils/Redux/Actions/RolesActions";
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
import Select from "react-select";
import * as Yup from "yup";
import { useFormik } from "formik";
import { map } from "lodash";
import Swal from "sweetalert2";

const AddUserModal = ({ addModal, setAddModal, onClickAddNew }) => {
  const dispatch = useDispatch();
  //departments request
  useEffect(() => {
    const departmentsRequest = () => dispatch(departmentsData());
    departmentsRequest();
  }, [dispatch]);

    //roles request
    useEffect(() => {
      const rolesRequest = () => dispatch(rolesData());
      rolesRequest();
    }, [dispatch]);
  
    //get info
    const dataRoles = useSelector(
        (state) => state.roles.roles.data
        );
    const dataDepartments = useSelector(
        (state) => state.departments.departments.data
      );
  // selects
  const [department, setDepartment] = useState([])
  const onChangeSelectionDep = (value) => {
    setDepartment(value);
  };
  const [rol, setRol] = useState([])
  const onChangeSelectionRol = (value) => {
    setRol(value);
  };


  const validationType = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,
    initialValues: {
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      repeat_password: "",
      job_title: "",
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
      password: Yup.string().required("This value is required"),
      repeat_password: Yup.string().when("password", {
        is: (val) => (val && val.length > 0 ? true : false),
        then: Yup.string().oneOf(
          [Yup.ref("password")],
          "Both password need to be the same"
        ),
      }),
      job_title: Yup.string().required("Job Title is required"),
    }),
    onSubmit: (values) => {
      console.log(values);
      //   let data = {
      //     name: values.name,
      //   };
      //   console.log(data);
      //   createRol(data)
      //     .then((resp) => {
      //       console.log(resp.data);
      //       if (resp.data.status === 201) {
      //         Swal.fire(
      //           "Created!",
      //           "The Rol has been created.",
      //           "success"
      //         ).then(() => {
      //           history.goBack();
      //         });
      //       }
      //     })
      //     .catch((error) => {
      //       console.log(error.response);
      //       Swal.fire(
      //         "Error!",
      //         `${
      //           error.response.data.data[0]
      //         }`,
      //         "error"
      //       );
      //     });
    },
  });

  return (
    <Modal
      size="lg"
      isOpen={addModal}
      toggle={() => {
        onClickAddNew();
      }}
    >
      <div className="modal-header">
        <h5 className="modal-title mt-0" id="myLargeModalLabel">
          Add New User
        </h5>
        <button
          onClick={() => {
            setAddModal(false);
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
                    <Label className="form-label">Password</Label>
                    <Input
                      name="password"
                      placeholder=""
                      type="password"
                      onChange={validationType.handleChange}
                      onBlur={validationType.handleBlur}
                      value={validationType.values.password || ""}
                      invalid={
                        validationType.touched.password &&
                        validationType.errors.password
                          ? true
                          : false
                      }
                    />
                    {validationType.touched.password &&
                    validationType.errors.password ? (
                      <FormFeedback type="invalid">
                        {validationType.errors.password}
                      </FormFeedback>
                    ) : null}
                  </div>
                </Col>
                <Col className="col-5 mx-4">
                  <div className="form-outline mb-4">
                    <Label className="form-label">Repeat Password</Label>
                    <Input
                      name="repeat_password"
                      placeholder=""
                      type="password"
                      onChange={validationType.handleChange}
                      onBlur={validationType.handleBlur}
                      value={validationType.values.repeat_password || ""}
                      invalid={
                        validationType.touched.repeat_password &&
                        validationType.errors.repeat_password
                          ? true
                          : false
                      }
                    />
                    {validationType.touched.repeat_password &&
                    validationType.errors.repeat_password ? (
                      <FormFeedback type="invalid">
                        {validationType.errors.repeat_password}
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
                          <option value={department.id}>
                            {department.name}
                          </option>
                        );
                      })}
                    </Input>
                  </div>
                </Col>
                <Col  className="col-5 mx-4">
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
                          <option value={rol.id}>
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

export default AddUserModal;
