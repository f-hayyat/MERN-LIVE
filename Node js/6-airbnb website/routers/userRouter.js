const express = require('express');
const userRouter = express.Router();
const path = require('path');
const rootDir = require("../utils/path");

userRouter.get('/', (req, res , next) => {
    res.sendFile(path.join(rootDir, "views", "index.html"));
  });
  
   module.exports = userRouter;
