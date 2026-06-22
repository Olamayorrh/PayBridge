import React, { useContext, useState } from 'react';
import {
  RiShieldCheckLine,
  RiTruckLine,
  RiCheckboxCircleLine,
  RiAlertLine,
  RiMessage3Line,
  RiQuestionAnswerLine,
  RiEyeLine,
} from '@remixicon/react';
import { usercontext } from '../Context';

const Escrows = () => {
  const [escrows, setEscrows] = useState([
    {
      id: 'ESC-29381',
      title: 'iPhone 13 Pro Max',
      company: 'Newbeam Venture',
      amount: '600,000.00',
      status: 'Paid (Awaiting Dispatch)',
      buyer: 'Adebayo Johnson',
      seller: 'Tolu Alabi',
      date: 'June 20, 2026',
      step: 1, // 1: Paid, 2: Shipped, 3: Delivered, 4: Released
    },
    {
      id: 'ESC-29370',
      title: 'Sony WH-1000XM5',
      company: 'AudioHub Store',
      amount: '280,000.00',
      status: 'Completed',
      buyer: 'Chidi Okafor',
      seller: 'Tolu Alabi',
      date: 'June 17, 2026',
      step: 4,
    },
    {
      id: 'ESC-29352',
      title: 'PlayStation 5 Console',
      company: 'Gadget Palace Ltd',
      amount: '550,000.00',
      status: 'Disputed',
      buyer: 'Fatima Musa',
      seller: 'Tolu Alabi',
      date: 'June 15, 2026',
      step: 3,
      isDisputed: true,
    },
  ]);

  const {
    toastMessage,
    expandedEscrowId,
    toggleExpand,
    showToast,
    handleShip,
    handleResolveDispute,
    handleMessage,
  } = useContext(usercontext);

  return (
    <div className="max-w-4xl">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-50 bg-[#151827] text-white px-4 py-3 rounded-xl shadow-lg border border-slate-700 flex items-center gap-2 animate-in fade-in slide-in-from-bottom-5 duration-200">
          <RiCheckboxCircleLine className="w-5 h-5 text-emerald-400" />
          <span className="text-xs font-semibold">{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <div className="mb-6">
        <h2 className="text-xl font-bold text-[#151827]">Escrow Management</h2>
        <p className="text-xs text-gray-400 mt-0.5">
          Monitor, dispatch, and track active escrow contracts and settlements
        </p>
      </div>

      {/* Escrows Table */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider border-b border-slate-100">
                <th className="p-4 font-semibold">ID & Item</th>
                <th className="p-4 font-semibold">Amount</th>
                <th className="p-4 font-semibold">Buyer</th>
                <th className="p-4 font-semibold">Date</th>
                <th className="p-4 font-semibold">Status</th>
                <th className="p-4 font-semibold text-center">Action</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {escrows.map((escrow) => (
                <React.Fragment key={escrow.id}>
                  {/* Table Row */}
                  <tr className="hover:bg-slate-50 border-b border-slate-50 transition-colors">
                    <td className="p-4">
                      <div className="font-bold text-slate-800">{escrow.title}</div>
                      <div className="text-[0.65rem] text-gray-400 font-semibold">{escrow.id}</div>
                    </td>
                    <td className="p-4 font-bold text-[#151827] whitespace-nowrap">
                      {`\u20A6`} {escrow.amount}
                    </td>
                    <td className="p-4 text-slate-600 font-medium">{escrow.buyer}</td>
                    <td className="p-4 text-slate-500 whitespace-nowrap">{escrow.date}</td>
                    <td className="p-4">
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded-full text-[0.65rem] font-semibold border whitespace-nowrap ${
                          escrow.isDisputed
                            ? 'bg-rose-50 text-rose-700 border-rose-100'
                            : escrow.step === 4
                              ? 'bg-emerald-50 text-emerald-700 border-emerald-100'
                              : 'bg-amber-50 text-amber-700 border-amber-100'
                        }`}
                      >
                        {escrow.status}
                      </span>
                    </td>
                    <td className="p-4 text-center">
                      <button
                        onClick={() => toggleExpand(escrow.id)}
                        className="inline-flex items-center justify-center p-2 rounded-lg text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 transition-colors"
                        title="View Details"
                      >
                        <RiEyeLine className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>

                  {/* Expanded Card Detail */}
                  {expandedEscrowId === escrow.id && (
                    <tr>
                      <td colSpan="6" className="p-0 border-b border-slate-100 bg-slate-50/30">
                        <div className="p-4 md:p-6">
                          <div
                            className={`bg-white border rounded-2xl p-5 shadow-sm transition-all duration-300 max-w-2xl mx-auto ${
                              escrow.isDisputed
                                ? 'border-rose-100 bg-rose-50/10'
                                : 'border-slate-200'
                            }`}
                          >
                            <div>
                              {/* Header Info inside Box */}
                              <div className="flex justify-between items-start gap-2">
                                <div>
                                  <h3 className="font-bold text-slate-800 text-base">
                                    {escrow.title}
                                  </h3>
                                  <p className="text-[0.65rem] text-gray-400 font-semibold mt-0.5">
                                    {escrow.company}
                                  </p>
                                </div>
                              </div>

                              {/* Price Details */}
                              <div className="my-4">
                                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                                  Escrow Value
                                </p>
                                <p className="text-2xl font-bold text-[#151827] mt-0.5">
                                  {`\u20A6`} {escrow.amount}
                                </p>
                              </div>

                              {/* Parties Details */}
                              <div className="flex items-center gap-4 py-3 border-t border-slate-100 text-xs font-semibold text-gray-500">
                                <div>
                                  <span className="text-[0.65rem] text-gray-400 block uppercase tracking-wider font-semibold">
                                    Buyer
                                  </span>
                                  <span className="text-slate-700 font-bold">{escrow.buyer}</span>
                                </div>
                                <div className="border-l border-slate-200 h-6"></div>
                                <div>
                                  <span className="text-[0.65rem] text-gray-400 block uppercase tracking-wider font-semibold">
                                    Merchant / Seller
                                  </span>
                                  <span className="text-slate-700 font-bold">{escrow.seller}</span>
                                </div>
                              </div>

                              {/* Visual Progress Stepper */}
                              <div className="border-t border-slate-100 pt-4 pb-2">
                                <p className="text-[0.65rem] text-gray-400 block uppercase tracking-wider font-bold mb-4">
                                  Milestone Tracker
                                </p>
                                <div className="relative flex justify-between items-center w-full px-2">
                                  {/* Background progress track */}
                                  <div className="absolute top-1/2 left-0 w-full h-[2px] bg-slate-100 -translate-y-1/2 z-0"></div>

                                  {/* Active highlight track */}
                                  <div
                                    className="absolute top-1/2 left-0 h-[2px] bg-amber-500 -translate-y-1/2 z-0 transition-all duration-500"
                                    style={{
                                      width: `${escrow.isDisputed ? '66%' : escrow.step === 1 ? '0%' : escrow.step === 2 ? '33%' : escrow.step === 3 ? '66%' : '100%'}`,
                                    }}
                                  ></div>

                                  {/* Step 1: Paid */}
                                  <div className="flex flex-col items-center z-10">
                                    <div
                                      className={`w-6 h-6 rounded-full flex items-center justify-center border text-[0.65rem] font-bold ${
                                        escrow.step >= 1
                                          ? 'bg-amber-500 text-white border-amber-500 shadow-sm'
                                          : 'bg-white text-gray-400 border-slate-200'
                                      }`}
                                    >
                                      <RiShieldCheckLine className="w-3.5 h-3.5" />
                                    </div>
                                    <span className="text-[0.6rem] text-gray-400 font-bold mt-1">
                                      Paid
                                    </span>
                                  </div>

                                  {/* Step 2: Shipped */}
                                  <div className="flex flex-col items-center z-10">
                                    <div
                                      className={`w-6 h-6 rounded-full flex items-center justify-center border text-[0.65rem] font-bold ${
                                        escrow.step >= 2
                                          ? 'bg-amber-500 text-white border-amber-500 shadow-sm'
                                          : 'bg-white text-gray-400 border-slate-200'
                                      }`}
                                    >
                                      <RiTruckLine className="w-3.5 h-3.5" />
                                    </div>
                                    <span className="text-[0.6rem] text-gray-400 font-bold mt-1">
                                      Shipped
                                    </span>
                                  </div>

                                  {/* Step 3: Delivered */}
                                  <div className="flex flex-col items-center z-10">
                                    <div
                                      className={`w-6 h-6 rounded-full flex items-center justify-center border text-[0.65rem] font-bold ${
                                        escrow.isDisputed
                                          ? 'bg-rose-500 text-white border-rose-500 shadow-sm'
                                          : escrow.step >= 3
                                            ? 'bg-amber-500 text-white border-amber-500 shadow-sm'
                                            : 'bg-white text-gray-400 border-slate-200'
                                      }`}
                                    >
                                      {escrow.isDisputed ? (
                                        <RiAlertLine className="w-3.5 h-3.5" />
                                      ) : (
                                        <RiCheckboxCircleLine className="w-3.5 h-3.5" />
                                      )}
                                    </div>
                                    <span
                                      className={`text-[0.6rem] font-bold mt-1 ${escrow.isDisputed ? 'text-rose-500' : 'text-gray-400'}`}
                                    >
                                      {escrow.isDisputed ? 'Disputed' : 'Delivered'}
                                    </span>
                                  </div>

                                  {/* Step 4: Released */}
                                  <div className="flex flex-col items-center z-10">
                                    <div
                                      className={`w-6 h-6 rounded-full flex items-center justify-center border text-[0.65rem] font-bold ${
                                        escrow.step >= 4
                                          ? 'bg-emerald-500 text-white border-emerald-500 shadow-sm'
                                          : 'bg-white text-gray-400 border-slate-200'
                                      }`}
                                    >
                                      {`\u20A6`}
                                    </div>
                                    <span className="text-[0.6rem] text-gray-400 font-bold mt-1">
                                      Released
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>

                            {/* Actions Footer */}
                            <div className="border-t border-slate-100 pt-4 mt-4 flex items-center justify-end gap-2">
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleMessage(escrow.buyer);
                                }}
                                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border bg-white hover:bg-slate-50 text-gray-600 border-gray-200 hover:border-gray-300 transition-colors cursor-pointer"
                              >
                                <RiMessage3Line className="w-3.5 h-3.5" />
                                <span>Message</span>
                              </button>

                              {escrow.step === 1 && (
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleShip(escrow.id);
                                  }}
                                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-[#151827] hover:bg-slate-800 text-white shadow-sm cursor-pointer transition-colors"
                                >
                                  <RiTruckLine className="w-3.5 h-3.5" />
                                  <span>Mark as Shipped</span>
                                </button>
                              )}

                              {escrow.isDisputed && (
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleResolveDispute(escrow.id);
                                  }}
                                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-rose-600 hover:bg-rose-700 text-white shadow-sm cursor-pointer transition-colors"
                                >
                                  <RiQuestionAnswerLine className="w-3.5 h-3.5" />
                                  <span>Resolve & Release Payout</span>
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Escrows;
