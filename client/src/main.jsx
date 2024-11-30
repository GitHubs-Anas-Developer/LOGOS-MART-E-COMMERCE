import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { CategoryContextProvider } from "./context/Category.jsx";
import { SubcategoryContextProvider } from "./context/Subcategory.jsx";
import { SubsubcategoryContextProvider } from "./context/Subsubcategory.jsx";
import { AuthContextProvider } from "./context/Auth.jsx";
import { UserContextProvider } from "./context/User.jsx";
import { ProductsContextProvider } from "./context/Products.jsx";
import { OfferContextProvider } from "./context/Offer.jsx";
import { CartContextProvider } from "./context/Cart.jsx";
import { FavoriteContextProvider } from "./context/Favorite.jsx";
import { FilterProductsContextProvider } from "./context/FilterProducts.jsx";
import { AddressContextProvider } from "./context/Address.jsx";
import { OrderContextProvider } from "./context/Orders.jsx";
import { RelatedProductsProvider } from "./context/RelatedProducts.jsx";
import ProductReviewsProvider from "./context/ProductReviews.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <AuthContextProvider>
        <UserContextProvider>
          <CategoryContextProvider>
            <SubcategoryContextProvider>
              <SubsubcategoryContextProvider>
                <ProductsContextProvider>
                  <OfferContextProvider>
                    <CartContextProvider>
                      <FavoriteContextProvider>
                        <FilterProductsContextProvider>
                          <AddressContextProvider>
                            <OrderContextProvider>
                              <RelatedProductsProvider>
                                <ProductReviewsProvider>
                                  <App />
                                </ProductReviewsProvider>
                              </RelatedProductsProvider>
                            </OrderContextProvider>
                          </AddressContextProvider>
                        </FilterProductsContextProvider>
                      </FavoriteContextProvider>
                    </CartContextProvider>
                  </OfferContextProvider>
                </ProductsContextProvider>
              </SubsubcategoryContextProvider>
            </SubcategoryContextProvider>
          </CategoryContextProvider>
        </UserContextProvider>
      </AuthContextProvider>
    </BrowserRouter>
  </StrictMode>
);
