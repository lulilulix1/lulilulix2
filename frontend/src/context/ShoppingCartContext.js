import { createContext, useContext, useState, useEffect } from "react";

const ShoppingCartContext = createContext();

export function ShoppingCartProvider({ children }) {
  // Ngarko shportën nga localStorage në fillim
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem("orendion_cart");
    return saved ? JSON.parse(saved) : [];
  });

  // Ruaj në localStorage sa herë ndryshon
  useEffect(() => {
    localStorage.setItem("orendion_cart", JSON.stringify(cart));
  }, [cart]);

  // Shto në shportë (nëse ekziston, rrit sasinë)
  const addToCart = (product) => {
    setCart(prev => {
      const existing = prev.find(item => item._id === product._id);
      if (existing) {
        return prev.map(item =>
          item._id === product._id
            ? { ...item, quantity: (item.quantity || 1) + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  // Largo nga shporta
  const removeFromCart = (productId) => {
    setCart(prev => prev.filter(item => item._id !== productId));
  };

  // Përditëso sasinë
  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart(prev =>
      prev.map(item =>
        item._id === productId ? { ...item, quantity } : item
      )
    );
  };

  // Zbraz shportën
  const clearCart = () => {
    setCart([]);
  };

  // Llogarit totalin
  const getCartTotal = () => {
    return cart.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0);
  };

  // Llogarit numrin e artikujve
  const getCartCount = () => {
    return cart.reduce((count, item) => count + (item.quantity || 1), 0);
  };

  return (
    <ShoppingCartContext.Provider value={{
      cart,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      getCartTotal,
      getCartCount
    }}>
      {children}
    </ShoppingCartContext.Provider>
  );
}

export function useShoppingCart() {
  const context = useContext(ShoppingCartContext);
  if (!context) {
    throw new Error("useShoppingCart must be used inside ShoppingCartProvider");
  }
  return context;
}