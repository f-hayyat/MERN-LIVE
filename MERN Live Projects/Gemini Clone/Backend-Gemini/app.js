require('dotenv').config();
 


// External Module
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

//Local Module
const errorController = require("./controllers/errorController");
const geminiRouter = require("./routers/geminiRouter");


const MONGO_DB_URL =
`mongodb+srv://${process.env.MONGO_DB_USERNAME}:${process.env.MONGO_DB_PASSWORD}@kgcoding.zt6oe.mongodb.net/${process.env.MONGO_DB_DATABASE}?retryWrites=true&w=majority&appName=KGcoding`;



const app = express();

app.use(cors());
app.use(express.json());


app.use(bodyParser.urlencoded({ extended: true }));

 app.use("/api" , geminiRouter);


app.use(errorController.get404);

const PORT = process.env.PORT || 3001;
mongoose.connect(MONGO_DB_URL).then(() => {
  app.listen(PORT, () => {
    console.log(`Server running at: http://localhost:${PORT}`);
  });
});
