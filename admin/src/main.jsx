import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { CategoryContextProvider } from "./context/Category.jsx";
import { SubcategoryProvider } from "./context/Subcategory.jsx";
import { SubsubcategoryProvider } from "./context/Subsubcategory.jsx";
import { ProductContextProvider } from "./context/Product.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <CategoryContextProvider>
      <SubcategoryProvider>
        <SubsubcategoryProvider>
          <ProductContextProvider>
            <App />
          </ProductContextProvider>
        </SubsubcategoryProvider>
      </SubcategoryProvider>
    </CategoryContextProvider>
  </StrictMode>
);
