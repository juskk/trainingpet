import React from 'react'
import { useHistory } from 'react-router'
import LoginForm from '../../../components/auth/loginForm/LoginForm'

import classes from './Login.module.css'

const Login = (props) => {

  const history = useHistory()

  const goToRegister = () => {
    history.push('/register')
  }

  return (
    <div className={classes.Container}>
      <LoginForm />
      <p>Dont have an account yet? <span className={classes.Register} onClick={goToRegister}>register</span></p>
    </div>
  )
}

export default Login
