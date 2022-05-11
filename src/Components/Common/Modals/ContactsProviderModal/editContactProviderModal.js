import { useEffect, useState } from "react";
import { getContactAPI, editContactAPI } from "../../../../Utils/API/Contacts";
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
import { useParams } from 'react-router-dom'
import * as Yup from "yup";
import { useFormik } from "formik";
import Swal from "sweetalert2";

const EditContactProviderModal = ({ editContactModal, setEditContactModal, onClickEditContactProvider, contactID }) => {
  const { id } = useParams();
  const [initialData, setInitialData] = useState()
  useEffect(() => {
    getContactAPI(contactID).then((resp) =>{
      setInitialData(resp.data.data)
    })
  }, [contactID]);

  const validationType = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,
    initialValues: {
    title: initialData ? initialData.title : "",
    job_title: initialData ? initialData.job_title : "",
    first_name: initialData ? initialData.first_name : "",
    last_name: initialData ? initialData.last_name : "",
    surname: initialData ? initialData.surname : "",
    primary_email: initialData ? initialData.primary_email : "",
    secondary_email: initialData ? initialData.secondary_email : "",
    business_phone: initialData ? initialData.business_phone : "",
    mobile_phone: initialData ? initialData.mobile_phone : "",
    notes: initialData ? initialData.notes : "",
    whatsapp: initialData ? initialData.whatsapp : "",
    skype: initialData ? initialData.skype : "",
    },
    validationSchema: Yup.object().shape({
      job_title: Yup.string().required("Field required"),
      first_name: Yup.string().required("Field required"),
      last_name: Yup.string().required("Field required"),
      surname: Yup.string().required("Field required"),
      primary_email:  Yup.string()
      .email("Must be a valid Email")
      .max(255)
      .required("Email is required"),
      secondary_email:  Yup.string()
      .email("Must be a valid Email")
      .max(255)
      .required("Email is required"),
      business_phone: Yup.number().required(
        "Please Enter Your Number"
      ),
      mobile_phone: Yup.number().required(
        "Please Enter Your Number"
      ),
      
    }),
    onSubmit: (values) => {

      console.log(values)
      let data = {
        foreign_key: id,
        title: values.title,
        job_title: values.job_title,
        first_name: values.first_name,
        last_name: values.last_name,
        surname: values.surname,
        whatsapp:values.whatsapp,
        primary_email: values.primary_email,
        secondary_email: values.secondary_email,
        business_phone: values.business_phone,
        mobile_phone: values.mobile_phone,
        notes: values.notes,
        skype: values.skype
      };
      editContactAPI(contactID, data)
        .then((resp) => {
          if (resp.data.status === 200) {
            Swal.fire("Edited!", "Contact has been edited.", "success").then(
              () => {
                setEditContactModal(false);
                document.location.reload()
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
    centered
      size="xl"
      isOpen={editContactModal}
      toggle={() => {
        onClickEditContactProvider();
      }}
    >
      <div
        className="modal-header"
        style={{ backgroundColor: "#3DC7F4", border: "none" }}
      >
        <h1 className="modal-title mt-0 text-white">+ Edit Contact</h1>
        <button
          onClick={() => {
            setEditContactModal(false);
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
            <Col className="col-12">
              <Row>
                <Col lg={4}>
                  <div className="form-outline mb-4">
                    <Label className="form-label">First Name</Label>
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
                <Col lg={4}>
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
                <Col lg={4}>
                  <div className="form-outline mb-4">
                    <Label className="form-label">Surname</Label>
                    <Input
                      name="surname"
                      placeholder=""
                      type="text"
                      onChange={validationType.handleChange}
                      onBlur={validationType.handleBlur}
                      value={validationType.values.surname || ""}
                      invalid={
                        validationType.touched.surname &&
                        validationType.errors.surname
                          ? true
                          : false
                      }
                    />
                    {validationType.touched.surname &&
                    validationType.errors.surname ? (
                      <FormFeedback type="invalid">
                        {validationType.errors.surname}
                      </FormFeedback>
                    ) : null}
                  </div>
                </Col>
              </Row>
              <Row>
               
                <Col lg={4}>
                  <div className="form-outline mb-4">
                    <Label className="form-label">Position</Label>
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
                <Col lg={4}>
                  <div className="form-outline mb-4">
                    <Label className="form-label">Primary Email</Label>
                    <Input
                      name="primary_email"
                      placeholder=""
                      type="text"
                      onChange={validationType.handleChange}
                      onBlur={validationType.handleBlur}
                      value={validationType.values.primary_email || ""}
                      invalid={
                        validationType.touched.primary_email &&
                        validationType.errors.primary_email
                          ? true
                          : false
                      }
                    />
                    {validationType.touched.primary_email &&
                    validationType.errors.primary_email ? (
                      <FormFeedback type="invalid">
                        {validationType.errors.primary_email}
                      </FormFeedback>
                    ) : null}
                  </div>
                </Col>
                <Col lg={4}>
                  <div className="form-outline mb-4">
                    <Label className="form-label">Secondary Email</Label>
                    <Input
                      name="secondary_email"
                      placeholder=""
                      type="text"
                      onChange={validationType.handleChange}
                      onBlur={validationType.handleBlur}
                      value={validationType.values.secondary_email || ""}
                      invalid={
                        validationType.touched.secondary_email &&
                        validationType.errors.secondary_email
                          ? true
                          : false
                      }
                    />
                    {validationType.touched.secondary_email &&
                    validationType.errors.secondary_email ? (
                      <FormFeedback type="invalid">
                        {validationType.errors.secondary_email}
                      </FormFeedback>
                    ) : null}
                  </div>
                </Col>
              </Row>
              <Row>
                <Col lg={3}>
                  <div className="form-outline mb-4">
                    <Label className="form-label">Phone</Label>
                    <Input
                      name="business_phone"
                      placeholder=""
                      type="text"
                      onChange={validationType.handleChange}
                      onBlur={validationType.handleBlur}
                      value={validationType.values.business_phone || ""}
                      invalid={
                        validationType.touched.business_phone &&
                        validationType.errors.business_phone
                          ? true
                          : false
                      }
                    />
                    {validationType.touched.business_phone &&
                    validationType.errors.business_phone ? (
                      <FormFeedback type="invalid">
                        {validationType.errors.business_phone}
                      </FormFeedback>
                    ) : null}
                  </div>
                </Col>
                <Col lg={3}>
                  <div className="form-outline mb-4">
                    <Label className="form-label">Mobile</Label>
                    <Input
                      name="mobile_phone"
                      placeholder=""
                      type="text"
                      onChange={validationType.handleChange}
                      onBlur={validationType.handleBlur}
                      value={validationType.values.mobile_phone || ""}
                      invalid={
                        validationType.touched.mobile_phone &&
                        validationType.errors.mobile_phone
                          ? true
                          : false
                      }
                    />
                    {validationType.touched.mobile_phone &&
                    validationType.errors.mobile_phone ? (
                      <FormFeedback type="invalid">
                        {validationType.errors.mobile_phone}
                      </FormFeedback>
                    ) : null}
                  </div>
                </Col>
                <Col lg={3}>
                  <div className="form-outline mb-4">
                    <Label className="form-label">Whatsapp</Label>
                    <Input
                      name="whatsapp"
                      placeholder=""
                      type="text"
                      onChange={validationType.handleChange}
                      onBlur={validationType.handleBlur}
                      value={validationType.values.whatsapp || ""}
                      invalid={
                        validationType.touched.whatsapp &&
                        validationType.errors.whatsapp
                          ? true
                          : false
                      }
                    />
                    {validationType.touched.whatsapp &&
                    validationType.errors.whatsapp ? (
                      <FormFeedback type="invalid">
                        {validationType.errors.whatsapp}
                      </FormFeedback>
                    ) : null}
                  </div>
                </Col>
                <Col lg={3}>
                  <div className="form-outline mb-4">
                    <Label className="form-label">Skype</Label>
                    <Input
                      name="skype"
                      placeholder=""
                      type="text"
                      onChange={validationType.handleChange}
                      onBlur={validationType.handleBlur}
                      value={validationType.values.skype || ""}
                      invalid={
                        validationType.touched.skype &&
                        validationType.errors.skype
                          ? true
                          : false
                      }
                    />
                    {validationType.touched.skype &&
                    validationType.errors.skype ? (
                      <FormFeedback type="invalid">
                        {validationType.errors.skype}
                      </FormFeedback>
                    ) : null}
                  </div>
                </Col>
              </Row>
              
              <Row>
                <Col className="col-12 ">
                <div className="form-outline mb-4">
                    <Label className="form-label">Notes</Label>
                    <Input
                      name="notes"
                      placeholder=""
                      type="textarea"
                      rows="5"
                      onChange={validationType.handleChange}
                      onBlur={validationType.handleBlur}
                      value={validationType.values.notes || ""}
                      invalid={
                        validationType.touched.notes &&
                        validationType.errors.notes
                          ? true
                          : false
                      }
                    />
                    {validationType.touched.notes &&
                    validationType.errors.notes ? (
                      <FormFeedback type="invalid">
                        {validationType.errors.notes}
                      </FormFeedback>
                    ) : null}
                  </div>
                </Col>
              </Row>
              <Row>
                <Col className="col-12 mt-2 d-flex justify-content-end">
                  <Button
                    type="submit"
                    style={{ backgroundColor:  "#F6851F", border: "none" }}
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

export default EditContactProviderModal;
