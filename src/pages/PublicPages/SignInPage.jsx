// import feather from "feather-icons";
// import { useFormik } from "formik";
// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { Link } from "react-router-dom";
// import { ToastContainer, toast } from "react-toastify";
// import { loginUser } from "store/users";
// import Loader from "utility/Loader";
// import * as yup from "yup";

// const SignInPage = () => {
//   const loading = useSelector((state) => state.entities.users.authLoader);
//   const dispatch = useDispatch();

//   // const [eye, seteye] = useState(true);
//   const [rememberMe, setRememberMe] = useState(false);
//   useEffect(() => {
//     feather.replace();
//   }, []);

//   // const onEyeClick = () => {
//   //   seteye(!eye);
//   // };
//   const basicSchema = yup.object().shape({
//     userName: yup.string().required("User Name is required"),
//     password: yup.string().min(4).required("Password is required"),
//   });

//   const formik = useFormik({
//     initialValues: {
//       userName: "",
//       password: "",
//     },
//     validationSchema: basicSchema,
//     onSubmit: async (values, { resetForm }) => {
//       const data = {
//         UserName: values.userName,
//         Password: values.password,
//       };

//       dispatch(loginUser(data));
//       resetForm();
//     },
//   });

//   return (
//     <>
//       {loading ? (
//         <Loader />
//       ) : (
//         <section className="cover-user">
//           <div className="container-fluid px-0">
//             <div className="row g-0 position-relative">
//               <div className="col-lg-4 cover-my-30 order-2">
//                 <div className="cover-user-img d-flex align-items-center">
//                   <div className="row">
//                     <div className="col-12">
//                       <div
//                         className="card login-page border-0"
//                         style={{ zIndex: 1 }}
//                       >
//                         <div className="card-body p-0">
//                           <h4 className="card-title text-center">Login</h4>
//                           <form
//                             className="login-form mt-4"
//                             onSubmit={formik.handleSubmit}
//                           >
//                             <div className="row">
//                               <div className="col-lg-12">
//                                 <div className="mb-3">
//                                   <label className="form-label">
//                                     Your Email
//                                     <span className="text-danger">*</span>
//                                   </label>
//                                   <div className="form-icon position-relative">
//                                     <i
//                                       data-feather="user"
//                                       className="fea icon-sm icons"
//                                     ></i>
//                                     <input
//                                       type="text"
//                                       className="form-control ps-5"
//                                       placeholder="User Name"
//                                       name="userName"
//                                       autoComplete="false"
//                                       value={formik.values.userName}
//                                       onChange={formik.handleChange}
//                                       onBlur={formik.handleBlur}
//                                     />
//                                   </div>
//                                   {formik.errors.userName &&
//                                   formik.touched.userName ? (
//                                     <div className="text-danger">
//                                       <small
//                                         className="fw-lighter"
//                                         style={{ fontSize: "0.8rem" }}
//                                       >
//                                         {formik.errors.userName}
//                                       </small>
//                                     </div>
//                                   ) : (
//                                     ""
//                                   )}
//                                 </div>
//                               </div>

//                               <div className="col-lg-12">
//                                 <div className="mb-3">
//                                   <label className="form-label">
//                                     Password{" "}
//                                     <span className="text-danger">*</span>
//                                   </label>
//                                   <div className="form-icon position-relative">
//                                     <i
//                                       data-feather="key"
//                                       className="fea icon-sm icons"
//                                     />
//                                     <input
//                                       // type={eye ? "password" : "text"}
//                                       type={"password"}
//                                       className="form-control ps-5"
//                                       placeholder="Password"
//                                       name="password"
//                                       autoComplete="false"
//                                       value={formik.values.password}
//                                       onChange={formik.handleChange}
//                                       onBlur={formik.handleBlur}
//                                     />
//                                     {/* <span
//                                   onClick={onEyeClick}
//                                   className={`fa toggle-password" ${
//                                     eye ? "fa-eye-slash" : "fa-eye"
//                                   }`}
//                                 /> */}
//                                   </div>
//                                   {formik.errors.password &&
//                                   formik.touched.password ? (
//                                     <div className="text-danger">
//                                       <small
//                                         className="fw-lighter"
//                                         style={{ fontSize: "0.8rem" }}
//                                       >
//                                         {formik.errors.password}
//                                       </small>
//                                     </div>
//                                   ) : (
//                                     ""
//                                   )}
//                                 </div>
//                               </div>
//                               <div className="col-lg-12">
//                                 <div className="d-flex justify-content-between">
//                                   <div className="mb-3">
//                                     <div className="form-check">
//                                       <input
//                                         className="form-check-input"
//                                         type="checkbox"
//                                         defaultValue
//                                         id="flexCheckDefault"
//                                         value={rememberMe}
//                                         onChange={() =>
//                                           setRememberMe(!rememberMe)
//                                         }
//                                       />
//                                       <label
//                                         className="form-check-label"
//                                         htmlFor="flexCheckDefault"
//                                       >
//                                         Remember me
//                                       </label>
//                                     </div>
//                                   </div>
//                                   <p className="forgot-pass mb-0">
//                                     <Link
//                                       to="/forgetpassword"
//                                       className="text-dark fw-bold"
//                                     >
//                                       Forgot password ?
//                                     </Link>
//                                   </p>
//                                 </div>
//                               </div>
//                               <div className="col-lg-12 mb-0">
//                                 <div className="d-grid">
//                                   <input
//                                     type="submit"
//                                     value="Sign In"
//                                     className="btn btn-primary"
//                                   />
//                                 </div>
//                               </div>

//                               <div className="col-12 text-center">
//                                 <p className="mb-0 mt-3">
//                                   <small className="text-dark me-2 mx-2">
//                                     Don't have an account ?
//                                   </small>{" "}
//                                   <Link
//                                     to="/signup"
//                                     className="text-dark fw-bold"
//                                   >
//                                     Sign Up
//                                   </Link>
//                                 </p>
//                               </div>
//                             </div>
//                           </form>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//               <ToastContainer position="top-center" />
//               <div
//                 className="col-lg-8 offset-lg-4 padding-less img order-1"
//                 style={{
//                   backgroundImage: 'url("assets/images/user/01.jpg")',
//                 }}
//                 data-jarallax='{"speed": 0.5}'
//               />
//             </div>
//           </div>
//         </section>
//       )}
//     </>
//   );
// };

// export default SignInPage;

import feather from "feather-icons";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { clearLoginError, loginUser } from "store/users";
import Loader from "utility/Loader";
import * as yup from "yup";
import "./signin.css";

const SignInPage = () => {
  const loading = useSelector((state) => state.entities.users.authLoader);
  const loginError = useSelector((state) => state.entities.users.loginError);
  const authorizationError = useSelector(
    (state) => state.entities.users.authorizationError
  );
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    feather.replace();
    if (loginError) {
      toast.error("Incorrect Username or Password");
      dispatch(clearLoginError(false));
    }
    if (authorizationError) {
      toast.error("Contact Admin for Authorization");
      dispatch(clearLoginError(false));
    }
  }, [loginError, dispatch, authorizationError]);

  const basicSchema = yup.object().shape({
    userName: yup.string().required("Email / Username is required"),
    password: yup.string().min(4).required("Password is required"),
  });

  const formik = useFormik({
    initialValues: {
      userName: "",
      password: "",
    },
    validationSchema: basicSchema,
    onSubmit: async (values, { resetForm }) => {
      const data = {
        UserName: values.userName,
        Password: values.password,
      };

      dispatch(loginUser(data));
      resetForm();
    },
  });

  return (
    <>
      <ToastContainer position="top-center" autoClose={1000} hideProgressBar />
      {loading ? (
        <Loader />
      ) : (
        <section className="cover-user">
          <div className="container-fluid px-0">
            <div className="row g-0 position-relative">
              <div className="col-lg-4 cover-my-30 order-2">
                <div className="cover-user-img d-flex align-items-center">
                  <div className="row">
                    <div className="col-12">
                      <div
                        className="card login-page border-0"
                        style={{ zIndex: 1 }}
                      >
                        <img
                          src="assets/images/client/logo.png"
                          className="avatar avatar-medium justify-content-center align-self-center mb-5"
                          alt="Logo"
                          style={{
                            width: "50%",
                            height: "auto",
                            // border: "1px solid red",
                          }}
                        />

                        <div className="card-body p-0">
                          <h4 className="card-title text-center">Sign in</h4>
                          <form
                            className="login-form mt-4"
                            onSubmit={formik.handleSubmit}
                            autoComplete="off"
                          >
                            <div className="row">
                              <div className="col-lg-12">
                                <div className="mb-3">
                                  <label className="form-label">
                                    Email / Username
                                    <span className="text-danger">*</span>
                                  </label>
                                  <div className="form-icon position-relative">
                                    <input
                                      type="text"
                                      className="form-control"
                                      placeholder="Email / Username"
                                      name="userName"
                                      autoComplete="off"
                                      value={formik.values.userName}
                                      onChange={formik.handleChange}
                                      onBlur={formik.handleBlur}
                                    />
                                  </div>
                                  {formik.errors.userName &&
                                  formik.touched.userName ? (
                                    <div className="text-danger">
                                      <small
                                        className="fw-lighter"
                                        style={{ fontSize: "0.8rem" }}
                                      >
                                        {formik.errors.userName}
                                      </small>
                                    </div>
                                  ) : (
                                    ""
                                  )}
                                </div>
                              </div>

                              <div className="col-lg-12">
                                <div className="mb-3">
                                  <label className="form-label">
                                    Password{" "}
                                    <span className="text-danger">*</span>
                                  </label>

                                  <div className="position-relative d-flex">
                                    <input
                                      type={showPassword ? "text" : "password"}
                                      className="form-control pr-5"
                                      placeholder="Password"
                                      name="password"
                                      autoComplete="off"
                                      value={formik.values.password}
                                      onChange={formik.handleChange}
                                      onBlur={formik.handleBlur}
                                      style={{
                                        marginRight: "10px",
                                      }}
                                    />
                                    <button
                                      type="button"
                                      className="custom-btn-style"
                                      style={{
                                        marginLeft: "-40px",
                                        marginTop: "-0.1px",
                                        color: "rgb(0, 82, 204)",
                                        height: "40.5px",
                                        width: "70px",
                                        fontSize: "0.8rem",
                                      }}
                                      onClick={togglePasswordVisibility}
                                    >
                                      {showPassword ? "Hide" : "Show"}
                                    </button>
                                  </div>
                                  {formik.errors.password &&
                                  formik.touched.password ? (
                                    <div className="text-danger">
                                      <small
                                        className="fw-lighter"
                                        style={{ fontSize: "0.8rem" }}
                                      >
                                        {formik.errors.password}
                                      </small>
                                    </div>
                                  ) : (
                                    ""
                                  )}
                                </div>
                              </div>

                              <div className="col-lg-12">
                                <div className="d-flex justify-content-between">
                                  <div className="mb-4"></div>
                                  <p className="forgot-pass mb-0">
                                    <Link
                                      to="/forgetpassword"
                                      className="text-dark fw-bold"
                                    >
                                      Forgot Medzah Password?
                                    </Link>
                                  </p>
                                </div>
                              </div>
                              <div className="col-lg-12 mb-0 mt-1">
                                <div className="d-grid">
                                  <input
                                    type="submit"
                                    value="Sign In"
                                    className="btn btn-primary"
                                  />
                                </div>
                              </div>

                              <div className="col-12 text-center">
                                <p className="mb-0 mt-3">
                                  <small className="text-dark me-2 mx-2">
                                    New to Medzah?
                                  </small>
                                  <Link
                                    to="/signup"
                                    className="text-dark fw-bold"
                                  >
                                    Create an account
                                  </Link>
                                </p>
                              </div>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div
                className="col-lg-8 offset-lg-4 padding-less img order-1"
                style={{
                  backgroundImage: 'url("assets/images/user/01.jpg")',
                }}
                data-jarallax='{"speed": 0.5}'
              />
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default SignInPage;
