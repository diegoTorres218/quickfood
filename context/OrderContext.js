import { createContext, useContext, useState } from "react";

const OrderContext = createContext();

export function OrderProvider({ children }) {
  const [orders, setOrders] = useState([]);
  const [receipt, setReceipt] = useState(null);

  const addOrder = (order) => {
    setOrders([order, ...orders]);
    setReceipt(order);
  };

  const clearReceipt = () => setReceipt(null);

  return (
    <OrderContext.Provider value={{ orders, addOrder, receipt, clearReceipt }}>
      {children}
    </OrderContext.Provider>
  );
}

export const useOrders = () => useContext(OrderContext);
