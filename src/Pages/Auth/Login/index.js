import LoginImage from "../../../Components/Assets/images/login-girl.png";
import { Formik } from "formik";
import { LoginData } from "../../../Utils/Redux/Actions/LoginActions";
import { createStorageSync } from "../../../Utils/API";
import { useHistory } from "react-router-dom";

const Login = () => {
  const history = useHistory();
  const onSubmit = (values) =>{
    let data = {
    email: values.email,
    password: values.password
    }
    LoginData(data).then((resp) => {
      const respuesta = resp.data.data
      if (resp.data.status === 200) {
        createStorageSync('token', JSON.stringify(respuesta));
        history.push('/dashboard');
      }

    }).catch((error) =>{
      console.log(error)
    })
  }
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
              <div className="col-4 mt-3">
                <span
                  className="h1 fw-bold mb-0"
                  style={{ color: "#74788D", fontSize: "15px" }}
                >
                  Sign in to continue to your Admin Panel.
                </span>
              </div>
            </div>
            <div className="row justify-content-center">
              <div className="col-7 mt-3">
                <div className="d-flex align-items-center h-custom-2 px-5 ms-xl-4 mt-5 pt-5 pt-xl-0 mt-xl-n5">
                  <Formik
                  initialValues={{
                   email:'',
                   password:''
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
                          <div className="form-outline mb-4">
                            <label className="form-label" htmlFor="form2Example18">
                              Username
                            </label>
                            <input
                              type="email"
                              name="email"
                              value={values.email}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              id="form2Example18"
                              className="form-control"
                            />
                          </div>

                          <div className="form-outline mb-4">
                            <label className="form-label" htmlFor="form2Example28">
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

                          <div className="row justify-content-between">
                            <div className="col-6 ">
                              <input
                                type="checkbox"
                                style={{ marginRight: "10px" }}
                              ></input>

                              <label
                                style={{ fontSize: "14.4px", color: "#495057" }}
                              >
                                Remember me
                              </label>
                            </div>
                            <div className="col-6 d-flex align-items-center justify-content-end">
                              <span
                                className="text-muted"
                                style={{
                                  fontSize: "14.4px",
                                  color: "#495057",
                                  cursor: "pointer",
                                }}
                              >
                                Forgot Password?
                              </span>
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

                          <div className="mt-5">
                            <p style={{ fontSize: "14.4px" }}>
                              Don't have an account?{" "}
                              <a
                                href="#!"
                                style={{ fontSize: "14.4px" }}
                                className="link-info mx-1"
                              >
                                Contact your IT Team for support!
                              </a>
                            </p>
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
