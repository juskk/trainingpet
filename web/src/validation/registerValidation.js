import * as Yup from 'yup'

const RegisterSchema = Yup.object().shape({
  password1: Yup.string()
    .min(6, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  password2: Yup.string()
    .min(6, 'Too Short!')
    .max(50, 'Too Long!')
    .oneOf([Yup.ref('password1'), null], "Passwords dont match")
    .required('Required'),
  email: Yup.string().email('Invalid email').required('Required'),
});

export default RegisterSchema