import { createContext, useContext, useEffect, useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import api from "../utils/axiosInstance";

const CartContext = createContext();

export const CartContextProvider = ({ children }) => {
  const [cart, setCart] = useState([]); // State to store cart data
  const [cartCount, setCartCount] = useState(0);

  // Add item to cart
  const addToCart = async (productId, quantity = 1) => {
    try {
      await api.post(`/api/v1/add/cart`, {
        productId,
        quantity,
      });
      toast.success("Cart added successfully!");
      await fetchCart(); // Refresh cart data after adding item
    } catch (error) {
      toast.error("Failed to add to cart."); // Show error toast if needed
      console.error("Failed to add to cart:", error);
    }
  };

  // Fetch the current user's cart
  const fetchCart = async () => {
    try {
      const response = await api.get(`/api/v1/cart`);
      setCart(response.data.carts); // Store cart data
      setCartCount(response.data.carts.items.length); // Update cart item count
    } catch (error) {
      console.error("Failed to fetch cart:", error);
    }
  };
  const updateCartQuantity = async (productId, newQuantity) => {
    try {
      // Make the PUT request to update the quantity
      const response = await api.put("/api/v1/cart/update-quantity", {
        productId,
        quantity: newQuantity,
      });

      toast.success("Quantity updated successfully!");
      // Optionally refresh the cart or update the cart state in your context
      await fetchCart(); // Assuming you have a fetchCart function to refresh the cart state
    } catch (error) {
      toast.error("Failed to update quantity.");
      console.error("Error updating cart quantity:", error);
    }
  };

  // Delete a product from the cart
  const cartDeleteOne = async (productId) => {
    console.log(productId);

    try {
      const response = await api.delete(`/api/v1/cart/delete`, {
        data: { productId }, // Correctly passing productId in the DELETE request body
      });
      await fetchCart(); // Refresh cart data after removing item
      toast.success("Product deleted successfully from cart!");
    } catch (error) {
      toast.error("Failed to delete product from cart");
      console.error("Failed to delete product from cart:", error);
    }
  };
  const cartClearAll = async () => {
    try {
      const response = await api.delete(`/api/v1/cart/clear`);
      await fetchCart(); // Refresh cart data after clearing all items
      toast.success("All products removed successfully from cart!");
    } catch (error) {
      toast.error("Failed to clear cart");
      console.error("Failed to clear cart:", error);
    }
  };

  useEffect(() => {
    fetchCart(); // Fetch cart data when the component mounts or userId changes
  }, []);

  return (
    <CartContext.Provider
      value={{
        addToCart,
        cart,
        cartCount,
        cartDeleteOne,
        cartClearAll,
        updateCartQuantity,
      }}
    >
      <Toaster />
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;
