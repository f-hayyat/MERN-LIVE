const express = require("express");
const currencyController = require("../controllers/currencyController");
const currencyRouter = express.Router();

currencyRouter.post("/convert", currencyController.convertCurrency);


module.exports = currencyRouter;
