import React, { useState, useEffect } from "react";
import { usersData } from "../../Utils/Redux/Actions/UsersActions";
import { modulesData } from "../../Utils/Redux/Actions/ModulesActions";
import MembersChecked from "./MembersChecked";
import PermissionsChecked from "./PermissionsChecked";
import { useSelector, useDispatch } from "react-redux";
import { editDepartment, getDepartment } from "../../Utils/API/Departments";
import { useParams } from "react-router-dom";
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

const EditDepartment = ({ history }) => {
  const dispatch = useDispatch();
  const { id } = useParams();

  //get dep data
  const [dataDep, setDataDep] = useState([]);
  useEffect(() => {
    getDepartment(id).then((resp) => {
      setDataDep(resp.data.data);
    });
  }, [id]);

  const [membersIds, setMembersIds] = useState([]);
  const [permsId, setPermsIds] = useState([]);

  useEffect(() => {
    if (dataDep.members) {
      const dataMembers = dataDep.members;
      let ids = [];
      dataMembers.forEach((element) => {
        ids.push(element.id);
      });
      setMembersIds(ids);
    }
    if (dataDep.modules) {
      const dataModules = dataDep.modules;
      let ids = [];
      dataModules.forEach((element) => {
        ids.push(element.module_id);
      });
      setPermsIds(ids);
    }
  }, [dataDep]);

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

  const [modulesAdded, setModulesAdded] = useState([]);
  // const onChangeMembers = (e) => {
  //   console.log("ejecutado");
  //   const selection = e.target.value;
  //   const selectionFlag = membersIds.includes(selection);

  //   if (!selectionFlag) {
  //     setMembersIds([...membersIds, e.target.value]);
  //   }
  //   if (selectionFlag) {
  //     setMembersIds(membersIds.filter((ele) => ele !== selection));
  //   }
  // };

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
      name: dataDep ? dataDep.name : "",
      code: dataDep ? dataDep.code : "",
      members: membersIds,
      modules: permsId,
    },
    validationSchema: Yup.object().shape({
      name: Yup.string().required("Name is required"),
      code: Yup.string()
        .required("Code is required")
        .max(3, "Must be exactly 3 chars")
        .required("Max 3 chars"),
    }),
    onSubmit: (values) => {
      console.log(values);
      let data = {
        name: values.name,
        code: values.code,
        module_ids: values.modules,
        user_ids: values.members,
      };
      editDepartment(id, data)
        .then((resp) => {
          console.log(resp.data);
          if (resp.data.status === 200) {
            Swal.fire(
              "Edited!",
              "The department has been edited.",
              "success"
            ).then(() => {
              history.goBack();
            });
          }
        })
        .catch((error) => {
          console.log(error.response);
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
          <div className=" mx-5">
            <h1 className="display-5 fw-bold" style={{ color: "#3DC7F4" }}>
              + EDIT DEPARTMENT
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
                    <CardBody className="d-grid px-2 pt-0">
                        <Row className="justify-content-center bg-paradise pt-3 pb-2 shadow">
                          <h5 className="text-white">+ General Information</h5>
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
                        </Row>

                        <Button
                          color="primary"
                          className="waves-effect waves-light"
                        >
                          <i className=" mdi mdi-plus-circle-outline me-1" />
                          Edit Department
                        </Button>
                      </CardBody>
                    </Card>
                  </Col>
                  <Col lg={4}>
                  <Card style={{ height: "75vh" }} className='px-2 pt-0'>
                    <Row className="justify-content-center bg-paradise pt-3 pb-2 shadow">
                          <h5 className="text-white">+ Select Members</h5>
                        </Row>
                      <CardBody className="overflow-auto">
                        <Row className="justify-content-center mt-4">
                          {dataUsers ? (
                            <>
                              {map(dataUsers, (user, index) => {
                                return (
                                  <MembersChecked
                                    key={index}
                                    user={user}
                                    membersIds={membersIds}
                                    setMembersIds={setMembersIds}
                                  />
                                );
                              })}
                            </>
                          ) : null}
                        </Row>
                      </CardBody>
                    </Card>
                  </Col>
                  <Col lg={4}>
                  <Card style={{ height: "75vh" }} className='px-2 pt-0'>
                    <Row className="justify-content-center bg-paradise pt-3 pb-2 shadow">
                          <h5 className="text-white">+ Permissionss</h5>
                        </Row>
                      <CardBody className="overflow-auto">
                        <Row className="mt-4">
                          <Row lg={6}>
                            {dataModules ? (
                              <>
                                {map(dataModules, (module, index) => {
                                  return (
                                    <div key={index} className=" my-4 mx-4 ">
                                      <PermissionsChecked
                                        key={index}
                                        module={module}
                                        permsId={permsId}
                                        setPermsIds={setPermsIds}
                                      />
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

export default EditDepartment;
