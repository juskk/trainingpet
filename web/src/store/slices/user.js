import { createSlice } from "@reduxjs/toolkit"
import { URL } from '../../api'

const initialState = {
  info: [],
  loading: false,
  error: false,
  errorInfo: null,
}

const slice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    startLoading: (state, action) => {
      state.loading = true
      state.error = false
      state.errorInfo = null
      state.info = []
    },
    loadingInfoError: (state, action) => {
      state.loading = false
      state.error = true
      state.errorInfo = action.payload.error
    },
    loadedSuccess: (state, action) => {
      state.loading = false
      state.info = action.payload.info
    }
  }
})

export default slice.reducer

const {
  startLoading,
  loadingInfoError,
  loadedSuccess
    } = slice.actions

export const getInfo = (id) => async dispatch => {
  try {
    dispatch(startLoading())
    const res = await fetch(`${URL}/user/getInfo/${id}`)
    if (!res.ok) {
      const serverInfo = await res.json()
      dispatch(loadingInfoError({error: serverInfo.errorMessage}))
    } else {
      const serverInfo = await res.json()
      dispatch(loadedSuccess({info: serverInfo.data}))
    }
  } catch(e) {
    dispatch(loadingInfoError({error: e}))
  }
}

export const setInfo = (info) => async dispatch => {
  try {
    dispatch(startLoading())
    const res = await fetch(`${URL}/user/setInfo`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(info),
    });
    if (!res.ok) {
      const serverInfo = await res.json()
      dispatch(loadingInfoError({error: serverInfo.errorMessage}))
    } else {
      const serverInfo = await res.json()
      dispatch(loadedSuccess({info: serverInfo.data}))
    }
  } catch(e) {
    dispatch(loadingInfoError({error: e}))
  }
}

export const updateInfo = (id, info) => async (dispatch) => {
  try {
    dispatch(startLoading())
    const res = await fetch(`${URL}/user/updateInfo/${id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(info),
    });
    if (!res.ok) {
      const serverInfo = await res.json()
      dispatch(loadingInfoError({error: serverInfo.errorMessage}))
    } else {
      const serverInfo = await res.json()
      let fullInfo = serverInfo.data
      fullInfo.surname = info.surname
      fullInfo.name = info.name
      fullInfo.age = info.age
      dispatch(loadedSuccess({info: fullInfo}))
    }
  } catch(e) {

  }
}