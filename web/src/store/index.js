import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import courses from "./slices/courses";
import auth from './slices/auth'
import user from "./slices/user";

const reducer = combineReducers({
  courses,
  auth,
  user
})

const store = configureStore({
  reducer
})

export default store
