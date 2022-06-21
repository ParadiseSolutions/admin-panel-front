import React, { useEffect, useState, useMemo } from "react";
import PricingTables from "./PricingTables/pricingTables";
import { departmentsData } from "../../../Utils/Redux/Actions/DepartmentsActions";
import { useDispatch, useSelector } from "react-redux";

import {
  TabPane,
  Row,
  Col,
  Form,
  Label,
  Input,
  FormFeedback,
  Button,
  UncontrolledTooltip
} from "reactstrap";

import { Name, Code, Date, Members, Active } from "../EditComponents/PricingTables/DepartmentsCols";
// import classnames from "classnames";

// import * as Yup from "yup";
import { useFormik } from "formik";
import { map } from "lodash";
import Swal from "sweetalert2";
import { Select } from "antd";
import moment from "moment";
import { Link } from "react-router-dom";
const { Option } = Select;

const Pricing = ({ history, tourSettings, id }) => {
  console.log(tourSettings);
  //get initial data tour types
  const dispatch = useDispatch();

  
  //departments request
  useEffect(() => {
    const departmentsRequest = () => dispatch(departmentsData());
    departmentsRequest();
  }, [dispatch]);


  //get info
  const data = useSelector((state) => state.departments.departments.data);

  //form creation
  //   const validationType = useFormik({
  //     // enableReinitialize : use this flag when initial values needs to be changed
  //     enableReinitialize: true,
  //     initialValues: {
  //       tour_id: id,
  //       provider_tour_name: tourSettings.provider_tour_name
  //         ? tourSettings.provider_tour_name
  //         : "",
  //         available_seasons: tourSettings.available_seasons,
  //       provider_tour_url: tourSettings.provider_tour_url
  //         ? tourSettings.provider_tour_url
  //         : "",
  //       infants_range_from: tourSettings.infants_range_from
  //         ? tourSettings.infants_range_from
  //         : "",
  //       infants_range_to: tourSettings.infants_range_to
  //         ? tourSettings.infants_range_to
  //         : "",
  //       kids_range_from: tourSettings.kids_range_from
  //         ? tourSettings.kids_range_from
  //         : "",
  //       kids_range_to: tourSettings.kids_range_to
  //         ? tourSettings.kids_range_to
  //         : "",
  //       teenagers_range_from: tourSettings.teenagers_range_from
  //         ? tourSettings.teenagers_range_from
  //         : "",
  //       teenagers_range_to: tourSettings.teenagers_range_to
  //         ? tourSettings.teenagers_range_to
  //         : "",
  //     },
  //     // validationSchema: Yup.object().shape({
  //     //   tour_name: Yup.string().required("Field required"),
  //     //   code: Yup.string()
  //     //     .required("Code is required")
  //     //     .max(2, "Must be exactly 2 chars")
  //     //     .required("Max 2 chars"),
  //     // }),
  //     onSubmit: (values) => {

  //       let data = {
  //         provider_tour_name: values.provider_tour_name
  //           ? values.provider_tour_name
  //           : "",
  //         provider_tour_url: values.provider_tour_url
  //           ? values.provider_tour_url
  //           : "",
  //         available_seasons: seasonSelected,
  //         available_from: availableFromIDs,
  //         infants_range_from: values.infants_range_from
  //           ? values.infants_range_from
  //           : "",
  //         infants_range_to: values.infants_range_to
  //           ? values.infants_range_to
  //           : "",
  //         kids_range_from: values.kids_range_from ? values.kids_range_from : "",
  //         kids_range_to: values.kids_range_to ? values.kids_range_to : "",
  //         teenagers_range_from: values.teenagers_range_from
  //           ? values.teenagers_range_from
  //           : "",
  //         teenagers_range_to: values.teenagers_range_to
  //           ? values.teenagers_range_to
  //           : "",
  //       };
  //       console.log(data)
  //       putSettingsAPI(id, data)
  //         .then((resp) => {
  //           console.log(resp.data);
  //           if (resp.data.status === 200) {
  //             Swal.fire("Edited!", "Settings has been created.", "success");
  //           }
  //         })
  //         .catch((error) => {
  //           console.log(error.response);
  //           Swal.fire("Error!", `${error.response.data.data[0]}`, "error");
  //         });
  //     },
  //   });

    //table actions
    const onDelete = (depData) => {
        Swal.fire({
          title: "Delete Department?",
          icon: "question",
          text: `Do you want delete ${depData.name}`,
          showCancelButton: true,
          confirmButtonText: "Yes",
          confirmButtonColor: "#F38430",
          cancelButtonText: "Cancel",
        }).then((resp) => {
          if (resp.isConfirmed) {
            // departmentDelete(depData.id)
            //   .then((resp) => {
            //     const departmentsRequest = () => dispatch(departmentsData());
            //     departmentsRequest();
            //     Swal.fire(
            //       "Deleted!",
            //       "The department has been deleted.",
            //       "success"
            //     );
            //   })
            //   .catch((error) => {
            //     console.log(error);
            //   });
          }
        });
      };
    

  const columns = useMemo(
    () => [
      {
        Header: <h2 className="text-paradise font-weight-bold">Products</h2>,
        accessor: "name",
        disableFilters: true,
        filterable: false,
        Cell: (cellProps) => {
          return <Name {...cellProps} />;
        },
      },
      {
        Header: "SKU",
        accessor: "code",
        disableFilters: true,
        filterable: false,
        Cell: (cellProps) => {
          return <Code {...cellProps} />;
        },
      },
      {
        Header: "Reg. Price",
        accessor: "members.length",
        disableFilters: true,
        filterable: false,
        Cell: (cellProps) => {
          return <Members {...cellProps} />;
        },
      },
      {
        Header: "Our Price",
        accessor: "members.length",
        disableFilters: true,
        filterable: false,
        Cell: (cellProps) => {
          return <Members {...cellProps} />;
        },
      },
      {
        Header: "Save",
        accessor: "members.length",
        disableFilters: true,
        filterable: false,
        Cell: (cellProps) => {
          return <Members {...cellProps} />;
        },
      },
      {
        Header: "Rate %",
        accessor: "members.length",
        disableFilters: true,
        filterable: false,
        Cell: (cellProps) => {
          return <Members {...cellProps} />;
        },
      },
      {
        Header: "Rate %",
        accessor: "members.length",
        disableFilters: true,
        filterable: false,
        Cell: (cellProps) => {
          return <Members {...cellProps} />;
        },
      },
      {
        Header: "Rate %",
        accessor: "members.length",
        disableFilters: true,
        filterable: false,
        Cell: (cellProps) => {
          return <Members {...cellProps} />;
        },
      },
      
      {
        Header: "Active",
        accessor: "active",
        disableFilters: true,
        filterable: false,
        Cell: (cellProps) => {
          return <Active {...cellProps} />;
        },
      },
      {
        Header: "Action",
        accessor: "action",
        disableFilters: true,
        Cell: (cellProps) => {
          const depData = cellProps.row.original;
          return (
            <div className="d-flex gap-3">
              <Link
                to={`/departments/${depData.id}`}
                className="text-success"
                
              >
                <i className="mdi mdi-pencil font-size-18" id="edittooltip" />
                <UncontrolledTooltip placement="top" target="edittooltip">
                  Edit
                </UncontrolledTooltip>
              </Link>
              <Link
                to="#"
                className="text-danger"
                onClick={() => {
                  const depData = cellProps.row.original;
                  // setconfirm_alert(true);
                  onDelete(depData);
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

  return (
    <Form
      onSubmit={(e) => {
        e.preventDefault();
        // validationType.handleSubmit();
        return false;
      }}
      className="custom-validation"
    >
      <TabPane tabId="1" className="">
        <Row xl={12}>
        {data ? (
                    <PricingTables
                      columns={columns}
                      data={data}
                      isGlobalFilter={true}
                      productsTable={true}
                      isAddOrder={true}
                      // handleOrderClicks={handleOrderClicks}
                    />
                  ) : null}
        </Row>
        <Row xl={12}>
        {data ? (
                    <PricingTables
                      columns={columns}
                      data={data}
                      isGlobalFilter={true}
                      addonsTable={true}
                      isAddOrder={true}
                      // handleOrderClicks={handleOrderClicks}
                    />
                  ) : null}
        </Row>
        <Row xl={12}>
          <Row
            className="col-12 d-flex justify-content-end mt-5"
            style={{ paddingRight: "30px" }}
          >
            <Button
              color="paradise"
              outline
              className="waves-effect waves-light col-2 mx-4"
              type="button"
              onClick={() => history.goBack()}
            >
              <i className="uil-angle-double-left" />
              Back
            </Button>
            <Button
              style={{ backgroundColor: "#F6851F" }}
              type="submit"
              className="font-16 btn-block col-2"
              // onClick={toggleCategory}
            >
              Continue
              <i className="uil-angle-double-right mx-1 " />
            </Button>
          </Row>
        </Row>
      </TabPane>
    </Form>
  );
};

export default Pricing;
