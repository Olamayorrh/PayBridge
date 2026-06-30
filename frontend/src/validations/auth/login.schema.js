import * as Yup from 'yup';

export const loginSchema = Yup.object({
  loginEmail: Yup.string().email('Enter a valid email').required('Email is required'),
  password: Yup.string().required('Password is required'),
});

