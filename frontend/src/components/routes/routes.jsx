import { Routes, Route } from 'react-router-dom';
import { Login } from '../../pages/login';

export function AppRoutes() {
  return (
    <div>
      <Route path="/login" element={<Login />} />
      <Route path="/sign-up" element={<SignUp />} />
    </div>
  );
}
