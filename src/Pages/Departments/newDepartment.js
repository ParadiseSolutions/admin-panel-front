import React, { useState, useEffect } from "react";
import { usersData } from "../../Utils/Redux/Actions/UsersActions";
import { useSelector, useDispatch } from "react-redux";
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

const NewDepartment = () => {
  const dispatch = useDispatch();

  //users request
  useEffect(() => {
    const usersRequest = () => dispatch(usersData());
    usersRequest();
  }, [dispatch]);

  //get info
  const dataUsers = useSelector((state) => state.users.users.data);

//   console.log(dataUsers);
  // Form validation
  const [error, setError] = useState(false);
  const validationType = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      name: "",
      code: "",
    },
    validationSchema: Yup.object().shape({
      name: Yup.string().required("Name is required"),
      code: Yup.string().required("Code is required"),
    }),
    onSubmit: (values) => {
      console.log("values", values);
      //   let data = {
      //     email: values.email,
      //     password: values.password,
      //   };
      //   LoginData(data)
      //     .then((resp) => {
      //       const respuesta = resp.data.data;
      //       if (resp.data.status === 200) {
      //         createStorageSync("token", JSON.stringify(respuesta));
      //         history.push("/dashboard");
      //       }
      //     })
      //     .catch((error) => {
      //       setError(true);
      //       console.log(error);
      //     });
    },
  });
  return (
    <>
      <div className="page-content">
        <Container fluid>
          <div className=" mx-5">
            <h1 className="display-5 fw-bold" style={{ color: "#3DC7F4" }}>
              + ADD NEW DEPARTMENT
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
                <Row>
                  <Col lg={3}>
                    <Card>
                      <CardBody className="d-grid">
                        <Row className="justify-content-center">
                          <h3>+ General Information</h3>
                        </Row>
                        <Row className="justify-content-center mt-4">
                          <div className="form-outline mb-4">
                            <Label className="form-label">Name</Label>
                            <Input
                              name="name"
                              placeholder=""
                              type="text"
                              onChange={validationType.handleChange}
                              onBlur={validationType.handleBlur}
                              value={validationType.values.name || ""}
                              invalid={
                                validationType.touched.name &&
                                validationType.errors.name
                                  ? true
                                  : false
                              }
                            />
                            {validationType.touched.name &&
                            validationType.errors.name`` ? (
                              <FormFeedback type="invalid">
                                {validationType.errors.name}
                              </FormFeedback>
                            ) : null}
                          </div>
                          <div className="form-outline mb-4">
                            <Label className="form-label">Code</Label>
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
                            validationType.errors.code`` ? (
                              <FormFeedback type="invalid">
                                {validationType.errors.code}
                              </FormFeedback>
                            ) : null}
                          </div>
                        </Row>
                      </CardBody>
                    </Card>
                  </Col>
                  <Col lg={4}>
                    <Card>
                      <CardBody className="d-grid">
                        <Row className="justify-content-center">
                          <h3>+ Select Members</h3>
                        </Row>
                        <Row className="justify-content-center mt-4">
                              {dataUsers ? 
                            <>
                            {map(dataUsers, (user, index) => {
                                console.log(user);
                              return (
                                <div key={index} className="controls my-4 mx-5 px-5">
                                  <div className="form-check px-5">
                                    <input
                                      className="form-check-input"
                                      type="checkbox"
                                      value=""
                                      id="defaultCheck1"
                                    />
                                    <label
                                      className="form-check-label"
                                      htmlFor="defaultCheck1"
                                    >
                                      {`${user.first_name} ${user.last_name}`}
                                    </label>
                                  </div>
                                </div>
                              );
                            })}
                            </>  
                              : null}
                            
                        </Row>
                      </CardBody>
                    </Card>
                  </Col>
                  <Col lg={4}>
                    <Card>
                      <CardBody className="d-grid">
                        <Row className="justify-content-center">
                          <h3>+ Permissions</h3>
                        </Row>
                        <Row className="justify-content-center mt-4">
                            <Row lg={6}>
                            
                        {dataUsers ? 
                            <>
                            {map(Array(18), (user, index) => {
                                console.log(user);
                              return (
                                <div key={index} className=" my-4 mx-5 ">
                                  <div className="form-check">
                                    <input
                                      className="form-check-input"
                                      type="checkbox"
                                      value=""
                                      id="defaultCheck1"
                                    />
                                    <label
                                      className="form-check-label"
                                      htmlFor="defaultCheck1"
                                    >
                                        permiso 1
                                      {/* {`${user.first_name} ${user.last_name}`} */}
                                    </label>
                                  </div>
                                </div>
                              );
                            })}
                            </>  
                              : null}
                            </Row>
                        </Row>
                      </CardBody>
                    </Card>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Form>
        </Container>
      </div>
    </>
  );
};

export default NewDepartment;
