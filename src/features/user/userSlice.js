import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "customer",
  initialState: {
    accessToken: {},
    customerDetails: {},
    isAuth: false,
  },
  reducers: {
    setAccessToken: (state, action) => {
      state.accessToken = action.payload;
      const {
        customerAccessToken: { accessToken = "", expiresAt = "" },
      } = action.payload;
      localStorage.setItem("accessToken", atob(accessToken));
      localStorage.setItem("expiresAt", expiresAt);
    },
    setCustomerDetails: (state, action) => {
      state.customerDetails = action.payload;
      state.isAuth = true;
    },
    removeCustomer: (state, action) => {
      state.customerDetails = {};
      state.accessToken = "";
      state.isAuth = false;
    },
  },
});

// this is for dispatch
export const { setAccessToken, setCustomerDetails, removeCustomer } =
  userSlice.actions;

// this is for configureStore
export default userSlice.reducer;
