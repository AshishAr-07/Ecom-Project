import React, { useEffect, useState } from "react";
import { useAuth } from "../context/auth";
import { Layout } from "antd";
import axios from "axios";
import AdminMenu from "../components/Layouts/AdminMenu";
import moment from "moment";

const Order = () => {
  const [orders, setOrders] = useState([]);
  const [auth, setAuth] = useAuth();

  const getOrders = async () => {
    try {
      const { data } = await axios.get("/api/v1/auth/orders");
      setOrders(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (auth?.token) getOrders();
    console.log(orders);
  }, [auth?.token]);

  return (
    <Layout title={"Dashboard - All Products"}>
      <div>
        <div className="flex gap-2">
          <section className="w-48">
            <AdminMenu />
          </section>
          <section className=" my-4">
            <h2 className="mb-4 text-2xl font-semibold">My Orders</h2>
            {orders?.length === 0 ? (
              <div className="text-center p-5 bg-gray-100 rounded shadow-sm">
                <p className="text-gray-500">No orders found</p>
              </div>
            ) : (
              <div className="overflow-x-auto shadow-md rounded-lg">
                {orders.map((order, i) => (
                  <div key={order._id} className="mb-6">
                    {/* Order summary table with proper table structure */}
                    <table className="min-w-full bg-white divide-y divide-gray-200">
                      <tbody className="bg-white">
                        <tr className="bg-white">
                          <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                            S.No
                          </th>
                          <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                            Order Id
                          </th>
                          <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                            Status
                          </th>
                          <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                            Date
                          </th>
                          <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                            Buyer
                          </th>
                          <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                            Payment
                          </th>
                          <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                            Quantity
                          </th>
                        </tr>
                        <tr>
                          <td className="px-4 py-2">{i + 1}</td>
                          <td className="px-4 py-2">{order._id}</td>
                          <td className="px-4 py-2">{order?.status}</td>
                          <td className="px-4 py-2">
                            {moment(order?.createAt).fromNow()}
                          </td>
                          <td className="px-4 py-2">{order?.buyer?.name}</td>
                          <td className="px-4 py-2">
                            {order?.payment?.success ? "Success" : "Failed"}
                          </td>
                          <td className="px-4 py-2">
                            {order?.products?.length}
                          </td>
                        </tr>
                      </tbody>
                    </table>

                    {/* Products section OUTSIDE of the table */}
                    <div className="bg-white pt-2">
                      {order?.products?.map((p) => (
                        <section
                          key={p._id}
                          className="flex item-center gap-4 p-4 border-b border-gray-100 rounded mb-2"
                        >
                          <div className="flex items-center gap-3 p-4">
                            <img
                              src={`/api/v1/product/getphoto/${p._id}`}
                              alt={p.name}
                              className="w-10 h-10 object-cover rounded"
                            />
                          </div>
                          <div>
                            <p>{p.name}</p>
                            <p>{p.description?.substring(0, 30)}</p>
                            <p>Price: {p.price}</p>
                          </div>
                        </section>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>
      </div>
    </Layout>
  );
};

export default Order;
