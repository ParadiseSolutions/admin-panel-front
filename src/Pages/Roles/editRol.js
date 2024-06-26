import React, { useState, useEffect } from "react";
import { usersData } from "../../Utils/Redux/Actions/UsersActions";
import PermissionsChecked from "./PermissionsChecked";
import { getPermissionType } from "../../Utils/API/Roles";
import { editRolAPI } from "../../Utils/API/Roles";
import MembersChecked from "./MembersChecked";
import { useSelector, useDispatch } from "react-redux";
import { getRol } from "../../Utils/API/Roles";
import { useParams } from "react-router-dom";
import BoatImage from "../../Components/Assets/images/boat.png";
import Inter1 from '../../Components/Assets/images/Intersection1.svg'
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
  CardHeader,
} from "reactstrap";
// Formik validation
import * as Yup from "yup";
import { useFormik } from "formik";
import { map } from "lodash";
import Swal from "sweetalert2";

const EditRol = ({ history }) => {
  const dispatch = useDispatch();
  const { id } = useParams();

  //get dep data
  const [dataRol, setDataRol] = useState([]);
  useEffect(() => {
    getRol(id).then((resp) => {
      setDataRol(resp.data.data);
    });
  }, [id]);

  const [membersIds, setMembersIds] = useState([]);
  const [permsIds, setPermsIds] = useState([]);
  const [permType, setPermType] = useState([]);

  useEffect(() => {
    if (dataRol.members) {
      const dataMembers = dataRol.members;
      let ids = [];
      dataMembers.forEach((element) => {
        ids.push(element.id);
      });
      setMembersIds(ids);
    }
    if (dataRol.permissions) {
      setPermsIds(dataRol.permissions);
    }
  }, [dataRol]);

  //users request
  useEffect(() => {
    const usersRequest = () => dispatch(usersData());
    usersRequest();
  }, [dispatch]);
  //permissions request
  useEffect(() => {
    getPermissionType().then((resp) => {
      setPermType(resp.data.data);
    });
  }, [dispatch]);

  //get info
  const dataUsers = useSelector((state) => state.users.users.data);

  const validationType = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      name: dataRol ? dataRol.name : "",
      members: membersIds,
      modules: permsIds,
    },
    validationSchema: Yup.object().shape({
      name: Yup.string().required("Name is required"),
    }),
    onSubmit: (values) => {
      let data = {
        name: values.name,
        permission_type_ids: values.modules,
        user_ids: values.members,
      };
      editRolAPI(id, data)
        .then((resp) => {
          if (resp.data.status === 200) {
            Swal.fire("Edited!", "The rol has been edited.", "success").then(
              () => {
                history.goBack();
              }
            );
          }
        })
        .catch((error) => {
          let errorMessages = [];
					Object.entries(error.response.data.data).map((item) => {
						errorMessages.push(item[1]);
            return true
					});

					Swal.fire(
						"Error!",
						// {error.response.},
						String(errorMessages[0])
					);
        });
    },
  });
  return (
    <>
      <div className="page-content px-0">
        <Container fluid className="px-5">
          <div>
            <h1 className="fw-bold" style={{ color: "#3DC7F4" }}>
              + EDIT ROLE
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
            <Row className="g-5">
              
                  <Col lg={4}>
                    <Card className="mb-5">
                      <CardHeader className="d-flex flex-row justify-content-between bg-paradise pb-2 pt-3">
                      <h5 className="text-white col-8">+ General Information</h5>
                        <img src={Inter1} alt='inter1' style={{width: '100px', marginTop:'-15px', marginRight:'-20px'}} />
                      </CardHeader>
                    <CardBody className="d-grid p-5">
                    
                        <Row className="justify-content-center">
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
                        </Row>

                        <Button
                          color="primary"
                          type="submit"
                          className="waves-effect waves-light"
                        >
                          <i className=" mdi mdi-plus-circle-outline me-1" />
                          Edit Role
                        </Button>
                      </CardBody>
                    </Card>
                    <div style={{ border: "none" }}>
                      <img
                        src={BoatImage}
                        alt="boat"
                        className="w-100"
                      />
                    </div>
                  </Col>
                  <Col lg={4} className="d-flex align-items-stretch">
                  <Card style={{ maxHeight: "87vh" }} className="border-0">
                    <CardHeader className="justify-content-center bg-paradise pt-3 pb-2 shadow">
                          <h5 className="text-white">+ Select Members</h5>
                      </CardHeader>
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
                  <Col lg={4} className="d-flex align-items-stretch">
                  <Card className='px-2 pt-0'>
                    <Row className="justify-content-center bg-paradise pt-3 pb-2 shadow">
                          <h5 className="text-white">+ Select Actions</h5>
                        </Row>
                      <CardBody className="overflow-auto">
                        <Row className="justify-content-center mt-4">
                          {permType ? (
                            <>
                              {map(permType, (perm, index) => {
                                return (
                                  <PermissionsChecked
                                    key={index}
                                    perm={perm}
                                    permsIds={permsIds}
                                    setPermsIds={setPermsIds}
                                  />
                                );
                              })}
                            </>
                          ) : null}
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
};

export default EditRol;
