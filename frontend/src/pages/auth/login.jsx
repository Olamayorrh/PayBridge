import { Formik } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import { RiLockPasswordLine, RiMailLine } from '@remixicon/react';
import { AuthLayout } from '../../components/auth/auth-layout';
import { SocialAuthButtons } from '../../components/auth/social-auth-buttons';
import { Input } from '../../ui/input';
import { Button } from '../../ui/button';
import { useLogin } from '../../api/hooks';
import { loginSchema } from '../../validations/auth';

export function Login() {
  const navigate = useNavigate();
  const loginMutation = useLogin();

  const handleLogin = async (values, { setSubmitting, setStatus }) => {
    setStatus(null);

    try {
      const session = await loginMutation.mutateAsync({
        email: values.loginEmail,
        password: values.password,
      });

      const role = session?.user?.role?.toUpperCase();
      const redirectPathByRole = {
        BUYER: '/buyer',
        SELLER: '/seller',
      };
      const redirectPath = redirectPathByRole[role];

      if (!redirectPath) {
        setStatus({
          type: 'error',
          message: 'Your account role is not supported yet.',
        });
        return;
      }

      setStatus({
        type: 'success',
        message: 'Login successful.',
      });
      navigate(redirectPath, { replace: true });
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
    <AuthLayout activeForm="login" title="Welcome Back">
      <Formik
        initialValues={{
          loginEmail: '',
          password: '',
        }}
        validationSchema={loginSchema}
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
