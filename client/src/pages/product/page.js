import axios from 'axios'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

export default function Page() {
const [product,setProduct] = useState([])

  // getAllProduct
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

  useEffect(()=>{
    getAllProduct()
  })
  return (
    <div className='max-w-screen-lg lg:max-w-screen-xl mx-auto py-12'>
    <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
{
  product?.map((p,i)=>(
    <div  key={i} className='p-6'>
      <img src={p?.photo} alt={p?.name} className='w-full h-64 object-cover rounded-md' />
      <h2 className='text-lg font-semibold'>{p?.name}</h2>
      <p className='text-gray-600'>{p?.description}</p>
      <p className='text-xl font-bold'>${p?.price}</p>
     
    </div>
  ))
}
    </div>
    </div>
  )
}
