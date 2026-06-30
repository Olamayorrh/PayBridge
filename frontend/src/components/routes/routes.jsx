import { Navigate, Routes, Route } from 'react-router-dom';
import { Login } from '../../pages/auth/login';
import { SignUp } from '../../pages/auth/sign-up';
import { AdminLogin } from '../../pages/auth/admin-login';
import { AdminSignUp } from '../../pages/auth/admin-sign-up';
import { BuyerLayout } from '../../pages/buyer/buyer-layout';
import { BuyerDashBoard } from '../../pages/buyer/dashboard';
import { BuyerTransactions } from '../../pages/buyer/transactions';
import { BuyerSettings } from '../../pages/buyer/settings';
import SellerLayout from '../../Layout/SellerLayout';
import SellerDashboard from '../Seller/Dashboard';
import SellerEscrows from '../Seller/Escrows';
import SellerTransactions from '../Seller/Transactions';
import SellerWallet from '../Seller/Wallet';
import SellerProfile from '../Seller/Profile';
import SellerEditProfile from '../Seller/EditProfile';
import SellerSettings from '../Seller/Settings';
import SellerPaymentReceipt from '../Seller/PaymentReceipt';
import Landing from '../../pages/Landing';

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/sign-up" element={<SignUp />} />
      <Route path="/admin-sign-up" element={<AdminSignUp />} />
      <Route path="/admin-login" element={<AdminLogin />} />
      <Route path="/buyer-dashboard" element={<Navigate to="/buyer" replace />} />
      <Route path="/buyer" element={<BuyerLayout />}>
        <Route index element={<BuyerDashBoard />} />
        <Route path="transactions" element={<BuyerTransactions />} />
        <Route path="settings" element={<BuyerSettings />} />
      </Route>
      <Route path="/seller" element={<SellerLayout />}>
        <Route index element={<SellerDashboard />} />
        <Route path="escrows" element={<SellerEscrows />} />
        <Route path="transactions" element={<SellerTransactions />} />
        <Route path="wallet" element={<SellerWallet />} />
        <Route path="profile" element={<SellerProfile />} />
        <Route path="profile/edit" element={<SellerEditProfile />} />
        <Route path="settings" element={<SellerSettings />} />
        <Route path="paymentReceipt" element={<SellerPaymentReceipt />} />
      </Route>
    </Routes>
  );
}
