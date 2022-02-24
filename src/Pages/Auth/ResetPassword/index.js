import { useState } from "react";
import LoginImage from "../../../Components/Assets/images/login-girl.png";
import Alpaca from "../../../Components/Assets/images/alpaca.png";
import ParadiseLogo from "../../../Components/Assets/images/paradise-logo.png";
import SweetAlert from "react-bootstrap-sweetalert";
import { Formik } from "formik";
import { ResetPasswordAction } from "../../../Utils/Redux/Actions/ResetPassword";


const ResetPassword = () => {

  //get params
  const queryString = window.location.search;
  console.log(queryString);
  const urlParams = new URLSearchParams(queryString);
  const token = urlParams.get('token')

  const [custom_div1, setcustom_div1] = useState(false);
  const [custom_div2, setcustom_div2] = useState(false);
  const onSubmit = (values) => {
    console.log(values);

    let data = {
      token: token,
      password: values.password,
      password_confirmation: values.password_confirmation,
    };
    ResetPasswordAction(data)
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
            
            <div className="row justify-content-center">
              <div className="col-7 mt-3">
                <div className="d-flex align-items-center h-custom-2 px-5 ms-xl-4 mt-5 pt-5 pt-xl-0 mt-xl-n5">
                  <Formik
                    initialValues={{
                      password: "",
                      password_confirmation:'',
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
                            <div className="col-6">
                              <p
                                style={{
                                  color: "#74788D", 
                                  fontSize: "23px",
                                  marginLeft: "8px",
                                }}
                              >
                                Reset Password
                              </p>
                            </div>
                            <div className="col-12">
                              <div
                                className="form-control "
                                style={{
                                  backgroundColor: "#C7E3EB",
                                  border: "none",
                                }}
                              >
                                <div className=" row justify-content-center">

                                <p
                                className="col-6"
                                  style={{
                                    padding: "5px",
                                    marginBottom: 0,
                                    color: "#2986A4",
                                    marginLeft:'15px'
                                  }}
                                >
                                  Enter your new password
                                </p>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="form-outline mb-4">
                            <label
                              className="form-label"
                              htmlFor="form2Example28"
                            >
                              Password
                            </label>
                            <input
                              type="password"
                              name="password"
                              value={values.password}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              id="form2Example28"
                              className="form-control"
                            />
                          </div>
                          <div className="form-outline mb-4">
                            <label
                              className="form-label"
                              htmlFor="form2Example"
                            >
                              Repeat Password
                            </label>
                            <input
                              type="password"
                              name="password_confirmation"
                              value={values.password_confirmation}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              id="form2Example"
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

                         
                          <div className=" row justify-content-center">
                            <div
                              className="col-4 mt-5"
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

export default ResetPassword;
