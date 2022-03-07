import { useState } from "react";
import LoginImage from "../../../Components/Assets/images/adventure-bg-hub.jpg";
import Alpaca from "../../../Components/Assets/images/alpaca.png";
import ParadiseLogo from "../../../Components/Assets/images/paradise-logo.png";
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
      console.log("values", values);
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
          console.log(error);
          setError(true);
        });
    },
  });
  return (
    <section className="vh-100">
      <div className="container-fluid">
        <div className="row align-items-center">
          <div className="col-6">
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
                style={{ position: "relative", zIndex: "1" }}
              />
            </div>
            <div className="row justify-content-center">
              <div className="col-7">
                <span
                  className="h1 fw-bold mb-0 mx-5"
                  style={{ color: "#3DC7F4", fontSize: "130px", paddingLeft:'13px' }}
                >
                  Uh-Oh!
                </span>
              </div>
            </div>
            <div className="row justify-content-center">
              <div className="col-6">
                <span
                  className="h1 mb-0 fw-bold"
                  style={{ color: "#74788D", fontSize: "22px", paddingLeft:'28px' }}
                >
                  Looks like someone forgot their password.
                </span>
              </div>
            </div>

            <div className="row justify-content-center">
              <div className="col-7 mt-3">
                <div className="d-flex align-items-center h-custom-2 px-5 ms-xl-4 mt-5 pt-5 pt-xl-0 mt-xl-n5">
                  <Form
                    onSubmit={(e) => {
                      e.preventDefault();
                      validationType.handleSubmit();
                      return false;
                    }}
                    className="custom-validation"
                  >
                    <div className="row justify-content-center mb-4">
                      <div className="col-5">
                        <p
                          style={{
                            color: "#74788D",
                            fontSize: "18px",
                            marginLeft: "8px",
                          }}
                        >
                          Reset Password
                        </p>
                      </div>

                      <div className="col-12">
                        <div
                          className="form-control"
                          style={{
                            backgroundColor: "#C7E3EB",
                            border: "none",
                          }}
                        >
                          <p
                            style={{
                              padding: "5px",
                              marginBottom: 0,
                              marginLeft: "1rem",
                              color: "#2986A4",
                            }}
                          >
                            Enter your Email and instructions will be sent to
                            you!
                          </p>
                        </div>
                      </div>
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
                    <div className="mt-5 row justify-content-center">
                      <div className="col-5" style={{ marginLeft: "1rem" }}>
                        <p style={{ fontSize: "14.4px" }}>
                          Remember It ?{" "}
                          <a
                            href="/login"
                            style={{ fontSize: "14.4px" }}
                            className="link-info mx-1"
                          >
                            Sign in
                          </a>
                        </p>
                      </div>
                    </div>
                   
                    <div className=" row justify-content-center">
                      <div
                        className="col-4 mt-2"
                        style={{ marginLeft: "1rem" }}
                      >
                        <img
                          src={ParadiseLogo}
                          alt="logo"
                          style={{ width: "100px" }}
                        />
                      </div>
                    </div>
                  </Form>
                </div>
              </div>
            </div>
          </div>
          <div className="col-sm-6 px-0 d-none d-sm-block">
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

            <img
              src={LoginImage}
              alt="LoginImage"
              className="w-100 vh-100"
              style={{ objectFit: "cover", objectPosition: "left" }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ForgotPassword;
