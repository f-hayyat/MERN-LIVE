const User = require("../models/userModel");

exports.profile = async (req, res, next) => {
    const userId = req.user.userId; // Get userId from the token in the request
    try {
        const user = await User.findById(userId).select("-password"); // Exclude password from the response
        if (!user) {
        return res.status(404).json({ errorMessages: ["User not found."] });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ errorMessages: [error.message] });
    }
    }