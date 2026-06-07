import { Routes, Route } from 'react-router-dom';
import { Login } from '../../pages/auth/login';
import { SignUp } from '../../pages/auth/sign-up';

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/sign-up" element={<SignUp />} />
    </Routes>
  );
}
