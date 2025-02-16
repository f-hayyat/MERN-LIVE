import React, { useRef } from "react";

const AmountInput = ({ amountRef }) => {
  return (
    <div className="mb-6">
      <label className="block text-gray-700 font-semibold mb-2">Amount</label>
      <input
        type="number"
        ref={amountRef}
        className="w-full p-4 border-2 border-purple-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
        placeholder="Enter amount"
        min="0"
        step="any"
      />
    </div>
  );
};

export default AmountInput;