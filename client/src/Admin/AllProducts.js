import axios from "axios";
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import Layout from '../components/Layouts/Layout'
import AdminMenu from '../components/Layouts/AdminMenu'
import { Link } from 'react-router-dom'

const AllProducts = () => { 
    const [product,setProduct] = useState([]) 
    // get All products
    const getAllProduct = async () => {
        try {
            const {data} = await axios.get("/api/v1/product/getproduct")
            console.log(data)
            setProduct(data?.products)
        } catch (error) {
            console.log(error)
            toast.error("Something went wrong in getting all products")
        }
    }

    useEffect (()=>{
        getAllProduct()
    },[])
   
    // delete product
    const handleDelete = async (id) => {
        try {
            const confirm = window.confirm("Are you sure you want to delete this product?");
            if (!confirm) return;
            
            const { data } = await axios.delete(`/api/v1/product/delete-product/${id}`);
            if (data?.success) {
                toast.success("Product deleted successfully");
                getAllProduct(); // Refresh the product list
            } else {
                toast.error("Error in deleting product");
            }
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong while deleting product");
        }
    };

    return (
        <Layout title={"Dashboard - All Products"}>
            <div>
                <div className="flex gap-2">
                    <section className="w-48">
                        <AdminMenu />
                    </section>
                    <section className=" my-4">
                        <h2 className="mb-4 text-2xl font-semibold">All Products</h2>
                        {product?.length === 0 ? (
                            <div className="text-center p-5 bg-gray-100 rounded shadow-sm">
                                <p className="text-gray-500">No products found</p>
                            </div>
                        ) : (
                            <div className="overflow-x-auto shadow-md rounded-lg">
                                <table className="min-w-full bg-white border border-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left font-medium uppercase ">Name</th>
                                            <th className="px-6 py-3 text-left  font-medium  uppercase ">Description</th>
                                            <th className="px-6 py-3 text-left  font-medium uppercase ">Price</th>
                                            <th className="px-6 py-3 text-left font-medium uppercase">Category</th>
                                            <th className="px-6 py-3 text-left font-medium uppercase">Image</th>
                                            <th className="px-6 py-3 text-left  font-medium uppercase ">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200">
                                        {product?.map((p) => (
                                            <tr key={p._id} className="hover:bg-gray-50">
                                                <td className="px-6 py-4 whitespace-nowrap">{p.name}</td>
                                                <td className="px-6 py-4">
                                                    <div className="text-sm text-gray-900 max-w-xs truncate">
                                                        {p.description}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">₹{p.price}</td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-400 text-white">
                                                        {p.category?.name}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <img src={`/api/v1/product/getphoto/${p._id}`} alt={p.name} className="w-12 h-12 object-cover rounded" />
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                    <Link to={`/dashboard/admin/product/${p.slug}`} className="text-blue-600 hover:text-blue-900 mr-3">
                                                        Edit
                                                    </Link>
                                                    <button 
                                                        className="text-red-600 hover:text-red-900"
                                                        onClick={() => handleDelete(p._id)}
                                                    >
                                                        Delete
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </section>
                </div>
            </div>
        </Layout>
    )
}

export default AllProducts