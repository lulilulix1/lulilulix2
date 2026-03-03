import React, { useState } from "react";
import { useShoppingCart } from "../../context/ShoppingCartContext";
import API_URL from "../../config";
import { useNavigate } from "react-router-dom";

export default function Checkout() {
  const { cart, getCartTotal, clearCart } = useShoppingCart();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("para-ne-dore");
  
  const [customer, setCustomer] = useState({
    emri: "",
    mbiemri: "",
    email: "",
    telefoni: "",
    adresa: "",
    qyteti: "",
    shteti: "Kosovë"
  });

  const handleInputChange = (e) => {
    setCustomer({ ...customer, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (cart.length === 0) {
      alert("Shporta është e zbrazët!");
      return;
    }

    setLoading(true);

    const orderData = {
      customer,
      products: cart.map(item => ({
        productId: item._id,
        name: item.name,
        price: item.price,
        quantity: item.quantity || 1,
        supplier: item.supplier || ""
      })),
      paymentMethod,
      subtotal: getCartTotal(),
      total: getCartTotal() // Pa TVSH për momentin
    };

    try {
      const res = await fetch(`${API_URL}/api/orders`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData)
      });

      const data = await res.json();

      if (data.success) {
        alert(`Porosia u krijua me sukses!\nNumri i porosisë: ${data.orderNumber}`);
        clearCart();
        navigate(`/porosia/${data.orderNumber}`);
      } else {
        alert("Gabim gjatë krijimit të porosisë");
      }
    } catch (error) {
      console.error("Checkout error:", error);
      alert("Gabim në lidhje me serverin");
    } finally {
      setLoading(false);
    }
  };

  if (cart.length === 0) {
    return (
      <div style={{ textAlign: "center", padding: "40px" }}>
        <h2>Shporta është e zbrazët</h2>
        <button onClick={() => navigate("/")}>Vazhdo blerjet</button>
      </div>
    );
  }

  return (
    <div className="container" style={{ maxWidth: "800px", margin: "0 auto" }}>
      <h1>Finalizo porosinë</h1>

      <form onSubmit={handleSubmit}>
        <div style={{ display: "grid", gap: "20px" }}>
          {/* Të dhënat personale */}
          <div style={{ background: "#f8f9fa", padding: "20px", borderRadius: "8px" }}>
            <h3>Të dhënat personale</h3>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
              <input
                name="emri"
                placeholder="Emri *"
                value={customer.emri}
                onChange={handleInputChange}
                required
                style={{ padding: "10px", borderRadius: "4px", border: "1px solid #ddd" }}
              />
              <input
                name="mbiemri"
                placeholder="Mbiemri *"
                value={customer.mbiemri}
                onChange={handleInputChange}
                required
                style={{ padding: "10px", borderRadius: "4px", border: "1px solid #ddd" }}
              />
              <input
                name="email"
                type="email"
                placeholder="Email *"
                value={customer.email}
                onChange={handleInputChange}
                required
                style={{ padding: "10px", borderRadius: "4px", border: "1px solid #ddd" }}
              />
              <input
                name="telefoni"
                placeholder="Telefoni *"
                value={customer.telefoni}
                onChange={handleInputChange}
                required
                style={{ padding: "10px", borderRadius: "4px", border: "1px solid #ddd" }}
              />
            </div>
          </div>

          {/* Adresa */}
          <div style={{ background: "#f8f9fa", padding: "20px", borderRadius: "8px" }}>
            <h3>Adresa e dërgesës</h3>
            <div style={{ display: "grid", gap: "10px" }}>
              <input
                name="adresa"
                placeholder="Adresa *"
                value={customer.adresa}
                onChange={handleInputChange}
                required
                style={{ padding: "10px", borderRadius: "4px", border: "1px solid #ddd" }}
              />
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
                <input
                  name="qyteti"
                  placeholder="Qyteti *"
                  value={customer.qyteti}
                  onChange={handleInputChange}
                  required
                  style={{ padding: "10px", borderRadius: "4px", border: "1px solid #ddd" }}
                />
                <input
                  name="shteti"
                  placeholder="Shteti"
                  value={customer.shteti}
                  onChange={handleInputChange}
                  style={{ padding: "10px", borderRadius: "4px", border: "1px solid #ddd" }}
                />
              </div>
            </div>
          </div>

          {/* Mënyra e pagesës */}
          <div style={{ background: "#f8f9fa", padding: "20px", borderRadius: "8px" }}>
            <h3>Mënyra e pagesës</h3>
            <div style={{ display: "flex", gap: "20px" }}>
              <label style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                <input
                  type="radio"
                  value="para-ne-dore"
                  checked={paymentMethod === "para-ne-dore"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                Para në dorë
              </label>
              <label style={{ display: "flex", alignItems: "center", gap: "5px", opacity: 0.5 }}>
                <input
                  type="radio"
                  value="kartele"
                  checked={paymentMethod === "kartele"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  disabled
                />
                Kartelë (së shpejti)
              </label>
              <label style={{ display: "flex", alignItems: "center", gap: "5px", opacity: 0.5 }}>
                <input
                  type="radio"
                  value="crypto"
                  checked={paymentMethod === "crypto"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  disabled
                />
                Crypto (së shpejti)
              </label>
            </div>
          </div>

          {/* Përmbledhja e porosisë */}
          <div style={{ background: "#f8f9fa", padding: "20px", borderRadius: "8px" }}>
            <h3>Përmbledhja e porosisë</h3>
            {cart.map(item => (
              <div key={item._id} style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px" }}>
                <span>{item.name} x {item.quantity || 1}</span>
                <span>€{(item.price * (item.quantity || 1)).toFixed(2)}</span>
              </div>
            ))}
            <div style={{ borderTop: "2px solid #ddd", marginTop: "10px", paddingTop: "10px", fontWeight: "bold" }}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span>Totali:</span>
                <span>€{getCartTotal().toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Butoni */}
          <button
            type="submit"
            disabled={loading}
            style={{
              background: "#27ae60",
              color: "white",
              padding: "15px",
              border: "none",
              borderRadius: "4px",
              fontSize: "16px",
              fontWeight: "600",
              cursor: loading ? "not-allowed" : "pointer",
              opacity: loading ? 0.7 : 1
            }}
          >
            {loading ? "Dhe duke procesuar..." : "KONFIRMO POROSINË"}
          </button>
        </div>
      </form>
    </div>
  );
}