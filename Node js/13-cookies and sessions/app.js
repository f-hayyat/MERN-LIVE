// Core Modules
const path = require("path");

// External Module
const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
const mongodbConnectSession = require("connect-mongodb-session");
// Local Module
const { hostRouter } = require("./routers/hostRouter");
const storeRouter = require("./routers/storeRouter");
const { authRouter } = require("./routers/authRouter");
const rootDir = require("./util/path-util");
const errorController = require("./controllers/errorController");

const app = express();
app.set("view engine", "ejs");
app.set("views", "views");

app.use(express.static(path.join(rootDir, "public")));
app.use(bodyParser.urlencoded({ extended: true }));

const MongoDBSessionStore = mongodbConnectSession(session);
const MONGO_DB_URL =
  "mongodb+srv://mfaisalhayyat:633861@kgcoding.zt6oe.mongodb.net/airbnb?retryWrites=true&w=majority&appName=KGcoding";

const store = new MongoDBSessionStore({
  uri: MONGO_DB_URL,
  collection: "sessions"
});


app.use(
  session({
    secret: "complete coding session",
    resave: false,
    saveUninitialized: true,
    store : store,
  })
);

app.use("/host", (req, res, next) => {
  if (!req.session.isLoggedIn) {
    res.redirect("/login");
  }
  next();
});

// Routes
app.use(storeRouter);
app.use("/host", hostRouter);
app.use(authRouter);

app.use(errorController.get404);

const mongoose = require("mongoose");

const PORT = 3001;

mongoose.connect(MONGO_DB_URL).then(() => {
  app.listen(PORT, () => {
    console.log(`Server running at: http://localhost:${PORT}`);
  });
});
