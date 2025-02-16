const exchangeRateService = require("../services/exchangeRateService");

exports.convertCurrency = (req, res, next) => {
  try {
    const { amount, sourceCurrency, targetCurrency } = req.body;
    if (!amount || !sourceCurrency || !targetCurrency) {
      return res
        .status(422)
        .json({ message: "Please provide all the required fields" });
    }
    const convertedAmount = exchangeRateService.convertCurrency(
      amount,
      sourceCurrency,
      targetCurrency
    );
    res.status(200).json({ convertedAmount });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};
