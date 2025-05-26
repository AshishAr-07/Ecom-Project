import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import About from "./pages/about/page";
import Contact from "./pages/contact/page";
import Product from "./pages/product/page";
import Register from "./pages/register/page";
import Login from "./pages/login/page";
import ForgotPass from "./pages/forgotpass/page";
import AdminDashboard from "./Admin/AdminDashboard";
import UserDashboard from "./Admin/UserDashboard";
import PrivateRoute from "./components/Routes/PrivateRoute";
import AdminRoute from "./components/Routes/AdminRoute";
import CreateCategory from "./Admin/CreateCategory";
import CreateProduct from "./Admin/CreateProduct";
import AllProducts from "./Admin/AllProducts";
import UpdateProduct from "./Admin/UpdateProduct";
import CartRoute from "./pages/cart/page";
import Orders from "./Admin/Order";

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/products" element={<Product />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot" element={<ForgotPass />} />
        <Route path="/cart" element={<CartRoute />}></Route>
        <Route path="/dashboard" element={<AdminRoute />}>
          <Route path="admin" element={<AdminDashboard />} />
          <Route path="admin/create-category" element={<CreateCategory />} />
          <Route path="admin/create-product" element={<CreateProduct />} />
          <Route path="admin/product/:slug" element={<UpdateProduct />} />
          <Route path="admin/allproduct" element={<AllProducts />} />
          <Route path="admin/orders" element={<Orders />} />
        </Route>
        <Route path="/dashboard" element={<PrivateRoute />}>
          <Route path="user" element={<UserDashboard />} />
        </Route>
      </Routes>
    </>
  );
}
