import React, { Fragment, useContext, useState } from 'react';
import { usercontext } from '../Context.jsx';
import Header from './Header';
import { Link } from 'react-router-dom';
import TopNav from './TopNav';
import { Card, recentReceipts } from '../../data.jsx';
import {
  RiShieldCheckLine,
  RiFileCopyLine,
  RiCheckLine,
  RiWalletFill,
  RiAddLine,
  RiLogoutBoxRLine,
} from '@remixicon/react';

const Dashboard = () => {
  const { handleCopy, copiedId } = useContext(usercontext);

  return (
    <Fragment>
      <div className="w-full flex flex-col mt-4 mb-8 gap-6">
        <div className="w-[100%]">
          <TopNav />
        </div>

        <div className="flex flex-col lg:flex-row gap-2 justify-between w-full bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <div className="flex flex-col justify-center">
            <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
              Welcome back, John!
            </h2>
            <p className="text-gray-500 mt-1">
              Manage your escrow links, transactions, and wallet deals.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center mt-6 lg:mt-0 w-full sm:w-auto">
            <div className="border border-slate-200 bg-white shadow-sm hover:bg-slate-50 text-gray-700 h-12 flex justify-center items-center rounded-xl px-5 cursor-pointer transition-all w-full sm:w-auto">
              <RiWalletFill className="mr-2 text-orange-300" size={20} />
              <span className="font-medium">Withdraw</span>
            </div>
            <Link
              to="/Buyer/paymentReceipt"
              className="bg-[#151827] text-white shadow-md hover:bg-slate-800 hover:shadow-lg flex justify-center items-center rounded-xl p-2 transition-all w-full sm:w-auto"
            >
              <RiAddLine className="mr-1" size={20} />
              <span className="font-medium text-[0.8rem]">Create Payment Link</span>
            </Link>
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row w-full justify-between gap-4">
        {Card.map((val, index) => (
          <div
            className="flex-1 bg-white border border-slate-100 shadow-sm rounded-2xl p-5 md:p-6 transition-all duration-300 hover:shadow-md hover:scale-[1.01] hover:border-slate-200"
            key={index}
          >
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
              {val.title}
            </p>
            <p className="text-2xl md:text-3xl font-bold text-slate-800 mt-2">{val.amount}</p>
            {val.desc && (
              <div className="flex gap-2 items-center mt-4 text-[0.75rem] font-medium text-gray-500">
                {val.logo ? (
                  <span
                    className={`p-1 rounded-full border ${val.color} flex items-center justify-center`}
                  >
                    {val.logo}
                  </span>
                ) : (
                  <span className="p-1 rounded-full border text-amber-600 bg-amber-50 border-amber-100 flex items-center justify-center">
                    <RiShieldCheckLine className="w-4 h-4" />
                  </span>
                )}
                <span className="leading-snug">{val.desc}</span>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Recent Receipts Table */}
      <div className="bg-white border border-slate-100 shadow-sm rounded-2xl p-5 md:p-6 mt-8">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h2 className="text-lg font-bold text-[#151827]">Recent Receipts Issued</h2>
            <p className="text-xs text-gray-400">Track and copy generated escrow payment links</p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-100 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                <th className="py-3 px-4">Item / Title</th>
                <th className="py-3 px-4">Company</th>
                <th className="py-3 px-4">Amount</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-4 text-right">Escrow Link</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 text-sm">
              {recentReceipts.map((receipt) => (
                <tr key={receipt.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="py-3 px-4 font-semibold text-slate-800">
                    <div>
                      <p>{receipt.title}</p>
                      <p className="text-[0.65rem] text-gray-400 font-normal mt-0.5">
                        {receipt.id}
                      </p>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-gray-500 font-medium">{receipt.company}</td>
                  <td className="py-3 px-4 font-bold text-slate-800">
                    {`\u20A6`} {receipt.amount}
                  </td>
                  <td className="py-3 px-4">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${
                        receipt.status === 'Completed'
                          ? 'bg-emerald-50 text-emerald-700 border-emerald-100'
                          : receipt.status === 'Pending'
                            ? 'bg-amber-50 text-amber-700 border-amber-100'
                            : 'bg-rose-50 text-rose-700 border-rose-100'
                      }`}
                    >
                      {receipt.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-gray-400 font-medium">{receipt.date}</td>
                  <td className="py-3 px-4 text-right">
                    <button
                      onClick={() => handleCopy(receipt.id)}
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${
                        copiedId === receipt.id
                          ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                          : 'bg-white hover:bg-slate-50 text-gray-600 border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      {copiedId === receipt.id ? (
                        <>
                          <RiCheckLine className="w-3.5 h-3.5" />
                          <span>Copied!</span>
                        </>
                      ) : (
                        <>
                          <RiFileCopyLine className="w-3.5 h-3.5" />
                          <span>Copy Link</span>
                        </>
                      )}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Fragment>
  );
};

export default Dashboard;
