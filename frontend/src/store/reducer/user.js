import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    userName: "",
    loggedIn: false,
    registered: false,
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
    backToIn: (state, action) => {
      state = {
        userName: "",
        loggedIn: false,
        registered: false,
      };
    },
  },
});

// Action creators are generated for each case reducer function
export const { setUserName, setLoggedIn, setRegistered, backToIn } = userSlice.actions;

export default userSlice.reducer;
