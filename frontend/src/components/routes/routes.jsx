import { Routes, Route } from 'react-router-dom';
import { Login } from '../../pages/auth/login';
import { SignUp } from '../../pages/auth/sign-up';
import { AdminLogin } from '../../pages/auth/admin-login';
import { AdminSignUp } from '../../pages/auth/admin-sign-up';
import { BuyerDashBoard } from '../../pages/Buyer/dashboard';
import Landing from '../../pages/landing';
import Dashboard from '../Seller/Dashboard';
import PaymentReceipt from '../Seller/PaymentReceipt';
import Escrows from '../Seller/Escrows';
import Transactions from '../Seller/Transactions';
import Wallet from '../Seller/Wallet';
import Profile from '../Seller/Profile';
import EditProfile from '../Seller/EditProfile';
import Settings from '../Seller/Settings';

import SellerLayout from '../../Layout/SellerLayout';

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/sign-up" element={<SignUp />} />
      <Route path="/admin-sign-up" element={<AdminSignUp />} />
      <Route path="/admin-login" element={<AdminLogin />} />
      <Route path="/buyer-dashboard" element={<BuyerDashBoard />} />

      <Route path="/dashboard" element={<Dashboard />} />

      <Route path="/seller" element={<SellerLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="paymentReceipt" element={<PaymentReceipt />} />
        <Route path="escrows" element={<Escrows />} />
        <Route path="transactions" element={<Transactions />} />
        <Route path="wallet" element={<Wallet />} />
        <Route path="profile" element={<Profile />} />
        <Route path="profile/edit" element={<EditProfile />} />
        <Route path="settings" element={<Settings />} />
      </Route>
    </Routes>
  );
}
