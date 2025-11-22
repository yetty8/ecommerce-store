import React from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import BackToTopButton from "./components/BackToTopButton";
import { CartProvider } from "./contexts/CartContext";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Checkout from "./pages/Checkout";
import Success from "./pages/Success";

export default function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <div className="bg-gray-50 dark:bg-gray-900 transition-colors duration-300 min-h-screen flex flex-col">
          {/* Navbar appears on all pages */}
          <Navbar />

          {/* Main content grows */}
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/success" element={<Success />} />
            </Routes>
          </main>

          {/* Footer appears on all pages */}
          <Footer />
          <BackToTopButton />
        </div>
      </BrowserRouter>
    </CartProvider>
  );
}
