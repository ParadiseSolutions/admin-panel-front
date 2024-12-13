import React, { useEffect, useMemo, useState } from "react";
import {
  Button,
  Col,
  Form,
  FormFeedback,
  Input,
  Label,
  Row,
  UncontrolledTooltip,
} from "reactstrap";
import TableContainer from "../../../Components/Common/TableContainer";
import { URLLink, URLType, Location } from "../URLCols";
import * as Yup from "yup";

import {
  getURLsAPI,
  getURLTypeAPI,
  getURLAvailableFromAPI,
  getPathAPI,
  postURLAPI,
  updateURLAPI,
  deleteURL,
  triggerUpdate,
} from "../../../Utils/API/Tours";
import { map } from "lodash";
import { useFormik } from "formik";
import Swal from "sweetalert2";
const URL = ({ tourData, toggle }) => {
  const [data, setData] = useState();
  const [urlTypes, setUrlTypes] = useState();
  const [urlTypeSelected, setUrlTypeSelected] = useState(null);
  const [locationData, setLocationData] = useState();
  const [locationSelected, setLocationSelected] = useState(0);
  const [pathData, setPathData] = useState();
  const [basePath, setBasePath] = useState(null);
  const [complementURL, setComplementURL] = useState(null);
  const [editURLID, setEditURLID] = useState(null);

  useEffect(() => {
    getURLsAPI(tourData.id).then((resp) => {
      setData(resp.data.data);
    });

    getURLTypeAPI(tourData.id).then((resp) => {
      setUrlTypes(resp.data.data);
      if (resp.data.data.length > 0) {
        setUrlTypeSelected(resp.data.data[0].url_type_id);
      }
    });
  }, [tourData]);

  useEffect(() => {
    getURLAvailableFromAPI(tourData.id, urlTypeSelected).then((resp) => {
      setLocationData(resp.data.data);
      // if (resp.data.data.length === 1) {
      //   setLocationSelected(resp.data.data[0].available_from_id);
      // } else {
      //   setLocationSelected(null);
      // }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [urlTypeSelected]);

  useEffect(() => {
    if (urlTypeSelected !== null && locationSelected !== null) {
      getPathAPI(tourData.id, urlTypeSelected, locationSelected).then((resp) => {
        setBasePath(resp.data.data.base_path)
        // setComplementURL(resp.data.data.filename);
        // setPathData(resp.data.data);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [urlTypeSelected, locationSelected]);

  const onEditURL = (url) => {
    // console.log(url);
    setUrlTypeSelected(url.path_type_id);
    getURLAvailableFromAPI(tourData.id, url.path_type_id).then((resp) => {
      setLocationData(resp.data.data);
      setLocationSelected(url.available_from_id);
      setComplementURL(url.filename);
      setBasePath(url.base_path);
      setEditURLID(url.id);
    });
    // console.log(url);
  };

  const cancelEditing = () => {
    setUrlTypeSelected(null);
    setLocationSelected(null);
    setComplementURL(null);
    setEditURLID(null);
    setPathData(null);
  };

  const onDeleteURL = (urlData) => {
    deleteURL(urlData.id).then((resp) => {
      // console.log(resp.data);
      if (resp.data.status === 200) {
        Swal.fire("Deleted!", "URL has been deleted.", "success");
        getURLsAPI(tourData.id).then((resp) => {
          triggerUpdate();
          setData(resp.data.data);
        });
      }
    });
  };

  const columns = useMemo(
    () => [
      {
        Header: "URL Type",
        accessor: "path_type",
        disableFilters: true,
        filterable: false,
        Cell: (cellProps) => {
          return <URLType {...cellProps} />;
        },
      },
      {
        Header: "Location",
        accessor: "available_from",
        disableFilters: true,
        filterable: false,
        Cell: (cellProps) => {
          return <Location {...cellProps} />;
        },
      },
      {
        Header: "URL",
        accessor: "url",
        disableFilters: true,
        filterable: false,
        Cell: (cellProps) => {
          return <URLLink {...cellProps} />;
        },
      },
      {
        Header: "",
        accessor: "action",
        disableFilters: true,
        Cell: (cellProps) => {
          const URLData = cellProps.row.original;
          return (
            <div className="d-flex gap-3">
              <div className="text-paradise">
                <div
                  // to={`/tours/${tourData.id}`}
                  className="text-success"
                  onClick={() => onEditURL(URLData)}
                >
                  <i
                    className="mdi mdi-pencil font-size-18"
                    id="edittooltip"
                    style={{ cursor: "pointer" }}
                  />
                  <UncontrolledTooltip placement="top" target="edittooltip">
                    Edit
                  </UncontrolledTooltip>
                </div>
              </div>
              <div
                className="text-danger"
                onClick={() => {
                  const urlData = cellProps.row.original;
                  // setconfirm_alert(true);
                  onDeleteURL(urlData);
                }}
              >
                <i
                  className="mdi mdi-delete font-size-18"
                  id="deletetooltip"
                  style={{ cursor: "pointer" }}
                />
                <UncontrolledTooltip placement="top" target="deletetooltip">
                  Delete
                </UncontrolledTooltip>
              </div>
            </div>
          );
        },
      },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    ],[]);

  //form creation
  const validationType = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,
    initialValues: {
      base_path: basePath ? basePath : "",
      complement: complementURL ? complementURL : "",
    },
    validationSchema: Yup.object().shape({
      complement: Yup.string().required("Field required"),
    }),
    onSubmit: (values, { resetForm }) => {
      // console.log(values);
      let data = {
        tour_id: tourData.id,
        path_type_id: urlTypeSelected ? urlTypeSelected : null,
        available_from_id: locationSelected ? locationSelected : "",
        url: `${values.base_path}${values.complement}`,
        base_path: values.base_path,
        filename: values.complement,
      };

      if (editURLID) {
        updateURLAPI(editURLID, data)
          .then((resp) => {
            // console.log(resp.data);
            if (resp.data.status === 200) {
              Swal.fire("Edited!", "URL has been edited.", "success");
              getURLsAPI(tourData.id).then((resp) => {
                triggerUpdate()
                setData(resp.data.data);
              });
              cancelEditing();
            }
          })
          .catch((error) => {
            if (error.response.data.data === null) {
              Swal.fire(
                "Error!",
                // {error.response.},
                String(error.response.data.message)
              );
            } else {
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
            }
          });
      } else {
        postURLAPI(data)
          .then((resp) => {
            // console.log(resp.data);
            if (resp.data.status === 201) {
              Swal.fire("Created!", "URL has been created.", "success");
              getURLsAPI(tourData.id).then((resp) => {
                setData(resp.data.data);
              });
              setComplementURL(null);
            }
          })
          .catch((error) => {
            if (error.response.data.data === null) {
              Swal.fire(
                "Error!",
                // {error.response.},
                String(error.response.data.message)
              );
            } else {
              let errorMessages = [];
              Object.entries(error.response.data.data).map((item) => {
                errorMessages.push(item[1]);
                return true
              });

              Swal.fire(
                "Error!",
                String(errorMessages[0])
              );
            }
          });
      }
    },
  });

  return (
    <Row xl={12}>
      <Row>
        <h1 className="text-paradise">URLs</h1>
      </Row>
      <Form
        onSubmit={(e) => {
          e.preventDefault();
          validationType.handleSubmit();
          return false;
        }}
        className="custom-validation"
      >
        <Row className="d-flex">
          <Col className="col-2">
            <div className="form-outline my-2">
              <Label className="form-label">URL Type</Label>
              <Input
                type="select"
                name="path_type_id"
                onChange={(e) => {
                  setUrlTypeSelected(e.target.value);
                }}
                // onBlur={validationType.handleBlur}
                //   value={validationType.values.department || ""}
              >
                <option value="">Select....</option>
                {map(urlTypes, (type, index) => {
                  return (
                    <option
                      key={index}
                      value={type.url_type_id}
                      selected={
                        urlTypeSelected
                          ? type.url_type_id === urlTypeSelected
                          : false
                      }
                    >
                      {type.url_type_name}
                    </option>
                  );
                })}
              </Input>
            </div>
          </Col>
          {locationData && locationData?.length > 0 ? (
            <Col className="col-2">
              <div className="form-outline my-2">
                <Label className="form-label">Location</Label>
                <Input
                  type="select"
                  name="location"
                  onChange={(e) => {
                    setLocationSelected(e.target.value);
                  }}
                  // onBlur={validationType.handleBlur}
                  //   value={validationType.values.department || ""}
                >
                  <option value="">Select....</option>
                  {map(locationData, (location, index) => {
                    return (
                      <option
                        key={index}
                        value={location.available_from_id}
                        selected={
                          locationSelected
                            ? location.available_from_id === locationSelected
                            : false
                        }
                      >
                        {location.available_from_name}
                      </option>
                    );
                  })}
                </Input>
              </div>
            </Col>
          ) : null}
          <Col>
            <div className="form-outline my-2">
              <Label className="form-label">Enter File Name</Label>
              <Col className="d-flex">
                <Input
                  name="base_path"
                  placeholder=""
                  onChange={(e) => {
                    setBasePath(e.target.value);
                  }}
                  value={validationType.values.base_path || ""}
                  type="text"
                  disabled
                />

                <Input
                  name="complement"
                  placeholder=""
                  type="text"
                  onChange={(e) => {
                    setComplementURL(e.target.value);
                  }}
                  value={validationType.values.complement || ""}
                  onBlur={validationType.handleBlur}
                  invalid={
                    validationType.touched.complement &&
                    validationType.errors.complement
                      ? true
                      : false
                  }
                />
                {validationType.touched.complement &&
                validationType.errors.complement ? (
                  <FormFeedback type="invalid">
                    {validationType.errors.complement}
                  </FormFeedback>
                ) : null}
              </Col>
            </div>
          </Col>
          {editURLID ? (
            <>
              <Col className="col-1">
                <Col className=" d-flex justify-content-end mt-4">
                  <Button
                    style={{ marginTop: "13px" }}
                    type="button"
                    className="font-16 btn-block btn-orange col"
                    onClick={() => cancelEditing()}
                  >
                    Cancel
                  </Button>
                </Col>
              </Col>
              <Col className="col-1">
                <Col className=" d-flex justify-content-end mt-4">
                  <Button
                    style={{ marginTop: "13px" }}
                    type="submit"
                    className="font-16 btn-block btn-orange col"
                    // onClick={toggleCategory}
                  >
                    Submit
                  </Button>
                </Col>
              </Col>
            </>
          ) : (
            <Col className="col-1">
              <Col className=" d-flex justify-content-end mt-4">
                <Button
                  style={{ marginTop: "13px" }}
                  type="submit"
                  className="font-16 btn-block btn-orange col"
                  // onClick={toggleCategory}
                >
                  + Add URL
                </Button>
              </Col>
            </Col>
          )}
        </Row>
      </Form>
      <Row>
        {data ? (
          <TableContainer columns={columns} data={data} URLTourTable={true} />
        ) : null}
      </Row>
      <Col
        className="col-12 d-flex justify-content-end mt-5"
        style={{ paddingRight: "30px" }}
      >
        <Button
          color="paradise"
          outline
          className="waves-effect waves-light me-3"
          type="button"
          onClick={() => toggle("3")}
        >
          <i className="uil-angle-double-left" />
          Previous
        </Button>
        <Button
          type="button"
          className="font-16 btn-block btn-orange"
          onClick={() => toggle("5")}
        >
          Continue
          <i className="uil-angle-double-right mx-1 " />
        </Button>
      </Col>
    </Row>
  );
};

export default URL;
