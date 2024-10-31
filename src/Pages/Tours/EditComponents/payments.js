import React, { useEffect, useState } from "react";
import {
  paymentsTaxGet,
  paymentsGratuiteGet,
  paymentsGratuiteTypeGet,
  paymentsBaseOnGet,
  paymentsApplyGet
} from "../../../Utils/API/Tours";
import { getCurrency } from "../../../Utils/API/Operators";
import SettingsImageOne from "../../../Components/Assets/images/settings1.png";
import SettingsImageTwo from "../../../Components/Assets/images/settings2.png";
import SettingsImageThree from "../../../Components/Assets/images/settings3.png";
import {
  TabPane,
  Row,
  Col,
  Form,
  Label,
  Input,
  FormFeedback,
  Button,
} from "reactstrap";
import { useFormik } from "formik";
import Swal from "sweetalert2";
import { map } from "lodash";

const Payments = ({ history, tourSettings, id, toggle }) => {

  const [taxData, setTaxData] = useState([])
  const [gratuitesData, setGratuitesData] = useState([])
  const [gratuitesTypeData, setGratuitesTypeData] = useState([])
  const [basedOnData, setBasedOnData] = useState([])
  const [applyData, setApplyData] = useState([])
  const [currencyData, setCurrencyData] = useState([])
  const [taxSelected, setTaxSelected] = useState([])
  const [gratuitesSelected, setGratuitesSelected] = useState([])
  const [gratuitesTypeSelected, setGratuitesTypeSelected] = useState([])
  const [basedOnSelected, setBasedOnSelected] = useState([])
  const [applySelected, setApplySelected] = useState([])
  const [currencySelected, setCurrencySelected] = useState([])
  //initial Data
  useEffect(() => {
    paymentsTaxGet().then((resp) =>{
      setTaxData(resp.data.data)
    })
    paymentsGratuiteGet().then((resp) =>{
      setGratuitesData(resp.data.data)
    })
    paymentsGratuiteTypeGet().then((resp) =>{
      setGratuitesTypeData(resp.data.data)
    })
    paymentsBaseOnGet().then((resp) =>{
      setBasedOnData(resp.data.data)
    })
    paymentsApplyGet().then((resp) =>{
      setApplyData(resp.data.data)
    })
    getCurrency().then((resp) =>{
      setCurrencyData(resp.data.data)
    })
  }, [])

  console.log('---------------->',taxData)
  


  const validationType = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,
    initialValues: {
      tour_id: id,
      provider_tour_name: tourSettings.provider_tour_name
        ? tourSettings.provider_tour_name
        : "",
      provider_tour_url: tourSettings.provider_tour_url
        ? tourSettings.provider_tour_url
        : "",
      infants_range_from: tourSettings.infants_range_from
        ? tourSettings.infants_range_from
        : "",
      infants_range_to: tourSettings.infants_range_to
        ? tourSettings.infants_range_to
        : "",
      kids_range_from: tourSettings.kids_range_from
        ? tourSettings.kids_range_from
        : "",
      kids_range_to: tourSettings.kids_range_to
        ? tourSettings.kids_range_to
        : "",
      teenagers_range_from: tourSettings.teenagers_range_from
        ? tourSettings.teenagers_range_from
        : "",
      teenagers_range_to: tourSettings.teenagers_range_to
        ? tourSettings.teenagers_range_to
        : "",
    },
    // validationSchema: Yup.object().shape({
    //   tour_name: Yup.string().required("Field required"),
    //   code: Yup.string()
    //     .required("Code is required")
    //     .max(2, "Must be exactly 2 chars")
    //     .required("Max 2 chars"),
    // }),
    onSubmit: (values) => {
      let data = {};

      // putSettingsAPI(id, data)
      //   .then((resp) => {
      //     // console.log(resp.data);
      //     if (resp.data.status === 200) {
      //       triggerUpdate();
      //       Swal.fire("Edited!", "Settings has been created.", "success");
      //       toggle("3");
      //     }
      //   })
      //   .catch((error) => {
      //     let errorMessages = [];
      //     if (error.response.data.data) {
      //       Object.entries(error.response.data.data).map((item) =>
      //         errorMessages.push(item[1])
      //       );
      //     } else {
      //       if (error.response.data.message === "Array to string conversion") {
      //         errorMessages.push("Available From is required");
      //       } else {
      //         errorMessages.push(error.response.data.message);
      //       }
      //     }

      //     Swal.fire(
      //       "Error!",
      //       // {error.response.},
      //       String(errorMessages[0])
      //     );
      //   });
    },
  });

  return (
    <>
      <Form
        onSubmit={(e) => {
          e.preventDefault();
          validationType.handleSubmit();
          return false;
        }}
        className="custom-validation"
      >
        <TabPane tabId="1" className="">
          <Row className=" d-flex justify-content-between pb-4 ">
            <Col className="col-md-4">
              <img src={SettingsImageThree} alt="image1" className="w-100" />
            </Col>
            <Col className="col-md-4">
              <img src={SettingsImageOne} alt="image1" className="w-100" />
            </Col>
            <Col className="col-md-4">
              <img src={SettingsImageTwo} alt="image1" className="w-100" />
            </Col>
          </Row>

          <Row>
            <Col className="col-12">
              <div className="mb-2 p-2" style={{ backgroundColor: "#E9F4FF" }}>
                <p
                  className="px-2 fs-5"
                  style={{
                    fontWeight: "bold",
                    color: "#495057",
                    marginBottom: "0px",
                  }}
                >
                  TAXES & GRATUITIES
                </p>
              </div>
            </Col>
          </Row>
          <Row>
            <Col className="mb-2 col-2" style={{ paddingTop: "7px" }}>
              <div className="form-outline mb-2" id="voucher_currency">
                <Label className="form-label">Taxes</Label>
                <div className="input-group">
                  <Input
                    type="select"
                    name=""
                     onChange={(e) => {
                       setTaxSelected(e.target.value);
                     }}
                    onBlur={validationType.handleBlur}
                    //   value={validationType.values.department || ""}
                  >
                    <option value="">Select....</option>
                     {map(taxData, (tax, index) => {
                      return (
                        <option
                          key={index}
                          value={tax.id}
                         /*  selected={
                            tourSettings && tourSettings.voucher_tax_id
                              ? tax.voucher_tax_id ===
                                tourSettings.voucher_tax_id
                              : false
                          } */
                        >
                          {tax.name}
                        </option>
                      );
                    })}
                  </Input>
                </div>
              </div>
            </Col>
            <Col className="mb-2 col-2" style={{ paddingTop: "7px" }}>
              <div className="form-outline mb-2" id="voucher_currency">
                <Label className="form-label">Gratuities</Label>
                <div className="input-group">
                  <Input
                    type="select"
                    name=""
                     onChange={(e) => {
                       setGratuitesSelected(e.target.value);
                     }}
                    onBlur={validationType.handleBlur}
                    //   value={validationType.values.department || ""}
                  >
                    <option value="">Select....</option>
                    {map(gratuitesData, (gratuites, index) => {
                      return (
                        <option
                          key={index}
                          value={gratuites.id}
                         /*  selected={
                            tourSettings && tourSettings.voucher_template_id
                              ? template.voucher_template_id ===
                                tourSettings.voucher_template_id
                              : false
                          } */
                        >
                          {gratuites.name}
                        </option>
                      );
                    })}
                  </Input>
                </div>
              </div>
            </Col>
            <Col className="mb-2 col-2" style={{ paddingTop: "7px" }}>
              <div className="form-outline mb-2" id="voucher_currency">
                <Label className="form-label">Gratuity Type</Label>
                <div className="input-group">
                  <Input
                    type="select"
                    name=""
                     onChange={(e) => {
                       setGratuitesTypeSelected(e.target.value);
                     }}
                    onBlur={validationType.handleBlur}
                    //   value={validationType.values.department || ""}
                  >
                    <option value="">Select....</option>
                    {map(gratuitesTypeData, (type, index) => {
                      return (
                        <option
                          key={index}
                          value={type.id}
                          /* selected={
                            tourSettings && tourSettings.voucher_template_id
                              ? template.voucher_template_id ===
                                tourSettings.voucher_template_id
                              : false
                          } */
                        >
                          {type.name}
                        </option>
                      );
                    })}
                  </Input>
                </div>
              </div>
            </Col>
            <Col className="mb-2 col-1" style={{ paddingTop: "7px" }}>
              <div className="form-outline mb-2">
                <div className="d-flex justify-content-between">
                  <Label className="form-label">% Gratuity</Label>
                  <div>
                    <i
                      className="uil-question-circle font-size-15"
                      id="publicPrice"
                    />
                  </div>
                </div>
                <div className="input-group">
                  <span
                    className="input-group-text form-label fw-bold bg-paradise text-white border-0"
                    id="basic-addon1"
                    style={{ fontSize: "0.85em" }}
                  >
                    %
                  </span>
                  <Input
                    name="gratuity_percentage"
                    placeholder=""
                    type="text"
                    onChange={validationType.handleChange}
                    value={validationType.values.gratuity_percentage || ""}
                    invalid={
                      validationType.touched.gratuity_percentage &&
                      validationType.errors.gratuity_percentage
                        ? true
                        : false
                    }
                  />
                </div>
              </div>
            </Col>
            <Col className="mb-2 col-1" style={{ paddingTop: "7px" }}>
              <div className="form-outline mb-2" id="voucher_currency">
                <Label className="form-label">Based on</Label>
                <div className="input-group">
                  <Input
                    type="select"
                    name=""
                     onChange={(e) => {
                       setBasedOnSelected(e.target.value);
                     }}
                    onBlur={validationType.handleBlur}
                    //   value={validationType.values.department || ""}
                  >
                    <option value="">Select....</option>
                    {map(basedOnData, (based, index) => {
                      return (
                        <option
                          key={index}
                          value={based.id}
                          /* selected={
                            tourSettings && tourSettings.voucher_template_id
                              ? template.voucher_template_id ===
                                tourSettings.voucher_template_id
                              : false
                          } */
                        >
                          {based.name}
                        </option>
                      );
                    })}
                  </Input>
                </div>
              </div>
            </Col>
            <Col className="mb-2 col-2" style={{ paddingTop: "7px" }}>
              <div className="form-outline mb-2" id="voucher_currency">
                <Label className="form-label">Apply</Label>
                <div className="input-group">
                  <Input
                    type="select"
                    name=""
                     onChange={(e) => {
                       setApplySelected(e.target.value);
                     }}
                    onBlur={validationType.handleBlur}
                    //   value={validationType.values.department || ""}
                  >
                    <option value="">Select....</option>
                    {map(applyData, (apply, index) => {
                      return (
                        <option
                          key={index}
                          value={apply.id}
                          /* selected={
                            tourSettings && tourSettings.voucher_template_id
                              ? template.voucher_template_id ===
                                tourSettings.voucher_template_id
                              : false
                          } */
                        >
                          {apply.name}
                        </option>
                      );
                    })}
                  </Input>
                </div>
              </div>
            </Col>
            <Col className="mb-2 col-1" style={{ paddingTop: "7px" }}>
              <div className="form-outline mb-2" id="voucher_currency">
                <Label className="form-label">Currency</Label>
                <div className="input-group">
                  <Input
                    type="select"
                    name=""
                     onChange={(e) => {
                       setCurrencySelected(e.target.value);
                     }}
                    onBlur={validationType.handleBlur}
                    //   value={validationType.values.department || ""}
                  >
                    <option value="">Select....</option>
                    {map(currencyData, (currency, index) => {
                      return (
                        <option
                          key={index}
                          value={currency.currency_id}
                          /* selected={
                            tourSettings && tourSettings.voucher_template_id
                              ? template.voucher_template_id ===
                                tourSettings.voucher_template_id
                              : false
                          } */
                        >
                          {currency.currency}
                        </option>
                      );
                    })}
                  </Input>
                </div>
              </div>
            </Col>
            <Col className="mb-2 col-1" style={{ paddingTop: "7px" }}>
              <div className="form-outline">
                <Label className="form-label">Exchange Rate</Label>
                <Input
                  name="exchange_rate"
                  placeholder="$0.00"
                  type="text"
                  onChange={validationType.handleChange}
                  onBlur={validationType.handleBlur}
                  value={validationType.values.exchange_rate || ""}
                  invalid={
                    validationType.touched.exchange_rate &&
                    validationType.errors.exchange_rate
                      ? true
                      : false
                  }
                />
                {validationType.touched.exchange_rate &&
                validationType.errors.exchange_rate ? (
                  <FormFeedback type="invalid">
                    {validationType.errors.exchange_rate}
                  </FormFeedback>
                ) : null}
              </div>
            </Col>
          </Row>

          <Row>
            <Col className="col-12">
              <div
                className="mb-4 py-2 px-3"
                style={{ backgroundColor: "#FFEFDE" }}
              >
                <p
                  className="fs-5"
                  style={{
                    fontWeight: "bold",
                    color: "#495057",
                    marginBottom: "0px",
                  }}
                >
                  PAYMENTS
                </p>
              </div>
            </Col>
          </Row>
          <Row className="row"></Row>

          <Row>
            <div className="col-12 d-flex justify-content-end mt-5">
              <Button
                color="paradise"
                outline
                className="waves-effect waves-light me-2"
                type="button"
                onClick={() => toggle("1")}
              >
                <i className="uil-angle-double-left" />
                Previous
              </Button>
              <Button
                type="submit"
                className="font-16 btn-orange"
                // onClick={toggleCategory}
              >
                Continue
                <i className="uil-angle-double-right mx-1 " />
              </Button>
            </div>
          </Row>
        </TabPane>
      </Form>
    </>
  );
};

export default Payments;
