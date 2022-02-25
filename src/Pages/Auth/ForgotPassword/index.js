import { useState } from "react";
import LoginImage from "../../../Components/Assets/images/login-girl.png";
import Alpaca from "../../../Components/Assets/images/alpaca.png";
import ParadiseLogo from "../../../Components/Assets/images/paradise-logo.png";
import SweetAlert from "react-bootstrap-sweetalert";
import { Formik } from "formik";
import { ForgotPasswordAction } from "../../../Utils/Redux/Actions/ForgotPassword";

const ForgotPassword = () => {
  const [custom_div1, setcustom_div1] = useState(false);
  const [custom_div2, setcustom_div2] = useState(false);
  const onSubmit = (values) => {
    console.log(values);

    let data = {
      email: values.email,
    };
    ForgotPasswordAction(data)
      .then((resp) => {
        if (resp.data.status === 200) {
          setcustom_div1(true);
        }
      })
      .catch((error) => {
        console.log(error);
        setcustom_div2(true)
      });
  };
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
                  style={{ color: "#3DC7F4", fontSize: "132px" }}
                >
                  Uh-Oh!
                </span>
              </div>
            </div>
            <div className="row justify-content-center">
              <div className="col-6">
                <span
                  className="h1 mb-0 fw-bold"
                  style={{ color: "#74788D", fontSize: "23px" }}
                >
                  Looks like someone forgot their password.
                </span>
              </div>
            </div>

            <div className="row justify-content-center">
              <div className="col-7 mt-3">
                <div className="d-flex align-items-center h-custom-2 px-5 ms-xl-4 mt-5 pt-5 pt-xl-0 mt-xl-n5">
                  <Formik
                    initialValues={{
                      email: "",
                    }}
                    enableReinitialize
                    onSubmit={(values, { setSubmitting }) => {
                      onSubmit(values);
                      setSubmitting(false);
                    }}
                  >
                    {({
                      values,
                      errors,
                      handleChange,
                      handleSubmit,
                      handleBlur,
                      isSubmitting,
                      setFieldValue,
                    }) => {
                      return (
                        <form onSubmit={handleSubmit} className="col-12">
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
                                  Enter your Email and instructions will be sent
                                  to you!
                                </p>
                              </div>
                            </div>
                          </div>

                          <div className="form-outline mb-4">
                            <label
                              className="form-label"
                              htmlFor="form2Example28"
                            >
                              Email
                            </label>
                            <input
                              type="email"
                              name="email"
                              value={values.email}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              id="form2Example28"
                              className="form-control"
                            />
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

                          <div className="mt-5 row justify-content-center">
                            <div
                              className="col-5"
                              style={{ marginLeft: "1rem" }}
                            >
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
                          <div className="mt-5 row justify-content-center">
                            <div
                              className="col-5"
                              style={{ marginLeft: "1rem" }}
                            >
                              <p style={{ fontSize: "14.4px" }}>
                                Remember It ?{" "}
                                <a
                                  href="/reset-password"
                                  style={{ fontSize: "14.4px" }}
                                  className="link-info mx-1"
                                >
                                  reset
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
                        </form>
                      );
                    }}
                  </Formik>
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
                  top: "0px",
                  right: "0px",
                }}
                showCloseButton={false}
                showConfirm={false}
                success
                onConfirm={() => {
                  setcustom_div1(false);
                }}
              ></SweetAlert>
            ) : null}
            {custom_div2 ? (
              <SweetAlert
                title="Email address not registered."
                timeout={2000}
                style={{
                  position: "absolute",
                  top: "0px",
                  right: "0px",
                }}
                showCloseButton={false}
                showConfirm={false}
                error
                onConfirm={() => {
                  setcustom_div2(false);
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
