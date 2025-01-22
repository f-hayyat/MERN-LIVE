require('dotenv').config();

// External Module
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

//Local Module
const errorController = require("./controllers/errorController");
const currencyRouter = require("./routers/currencyRouter");
const exchangeRateService = require("./services/exchangeRateService");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use("/api", currencyRouter);
app.use(errorController.get404);

const PORT = process.env.PORT || 3000;

// Initialize exchange rates
const init = async () => {
  await exchangeRateService.initializeRates(); 
};
init();

app.listen(PORT, () => {
  console.log(`Server running at: http://localhost:${PORT}`);
});
