import "./App.css";
import "./Multi-Category Mall/Styles/breakpoints.css";
import CartProvider from "./Multi-Category Mall/Context/CartContext";
import { Routes, Route } from "react-router-dom";
import MainLayout from "./Multi-Category Mall/Components/MainLayout";
import CategoryPage from "./Multi-Category Mall/Components/CategoryPage";
import Home from "./Multi-Category Mall/Components/Homepage/Home";
import ProductReview from "./Multi-Category Mall/Components/ProductReview";
import { ProductsProvider } from "./Multi-Category Mall/Context/ProductsContext";
import ShopByCategory from "./Multi-Category Mall/Components/ShopByCategory";
import NotFound from "./Multi-Category Mall/Components/NotFound";
import Login from "./Multi-Category Mall/Components/Login";
import SignUp from "./Multi-Category Mall/Components/SignUp";
import AuthProvider from "./Multi-Category Mall/Context/AuthContext";
import Profile from "./Multi-Category Mall/Components/Profile";
import ProtectedRoute from "./Multi-Category Mall/Components/ProtectedRoute";
import UserDataProvider from "./Multi-Category Mall/Context/UserDataContext";
import ViewCart from "./Multi-Category Mall/Components/Cart/ViewCart";
import OrderCheckout from "./Multi-Category Mall/Components/Cart/OrderCheckout";
import Success from "./Multi-Category Mall/Components/Cart/Success";

function App() {
  return (
    <>
      <AuthProvider>
        <ProductsProvider>
          <UserDataProvider>
            <CartProvider>
              <Routes>
                <Route path="/" element={<MainLayout />}>
                  <Route index element={<Home />}></Route>
                  <Route path="home" element={<Home />}></Route>

                  <Route path="shop" element={<ShopByCategory />}></Route>
                  <Route
                    path="shop/:category"
                    element={<CategoryPage />}
                  ></Route>
                  <Route
                    path="shop/:category/:productId/:slug"
                    element={<ProductReview />}
                  ></Route>
                  <Route path="login" element={<Login />}></Route>
                  <Route path="signup" element={<SignUp />}></Route>
                  <Route
                    path="/profile"
                    element={
                      <ProtectedRoute>
                        <Profile />
                      </ProtectedRoute>
                    }
                  ></Route>
                  <Route path="/cart" element={<ViewCart />}></Route>
                  <Route
                    path="cart/checkout"
                    element={
                      <ProtectedRoute>
                        <OrderCheckout />
                      </ProtectedRoute>
                    }
                  ></Route>
                  <Route
                    path="cart/checkout/success"
                    element={<Success />}
                  ></Route>
                  <Route path="*" element={<NotFound />}></Route>
                </Route>
              </Routes>
            </CartProvider>
          </UserDataProvider>
        </ProductsProvider>
      </AuthProvider>
    </>
  );
}

export default App;
