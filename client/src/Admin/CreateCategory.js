import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Layout from "../components/Layouts/Layout";
import AdminMenu from "../components/Layouts/AdminMenu";
import CategoryForm from "../components/Form/CategoryForm";
import {Modal} from "antd";
const CreateCategory = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(null);
  const [updatedName, setUpdatedName] = useState("");

  // Form handle Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/api/v1/category/create-category", {
        name,
      });
      if (data?.success) {
        toast.success(`${name} is created successfully`);
        setName("");
        // getAllCategory();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  // get All Category
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get("/api/v1/category/getcategory");
      if (data?.success) {
        setCategories(data?.category);
      }
      else{
        toast.error(data?.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in getting all category");
    }
  };

  // update category

  const handelUpdate = async (e) => {
    e.preventDefault();
    try {
      const {data} = await axios.put(`/api/v1/category/update-category/${selected._id}`,{name:updatedName});
      if(data?.success){
        toast.success(`${updatedName} is updated successfully`);
         setSelected(null);
         setUpdatedName("");
         setVisible(false);
         getAllCategory();
      }
      else{
        toast.error(data?.message);
      }
    } catch (error) {
      toast.error("Something went wrong in updating category");
    }
  }

  //delete Category
  const handleDelete = async (pId) => {
    try {
      const {data} = await axios.delete(`/api/v1/category/delete-category/${pId}`);
      if(data?.success){
        toast.success("Category is deleted successfully");
      }
      else{
        toast.error(data?.message);
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  }

  useEffect(() => {
    getAllCategory();
    
  }, [categories]);

  return (
    <Layout title={"Dashboard - Create Category"}>
      <div>
        <div className="flex gap-2">
          <section className="w-48">
            <AdminMenu />
          </section>
          <section className="pl-12 pt-2">
            <h1 className="text-3xl">Manage Category</h1>
            <div className="py-4">
              <CategoryForm
                handleSubmit={handleSubmit}
                value={name}
                setValue={setName}
              />
            </div>
            <h1 className="py-2 text-2xl font-semibold">All Category</h1>
            <div className="overflow-x-auto mt-4">
              <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="py-3 px-6 text-left font-semibold border-b">Category Name</th>
                    <th className="py-3 px-6 text-right border-b">Action Buttons</th>
                  </tr>
                </thead>
                <tbody>
                  {categories?.map((c) => (
                    <tr key={c._id} className="hover:bg-gray-50 border-b border-gray-200">
                      <td className="py-3 px-6 text-left">{c.name}</td>
                      <td className="py-3 px-6 text-right">
                        <button 
                          onClick={() => {
                            setVisible(true);
                            setUpdatedName(c.name);
                            setSelected(c);
                          }} 
                          className="bg-blue-700 text-white py-1 px-3 rounded-md mr-2"
                        >
                          Edit
                        </button>
                        <button 
                          onClick={() => {
                            handleDelete(c._id);
                          }} 
                          className="bg-red-700 text-white py-1 px-3 rounded-md "
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <Modal 
            onCancel={()=> setVisible(false)}
            visible={visible}
            footer={null}>
              <CategoryForm
              value={updatedName}
              setValue={setUpdatedName}
              handleSubmit={handelUpdate}
              />
            </Modal>
          </section>
        </div>
      </div>
    </Layout>
  );
};

export default CreateCategory;
