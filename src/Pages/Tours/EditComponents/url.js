import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  Button,
  Col,
  Form,
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
} from "../../../Utils/API/Tours";
import { map } from "lodash";
import { useFormik } from "formik";
const URL = ({ tourData }) => {
  const [data, setData] = useState();
  const [urlTypes, setUrlTypes] = useState();
  const [urlTypeSelected, setUrlTypeSelected] = useState(null);
  const [locationData, setLocationData] = useState();
  const [locationSelected, setLocationSelected] = useState(0)
  const [pathData, setPathData] = useState()
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
    getPathAPI(tourData.id, urlTypeSelected, locationSelected).then((resp) => {
        setPathData(resp.data.data);
    });
  }, [urlTypeSelected]);

  console.log("data de urls", data);
  console.log('path data', pathData);

  const columns = useMemo(
    () => [
      {
        Header: "URL Type",
        accessor: "type",
        disableFilters: true,
        filterable: false,
        Cell: (cellProps) => {
          return <URLType {...cellProps} />;
        },
      },
      {
        Header: "Location",
        accessor: "location",
        disableFilters: true,
        filterable: false,
        Cell: (cellProps) => {
          return <Location {...cellProps} />;
        },
      },
      {
        Header: "URL",
        accessor: "link",
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
          const tourData = cellProps.row.original;
          return (
            <div className="d-flex gap-3">
              <div className="text-paradise">
                <Link
                  // to={`/tours/${tourData.id}`}
                  className="text-success"
                >
                  <i className="mdi mdi-pencil font-size-18" id="edittooltip" />
                  <UncontrolledTooltip placement="top" target="edittooltip">
                    Edit
                  </UncontrolledTooltip>
                </Link>
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
        //  path: pathData.path
        },
        // validationSchema: Yup.object().shape({
        //   tour_name: Yup.string().required("Field required"),
        //   code: Yup.string()
        //     .required("Code is required")
        //     .max(2, "Must be exactly 2 chars")
        //     .required("Max 2 chars"),
        // }),
        onSubmit: (values) => {
        //   let data = {
        //     provider_tour_name: values.provider_tour_name
        //       ? values.provider_tour_name
        //       : "",
        //     provider_tour_url: values.provider_tour_url
        //       ? values.provider_tour_url
        //       : "",
        //     available_seasons: seasonSelected,
        //     available_from: availableFromIDs,
        //     infants_range_from: values.infants_range_from
        //       ? values.infants_range_from
        //       : "",
        //     infants_range_to: values.infants_range_to
        //       ? values.infants_range_to
        //       : "",
        //     kids_range_from: values.kids_range_from ? values.kids_range_from : "",
        //     kids_range_to: values.kids_range_to ? values.kids_range_to : "",
        //     teenagers_range_from: values.teenagers_range_from
        //       ? values.teenagers_range_from
        //       : "",
        //     teenagers_range_to: values.teenagers_range_to
        //       ? values.teenagers_range_to
        //       : "",
        //   };
    
        //   putSettingsAPI(id, data)
        //     .then((resp) => {
        //       console.log(resp.data);
        //       if (resp.data.status === 200) {
        //         Swal.fire("Edited!", "Settings has been created.", "success");
        //       }
        //     })
        //     .catch((error) => {
        //       console.log(error.response);
        //       Swal.fire("Error!", `${error.response.data.data[0]}`, "error");
        //     });
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
    <Row xl={12}>
      <Row>
        <h1 className="text-paradise">URLs</h1>
      </Row>
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
                    //   selected={
                    //     dataEdit && dataEdit.pricedetails
                    //       ? type.id ===
                    //         dataEdit.pricedetails[0].source_id
                    //       : false
                    //   }
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
                    //   selected={
                    //     dataEdit && dataEdit.pricedetails
                    //       ? location.id ===
                    //         dataEdit.pricedetails[0].source_id
                    //       : false
                    //   }
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
                // placeholder={pathData.path}
                type="text"
               disabled
              />
             
              <Input
                name="min"
                placeholder=""
                type="text"
                //   onChange={validationType.handleChange}
                //   onBlur={validationType.handleBlur}
                //   value={validationType.values.min || ""}
                //   invalid={
                //     validationType.touched.min && validationType.errors.min
                //       ? true
                //       : false
                //   }
              />
              {/* {validationType.touched.min && validationType.errors.min ? (
                      <FormFeedback type="invalid">
                        {validationType.errors.min}
                      </FormFeedback>
                    ) : null} */}
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

      <Row>
        {data ? (
          <TableContainer columns={columns} data={data} cartsTable={true} />
        ) : null}
      </Row>
    </Row>
    </Form>
  );
};

export default URL;
