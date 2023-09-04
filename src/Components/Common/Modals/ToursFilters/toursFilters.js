import { useEffect, useState } from "react";
import PrivateCharterImage from "../../../Assets/images/private-charter.png";
import {
  Row,
  Col,
  Modal,
  Form,
  Label,
  Input,
  FormFeedback,
  Button,
  UncontrolledTooltip,
} from "reactstrap";
import * as Yup from "yup";
import { useFormik } from "formik";

import { map } from "lodash";
import Swal from "sweetalert2";

const ToursFilters = ({ filters, setFilters }) => {

  const validationType = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      tour_name: "",
     
    },
    validationSchema: Yup.object().shape({
     /*  company_name: Yup.string().required("Name is required"),
      code: Yup.string()
        .required("Code is required")
        .min(2, "Code must be 2-character long")
        .max(2, "Code must be 2-character long"),
      domain: Yup.string().required("Domain is required"),
      url: Yup.string().required("URL is required").matches(
        /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
        "Enter correct url!"
      ), */
      // cpanel_account: Yup.string().required("cPanel Account Name is required"),
      // root_folder: Yup.string().required("Root Folder Name is required"),
      // user_folder: Yup.string().required("User Folder Name is required"),
      // accent_color: Yup.string().required("Accent Color is required"),
      // primary_color: Yup.string().required("Primary Color is required"),
      // secondary_color: Yup.string().required("Secondary Color is required"),
    }),
   /*  onSubmit: (values) => {
      // console.log("values are", values);
      let data = {
        company_name: values.company_name,
        code: values.code,
        domain: values.domain,
        url: values.url,
        cpanel_account: values.cpanel_account,
        root_folder: values.root_folder,
        user_folder: values.user_folder,
        accent_color: values.accent_color,
        primary_color: values.primary_color,
        secondary_color: values.secondary_color,
		service_area_ids: selectionID
      };
      createWebsite(data)
        .then((resp) => {
          // console.log(resp.data);
          if (resp.data.status === 201) {
            Swal.fire(
              "Success!",
              "The website has been created.",
              "success"
            ).then(() => {
              window.location.href = "/websites";
              //history.goBack()
            });
          }
        })
        .catch((error) => {
          let errorMessages = [];
          Object.entries(error.response.data.data).map((item) => {
           return errorMessages.push(item[1]);
          });

          Swal.fire(
            "Error!",
            // {error.response.},
            String(errorMessages[0])
          );
        });
    }, */
  });
  return (
    <Modal
      centered
      size="xl"
      isOpen={filters}
      toggle={() => {
        // onClickAddNew();
      }}
    >
      <div
        className="modal-header"
        style={{ backgroundColor: "#3DC7F4", border: "none" }}
      >
        <h1 className="modal-title mt-0 text-white">Choose Filters</h1>

        <button
          onClick={() => {
            setFilters(false);
          }}
          type="button"
          className="close"
          style={{ color: "white" }}
          data-dismiss="modal"
          aria-label="Close"
        >
          <span aria-hidden="true" className="text-white bg-white">
            &times;
          </span>
        </button>
      </div>
      <div className="modal-body p-4">
        <Form
          onSubmit={(e) => {
            e.preventDefault();
            validationType.handleSubmit();
            return false;
          }}
          className="custom-validation"
        >
          <Row className="d-flex g-4">
            <Col className="col-3">
              <img
                src={PrivateCharterImage}
                alt="new-product"
                className="img-fluid"
              />
            </Col>
            <Col className="col-9">
              <Col lg={10}>
                <div className="form-outline mb-4">
                  
                  <h4 className="form-label font-weight-bold">Tour Name or URL</h4>
                  <Input
                    name="tour_name"
                    placeholder="Cancun Discount"
                    type="text"
                    onChange={validationType.handleChange}
                    onBlur={validationType.handleBlur}
                    value={validationType.values.tour_name || ""}
                    invalid={
                      validationType.touched.tour_name &&
                      validationType.errors.tour_name
                        ? true
                        : false
                    }
                  />
                  {validationType.touched.tour_name &&
                  validationType.errors.tour_name ? (
                    <FormFeedback type="invalid">
                      {validationType.errors.tour_name}
                    </FormFeedback>
                  ) : null}
                </div>
              </Col>
            </Col>
            <Row>
              <Col className="col-12 d-flex justify-content-end mt-4">
                <Button
                  color="paradise"
                  outline
                  className="waves-effect waves-light col-2 mx-4"
                  type="button"
                  onClick={() => setFilters(false)}
                >
                  Close
                </Button>
                <Button
                  type="submit"
                  className="font-16 btn-block col-2 btn-orange"
                  // onClick={toggleCategory}
                >
                  Save
                </Button>
              </Col>
            </Row>
          </Row>
        </Form>
      </div>
    </Modal>
  );
};

export default ToursFilters;
