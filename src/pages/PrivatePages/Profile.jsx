import feather from "feather-icons";
import { useFormik } from "formik";
import useAPI from "hooks/useAPI";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import UserApi from "services/User.service";
import Loader from "utility/Loader";
import * as yup from "yup";

export const Profile = () => {
  const updateProfile = useAPI(UserApi.updateProfile);
  const UserProfile = useAPI(UserApi.getUserProfile);
  const userProfileData = useSelector(
    (state) => state?.entities?.users?.userProfile
  );
  console.log("profile user profile=>>", userProfileData);
  const UserData = JSON.parse(localStorage.getItem("loggedUserInfo"));
  const [profileData, setProfileData] = useState({});
  const [loading, setLoading] = useState(false);
  const {
    city,
    companyName,
    email,
    firstName,
    lastName,
    phoneNo,
    state,
    username,
    zipCode,
    userID,
  } = UserData;

  useEffect(() => {
    feather.replace();
    setProfileData(userProfileData);
  }, []);

  const getUserProfile = async () => {
    setLoading(true);
    try {
      const result = await UserProfile.request(userID);
      setProfileData(result.data.Data);
    } catch (error) {
      toast.error("Error", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    formik.setValues({
      ...formik.values,
      userName: profileData?.Username || "",
      firstName: profileData?.FirstName || "",
      lastName: profileData?.LastName || "",
      email: profileData?.Email || "",
      phoneNo: profileData?.PhoneNo || "",
      companyName: profileData?.CompanyName || "",
      addressLineOne: profileData?.AddressLine1 || "",
      addressLineTwo: profileData?.AddressLine2 || "",
      city: profileData?.City || "",
      state: profileData?.State || "",
      zipCode: profileData?.ZipCode || "",
    });
  }, [profileData]);

  const basicSchema = yup.object().shape({
    firstName: yup.string().required("First Name is required"),
    lastName: yup.string(),
    userName: yup.string().required("User Name is required"),
    email: yup.string().email().required("Email is required"),
    phoneNo: yup.number().required("Phone Number is required"),
    companyName: yup.string().required("Company Name is required"),
    addressLineOne: yup.string().required("Address is required"),
    addressLineTwo: yup.string(),
    city: yup.string().required("City is required"),
    state: yup.string().required("State is required"),
    zipCode: yup.number().required("Zip Code is required"),
  });

  const formik = useFormik({
    initialValues: {
      userName: username ? username : "",
      firstName: firstName ? firstName : "",
      lastName: lastName ? lastName : "",
      email: email ? email : "",
      phoneNo: phoneNo ? phoneNo : "",
      companyName: companyName ? companyName : "",
      addressLineOne: "",
      addressLineTwo: "",
      city: city ? city : "",
      state: state ? state : "",
      zipCode: zipCode ? zipCode : "",
      userID: userID,
    },
    validationSchema: basicSchema,
    onSubmit: async (values, { resetForm }) => {
      const data = {
        UserID: values.userID,
        UserName: values.userName,
        FirstName: values.firstName,
        LastName: values.lastName,
        Email: values.email,
        PhoneNo: values.phoneNo,
        CompanyName: values.companyName,
        AddressLine1: values.addressLineOne,
        AddressLine2: values.addressLineTwo,
        City: values.city,
        State: values.state,
        ZipCode: values.zipCode,
      };
      try {
        const result = await updateProfile.request(data);
        if (result.data.Status === 101) {
          resetForm();
          await getUserProfile();
        }
      } catch (error) {
        toast.error("Error", error);
      } finally {
        toast.success("Profile Updated Successfully !!");
      }
    },
  });
  // const [image, setImage] = useState(null);

  // const handleImageChange = (e) => {
  //   const file = e.target.files[0];
  //   if (file) {
  //     const reader = new FileReader();
  //     reader.onload = () => {
  //       setImage(reader.result);
  //     };
  //     reader.readAsDataURL(file);
  //   }
  // };

  // const handleDeleteImage = () => {
  //   setImage(null);
  // };
  return (
    <>
      <ToastContainer position="top-center" autoClose={1000} hideProgressBar />
      {loading ? (
        <Loader />
      ) : (
        <div className="layout-specing row">
          <div className="col-lg-12 col-md-12 ">
            <div className="card border-0 rounded shadow">
              <div className="card-body">
                {/* <div className="mt-4 text-md-start text-center d-sm-flex">
                  {image ? (
                    <img
                      src={image}
                      className="avatar float-md-left avatar-medium rounded-circle shadow me-md-4"
                      alt="Profile"
                    />
                  ) : (
                    <img
                      src="assets/images/client/05.jpg"
                      className="avatar float-md-left avatar-medium rounded-circle shadow me-md-4"
                      alt="Profile"
                    />
                  )}
                  <div className="mt-md-4 mt-3 mt-sm-0">
                    <label
                      htmlFor="image-upload"
                      className="btn btn-primary mt-2"
                    >
                      Change Picture
                    </label>
                    <input
                      type="file"
                      id="image-upload"
                      accept="image/*"
                      style={{ display: "none" }}
                      onChange={handleImageChange}
                    />
                    <button
                      onClick={handleDeleteImage}
                      className="btn btn-outline-primary  ms-2"
                    >
                      Delete
                    </button>
                  </div>
                </div> */}
                <form
                  className="login-form mt-4"
                  onSubmit={formik.handleSubmit}
                  autoComplete="false"
                >
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label htmlFor="email" className="form-label">
                        First Name
                      </label>
                      <div className="">
                        <input
                          className="form-control p-2"
                          placeholder="First Name"
                          name="firstName"
                          value={formik.values.firstName}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                        />
                      </div>
                      {formik.errors.firstName && formik.touched.firstName ? (
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
                      <label htmlFor="email" className="form-label">
                        Last Name
                      </label>
                      <div className="">
                        <input
                          className="form-control p-2 "
                          placeholder="Last Name"
                          name="lastName"
                          value={formik.values.lastName}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                        />
                      </div>
                      {formik.errors.lastName && formik.touched.lastName ? (
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
                      <label htmlFor="email" className="form-label">
                        User Name
                      </label>
                      <div className="">
                        <input
                          className="form-control p-2 "
                          placeholder="User Name"
                          name="userName"
                          value={formik.values.userName}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          disabled
                        />
                      </div>
                      {formik.errors.userName && formik.touched.userName ? (
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
                    <div className="col-md-12 mb-3">
                      <label htmlFor="email" className="form-label">
                        Email Address
                      </label>
                      <div className="">
                        <input
                          className="form-control p-2 "
                          placeholder="Email Address"
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
                      <label htmlFor="email" className="form-label">
                        Phone Number
                      </label>
                      <div className="">
                        <input
                          type="number"
                          className="form-control p-2 "
                          placeholder="Phone Number"
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
                      <label htmlFor="email" className="form-label">
                        Company Name
                      </label>
                      <div className="">
                        <input
                          className="form-control p-2 "
                          placeholder="Company Name"
                          name="companyName"
                          value={formik.values.companyName}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          disabled
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
                      <label htmlFor="email" className="form-label">
                        Address 1
                      </label>
                      <div className="">
                        <input
                          className="form-control p-2 "
                          placeholder="Address Line One"
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
                      <label htmlFor="email" className="form-label">
                        Address 2
                      </label>
                      <div className="">
                        <input
                          className="form-control p-2 "
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
                      <label htmlFor="email" className="form-label">
                        State
                      </label>
                      <div className="">
                        <input
                          className="form-control p-2 "
                          placeholder="State"
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
                      <label htmlFor="email" className="form-label">
                        City
                      </label>
                      <div className="">
                        <input
                          className="form-control p-2 "
                          placeholder="City"
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
                      <label htmlFor="email" className="form-label">
                        Zip Code
                      </label>
                      <div className="">
                        <input
                          className="form-control p-2 "
                          placeholder="Zip Code"
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
                  </div>
                  <div className="row">
                    <div className="col-sm-12">
                      <input
                        type="submit"
                        value="Save Changes"
                        className="btn btn-primary"
                      />
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
