import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Dashboard from "./pages/dashboard/Dashboard";
import Category from "./pages/category/Category";
import NewCategory from "./pages/new/newCategory/NewCategory";
import Subcategory from "./pages/subcategory/Subcategory";
import NewSubcategory from "./pages/new/newSubcategory/NewSubcategory";
import Sub_subcategory from "./pages/sub-subcategory/Sub_subcategory";
import NewSubsubcategory from "./pages/new/newSubSubcategory/NewSubsubcategory";
import Carousel from "./pages/new/newCarousel/Carousel";
import NewProduct from "./pages/new/newProduct/NewProduct";
import Products from "./pages/products/Products";
import ProductsImages from "./pages/productsImages/ProductsImages";
import NewProductImages from "./pages/new/newProductImages/newProductImages";

function App() {
  return (
    <>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/category" element={<Category />} />
            <Route path="/newCategory" element={<NewCategory />} />
            <Route path="/subcategory" element={<Subcategory />} />
            <Route path="/newSubcategory" element={<NewSubcategory />} />
            <Route path="/Sub-subcategory" element={<Sub_subcategory />} />
            <Route path="/newSubSubcategory" element={<NewSubsubcategory />} />
            <Route path="/newProduct" element={<NewProduct />} />
            <Route path="/newCarousel" element={<Carousel />} />
            <Route path="/products" element={<Products />} />
            <Route path="/productsImages" element={<ProductsImages />} />
            <Route path="/newProductImages" element={<NewProductImages />} />
          </Routes>
        </Layout>
      </Router>
    </>
  );
}

export default App;
