import { Formik } from 'formik';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';
import {
  RiArrowRightLine,
  RiBuildingLine,
  RiIdCardLine,
  RiLockPasswordLine,
  RiMailLine,
  RiPhoneLine,
  RiUserLine,
} from '@remixicon/react';
import { SocialAuthButtons } from '../../components/auth/social-auth-buttons';
import { Input } from '../../ui/input';
import { Button } from '../../ui/button';
import { AdminAuthLayout } from '../../components/auth/admin-auth-layout';
import api from '../../api/axios';

const signUpSchema = Yup.object({
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
    .min(8, 'Password must be at least 8 characters')
    .required('Password is required'),

  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords must match')
    .required('Confirm your password'),
});

export function AdminSignUp() {
  return (
    <AdminAuthLayout activeForm="sign-up" title="Create an Account">
      <Formik
        initialValues={{
          firstName: '',
          lastName: '',
          signupEmail: '',
          phoneNumber: '',
          password: '',
          confirmPassword: '',
        }}
        validationSchema={signUpSchema}
        onSubmit={async (values, { setSubmitting, setStatus }) => {
          setStatus(null);

          try {
            await api.post('/auth/register', {
              firstName: values.firstName,
              lastName: values.lastName,
              email: values.signupEmail,
              phone: values.phoneNumber,
              password: values.password,
              role: 'ADMIN',
            });

            setStatus({
              type: 'success',
              message: 'Admin account created successfully. You can now log in.',
            });
          } catch (error) {
            setStatus({
              type: 'error',
              message: error.response?.data?.message || 'Unable to create admin account',
            });
          } finally {
            setSubmitting(false);
          }
        }}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
          setFieldValue,
          setFieldTouched,
          isSubmitting,
          status,
        }) => (
          <form
            className="flex w-full max-w-xl flex-col gap-4"
            onSubmit={handleSubmit}
            autoComplete="off"
          >
            <div className="grid grid-cols-2 w-full flex-col gap-3 sm:flex-row">
              <Input
                size="sm"
                extra="grid"
                name="firstName"
                placeholder="First name"
                icon={RiUserLine}
                autoComplete="new-password"
                value={values.firstName}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.firstName}
                touched={touched.firstName}
              />
              <Input
                size="sm"
                extra="grid"
                name="lastName"
                placeholder="Last name"
                icon={RiUserLine}
                autoComplete="new-password"
                value={values.lastName}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.lastName}
                touched={touched.lastName}
              />
            </div>
              <Input
                size="md"
                extra="grid"
                name="signupEmail"
                placeholder="Email"
                type="text"
                inputMode="email"
                icon={RiMailLine}
                autoComplete="new-password"
                value={values.signupEmail}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.signupEmail}
                touched={touched.signupEmail}
              />
              <Input
                size="md"
                extra="grid"
                name="phoneNumber"
                placeholder="080 1234 5678"
                icon={RiPhoneLine}
                autoComplete="new-password"
                value={values.phoneNumber}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.phoneNumber}
                touched={touched.phoneNumber}
              />
              <Input
                size="md"
                extra="grid"
                name="password"
                placeholder="Password"
                type="password"
                icon={RiLockPasswordLine}
                autoComplete="new-password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.password}
                touched={touched.password}
              />
              <Input
                size="md"
                extra="grid"
                name="confirmPassword"
                placeholder="Confirm Password"
                type="password"
                icon={RiLockPasswordLine}
                autoComplete="new-password"
                value={values.confirmPassword}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.confirmPassword}
                touched={touched.confirmPassword}
              />
            {status?.message && (
              <p
                className={`text-sm ${
                  status.type === 'error' ? 'text-red-300' : 'text-the-bright-side'
                }`}
              >
                {status.message}
              </p>
            )}
            <Button variant="primary" size="xl" disabled={isSubmitting}>
              Create Account
            </Button>
            <p className="text-center text-sm text-white/50">
              Have an account already?{' '}
              <Link className="font-semibold text-the-bright-side" to="/admin-login">
                Login
              </Link>
            </p>
            <SocialAuthButtons />
          </form>
        )}
      </Formik>
    </AdminAuthLayout>
  );
}
