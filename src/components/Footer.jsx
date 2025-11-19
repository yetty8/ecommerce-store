import React from "react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 dark:bg-gray-800 text-center py-6 border-t border-gray-700">
      <p className="text-gray-500 text-sm">
        © {new Date().getFullYear()} YettyStore — All rights reserved.
      </p>
    </footer>
  );
}
