const express = require("express");
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const streamifier = require("streamifier");
const uploadImagesRouter = express.Router();
const { protect } = require("../middlewares/authMiddleware");

// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Multer configuration
const storage = multer.memoryStorage();
const upload = multer({ storage });

uploadImagesRouter.post(
    "/",
    protect,
    upload.single("image"),
    async (req, res) => {
        try {
            if (!req.file) {
                return res.status(400).json({ message: "No image file uploaded" });
            }

            const stream = cloudinary.uploader.upload_stream(
                { resource_type: "image" },
                (error, result) => {
                    if (error) {
                        return res
                            .status(500)
                            .json({ message: "Error uploading image", error });
                    }
                    res.status(200).json({ url: result.secure_url });
                }
            );

            streamifier.createReadStream(req.file.buffer).pipe(stream);
        } catch (error) {
            console.error("Image Upload Error:", error);
            res.status(500).json({ message: "Error uploading image", error });
        }
    }
);

module.exports = uploadImagesRouter;
