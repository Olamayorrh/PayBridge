import React, { useContext, useState } from 'react';
import {
  RiNotificationLine,
  RiLockPasswordLine,
  RiPaletteLine,
  RiCheckLine,
  RiLoader2Line,
} from '@remixicon/react';
import { usercontext } from '../Context';

const Settings = () => {
  const [theme, setTheme] = useState('light');
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const { notifications, setNotifications, handleToggle, handleSaveSettings } =
    useContext(usercontext);

  return (
    <div className="max-w-2xl">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-xl font-bold text-[#151827]">System Settings</h2>
        <p className="text-xs text-gray-400 mt-0.5">
          Manage notifications, security defaults, and system appearance
        </p>
      </div>

      <form onSubmit={handleSaveSettings} className="space-y-6">
        {/* Card 1: Notifications */}
        <div className="bg-white border border-slate-100 shadow-sm rounded-2xl p-6">
          <div className="flex items-center gap-2 mb-4">
            <RiNotificationLine className="w-5 h-5 text-amber-500" />
            <h3 className="font-bold text-slate-800 text-sm">Notification Settings</h3>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm font-semibold text-slate-700">Email Alerts</p>
                <p className="text-xs text-gray-400">
                  Receive email notification for new escrow links and transactions
                </p>
              </div>
              <button
                type="button"
                onClick={() => handleToggle('emailAlerts')}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors cursor-pointer ${
                  notifications.emailAlerts ? 'bg-[#151827]' : 'bg-gray-200'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    notifications.emailAlerts ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            <div className="flex justify-between items-center border-t border-slate-50 pt-4">
              <div>
                <p className="text-sm font-semibold text-slate-700">Dispute Alerts</p>
                <p className="text-xs text-gray-400">
                  Get notified immediately when a buyer opens a dispute
                </p>
              </div>
              <button
                type="button"
                onClick={() => handleToggle('disputeAlerts')}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors cursor-pointer ${
                  notifications.disputeAlerts ? 'bg-[#151827]' : 'bg-gray-200'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    notifications.disputeAlerts ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            <div className="flex justify-between items-center border-t border-slate-50 pt-4">
              <div>
                <p className="text-sm font-semibold text-slate-700">Weekly Reports</p>
                <p className="text-xs text-gray-400">
                  Receive automated weekly payout and resolution logs
                </p>
              </div>
              <button
                type="button"
                onClick={() => handleToggle('weeklyReports')}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors cursor-pointer ${
                  notifications.weeklyReports ? 'bg-[#151827]' : 'bg-gray-200'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    notifications.weeklyReports ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Card 2: Security settings */}
        <div className="bg-white border border-slate-100 shadow-sm rounded-2xl p-6">
          <div className="flex items-center gap-2 mb-4">
            <RiLockPasswordLine className="w-5 h-5 text-amber-500" />
            <h3 className="font-bold text-slate-800 text-sm">Security & Password</h3>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col">
                <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">
                  Current Password
                </label>
                <input
                  type="password"
                  placeholder="••••••••"
                  className="border border-slate-200 rounded-lg p-2.5 text-sm focus:ring-1 focus:ring-slate-500 focus:outline-none bg-slate-50/30"
                />
              </div>
              <div className="flex flex-col">
                <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">
                  New Password
                </label>
                <input
                  type="password"
                  placeholder="••••••••"
                  className="border border-slate-200 rounded-lg p-2.5 text-sm focus:ring-1 focus:ring-slate-500 focus:outline-none bg-slate-50/30"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Card 3: Theme Preferences */}
        <div className="bg-white border border-slate-100 shadow-sm rounded-2xl p-6">
          <div className="flex items-center gap-2 mb-4">
            <RiPaletteLine className="w-5 h-5 text-amber-500" />
            <h3 className="font-bold text-slate-800 text-sm">Theme Settings</h3>
          </div>

          <div className="grid grid-cols-3 gap-3">
            {['light', 'dark', 'system'].map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setTheme(item)}
                className={`py-3 rounded-xl border text-sm font-semibold capitalize transition-all cursor-pointer ${
                  theme === item
                    ? 'border-[#151827] bg-[#151827] text-white'
                    : 'border-slate-200 text-slate-600 bg-white hover:bg-slate-50'
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        {/* Action Button */}
        <div className="flex justify-end pt-2">
          <button
            type="submit"
            disabled={isSaving}
            className={`inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 shadow-sm cursor-pointer ${
              saveSuccess
                ? 'bg-emerald-600 text-white shadow-emerald-600/10'
                : 'bg-[#151827] hover:bg-slate-800 text-white shadow-slate-900/10'
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
                <span>Settings Saved!</span>
              </>
            ) : (
              <span>Save System Settings</span>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Settings;
