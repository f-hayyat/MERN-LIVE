const Checkout = require("../models/checkoutModel");
const Cart = require("../models/cartModel");
const Product = require("../models/productModel");
const Order = require("../models/orderModel");

// new checkout create
exports.createCheckout = async (req, res) => {
    const { checkoutItems, shippingAddress, paymentMethod, totalPrice } =
        req.body;

    if (!checkoutItems || checkoutItems.length === 0) {
        return res.status(400).json({ message: "No items in checkout" });
    }
    try {
        const newCheckout = new Checkout({
            user: req.user.userId,
            checkoutItems,
            shippingAddress,
            paymentMethod,
            totalPrice,
            paymentStatus: "Pending",
            isPaid: false,
        });
        // save the checkout to the database
        await newCheckout.save();
        res.status(201).json({
            message: "Checkout created successfully",
            newCheckout,
        });
    } catch (error) {
        res.status(500).json({ errorMessages: [error.message] });
    }
};

// update checkout to mark as paid
exports.updateCheckoutToPaid = async (req, res) => {
    const checkoutId = req.params.id;
    const { paymentStatus, paymentDetails } = req.body;

    try {
        const checkout = await Checkout.findById(checkoutId);
        if (!checkout) {
            return res.status(404).json({ message: "Checkout not found" });
        }
        if (paymentStatus === "paid") {
            checkout.isPaid = true;
            checkout.paidAt = new Date();
            checkout.paymentStatus = paymentStatus;
            checkout.paymentDetails = paymentDetails;
            await checkout.save();

            res.status(200).json({
                message: "Checkout updated to paid successfully",
                checkout,
            });
        } else {
            return res.status(400).json({ message: "Invalid payment status" });
        }
    } catch (error) {
        res.status(500).json({ errorMessages: [error.message] });
    }
};

exports.finalizeCheckout = async (req, res) => {
    const checkoutId = req.params.id;

    try {
        const checkout = await Checkout.findById(checkoutId);

        if (!checkout) {
            return res.status(404).json({ message: "Checkout not found" });
        }

        if (checkout.isPaid && !checkout.isFinalized) {
            const finalOrder = await Order.create({
                user: checkout.user,
                orderItems: checkout.checkoutItems,
                shippingAddress: checkout.shippingAddress,
                paymentMethod: checkout.paymentMethod,
                totalPrice: checkout.totalPrice,
                isPaid: true,
                paidAt: checkout.paidAt,
                isDelivered: false,
                paymentStatus: "paid",
                paymentDetails: checkout.paymentDetails,
            });

            checkout.isFinalized = true;
            checkout.finalizedAt = Date.now();
            await checkout.save();

            await Cart.findOneAndDelete({ user: checkout.user });

            res.status(201).json(finalOrder);
        } else if (checkout.isFinalized) {
            res.status(400).json({ message: "Checkout already finalized" });
        } else {
            res.status(400).json({ message: "Checkout is not paid" });
        }
    } catch (error) {
        console.error("Finalize Checkout Error:", error);
        res.status(500).json({ message: "Server error" });
    }
};
