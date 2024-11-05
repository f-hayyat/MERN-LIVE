const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const rootDir = require("./utils/path");
const hostRouter = require('./routers/hostRouter');
const userRouter = require('./routers/userRouter');

const app = express();

app.use(express.static(path.join(rootDir, "public")));
app.use(bodyParser.urlencoded({extended: true}));
app.use((req, res , next) => {
  console.log(req.url, req.method);
  next();
});

app.use(userRouter)
app.use("/host",hostRouter);

app.use((req, res) => {
    res.statusCode = 404;
    res.sendFile(path.join(rootDir, "views", "404.html"));
    });


const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is listening on: http://localhost:${PORT}`);
});