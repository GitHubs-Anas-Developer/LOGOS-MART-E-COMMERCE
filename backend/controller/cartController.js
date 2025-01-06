const cartModel = require("../models/cartModel");
const productModel = require("../models/productModel"); // Import the Product model
const mongoose = require("mongoose");

const addToCart = async (req, res) => {
  const { productId, quantity } = req.body;

  try {
    let cart = await cartModel.findOne({ userId: req.user.id });

    // Check if product is in stock
    const product = await productModel.findById(productId);
    if (product && product.stock < quantity) {
      return res.status(400).json({ message: "Not enough stock" });
    }

    if (cart) {
      // Check if product is already in the cart
      const itemIndex = cart.items.findIndex(
        (item) => item.productId == productId
      );

      if (itemIndex > -1) {
        // Product exists in the cart, update quantity
        cart.items[itemIndex].quantity += quantity;
      } else {
        // Add new product to cart
        cart.items.push({ productId, quantity });
      }
    } else {
      // No cart for user, create new cart
      cart = new cartModel({
        userId: req.user.id,
        items: [{ productId, quantity }],
      });
    }

    // Save the cart
    await cart.save();

    // Send the updated cart with populated product details
    res
      .status(200)
      .json(
        await cart.populate("items.productId", "title price description images")
      );
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to add to cart", error: error.message });
  }
};

const getUserCart = async (req, res) => {
  try {
    const userId = req.user.id;

    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    // Find the cart and populate product details
    const cart = await cartModel
      .findOne({ userId })
      .populate("items.productId", "title price discountPercentage offerPrice cardImage rating reviews variants delivery");

    if (!cart) {
      return res.status(404).json({ message: "Cart not found for this user" });
    }

    // Convert the cart to a plain JavaScript object
    const cartObj = cart.toObject();

    // Send the populated cart
    res.status(200).json({
      carts: cartObj,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
const cartRemoveOne = async (req, res) => {
  try {
    const userId = req.user.id;
    const { productId } = req.body; // Expect productId in the request body

    if (!userId || !productId) {
      return res
        .status(400)
        .json({ message: "User ID and product ID are required" });
    }

    // Find the cart and remove the product from the items array using $pull
    const cart = await cartModel.findOneAndUpdate(
      { userId, "items.productId": productId }, // Search for the productId within the items array
      {
        $pull: { items: { productId: productId } }, // Remove the item by productId
      },
      { new: true } // Return the updated cart
    );

    if (!cart) {
      return res
        .status(404)
        .json({ message: "Cart not found or item not in cart" });
    }

    // Successfully removed the item
    res.status(200).json({ message: "Item removed successfully", cart });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Clear all items from the cart
const cartClearAll = async (req, res) => {
  try {
    const userId = req.user.id;

    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    // Clear all items from the user's cart
    const cart = await cartModel.findOneAndUpdate(
      { userId },
      { $set: { items: [] } }, // Empty the items array
      { new: true }
    );

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    res.status(200).json({ message: "Cart cleared successfully", cart });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const CartUpdateQuantity = async (req, res) => {
  const { productId, quantity } = req.body;

  try {
    const userId = req.user.id;

    // Validate input
    if (!productId || quantity <= 0) {
      return res
        .status(400)
        .json({ message: "Valid productId and quantity are required" });
    }

    // Find the cart for the user
    let cart = await cartModel.findOne({ userId });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    // Find the item in the cart
    const itemIndex = cart.items.findIndex(
      (item) => item.productId.toString() === productId
    );

    if (itemIndex === -1) {
      return res.status(404).json({ message: "Product not found in cart" });
    }

    // Update the quantity of the product in the cart
    cart.items[itemIndex].quantity = quantity;

    // Save the updated cart
    await cart.save();

    // Send back the updated cart
    res.status(200).json({
      message: "Quantity updated successfully",
    });
  } catch (error) {
    console.error("Error updating cart quantity:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = {
  addToCart,
  getUserCart,
  cartRemoveOne,
  cartClearAll,
  CartUpdateQuantity,
};
