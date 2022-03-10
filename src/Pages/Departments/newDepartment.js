import React, { useState, useEffect } from "react";
import { usersData } from "../../Utils/Redux/Actions/UsersActions";
import { modulesData } from "../../Utils/Redux/Actions/ModulesActions";
import { useSelector, useDispatch } from "react-redux";
import { createDepartment } from "../../Utils/API/Departments";
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

const NewDepartment = ({history}) => {
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

  // console.log(dataModules);

  const [membersAdded, setMembersAdded] = useState([])
  const [modulesAdded, setModulesAdded] = useState([])
  const onChangeMembers = (e) =>{
    const selection = e.target.value
    const selectionFlag = membersAdded.includes(selection)
    if (!selectionFlag) { 
      setMembersAdded([...membersAdded, e.target.value])
    }
    if (selectionFlag) {
      setMembersAdded( membersAdded.filter(ele => ele !== selection))
    }
  }
  const onChangeModules = (e) =>{
    const selection = e.target.value
    const selectionFlag = modulesAdded.includes(selection)
    if (!selectionFlag) { 
      setModulesAdded([...modulesAdded, e.target.value])
    }
    if (selectionFlag) {
      setModulesAdded( modulesAdded.filter(ele => ele !== selection))
    }
  }

  const validationType = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      name: "",
      code: "",
      members:[],
      modules:[]
    },
    validationSchema: Yup.object().shape({
      name: Yup.string().required("Name is required"),
      code: Yup.string().required("Code is required"),
    }),
    onSubmit: (values) => {
        let data = {
          name: values.name,
          code: values.code,
          module_ids: modulesAdded,
          user_ids: membersAdded
      }
        createDepartment(data)
          .then((resp) => {
            console.log(resp.data)
            if (resp.data.status === 201) {
              Swal.fire(
                "Deleted!",
                "The department has been deleted.",
                "success"
              ).then(() =>{

                history.goBack()
              })
            }
          })
          .catch((error) => {
            
            console.log(error.response);
            Swal.fire(
              "Deleted!",
              // {error.response.},
              "error"
            )
          });
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
                            validationType.errors.name ? (
                              <FormFeedback type="invalid">
                                {validationType.errors.name}
                              </FormFeedback>
                            ) : null}
                          </div>

                          <div className="form-outline mb-4">
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
                          <Button
                            color="primary"
                            type="submit"
                            className="font-16 btn-block"
                            // onClick={toggleCategory}
                          >
                            <i className="mdi mdi-plus-circle-outline me-1" />
                            Create New Department
                          </Button>
                        </Row>
                      </CardBody>
                    </Card>
                  </Col>
                  <Col lg={4}>
                    <Card style={{ height: "75vh" }}>
                      <Row className="justify-content-center mt-4 mx-3">
                        <h3>+ Select Members</h3>
                      </Row>
                      <CardBody className="overflow-auto">
                        <Row className="justify-content-center mt-4">
                          {dataUsers ? (
                            <>
                              {map(dataUsers, (user, index) => {
                                return (
                                  <div
                                    key={index}
                                    className="controls my-4 mx-5 px-5"
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
                    <Card style={{ height: "75vh" }}>
                      <Row className="justify-content-center mt-4 mx-3">
                        <h3>+ Permissions</h3>
                      </Row>
                      <CardBody className="overflow-auto">
                        <Row className="mt-4">
                          <Row lg={6}>
                            {dataUsers ? (
                              <>
                                {map(dataModules, (module, index) => {
                                  return (
                                    <div key={index} className=" my-4 mx-4 ">
                                      <div className="form-check">
                                        <input
                                          className="form-check-input"
                                          type="checkbox"
                                          value={module.id}
                                          name={validationType.values.permissions}
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
