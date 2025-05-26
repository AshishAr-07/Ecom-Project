import React, { useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { Link, NavLink } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "../../context/auth";
import { useCart } from "../../context/cart";
import { Badge } from "antd";

const Header = () => {
  const [auth, setAuth] = useAuth();
  const [cart, setCart] = useCart();
  const [dropdown, setDropdown] = useState(false);
  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
    toast.success("Logout successful");
  };

  return (
    <div className="w-full bg-gray-100 shadow-md">
      <header className="max-w-screen-xl mx-auto flex justify-between items-center py-4 px-4">
        <section className="w-full">
          <Link to="/">
            <h1 className="text-3xl font-bold text-blue-700">Ecommerce App</h1>
          </Link>
        </section>
        <nav className="w-full flex justify-center items-center">
          <ul className="flex font-semibold gap-4">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? "text-blue-700 border-b-2 border-blue-700"
                  : "hover:text-blue-700"
              }
            >
              <li className="mx-2">Home</li>
            </NavLink>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                isActive
                  ? "text-blue-700 border-b-2 border-blue-700"
                  : "hover:text-blue-700"
              }
            >
              <li className="mx-2">About</li>
            </NavLink>
            <NavLink
              to="/products"
              className={({ isActive }) =>
                isActive
                  ? "text-blue-700 border-b-2 border-blue-700"
                  : "hover:text-blue-700"
              }
            >
              <li className="mx-2">Products</li>
            </NavLink>
            <NavLink
              to="/contact"
              className={({ isActive }) =>
                isActive
                  ? "text-blue-700 border-b-2 border-blue-700"
                  : "hover:text-blue-700"
              }
            >
              <li className="mx-2">Contact</li>
            </NavLink>
          </ul>
        </nav>
        <div className="w-full flex justify-end items-center gap-6">
          <Badge count={cart?.length} showZero>
            <NavLink to="/cart" className="relative">
              <FaShoppingCart
                className="text-blue-700 cursor-pointer"
                size={24}
              />
            </NavLink>
          </Badge>
          {!auth?.user ? (
            <ul className="style-none w-full flex justify-end items-center gap-3">
              <li className="text-md text-black ">
                <NavLink to="/register">
                  <button className="py-2 px-4 bg-blue-700 text-white rounded-md cursor-pointer hover:bg-blue-800 transition-colors">
                    Register
                  </button>
                </NavLink>
              </li>
              <li>
                <NavLink to="/login">
                  <button className="py-2 px-4 bg-blue-700 text-white rounded-md cursor-pointer hover:bg-blue-800 transition-colors">
                    Login
                  </button>
                </NavLink>
              </li>
            </ul>
          ) : (
            <ul className="relative">
              <li>
                <button
                  onClick={() => setDropdown(!dropdown)}
                  className="py-2 px-4 bg-blue-700 text-white rounded-md cursor-pointer flex items-center gap-2 hover:bg-blue-800 transition-colors"
                >
                  {auth?.user?.role === 1 ? "Admin" : "User"}
                </button>
              </li>
              {dropdown && (
                <ul className="absolute right-0 mt-2 bg-white shadow-lg rounded-md overflow-hidden w-40 z-10 border border-gray-200">
                  <li className="hover:bg-gray-100">
                    <NavLink
                      to={`/dashboard/${
                        auth?.user?.role === 1 ? "admin" : "user"
                      }`}
                      className="block px-4 py-2 text-gray-800"
                    >
                      Dashboard
                    </NavLink>
                  </li>
                  <li className="hover:bg-gray-100">
                    <NavLink
                      onClick={handleLogout}
                      to="/login"
                      className="block px-4 py-2 text-gray-800"
                    >
                      Log out
                    </NavLink>
                  </li>
                </ul>
              )}
            </ul>
          )}
        </div>
      </header>
    </div>
  );
};

export default Header;
