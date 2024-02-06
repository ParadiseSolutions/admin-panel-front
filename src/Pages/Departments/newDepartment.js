import React, { useState, useEffect } from "react";
import { usersData } from "../../Utils/Redux/Actions/UsersActions";
import { modulesData } from "../../Utils/Redux/Actions/ModulesActions";
import { useSelector, useDispatch } from "react-redux";
import { createDepartment } from "../../Utils/API/Departments";
import BoatImage from "../../Components/Assets/images/boat.png";
import Inter1 from "../../Components/Assets/images/Intersection1.svg";
import Inter2 from '../../Components/Assets/images/Intersection2.svg'
import Inter3 from '../../Components/Assets/images/Intersection4-5.svg'
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
              "Hooray!",
              "You added a New Department.",
              "success"
            ).then(() => {
              history.goBack();
            });
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
      <div className="page-content px-0 pb-0">
        <Container fluid className="px-5">
          <Form
            onSubmit={(e) => {
              e.preventDefault();
              validationType.handleSubmit();
              return false;
            }}
            className="custom-validation"
          >
            
            <Row>
              <Col md="12" className="d-flex justify-content-between align-items-baseline mb-4">
              <div className="d-flex">
                <h1
                  className="fw-bold text-paradise mb-2"  style={{fontSize:"3.5rem"}}              
                >
                  <i className="mdi mdi-plus me-1" /> ADD DEPARTMENT
                </h1>
              </div>
              <div className="d-flex justify-content-end align-items-baseline">
                <div className="text-sm-end mx-2">
                  <Button
                    color="paradise"
                    outline
                    className="waves-effect waves-light border-3 fw-bold"
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
                    className="waves-effect waves-light btn btn-orange border-3"
                    // onClick={() => onClickNewContactProvider()}
                  >
                    
                    Create Department
                  </Button>
                </div>
              </div>
                
              </Col>
            </Row>
            
            
              <Row className="g-4 g-xxl-5">
                <Col lg={4}>
                  <Card className="border-0 mb-4">
                    <CardHeader className="bg-paradise" style={{backgroundImage:'url(' + Inter1 + ')',
                    backgroundSize:'contain', 
                    backgroundRepeat:'no-repeat', 
                    backgroundPosition:'right'}}>
                    <h5 className="text-white m-1">
                          + General Information
                        </h5>
                    </CardHeader>
                    <CardBody className="">
                      
                      <Row className="justify-content-center">
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
                  <Card className="border-0 w-100 mb-0">
                    <img
                      src={BoatImage}
                      alt="boat"
                      class="card-img-top"
                    />
                  </Card>
                </Col>
                <Col lg={4} className="d-flex align-items-stretch">
                  <Card className="border-0 w-100 mb-0">
                  <CardHeader className="bg-paradise" style={{backgroundImage:'url(' + Inter2 + ')',
                    backgroundSize:'cover', 
                    backgroundRepeat:'no-repeat', 
                    backgroundPosition:'left'}}>
                    <h5 className="text-white m-1">
                      + Select Members
                    </h5>
                    </CardHeader>
                    
                    <CardBody className="overflow-auto">
                      <div className="justify-content-center">
                        <div className="table-two-column mx-2 mx-xxl-4">
                        {dataUsers ? (
                          <>
                            {map(dataUsers, (user, index) => {
                              return (
                                <div
                                  key={index}
                                  className="controls mb-2 mb-xxl-4"
                                >
                                  <div className="form-check">
                                    <input
                                      className="form-check-input"
                                      type="checkbox"
                                      value={user.id}
                                      name={validationType.values.members}
                                      onChange={(e) => onChangeMembers(e)}
                                    />
                                    <label className="form-check-label cell-min-height">
                                      {`${user.first_name} ${user.last_name}`}
                                    </label>
                                  </div>
                                </div>
                              );
                            })}
                          </>
                        ) : null}
                        </div>
                        
                      </div>
                    </CardBody>
                  </Card>
                </Col>
                <Col lg={4} className="d-flex align-items-stretch">
                  <Card className="w-100 mb-0">
                  <CardHeader className="bg-paradise" style={{backgroundImage:'url(' + Inter3 + ')',
                    backgroundSize:'cover', 
                    backgroundRepeat:'no-repeat', 
                    backgroundPosition:'left'}}>
                    <h5 className="text-white m-1">
                      + Permissions
                    </h5>
                    </CardHeader>
                    
                    <CardBody className="overflow-auto">
                      <div className="justify-content-center">
                      <div className="table-two-column mx-2 mx-xxl-4">
                      {dataModules ? (
                            <>
                              {map(dataModules, (module, index) => {
                                return (
                                  <div key={index} className="mb-2 mb-xxl-4">
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
                                      <label className="form-check-label cell-min-height">
                                        {`${module.name}`}
                                      </label>
                                    </div>
                                  </div>
                                );
                              })}
                            </>
                          ) : null}
                      </div>
                          
                        
                      </div>
                    </CardBody>
                  </Card>
                </Col>
              </Row>
              
          </Form>
        </Container>
        <div className="content-footer pt-2 px-4 mt-4 mx-4">
          <p>{new Date().getFullYear()} © JS Tour & Travel</p>
        </div>
      </div>
    </>
  );
};

export default NewDepartment;
