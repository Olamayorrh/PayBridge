import {
  RiHome4Line,
  RiShieldCheckLine,
  RiArrowLeftRightFill,
  RiWalletFill,
  RiUserLine,
  RiSettings3Line,
  RiGitRepositoryPrivateLine,
  RiWirelessChargingLine,
  RiNotification2Line,
  RiBookOpenLine,
  RiScales3Fill,
  RiShieldCheckFill,
  RiServiceLine,
} from '@remixicon/react';

import image1 from './assets/images/escrow1.png';
import image2 from './assets/images/escrow2.jpg';
import image3 from './assets/images/escrow3.png';

import image5 from './assets/images/security1.jpg';
import image6 from './assets/images/security2.jpg';

export const deal = [
  {
    id: 1,
    title: 'Fund the Deal',
    body: 'Buyer deposits payment into PayBridge.',
  },
  {
    id: 2,
    title: 'Accept Terms',
    body: 'Seller reviews and accepts the transaction.',
  },
  {
    id: 3,
    title: 'Deliver',
    body: 'Seller completes the agreed work or delivery.',
  },
  {
    id: 4,
    title: 'Get Paid',
    body: 'Buyer approves, and funds are released instantly.',
  },
];

export const images = [
  {
    id: 1,
    img: image1,
  },
  {
    id: 2,
    img: image2,
  },
  {
    id: 3,
    img: image3,
  },

  {
    id: 5,
    img: image5,
  },
  {
    id: 6,
    img: image6,
  },
];

export const value = [
  {
    logo: <RiGitRepositoryPrivateLine size="100%" />,
    title: 'Secure Escrow',
    body: 'Funds are held securely until both parties meet the agreed transaction terms.',
  },
  {
    logo: <RiWirelessChargingLine size="100%" />,
    title: 'Instant Release',
    body: 'Payments are released immediately once buyer approval is received.',
  },
  {
    logo: <RiNotification2Line size="100%" />,
    title: 'Real-Time Alerts',
    body: 'Get notified of every important transaction update as it happens.',
  },
  {
    logo: <RiScales3Fill size="100%" />,
    title: 'Dispute Resolution',
    body: 'A fair process designed to resolve conflicts and protect both parties.',
  },
  {
    logo: <RiBookOpenLine size="100%" />,
    title: ' Transaction Tracking',
    body: 'Monitor every step of your transaction from start to completion.',
  },
  {
    logo: <RiShieldCheckFill size="100%" />,
    title: 'Payment Assurance',
    body: "Sellers can confidently proceed knowing that the buyer's payment has already been secured.",
  },
  {
    logo: <RiServiceLine size="100%" />,
    title: 'Buyer & Seller Protection',
    body: 'Built-in safeguards help reduce fraud and increase trust for all users.',
  },
];

export const Card = [
  {
    title: 'Available Balance',
    amount: `${'\u20A6'} 0.00`,
    logo: <RiShieldCheckLine className="w-4 h-4" />,
    desc: 'Bank-Grade Security',
    color: 'text-emerald-600 bg-emerald-50 border-emerald-100',
  },
  {
    title: 'Escrow Balance (Pending)',
    amount: `${'\u20A6'} 0.00`,
    logo: null,
    desc: 'Fund moves to available once buyers confirm delivery',
    color: 'text-amber-600 bg-amber-50 border-amber-100',
  },
  {
    title: 'Success Resolution',
    amount: `100%`,
    logo: <RiShieldCheckLine className="w-4 h-4" />,
    desc: '0 Pending Disputes',
    color: 'text-blue-950 bg-indigo-50 border-indigo-100',
  },
];

export const recentReceipts = [
  {
    id: 'TXN-89301',
    title: 'iPhone 13 Pro Max',
    company: 'Newbeam Venture',
    amount: '600,000.00',
    status: 'Pending',
    date: 'June 20, 2026',
  },
  {
    id: 'TXN-89299',
    title: 'MacBook Pro M2',
    company: 'Tolu Tech Supplies',
    amount: '1,200,000.00',
    status: 'Completed',
    date: 'June 18, 2026',
  },
  {
    id: 'TXN-89284',
    title: 'Sony WH-1000XM5',
    company: 'AudioHub Store',
    amount: '280,000.00',
    status: 'Completed',
    date: 'June 17, 2026',
  },
  {
    id: 'TXN-89270',
    title: 'PlayStation 5 Console',
    company: 'Gadget Palace Ltd',
    amount: '550,000.00',
    status: 'Disputed',
    date: 'June 15, 2026',
  },
];

export const Paths = [
  {
    to: '/seller',
    icons: <RiHome4Line />,
    label: 'DASHBOARD',
  },
  {
    to: '/seller/escrows',
    icons: <RiShieldCheckLine />,
    label: 'ESCROWS',
  },
  {
    to: '/seller/transactions',
    icons: <RiArrowLeftRightFill />,
    label: 'TRANSACTIONS',
  },
  {
    to: '/seller/wallet',
    icons: <RiWalletFill />,
    label: 'WALLET',
  },
  {
    to: '/seller/profile',
    icons: <RiUserLine />,
    label: 'PROFILE',
  },
];
