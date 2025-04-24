const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Product = require("./models/productModel");
const User = require("./models/userModel");
const Cart = require("./models/cartModel");
const sampleProducts = require("./data/sampleProducts");

dotenv.config();

// connect to MongoDB
mongoose.connect(process.env.MONGO_DB_URL);

// function to import data
const importData = async () => {
    try {
        // delete existing data
        await Product.deleteMany();
        await User.deleteMany();
        await Cart.deleteMany();
        // create sample admin user
        const createUser = await User.create({
            name: "Admin User",
            email: "admin@example.com",
            password: "password",
            role: "admin"
        });
        // create sample products with userId
        const sampleProductsWithUserId = sampleProducts.map(product => {
            return {
                ...product,
                user: createUser._id // set userId to the created admin user
            };
        });


        // create sample data
        await Product.insertMany(sampleProductsWithUserId);
        console.log("Sample Data Imported Successfully!");
        // close the connection
        process.exit();
    } catch (error) {
        console.error("Error importing data: ", error.message);
    } finally {
        mongoose.connection.close();
    }
};

importData();


