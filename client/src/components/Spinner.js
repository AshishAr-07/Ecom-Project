import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function Spinner({ path = "login" }) {
  const [count, setCount] = useState(3);
  const navigate = useNavigate();
  const location = useLocation();

useEffect(()=>{
  const interval = setInterval(()=>{
    setCount((prevValue)=> --prevValue);
  },1000);
  count ===0 && navigate(`/${path}`,
    {
      state: location.pathname,
    }
  );
  return ()=>clearInterval(interval);
})

  return (
    <div
      className=" flex flex-col justify-center item-center "
      style={{ height: "100vh" }}
    >
      <h1 className="text-center">redirecting to you in {count} second</h1>
      <div className="w-8 h-8 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin" role="status">
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
}
