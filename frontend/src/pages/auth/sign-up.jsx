import { Formik } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import {
  RiArrowRightLine,
  RiBuildingLine,
  RiIdCardLine,
  RiLockPasswordLine,
  RiMailLine,
  RiPhoneLine,
  RiUserLine,
} from '@remixicon/react';
import { AuthLayout } from '../../components/auth/auth-layout';
import { SocialAuthButtons } from '../../components/auth/social-auth-buttons';
import { Input } from '../../ui/input';
import { Button } from '../../ui/button';
import { useRegister } from '../../api/hooks';
import { signUpSchema } from '../../validations/auth';

export function SignUp() {
  const navigate = useNavigate();
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
        role: values.role.toUpperCase(),
      });

      setStatus({
        type: 'success',
        message: 'Account created successfully. You can now log in.',
      });
      navigate('/login', { replace: true });
    } catch (error) {
      setStatus({
        type: 'error',
        message: error.response?.data?.message || 'Unable to create account',
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AuthLayout activeForm="sign-up" title="Create an Account">
      <Formik
        initialValues={{
          firstName: '',
          lastName: '',
          signupEmail: '',
          phoneNumber: '',
          nin: '',
          role: '',
          businessName: '',
          businessDocument: null,
          password: '',
          confirmPassword: '',
        }}
        validationSchema={signUpSchema}
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
            <div className="lg:grid lg:grid-cols-2 flex flex-col gap-4 w-full  lg:gap-3">
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
            </div>
            <Input
              size="md"
              name="nin"
              placeholder="NIN Digits"
              icon={RiIdCardLine}
              autoComplete="new-password"
              value={values.nin}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.nin}
              touched={touched.nin}
            />
            <div>
              <div className="flex gap-3">
                <Button
                  variant="secondary"
                  size="xl"
                  type="button"
                  className={
                    values.role === 'buyer'
                      ? 'border border-the-bright-side bg-the-bright-side text-black'
                      : 'border border-transparent'
                  }
                  onClick={() => {
                    setFieldValue('role', 'buyer');
                    setFieldValue('businessName', '');
                    setFieldValue('businessDocument', null);
                    setFieldTouched('role', true, false);
                  }}
                >
                  I'm a buyer
                </Button>
                <Button
                  variant="secondary"
                  size="xl"
                  type="button"
                  className={
                    values.role === 'seller'
                      ? 'border border-the-bright-side bg-the-bright-side text-black'
                      : 'border border-transparent'
                  }
                  onClick={() => {
                    setFieldValue('role', 'seller');
                    setFieldTouched('role', true, false);
                  }}
                >
                  I'm a seller
                </Button>
              </div>
              {touched.role && errors.role && (
                <p className="mt-1 text-xs text-red-300">{errors.role}</p>
              )}
            </div>

            {values.role === 'seller' && (
              <>
                <Input
                  size="md"
                  name="businessName"
                  placeholder="Business name"
                  icon={RiBuildingLine}
                  autoComplete="new-password"
                  value={values.businessName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={errors.businessName}
                  touched={touched.businessName}
                />
                <div className="flex w-full flex-col gap-3 rounded-2xl border border-transparent bg-white/15 px-4 py-3 text-white/40 sm:flex-row sm:items-center">
                  <div className="flex w-full items-center gap-2">
                    <RiBuildingLine size={20} />
                    <p className="text-sm">Upload your business document</p>
                    <RiArrowRightLine />
                  </div>
                  <input
                    name="businessDocument"
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={(event) =>
                      setFieldValue('businessDocument', event.currentTarget.files[0])
                    }
                    className="block w-full text-sm text-gray-500
                              file:mr-4 file:rounded-lg file:border-0
                              file:bg-white/12 file:px-4 file:py-2
                              file:text-sm file:font-semibold file:text-the-bright-side
                              hover:file:bg-blue-100"
                  />
                </div>
              </>
            )}
            <div className="lg:grid lg:grid-cols-2 flex flex-col gap-4 w-full  lg:gap-3">
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
            </div>
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
              <Link className="font-semibold text-the-bright-side" to="/login">
                Login
              </Link>
            </p>
            <div>
              <p className='text-sm text-white text-center'>I agree to paybridge's <a href="#" className='text-[#FCC003]'>terms of service</a> and <a href="#" className='text-[#FCC003]'> Privacy policy</a></p>
            </div>
            <SocialAuthButtons />
          </form>
        )}
      </Formik>
    </AuthLayout>
  );
}
