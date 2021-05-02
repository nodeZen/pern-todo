import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "./store/todo-slice";
import authReducer from "./store//auth-slice";

export default configureStore({
  reducer: {
    todo: todoReducer,
    auth: authReducer,
  },
});
