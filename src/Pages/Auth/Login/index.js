import { useState } from "react";
import LoginImage from "../../../Components/Assets/images/adventure-bg-hub.jpg";
import ParadiseLogo from "../../../Components/Assets/images/paradise-logo.png";
import { LoginData } from "../../../Utils/Redux/Actions/LoginActions";
import { createStorageSync } from "../../../Utils/API";
import { useHistory } from "react-router-dom";

import { Label, Input, FormFeedback, Form } from "reactstrap";
// Formik validation
import * as Yup from "yup";
import { useFormik } from "formik";

const Login = () => {
  const history = useHistory();

  // Form validation
  const [error, setError] = useState(false);
  const validationType = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      password: "",
      email: "",
    },
    validationSchema: Yup.object().shape({
      password: Yup.string().required("Password is required"),

      email: Yup.string()
        .email("Must be a valid Email")
        .max(255)
        .required("Username is required"),
    }),
    onSubmit: (values) => {
      // console.log("values", values);
      let data = {
        email: values.email,
        password: values.password,
      };
      LoginData(data)
        .then((resp) => {
          const respuesta = resp.data.data;
          if (resp.data.status === 200) {
            createStorageSync("token", JSON.stringify(respuesta));
            history.push("/dashboard");
          }
        })
        .catch((error) => {
          setError(true);
          // console.log(error);
        });
    },
  });

  return (
    <section className="vh-100">
      <div className="container-fluid">
        <div className="row align-items-center">
          <div className="col-6">
            <div className="row justify-content-center">
              <div className="col-4">
                <span
                  className="h1 fw-bold mb-0 mx-5"
                  style={{ color: "#F38430", fontSize: "60px" }}
                >
                  HELLO!
                </span>
              </div>
            </div>
            <div className="row justify-content-center">
              <div className="col-4">
                <span
                  className="h1 fw-bold mb-0"
                  style={{ color: "#3DC7F4", fontSize: "40px" }}
                >
                  Nice to see you.
                </span>
              </div>
            </div>
            <div className="row justify-content-center">
              <div className="col-6 mt-3">
                <span
                  className="h1 fw-bold mb-0 mx-5"
                  style={{ color: "#74788D", fontSize: "16px" }}
                >
                  Sign in to continue to your Adventure Station.
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
                    <div className="form-outline mb-4">
                      <Label className="form-label">Username</Label>
                      <Input
                        name="email"
                        placeholder="Enter Valid Username"
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

                    <div className="form-outline mb-4">
                      <Label>Password</Label>
                      <Input
                        name="password"
                        type="password"
                        placeholder="Password"
                        onChange={validationType.handleChange}
                        onBlur={validationType.handleBlur}
                        value={validationType.values.password || ""}
                        invalid={
                          validationType.touched.password &&
                          validationType.errors.password
                            ? true
                            : false
                        }
                      />
                      {validationType.touched.password &&
                      validationType.errors.password ? (
                        <FormFeedback type="invalid">
                          {validationType.errors.password}
                        </FormFeedback>
                      ) : null}
                    </div>

                    <div className="row justify-content-between">
                      <div className="col-6 ">
                        <input
                          type="checkbox"
                          style={{ marginRight: "10px" }}
                        ></input>

                        <label style={{ fontSize: "14.4px", color: "#495057" }}>
                          Remember me
                        </label>
                      </div>
                      <div className="col-6 d-flex align-items-center justify-content-end">
                        <a
                          href="/forgot-password"
                          className="text-muted"
                          style={{
                            fontSize: "14.4px",
                            color: "#495057",
                            cursor: "pointer",
                          }}
                        >
                          Forgot Password?
                        </a>
                      </div>
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
                        Login
                      </button>
                    </div>
                    {error ? (
                      <div className="mt-2">
                        <p style={{ color: "red", fontSize: "14.4px" }}>
                          *Invalid credentials try again.
                        </p>
                      </div>
                    ) : null}
                    <div className="mt-5">
                      <p style={{ fontSize: "14.4px" }}>
                        Don't have an account?{" "}
                        <a
                          href="#!"
                          style={{ fontSize: "14.4px", color:'#3DC7F4'}}
                          className="link-info mx-1"
                        >
                          Contact your IT Team for support!
                        </a>
                      </p>
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

export default Login;
