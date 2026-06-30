import { useMemo, useState } from 'react';
import {
  RiBankCardLine,
  RiCustomerService2Line,
  RiDeleteBinLine,
  RiLogoutBoxRLine,
  RiShieldCheckLine,
  RiUserLine,
} from '@remixicon/react';
import { getBuyerSettings } from '../../data/buyer-mock-data';
import { StatusBadge, ToggleRow } from '../../components/buyer/shared';

const tabs = [
  { id: 'profile', label: 'Profile' },
  { id: 'verification', label: 'Verification' },
  { id: 'security', label: 'Security' },
  { id: 'payments', label: 'Payment Methods' },
  { id: 'notifications', label: 'Notifications' },
  { id: 'privacy', label: 'Privacy & Support' },
  { id: 'preferences', label: 'Preferences' },
];

function SettingsPanel({ title, description, children, actions }) {
  return (
    <section className="overflow-hidden rounded-lg border border-black/10 bg-white">
      <div className="grid gap-6 border-b border-black/5 px-5 py-6 lg:grid-cols-[280px_1fr] lg:px-7">
        <div>
          <h2 className="text-base font-black text-coarse-wool">{title}</h2>
          <p className="mt-2 text-sm font-medium leading-6 text-coarse-wool/50">{description}</p>
        </div>
        <div>{children}</div>
      </div>
      {actions && <div className="flex justify-end gap-3 px-5 py-5 lg:px-7">{actions}</div>}
    </section>
  );
}

function Field({ label, children }) {
  return (
    <label>
      <span className="text-sm font-black text-coarse-wool">{label}</span>
      {children}
    </label>
  );
}

function TextInput({ value, placeholder, readOnly = false, type = 'text' }) {
  return (
    <input
      defaultValue={value}
      placeholder={placeholder}
      readOnly={readOnly}
      type={type}
      className={`mt-2 h-11 w-full rounded-lg border border-black/10 px-4 text-sm font-semibold text-coarse-wool outline-none transition-colors placeholder:text-coarse-wool/35 focus:border-[#151827] ${
        readOnly ? 'bg-[#F4F6FB] text-coarse-wool/55' : 'bg-white'
      }`}
    />
  );
}

function SelectInput({ value, options }) {
  return (
    <select
      defaultValue={value}
      className="mt-2 h-11 w-full rounded-lg border border-black/10 bg-white px-4 text-sm font-semibold text-coarse-wool outline-none transition-colors focus:border-[#151827]"
    >
      {options.map((option) => (
        <option key={option}>{option}</option>
      ))}
    </select>
  );
}

function FormActions() {
  return (
    <>
      <button
        type="button"
        className="h-11 rounded-lg border border-black/10 bg-white px-5 text-sm font-black text-coarse-wool/55 transition-colors hover:text-coarse-wool"
      >
        Cancel
      </button>
      <button
        type="button"
        className="h-11 rounded-lg bg-[#151827] px-5 text-sm font-black text-white transition-colors hover:bg-[#252a3d]"
      >
        Save Changes
      </button>
    </>
  );
}

function getInitials(fullName) {
  const [first = '', last = ''] = fullName.split(' ');
  return `${first[0] || ''}${last[0] || ''}`.toUpperCase() || 'PB';
}

export function BuyerSettings() {
  const settings = getBuyerSettings();
  const [activeTab, setActiveTab] = useState('profile');

  const activeContent = useMemo(() => {
    if (activeTab === 'profile') {
      return (
        <div className="flex flex-col gap-0">
          <SettingsPanel
            title="Profile Photo"
            description="This will be displayed on your PayBridge buyer account and support messages."
          >
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-4">
                <div className="flex size-20 shrink-0 items-center justify-center rounded-full border border-black/10 bg-[#151827] text-2xl font-black text-white">
                  {getInitials(settings.profile.fullName)}
                </div>
                <p className="text-sm font-semibold text-coarse-wool/50">
                  PNG, JPG or SVG. Max 2MB.
                </p>
              </div>
              <button
                type="button"
                className="h-10 rounded-lg border border-black/10 bg-white px-4 text-sm font-black text-coarse-wool transition-colors hover:bg-[#1518270d]"
              >
                Upload New Photo
              </button>
            </div>
          </SettingsPanel>

          <SettingsPanel
            title="Profile Information"
            description="Manage your personal details and default delivery location."
            actions={<FormActions />}
          >
            <div className="grid gap-4 md:grid-cols-2">
              <Field label="Full Name">
                <TextInput value={settings.profile.fullName} />
              </Field>
              <Field label="Email Address">
                <TextInput value={settings.profile.email} />
              </Field>
              <Field label="Phone Number">
                <TextInput value={settings.profile.phone} />
              </Field>
              <Field label="Default Location">
                <TextInput value={settings.profile.defaultLocation} />
              </Field>
            </div>
          </SettingsPanel>
        </div>
      );
    }

    if (activeTab === 'verification') {
      return (
        <SettingsPanel
          title="Verification"
          description="Review your account verification status and complete pending checks."
        >
          <div className="grid gap-4 md:grid-cols-3">
            {settings.verification.map((item) => (
              <article key={item.title} className="rounded-lg border border-black/10 p-4">
                <div className="flex items-start justify-between gap-3">
                  <RiShieldCheckLine size={22} className="text-coarse-wool/55" />
                  <StatusBadge
                    status={item.status === 'Verified' ? 'FUNDS_RELEASED' : 'PAYMENT_PENDING'}
                    label={item.status}
                  />
                </div>
                <h3 className="mt-4 text-sm font-black text-coarse-wool">{item.title}</h3>
                <p className="mt-2 text-sm font-semibold leading-6 text-coarse-wool/50">
                  {item.description}
                </p>
                <button
                  type="button"
                  className="mt-4 h-10 rounded-lg bg-[#F4F6FB] px-4 text-sm font-black text-coarse-wool"
                >
                  {item.action}
                </button>
              </article>
            ))}
          </div>
        </SettingsPanel>
      );
    }

    if (activeTab === 'security') {
      return (
        <SettingsPanel
          title="Security"
          description="Manage password, two-factor authentication, sessions, and login alerts."
          actions={<FormActions />}
        >
          <div className="grid gap-4 md:grid-cols-2">
            <Field label="Current Password">
              <TextInput placeholder="Enter current password" type="password" />
            </Field>
            <Field label="New Password">
              <TextInput placeholder="Enter new password" type="password" />
            </Field>
          </div>
          <div className="mt-6 grid gap-4">
            <ToggleRow
              label="Two-Factor Authentication"
              description="Add an extra layer of protection."
              enabled={false}
            />
            <ToggleRow
              label="Login Alerts"
              description="Get notified when your account is accessed."
              enabled
            />
            <button
              type="button"
              className="h-11 rounded-lg bg-[#F4F6FB] px-4 text-left text-sm font-black text-coarse-wool"
            >
              View Active Sessions
            </button>
          </div>
        </SettingsPanel>
      );
    }

    if (activeTab === 'payments') {
      return (
        <SettingsPanel
          title="Payment Methods"
          description="Manage saved cards and default payment options for escrow payments."
        >
          <div className="rounded-lg border border-dashed border-black/15 p-5">
            <RiBankCardLine size={24} className="text-coarse-wool/55" />
            <p className="mt-3 font-black text-coarse-wool">No saved payment methods yet.</p>
            <p className="mt-2 text-sm font-semibold leading-6 text-coarse-wool/50">
              Saved cards will appear here after your first successful payment.
            </p>
            <button
              type="button"
              className="mt-5 h-11 rounded-lg bg-[#151827] px-5 text-sm font-black text-white"
            >
              Add Payment Method
            </button>
          </div>
        </SettingsPanel>
      );
    }

    if (activeTab === 'notifications') {
      return (
        <SettingsPanel
          title="Notifications"
          description="Choose how PayBridge should notify you about payments, delivery, disputes, and security."
          actions={<FormActions />}
        >
          <div className="overflow-x-auto">
            <table className="w-full min-w-[680px] border-collapse">
              <thead>
                <tr className="border-b border-black/5 text-left text-xs font-black uppercase text-coarse-wool/40">
                  <th className="px-3 py-3">Notification</th>
                  <th className="px-3 py-3">Email</th>
                  <th className="px-3 py-3">SMS</th>
                  <th className="px-3 py-3">Push</th>
                </tr>
              </thead>
              <tbody>
                {settings.notifications.map((notification) => (
                  <tr key={notification.label} className="border-b border-black/5 last:border-b-0">
                    <td className="px-3 py-4 text-sm font-black text-coarse-wool">
                      {notification.label}
                    </td>
                    <td className="px-3 py-4">
                      <ToggleRow label="Email" enabled={notification.email} />
                    </td>
                    <td className="px-3 py-4">
                      <ToggleRow label="SMS" enabled={notification.sms} />
                    </td>
                    <td className="px-3 py-4">
                      <ToggleRow label="Push" enabled={notification.push} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </SettingsPanel>
      );
    }

    if (activeTab === 'privacy') {
      return (
        <SettingsPanel
          title="Privacy & Support"
          description="Access your privacy controls and get help with protected payments."
        >
          <div className="grid gap-4 md:grid-cols-2">
            {['Help center', 'Contact support', 'View support tickets', 'Report fraud', 'Dispute guidelines'].map((item) => (
              <button
                key={item}
                type="button"
                className="flex h-12 items-center gap-3 rounded-lg bg-[#F4F6FB] px-4 text-left text-sm font-black text-coarse-wool"
              >
                <RiCustomerService2Line size={18} />
                {item}
              </button>
            ))}
            <button
              type="button"
              className="flex h-12 items-center gap-3 rounded-lg bg-[#F4F6FB] px-4 text-left text-sm font-black text-coarse-wool"
            >
              <RiUserLine size={18} />
              Download my data
            </button>
            <button
              type="button"
              className="flex h-12 items-center gap-3 rounded-lg bg-rose-50 px-4 text-left text-sm font-black text-rose-700"
            >
              <RiDeleteBinLine size={18} />
              Delete account
            </button>
          </div>
        </SettingsPanel>
      );
    }

    return (
      <SettingsPanel
        title="App Preferences"
        description="Set your preferred app display options for PayBridge."
        actions={<FormActions />}
      >
        <div className="grid gap-4 md:grid-cols-3">
          <Field label="Theme">
            <SelectInput value="System" options={['Light', 'Dark', 'System']} />
          </Field>
          <Field label="Currency">
            <SelectInput value="NGN" options={['NGN']} />
          </Field>
          <Field label="Language">
            <SelectInput value="English" options={['English']} />
          </Field>
        </div>
      </SettingsPanel>
    );
  }, [activeTab, settings]);

  return (
    <div className="mx-auto flex max-w-7xl flex-col gap-6">
      <header className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-coarse-wool">Settings</h1>
          <p className="mt-2 max-w-2xl text-sm font-medium leading-6 text-coarse-wool/55">
            Manage your PayBridge buyer account, security, notifications, and preferences.
          </p>
        </div>
        <button
          type="button"
          className="flex size-11 shrink-0 items-center justify-center rounded-lg border border-black/10 bg-white text-rose-700"
          aria-label="Log out"
        >
          <RiLogoutBoxRLine size={19} />
        </button>
      </header>

      <nav className="overflow-x-auto border-b border-black/10" aria-label="Buyer settings categories">
        <div className="flex min-w-max gap-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`relative h-12 text-sm font-black transition-colors ${
                activeTab === tab.id ? 'text-coarse-wool' : 'text-coarse-wool/45 hover:text-coarse-wool'
              }`}
            >
              {tab.label}
              {activeTab === tab.id && (
                <span className="absolute inset-x-0 bottom-0 h-0.5 rounded-full bg-[#151827]" />
              )}
            </button>
          ))}
        </div>
      </nav>

      {activeContent}
    </div>
  );
}
