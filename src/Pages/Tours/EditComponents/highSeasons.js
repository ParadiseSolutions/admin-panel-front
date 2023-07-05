import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import HighSeasonImg from "../../../Components/Assets/images/highSeason.png";
import {
  getSeasonsNameAPI,
  postSeasonalityAPI,
  getSeasonsListAPI,
  deleteSeasonalityAPI,
  statusSeasonalityAPI,
  putSeasonalityAPI,
  triggerUpdate
} from "../../../Utils/API/Tours";
import {
  TabPane,
  Row,
  Col,
  Form,
  Label,
  Input,
  FormFeedback,
  Button,
  Table,
  UncontrolledTooltip,
} from "reactstrap";
import * as Yup from "yup";
import { useFormik } from "formik";
import { map } from "lodash";
import Swal from "sweetalert2";
import Switch from "react-switch";

const HighSeasons = ({ tourData, toggle }) => {
  const history = useHistory();

  // console.log("tour data", tourData);

  //get initial Data
  const [seasonsData, setSeasonsData] = useState([]);
  const [seasonNames, setSeasonNames] = useState([]);
  const [seasonSelected, setSeasonSelected] = useState("");
  useEffect(() => {
    getSeasonsNameAPI().then((resp) => {
      setSeasonNames(resp.data.data);
    });
  }, [tourData]);

  useEffect(() => {
    if (tourData?.id) {
      getSeasonsListAPI(tourData.id).then((resp) => {
        setSeasonsData(resp.data.data);
      });
    }
  }, [tourData]);

  //edit season
  const [dateFromEdit, setDataFromEdit] = useState(null);
  const [dateToEdit, setDataToEdit] = useState(null);
  const [seasonToEdit, setSeasonToEdit] = useState(null);
  const [isEdit, setIsEdit] = useState(false);
  const [idEdit, setIDEdit] = useState(null);
  const onEditSeason = (data) => {
    // console.log(data);
    setIDEdit(data.id);
    setDataFromEdit(data.start_date);
    setDataToEdit(data.end_date);
    setSeasonToEdit(data.season_id);
  };

  //delete season
  const onDeleteSeason = (data) => {
    deleteSeasonalityAPI(tourData.id, data.id).then((resp) => {
      Swal.fire("Deleted!", "Season has been deleted.", "success").then(() => {
        // history.goBack();
      });
      getSeasonsListAPI(tourData.id).then((resp) => {
        setSeasonsData(resp.data.data);
      });
    });
  };

  //switch seasonality
  const Offsymbol = () => {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
          fontSize: 12,
          color: "#fff",
          paddingRight: 2,
        }}
      >
        {" "}
        No
      </div>
    );
  };

  const OnSymbol = () => {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
          fontSize: 12,
          color: "#fff",
          paddingRight: 2,
        }}
      >
        {" "}
        Yes
      </div>
    );
  };
  const [activeDep, setActiveDep] = useState(false);
  useEffect(() => {
    if (tourData?.seasonality) {
      setActiveDep(tourData.seasonality === 1 ? true : false);
    }
  }, [tourData]);
  const onChangeActive = (data) => {
    setActiveDep(!activeDep);
    // console.log(data);
    if (data) {
      data = { active: 1 };
      statusSeasonalityAPI(tourData.id, data);
    } else {
      data = { active: 0 };
      statusSeasonalityAPI(tourData.id, data);
    }
  };

  // console.log(seasonToEdit)

  //form creation
  const validationType = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,
    initialValues: {
      from: dateFromEdit ? dateFromEdit : "",
      to: dateToEdit ? dateToEdit : "",
    },
    // validationSchema: Yup.object().shape({
    //   tour_name: Yup.string().required("Field required"),
    //   code: Yup.string()
    //     .required("Code is required")
    //     .max(2, "Must be exactly 2 chars")
    //     .required("Max 2 chars"),
    // }),
    onSubmit: (values) => {
      if (isEdit) {
        let data = {
          id: idEdit,
          season_id: seasonToEdit,
          start_date: values.from,
          end_date: values.to,
        };
        // console.log('desde put', data)
        putSeasonalityAPI(tourData.id, data)
          .then((resp) => {
            // console.log(resp.data);
            if (resp.data.status === 200) {
              getSeasonsListAPI(tourData.id).then((resp) => {
                setSeasonsData(resp.data.data);
                triggerUpdate()
              });
              Swal.fire("Edited!", "Season has been edited.", "success").then(
                () => {
                  // history.goBack();
                  setIsEdit(false);
                }
              );
            }
          })
          .catch((error) => {
            let errorMessages = [];
            Object.entries(error.response.data.data).map((item) => {
              errorMessages.push(item[1]);
            });

            Swal.fire(
              "Error!",
              // {error.response.},
              String(errorMessages[0])
            );
          });
      } else {
        let data = {
          season_id: seasonSelected,
          start_date: values.from,
          end_date: values.to,
        };
        // console.log('desde post', data)
        postSeasonalityAPI(tourData.id, data)
          .then((resp) => {
            // console.log(resp.data);
            if (resp.data.status === 201) {
              if (tourData?.id) {
                getSeasonsListAPI(tourData.id).then((resp) => {
                  setSeasonsData(resp.data.data);
                });
              }
              Swal.fire("Created!", "Season has been created.", "success").then(
                () => {
                  // history.goBack();
                }
              );
            }
          })
          .catch((error) => {
            // console.log(error.response);
            Swal.fire("Error!", `${error.response.data.data[0]}`, "error");
          });
      }
    },
  });

  return (
    <Form
      onSubmit={(e) => {
        e.preventDefault();
        validationType.handleSubmit();
        return false;
      }}
      className="custom-validation"
    >
      <TabPane tabId="3">
        <Row className="g-4">
          <Col className="col-3">
            <img
              src={HighSeasonImg}
              alt="new tour girl"
              className="img-fluid"
            />
          </Col>
          <Col className="col-9">
            <Row>
              <Col className="col-12">
                <div
                  style={{
                    backgroundColor: "rgba(0, 157, 255, 0.2)",
                  }}
                  className="p-3"
                >
                  <p
                    style={{ fontSize: "16px", color: "#495057" }}
                    className="m-0"
                  >
                    <i
                      class="far fa-lightbulb bg-paradise text-white p-2 rounded-circle text-center"
                      style={{ width: "32px", height: "32px" }}
                    ></i>{" "}
                    In this tab you can add the dates for the different seasonal
                    pricing. Select the name of the season, add the start and
                    end date, and click on “add”. You can add multiple entries
                    under the same season name. Once you create an entry, the
                    record will show in the table below.
                  </p>
                </div>
              </Col>
            </Row>
            <Row className="col-12 d-flex mt-5">
              <Col className="col-4 d-flex justify-content-center border-end border-4 border-paradise">
                <Row className="d-flex flex-column mx-4">
                  <h1 className="text-paradise">New Date Entry</h1>

                  <Col className="">
                    <div className="form-outline my-2">
                      <Label className="form-label">Season Name</Label>
                      <Input
                        type="select"
                        name=""
                        onChange={(e) => {
                          setSeasonSelected(e.target.value);
                          setSeasonToEdit(+e.target.value);
                        }}
                        onBlur={validationType.handleBlur}
                        disabled={!activeDep}
                      >
                        <option>Select....</option>
                        {map(seasonNames, (season, index) => {
                          return (
                            <option
                              key={index}
                              value={season.id}
                              selected={
                                seasonToEdit
                                  ? seasonToEdit === season.id
                                  : false
                              }
                            >
                              {season.name}
                            </option>
                          );
                        })}
                      </Input>
                    </div>
                  </Col>
                  <Col className="">
                    <div className="form-outline my-3">
                      <Label className="form-label">Dates</Label>
                      <div className="d-flex">
                        <div className="input-group">
                          <div className="input-group-text">From</div>
                          <Input
                            name="from"
                            className="form-control"
                            type="date"
                            // defaultValue="2019-08-19"
                            id="example-date-input"
                            onChange={validationType.handleChange}
                            onBlur={validationType.handleBlur}
                            value={validationType.values.from || ""}
                            invalid={
                              validationType.touched.from &&
                              validationType.errors.from
                                ? true
                                : false
                            }
                            disabled={!activeDep}
                          />
                          {validationType.touched.from &&
                          validationType.errors.from ? (
                            <FormFeedback type="invalid">
                              {validationType.errors.from}
                            </FormFeedback>
                          ) : null}
                        </div>
                      </div>
                    </div>
                  </Col>
                  <Col className="">
                    <div className="form-outline my-2">
                      <div className="d-flex">
                        <div className="input-group">
                          <div className="input-group-text">To</div>
                          <Input
                            name="to"
                            className="form-control"
                            type="date"
                            // defaultValue="2019-08-19"
                            id="example-date-input"
                            onChange={validationType.handleChange}
                            onBlur={validationType.handleBlur}
                            value={validationType.values.to || ""}
                            invalid={
                              validationType.touched.to &&
                              validationType.errors.to
                                ? true
                                : false
                            }
                            disabled={!activeDep}
                          />
                          {validationType.touched.to &&
                          validationType.errors.to ? (
                            <FormFeedback type="invalid">
                              {validationType.errors.to}
                            </FormFeedback>
                          ) : null}
                        </div>
                      </div>
                    </div>
                  </Col>
                  <Col className="col-12 d-flex justify-content-center mt-4">
                    <div className="form-outline col-12">
                      <Button
                        color="paradise"
                        outline
                        className="waves-effect waves-light col-12"
                        type="submit"
                        disabled={!activeDep}
                      >
                        {isEdit ? "+ Edit" : "+ Add"}
                      </Button>
                    </div>
                  </Col>
                  <Col className="col-12 d-flex justify-content-center mt-4">
                    <div className="col-6">
                      <Label className="form-label mt-2">
                        High Season Prices
                      </Label>
                      <div className="form-check form-switch form-switch-md mt-1">
                        <Switch
                          uncheckedIcon={<Offsymbol />}
                          checkedIcon={<OnSymbol />}
                          onColor="#3DC7F4"
                          onChange={(e) => onChangeActive(e)}
                          checked={activeDep}
                        />
                      </div>
                    </div>
                  </Col>
                </Row>
              </Col>
              <Col className="col-8 ">
                <div className="table-responsive ms-5">
                  <Table className="table mb-0">
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>From</th>
                        <th>To</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {seasonsData ? (
                        <>
                          {map(seasonsData, (season, index) => {
                            return (
                              <tr key={index}>
                                <th scope="row">{season.name}</th>
                                <td>{season.start_date}</td>
                                <td>{season.end_date}</td>
                                <td>
                                  <div
                                    style={{ cursor: "pointer" }}
                                    className="d-flex gap-3"
                                  >
                                    <div
                                      onClick={() => {
                                        onEditSeason(season);
                                        setIsEdit(true);
                                      }}
                                      className="text-success"
                                    >
                                      <i
                                        className="mdi mdi-pencil font-size-18"
                                        id="edittooltip"
                                      />
                                      <UncontrolledTooltip
                                        placement="top"
                                        target="edittooltip"
                                      >
                                        Edit
                                      </UncontrolledTooltip>
                                    </div>
                                    <div
                                      style={{ cursor: "pointer" }}
                                      className="text-danger"
                                      onClick={() => {
                                        onDeleteSeason(season);
                                      }}
                                    >
                                      <i
                                        className="mdi mdi-delete font-size-18"
                                        id="deletetooltip"
                                      />
                                      <UncontrolledTooltip
                                        placement="top"
                                        target="deletetooltip"
                                      >
                                        Delete
                                      </UncontrolledTooltip>
                                    </div>
                                  </div>
                                </td>
                              </tr>
                            );
                          })}
                        </>
                      ) : null}
                    </tbody>
                  </Table>
                </div>
              </Col>
            </Row>
            <Row
              className="col-12 d-flex justify-content-end mt-5"
              style={{ paddingRight: "30px" }}
            >
              <Button
                color="paradise"
                outline
                className="waves-effect waves-light col-2 mx-4"
                type="button"
                onClick={() => toggle("2")}
              >
                <i className="uil-angle-double-left" />
                Back
              </Button>
              <Button
                type="button"
                className="font-16 btn-block col-2 btn-orange"
                onClick={() => toggle("4")}
              >
                Continue
                <i className="uil-angle-double-right mx-1 " />
              </Button>
            </Row>
          </Col>
        </Row>
      </TabPane>
    </Form>
  );
};

export default HighSeasons;
