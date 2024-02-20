import { useEffect, useState } from "react";
import { updateSocialProviderAPI } from "../../../Utils/API/Providers";
import {
  Collapse,
  Form,
  Row,
  Input,
  Label,
  Col,
  FormFeedback,
  Button,
} from "reactstrap";
import classnames from "classnames";
import * as Yup from "yup";
import { useFormik } from "formik";
import Swal from "sweetalert2";

const SocialMedia = ({socialData, id}) => {

  const [initialData, setInitialData] = useState({})
  
  useEffect(() => {
    setInitialData(socialData)
  }, [socialData]);

  // console.log('social media',initialData)
  const [col1, setcol1] = useState(false);

  function togglecol1() {
    setcol1(!col1);
  }

  const validationType = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,
    initialValues: {
      facebook: initialData && initialData[0]?.url ? initialData[0].url : '',
      instagram: initialData && initialData[1]?.url ? initialData[1].url : '',
      youtube: initialData && initialData[2]?.url ? initialData[2].url : '',
      twitter: initialData && initialData[3]?.url ? initialData[3].url : '',
      trip_advisor: initialData && initialData[4]?.url ? initialData[4].url : '',
      yelp: initialData && initialData[5]?.url ? initialData[5].url : '',
      others: initialData && initialData[6]?.url ? initialData[6].url : ''
      
    },
    validationSchema: Yup.object().shape({
      // name: Yup.string().required("Name is required"),
      
    }),
    onSubmit: (values) => {
      let data = {
        facebook: values.facebook ? values.facebook : '',
        instagram: values.instagram ? values.instagram : '',
        youtube: values.youtube ? values.youtube : '',
        twitter: values.twitter ? values.instagram : '',
        trip_advisor: values.trip_advisor ? values.trip_advisor : '',
        yelp: values.yelp ? values.yelp : '',
        others: values.others ? values.others : '',
        foreign_key: id
        };
    //  console.log(data)
        updateSocialProviderAPI(id, data)
          .then((resp) => {
            // console.log(resp.data);
            if (resp.data.status === 200) {
              Swal.fire(
                "Edited!",
                "Social Media Information has been edited.",
                "success"
              ).then(() => {
               
              });
            }
          })
          .catch((error) => {
            // console.log(error.response);
            Swal.fire(
              "Error!",
              `${
                error.response.data.data.name
                  ? error.response.data.data.name
                  : error.response.data.data.code
              }`,
              "error"
            );
          });
    },
  });

  return (
    <div className="accordion" id="accordionExample">
      <div className="accordion-item">
        <h2 className="accordion-header" id="headingOne">
          <button
            className={classnames("accordion-button", "fw-medium", {
              collapsed: !col1,
            })}
            type="button"
            onClick={togglecol1}
            style={{
              cursor: "pointer",
              backgroundColor: "#F6851F",
              color: "white",
            }}
          >
            Social Media Profiles
          </button>
        </h2>
        <Collapse id="collapseOne" className="accordion-collapse" isOpen={col1}>
          <div className="accordion-body">
            <Form
              onSubmit={(e) => {
                e.preventDefault();
                validationType.handleSubmit();
                return false;
              }}
              className="custom-validation"
            >
              <Row>
                <Col className="col-6">
                  <div className="form-outline mb-2">
                    <Label className="form-label">Facebook</Label>
                    <Input
                      name="facebook"
                      placeholder=""
                      type="text"
                      onChange={validationType.handleChange}
                      onBlur={validationType.handleBlur}
                      value={validationType.values.facebook || ""}
                      invalid={
                        validationType.touched.facebook &&
                        validationType.errors.facebook
                          ? true
                          : false
                      }
                    />
                    {validationType.touched.facebook &&
                    validationType.errors.facebook ? (
                      <FormFeedback type="invalid">
                        {validationType.errors.facebook}
                      </FormFeedback>
                    ) : null}
                  </div>
                </Col>
                <Col className="col-6">
                  <div className="form-outline mb-2">
                    <Label className="form-label">Instagram</Label>
                    <Input
                      name="instagram"
                      placeholder=""
                      type="text"
                      onChange={validationType.handleChange}
                      onBlur={validationType.handleBlur}
                      value={validationType.values.instagram || ""}
                      invalid={
                        validationType.touched.instagram &&
                        validationType.errors.instagram
                          ? true
                          : false
                      }
                    />
                    {validationType.touched.instagram &&
                    validationType.errors.instagram ? (
                      <FormFeedback type="invalid">
                        {validationType.errors.instagram}
                      </FormFeedback>
                    ) : null}
                  </div>
                </Col>
                
              </Row>
              <Row>
                <Col className="col-6">
                  <div className="form-outline mb-2">
                    <Label className="form-label">Youtube</Label>
                    <Input
                      name="youtube"
                      placeholder=""
                      type="text"
                      onChange={validationType.handleChange}
                      onBlur={validationType.handleBlur}
                      value={validationType.values.youtube || ""}
                      invalid={
                        validationType.touched.youtube &&
                        validationType.errors.youtube
                          ? true
                          : false
                      }
                    />
                    {validationType.touched.youtube &&
                    validationType.errors.youtube ? (
                      <FormFeedback type="invalid">
                        {validationType.errors.youtube}
                      </FormFeedback>
                    ) : null}
                  </div>
                </Col>
                <Col className="col-6">
                  <div className="form-outline mb-2">
                    <Label className="form-label">Twitter</Label>
                    <Input
                      name="twitter"
                      placeholder=""
                      type="text"
                      onChange={validationType.handleChange}
                      onBlur={validationType.handleBlur}
                      value={validationType.values.twitter || ""}
                      invalid={
                        validationType.touched.twitter &&
                        validationType.errors.twitter
                          ? true
                          : false
                      }
                    />
                    {validationType.touched.twitter &&
                    validationType.errors.twitter ? (
                      <FormFeedback type="invalid">
                        {validationType.errors.twitter}
                      </FormFeedback>
                    ) : null}
                  </div>
                </Col>
               
              </Row>
              <Row>
                <Col className="col-6">
                  <div className="form-outline mb-2">
                    <Label className="form-label">TripAdvisor</Label>
                    <Input
                      name="trip_advisor"
                      placeholder=""
                      type="text"
                      onChange={validationType.handleChange}
                      onBlur={validationType.handleBlur}
                      value={validationType.values.trip_advisor || ""}
                      invalid={
                        validationType.touched.trip_advisor &&
                        validationType.errors.trip_advisor
                          ? true
                          : false
                      }
                    />
                    {validationType.touched.trip_advisor &&
                    validationType.errors.trip_advisor ? (
                      <FormFeedback type="invalid">
                        {validationType.errors.trip_advisor}
                      </FormFeedback>
                    ) : null}
                  </div>
                </Col>
                <Col className="col-6">
                  <div className="form-outline mb-2">
                    <Label className="form-label">Yelp</Label>
                    <Input
                      name="yelp"
                      placeholder=""
                      type="text"
                      onChange={validationType.handleChange}
                      onBlur={validationType.handleBlur}
                      value={validationType.values.yelp || ""}
                      invalid={
                        validationType.touched.yelp &&
                        validationType.errors.yelp
                          ? true
                          : false
                      }
                    />
                    {validationType.touched.yelp &&
                    validationType.errors.yelp ? (
                      <FormFeedback type="invalid">
                        {validationType.errors.yelp}
                      </FormFeedback>
                    ) : null}
                  </div>
                </Col>
                
              </Row>
              <Row>
                <Col className="col-6">
                  <div className="form-outline mb-2">
                    <Label className="form-label">Others</Label>
                    <Input
                      name="others"
                      placeholder=""
                      type="text"
                      onChange={validationType.handleChange}
                      onBlur={validationType.handleBlur}
                      value={validationType.values.others || ""}
                      invalid={
                        validationType.touched.others &&
                        validationType.errors.others
                          ? true
                          : false
                      }
                    />
                    {validationType.touched.others &&
                    validationType.errors.others ? (
                      <FormFeedback type="invalid">
                        {validationType.errors.others}
                      </FormFeedback>
                    ) : null}
                  </div>
                </Col>
                
              </Row>
              
              <Row>
                <Col className=" d-flex justify-content-end">
                  <Button
                    type="submit"
                    
                    className="waves-effect waves-light mb-3 btn btn-orange"
                  >
                    <i className="mdi mdi-plus me-1" />
                    Save Changes
                  </Button>
                </Col>
              </Row>
            </Form>
          </div>
        </Collapse>
      </div>
      
    </div>
  );
};

export default SocialMedia;
