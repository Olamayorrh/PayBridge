import { Navigate, Routes, Route } from 'react-router-dom';
import { Login } from '../../pages/auth/login';
import { SignUp } from '../../pages/auth/sign-up';
import { AdminLogin } from '../../pages/auth/admin-login';
import { AdminSignUp } from '../../pages/auth/admin-sign-up';
import { BuyerLayout } from '../../pages/buyer/buyer-layout';
import { BuyerDashBoard } from '../../pages/buyer/dashboard';
import { BuyerTransactions } from '../../pages/buyer/transactions';
import { BuyerTransactionDetails } from '../../pages/buyer/transaction-details';
import { BuyerDisputes } from '../../pages/buyer/disputes';
import { BuyerDisputeDetails } from '../../pages/buyer/dispute-details';
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
import Dashboard from '../Seller/Dashboard';
import PaymentReceipt from '../Seller/PaymentReceipt';
import Escrows from '../Seller/Escrows';
import Transactions from '../Seller/Transactions';
import Wallet from '../Seller/Wallet';
import Profile from '../Seller/Profile';
import EditProfile from '../Seller/EditProfile';
import Settings from '../Seller/Settings';


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
        <Route path="transactions/:id" element={<BuyerTransactionDetails />} />
        <Route path="disputes" element={<BuyerDisputes />} />
        <Route path="disputes/:id" element={<BuyerDisputeDetails />} />
        <Route path="settings" element={<BuyerSettings />} />
      </Route>
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
