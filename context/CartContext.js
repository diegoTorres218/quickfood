import { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  /* ============================
     AGREGAR ITEM
  ============================ */
  const addItem = (product) => {
    setCart((prev) => {
      const exists = prev.find((item) => item.id === product.id);

      if (exists) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, qty: item.qty + 1 }
            : item
        );
      }

      return [...prev, { ...product, qty: 1 }];
    });
  };

  /* ============================
     AUMENTAR CANTIDAD
  ============================ */
  const increaseQty = (id) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, qty: item.qty + 1 } : item
      )
    );
  };

  /* ============================
     DISMINUIR CANTIDAD
  ============================ */
  const decreaseQty = (id) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id && item.qty > 1
          ? { ...item, qty: item.qty - 1 }
          : item
      )
    );
  };

  /* ============================
     ELIMINAR ITEM
  ============================ */
  const removeItem = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  /* ============================
     TOTAL DE ITEMS
  ============================ */
  const getItemCount = () => {
    return cart.reduce((sum, item) => sum + item.qty, 0);
  };

  /* ============================
     TOTAL EN DINERO
  ============================ */
  const getTotal = () => {
    return cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  };

  /* ============================
     VACIAR CARRITO
  ============================ */
  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addItem,
        increaseQty,
        decreaseQty,
        removeItem,
        getItemCount,
        getTotal,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
