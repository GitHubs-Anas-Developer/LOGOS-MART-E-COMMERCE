import { createContext, useContext, useEffect, useState } from "react";
import { AuthContext } from "./Auth";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";

const CartContext = createContext();

export const CartContextProvider = ({ children }) => {
  const { userId } = useContext(AuthContext);
  const [cart, setCart] = useState([]); // State to store cart data
  const [cartCount, setCartCount] = useState(0);

  // Add item to cart
  const addToCart = async (productId, quantity = 1) => {
    try {
      await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/v1/add/cart`, {
        userId,
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
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/cart/${userId}`
      );
      setCart(response.data.carts); // Store cart data
      setCartCount(response.data.carts.items.length); // Update cart item count
    } catch (error) {
      console.error("Failed to fetch cart:", error);
    }
  };

  // Delete a product from the cart
  const cartDeleteOne = async (productId) => {
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/cart/delete/${userId}`,
        {
          data: { productId }, // Correctly passing productId in the DELETE request body
        }
      );
      await fetchCart(); // Refresh cart data after removing item
      toast.success("Product deleted successfully from cart!");
    } catch (error) {
      toast.error("Failed to delete product from cart");
      console.error("Failed to delete product from cart:", error);
    }
  };

  useEffect(() => {
    fetchCart(); // Fetch cart data when the component mounts or userId changes
  }, [userId]);

  return (
    <CartContext.Provider value={{ addToCart, cart, cartCount, cartDeleteOne }}>
      <Toaster />
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;
