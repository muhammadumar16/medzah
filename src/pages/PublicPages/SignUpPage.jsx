import { useFormik } from "formik";
import useAPI from "hooks/useAPI";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import UserApi from "services/User.service";
import * as yup from "yup";

const SignUpPage = () => {
  const navigate = useNavigate();
  const signupUser = useAPI(UserApi.signupUser);
  const basicSchema = yup.object().shape({
    firstName: yup.string().required("First Name is required"),
    lastName: yup.string(),
    password: yup.string().min(4).required("Password is required"),
    userName: yup.string().required("User Name is required"),
    email: yup.string().email().required("Email is required"),
    phoneNo: yup.number().required("Phone Number is required"),
    companyName: yup.string().required("Company Name is required"),
    addressLineOne: yup.string().required("Address is required"),
    addressLineTwo: yup.string(),
    city: yup.string().required("City is required"),
    state: yup.string().required("State is required"),
    zipCode: yup.number().required("Zip Code is required"),
    termCondition: yup.string(),
  });

  const formik = useFormik({
    initialValues: {
      userName: "",
      firstName: "",
      lastName: "",
      email: "",
      phoneNo: "",
      companyName: "",
      addressLineOne: "",
      addressLineTwo: "",
      city: "",
      state: "",
      zipCode: "",
      password: "",
      termCondition: "",
    },
    validationSchema: basicSchema,
    onSubmit: async (values, { resetForm }) => {
      const data = {
        UserName: values.userName,
        FirstName: values.firstName,
        LastName: values.lastName,
        Email: values.email,
        PhoneNo: values.phoneNo,
        CompanyName: values.companyName,
        AddressLineOne: values.addressLineOne,
        AddressLineTwo: values.addressLineTwo,
        City: values.city,
        State: values.state,
        ZipCode: values.zipCode,
        Password: values.password,
      };
      try {
        const result = await signupUser.request(data);
        console.log("My result", result.data);
        if (result.data.Status === 108) toast.error("Email Already Exists!!!");
        if (result.data.Status === 109)
          toast.error("Username Already Exists!!!");
        if (result.data.Status === 102)
          toast.error("Provide Valid Zipcode !!!");
        if (result.data.Status === 101) {
          toast.success("Signup successful");
          setTimeout(() => {
            navigate("/login");
          }, 1000);
          resetForm();
        }
      } catch (error) {
        toast.error("Error", error);
      }
    },
  });

  return (
    <section className="cover-user">
      <div className="container-fluid px-0">
        <div className="row g-0 position-relative" style={{ height: "100vh" }}>
          <div className="col-lg-2 cover-my-30 order-2">
            <div
              className="cover-user-img d-lg-flex mx-auto mb-5 align-items-start "
              style={{ height: "auto" }}
            >
              <div className="row">
                <div className="col-12">
                  <div
                    className="card border-0"
                    style={{
                      zIndex: 1,
                      width: "500px",
                      padding: 20,
                    }}
                  >
                    <div className="card-body p-0">
                      <h4 className="card-title text-center">
                        Create An Account
                      </h4>
                      <form
                        className="login-form mt-4"
                        onSubmit={formik.handleSubmit}
                        autoComplete="false"
                      >
                        <div className="row">
                          <div className="col-md-6 mb-3">
                            <div className="">
                              <input
                                className="form-control "
                                placeholder="First Name *"
                                name="firstName"
                                value={formik.values.firstName}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                              />
                            </div>
                            {formik.errors.firstName &&
                            formik.touched.firstName ? (
                              <div className="text-danger mt-0 mb-2">
                                <small
                                  className="fw-lighter"
                                  style={{ fontSize: "0.8rem" }}
                                >
                                  {formik.errors.firstName}
                                </small>
                              </div>
                            ) : (
                              ""
                            )}
                          </div>
                          <div className="col-md-6 mb-3">
                            <div className="">
                              <input
                                className="form-control "
                                placeholder="Last Name"
                                name="lastName"
                                value={formik.values.lastName}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                              />
                            </div>
                            {formik.errors.lastName &&
                            formik.touched.lastName ? (
                              <div className="text-danger mt-0 mb-2">
                                <small
                                  className="fw-lighter"
                                  style={{ fontSize: "0.8rem" }}
                                >
                                  {formik.errors.lastName}
                                </small>
                              </div>
                            ) : (
                              ""
                            )}
                          </div>
                          <div className="col-md-6 mb-3">
                            <div className="">
                              <input
                                className="form-control "
                                placeholder="User Name *"
                                name="userName"
                                value={formik.values.userName}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                              />
                            </div>
                            {formik.errors.userName &&
                            formik.touched.userName ? (
                              <div className="text-danger mt-0 mb-2">
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
                          <div className="col-md-6 mb-3">
                            <div className="">
                              <input
                                className="form-control "
                                placeholder="Password *"
                                name="password"
                                value={formik.values.password}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                              />
                            </div>
                            {formik.errors.password &&
                            formik.touched.password ? (
                              <div className="text-danger mt-0 mb-2">
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
                          <div className="col-md-12 mb-3">
                            <div className="">
                              <input
                                className="form-control "
                                placeholder="Email Address *"
                                name="email"
                                value={formik.values.email}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                              />
                            </div>
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
                          <div className="col-md-12 mb-3">
                            <div className="">
                              <input
                                type="number"
                                className="form-control "
                                placeholder="Phone Number *"
                                name="phoneNo"
                                value={formik.values.phoneNo}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                              />
                            </div>
                            {formik.errors.phoneNo && formik.touched.phoneNo ? (
                              <div className="text-danger mt-0 mb-2">
                                <small
                                  className="fw-lighter"
                                  style={{ fontSize: "0.8rem" }}
                                >
                                  {formik.errors.phoneNo}
                                </small>
                              </div>
                            ) : (
                              ""
                            )}
                          </div>
                          <div className="col-md-6 mb-3">
                            <div className="">
                              <input
                                className="form-control "
                                placeholder="Company Name *"
                                name="companyName"
                                value={formik.values.companyName}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                              />
                            </div>
                            {formik.errors.companyName &&
                            formik.touched.companyName ? (
                              <div className="text-danger mt-0 mb-2">
                                <small
                                  className="fw-lighter"
                                  style={{ fontSize: "0.8rem" }}
                                >
                                  {formik.errors.companyName}
                                </small>
                              </div>
                            ) : (
                              ""
                            )}
                          </div>

                          <div className="col-md-6 mb-3">
                            <div className="">
                              <input
                                className="form-control "
                                placeholder="Address Line One *"
                                name="addressLineOne"
                                value={formik.values.addressLineOne}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                              />
                            </div>
                            {formik.errors.addressLineOne &&
                            formik.touched.addressLineOne ? (
                              <div className="text-danger mt-0 mb-2">
                                <small
                                  className="fw-lighter"
                                  style={{ fontSize: "0.8rem" }}
                                >
                                  {formik.errors.addressLineOne}
                                </small>
                              </div>
                            ) : (
                              ""
                            )}
                          </div>
                          <div className="col-md-6 mb-3">
                            <div className="">
                              <input
                                className="form-control "
                                placeholder="Address Line Two"
                                name="addressLineTwo"
                                value={formik.values.addressLineTwo}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                              />
                            </div>
                            {formik.errors.addressLineTwo &&
                            formik.touched.addressLineTwo ? (
                              <div className="text-danger mt-0 mb-2">
                                <small
                                  className="fw-lighter"
                                  style={{ fontSize: "0.8rem" }}
                                >
                                  {formik.errors.addressLineTwo}
                                </small>
                              </div>
                            ) : (
                              ""
                            )}
                          </div>
                          <div className="col-md-6 mb-3">
                            <div className="">
                              <input
                                className="form-control "
                                placeholder="State *"
                                name="state"
                                value={formik.values.state}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                              />
                            </div>
                            {formik.errors.state && formik.touched.state ? (
                              <div className="text-danger mt-0 mb-2">
                                <small
                                  className="fw-lighter"
                                  style={{ fontSize: "0.8rem" }}
                                >
                                  {formik.errors.state}
                                </small>
                              </div>
                            ) : (
                              ""
                            )}
                          </div>
                          <div className="col-md-6 mb-3">
                            <div className="">
                              <input
                                className="form-control "
                                placeholder="City *"
                                name="city"
                                value={formik.values.city}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                              />
                            </div>
                            {formik.errors.city && formik.touched.city ? (
                              <div className="text-danger mt-0 mb-2">
                                <small
                                  className="fw-lighter"
                                  style={{ fontSize: "0.8rem" }}
                                >
                                  {formik.errors.city}
                                </small>
                              </div>
                            ) : (
                              ""
                            )}
                          </div>
                          <div className="col-md-6 mb-3">
                            <div className="">
                              <input
                                className="form-control "
                                placeholder="Zip Code *"
                                name="zipCode"
                                value={formik.values.zipCode}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                              />
                            </div>
                            {formik.errors.zipCode && formik.touched.zipCode ? (
                              <div className="text-danger mt-0 mb-2">
                                <small
                                  className="fw-lighter"
                                  style={{ fontSize: "0.8rem" }}
                                >
                                  {formik.errors.zipCode}
                                </small>
                              </div>
                            ) : (
                              ""
                            )}
                          </div>
                          <div className="col-md-12 mb-3">
                            <div className="">
                              <div className="form-check">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  defaultValue
                                  id="flexCheckDefault"
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor="flexCheckDefault"
                                >
                                  I Accept{" "}
                                  <Link to="#" className="text-primary">
                                    Terms And Condition
                                  </Link>
                                </label>
                              </div>
                            </div>
                          </div>
                          <div className="col-md-12">
                            <div className="d-grid">
                              <input
                                type="submit"
                                value="Create An Account"
                                className="btn btn-primary"
                              />
                            </div>
                          </div>

                          <div className="mx-auto mt-3 mb-5">
                            <p className="mb-0">
                              <small className="text-dark me-2 mx-2">
                                Already have an account on Medzah?
                              </small>
                              <Link
                                to="/login"
                                className="text-dark fw-bold mb-5"
                              >
                                Sign in
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
          <ToastContainer
            position="top-center"
            autoClose={1000}
            hideProgressBar
          />
          <div
            className="col-lg-8 offset-lg-4 padding-less img order-1"
            style={{
              backgroundImage: 'url("assets/images/user/02.jpg")',
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
            }}
            data-jarallax='{"speed": 0.5}'
          />
        </div>
      </div>
    </section>
  );
};

export default SignUpPage;
