import React, { useState } from "react";
import API_URL from "../../config";

function Checkout({ cart }) {
  const [customer, setCustomer] = useState({
    emri: "",
    mbiemri: "",
    telefoni: "",
    email: "",
    adresa: "",
    qyteti: "",
    shteti: "",
  });

  const placeOrder = async () => {
    const order = {
      customer,
      products: cart.map(c => ({
        productId: c._id,
        name: c.name,
        price: c.price,
        quantity: c.quantity || 1,
        supplier: c.supplier,
      })),
      total: cart.reduce((a, b) => a + b.price * (b.quantity || 1), 0),
    };

    const res = await fetch(`${API_URL}/api/orders`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(order),
    });

    const data = await res.json();
    alert("Porosia u pranua! Nr: " + data.orderNumber);
  };

  return (
    <div>
      <h2>Finalizo Porosinë</h2>

      <button onClick={placeOrder}>Porosit</button>
    </div>
  );
}

export default Checkout;
