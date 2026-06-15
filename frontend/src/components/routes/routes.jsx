import { Routes, Route } from 'react-router-dom';
import { Login } from '../../pages/auth/login';
import { SignUp } from '../../pages/auth/sign-up';
import { AdminLogin } from '../../pages/auth/admin-login';
import { AdminSignUp } from '../../pages/auth/admin-sign-up';

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/sign-up" element={<SignUp />} />
      <Route path="/admin-sign-up" element={<AdminSignUp />} />
      <Route path="/admin-login" element={<AdminLogin />} />
    </Routes>
  );
}
