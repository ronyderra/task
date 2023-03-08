import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducer/user";
import registrationReducer from "./reducer/registration";

export default configureStore({
  reducer: {
    user: userReducer,
    registration: registrationReducer,
  },
});
