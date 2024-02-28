import { useFormik } from "formik";
import feather from "feather-icons";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import * as yup from "yup";

const ForgetPassword = () => {
  useEffect(() => {
    feather.replace();
  }, []);

  const basicSchema = yup.object().shape({
    email: yup.string().email().required("Email is required"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: basicSchema,
    onSubmit: async (values, { resetForm }) => {
      const data = {
        Email: values.email,
      };
      resetForm();
    },
  });

  return (
    <section className="bg-home d-flex align-items-center">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-7 col-md-6">
            <div className="me-lg-5">
              <img
                src="assets/images/user/recovery.svg"
                className="img-fluid d-block mx-auto"
                alt
              />
            </div>
          </div>
          <div className="col-lg-5 col-md-6">
            <div className="card shadow rounded border-0">
              <div className="card-body">
                <h4 className="card-title text-center">Recover Account</h4>
                <form className="login-form mt-4">
                  <div className="row">
                    <div className="col-lg-12">
                      <p className="text-muted">
                        Please enter your email address. You will receive a link
                        to create a new password via email.
                      </p>
                      <div className="mb-3">
                        <label className="form-label">
                          Email address <span className="text-danger">*</span>
                        </label>
                        <div className="form-icon position-relative">
                          <i
                            data-feather="mail"
                            className="fea icon-sm icons"
                          />
                          <input
                            className="form-control ps-5"
                            placeholder="Email Address"
                            name="email"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                          />

                          {formik.errors.email && formik.touched.email ? (
                            <div className="text-danger mt-0 mb-2">
                              <small
                                className="fw-lighter"
                                style={{ fontSize: "0.8rem" }}
                              >
                                {formik.errors.email}
                              </small>
                            </div>
                          ) : (
                            ""
                          )}
                        </div>
                      </div>
                    </div>
                    {/*end col*/}
                    <div className="col-lg-12">
                      <div className="d-grid">
                        <button className="btn btn-primary">Send</button>
                      </div>
                    </div>
                    {/*end col*/}
                    <div className="mx-auto">
                      <p className="mb-0 mt-3">
                        <small className="text-dark me-2">
                          Remember your password ?
                        </small>{" "}
                        <Link to="/" className="text-dark fw-bold">
                          Sign in
                        </Link>
                      </p>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>{" "}
          {/*end col*/}
        </div>
        {/*end row*/}
      </div>{" "}
      {/*end container*/}
    </section>
  );
};

export default ForgetPassword;
