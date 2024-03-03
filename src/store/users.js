import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { apiCallBegan } from "./actions/api";

const storageKey = "loggedUserInfo";

const user = JSON.parse(localStorage.getItem("loggedUserInfo"));
const token = user?.loginToken;

const checkLoggedUser = () => {
  const user = localStorage.getItem(storageKey);
  if (user) return JSON.parse(user);

  return false;
};

const userSlice = createSlice({
  name: "users",
  initialState: {
    loggedUser: checkLoggedUser(),
    authLoader: false,
    loginError: false,
    authorizationError: false,
    profileLoader: false,
    userProfile: null,
    searchTerm: null,
  },
  reducers: {
    authRequested: (state, action) => {
      state.authLoader = true;
    },
    authRequestFailed: (state, action) => {
      state.authLoader = false;
    },

    userLoggedIn: (state, { payload }) => {
      state.loginError = false;
      state.authorizationError = false;

      const statusCode = payload.Status;
      if (statusCode === 102) {
        state.authLoader = false;
        state.loginError = true;
        return state;
      }
      if (statusCode === 104) {
        state.authLoader = false;
        state.authorizationError = true;
        return state;
      }

      state.authLoader = false;
      payload.Status === 101
        ? toast.success("You has been login successfully")
        : toast.error(payload.error);

      const {
        FirstName,
        LastName,
        Email,
        UserID,
        UserType,
        Username,
        Password,
        ZipCode,
        PhoneNo,
        CompanyName,
        ApprovalLevel,
        ApprovalAuthority1,
        ApprovalAuthority2,
        EmailVerified,
        EntryID,
        _LoginToken,
        Inactive,
        City,
        State,
      } = payload.Data;

      const user = {
        firstName: FirstName,
        lastName: LastName,
        email: Email,
        userID: UserID,
        userType: UserType,
        username: Username,
        password: Password,
        zipCode: ZipCode,
        phoneNo: PhoneNo,
        companyName: CompanyName,
        approvalLevel: ApprovalLevel,
        approvalAuthority1: ApprovalAuthority1,
        approvalAuthority2: ApprovalAuthority2,
        emailVerified: EmailVerified,
        entryID: EntryID,
        loginToken: _LoginToken,
        inactive: Inactive,
        city: City,
        state: State,
      };
      localStorage.setItem("loggedUserInfo", JSON.stringify(user));
      state.loggedUser = user;
    },
    userLoggedOut: (state, action) => {
      localStorage.removeItem("loggedUserInfo");
      state.loggedUser = false;
    },
    clearLoginError: (state, action) => {
      state.loginError = action.payload;
      state.authorizationError = action.payload;
    },
    userProfileRequested: (state, action) => {
      state.profileLoader = true;
    },
    userProfileFailed: (state, action) => {
      state.profileLoader = false;
    },
    userProfileSuccess: (state, { payload }) => {
      state.userProfile = payload.Data;
      state.profileLoader = false;
    },
    searchProducts: (state, action) => {
      state.searchTerm = action.payload;
    },
  },
});

const {
  userLoggedIn,
  authRequested,
  authRequestFailed,
  userProfileRequested,
  userProfileFailed,
  userProfileSuccess,
} = userSlice.actions;

export const { userLoggedOut, clearLoginError, searchProducts } =
  userSlice.actions;

export default userSlice.reducer;

export const loginUser = (data) => {
  return apiCallBegan({
    url: `UserInfo/PerfomLogin`,
    method: "POST",
    data,
    onStart: authRequested.type,
    onSuccess: userLoggedIn.type,
    onError: authRequestFailed.type,
  });
};
export const userProfile = (data) => {
  return apiCallBegan({
    url: `UserInfo/GetUserProfile?UserID=${data}`,
    method: "GET",
    headers: {
      Authorization: `${token}`,
    },
    onStart: userProfileRequested.type,
    onSuccess: userProfileSuccess.type,
    onError: userProfileFailed.type,
  });
};
