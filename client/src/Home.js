import React, { useEffect, useState } from "react";
import Layout from "./components/Layouts/Layout";
import { useNavigate } from "react-router-dom";
import { Checkbox, Radio } from "antd";
import { Prices } from "./components/Prices";
import axios from "axios";
import toast from "react-hot-toast";
import { useCart } from "./context/cart";

function Home() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [cart, setCart] = useCart();

  // get All Categories
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get("/api/v1/category/getcategory");
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllCategory();
    getTotal();
  });

  // get all products
  const getAllProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/api/v1/product/product-list/${page}`);
      if (data?.success) {
        setLoading(false);
        setProducts(data?.products);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  // Get Total Count
  const getTotal = async () => {
    try {
      const { data } = await axios.get("/api/v1/product/product-count");
      setTotal(data?.total);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (page === 1) return;
    loadMore();
  }, [page]);

  // Load More
  const loadMore = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/api/v1/product/product-list/${page}`);
      if (data?.success) {
        setLoading(false);
        setProducts([...products, ...data?.products]);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  // Filter By Category
  const handleFilter = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    setChecked(all);
  };

  useEffect(() => {
    if (!checked.length || !radio.length) getAllProducts();
  }, [checked.length, radio.length]);

  useEffect(() => {
    if (checked.length || radio.length) filterProduct();
  }, [checked, radio]);

  // Get Filtered Product
  const filterProduct = async () => {
    try {
      const { data } = await axios.post("/api/v1/product/product-filters", {
        checked,
        radio,
      });
      if (data?.success) {
        setProducts(data?.products);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Layout title="Home - Ecommerce App">
        <div className="grid grid-cols-1 md:grid-cols-6 gap-6">
          <section className="col-span-1 bg-white p-4 rounded-lg shadow-md h-fit">
            <div className="flex flex-col gap-2">
              <h1 className="text-lg font-semibold mb-3 text-gray-800 border-b pb-2">
                Filter By Category
              </h1>
              <div className="flex flex-col gap-2 mt-3">
                {categories?.map((c) => (
                  <Checkbox
                    key={c._id}
                    onChange={(e) => handleFilter(e.target.checked, c._id)}
                    className="hover:bg-gray-50 py-1 px-1 rounded transition-colors"
                  >
                    <span className="text-gray-700">{c.name}</span>
                  </Checkbox>
                ))}
              </div>
              <h1 className="text-lg font-semibold my-3 text-gray-800 border-b pb-2">
                Filter By Price
              </h1>
              <div className="flex flex-col gap-2 mt-3">
                <Radio.Group onChange={(e) => setRadio(e.target.value)}>
                  {Prices?.map((p) => (
                    <div key={p._id}>
                      <Radio
                        value={p.array}
                        className="hover:bg-gray-50 py-1 px-1 rounded transition-colors"
                      >
                        <span className="text-gray-700">{p.name}</span>
                      </Radio>
                    </div>
                  ))}
                </Radio.Group>
              </div>
              <div>
                <button
                  onClick={() => window.location.reload()}
                  className="mt-4 px-4 py-2 rounded-md bg-red-600 text-white"
                >
                  <span>Reset Filter</span>
                </button>
              </div>
            </div>
          </section>
          <section className="col-span-5">
            <h1 className="w-full text-4xl mb-6 text-center">All Products</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {products?.map((p) => (
                <div
                  key={p._id}
                  className="flex flex-col gap-2  shadow-sm rounded-lg p-4"
                >
                  <img
                    src={`/api/v1/product/getphoto/${p._id}`}
                    alt={p.name}
                    className="w-40 h-40 rounded-md"
                  />
                  <h2 className="text-lg font-semibold mt-2">{p.name}</h2>
                  <p className="text-gray-600">
                    {p.description.substring(0, 60)}...
                  </p>
                  <span className="text-xl font-bold">
                    {p.price.toLocaleString("en-IN", {
                      style: "currency",
                      currency: "USD",
                    })}
                  </span>
                 <div className="flex gap-2 mt-4">
                 <button
                    onClick={() => navigate(`/product/${p.slug}`)}
                    className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md"
                  >
                    View Details
                  </button>
                  <button
                    onClick={() => {
                      setCart([...cart, p]);
                      localStorage.setItem(
                        "cart",
                        JSON.stringify([...cart, p])
                      );
                      toast.success("Item Added to Cart");
                    }}
                    className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md"
                  >
                    Add to Cart
                  </button>
                 </div>
                </div>
              ))}
            </div>
            {/* Main content  */}
          </section>
        </div>
      </Layout>
    </>
  );
}

export default Home;
