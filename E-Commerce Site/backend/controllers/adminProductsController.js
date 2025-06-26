const Product = require("../models/productModel");

exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.find({});
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.updateProduct = async (req, res) => {
    const { id } = req.params;
    const { name, price, discountPrice, description, category, sku, countInStock, brand, sizes, colors, collections, material, gender, images } = req.body;
    const updatedProduct = await Product.findByIdAndUpdate(id, { name, price, discountPrice, description, category, sku, countInStock, brand, sizes, colors, collections, material, gender, images }, { new: true });
    res.status(200).json(updatedProduct);
}

