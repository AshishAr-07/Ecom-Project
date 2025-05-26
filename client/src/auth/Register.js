import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";


export default function RegisterForm() {
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [answer, setAnswer] = useState("");
  const navigate = useNavigate();

  // form function
  const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const res = await axios.post("/api/v1/auth/register",{username,email,password,phone,address,answer});
    if (res && res.data.success){
      toast.success(res.data && res.data.message);
      navigate("/login");
    }
    else {
      toast.success(res.data.message);
    }
  } catch (error) {
    console.log(error)
    toast.error("Something went wrong");
  }
  }


  return (
   
      <div className="max-w-2xl mx-auto py-12">
     <form onSubmit={handleSubmit} className="p-8 border rounded-xl py-6">
      <span className="flex flex-col gap-2 mb-2">
        <label>Name</label>
        <input value={username} onChange={(e)=> setUserName(e.target.value)} className="py-2 border border-gray-300 rounded-xl" type="text" name="username" />
      </span>
      <span className="flex flex-col gap-2 mb-2">
        <label>Email</label>
        <input value={email} onChange={(e)=> setEmail(e.target.value)} className="py-2 border border-gray-300 rounded-xl" type="email" name="email" />
      </span>
      <span className="flex flex-col gap-2 mb-2">
        <label>Password</label>
        <input value={password} onChange={(e)=> setPassword(e.target.value)} className="py-2 border border-gray-300 rounded-xl" type="password" name="password" />
      </span>
      <span className="flex flex-col gap-2 mb-2">
        <label>Phone</label>
        <input value={phone} onChange={(e)=> setPhone(e.target.value)} className="py-2 border border-gray-300 rounded-xl" type="number" name="phone" />
      </span>
      <span className="flex flex-col gap-2 mb-2">
        <label>Address</label>
        <input value={address} onChange={(e)=> setAddress(e.target.value)} className="py-2 border border-gray-300 rounded-xl" type="text" name="address" />
      </span>
      <span className="flex flex-col gap-2 mb-2">
        <label>Answer</label>
        <input value={answer} onChange={(e)=> setAnswer(e.target.value)} className="py-2 border border-gray-300 rounded-xl" type="text" name="answer" />
      </span>
      <button type="submit" className="w-full flex justify-center bg-blue-700 py-2 rounded-xl text-white font-semibold mt-2">Submit</button>
    </form>
   </div>
  
  );
}
