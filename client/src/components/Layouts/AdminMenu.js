import React from "react";
import { NavLink } from "react-router-dom";
import { FaTags, FaBox } from "react-icons/fa";

const AdminMenu = () => {
  return (
    <div className="bg-white">
      <h4 className="bg-gray-800 text-white py-3 px-4 font-bold text-lg">
        Admin Panel
      </h4>
      <ul className="divide-y divide-gray-200">
        <li>
          <NavLink
            to="/dashboard/admin/create-category"
            className={({ isActive }) =>
              `flex items-center px-4 py-3  ${isActive ? "bg-gray-200 text-black" : ""}`
            }
          >
            <FaTags className="mr-3" />
            <span>Create Category</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/dashboard/admin/create-product"
            className={({ isActive }) =>
              `flex items-center px-4 py-3  ${isActive ? "bg-gray-200 text-black" : ""}`
            }
          >
            <FaBox className="mr-3" />
            <span>Create Product</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/dashboard/admin/allproduct"
            className={({ isActive }) =>
              `flex items-center px-4 py-3  ${isActive ? "bg-gray-200 text-black" : ""}`
            }
          >
            <FaBox className="mr-3" />
            <span>All Product</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/dashboard/admin/orders"
            className={({ isActive }) =>
              `flex items-center px-4 py-3  ${isActive ? "bg-gray-200 text-black" : ""}`
            }
          >
            <FaBox className="mr-3" />
            <span>Orders</span>
          </NavLink>
        </li>
        {/* <li>
          <NavLink 
            to="/dashboard/admin" 
            className="flex items-center px-4 py-3 hover:bg-gray-100 transition-colors duration-200 "
          >
            <FaUsers className="mr-3" />
            <span>Users</span>
          </NavLink>
        </li> */}
      </ul>
    </div>
  );
};

export default AdminMenu;
