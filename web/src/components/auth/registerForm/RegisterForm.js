import React from 'react';
import { Formik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';


import classes from './RegisterForm.module.css';
import Button from '../../../UI/button/Button';
import Input from '../../../UI/input/Input';
import SignupSchema from '../../../validation/registerValidation';
import { toAuth } from '../../../store/slices/auth';
import { useHistory } from 'react-router';
import { createFolder } from '../../../store/slices/courses';

const RegisterForm = (props) => {

const { errorInfo } = useSelector(state => state.auth)
const dispatch = useDispatch()
const history = useHistory()

  return (
    <Formik
      initialValues={{
        email: '',
        password1: '',
        password2: ''
      }}
      validationSchema={SignupSchema}
      onSubmit={async values => {
        const {success, data} = await dispatch(toAuth({email: values.email, password: values.password2}))
        if (success) {
          createFolder(data.data.id)
          history.push('/login')
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
            name="password1"
            type="password"
            onChange={handleChange('password1')}
            value={values.password1}
          />
          <div className={classes.ErrorText}>{ errors.password1 && touched.password1 ? errors.password1 : null}</div>
        </div>
        <div className={classes.Part}>
          <label htmlFor="password2">Confirm password:</label>
          <Input
            name="password2"
            type="password"
            onChange={handleChange('password2')}
            value={values.password2}
          />
          <div className={classes.ErrorText}>{ errors.password2 && touched.password2 ? errors.password2 : null}</div>
        </div>

        <Button type="submit">Register</Button>
        <p className={classes.ErrorText}>{errorInfo ? errorInfo : null}</p>
      </form>
      )}
    </Formik>
  )
}



export default RegisterForm
