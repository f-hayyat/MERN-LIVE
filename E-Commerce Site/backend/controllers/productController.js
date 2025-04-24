const Product = require("../models/productModel");

exports.newProduct = async (req, res) => {
    const {
        name,
        price,
        discountPrice,
        description,
        category,
        material,
        countInStock,
        sizes,
        colors,
        brand,
        sku,
        dimensions,
        weight,
        gender,
        tags,
        collections,
        isFeatured,
        isPublished,
        images,
    } = req.body;
    const product = new Product({
        name,
        price,
        discountPrice,
        description,
        category,
        material,
        countInStock,
        sizes,
        colors,
        brand,
        sku,
        dimensions,
        weight,
        gender,
        tags,
        collections,
        isFeatured,
        isPublished,
        images,
        user: req.user.userId, // Attach userId from the token
    });
    try {
        const savedProduct = await product.save();
        res.status(201).json({
            message: "Product created successfully",
            product: savedProduct,
        });
    } catch (error) {
        res.status(500).json({ errorMessages: [error.message] });
    }
};

exports.updateProduct = async (req, res) => {
    const productId = req.params.id;
    const {
        name,
        price,
        discountPrice,
        description,
        category,
        material,
        countInStock,
        sizes,
        colors,
        brand,
        sku,
        dimensions,
        weight,
        gender,
        tags,
        collections,
        isFeatured,
        isPublished,
        images,
    } = req.body;
    try {
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        product.name = name || product.name;
        product.price = price || product.price;
        product.discountPrice = discountPrice || product.discountPrice;
        product.description = description || product.description;
        product.category = category || product.category;
        product.material = material || product.material;
        product.countInStock = countInStock || product.countInStock;
        product.sizes = sizes || product.sizes;
        product.colors = colors || product.colors;
        product.brand = brand || product.brand;
        product.sku = sku || product.sku;
        product.dimensions = dimensions || product.dimensions;
        product.weight = weight || product.weight;
        product.gender = gender || product.gender;
        product.tags = tags || product.tags;
        product.collections = collections || product.collections;
        product.isFeatured = isFeatured !== undefined ? isFeatured : product.isFeatured;
        product.isPublished = isPublished !== undefined ? isPublished : product.isPublished;
        product.images = images || product.images;
        const updatedProduct = await product.save();
        res.status(200).json({
            message: "Product updated successfully",
            product: updatedProduct,
        });
    } catch (error) {
        res.status(500).json({ errorMessages: [error.message] });
    }
};

exports.deleteProduct = async (req, res) => {
    const productId = req.params.id;
    try {
        const product = await Product.findByIdAndDelete(productId);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.status(200).json({
            message: "Product deleted successfully",
        });
    } catch (error) {
        res.status(500).json({ errorMessages: [error.message] });
    }
}

exports.getAllProducts = async (req, res) => {
    try {
        const { collection, size, color, gender, brand, minPrice, maxPrice, sortBy, search, category, material, limit } = req.query;
        const query = {};

        if (collection && collection.toLowerCase() !== "all") {
            query.collections = collection;
        }
        if (category && category.toLowerCase() !== "all") {
            query.category = category;
        }
        if (material) {
            query.material = { $in: material.split(",") };
        }
        if (brand) {
            query.brand = { $in: brand.split(",") };
        }
        if (size) {
            query.sizes = { $in: size.split(",") };
        }
        if (color) {
            query.colors = { $in: color.split(",") };
        }
        if (gender) {
            query.gender = gender;
        }
        if (minPrice || maxPrice) {
            query.price = {};
            if (minPrice) {
                query.price.$gte = minPrice;
            }
            if (maxPrice) {
                query.price.$lte = maxPrice;
            }
        }
        if (search) {
            query.$or = [
                { name: { $regex: search, $options: "i" } },
                { description: { $regex: search, $options: "i" } },
            ];
        }
        // Sorting logic
        let sort = {};
        if (sortBy) {
            switch (sortBy) {
                case "priceAsc":
                    sort = { price: 1 };
                    break;
                case "priceDesc":
                    sort = { price: -1 };
                    break;
                case "popularity":
                    sort = { rating: -1 }; // Assuming you have a rating field
                    break;
                default:
                    sort = { createdAt: -1 }; // Default sorting
            }
        }
        let products = await Product.find(query).sort(sort).limit(limit ? Number(limit) : 0);
        res.json(products);
    } catch (error) {
        console.error(error);
        res.status(500).json({ errorMessages: [error.message] });
    }
}

// get product by id
exports.getProductById = async (req, res) => {
    try {
        const productId = req.params.id;
    const product = await Product.findById(productId);
    if (!product) {
        return res.status(404).json({ message: "Product not found" });
    }
    res.json(product);
    } catch (error) {
        res.status(500).json({ errorMessages: [error.message] });
    }
}

// Similar products to productId
exports.getSimilarProducts = async (req, res) => {
    try {
        const productId = req.params.id;
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        const similarProducts = await Product.find({
            _id: { $ne: productId },
            category: product.category,
            gender : product.gender,
        }).limit(4);
        res.json(similarProducts);
    } catch (error) {
        res.status(500).json({ errorMessages: [error.message] });
    }
}

// best seller products on rating basis
exports.getBestSellerProducts = async (req, res) => {
    try {
        const bestSellerProducts = await Product.findOne({}).sort({ rating: -1 });
        res.json(bestSellerProducts);
    } catch (error) {
        res.status(500).json({ errorMessages: [error.message] });
    }
}

// get new arrivals on basis of createdAt
exports.getNewArrivals = async (req, res) => {
    try {
        const newArrivals = await Product.find({}).sort({ createdAt: -1 }).limit(8);
        res.json(newArrivals);
    } catch (error) {
        res.status(500).json({ errorMessages: [error.message] });
    }
}