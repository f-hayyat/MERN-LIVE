require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const app = express();
const authRouter = require("./routers/authRouter");
const userRouter = require("./routers/userRouter");
const productRouter = require("./routers/productRouter");
const cartRouter = require("./routers/cartRouter");
const checkoutRouter = require("./routers/checkoutRouter"); // Import the checkout router
const orderRouter = require("./routers/orderRouter");
const uploadImagesRouter = require("./routers/uploadImagesRouter"); // Import the upload images router
const subscriberRouter = require("./routers/subscriberRouter");
const adminUsersRouter = require("./routers/adminUsersRouter"); // Import the admin router
const adminProductsRouter = require("./routers/adminProductsRouter"); // Import the admin products router
const adminOrdersRouter = require("./routers/adminOrdersRouter"); // Import the admin orders router

const MONGO_DB_URL = process.env.MONGO_DB_URL;

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/products", productRouter);
app.use("/api/cart", cartRouter); // Use the cart router
app.use("/api/checkout", checkoutRouter); // Use the checkout router
app.use("/api/orders", orderRouter); // Use the order router
app.use("/api/upload", uploadImagesRouter); // Use the upload images router
app.use("/api", subscriberRouter); // Newsletter subscription router
app.use("/api/admin", adminUsersRouter); // Use the admin router
app.use("/api/admin/products", adminProductsRouter); // Use the admin products router
app.use("/api/admin/orders", adminOrdersRouter); // Use the admin orders router


const PORT = process.env.PORT || 3006;
mongoose.connect(MONGO_DB_URL).then(() => {
  app.listen(PORT, () => {
    console.log(`Server running at: http://localhost:${PORT}`);
  });
});
