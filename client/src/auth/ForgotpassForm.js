import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/auth";

export default function ForgotpassForm() {
  const [email, setEmail] = useState("");
  const [newpassword, setNewPassword] = useState("");
  const [auth, setAuth] = useAuth();
  const [answer, setAnswer] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/v1/auth/forgotpassword", {
        email,
        answer,
        password: newpassword,
      });
      if (res && res.data.success) {
        toast.success(res.data && res.data.message);
        setAuth({
          ...auth,
          password: res.data.newpassword,
        });
        navigate("/login");
      }
    } catch (error) {
        console.log(error);
        toast.error("Something went wrong");
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-12">
      <form onSubmit={handleSubmit} className="p-8 border rounded-xl py-6">
        <h1 className="w-full text-center text-3xl mb-4">
          Reset Your Password
        </h1>
        <span className="flex flex-col gap-2 mb-2">
          <label>Email</label>
          <input
            className="py-2 border border-gray-300 rounded-xl"
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </span>
        <span className="flex flex-col gap-2 mb-2">
          <label>Answer</label>
          <input
            className="py-2 border border-gray-300 rounded-xl"
            type="text"
            name="answer"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
          />
        </span>
        <span className="flex flex-col gap-2 mb-2">
          <label>Set your Password</label>
          <input
            className="py-2 border border-gray-300 rounded-xl"
            type="password"
            name="password"
            value={newpassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </span>

        <button
          type="submit"
          className="w-full flex justify-center bg-blue-700 py-2 rounded-xl text-white font-semibold mt-2"
        >
          Reset my password
        </button>
      </form>
    </div>
  );
}
