"use client";

import { useState, useEffect, useRef } from "react"; // Add useRef import
import { useAuth } from "../../context/auth";
import { useCart } from "../../context/cart";
import { useNavigate } from "react-router-dom";
import dropin from "braintree-web-drop-in"; // Keep correct import
import axios from "axios";
import toast from "react-hot-toast";
import Layout from "../../components/Layouts/Layout";

const CartPage = () => {
  const [auth, setAuth] = useAuth();
  const [cart, setCart] = useCart();
  const [clientToken, setClientToken] = useState("");
  const [dropinInstance, setDropinInstance] = useState(null);
  const [loading, setLoading] = useState(false);
  const dropinContainerRef = useRef(null); // Add ref for the container
  const navigate = useNavigate();

  // total price
  const totalPrice = () => {
    try {
      let total = 0;
      cart?.map((item) => {
        total = total + item.price;
      });
      return total.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
      });
    } catch (error) {
      console.log(error);
    }
  };

  //detele item
  const removeCartItem = (pid, index) => {
    try {
      const myCart = [...cart];
      // Use the provided index instead of finding it again
      myCart.splice(index, 1);
      setCart(myCart);
      localStorage.setItem("cart", JSON.stringify(myCart));
    } catch (error) {
      console.log(error);
    }
  };

  //get payment gateway token
  const getToken = async () => {
    try {
      const { data } = await axios.get("/api/v1/product/braintree/token");
      setClientToken(data?.clientToken);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getToken();
  }, [auth?.token]);

  // Initialize Braintree Drop-in UI when clientToken is available
  useEffect(() => {
    // Only proceed if we have the required data
    if (
      clientToken &&
      auth?.token &&
      cart?.length > 0 &&
      dropinContainerRef.current
    ) {
      // Destroy any existing instance first
      if (dropinInstance) {
        dropinInstance
          .teardown()
          .catch((err) => console.error("Error tearing down dropin:", err));
      }

      // Initialize dropin
      dropin
        .create({
          authorization: clientToken,
          container: dropinContainerRef.current,
          paypal: {
            flow: "vault",
          },
        })
        .then((instance) => {
          console.log("DropIn instance created");
          setDropinInstance(instance);
        })
        .catch((error) => {
          console.error("Error initializing dropin:", error);
          toast.error("Could not initialize payment system");
        });
    }

    // Cleanup function
    return () => {
      if (dropinInstance) {
        dropinInstance
          .teardown()
          .catch((err) => console.error("Error tearing down dropin:", err));
      }
    };
  }, [clientToken, auth?.token, cart?.length]);

  //handle payments
  const handlePayment = async () => {
    try {
      if (!dropinInstance) {
        toast.error("Payment system not initialized");
        return;
      }

      setLoading(true);

      try {
        const paymentMethodResponse =
          await dropinInstance.requestPaymentMethod();
        const { nonce } = paymentMethodResponse;

        const { data } = await axios.post("/api/v1/product/braintree/payment", {
          nonce,
          cart,
        });

        setLoading(false);
        localStorage.removeItem("cart");
        setCart([]);
        navigate("/dashboard/admin/orders");
        toast.success("Payment Completed Successfully");
      } catch (paymentError) {
        console.error("Payment method error:", paymentError);
        setLoading(false);
        toast.error("Could not process payment");
      }
    } catch (error) {
      console.log("Payment error:", error);
      setLoading(false);
      toast.error("Payment failed. Please try again.");
    }
  };

  return (
    <>
      <Layout className="container mx-auto p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <section className="bg-white p-5 rounded-lg shadow-sm">
            <h1 className="text-xl font-semibold mb-2">
              {!auth?.user
                ? "Hello Guest"
                : `Hello ${auth?.token && auth?.user?.name}`}
            </h1>
            <p className="text-gray-600 mb-4">
              {cart?.length
                ? `you have ${cart.length} item in your cart${
                    auth?.token ? "" : "please login in to checkout"
                  }`
                : "Your cart is empty"}
            </p>
            <div className="space-y-4">
              {/* Use index as part of the key to ensure uniqueness */}
              {cart?.map((p, index) => (
                <section
                  key={`${p._id}-${index}`}
                  className="border rounded-md p-3 flex justify-between items-center"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={`/api/v1/product/getphoto/${p._id}`}
                      alt={p.name}
                      className="w-20 h-20 object-cover rounded"
                    />
                    <div>
                      <h3 className="font-medium">{p.name}</h3>
                      <p className="text-gray-600">${p.price}</p>
                    </div>
                  </div>
                  <div>
                    <button
                      className="bg-red-700 hover:bg-red-800 px-4 py-2 text-white rounded transition duration-200"
                      onClick={() => removeCartItem(p._id, index)}
                    >
                      Remove
                    </button>
                  </div>
                </section>
              ))}
            </div>
          </section>
          <section className="bg-white p-5 rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold mb-3">Cart Summary</h2>
            <p className="text-gray-600 mb-4">Total | Checkout | Payment</p>
            <h4 className="text-lg font-medium text-gray-800 mb-4">
              Total : {totalPrice()}
            </h4>
            {auth?.user?.address ? (
              <>
                <div className="border-t border-gray-200 pt-4 mb-4">
                  <h4 className="text-md font-medium mb-2">Current Address</h4>
                  <p className="text-gray-600 mb-3">{auth?.user?.address}</p>
                  <button
                    onClick={() => navigate("/dashboard/user/profile")}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition duration-200"
                  >
                    Update Address
                  </button>
                </div>
              </>
            ) : (
              <>
                <button
                  onClick={() =>
                    navigate("/login", {
                      state: "/cart",
                    })
                  }
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded transition duration-200 w-full mb-4"
                >
                  Please Login to Checkout
                </button>
              </>
            )}

            <div className="mt-4">
              {!clientToken || !auth?.token || !cart?.length ? (
                ""
              ) : (
                <div>
                  {/* Replace the <dropIn> component with this div */}
                  <div id="dropin-container" ref={dropinContainerRef}></div>

                  <button
                    onClick={handlePayment}
                    disabled={loading || !dropinInstance}
                    className={`${
                      loading || !dropinInstance
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-blue-600 hover:bg-blue-700"
                    } text-white px-6 py-2 rounded w-full mt-4 transition duration-200`}
                  >
                    {loading ? "Processing ..." : "Make Payment"}
                  </button>
                </div>
              )}
            </div>
          </section>
        </div>
      </Layout>
    </>
  );
};

export default CartPage;
