import React from "react";

export default function Footer() {
  return (
    <footer className="bg-[#1a1a1a] text-center py-6 border-t border-gray-800">
      <p className="text-gray-500 text-sm">
        © {new Date().getFullYear()} YettyStore — All rights reserved.
      </p>
    </footer>
  );
}
