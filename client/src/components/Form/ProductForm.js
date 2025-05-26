import React from "react";

const ProductForm = () => {
  return (
    <>
      <form >
        <div className="max-w-screen-lg p-8 mx-auto border rounded-xl flex flex-col gap-4 shadow-md bg-white">
          <span>
            <label className="block text-lg font-medium text-gray-700 mb-2">Product Name</label>
            <input
              type="text"
              className="w-full border border-gray-300 py-2 px-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter Product Name"
            />
          </span>
          
          <span>
            <label className="block text-lg font-medium text-gray-700 mb-2">Product Description</label>
            <textarea
              className="w-full border border-gray-300 py-2 px-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter Product Description"
              rows="3"
            ></textarea>
          </span>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <span>
              <label className="block text-lg font-medium text-gray-700 mb-2">Price</label>
              <div className="relative">
                <span className="absolute left-3 top-2 text-gray-500">₹</span>
                <input 
                  type="number" 
                  className="w-full border border-gray-300 py-2 pl-8 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" 
                />
              </div>
            </span>
            
            <span>
              <label className="block text-lg font-medium text-gray-700 mb-2">Product Quantity</label>
              <input 
                type="number" 
                className="w-full border border-gray-300 py-2 px-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" 
              />
            </span>
          </div>
          
          <span>
            <label className="block text-lg font-medium text-gray-700 mb-2">Product Category</label>
            <input 
                type="text" 
                className="w-full border border-gray-300 py-2 px-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" 
                placeholder="Enter Product Category"
              />
          </span>
          
          <span>
            <label className="block text-lg font-medium text-gray-700 mb-2">Product Image</label>
            <div className="border-2 border-dashed border-gray-300 py-6 px-3 rounded-md text-center">
              <input
                type="file"
                className="hidden"
                id="product-image"
              />
              <label  className="cursor-pointer text-blue-700 hover:text-blue-800">
                Click to upload image or drag and drop
              </label>
            </div>
          </span>
          
          <button
            className="mt-4 bg-blue-700 py-2 rounded-md text-white font-medium cursor-pointer hover:bg-blue-800 transition-colors"
            type="submit"
          >
            Submit
          </button>
        </div>
      </form>
    </>
  );
};

export default ProductForm;
