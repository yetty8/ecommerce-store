// src/components/MotionCard.jsx
import { motion } from "framer-motion";

const MotionCard = ({ children, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ type: "spring", stiffness: 200, delay }}
    whileHover={{ scale: 1.05 }}
  >
    {children}
  </motion.div>
);

export default MotionCard;
