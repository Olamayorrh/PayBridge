import { createContext, useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export const usercontext = createContext();

const Context = ({ children }) => {
  // header Page
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  const getPageTitle = () => {
    const path = location.pathname;
    if (path.includes('paymentReceipt')) return 'Create Payment Link';
    if (path.includes('escrows')) return 'My Escrows';
    if (path.includes('transactions')) return 'Transactions';
    if (path.includes('wallet')) return 'Wallet';
    if (path.includes('profile/edit')) return 'Edit Profile';
    if (path.includes('profile')) return '';
    if (path.includes('settings')) return 'Settings';
    return 'Dashboard';
  };

  //
  const [newstate, setNewState] = useState('');
  const [activeItem, setActiveItem] = useState('dashboard');

  useEffect(() => {
    setNewState(name);
  }, []);

  // dasboard table(copy)
  const [copiedId, setCopiedId] = useState(null);

  const handleCopy = (id) => {
    navigator.clipboard.writeText(`https://paybridge.com/pay/${id}`);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Edit profile (profile page)
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: 'Tolu Alabi',
    email: 'tolu@newbeamventure.com',
    phone: '+234 812 345 6789',
    businessName: 'Newbeam Venture',
    bankName: 'Access Bank',
    accountNumber: '0123456789',
  });

  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      setSaveSuccess(true);
      setTimeout(() => {
        setSaveSuccess(false);
        navigate('/Buyer/profile');
      }, 1500);
    }, 1200);
  };

  // Escrow Page

  const [toastMessage, setToastMessage] = useState(null);
  const [expandedEscrowId, setExpandedEscrowId] = useState(null);

  const toggleExpand = (id) => {
    setExpandedEscrowId((prev) => (prev === id ? null : id));
  };

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleShip = (id) => {
    setEscrows((prev) =>
      prev.map((escrow) =>
        escrow.id === id ? { ...escrow, step: 2, status: 'Shipped (In Transit)' } : escrow
      )
    );
    showToast(`Marked transaction ${id} as Shipped!`);
  };

  const handleResolveDispute = (id) => {
    setEscrows((prev) =>
      prev.map((escrow) =>
        escrow.id === id ? { ...escrow, step: 4, status: 'Completed', isDisputed: false } : escrow
      )
    );
    showToast(`Dispute for ${id} has been resolved. Funds released!`);
  };

  const handleMessage = (buyerName) => {
    showToast(`Mock Chat started with ${buyerName}!`);
  };

  //  Profile Page

  const [is2FAEnabled, setIs2FAEnabled] = useState(false);

  const getInitials = (name) => {
    if (!name) return 'TA';
    const parts = name.trim().split(' ');
    if (parts.length >= 2) return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    return name.slice(0, 2).toUpperCase();
  };

  //  settings

  const [notifications, setNotifications] = useState({
    emailAlerts: true,
    disputeAlerts: true,
    weeklyReports: false,
  });

  const handleToggle = (key) => {
    setNotifications((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSaveSettings = (e) => {
    e.preventDefault();
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 2000);
    }, 1000);
  };

  return (
    <usercontext.Provider
      value={{
        sidebarOpen,
        setSidebarOpen,
        activeItem,
        setActiveItem,
        handleCopy,
        copiedId,
        handleSubmit,
        handleChange,
        navigate,
        formData,
        isSaving,
        saveSuccess,
        toastMessage,
        expandedEscrowId,
        toggleExpand,
        showToast,
        handleShip,
        handleResolveDispute,
        handleMessage,
        location,
        getPageTitle,
        is2FAEnabled,
        setIs2FAEnabled,
        getInitials,
        notifications,
        setNotifications,

        handleToggle,
        handleSaveSettings,
      }}
    >
      {children}
    </usercontext.Provider>
  );
};

export default Context;
