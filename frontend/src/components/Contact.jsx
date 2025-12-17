import React from "react";
import { motion } from "framer-motion";

export default function Contact() {
  return (
    <section id="contact" className="py-20 bg-gray-950 text-gray-100">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <motion.h2
          className="text-4xl font-bold mb-6"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          Contact <span className="text-blue-500">Us</span>
        </motion.h2>

        <motion.p
          className="text-gray-300 max-w-xl mx-auto mb-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.7 }}
        >
          Have questions or need help? Reach out and we’ll get back to you as soon
          as possible.
        </motion.p>

        <motion.form
          className="grid gap-6 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <input
            type="text"
            placeholder="Your Name"
            className="w-full p-4 rounded-lg bg-gray-800 border border-gray-700 text-gray-100 focus:ring-2 focus:ring-blue-500 outline-none"
          />
          <input
            type="email"
            placeholder="Your Email"
            className="w-full p-4 rounded-lg bg-gray-800 border border-gray-700 text-gray-100 focus:ring-2 focus:ring-blue-500 outline-none"
          />
          <textarea
            rows="5"
            placeholder="Your Message"
            className="w-full p-4 rounded-lg bg-gray-800 border border-gray-700 text-gray-100 focus:ring-2 focus:ring-blue-500 outline-none"
          />
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 rounded-lg transition"
          >
            Send Message
          </button>
        </motion.form>
      </div>
    </section>
  );
}
