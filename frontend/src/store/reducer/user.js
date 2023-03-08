import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    userName: "",
    loggedIn: false,
    registered: true,
  },
  reducers: {
    setUserName: (state, action) => {
      state.userName = action.payload;
    },
    setLoggedIn: (state, action) => {
      state.loggedIn = action.payload;
    },
    setRegistered: (state, action) => {
      state.registered = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setUserName, setLoggedIn, setRegistered } = userSlice.actions;

export default userSlice.reducer;
