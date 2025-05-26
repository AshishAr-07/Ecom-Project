import React, { useState } from "react";
import AdminMenu from "../components/Layouts/AdminMenu";
import Layout from "../components/Layouts/Layout";
import { useAuth } from "../context/auth";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const [auth,setAuth] = useAuth();
  const navigate = useNavigate();
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState(auth?.user?.name || "");
  const [email, setEmail] = useState(auth?.user?.email || "");
  const [phone, setPhone] = useState(auth?.user?.phone || "");
  const [address, setAddress] = useState(auth?.user?.address || "");
  const [password, setPassword] = useState("");

  const handleChanges = async (e) => {
    e.preventDefault();
    try {
      const updatedData = new FormData();
      updatedData.append("name", name);
      updatedData.append("email", email);
      updatedData.append("phone", phone);
      updatedData.append("address", address);
      updatedData.append("password", password);

      const { data } = await axios.put("/api/v1/auth/profile", updatedData);
      if (data?.success) {
        setShowForm(false);
        toast.success(data?.message);
        setAuth({
          ...auth,
          user: null ,
          token : "",
        })
        localStorage.removeItem("auth");
        navigate("/login");
      } else {
        toast.error("Profile update failed");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong while fetching profile data");
    }
  };

  return (
    <Layout>
      <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
        <section>
          <AdminMenu />
        </section>
        <section className="col-span-1 md:col-span-5">
          <div className="flex flex-col gap-2">
            <h1>Admin Name : {auth?.user?.name}</h1>
            <h2>Admin Email : {auth?.user?.email}</h2>
            <h3>Admin Contact : {auth?.user?.phone}</h3>
            <h4>Admin Address : {auth?.user?.address}</h4>

            <button
              className="my-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors w-32"
              onClick={() => setShowForm(!showForm)}
            >
              {showForm ? "Cancel" : "Update Profile"}
            </button>

            {showForm && (
              <div className="bg-white p-4 rounded shadow-md mt-4 max-w-md">
                <h3 className="text-lg font-medium mb-4">Update Profile</h3>
                <form onSubmit={handleChanges} className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Name
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      defaultValue={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Password
                    </label>
                    <input
                      type="password"
                      placeholder="Enter new password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phone
                    </label>
                    <input
                      type="text"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Address
                    </label>
                    <input
                      type="text"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
                  >
                    Save Changes
                  </button>
                </form>
              </div>
            )}
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
