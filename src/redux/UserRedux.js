import { createSlice } from "@reduxjs/toolkit";

const UserRedux = createSlice({
  name: "user",
  initialState: {
    user: [], // Change the initial state to null
    uid: '',
    email: '',
    status: "start" | "success" | "failed",
    loginStatus: false,
    isAdmin: false,
    inSession: false,
    authenticated: false,
  },
  reducers: {
    LoginUser: (state, action) => {
      const { user, isAdmin, uid, email, inSession, isZLeader } = action.payload;
      state.user = user; // Store user data in the user field
      state.uid = uid;
      state.email = email; // Update the email field with the user's email
      state.isAdmin = isAdmin;
      state.isZLeader = isZLeader;
      state.inSession = inSession;
      state.status = "success";
      state.loginStatus = true;
      state.authenticated = true;
    },
    LogoutUser: (state) => {
      state.user = []; // Set user data to an empty array on logout
      state.email = ''; // Set email to an empty string on logout
      state.uid = '';
      state.inSession = false;
      state.loginStatus = false;
      state.isZLeader = false;
      state.isAdmin = false;
      state.status = "start" | "success" | "failed";
      state.authenticated = false;
    },
  },
});

export const { LoginUser, LogoutUser } = UserRedux.actions;
export default UserRedux.reducer;
