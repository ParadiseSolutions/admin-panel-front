import React, { useState, useEffect } from "react";
import { usersData } from "../../Utils/Redux/Actions/UsersActions";
import { modulesData } from "../../Utils/Redux/Actions/ModulesActions";
import { useSelector, useDispatch } from "react-redux";
import { createDepartment } from "../../Utils/API/Departments";
import BoatImage from "../../Components/Assets/images/boat.png";
import Inter1 from "../../Components/Assets/images/Intersection1.svg";
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

const NewDepartment = ({ history }) => {
  const dispatch = useDispatch();

  //users request
  useEffect(() => {
    const usersRequest = () => dispatch(usersData());
    usersRequest();
  }, [dispatch]);
  //modules request
  useEffect(() => {
    const modulesRequest = () => dispatch(modulesData());
    modulesRequest();
  }, [dispatch]);

  //get info
  const dataUsers = useSelector((state) => state.users.users.data);
  const dataModules = useSelector((state) => state.modules.modules.data);

  const [membersAdded, setMembersAdded] = useState([]);
  const [modulesAdded, setModulesAdded] = useState([]);
  const [validation, setValidation] = useState(false);

  useEffect(() => {
    if (membersAdded.length > 0 && modulesAdded.length > 0) {
      setValidation(true);
      return;
    }
  }, [membersAdded, modulesAdded]);
  const onChangeMembers = (e) => {
    const selection = e.target.value;
    const selectionFlag = membersAdded.includes(selection);
    if (!selectionFlag) {
      setMembersAdded([...membersAdded, e.target.value]);
    }
    if (selectionFlag) {
      setMembersAdded(membersAdded.filter((ele) => ele !== selection));
    }
  };
  const onChangeModules = (e) => {
    const selection = e.target.value;
    const selectionFlag = modulesAdded.includes(selection);
    if (!selectionFlag) {
      setModulesAdded([...modulesAdded, e.target.value]);
    }
    if (selectionFlag) {
      setModulesAdded(modulesAdded.filter((ele) => ele !== selection));
    }
  };

  const validationType = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,
    initialValues: {
      name: "",
      code: "",
      members: [],
      modules: [],
    },
    validationSchema: Yup.object().shape({
      name: Yup.string().required("Name is required"),
      code: Yup.string()
        .required("Code is required")
        .max(3, "Must be exactly 3 chars")
        .required("Max 3 chars"),
    }),
    onSubmit: (values) => {
      // console.log(values);
      let data = {
        name: values.name,
        code: values.code,
        module_ids: modulesAdded,
        user_ids: membersAdded,
      };
      createDepartment(data)
        .then((resp) => {
          // console.log(resp.data);
          if (resp.data.status === 201) {
            Swal.fire(
              "Created!",
              "The department has been created.",
              "success"
            ).then(() => {
              history.goBack();
            });
          }
        })
        .catch((error) => {
          // console.log(error.response);
          Swal.fire(
            "Error!",
            `${
              error.response.data.data.name
                ? error.response.data.data.name
                : error.response.data.data.code
            }`,
            "error"
          );
        });
    },
  });
  return (
    <>
      <div className="page-content">
        <Container fluid>
          <Form
            onSubmit={(e) => {
              e.preventDefault();
              validationType.handleSubmit();
              return false;
            }}
            className="custom-validation"
          >
            <div className=" mx-5">
              <h1
                className="display-5 fw-bold text-paradise"
                // style={{ color: "#3DC7F4" }}
              >
                + ADD NEW DEPARTMENT
              </h1>
            </div>
            <Col sm="12" className="d-flex justify-content-end">
              <div className="text-sm-end mx-2">
                <Button
                  color="paradise"
                  outline
                  className="waves-effect waves-light"
                  type="button"
                  onClick={() => history.goBack()}
                >
                  <i className="uil-angle-double-left" />
                  Back
                </Button>
              </div>
              <div className="text-sm-end">
                <Button
                  type="submit"
                  style={{ backgroundColor: "#F6851F", borderColor: "#F6851F" }}
                  className="waves-effect waves-light mb-3 btn btn-success"
                  // onClick={() => onClickNewContactProvider()}
                >
                  <i className="mdi mdi-plus me-1" />
                  Add Department
                </Button>
              </div>
            </Col>
            <Row className="">
              <Col className="col-12 mx-5">
                <Row className="d-flex justify-content-between">
                  <Col lg={3} style={{ height: "75vh" }}>
                    <Card>
                      <CardBody className="d-grid px-2 pt-0">
                        <Row
                          className="d-flex flex-row justify-content-between bg-paradise pb-2 pt-3"
                          style={{ paddingLeft: "20px" }}
                        >
                          <h5 className="text-white col-8 pl-5">
                            + General Information
                          </h5>
                        </Row>
                        <Row className="justify-content-center mt-4">
                          <div className="form-outline mb-4 col-11">
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
                            validationType.errors.name ? (
                              <FormFeedback type="invalid">
                                {validationType.errors.name}
                              </FormFeedback>
                            ) : null}
                          </div>

                          <div className="form-outline mb-4 col-11">
                            <Label>Code</Label>
                            <Input
                              name="code"
                              type="text"
                              placeholder=""
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
                        </Row>
                      </CardBody>
                    </Card>
                    <div style={{ border: "none" }}>
                      <img
                        src={BoatImage}
                        alt="boat"
                        style={{
                          width: "103%",
                          height: "400px",
                          marginLeft: "-5px",
                        }}
                      />
                    </div>
                  </Col>
                  <Col lg={4}>
                    <Card style={{ height: "75vh" }} className="px-2 pt-0">
                      <Row
                        className="justify-content-center bg-paradise pt-3 pb-2 shadow"
                        style={{ paddingLeft: "20px" }}
                      >
                        <h5 className="text-white">+ Select Members</h5>
                      </Row>
                      <CardBody className="overflow-auto">
                        <Row className="justify-content-center">
                          {dataUsers ? (
                            <>
                              {map(dataUsers, (user, index) => {
                                return (
                                  <div
                                    key={index}
                                    className="controls my-4"
                                  >
                                    <div className="form-check px-5">
                                      <input
                                        className="form-check-input"
                                        type="checkbox"
                                        value={user.id}
                                        name={validationType.values.members}
                                        onChange={(e) => onChangeMembers(e)}
                                      />
                                      <label className="form-check-label">
                                        {`${user.first_name} ${user.last_name}`}
                                      </label>
                                    </div>
                                  </div>
                                );
                              })}
                            </>
                          ) : null}
                        </Row>
                      </CardBody>
                    </Card>
                  </Col>
                  <Col lg={4}>
                    <Card style={{ height: "75vh" }} className="px-2 pt-0">
                      <Row
                        className="justify-content-center bg-paradise pt-3 pb-2 shadow"
                        style={{ paddingLeft: "20px" }}
                      >
                        <h5 className="text-white">+ Permissionss</h5>
                      </Row>
                      <CardBody className="overflow-auto">
                        <Row className="d-flex justify-content-center">
                         
                            {dataModules ? (
                              <>
                                {map(dataModules, (module, index) => {
                                  return (
                                    <div key={index} className=" my-4 col-5">
                                      <div className="form-check">
                                        <input
                                          className="form-check-input"
                                          type="checkbox"
                                          value={module.id}
                                          name={
                                            validationType.values.permissions
                                          }
                                          onChange={(e) => onChangeModules(e)}
                                          onBlur={validationType.handleBlur}
                                        />
                                        <label className="form-check-label">
                                          {`${module.name}`}
                                        </label>
                                      </div>
                                    </div>
                                  );
                                })}
                              </>
                            ) : null}
                          
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
