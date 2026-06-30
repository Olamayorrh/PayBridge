import { Formik } from 'formik';
import { Link } from 'react-router-dom';
import { RiLockPasswordLine, RiMailLine } from '@remixicon/react';
import { SocialAuthButtons } from '../../components/auth/social-auth-buttons';
import { Input } from '../../ui/input';
import { Button } from '../../ui/button';
import { AdminAuthLayout } from '../../components/auth/admin-auth-layout';
import { useLogin } from '../../api/hooks';
import { adminLoginSchema } from '../../validations/auth';

export function AdminLogin() {
  const loginMutation = useLogin();

  const handleLogin = async (values, { setSubmitting, setStatus }) => {
    setStatus(null);

    try {
      await loginMutation.mutateAsync({
        email: values.loginEmail,
        password: values.password,
      });

      setStatus({
        type: 'success',
        message: 'Login successful.',
      });
    } catch (error) {
      setStatus({
        type: 'error',
        message: error.response?.data?.message || 'Unable to log in',
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AdminAuthLayout activeForm="login" title="Welcome Back">
      <Formik
        initialValues={{
          loginEmail: '',
          password: '',
        }}
        validationSchema={adminLoginSchema}
        onSubmit={handleLogin}
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
            {status?.message && (
              <p
                className={`text-sm ${
                  status.type === 'error' ? 'text-red-300' : 'text-[#FCC003]'
                }`}
              >
                {status.message}
              </p>
            )}
            <Button variant="primary" size="xl" disabled={isSubmitting}>
              Log In
            </Button>
            <p className="text-center text-sm text-white/50">
              Don't have an account?{' '}
              <Link className="font-semibold text-[#FCC003]" to="/admin-sign-up">
                Sign up
              </Link>
            </p>
            <SocialAuthButtons label="Or login with" />
          </form>
        )}
      </Formik>
    </AdminAuthLayout>
  );
}
