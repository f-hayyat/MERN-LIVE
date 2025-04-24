const Subscriber = require("../models/subscriberModel");

exports.addSubscriber = async (req, res) => {
    const { email } = req.body;
    console.log(email);
    
    if (!email) {
        return res.status(400).json({ message: "Email not found" });
    }
    try {
        // Check if email already exists
        const existingEmail = await Subscriber.findOne({ email });

        if (existingEmail) {
            return res.status(400).json({ message: "Email already subscribed" });
        }

        const subscriber = await new Subscriber({ email });
        await subscriber.save();

        res.status(201).json({
            success: true,
            message: "Successfully subscribed",
            subscriber,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error in subscription",
            error: error.message,
        });
    }
};
