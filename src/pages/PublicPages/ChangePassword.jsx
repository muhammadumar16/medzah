import feather from "feather-icons";
import { useFormik } from "formik";
import useAPI from "hooks/useAPI";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import UserApi from "services/User.service";
import { userLoggedOut } from "store/users";
import * as yup from "yup";

export const ChangePassword = () => {
  // const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const changePassword = useAPI(UserApi.changePassword);
  useEffect(() => {
    feather.replace();
  }, []);

  const basicSchema = yup.object().shape({
    password: yup.string().min(4).required("Old Password is required"),
    newPassword: yup.string().min(4).required("New Password is required"),
    confirmNewPassword: yup
      .string()
      .min(4)
      .required("Re-type New Password is required"),
  });

  const formik = useFormik({
    initialValues: {
      password: "",
      newPassword: "",
      confirmNewPassword: "",
    },
    validationSchema: basicSchema,
    onSubmit: async (values, { resetForm }) => {
      if (values.newPassword !== values.confirmNewPassword) {
        toast.error("Please Enter Same Password");
        return;
      }
      const data = {
        OldPassword: values.password,
        Password: values.newPassword,
      };
      try {
        const result = await changePassword.request(data);
        if (result.data.Status === 102) {
          toast.error("Invalid Old Password");
        }
        if (result.data.Status === 101) {
          toast.success("Password Updated Successfully !!");
          setTimeout(() => {
            dispatch(userLoggedOut());
          }, 1000);
          resetForm();
        }
      } catch (error) {
        toast.error("Error", error);
      }
    },
  });

  return (
    <>
      <section
        className="bg-auth-home page-wrapper d-flex justify-content-center align-items-center"
        style={{
          backgroundImage: 'url("assets/images/user/changePassword.jpg")',
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <ToastContainer
          position="top-center"
          autoClose={1000}
          hideProgressBar
        />
        <div
          className="bg-overlay bg-overlay-white"
          // style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
        />
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-5 col-md-5">
              <div className="card shadow rounded border-0 mt-4 ">
                <div className="card-body">
                  <h4 className="card-title text-center">Change Password</h4>
                  <form
                    className="login-form mt-4"
                    onSubmit={formik.handleSubmit}
                  >
                    <div className="row">
                      <div className="col-md-12">
                        <div className="mb-3">
                          <label className="form-label">
                            Old Password <span className="text-danger">*</span>
                          </label>
                          <div className="form-icon position-relative">
                            <i
                              data-feather="key"
                              className="fea icon-sm icons"
                            />
                            <input
                              type="password"
                              className="form-control ps-5"
                              placeholder="Old Password"
                              name="password"
                              value={formik.values.password}
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                            />
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
                        </div>
                      </div>

                      <div className="col-md-12">
                        <div className="mb-3">
                          <label className="form-label">
                            New Password <span className="text-danger">*</span>
                          </label>
                          <div className="form-icon position-relative">
                            <i
                              data-feather="key"
                              className="fea icon-sm icons"
                            />
                            <input
                              type="password"
                              className="form-control ps-5 "
                              placeholder="New Password"
                              name="newPassword"
                              autoComplete="false"
                              value={formik.values.newPassword}
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                            />
                            {formik.errors.newPassword &&
                            formik.touched.newPassword ? (
                              <div className="text-danger mt-0 mb-2">
                                <small
                                  className="fw-lighter"
                                  style={{ fontSize: "0.8rem" }}
                                >
                                  {formik.errors.newPassword}
                                </small>
                              </div>
                            ) : (
                              ""
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="mb-3">
                          <label className="form-label">
                            Re-type New password
                            <span className="text-danger">*</span>
                          </label>
                          <div className="form-icon position-relative">
                            <i
                              data-feather="key"
                              className="fea icon-sm icons"
                            />
                            <input
                              type="password"
                              className="form-control ps-5 "
                              placeholder="Re-type New Password"
                              name="confirmNewPassword"
                              value={formik.values.confirmNewPassword}
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                            />
                            {formik.errors.confirmNewPassword &&
                            formik.touched.confirmNewPassword ? (
                              <div className="text-danger mt-0 mb-2">
                                <small
                                  className="fw-lighter"
                                  style={{ fontSize: "0.8rem" }}
                                >
                                  {formik.errors.confirmNewPassword}
                                </small>
                              </div>
                            ) : (
                              ""
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="col-md-12 mt-3 mb-4">
                        <div className="d-grid">
                          <input
                            type="submit"
                            value="Confirm Password"
                            className="btn btn-primary"
                          />
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
