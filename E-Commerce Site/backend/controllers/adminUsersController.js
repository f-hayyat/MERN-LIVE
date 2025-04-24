const User = require("../models/userModel");
const bcrypt = require("bcrypt");

// GET all users - ADMIN only
exports.getAllUsers = async (_req, res) => {
    try {
        const users = await User.find({}).select("-password"); // 👈 hide password
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error in fetching users",
            error: error.message,
        });
    }
};

// ADD new user - ADMIN only
exports.addNewUser = async (req, res) => {
    const { name, email, password, role } = req.body;
    try {
        if (!name || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "Please fill all the fields",
            });
        }
        const existingUser = await User.findOne({ email: email });

        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "User already exists",
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            role: role || "customer",
        });

        await newUser.save();

        res.status(201).json({
            success: true,
            message: "User added successfully",
            user: {
                _id: newUser._id,
                name: newUser.name,
                email: newUser.email,
                role: newUser.role,
                createdAt: newUser.createdAt,
            },
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error in adding user",
            error: error.message,
        });
    }
};

// Update user - ADMIN only
exports.updateUser = async (req, res) => {
    const { id } = req.params;
    const { name, email, role } = req.body;
    try {
        if (!name || !email) {
            return res.status(400).json({
                success: false,
                message: "Please fill all the fields",
            });
        }
        const existingUser = await User.findById(id);

        if (!existingUser) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        existingUser.name = name;
        existingUser.email = email;
        existingUser.role = role || "customer";

        await existingUser.save();

        res.status(200).json({
            success: true,
            message: "User updated successfully",
            user: {
                _id: existingUser._id,
                name: existingUser.name,
                email: existingUser.email,
                role: existingUser.role,
                createdAt: existingUser.createdAt,
            },
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error in updating user",
            error: error.message,
        });
    }
};

// Delete user - ADMIN only
exports.deleteUser = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedUser = await User.findByIdAndDelete(id);

        if (!deletedUser) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        res.status(200).json({
            success: true,
            message: "User deleted successfully",
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error in deleting user",
            error: error.message,
        });
    }
};
