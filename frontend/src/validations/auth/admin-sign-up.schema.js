import * as Yup from 'yup';

const passwordRequirement =
  'Password must be 8-30 chars and include uppercase, lowercase, number, and special character';
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,30}$/;

export const adminSignUpSchema = Yup.object({
  firstName: Yup.string()
    .min(2, 'First name must be at least 2 characters')
    .max(50, 'First name must not be more than 50 characters')
    .required('First name is required'),

  lastName: Yup.string()
    .min(2, 'Last name must be at least 2 characters')
    .max(50, 'Last name must not be more than 50 characters')
    .required('Last name is required'),

  signupEmail: Yup.string().email('Enter a valid email').required('Email is required'),

  phoneNumber: Yup.string().required('Phone number is required'),

  password: Yup.string()
    .matches(passwordRegex, passwordRequirement)
    .required('Password is required'),

  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords must match')
    .required('Confirm your password'),
});
