import { Routes, Route } from "react-router-dom";
import "./App.css";
import "./styles/breakpoints.css";
import CartProvider from "./context/CartContext";
import AuthProvider from "./context/AuthContext";
import { ProductsProvider } from "./context/ProductsContext";
import UserDataProvider from "./context/UserDataContext";
import MainLayout from "./pages/MainLayout";
import CategoryPage from "./pages/CategoryPage";
import Home from "./pages/Home";
import ProductReview from "./pages/ProductReview";
import ShopByCategory from "./pages/ShopByCategory";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Profile from "./pages/Profile";
import ViewCart from "./pages/ViewCart";
import OrderCheckout from "./pages/OrderCheckout";
import Success from "./pages/Success";
import Orders from "./pages/Orders";
import ProtectedRoute from "./components/ProtectedRoute";

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
                  <Route path="cart/success" element={<Success />}></Route>
                  <Route
                    path="orders"
                    element={
                      <ProtectedRoute>
                        <Orders />
                      </ProtectedRoute>
                    }
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
