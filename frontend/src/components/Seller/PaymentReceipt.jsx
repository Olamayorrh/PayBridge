import React from 'react';
import { useNavigate } from 'react-router-dom';

const PaymentReceipt = () => {
  const navigate = useNavigate();

  return (
    <div
      className="fixed inset-0 z-50 flex justify-center items-start overflow-y-auto p-4 md:p-10 bg-slate-950/40 backdrop-blur-md"
      onClick={() => navigate('/seller')}
    >
      <div
        className="w-full max-w-lg shadow-2xl rounded-2xl pb-[3.0rem] bg-white my-auto animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative flex flex-col justify-center items-center text-[1rem] bg-[#151827] text-white py-4 rounded-t-2xl">
          <h1 className="font-semibold text-lg">Create Payment Link</h1>
          <h3 className="text-[0.7rem] text-gray-400 mt-1">
            Generate A Secure Escrow link For Your Item
          </h3>
          <button
            onClick={() => navigate('/seller')}
            type="button"
            className="absolute right-4 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center rounded-full bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white transition-colors cursor-pointer"
          >
            ✕
          </button>
        </div>
        <form className="mt-[5%] px-[1.5rem] text-[0.9rem] cursor-pointer">
          <div className="flex flex-col mb-2">
            <label htmlFor="name" className="font-medium text-gray-700 mb-1">
              Business / Company Name
            </label>
            <input
              type="text"
              placeholder="Newbeam Venture"
              className="border placeholder:text-[0.7rem] rounded p-2 focus:ring-1 focus:ring-slate-500 focus:outline-none"
            />
          </div>

          <div className="flex flex-col mb-2">
            <label htmlFor="title" className="font-medium text-gray-700 mb-1">
              Item / Title
            </label>
            <input
              type="text"
              placeholder="Iphone 13 Pro Max"
              className="border placeholder:text-[0.7rem] rounded p-2 focus:ring-1 focus:ring-slate-500 focus:outline-none"
            />
          </div>

          <div className="flex flex-col mb-2">
            <label htmlFor="title" className="font-medium text-gray-700 mb-1">
              Amount (NGN)
            </label>
            <input
              type="text"
              placeholder="600 000"
              className="border placeholder:text-[0.7rem] rounded p-2 focus:ring-1 focus:ring-slate-500 focus:outline-none"
            />
          </div>
          <div className="flex flex-col mb-4">
            <label htmlFor="description" className="font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              id="description"
              rows={4}
              name="description"
              placeholder="UK used, 128GB, Pink Color..."
              className="border placeholder:text-[0.7rem] rounded p-2 focus:ring-1 focus:ring-slate-500 focus:outline-none"
            />
          </div>
          <div className="py-2 border-t flex justify-end gap-2 px-[1.5rem] mt-4">
            <button
              type="button"
              onClick={() => navigate('/seller')}
              className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium px-4 py-2 rounded-lg cursor-pointer transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-[#151827] hover:bg-slate-800 text-white font-medium px-4 py-2 rounded-lg cursor-pointer transition-colors"
            >
              Create Link
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PaymentReceipt;
