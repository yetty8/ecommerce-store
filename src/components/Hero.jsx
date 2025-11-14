import React from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import { useRef, useEffect } from "react";

export default function Hero() {
  const ref = useRef(null);
  const controls = useAnimation();
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  const variants = {
    hidden: { y: -50, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.8 } },
  };

  return (
    <section
      id="hero"
      ref={ref}
      className="relative text-center py-32 bg-gradient-to-b from-gray-950 to-gray-900"
    >
      <motion.h1
        className="text-5xl md:text-6xl font-extrabold text-gray-100 mb-6"
        initial="hidden"
        animate={controls}
        variants={variants}
      >
        Welcome to Yetbarek Store
      </motion.h1>

      <motion.p
        className="text-gray-300 text-lg md:text-xl mb-10"
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.5, duration: 0.8 }}
      >
        Explore our featured products and upgrade your lifestyle.
      </motion.p>

      <motion.a
        href="#products"
        className="inline-block bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-8 rounded-lg transition-transform duration-200"
        whileHover={{ scale: 1.05, boxShadow: "0px 8px 15px rgba(0,0,0,0.3)" }}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
      >
        Shop Now
      </motion.a>
    </section>
  );
}
