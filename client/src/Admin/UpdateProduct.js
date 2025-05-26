import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Layout from "../components/Layouts/Layout";
import AdminMenu from "../components/Layouts/AdminMenu";
import axios from "axios";
import toast from "react-hot-toast";

const UpdateProduct = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("");
  const [name, setName] = useState("");
  const [id, setId] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  // const [shipping, setShipping] = useState("");
  const [photo, setPhoto] = useState("");

  // get single product
  const getSingleProduct = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/product/getproduct/${params.slug}`
      );
      setId(data?.product._id);
      setName(data?.product.name);
      setDescription(data?.product.description);
      setPrice(data?.product.price);
      setQuantity(data?.product.quantity);
      setCategory(data?.product.category._id);
      setPhoto(data?.product.photo);

      // setShipping(data?.product.shipping);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in getting single product");
    }
  };

  useEffect(() => {
    getSingleProduct();
  }, []);
  //get all category
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
  }, []);

  // create handleUpdate function
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("quantity", quantity);
      productData.append("category", category);
      photo && productData.append("photo", photo);

      const { data } = await axios.put(
        `/api/v1/product/update-product/${id}`,
        productData
      );
      if (data?.success) {
        toast.success("Product updated successfully");
        navigate("/dashboard/admin/allproduct");
      } else {
        toast.error(data?.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <Layout title={"Dashboard - Update Category"}>
      <div>
        <div className="flex gap-2">
          <section className="w-48">
            <AdminMenu />
          </section>
          <section className="pl-12 pt-2">
            {/* update form */}
            <div className=" p-8 my-8 mx-auto border rounded-xl flex flex-col gap-4 shadow-md bg-white">
              <span>
                <label className="block text-lg font-medium text-gray-700 mb-2">
                  Product Category
                </label>
                <select
                  className="w-full border border-gray-300 py-2 px-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onChange={(e) => setCategory(e.target.value)}
                  value={category}
                >
                  <option>Select</option>
                  {categories?.map((c) => (
                    <option key={c._id} value={c._id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </span>
              <span>
                <label className="block text-lg font-medium text-gray-700 mb-2">
                  Product Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full border border-gray-300 py-2 px-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter Product Name"
                />
              </span>

              <span>
                <label className="block text-lg font-medium text-gray-700 mb-2">
                  Product Description
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full border border-gray-300 py-2 px-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter Product Description"
                  rows="3"
                ></textarea>
              </span>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <span>
                  <label className="block text-lg font-medium text-gray-700 mb-2">
                    Price
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-2 text-gray-500">
                      ₹
                    </span>
                    <input
                      type="number"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      className="w-full border border-gray-300 py-2 pl-8 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </span>

                <span>
                  <label className="block text-lg font-medium text-gray-700 mb-2">
                    Product Quantity
                  </label>
                  <input
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    type="number"
                    className="w-full border border-gray-300 py-2 px-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </span>
              </div>

              <span>
                <label className="block text-lg font-medium text-gray-700 mb-2">
                  {photo ? photo.name : "Upload Photo"}
                  <input
                    type="file"
                    name="photo"
                    accept="image/*"
                    onChange={(e) => setPhoto(e.target.files[0])}
                    hidden
                    id="product-image"
                  />
                </label>

                <div>
                  {photo ? (
                    <div>
                      <img
                        src={URL.createObjectURL(photo)}
                        alt="product photo"
                        className="w-32 h-32 object-cover mt-2"
                      />
                    </div>
                  ) : (
                    <div>
                      <img
                        src={`/api/v1/product/product-photo/${id}`}
                        alt="product photo "
                        className="w-32 h-32 object-cover mt-2"
                      />
                    </div>
                  )}
                </div>
              </span>

              <button
                className="mt-4 bg-blue-700 py-2 rounded-md text-white font-medium cursor-pointer hover:bg-blue-800 transition-colors"
                type="submit"
                onClick={handleUpdate}
              >
                Update
              </button>
            </div>
          </section>
        </div>
      </div>
    </Layout>
  );
};

export default UpdateProduct;
