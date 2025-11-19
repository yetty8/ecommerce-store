import React from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Products from "./components/Products";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import BackToTopButton from "./components/BackToTopButton";
import { CartProvider } from "./contexts/CartContext";

export default function App() {
  return (
    <CartProvider>
      <div className="bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
        <Navbar />
        <main>
          <Hero />
          <Products />
          <Contact />
        </main>
        <Footer />
        <BackToTopButton />
      </div>
    </CartProvider>
  );
}
