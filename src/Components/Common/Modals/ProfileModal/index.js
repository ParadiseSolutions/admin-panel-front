import { useEffect, useState } from "react";
import { getUserAPI } from "../../../../Utils/API/Users";
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
import user4 from '../../../Assets/images/users/avatar-7.jpg'
import { map } from "lodash";
import Swal from "sweetalert2";
const MyProfileModal = ({ profileModal, setProfileModal, token }) => {
 

  const [userData, setUserData] = useState([])
  useEffect(() => {
     getUserAPI(token.user.id).then((resp) =>{
        setUserData(resp.data.data)
     })
  }, [profileModal, token]);

  console.log(userData)

  const validationType = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,
    initialValues: {
      first_name: userData ? userData.first_name : "",
      last_name: userData ? userData.last_name : "",
      email: userData ? userData.email : "",
      phone_number: userData ? userData.phone_number : '',
      job_title: userData ? userData.job_title : "",
      department: userData ? userData.department : "",
    },
    validationSchema: Yup.object().shape({
      first_name: Yup.string().required("First Name is required"),
      last_name: Yup.string().required("Last Name is required"),
      phone_number: Yup.string().required("Phone Number is required"),
    }),
    // onSubmit: (values) => {
    //   let data = {
    //     first_name: values.first_name,
    //     last_name: values.last_name,
    //     email: values.email,
    //     password: values.password,
    //     job_title: values.job_title,
    //   };
    // },
  });
  return (
    <Modal
      centered
      size="xl"
      isOpen={profileModal}
      toggle={() => {
        // onClickAddNew();
      }}
    >
      <div
        className="modal-header"
        style={{ backgroundColor: "#3DC7F4", border: "none" }}
      >
        <h1 className="modal-title mt-0 text-white">+ My Profile</h1>
        <button
          onClick={() => {
            setProfileModal(false);
          }}
          type="button"
          className="close"
          style={{color:'white'}}
          data-dismiss="modal"
          aria-label="Close"
        >
          <span aria-hidden="true" className="text-white bg-white">
            &times;
          </span>
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
            <Col className="col-4 p-5">

            <img
                  className="rounded-circle"
                  src={user4}
                  alt="Header Avatar"
                />
            </Col>
            <Col className=" p-5">
              <Row>
                <Col className="col-6">
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
                <Col className="col-6">
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
                <Col className="col-6">
                  <div className="form-outline mb-4">
                    <Label className="form-label">E-mail Address</Label>
                    <Input
                      name="email"
                      placeholder=""
                      type="text"
                     disabled
                     onChange={validationType.handleChange}
                     onBlur={validationType.handleBlur}
                     value={validationType.values.email || ""}
                    />
                  
                  </div>
                </Col>
                <Col className="col-6">
                  <div className="form-outline mb-4">
                    <Label className="form-label">Phone Number</Label>
                    <Input
                      name="phone_number"
                      placeholder=""
                      type="text"
                      onChange={validationType.handleChange}
                      onBlur={validationType.handleBlur}
                      value={validationType.values.phone_number || ""}
                      invalid={
                        validationType.touched.phone_number &&
                        validationType.errors.phone_number
                          ? true
                          : false
                      }
                    />
                    {validationType.touched.phone_number &&
                    validationType.errors.phone_number ? (
                      <FormFeedback type="invalid">
                        {validationType.errors.phone_number}
                      </FormFeedback>
                    ) : null}
                  </div>
                </Col>
              </Row>
              <Row>
                <Col className="col-6">
                  <div className="form-outline mb-4">
                    <Label className="form-label">Department</Label>
                    <Input
                      name="department"
                      placeholder=""
                      disabled
                      type="text"
                      onChange={validationType.handleChange}
                      onBlur={validationType.handleBlur}
                      value={validationType.values.department || ""}
                    />
                   
                  </div>
                </Col>
                <Col className="col-6">
                  <div className="form-outline mb-4">
                    <Label className="form-label">Job Title</Label>
                    <Input
                      name="job_title"
                      placeholder=""
                      type="text"
                     disabled
                     onChange={validationType.handleChange}
                     onBlur={validationType.handleBlur}
                     value={validationType.values.job_title || ""}
                    />
                    
                  </div>
                </Col>
              </Row>
              <Row>
                <Col className="mt-2 d-flex justify-content-end">
                  <Button
                    type="submit"
                    style={{ backgroundColor: "#F6851F", border: "none" }}
                    className="waves-effect waves-light mb-3 btn btn-success"
                  >
                    <i className="mdi mdi-plus me-1" />
                    Save Changes
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

export default MyProfileModal;
