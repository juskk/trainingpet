import React from 'react'
import { useHistory } from 'react-router'
import RegisterForm from '../../../components/auth/registerForm/RegisterForm'

import classes from './Register.module.css'

const AuthPage = (props) => {  

  const history = useHistory()

  const goToLogin = () => {
    history.push('/login')
  }

  return (
    <div className={classes.Container}>
      <RegisterForm />
      <p>Already have an account? <span className={classes.Login} onClick={goToLogin}>login</span></p>
    </div>
  )
}

export default AuthPage
