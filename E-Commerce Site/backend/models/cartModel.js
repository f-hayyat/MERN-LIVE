const mongoose = require("mongoose");

const cartItemSchema = new mongoose.Schema(
    {
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
            required: true,
        },
        quantity: {
            type: Number,
            default: 1,
        },
        name: String,
        image: String,
        price: Number,
        size: String,
        color: String,
    },
    { _id: false } // Disable automatic _id generation for subdocuments
);

const cartSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        products: [cartItemSchema],
        totalPrice: {
            type: Number,
            required: true,
            default: 0,
        },
        guestId: {
            type: String,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Cart", cartSchema);
