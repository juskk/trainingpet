import React from 'react';
import { Formik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';


import classes from './LoginForm.module.css';
import Button from '../../../UI/button/Button';
import Input from '../../../UI/input/Input';
import LoginSchema from '../../../validation/loginValidation';
import { toLogin } from '../../../store/slices/auth';
import { useHistory } from 'react-router';
import { useCookies } from 'react-cookie';

const LoginForm = (props) => {

const { errorInfo } = useSelector(state => state.auth)
const dispatch = useDispatch()
const history = useHistory()
const [, setCookie] = useCookies(['user']);

  return (
    <Formik
      initialValues={{
        email: 'admin@gmail.com',
        password: '123123',
      }}
      validationSchema={LoginSchema}
      onSubmit={async values => {
        const { success, id, token, expiresIn } = await dispatch(toLogin({email: values.email, password: values.password}))
        if (success) {
          setCookie('token', token, {
            path: '/',
            maxAge: 3600 * 24
          })
          setCookie('id', id, {
            path: '/',
            maxAge: 3600 * 24
          })
          setCookie('expiresIn', expiresIn, {
            path: '/',
            maxAge: 3600 * 24
          })
          history.push('/user')
        }
      }}
      >
      {({ errors, touched, values, handleChange, handleSubmit }) => (
        <form onSubmit={handleSubmit} className={classes.Container}>
        <div className={classes.Part}>
          <label htmlFor="email">Email Address:</label>
          <Input 
            name="email"
            type="email"
            onChange={handleChange('email')}
            value={values.email}
            />
          <div className={classes.ErrorText}>{ errors.email && touched.email ? errors.email : null}</div>
        </div>
        <div className={classes.Part}>
          <label htmlFor="password1">Password:</label>
          <Input
            name="password"
            type="password"
            onChange={handleChange('password')}
            value={values.password1}
          />
          <div className={classes.ErrorText}>{ errors.password && touched.password ? errors.password : null}</div>
        </div>

        <Button type="submit">Log in</Button>
        <p className={classes.ErrorText}>{errorInfo ? errorInfo : null}</p>
      </form>
      )}
    </Formik>
  )
}



export default LoginForm
