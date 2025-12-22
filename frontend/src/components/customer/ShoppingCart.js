import React from "react";
import { useShoppingCart } from "../../context/ShoppingCartContext";

function ShoppingCart() {
  const { cart, removeFromCart } = useShoppingCart();

  // SIGURIM total pa gabime → nëse cart undefined, e kthen array bosh
  const safeCart = Array.isArray(cart) ? cart : [];

  const total = safeCart.reduce((sum, item) => sum + (item.price || 0), 0);

  return (
    <div style={{ padding: 20 }}>
      <h2>Kartela e blerjes</h2>

      {safeCart.length === 0 && <p>Kartela është bosh</p>}

      {safeCart.map((item) => (
        <div key={item.id} style={{ marginBottom: 10 }}>
          <p>{item.name} - {item.price}€</p>
          <button onClick={() => removeFromCart(item.id)}>Fshi</button>
        </div>
      ))}

      <hr />
      <h3>Total: {total} €</h3>
    </div>
  );
}

export default ShoppingCart;
