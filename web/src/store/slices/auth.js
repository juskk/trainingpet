import { createSlice } from '@reduxjs/toolkit'
//import axios from 'axios'
import { URL } from '../../api' 

const initialState = {
  token: null,
  id: null,
  expiresIn: null,
  loading: false,
  error: false,
  errorInfo: null,
}

const slice = createSlice({
  name: 'courses',
  initialState,
  reducers: {
    startLoadingAuth: (state, action) => {
      state.loading = true
      state.error = false
      state.errorInfo = null
    },
    loadingAuthError: (state, action) => {
      state.error = true
      state.errorInfo = action.payload.error
      state.loading = false
    },
    loadedAuthSuccess: (state, action) => {
      state.loading = false
      state.token = action.payload.token
      state.id = action.payload.id
      state.expiresIn = action.payload.expiresIn
    },
    stopLoadingAuth: (state, action) => {
      state.loading = false
    }
  }
})

export default slice.reducer

const {
  startLoadingAuth,
  loadingAuthError,
  loadedAuthSuccess,
  stopLoadingAuth
} = slice.actions

export const toAuth = info => async dispatch  => {
  dispatch(startLoadingAuth())
  const res = await fetch(`${URL}/auth/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(info),
  });
  if (!res.ok) {
    const info = await res.json();
    dispatch(loadingAuthError({error: info.errorMessage}))
    return false
  } else {
    const info = await res.json();
    dispatch(stopLoadingAuth())
    return {success: true, data: info}
  }
}

export const toLogin = info => async dispatch  => {
  dispatch(startLoadingAuth())
  const res = await fetch(`${URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(info),
  });
  if (!res.ok) {
    const info = await res.json();
    dispatch(loadingAuthError({error: info.errorMessage}))
    return {success: false}
  } else {
    const info = await res.json()
    console.log(info)
    dispatch(loadedAuthSuccess({token: info.data.token, id: info.data.id, expiresIn: info.data.expiresIn}))
    return {success: true, token: info.data.token, id: info.data.id, expiresIn: info.data.expiresIn}
  }
}

export const setStore = (info) => dispatch => {
  dispatch(startLoadingAuth())
  if (info) dispatch(loadedAuthSuccess({token: info.token, id: info.id, expiresIn: info.expiresIn}))
  else dispatch(loadingAuthError({error: 'no data'}))
}

export const logOut = () => dispatch => {
  dispatch(startLoadingAuth())
  dispatch(loadedAuthSuccess({token: null, id: null, expiresIn: null}))
}