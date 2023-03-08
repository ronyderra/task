import { createSlice } from "@reduxjs/toolkit";

export const registrationSlice = createSlice({
  name: "registration",
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
  },
});

// Action creators are generated for each case reducer function
export const { setUserName, setPassword, setRepeate } = registrationSlice.actions;

export default registrationSlice.reducer;
