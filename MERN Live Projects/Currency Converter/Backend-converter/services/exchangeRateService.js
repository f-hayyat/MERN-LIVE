const { default: axios } = require("axios");

class ExchangeRateService {
  constructor() {
    this.rates = null;
    this.lastUpdated = null;
    this.API_KEY = process.env.API_KEY;
    this.BASE_URL = process.env.BASE_URL;
  }

  async initializeRates() {
    try {
      const url = `${this.BASE_URL}/${this.API_KEY}/latest/PKR`;
      const response = await axios.get(url);
      this.rates = response.data.conversion_rates;
      this.lastUpdated = new Date();
    } catch (error) {
      throw error;
    }
  }

  convertCurrency(amount, sourceCurrency, targetCurrency) {
    if (!this.rates) {
      throw new Error("Exchange rates not initialized");
    }

    // Get rates relative to PKR
    const sourceRate = this.rates[sourceCurrency];
    const targetRate = this.rates[targetCurrency];

    // Convert to target currency
    return (amount / sourceRate) * targetRate;
  }
}

module.exports = new ExchangeRateService();
