import { useEffect, useState } from "react";
import { getUserAPI } from "../../../../Utils/API/Users";
import { editUserAPI } from "../../../../Utils/API/Users";
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

const MyProfileModal = ({ profileModal, setProfileModal, token }) => {
 

  const [userData, setUserData] = useState([])
  const [profilePicture, setProfilePicture] = useState("");
  useEffect(() => {
     getUserAPI(token.user.id).then((resp) =>{
        setUserData(resp.data.data)
     })
    setProfilePicture(token.user.picture)
  }, [profileModal, token]);

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
    onSubmit: (values) => {
      let data = {
        first_name: values.first_name,
        last_name: values.last_name,
        phone_number: values.phone_number,
        department_id: userData.department_id,
        email: userData.email,
        role_id: userData.role_id,

      };

      editUserAPI(userData.id, data).then((resp) =>{
        // console.log(resp)
        setProfileModal(false);
      })
    },

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
      <div className="modal-body py-5 pe-5">
        <Form
          onSubmit={(e) => {
            e.preventDefault();
            validationType.handleSubmit();
            return false;
          }}
          className="custom-validation"
        >
          <Row>
            <Col className="col-4 d-flex justify-content-center">
            <div className="p-1">
            <img
                  className="rounded-circle img-fluid border border-5 border-paradise"
                  src={profilePicture}
                  alt="Header Avatar"
                />
            </div>
            
            </Col>
            <Col>
              <Row>
                <Col className="col-6">
                  <div className="form-outline mb-4">
                    <Label className="form-label">Name</Label>
                    <Input
                      name="first_name"
                      placeholder=""
                      type="text"
                      disabled="true"
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
                      disabled="true"
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
                      type="tel"
                      inputMode="numeric"
                      onKeyPress={(e) => !/[0-9]/.test(e.key) && e.preventDefault()}
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
                    className="waves-effect waves-light mb-3 btn btn-success btn-orange"
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
