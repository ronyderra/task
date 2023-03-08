import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducer/user";
import credentialsReducer from "./reducer/credentials";

export default configureStore({
  reducer: {
    user: userReducer,
    credentials: credentialsReducer,
  },
});
