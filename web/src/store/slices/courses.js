import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { URL } from '../../api' 

const initialState = {
  courses: [],
  readingCourses: [],
  userCourses: [],
  loading: false,
  error: false,
  errorInfo: null,
}

const slice = createSlice({
  name: 'courses',
  initialState,
  reducers: {
    startLoadingCourses: (state, action) => {
      state.loading = true
      state.error = false
      state.errorInfo = null
    },
    loadingCoursesError: (state, action) => {
      state.error = true
      state.errorInfo = action.payload.error
      state.loading = false
    },
    coursesLoaded: (state, action) => {
      state.courses = action.payload.courses
      state.loading = false
    },
    readingCoursesLoaded: (state, action) => {
      state.readingCourses = action.payload.readingCourses
      state.loading = false
    },
    userCoursesLoaded: (state, action) => {
      state.userCourses = action.payload.userCourses
      state.loading = false
    },
    loadedCoursesSuccess: (state, action) => {
      state.loading = false
    }
  }
})

export default slice.reducer

const { 
  startLoadingCourses, 
  loadingCoursesError, 
  coursesLoaded,
  readingCoursesLoaded,
  userCoursesLoaded,
  loadedCoursesSuccess,
    } = slice.actions

export const fetchCourses = () => async (dispatch) => {
  try {
    dispatch(startLoadingCourses())
    const courses = await axios.get(`${URL}/courses/`)
    dispatch(coursesLoaded({courses: courses.data.data}))
  } catch(e) {
    dispatch(loadingCoursesError({error: e}))
  }
}

export const fetchReadingCourses = (userId) => async dispatch => {
  try {
    dispatch(startLoadingCourses())
    const res = await fetch(`${URL}/reading-courses/get/:${userId}`)
    const info = await res.json()
    if (!res.ok) {
      dispatch(loadingCoursesError({error: info.errorMessage}))
    } else {
      dispatch(readingCoursesLoaded({readingCourses: info.data}))
    }
  } catch(e) {
    dispatch(loadingCoursesError({error: e}))
  }
}

export const createFolder = async (userId) => {
  try {
    const res = await fetch(`${URL}/reading-courses/create/:${userId}`);
    const info = await res.json()
    return info
  } catch(e) {
    return {success: false}
  }
}

export const checkCourse = async (userId, courseId) => {
  try {
    const res = await fetch(`${URL}/reading-courses/check/:${userId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({courseId}),
    })
    const info = await res.json()
    return info
  } catch(e) {
    return {success: false}
  }
}

export const addCourse = async (userId, courseId) => {
  try {
    const res = await fetch(`${URL}/reading-courses/add/:${userId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({courseId}),
    })
    const info = await res.json()
    return info
  } catch(e) {
    return {success: false}
  }
}

export const removeCourse = async (userId, courseId) => {
  try {
    const res = await fetch(`${URL}/reading-courses/remove/:${userId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({courseId}),
    })
    const info = await res.json()
    return info
  } catch(e) {
    return {success: false}
  }
}

export const fetchUserCourses = (userId) => async dispatch => {
  try {
    dispatch(startLoadingCourses())
    const res = await fetch(`${URL}/courses/createdBy/${userId}`)
    if (!res.ok) {
      const info = await res.json()
      dispatch(loadingCoursesError({error: info.errorMessage}))
    } else {
      const info = await res.json()
      dispatch(userCoursesLoaded({userCourses: info.data})) 
    }
  } catch(e) {
    dispatch(loadingCoursesError({error: e}))
  }
}

export const fetchCourse = (id) => async dispatch => {
  try {
    dispatch(startLoadingCourses())
     const course = await axios.get(`${URL}/courses/${id}`)
     dispatch(loadedCoursesSuccess())
     return course.data.data
  } catch(e) {
    dispatch(loadingCoursesError({error: e}))
  }
}

export const deleteCourse = (id) => async dispatch => {
  try {
    dispatch(startLoadingCourses())
    const deletedCourse = await axios.get(`${URL}/courses/remove/${id}`)
    if (deletedCourse) {
      const courses = await axios.get(`${URL}/courses/`);
      dispatch(coursesLoaded({courses: courses.data.data}))
    }
  } catch(e) {
    dispatch(loadingCoursesError({error: e}))
  }
}

export const createCourse = (courseInfo) => async dispatch => {
  try {
    dispatch(startLoadingCourses())
    const createdCourse = await axios.post(`${URL}/courses/add`, courseInfo)
    if (createdCourse) {
      const courses = await axios.get(`${URL}/courses/`);
      dispatch(coursesLoaded({courses: courses.data.data}))
    }
  } catch(e) {
    dispatch(loadingCoursesError({error: e}))
  }
}

export const updateCourse = (info, id) => async dispatch => {
  try {
    dispatch(startLoadingCourses())
    const updatedCourse = await axios.post(`${URL}/courses/update/${id}`, info)
    if (updatedCourse) {
      const courses = await axios.get(`${URL}/courses/`);
      dispatch(coursesLoaded({courses: courses.data.data}))  
      return updatedCourse
    }
  } catch(e) {
    dispatch(loadingCoursesError({error: e}))
  }
}