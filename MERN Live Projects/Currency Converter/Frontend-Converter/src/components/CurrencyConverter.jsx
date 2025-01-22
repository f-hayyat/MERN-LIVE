import React, { useState, useRef } from "react";
import currencies from "../utils/currencies";
import AmountInput from "./AmountInput";
import CurrencyDropdown from "./CurrencyDropdown";

const CurrencyConverter = () => {
  const amountRef = useRef(null);
  const [sourceCurrency, setSourceCurrency] = useState("USD");
  const [targetCurrency, setTargetCurrency] = useState("PKR");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const handleConvert = async () => {
    const amount = amountRef.current?.value;

    if (!amount || isNaN(amount) || amount <= 0) {
      setError("Please enter a valid amount.");
      return;
    }

    setError("");
    try {
      const response = await fetch("http://localhost:3000/api/convert", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: parseFloat(amount),
          sourceCurrency,
          targetCurrency,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to fetch conversion data.");
      }

      const data = await response.json();
      if (!data || typeof data.convertedAmount !== "number") {
        throw new Error("Invalid response format from server");
      }
      setResult(data.convertedAmount);
    } catch (err) {
      setError(err.message || "An unexpected error occurred");
      setResult(null);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-6">
      <div className="bg-white/90 backdrop-blur-0-md shadow-2xl rounded-2xl p-8 max-w-md w-full transform hover:scale-[1.01] transition-all duration-300">
        <h1 className="text-3xl font-extrabold text-center bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6">
          Currency Converter
        </h1>
        <AmountInput amountRef={amountRef} />
        <div className="flex gap-6 mb-6">
          <CurrencyDropdown
            label="From"
            selectedCurrency={sourceCurrency}
            onCurrencyChange={setSourceCurrency}
            currencies={currencies}
          />
          <CurrencyDropdown
            label="To"
            selectedCurrency={targetCurrency}
            onCurrencyChange={setTargetCurrency}
            currencies={currencies}
          />
        </div>
        <button
          onClick={handleConvert}
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 rounded-xl font-bold text-lg hover:from-blue-700 hover:to-purple-700 transform hover:scale-[1.02] transition-all duration-300 shadow-lg hover:shadow-xl"
        >
          Convert
        </button>
        {error && (
          <p className="text-red-500 mt-4 text-center font-medium bg-red-50 p-3 rounded-lg">
            {error}
          </p>
        )}
        {result && (
          <div className="mt-6 text-center bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-xl">
            <p className="text-xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
              Converted Amount: {result.toFixed(2)} {currencies[targetCurrency]?.name}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CurrencyConverter;