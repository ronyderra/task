import { createSlice } from "@reduxjs/toolkit";

export const credentialsSlice = createSlice({
  name: "credentials",
  initialState: {
    userName: "",
    password: "",
    repeate: "",
  },
  reducers: {
    setUserName: (state, action) => {
      state.userName = action.payload;
    },
    setPassword: (state, action) => {
      state.password = action.payload;
    },
    setRepeate: (state, action) => {
      state.repeate = action.payload;
    },
    backToInit: (state, action) => {
      state = {
        userName: "",
        password: "",
        repeate: "",
      };
    },
  },
});

// Action creators are generated for each case reducer function
export const { setUserName, setPassword, setRepeate, backToInit } = credentialsSlice.actions;

export default credentialsSlice.reducer;
