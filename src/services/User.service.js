import ApiClient from "api/ApiClient";

const signupUser = (data) => ApiClient.post("UserInfo/PerformSignUp", data);
const updateProfile = (data) => ApiClient.post("UserInfo/UpdateProfile", data);
const getUserProfile = (data) =>
  ApiClient.get(`UserInfo/GetUserProfile?UserID=${data}`);
const changePassword = (data) =>
  ApiClient.post("UserInfo/ChangePassword", data);

const services = {
  signupUser,
  updateProfile,
  getUserProfile,
  changePassword,
};

export default services;
