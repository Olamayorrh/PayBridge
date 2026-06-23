import React, { useContext, useState } from 'react';

import { usercontext } from '../Context';
import { RiUserLine, RiLoader2Line, RiCheckLine, RiArrowLeftLine } from '@remixicon/react';

const EditProfile = () => {
  const { handleSubmit, handleChange, navigate, formData, isSaving, saveSuccess } =
    useContext(usercontext);

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col gap-6">
      <div className="flex items-center gap-3">
        <button
          onClick={() => navigate('/Buyer/profile')}
          className="w-9 h-9 flex items-center justify-center rounded-xl bg-white border border-slate-200 text-slate-500 hover:bg-slate-50 hover:text-slate-800 transition-all shadow-sm cursor-pointer"
        >
          <RiArrowLeftLine size={18} />
        </button>
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-800 tracking-tight">
            Edit Profile
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Manage your personal details and escrow settlement accounts
          </p>
        </div>
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="bg-[#151827] px-6 sm:px-8 py-5">
          <h2 className="text-base font-bold text-white">Account Details</h2>
          <p className="text-xs text-slate-400 mt-0.5">Update your information and save changes</p>
        </div>

        <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6">
          <div>
            <h3 className="text-xs font-bold text-amber-500 uppercase tracking-wider mb-4">
              Basic Information
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col">
                <label
                  htmlFor="fullName"
                  className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1"
                >
                  Full Name
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  className="border border-slate-200 rounded-xl p-3 text-sm focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 focus:outline-none bg-slate-50/50 transition-all"
                  required
                />
              </div>

              <div className="flex flex-col">
                <label
                  htmlFor="businessName"
                  className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1"
                >
                  Business Name
                </label>
                <input
                  type="text"
                  id="businessName"
                  name="businessName"
                  value={formData.businessName}
                  onChange={handleChange}
                  className="border border-slate-200 rounded-xl p-3 text-sm focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 focus:outline-none bg-slate-50/50 transition-all"
                  required
                />
              </div>

              <div className="flex flex-col">
                <label
                  htmlFor="email"
                  className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="border border-slate-200 rounded-xl p-3 text-sm focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 focus:outline-none bg-slate-50/50 transition-all"
                  required
                />
              </div>

              <div className="flex flex-col">
                <label
                  htmlFor="phone"
                  className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1"
                >
                  Phone Number
                </label>
                <input
                  type="text"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="border border-slate-200 rounded-xl p-3 text-sm focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 focus:outline-none bg-slate-50/50 transition-all"
                  required
                />
              </div>
            </div>
          </div>

          <div className="border-t border-gray-100 pt-6">
            <h3 className="text-xs font-bold text-amber-500 uppercase tracking-wider mb-4">
              Payout Account Details
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col">
                <label
                  htmlFor="bankName"
                  className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1"
                >
                  Settlement Bank
                </label>
                <select
                  id="bankName"
                  name="bankName"
                  value={formData.bankName}
                  onChange={handleChange}
                  className="border border-slate-200 rounded-xl p-3 text-sm focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 focus:outline-none bg-slate-50/50 cursor-pointer transition-all"
                  required
                >
                  <option value="Access Bank">Access Bank</option>
                  <option value="Guaranty Trust Bank (GTB)">Guaranty Trust Bank (GTB)</option>
                  <option value="Zenith Bank">Zenith Bank</option>
                  <option value="United Bank for Africa (UBA)">United Bank for Africa (UBA)</option>
                  <option value="Wema Bank">Wema Bank</option>
                </select>
              </div>

              <div className="flex flex-col">
                <label
                  htmlFor="accountNumber"
                  className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1"
                >
                  Account Number
                </label>
                <input
                  type="text"
                  id="accountNumber"
                  name="accountNumber"
                  value={formData.accountNumber}
                  onChange={handleChange}
                  maxLength={10}
                  className="border border-slate-200 rounded-xl p-3 text-sm focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 focus:outline-none bg-slate-50/50 transition-all"
                  required
                />
              </div>
            </div>
          </div>

          <div className="border-t border-gray-100 pt-6 flex flex-col sm:flex-row justify-end gap-3">
            <button
              type="button"
              onClick={() => navigate('/Buyer/profile')}
              className="w-full sm:w-auto px-6 py-3 rounded-xl text-sm font-bold transition-all duration-200 border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSaving}
              className={`w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-bold transition-all duration-200 shadow-sm cursor-pointer ${
                saveSuccess
                  ? 'bg-emerald-600 text-white shadow-emerald-600/20'
                  : 'bg-[#151827] hover:bg-slate-800 text-white shadow-slate-900/20'
              }`}
            >
              {isSaving ? (
                <>
                  <RiLoader2Line className="w-4 h-4 animate-spin" />
                  <span>Saving...</span>
                </>
              ) : saveSuccess ? (
                <>
                  <RiCheckLine className="w-4 h-4" />
                  <span>Changes Saved!</span>
                </>
              ) : (
                <>
                  <RiUserLine className="w-4 h-4" />
                  <span>Save Profile Settings</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
