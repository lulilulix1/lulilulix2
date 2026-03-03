import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './styles/global.css';
import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import CheckoutPage from "./pages/CheckoutPage";
import CategoryPage from "./pages/CategoryPage"; // ← Shto këtë
import Header from "./components/customer/Header";
import Footer from "./components/customer/Footer";

function App() {
  return (
    <Router>
      <div className="app">
        <Header />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            
            {/* PËR KLIENTËT */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            
            {/* PËR ADMIN */}
            <Route path="/admin-login" element={<AdminLogin />} />
            <Route path="/admin" element={<AdminDashboard />} />
            
            {/* PËR KATEGORITË */}
            <Route path="/kategoria/:categoryName" element={<CategoryPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;