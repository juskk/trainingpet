import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { URL } from '../../api' 

const initialState = {
  courses: [],
  loading: false,
  error: false,
  errorInfo: null,
}

const slice = createSlice({
  name: 'courses',
  initialState,
  reducers: {
    startLoading: (state, action) => {
      state.loading = true
      state.error = false
      state.errorInfo = null
    },
    loadingError: (state, action) => {
      state.error = true
      state.errorInfo = action.payload.error
      state.loading = false
    },
    coursesLoaded: (state, action) => {
      state.courses = action.payload.courses
      state.loading = false
    },
    loadedSuccess: (state, action) => {
      state.loading = false
    }
  }
})

export default slice.reducer

const { 
  coursesLoaded, 
  loadingError, 
  startLoading,
  loadedSuccess,
    } = slice.actions

export const fetchCourses = () => async (dispatch) => {
  try {
    dispatch(startLoading())
    const courses = await axios.get(`${URL}/courses/`)
    dispatch(coursesLoaded({courses: courses.data.data}))
  } catch(e) {
    dispatch(loadingError(e))
  }
}

export const fetchCourse = (id) => async dispatch => {
  try {
    dispatch(startLoading())
     const course = await axios.get(`${URL}/courses/${id}`)
     dispatch(loadedSuccess())
     return course.data.data
  } catch(e) {
    dispatch(loadingError(e))
  }
}

export const deleteCourse = (id) => async dispatch => {
  try {
    dispatch(startLoading())
    const deletedCourse = await axios.get(`${URL}/courses/remove/${id}`)
    if (deletedCourse) {
      const courses = await axios.get(`${URL}/courses/`);
      dispatch(coursesLoaded({courses: courses.data.data}))
    }
  } catch(e) {
    dispatch(loadingError(e))
  }
}

export const createCourse = (courseInfo) => async dispatch => {
  try {
    dispatch(startLoading())
    const createdCourse = await axios.post(`${URL}/courses/add`, courseInfo)
    if (createdCourse) {
      const courses = await axios.get(`${URL}/courses/`);
      dispatch(coursesLoaded({courses: courses.data.data}))
    }
  } catch(e) {
    dispatch(loadingError(e))
  }
}

export const updateCourse = (info, id) => async dispatch => {
  try {
    dispatch(startLoading())
    const updatedCourse = await axios.post(`${URL}/courses/update/${id}`, info)
    if (updatedCourse) {
      const courses = await axios.get(`${URL}/courses/`);
      dispatch(coursesLoaded({courses: courses.data.data}))  
      return updatedCourse
    }
  } catch(e) {
    dispatch(loadingError(e))
  }
}