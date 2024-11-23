// src/App.js
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import Signup from "./pages/auth/signup/Signup";
import Home from "./pages/home/Home";
import Login from "./pages/auth/login/Login";
import ProtectedRoute from "../src/pages/auth/ProtectedRoute"; // Adjust path as needed
import Products from "./pages/products/Products";
import ProductDetails from "./pages/productDetails/ProductDetails";
import MyProfile from "./pages/myprofile/MyProfile";
import Cart from "./pages/cart/Cart";
import Favorites from "./pages/favorites/Favorites";
import SubsubcategoryProducts from "./pages/subsubcategoryProducts/subsubcategoryProducts";
import AddressForm from "./pages/shippingAddress/AddressForm";
import Payment from "./pages/payment/Payment";
import OnlinePayment from "./pages/onlinePayment/OnlinePayment";
import OrderSuccess from "./pages/orderSuccess/OrderSuccess";
import MyOrder from "./pages/myOrders/MyOrder";
import MyOrderDetails from "./pages/myOrderDetails/myOrderDetails";
import BottomNavigation from "./components/bottomNavigation/BottomNavigation";
import Categories from "./pages/categories/Categories";

function App() {
  return (
    <>
      <Header />

      <div className="main-content">
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />

          <Route
            path="/myprofile"
            element={
              <ProtectedRoute>
                <MyProfile />
              </ProtectedRoute>
            }
          />

          <Route
            path="/myOrders"
            element={
              <ProtectedRoute>
                <MyOrder />
              </ProtectedRoute>
            }
          />

          <Route
            path="/products"
            element={
              <ProtectedRoute>
                <Products />
              </ProtectedRoute>
            }
          />
          <Route
            path="/productDetails/:id"
            element={
              <ProtectedRoute>
                <ProductDetails />
              </ProtectedRoute>
            }
          />

          <Route
            path="/cart"
            element={
              <ProtectedRoute>
                <Cart />
              </ProtectedRoute>
            }
          />

          <Route
            path="/favorites"
            element={
              <ProtectedRoute>
                <Favorites />
              </ProtectedRoute>
            }
          />
          <Route
            path="/categories"
            element={
              <ProtectedRoute>
                <Categories />
              </ProtectedRoute>
            }
          />

          <Route
            path="/subsubcategoryProducts/:id"
            element={
              <ProtectedRoute>
                <SubsubcategoryProducts />
              </ProtectedRoute>
            }
          />
          <Route
            path="/shippingAddress"
            element={
              <ProtectedRoute>
                <AddressForm />
              </ProtectedRoute>
            }
          />

          <Route
            path="/payment"
            element={
              <ProtectedRoute>
                <Payment />
              </ProtectedRoute>
            }
          />

          <Route
            path="/onlinePayment"
            element={
              <ProtectedRoute>
                <OnlinePayment />
              </ProtectedRoute>
            }
          />
          <Route
            path="/orderSuccess"
            element={
              <ProtectedRoute>
                <OrderSuccess />
              </ProtectedRoute>
            }
          />

          <Route
            path="/myOrderDetails/:id"
            element={
              <ProtectedRoute>
                <MyOrderDetails />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
      <Footer />

      <BottomNavigation />
    </>
  );
}

export default App;
