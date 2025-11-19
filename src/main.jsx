import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { CartProvider } from "./contexts/CartContext"; // <-- fixed path
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <CartProvider>
      <App />
    </CartProvider>
  </React.StrictMode>
);
