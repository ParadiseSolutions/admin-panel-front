
import { useSelector, useDispatch } from "react-redux";
import { createWebsite } from "../../Utils/API/Websites";
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  Button,
  Label,
  Input,
  FormFeedback,
  Form,
} from "reactstrap";
// Formik validation
import * as Yup from "yup";
import { useFormik } from "formik";
import { map } from "lodash";
import Swal from "sweetalert2";

const NewWebsite = () => {
 


  //get info
  const dataUsers = useSelector((state) => state.users.users.data);
  const dataModules = useSelector((state) => state.modules.modules.data);

  

  const validationType = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      company_name: "",
      code: "",
      domain:"",
      url: "",
      cpanel_account: "",
      root_folder: "",
      user_folder: "",
      accent_color:"",
      primary_color: "",
      secondary_color: ""

    },
    validationSchema: Yup.object().shape({
      company_name: Yup.string().required("Name is required"),
      code: Yup.string().required("Code is required").min(2, "Code must be 2-character long").max(2, "Code must be 2-character long"),
      domain: Yup.string().required("Domain is required"),
      url: Yup.string().required("URL is required")
    }),
    onSubmit: (values) => {
        let data = {
          company_name: values.company_name,
          code: values.code,
          domain: values.domain,
          url: values.url,
          cpanel_account: values.cpanel_account,
          root_folder: values.root_folder,
          user_folder: values.user_folder
      }
        createWebsite(data)
          .then((resp) => {
            // console.log(resp.data)
            if (resp.data.status === 201) {
              Swal.fire(
                "Success!",
                "The website has been created.",
                "success"
              ).then(() =>{
                window.location.href = '/websites'
                //history.goBack()
              })
            }
          })
          .catch((error) => {
           let errorMessages = []
            Object.entries(error.response.data.data).map(item => {
              errorMessages.push(item[1])
            })
            
            
            Swal.fire(
              "Error!",
              // {error.response.},
              String(errorMessages[0])
            )
          });
    },
  });
  
  /////////////////////////
    return ( 
        <>
          <div className="page-content">
        <Container fluid>
        <div className=" mx-5">
            <h1 className="display-5 fw-bold cursor-pointer" style={{ color: "#3DC7F4" }}>
              ADD NEW WEBSITE
            </h1>
          </div>

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
              <Card>
                <CardBody className="d-grid">
                  <Row className="justify-content-center">
                    <h3>+ Website Information</h3>
                  </Row>
                  <Row className="justify-content-center mt-4">
                    <div className="form-outline mb-4">
                      <Label className="form-label">Website Name</Label>
                      <Input
                        name="company_name"
                        placeholder=""
                        type="text"
                        onChange={validationType.handleChange}
                        onBlur={validationType.handleBlur}
                        value={validationType.values.company_name || ""}
                        invalid={
                          validationType.touched.company_name &&
                          validationType.errors.company_name
                            ? true
                            : false
                        }
                      />
                      {validationType.touched.company_name &&
                      validationType.errors.company_name ? (
                        <FormFeedback type="invalid">
                          {validationType.errors.company_name}
                        </FormFeedback>
                      ) : null}
                    </div>

                    <div className="form-outline mb-4">
                      <Label className="form-label">2-Digit Code</Label>
                      <Input
                        name="code"
                        placeholder=""
                        type="text"
                        onChange={validationType.handleChange}
                        onBlur={validationType.handleBlur}
                        value={validationType.values.code || ""}
                        invalid={
                          validationType.touched.code &&
                          validationType.errors.code
                            ? true
                            : false
                        }
                      />
                      {validationType.touched.code &&
                      validationType.errors.code ? (
                        <FormFeedback type="invalid">
                          {validationType.errors.code}
                        </FormFeedback>
                      ) : null}
                    </div>

                    <div className="form-outline mb-4">
                      <Label className="form-label">Domain</Label>
                      <Input
                        name="domain"
                        placeholder=""
                        type="text"
                        onChange={validationType.handleChange}
                        onBlur={validationType.handleBlur}
                        value={validationType.values.domain || ""}
                        invalid={
                          validationType.touched.domain &&
                          validationType.errors.domain
                            ? true
                            : false
                        }
                      />
                      {validationType.touched.domain &&
                      validationType.errors.domain ? (
                        <FormFeedback type="invalid">
                          {validationType.errors.domain}
                        </FormFeedback>
                      ) : null}
                    </div>

                    <div className="form-outline mb-4">
                      <Label className="form-label">Website URL</Label>
                      <Input
                        name="url"
                        placeholder=""
                        type="text"
                        onChange={validationType.handleChange}
                        onBlur={validationType.handleBlur}
                        value={validationType.values.url || ""}
                        invalid={
                          validationType.touched.url &&
                          validationType.errors.url
                            ? true
                            : false
                        }
                      />
                      {validationType.touched.url &&
                      validationType.errors.url ? (
                        <FormFeedback type="invalid">
                          {validationType.errors.url}
                        </FormFeedback>
                      ) : null}
                    </div>

                    <div className="form-outline mb-4">
                      <Label className="form-label">cPanel Account</Label>
                      <Input
                        name="cpanel_account"
                        placeholder=""
                        type="text"
                        onChange={validationType.handleChange}
                        onBlur={validationType.handleBlur}
                        value={validationType.values.cpanel_account || ""}
                        invalid={
                          validationType.touched.cpanel_account &&
                          validationType.errors.cpanel_account
                            ? true
                            : false
                        }
                      />
                      {validationType.touched.cpanel_account &&
                      validationType.errors.cpanel_account ? (
                        <FormFeedback type="invalid">
                          {validationType.errors.cpanel_account}
                        </FormFeedback>
                      ) : null}
                    </div>

                    <div className="form-outline mb-4">
                      <Label className="form-label">Root Folder</Label>
                      <Input
                        name="root_folder"
                        placeholder=""
                        type="text"
                        onChange={validationType.handleChange}
                        onBlur={validationType.handleBlur}
                        value={validationType.values.root_folder || ""}
                        invalid={
                          validationType.touched.root_folder &&
                          validationType.errors.root_folder
                            ? true
                            : false
                        }
                      />
                      {validationType.touched.root_folder &&
                      validationType.errors.root_folder ? (
                        <FormFeedback type="invalid">
                          {validationType.errors.root_folder}
                        </FormFeedback>
                      ) : null}
                    </div>

                    <div className="form-outline mb-4">
                      <Label className="form-label">User Folder</Label>
                      <Input
                        name="user_folder"
                        placeholder=""
                        type="text"
                        onChange={validationType.handleChange}
                        onBlur={validationType.handleBlur}
                        value={validationType.values.user_folder || ""}
                        invalid={
                          validationType.touched.user_folder &&
                          validationType.errors.user_folder
                            ? true
                            : false
                        }
                      />
                      {validationType.touched.user_folder &&
                      validationType.errors.user_folder ? (
                        <FormFeedback type="invalid">
                          {validationType.errors.user_folder}
                        </FormFeedback>
                      ) : null}
                    </div>

                    <div className="form-outline mb-4">
                      <Label className="form-label">Accent Color</Label>
                      <Input
                        name="accent_color"
                        placeholder=""
                        type="text"
                        onChange={validationType.handleChange}
                        onBlur={validationType.handleBlur}
                        value={validationType.values.accent_color || ""}
                        invalid={
                          validationType.touched.accent_color &&
                          validationType.errors.accent_color
                            ? true
                            : false
                        }
                      />
                      {validationType.touched.accent_color &&
                      validationType.errors.accent_color ? (
                        <FormFeedback type="invalid">
                          {validationType.errors.accent_color}
                        </FormFeedback>
                      ) : null}
                    </div>

                    <div className="form-outline mb-4">
                      <Label className="form-label">Primary Color</Label>
                      <Input
                        name="primary_color"
                        placeholder=""
                        type="text"
                        onChange={validationType.handleChange}
                        onBlur={validationType.handleBlur}
                        value={validationType.values.primary_color || ""}
                        invalid={
                          validationType.touched.primary_color &&
                          validationType.errors.primary_color
                            ? true
                            : false
                        }
                      />
                      {validationType.touched.primary_color &&
                      validationType.errors.primary_color ? (
                        <FormFeedback type="invalid">
                          {validationType.errors.primary_color}
                        </FormFeedback>
                      ) : null}
                    </div>

                    <div className="form-outline mb-4">
                      <Label className="form-label">Secondary Color</Label>
                      <Input
                        name="secondary_color"
                        placeholder=""
                        type="text"
                        onChange={validationType.handleChange}
                        onBlur={validationType.handleBlur}
                        value={validationType.values.secondary_color || ""}
                        invalid={
                          validationType.touched.secondary_color &&
                          validationType.errors.secondary_color
                            ? true
                            : false
                        }
                      />
                      {validationType.touched.secondary_color &&
                      validationType.errors.secondary_color ? (
                        <FormFeedback type="invalid">
                          {validationType.errors.secondary_color}
                        </FormFeedback>
                      ) : null}
                    </div>

                    <Button
                      color="primary"
                      type="submit"
                      className="font-16 btn-block"
                      // onClick={toggleCategory}
                    >
                      <i className="mdi mdi-plus-circle-outline me-1" />
                      Create New Website
                    </Button>
                  </Row>
                </CardBody>
              </Card>
            </Col>
          </Row>
          </Form>
        </Container>
      </div>
        </>
     );
}
 
export default NewWebsite;