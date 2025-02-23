import React from "react";
import { Routes, Route } from "react-router-dom";
import AuthLayout from "./components/auth/AuthLayout";
import AuthLogin from "./pages/auth/AuthLogin";
import AuthRegister from "./pages/auth/AuthRegister";
import AdminLayout from './components/admin-view/AdminLayout'
import AdminDashboard from "./pages/admin-view/AdminDashboard";
import AdminProducts from "./pages/admin-view/AdminProducts";
import AdminOrders from "./pages/admin-view/AdminOrders";
import AdminFeatures from "./pages/admin-view/AdminFeatures";

export const App = () => {
  return (
    <div className="flex flex-col overflow-hidden bg-white">
      <Routes>
        <Route path="/auth" element={<AuthLayout />}>
          <Route path="login" element={<AuthLogin />} />
          <Route path="register" element={<AuthRegister />} />
        </Route>
        <Route path="/admin" element={<AdminLayout/>}>
          <Route path="dashboard" element={< AdminDashboard />} />
          <Route path="products" element={<AdminProducts />} />
          <Route path="orders" element={< AdminOrders/>} />
          <Route path="features" element={<AdminFeatures />} />
        </Route>
      </Routes>
    </div>
  );
};
