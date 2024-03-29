import React, { useState, useEffect } from "react";
import { usersData } from "../../Utils/Redux/Actions/UsersActions";
import { getPermissionType } from "../../Utils/API/Roles";
import { createRol } from "../../Utils/API/Roles";
import { useSelector, useDispatch } from "react-redux";
import BoatImage from "../../Components/Assets/images/boat.png";
import Inter1 from '../../Components/Assets/images/Intersection1.svg'
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

const NewRol = ({ history }) => {
  const dispatch = useDispatch();

  //users request
  useEffect(() => {
    const usersRequest = () => dispatch(usersData());
    usersRequest();
  }, [dispatch]);
  //permission Type
  const [permsData, setPermsData] = useState([])
  useEffect(() => {
    getPermissionType().then((resp) =>{
      setPermsData(resp.data.data)
    })
  }, []);

  //get info
  const dataUsers = useSelector((state) => state.users.users.data);

  const [membersAdded, setMembersAdded] = useState([]);
  const [actionsAdded, setActionsAdded] = useState([]);
  const [validation, setValidation] = useState(false);

  useEffect(() => {
    if (membersAdded.length > 0 && actionsAdded.length > 0) {
      setValidation(true);
      return;
    }
  }, [membersAdded, actionsAdded]);
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
  const onChangeActions = (e) => {
    const selection = e.target.value;
    const selectionFlag = actionsAdded.includes(selection);
    if (!selectionFlag) {
      setActionsAdded([...actionsAdded, e.target.value]);
    }
    if (selectionFlag) {
      setActionsAdded(actionsAdded.filter((ele) => ele !== selection));
    }
  };

  const validationType = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,
    initialValues: {
      name: "",
    },
    validationSchema: Yup.object().shape({
      name: Yup.string().required("Name is required"),
      
    }),
    onSubmit: (values) => {
      // console.log(values);
      let data = {
        name: values.name,
        permission_type_ids: actionsAdded,
        user_ids: membersAdded,
      };
      // console.log(data)
      createRol(data)
        .then((resp) => {
          // console.log(resp.data);
          if (resp.data.status === 201) {
            Swal.fire(
              "Created!",
              "The Role has been created.",
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
      <div className="page-content pb-0 px-0">
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
                  <i className="mdi mdi-plus me-1" /> ADD NEW ROLE
                </h1>
              </div>
              <div className="d-flex justify-content-end align-items-baseline">
                <div className="text-sm-end mx-2">
                {validation ? (
                  <>
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
                  </>
                  ) : (
                    <>
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
                  </>
                  )}
                </div>
                <div className="text-sm-end">
                  <Button
                    type="submit"                    
                    className="waves-effect waves-light btn btn-orange border-3"
                    // onClick={() => onClickNewContactProvider()}
                  >
                    
                    Create Role
                  </Button>
                </div>
              </div>
                
              </Col>
            </Row>
            <Row className="g-5">
              
                  <Col lg={4} className="align-items-stretch">
                    <Card className="mb-4">
                    <CardHeader className="justify-content-center bg-paradise pt-3 pb-2 shadow" style={{backgroundImage:'url(' + Inter1 + ')',
                    backgroundSize:'contain', 
                    backgroundRepeat:'no-repeat', 
                    backgroundPosition:'right'}}>                          
                          <h5 className="text-white">+ General Information</h5>
                        
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
                  <Card className="border-0 w-100 mb-0">
                    <CardHeader className="justify-content-center bg-paradise pt-3 pb-2 shadow" style={{backgroundImage:'url(' + Inter2 + ')',
                    backgroundSize:'cover', 
                    backgroundRepeat:'no-repeat', 
                    backgroundPosition:'left'}}>
                          <h5 className="text-white">+ Select Members</h5>
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
                  <Card className='px-2 pt-0 mb-0 w-100'>
                    <Row className="justify-content-center bg-paradise pt-3 pb-2 shadow" style={{backgroundImage:'url(' + Inter3 + ')',
                    backgroundSize:'cover', 
                    backgroundRepeat:'no-repeat', 
                    backgroundPosition:'left'}}>
                          <h5 className="text-white">+ Select Actions</h5>
                        </Row>
                      <CardBody className="overflow-auto">
                        <Row className="justify-content-center mt-4">
                          {permsData ? (
                            <>
                              {map(permsData, (perm, index) => {
                                return (
                                  <div
                                    key={index}
                                    className="controls my-2 mx-5 px-5"
                                  >
                                    <div className="form-check px-5">
                                      <input
                                        className="form-check-input"
                                        type="checkbox"
                                        value={perm.id}
                                        name={validationType.values.members}
                                        onChange={(e) => onChangeActions(e)}
                                      />
                                      <label className="form-check-label">
                                        {perm.name}
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
          </Form>
        </Container>
        <div className="content-footer pt-2 px-4 mt-4 mx-4">
          <p>2023 © JS Tour & Travel</p>
        </div>
      </div>
    </>
  );
};

export default NewRol;
