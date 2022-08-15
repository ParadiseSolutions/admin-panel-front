import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
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

import {
  getURLsAPI,
  getURLTypeAPI,
  getURLAvailableFromAPI,
  getPathAPI,
  postURLAPI,
  updateURLAPI,
} from "../../../Utils/API/Tours";
import { map } from "lodash";
import { useFormik } from "formik";
import Swal from "sweetalert2";
const URL = ({ tourData }) => {
  const [data, setData] = useState();
  const [urlTypes, setUrlTypes] = useState();
  const [urlTypeSelected, setUrlTypeSelected] = useState(null);
  const [locationData, setLocationData] = useState();
  const [locationSelected, setLocationSelected] = useState(0);

  const [pathData, setPathData] = useState();
  useEffect(() => {
    getURLsAPI(tourData.id).then((resp) => {
      setData(resp.data.data);
    });

    getURLTypeAPI(tourData.id).then((resp) => {
      setUrlTypes(resp.data.data);
    });
  }, [tourData]);

  useEffect(() => {
    getURLAvailableFromAPI(tourData.id, urlTypeSelected).then((resp) => {
      setLocationData(resp.data.data);
    });
  }, [urlTypeSelected]);

  useEffect(() => {
    console.log("llamado");
    getPathAPI(tourData.id, urlTypeSelected, locationSelected).then((resp) => {
      setPathData(resp.data.data);
    });
  }, [urlTypeSelected, locationSelected]);

  console.log("data de urls", data);

  const [editTypeURL, setEditTypeURL] = useState(null);
  const [editLocationURL, setEditLocationURL] = useState(null);
  const [editComplementURL, setEditComplementURL] = useState(null);
  const [editBasePath, setEditBasePath] = useState(null);
  const [editURLID, setEditURLID] = useState(null);
  const onEditURL = (url) => {
    setEditTypeURL(url.path_type_id);
    getURLAvailableFromAPI(tourData.id, url.path_type_id).then((resp) => {
      setLocationData(resp.data.data);
      setEditLocationURL(url.available_from_id);
      setEditComplementURL(url.filename);
      setEditBasePath(url.base_path);
      setEditURLID(url.id);
    });
    console.log(url);
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
                  <i className="mdi mdi-pencil font-size-18" id="edittooltip" />
                  <UncontrolledTooltip placement="top" target="edittooltip">
                    Edit
                  </UncontrolledTooltip>
                </div>
              </div>
              <Link
                to="#"
                className="text-danger"
                onClick={() => {
                  const tourData = cellProps.row.original;
                  // setconfirm_alert(true);
                  //   onDelete(tourData);
                }}
              >
                <i className="mdi mdi-delete font-size-18" id="deletetooltip" />
                <UncontrolledTooltip placement="top" target="deletetooltip">
                  Delete
                </UncontrolledTooltip>
              </Link>
            </div>
          );
        },
      },
    ],
    []
  );

  //form creation
  const validationType = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,
    initialValues: {
      path: pathData?.path ? pathData.path : "",
      complement: editComplementURL ? editComplementURL : "",
    },
    // validationSchema: Yup.object().shape({
    //   tour_name: Yup.string().required("Field required"),
    //   code: Yup.string()
    //     .required("Code is required")
    //     .max(2, "Must be exactly 2 chars")
    //     .required("Max 2 chars"),
    // }),
    onSubmit: (values) => {
      console.log(values);
      let data = {
        tour_id: tourData.id,
        path_type_id: urlTypeSelected,
        available_from_id: locationSelected ? locationSelected : "",
        url: `${values.path}${values.complement}`,
      };

      if (editURLID) {
        updateURLAPI(editURLID, data)
          .then((resp) => {
            console.log(resp.data);
            if (resp.data.status === 201) {
              Swal.fire("Created!", "URL has been created.", "success");
              getURLsAPI(tourData.id).then((resp) => {
                setData(resp.data.data);
              });
            }
          })
          .catch((error) => {
            console.log(error.response);
            Swal.fire("Error!", `${error.response.data.data[0]}`, "error");
          });
      } else {
        postURLAPI(data)
          .then((resp) => {
            console.log(resp.data);
            if (resp.data.status === 200) {
              Swal.fire("Edited!", "URL has been edited.", "success");
              getURLsAPI(tourData.id).then((resp) => {
                setData(resp.data.data);
              });
            }
          })
          .catch((error) => {
            console.log(error.response);
            Swal.fire("Error!", `${error.response.data.data[0]}`, "error");
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
                name="price_type"
                onChange={(e) => {
                  setUrlTypeSelected(e.target.value);
                }}
                // onBlur={validationType.handleBlur}
                //   value={validationType.values.department || ""}
              >
                <option>Select....</option>
                {map(urlTypes, (type, index) => {
                  return (
                    <option
                      key={index}
                      value={type.url_type_id}
                      selected={
                        editTypeURL ? type.url_type_id === editTypeURL : false
                      }
                    >
                      {type.url_type_name}
                    </option>
                  );
                })}
              </Input>
            </div>
          </Col>
          <Col className="col-2">
            <div className="form-outline my-2">
              <Label className="form-label">Location</Label>
              <Input
                type="select"
                name="price_type"
                onChange={(e) => {
                  setLocationSelected(e.target.value);
                }}
                // onBlur={validationType.handleBlur}
                //   value={validationType.values.department || ""}
              >
                <option>Select....</option>
                {map(locationData, (location, index) => {
                  return (
                    <option
                      key={index}
                      value={location.available_from_id}
                      selected={
                        editLocationURL
                          ? location.available_from_id === editLocationURL
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
          <Col className="col-6">
            <div className="form-outline my-2">
              <Label className="form-label">Enter File Name</Label>
              <Col className="d-flex">
                <Input
                  name="path"
                  placeholder={
                    pathData?.path
                      ? pathData.path
                      : editBasePath
                      ? editBasePath
                      : ""
                  }
                  type="text"
                  disabled
                />

                <Input
                  name="complement"
                  placeholder=""
                  type="text"
                  onChange={validationType.handleChange}
                  onBlur={validationType.handleBlur}
                  value={validationType.values.complement || ""}
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
          <Col>
            <Col className=" d-flex justify-content-end mt-4">
              <Button
                style={{ backgroundColor: "#F6851F", marginTop: "13px" }}
                type="submit"
                className="font-16 btn-block col"
                // onClick={toggleCategory}
              >
                + Add URL
              </Button>
            </Col>
          </Col>
        </Row>
      </Form>
      <Row>
        {data ? (
          <TableContainer columns={columns} data={data} URLTourTable={true} />
        ) : null}
      </Row>
    </Row>
  );
};

export default URL;
