import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    userName: "",
    loggedIn: false,
  },
  reducers: {
    setUserName: (state, action) => {
      state.userName = action.payload;
    },
    setLoggedIn: (state, action) => {
      state.loggedIn = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setUserName, setLoggedIn } = userSlice.actions;

export default userSlice.reducer;
