import { useState, useContext, createContext, useEffect } from "react";

const CartContext = createContext();
const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    let exisitngCartItem = localStorage.getItem("cart");
    if (exisitngCartItem) setCart(JSON.parse(exisitngCartItem));
  }, []);

  return (
    <CartContext.Provider value={[ cart, setCart] }>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;

//custom hook
const useCart = () => useContext(CartContext);

export { useCart, CartProvider };
