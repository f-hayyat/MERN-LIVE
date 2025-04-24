const Product = require("../models/productModel");
const Cart = require("../models/cartModel");

// Helper: Get cart by user or guest
const getCart = async (userId, guestId) => {
	if (userId) return await Cart.findOne({ user: userId });
	if (guestId) return await Cart.findOne({ guestId });
	return null;
};

// Add product to cart
exports.addToCart = async (req, res) => {
	const { productId, quantity, size, color, guestId } = req.body;
	const userId = req.user?.userId; // Extracted from auth middleware if available

	try {
		const product = await Product.findById(productId);
		if (!product) {
			return res.status(404).json({ message: "Product not found" });
		}

		let cart = await getCart(userId, guestId);

		if (cart) {
			const index = cart.products.findIndex(
				(p) =>
					p.productId.toString() === productId &&
					p.size === size &&
					p.color === color
			);

			if (index > -1) {
				cart.products[index].quantity += Number(quantity);
			} else {
				cart.products.push({
					productId,
					quantity: Number(quantity),
					name: product.name,
					image: product.images[0].url,
					price: product.discountPrice,
					size,
					color,
				});
			}
		} else {
			cart = new Cart({
				user: userId || undefined,
				guestId:
					guestId || `guest_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
				products: [
					{
						productId,
						quantity: Number(quantity),
						name: product.name,
						image: product.images[0].url,
						price: product.discountPrice,
						size,
						color,
					},
				],
			});
		}

		// Recalculate total price
		cart.totalPrice = cart.products.reduce(
			(total, item) => total + item.price * item.quantity,
			0
		);

		await cart.save();
		return res.status(200).json(cart);
	} catch (error) {
		console.error("Add to cart error:", error);
		return res.status(500).json({ message: "Internal server error" });
	}
};

// Update quantity of product in cart
exports.updateCartItem = async (req, res) => {
	const { productId, quantity, size, color, guestId } = req.body;
	const userId = req.user?.userId;

	try {
		const cart = await getCart(userId, guestId);
		if (!cart) {
			return res.status(404).json({ message: "Cart not found" });
		}

		const index = cart.products.findIndex(
			(p) =>
				p.productId.toString() === productId &&
				p.size === size &&
				p.color === color
		);

		if (index > -1) {
			if (Number(quantity) <= 0) {
				cart.products.splice(index, 1);
			} else {
				cart.products[index].quantity = Number(quantity);
			}

			cart.totalPrice = cart.products.reduce(
				(total, item) => total + item.price * item.quantity,
				0
			);

			await cart.save();
			return res.status(200).json(cart);
		} else {
			return res.status(404).json({ message: "Product not found in cart" });
		}
	} catch (error) {
		console.error("Update cart error:", error);
		return res.status(500).json({ message: "Internal server error" });
	}
};

// Delete product from cart
exports.deleteCartItem = async (req, res) => {
	const { productId, size, color, guestId } = req.body;
	const userId = req.user?.userId;

	try {
		const cart = await getCart(userId, guestId);
		if (!cart) {
			return res.status(404).json({ message: "Cart not found" });
		}

		const index = cart.products.findIndex(
			(p) =>
				p.productId.toString() === productId &&
				p.size === size &&
				p.color === color
		);

		if (index > -1) {
			cart.products.splice(index, 1);

			cart.totalPrice = cart.products.reduce(
				(total, item) => total + item.price * item.quantity,
				0
			);

			await cart.save();
			return res.status(200).json(cart);
		} else {
			return res.status(404).json({ message: "Product not found in cart" });
		}
	} catch (error) {
		console.error("Delete cart item error:", error);
		return res.status(500).json({ message: "Internal server error" });
	}
};

// Get cart for user or guest
exports.getCart = async (req, res) => {
	const { guestId } = req.query;
	const userId = req.user?.userId;

	try {
		const cart = await getCart(userId, guestId);
		if (!cart) {
			return res.status(404).json({ message: "Cart not found" });
		}
		return res.status(200).json(cart);
	} catch (error) {
		console.error("Get cart error:", error);
		return res.status(500).json({ message: "Internal server error" });
	}
};

// Merge guest cart into user cart on login
exports.mergeCarts = async (req, res) => {
	const { guestId } = req.body;
	const userId = req.user?.userId;

	if (!userId) return res.status(401).json({ message: "Unauthorized" });
	if (!guestId)
		return res.status(400).json({ message: "Guest ID is required" });

	try {
		const guestCart = await Cart.findOne({ guestId });
		const userCart = await Cart.findOne({ user: userId });

		if (!guestCart || guestCart.products.length === 0) {
			return res.status(200).json(userCart || null);
		}

		if (userCart) {
			guestCart.products.forEach((guestItem) => {
				const index = userCart.products.findIndex(
					(userItem) =>
						userItem.productId.toString() === guestItem.productId.toString() &&
						userItem.size === guestItem.size &&
						userItem.color === guestItem.color
				);

				if (index > -1) {
					userCart.products[index].quantity += guestItem.quantity;
				} else {
					userCart.products.push({ ...guestItem.toObject() });
				}
			});

			userCart.totalPrice = userCart.products.reduce(
				(total, item) => total + item.price * item.quantity,
				0
			);

			await userCart.save();
			await Cart.deleteOne({ guestId });

			return res.status(200).json(userCart);
		} else {
			guestCart.user = userId;
			guestCart.guestId = undefined;

			await guestCart.save();
			return res.status(200).json(guestCart);
		}
	} catch (error) {
		console.error("Merge cart error:", error);
		return res.status(500).json({ message: "Internal server error" });
	}
};
