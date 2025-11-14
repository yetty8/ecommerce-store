import React from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Products from "./components/Products";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import BackToTopButton from "./components/BackToTopButton";
import CartDrawer from "./components/CartDrawer";
import "./App.css";

function App() {
  return (
    <div className="pt-20 bg-gray-950 min-h-screen">
      <Navbar />
      <Hero />
      <Products />
      <Contact />
      <Footer />
      <BackToTopButton />
      <CartDrawer />
    </div>
  );
}

export default App;
