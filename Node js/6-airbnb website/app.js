const express = require('express');
const bodyParser = require('body-parser');
const hostRouter = require('./routers/hostRouter');
const userRouter = require('./routers/userRouter');

const app = express();


app.use(bodyParser.urlencoded({extended: true}));
app.use((req, res , next) => {
  console.log(req.url, req.method);
  next();
});

app.use(userRouter)
app.use(hostRouter);

app.use((req, res) => {
    res.statusCode = 404;
    res.send(`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>404 Error</title>
</head>
<body>
    <h1>Page not found</h1>
    <h2>404 Error</h2>
</body>
</html>`);
});


const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is listening on: http://localhost:${PORT}`);
});