import React from "react";

const CurrencyDropdown = ({ label, selectedCurrency, onCurrencyChange, currencies }) => {
  return (
    <div className="w-1/2">
      <label className="block text-gray-700 font-semibold mb-2">{label}</label>
      <select
        value={selectedCurrency}
        onChange={(e) => onCurrencyChange(e.target.value)}
        className="w-full p-4 border-2 border-purple-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
      >
        {Object.entries(currencies).map(([code, { name, flag }]) => (
          <option key={code} value={code}>
            {flag} {name} ({code})
          </option>
        ))}
      </select>
    </div>
  );
};

export default CurrencyDropdown;
