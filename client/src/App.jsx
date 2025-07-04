import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import AuthLayout from "./components/auth/AuthLayout";
import AuthLogin from "./pages/auth/AuthLogin";
import AuthRegister from "./pages/auth/AuthRegister";
import AdminLayout from "./components/admin-view/AdminLayout";
import AdminDashboard from "./pages/admin-view/AdminDashboard";
import AdminProducts from "./pages/admin-view/AdminProducts";
import AdminOrders from "./pages/admin-view/AdminOrders";
import AdminFeatures from "./pages/admin-view/AdminFeatures";
import ShoppingLayout from "./components/shopping-view/ShoppingLayout";
import NotFoundPage from "./pages/NotFoundPage";
import { ShoppingHome } from "./pages/shopping-view/ShoppingHome";
import ShoppingCheckout from "./pages/shopping-view/ShoppingCheckout";
import ShoppingAccount from "./pages/shopping-view/ShoppingAccount";
import ShoppingListings from "./pages/shopping-view/ShoppingListings";
import CheckAuth from "./components/CheckAuth";
import UnAuth from "./pages/UnAuth";
import { useDispatch, useSelector } from "react-redux";
import { checkAuth } from "./store/authSlice";
import ShoppingOrderPlaced from "./pages/shopping-view/ShoppingOrderPlaced";
import ShoppingSearch from "./pages/shopping-view/ShoppingSearch";

export const App = () => {
  const { user, isAuthenticated, isLoading } = useSelector(
    (state) => state.auth
  );

  const dispatch=useDispatch();

  useEffect(()=>{
    dispatch(checkAuth())
  },[dispatch])
  return (
    <div className="flex flex-col overflow-hidden bg-white">
      <Routes>
      <Route
          path="/"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <AuthLayout />
            </CheckAuth>
          }
        >
        </Route>
        <Route
          path="/auth"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <AuthLayout />
            </CheckAuth>
          }
        >
          <Route path="login" element={<AuthLogin />} />
          <Route path="register" element={<AuthRegister />} />
        </Route>
        <Route
          path="/admin"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <AdminLayout />
            </CheckAuth>
          }
        >
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="products" element={<AdminProducts />} />
          <Route path="orders" element={<AdminOrders />} />
          <Route path="features" element={<AdminFeatures />} />
        </Route>
        <Route
          path="/shop"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <ShoppingLayout />
            </CheckAuth>
          }
        >
          <Route path="home" element={<ShoppingHome />} />
          <Route path="listing" element={<ShoppingListings />} />
          <Route path="search" element={<ShoppingSearch/>}/>
          <Route path="checkout" element={<ShoppingCheckout />} />
          <Route path="account" element={<ShoppingAccount />} />
          <Route path="order-placed" element={<ShoppingOrderPlaced/>}/>
        </Route>
        <Route path="/unauth-page" element={<UnAuth />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
};
