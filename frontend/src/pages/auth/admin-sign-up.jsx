import { Formik } from 'formik';
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
import { useRegister } from '../../api/hooks';
import { adminSignUpSchema } from '../../validations/auth';

export function AdminSignUp() {
  const registerMutation = useRegister();

  const handleSignUp = async (values, { setSubmitting, setStatus }) => {
    setStatus(null);

    try {
      await registerMutation.mutateAsync({
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
  };

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
        validationSchema={adminSignUpSchema}
        onSubmit={handleSignUp}
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
