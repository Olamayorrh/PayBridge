import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  RiUserLine,
  RiMapPinLine,
  RiCheckboxCircleLine,
  RiAwardLine,
  RiStarFill,
  RiShieldCheckFill,
  RiMailLine,
  RiPhoneLine,
} from '@remixicon/react';
import { usercontext } from '../Context';

const Profile = () => {
  const [formData] = useState({
    fullName: 'Tolu Alabi',
    email: 'tolu@newbeamventure.com',
    phone: '+234 812 345 6789',
    businessName: 'Newbeam Venture',
    bankName: 'Access Bank',
    accountNumber: '0123456789',
  });

  const { is2FAEnabled, setIs2FAEnabled, getInitials } = useContext(usercontext);

  return (
    <div className="w-full max-w-6xl flex flex-col gap-6">
      <div className="flex justify-between items-center mb-2">
        <h1 className="text-xl sm:text-3xl font-extrabold text-slate-800 tracking-tight">
          My Profile
        </h1>
        <Link
          to="/seller/profile/edit"
          className="px-4 py-2 bg-white border border-slate-200 text-slate-700 text-sm font-bold rounded-xl shadow-sm hover:bg-slate-50 flex items-center gap-2 transition-all"
        >
          <RiUserLine size={16} />
          Edit Profile
        </Link>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* LEFT COLUMN */}
        <div className="w-full lg:w-1/3 flex flex-col gap-6">
          {/* User ID Card */}
          <div className="bg-white rounded-[2rem] shadow-sm border border-slate-100 overflow-hidden flex flex-col relative">
            {/* Subtle amber overlay to match branding */}
            <div className="absolute right-0 top-0 w-24 h-24 bg-amber-400/20 rounded-full blur-xl transform translate-x-8 -translate-y-8 z-10"></div>

            <div className=" h-16 md:h-32 bg-[#151827] relative">
              <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 z-20">
                <div className="h-12 w-12 md:w-20 md:h-20 bg-amber-400 rounded-full border-4 border-white flex items-center justify-center text-[#151827] font-bold text-[1.0rem] md:text-2xl shadow-sm">
                  {getInitials(formData.fullName)}
                </div>
              </div>
            </div>
            <div className="pt-14 pb-6 px-6 flex flex-col items-center text-center">
              <div className="flex flex-col items-center mb-2">
                <h2 className="text-base sm:text-xl font-bold text-slate-800">
                  {formData.fullName}
                </h2>
                <p className="text-sm font-medium text-amber-500">{formData.businessName}</p>
              </div>

              <p className="text-slate-500 text-xs font-medium">Premium Member since 2024</p>
              <div className="flex items-center gap-2 text-xs font-bold mt-3">
                <span className="flex items-center text-slate-500 gap-1">
                  <RiMapPinLine size={14} /> Lagos, Nigeria
                </span>
                <span className="text-slate-300">•</span>
                <span className="text-emerald-600 uppercase tracking-wide flex items-center gap-1">
                  <RiShieldCheckFill size={14} /> ID Verified
                </span>
              </div>

              <div className="w-full flex justify-between px-4 mt-6 border-t border-slate-100 pt-6">
                <div className="flex flex-col items-center">
                  <span className="text-xl font-bold text-slate-800">42</span>
                  <span className="text-[0.65rem] font-bold text-slate-400 uppercase tracking-widest mt-1">
                    Deals
                  </span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="text-xl font-bold text-slate-800">10k+</span>
                  <span className="text-[0.65rem] font-bold text-slate-400 uppercase tracking-widest mt-1">
                    Followers
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Info Card */}
          <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-6 flex flex-col gap-4">
            <h3 className="font-bold text-slate-800 text-sm mb-2">Contact Info</h3>

            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400">
                <RiMailLine size={18} />
              </div>
              <div className="flex flex-col overflow-hidden">
                <span className="text-[0.65rem] font-bold text-slate-400 uppercase tracking-widest">
                  Email
                </span>
                <span className="text-sm font-bold text-slate-700 truncate">{formData.email}</span>
              </div>
            </div>

            <div className="flex items-center gap-4 mt-2">
              <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400">
                <RiPhoneLine size={18} />
              </div>
              <div className="flex flex-col">
                <span className="text-[0.65rem] font-bold text-slate-400 uppercase tracking-widest">
                  Phone
                </span>
                <span className="text-sm font-bold text-slate-700">{formData.phone}</span>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div className="w-full lg:w-2/3 flex flex-col gap-6">
          {/* Top Stats */}
          <div className="grid grid-cols-3 gap-3 sm:gap-6">
            <div className="bg-white rounded-2xl sm:rounded-3xl shadow-sm border border-slate-100 p-3 sm:p-6 flex flex-col items-center justify-center text-center transition-transform hover:-translate-y-1 duration-300">
              <div className="w-8 h-8 sm:w-12 sm:h-12 rounded-full bg-emerald-50 text-emerald-500 flex items-center justify-center mb-2 sm:mb-3">
                <RiCheckboxCircleLine size={18} className="sm:hidden" />
                <RiCheckboxCircleLine size={24} className="hidden sm:block" />
              </div>
              <span className="text-[0.55rem] sm:text-[0.65rem] font-bold text-slate-400 uppercase tracking-widest mb-1">
                Deals
              </span>
              <span className="text-lg sm:text-3xl font-extrabold text-[#151827]">42</span>
            </div>

            <div className="bg-white rounded-2xl sm:rounded-3xl shadow-sm border border-slate-100 p-3 sm:p-6 flex flex-col items-center justify-center text-center transition-transform hover:-translate-y-1 duration-300">
              <div className="w-8 h-8 sm:w-12 sm:h-12 rounded-full bg-amber-50 text-amber-500 flex items-center justify-center mb-2 sm:mb-3">
                <RiAwardLine size={18} className="sm:hidden" />
                <RiAwardLine size={24} className="hidden sm:block" />
              </div>
              <span className="text-[0.55rem] sm:text-[0.65rem] font-bold text-slate-400 uppercase tracking-widest mb-1">
                Trust
              </span>
              <span className="text-lg sm:text-3xl font-extrabold text-[#151827]">98/100</span>
            </div>

            <div className="bg-white rounded-2xl sm:rounded-3xl shadow-sm border border-slate-100 p-3 sm:p-6 flex flex-col items-center justify-center text-center transition-transform hover:-translate-y-1 duration-300">
              <div className="w-8 h-8 sm:w-12 sm:h-12 rounded-full bg-indigo-50 text-indigo-500 flex items-center justify-center mb-2 sm:mb-3">
                <RiStarFill size={18} className="sm:hidden" />
                <RiStarFill size={24} className="hidden sm:block" />
              </div>
              <span className="text-[0.55rem] sm:text-[0.65rem] font-bold text-slate-400 uppercase tracking-widest mb-1">
                Rating
              </span>
              <span className="text-lg sm:text-3xl font-extrabold text-[#151827]">4.9</span>
            </div>
          </div>

          {/* Security & Trust Metrics */}
          <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-6 flex flex-col">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-8 gap-4">
              <div className="flex items-center gap-2">
                <RiShieldCheckFill className="text-[#151827]" size={24} />
                <h3 className="text-sm sm:text-lg font-extrabold text-slate-800">
                  Security & Trust Metrics
                </h3>
              </div>
              <span className="px-3 py-1 bg-emerald-50 text-emerald-600 text-[0.65rem] font-bold rounded-full uppercase tracking-widest text-center self-start sm:self-auto border border-emerald-100">
                Bank-Grade Secure
              </span>
            </div>

            <div className="flex flex-col gap-6 divide-y divide-slate-100">
              <div className="flex flex-col md:flex-row md:justify-between md:items-center pt-2">
                <div className="flex flex-col">
                  <h4 className="text-[#151827] font-bold mb-1">Trust Verification</h4>
                  <p className="text-slate-500 text-sm font-medium italic">
                    Complete your KYC for higher withdrawal limits.
                  </p>
                </div>
                <button className="mt-4 md:mt-0 px-5 py-2.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-800 text-sm font-bold rounded-xl shadow-sm transition-colors cursor-pointer">
                  Verify Now
                </button>
              </div>

              {/* 2FA */}
              <div className="flex flex-col md:flex-row md:justify-between md:items-center pt-6">
                <div className="flex flex-col">
                  <h4 className="text-slate-800 font-bold mb-1">Two-Factor Authentication</h4>
                  <p className="text-slate-500 text-sm font-medium italic">
                    Secure your account with an extra layer of protection.
                  </p>
                </div>
                <div className="mt-4 md:mt-0 flex items-center">
                  <div
                    className={`w-12 h-6 rounded-full cursor-pointer relative transition-colors ${is2FAEnabled ? 'bg-amber-400' : 'bg-slate-200'}`}
                    onClick={() => setIs2FAEnabled(!is2FAEnabled)}
                  >
                    <div
                      className={`w-5 h-5 bg-white rounded-full shadow-sm absolute top-0.5 transition-transform ${is2FAEnabled ? 'translate-x-6' : 'translate-x-0.5'}`}
                      style={{ marginLeft: is2FAEnabled ? '2px' : '0' }}
                    ></div>
                  </div>
                </div>
              </div>

              {/* Account History */}
              <div className="flex flex-col md:flex-row md:justify-between md:items-center pt-6">
                <div className="flex flex-col">
                  <h4 className="text-slate-800 font-bold mb-1">Account History</h4>
                  <p className="text-slate-500 text-sm font-medium italic">
                    Last login: Today at 11:42 AM from Lagos, Nigeria.
                  </p>
                </div>
                <button className="mt-4 md:mt-0 text-[#151827] text-sm font-extrabold hover:underline cursor-pointer flex justify-start">
                  View logs
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
