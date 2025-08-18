import { useState } from "react";
import LoginImage from "../../../Components/Assets/images/adventure-bg-hub.jpg";
import ParadiseLogo from "../../../Components/Assets/images/paradise-logo-color.png";
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
            history.push("/tours");
          }
        })
        .catch((error) => {
          setError(true);
          // console.log(error);
        });
    },
  });

  return (
  
  <div className="container-fluid" style={{overflowY:'auto'}}>
    
    <section className="row vh-100">        
          <div className="col-6 d-flex align-items-center">
            <div className="w-100 py-5">
              <h1 className="fw-bold mb-2 mx-5 text-center display-3 text-orange">
                HELLO!
              </h1>
              <h2 className="fw-bold text-center display-6 text-paradise">
                Nice to see you.
              </h2>
              <p className="fw-bold mb-xxl-4 mb-2 mx-5 text-center"  style={{ color: "#74788D", fontSize: "16px" }}>
                Sign in to continue to Adventure Station.
              </p>
              <div className="row justify-content-center">            
                <div className="col-8 col-xxl-6 mt-3">
                  <div className="px-xxl-5 px-0">
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
                          placeholder="Username"
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
                      <div className="mt-xxl-4 mt-3">
                        <p className="text-center" style={{ fontSize: "14.4px" }}>
                          Don't have an account?{" "}
                          <a
                            href="mailto:it@jstourandtravel.com?subject=User%20creation%20request%20Admin%20Panel&body=New%20Adventure%20Station%20account"
                            style={{ fontSize: "14.4px", color:'rgb(46 167 207)'}}
                            className="link-info mx-1"
                          >
                            Contact your IT Team for support!
                          </a>
                        </p>
                      </div>
                      <div className=" row justify-content-center">
                        <div
                          className="col-4 mt-2"
                          style={{ marginLeft: "0.55rem" }}
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
            
          </div>
          <div 
            className="col-6 d-flex justify-content-center" 
            style={{backgroundImage:'url(' + LoginImage + ')',
                    backgroundSize:'cover', 
                    backgroundRepeat:'no-repeat', 
                    backgroundPosition:'center'}}
          >
            
          
          </div>
          
    </section>
  </div>
  );
};

export default Login;
