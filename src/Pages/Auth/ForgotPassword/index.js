import { useState } from "react";
import LoginImage from "../../../Components/Assets/images/adventure-bg-hub.jpg";
import Alpaca from "../../../Components/Assets/images/alpaca.png";
import ParadiseLogo from "../../../Components/Assets/images/paradise-logo-color.png";
import SweetAlert from "react-bootstrap-sweetalert";
import { ForgotPasswordAction } from "../../../Utils/Redux/Actions/ForgotPassword";
import { Label, Input, FormFeedback, Form } from "reactstrap";
// Formik validation
import * as Yup from "yup";
import { useFormik } from "formik";

const ForgotPassword = () => {
  const [custom_div1, setcustom_div1] = useState(false);
  // Form validation
  const [error, setError] = useState(false);
  const validationType = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      email: "",
    },
    validationSchema: Yup.object().shape({
      email: Yup.string()
        .email("Must be a valid Email")
        .max(255)
        .required("Email is required"),
    }),
    onSubmit: (values) => {
      // console.log("values", values);
      let data = {
        email: values.email,
      };
      ForgotPasswordAction(data)
        .then((resp) => {
          if (resp.data.status === 200) {
            setcustom_div1(true);
            setError(false);
          }
        })
        .catch((error) => {
          // console.log(error);
          setError(true);
        });
    },
  });
  return (
    <div className="container-fluid" style={{overflowY:'auto'}}>
    <section className="row vh-100">
      
        
          <div className="col-6 d-flex align-items-center">
          <div className="w-100 py-5">
            <div
              style={{
                position: "absolute",
                marginLeft: "-150px",
                marginTop: "-180px",
              }}
            >
              <img
                src={Alpaca}
                class="rounded"
                alt="alpaca"
                style={{ position: "relative", zIndex: "0" }}
              />
            </div>
            
              
                <h1 className="fw-bold mx-5 text-paradise text-center mb-2" style={{fontSize:"7rem"}}>
                  Uh-Oh!
                </h1>
                <h2
                  className="mb-0 fw-bold text-center fs-4"
                  style={{ color: "#74788D" }}
                >
                  Looks like someone forgot their password.
                </h2>
              

            <div className="row justify-content-center">
              <div className="col-7 col-xxl-5 mt-3">
                <div className="">
                  <Form
                    onSubmit={(e) => {
                      e.preventDefault();
                      validationType.handleSubmit();
                      return false;
                    }}
                    className="custom-validation"
                  >
                    
                        <p
                          style={{
                            color: "#74788D",
                            fontSize: "18px",
                            marginLeft: "8px",
                            fontWeight:'bold'
                          }}
                          className="text-center"
                        >
                          Reset Password
                        </p>
                      

                      
                        <div
                          className="rounded rounded-2 p-3"
                          style={{
                            backgroundColor: "#d9f7ff",
                            border: "none",
                            marginBottom: "1rem"
                          }}
                        >
                          <p className="fw-bold mb-1"><i class="far fa-lightbulb"></i> Info:</p>
                          <p
                            style={{
                              
                              marginBottom: 0,                              
                              color: "#2986A4",
                            }}
                          >
                            Write your email below and instructions will be sent to
                            your inbox!
                          </p>
                        </div>
                      

                    <div className="form-outline mb-4">
                      <Label className="form-label">Email</Label>
                      <Input
                        name="email"
                        placeholder="Enter Valid Email"
                        type="email"
                        onChange={validationType.handleChange}
                        onBlur={validationType.handleBlur}
                        value={validationType.values.email || ""}
                        invalid={
                          validationType.touched.email &&
                          validationType.errors.email
                            ? true
                            : false
                        }
                      />
                      {validationType.touched.email &&
                      validationType.errors.email ? (
                        <FormFeedback type="invalid">
                          {validationType.errors.email}
                        </FormFeedback>
                      ) : null}
                    </div>

                    <div className="mt-3 col-12">
                      <button
                        className="btn btn-info btn-lg btn-block"
                        style={{
                          width: "100%",
                          backgroundColor: "#3DC7F4",
                          padding: "5px",
                          border: "none",
                        }}
                        type="submit"
                      >
                        Reset
                      </button>
                    </div>
                    {error ? (
                      <div className="mt-2">
                        <p style={{ color: "red", fontSize: "14.4px" }}>
                          *Email address not registered.
                        </p>
                      </div>
                    ) : null}
                    
                        <p className="text-center mt-4" style={{ fontSize: "14.4px" }}>
                          Remember It?{" "}
                          <a
                            href="/login"
                            style={{ fontSize: "14.4px" }}
                            className="link-info mx-1 text-paradise"
                          >
                            Sign in
                          </a>
                        </p>
                      
                   
                    <div className=" row justify-content-center">
                      <div
                        className="col-4 mt-2"
                        
                      >
                        <img
                          src={ParadiseLogo}
                          alt="logo"
                          className="img-fluid"
                        />
                      </div>
                    </div>
                  </Form>
                </div>
              </div>
            </div>
            </div>
          </div>
          <div className="col-6 d-flex justify-content-center" style={{backgroundImage:'url(' + LoginImage + ')',backgroundSize:'cover', backgroundRepeat:'no-repeat', backgroundPosition:'center'}}>
            {custom_div1 ? (
              <SweetAlert
                title="Please check your email for further instructions."
                timeout={2000}
                style={{
                  position: "absolute",
                }}
                showCloseButton={false}
                showConfirm={false}
                success
                onConfirm={() => {
                  setcustom_div1(false);
                }}
              ></SweetAlert>
            ) : null}

            
          </div>
        
      
    </section>
    </div>
  );
};

export default ForgotPassword;
