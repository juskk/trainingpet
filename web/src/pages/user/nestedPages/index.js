import React from 'react'
import { useDispatch } from 'react-redux'
import { useCookies } from 'react-cookie';
import { useHistory } from 'react-router'
import { useRouteMatch } from 'react-router-dom'

import { logOut } from '../../../store/slices/auth'

const UserMain = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const [, , removeCookie] = useCookies(['user']);

const { path } = useRouteMatch()

  const toLogOut = () => {
    dispatch(logOut())
    removeCookie('token')
    removeCookie('id')
    removeCookie('expiresIn')
    history.push('/')
  }

  return (
    <div>
      <p onClick={ () => history.push(`${path}/user-info`) }>user info</p>
      <p onClick={ () => history.push(`${path}/user-courses`) }>user courses</p>
      <p onClick={ () => history.push(`${path}/user-courses-added`) }>courses added</p>
      <p onClick={toLogOut}>log out</p>
    </div>
  )
}

export default UserMain