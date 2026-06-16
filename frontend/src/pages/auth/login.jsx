import { Formik } from 'formik';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';
import { RiLockPasswordLine, RiMailLine } from '@remixicon/react';
import { AuthLayout } from '../../components/auth/auth-layout';
import { SocialAuthButtons } from '../../components/auth/social-auth-buttons';
import { Input } from '../../ui/input';
import { Button } from '../../ui/button';

const loginSchema = Yup.object({
  loginEmail: Yup.string().email('Enter a valid email').required('Email is required'),
  password: Yup.string().required('Password is required'),
});

export function Login() {
  return (
    <AuthLayout activeForm="login" title="Welcome Back">
      <Formik
        initialValues={{
          loginEmail: '',
          password: '',
        }}
        validationSchema={loginSchema}
        onSubmit={(values, { setSubmitting, setStatus }) => {
          setStatus({ message: `Ready to log in ${values.loginEmail}.` });
          setSubmitting(false);
        }}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
          isSubmitting,
          status,
        }) => (
          <form
            className="flex w-full max-w-xl flex-col gap-4"
            onSubmit={handleSubmit}
            autoComplete="off"
          >
            <Input
              size="md"
              name="loginEmail"
              placeholder="Email"
              type="text"
              inputMode="email"
              icon={RiMailLine}
              autoComplete="new-password"
              value={values.loginEmail}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.loginEmail}
              touched={touched.loginEmail}
            />
            <Input
              size="md"
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
            {status?.message && <p className="text-sm text-[#FCC003]">{status.message}</p>}
            <Button variant="primary" size="xl" disabled={isSubmitting}>
              Log In
            </Button>
            <p className="text-center text-sm text-white/50">
              Don't have an account?{' '}
              <Link className="font-semibold text-[#FCC003]" to="/sign-up">
                Sign up
              </Link>
            </p>
            <SocialAuthButtons label="Or login with" />
          </form>
        )}
      </Formik>
    </AuthLayout>
  );
}
