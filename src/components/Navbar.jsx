import React, { useState, useEffect } from "react";
import { FaShoppingCart, FaBars, FaTimes } from "react-icons/fa";
import CartDrawer from "./CartDrawer";
import { useCart } from "../contexts/CartContext";
import { useLocation } from "react-router-dom";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [shrink, setShrink] = useState(false);
  const [active, setActive] = useState("hero");
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { totalItems } = useCart();
  const location = useLocation();

  const navItems = [
    { id: "hero", label: "Home" },
    { id: "products", label: "Products" },
    { id: "contact", label: "Contact" },
  ];

  // Scroll highlight for homepage only
  useEffect(() => {
    const handleScroll = () => {
      setShrink(window.scrollY > 60);

      if (location.pathname !== "/") {
        setActive(""); // no active link outside homepage
        return;
      }

      let current = "hero";
      navItems.forEach(({ id }) => {
        const section = document.getElementById(id);
        if (section && window.scrollY >= section.offsetTop - 120) current = id;
      });
      setActive(current);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // initial active
    return () => window.removeEventListener("scroll", handleScroll);
  }, [location.pathname]);

  // Smooth scroll function
  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (!section) return;

    const header = document.querySelector("header");
    const headerHeight = header ? header.offsetHeight : 0;

    const sectionTop = section.offsetTop - headerHeight - 10; // extra padding
    window.scrollTo({
      top: sectionTop,
      behavior: "smooth",
    });

    setIsOpen(false); // close mobile menu
  };

  return (
    <>
      <header
        className={`fixed top-0 w-full z-50 backdrop-blur-xl bg-gray-900/90 dark:bg-gray-800/90 transition-all duration-300 ${
          shrink ? "py-2 shadow-lg" : "py-4"
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
          <h1
            className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500 cursor-pointer"
            onClick={() => scrollToSection("hero")}
          >
            Yetbarek Store
          </h1>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-10">
            {navItems.map(({ id, label }) => (
              <button
                key={id}
                onClick={() => scrollToSection(id)}
                className={`relative font-medium text-gray-300 hover:text-white transition ${
                  active === id ? "text-blue-400" : ""
                }`}
              >
                {label}
                <span
                  className={`absolute left-0 -bottom-1 h-0.5 bg-blue-500 transition-all ${
                    active === id ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                ></span>
              </button>
            ))}
          </nav>

          {/* Cart + Mobile Menu */}
          <div className="flex items-center space-x-5">
            <button
              className="relative text-gray-100 hover:text-blue-400 transition-transform hover:scale-110"
              onClick={() => setIsCartOpen(true)}
              aria-label="Open cart"
            >
              <FaShoppingCart size={24} />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold px-1.5 py-0.5 rounded-full">
                  {totalItems}
                </span>
              )}
            </button>

            <button
              className="md:hidden text-gray-100 hover:text-blue-400"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        {isOpen && (
          <nav className="md:hidden bg-gray-900/95 dark:bg-gray-800/95 backdrop-blur-xl mt-3 shadow-xl pb-6 animate-fadeIn">
            <div className="flex flex-col items-center space-y-6 pt-6">
              {navItems.map(({ id, label }) => (
                <button
                  key={id}
                  onClick={() => scrollToSection(id)}
                  className={`text-lg font-semibold transition ${
                    active === id ? "text-blue-400" : "text-gray-100"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </nav>
        )}
      </header>

      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
}
