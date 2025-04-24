const express = require('express');
const subscriberRouter = express.Router();
const subscriberController = require('../controllers/subscriberController')


subscriberRouter.post("/subscribe", subscriberController.addSubscriber);


module.exports = subscriberRouter;