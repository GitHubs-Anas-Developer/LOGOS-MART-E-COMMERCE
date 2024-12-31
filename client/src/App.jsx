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
import SubsubcategoryProducts from "./pages/subsubcategoryProducts/SubsubcategoryProducts";
import AddressForm from "./pages/shippingAddress/AddressForm";
import Payment from "./pages/payment/Payment";
import OnlinePayment from "./pages/onlinePayment/OnlinePayment";
import OrderSuccess from "./pages/orderSuccess/OrderSuccess";
import MyOrder from "./pages/myOrders/MyOrder";
import MyOrderDetails from "./pages/myOrderDetails/MyOrderDetails";
import BottomNavigation from "./components/bottomNavigation/BottomNavigation";
import Categories from "./pages/categories/Categories";
import CashOnDelivery from "./pages/cashOnDelivery/CashOnDelivery";
import Addresses from "./pages/addresses/Addresses";

function App() {
  return (
    <>
      <Header />

      <div className="main-content">
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Home />} />

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

          <Route path="/products" element={<Products />} />
          <Route path="/productDetails/:id" element={<ProductDetails />} />

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
          <Route path="/categories" element={<Categories />} />

          <Route
            path="/subsubcategoryProducts/:id"
            element={<SubsubcategoryProducts />}
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
            path="/addresses"
            element={
              <ProtectedRoute>
                <Addresses />
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
            path="/cashOnDelivery"
            element={
              <ProtectedRoute>
                <CashOnDelivery />
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
