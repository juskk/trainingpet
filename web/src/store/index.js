import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import courses from "./slices/courses";

const reducer = combineReducers({
  courses
})

const store = configureStore({
  reducer
})

export default store
