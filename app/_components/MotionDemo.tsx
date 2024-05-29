"use client";

import { motion } from "framer-motion";
import { useState } from "react";

const MotionDemo = () => {
  const list = { hidden: { opacity: 0 }, show: { opacity: 1 } };
  const item = { hidden: { x: -10, opacity: 0 }, show: { opacity: 1, x: 0 } };
  const [name, setName] = useState("hidden");

  return (
    <div className=" flex flex-col">
      <motion.div
        className=" w-20 h-20 m-5 bg-teal-500 opacity-0"
        animate={{ x: 100, opacity: 1 }}
        whileFocus={{ scale: 1.2 }}
        whileHover={{ scale: 1.1 }}
        drag
        dragConstraints={{ left: 0, top: 0, right: 200, bottom: 200 }}
      >
        Amber
      </motion.div>
      <p
        className=" text-teal-300 select-none cursor-pointer"
        onClick={() => setName(name === "hidden" ? "show" : "hidden")}
      >
        Amber
      </p>
      <motion.ul animate={name} variants={list}>
        <motion.li variants={item}>Amber</motion.li>
        <motion.li variants={item}>Amber</motion.li>
        <motion.li variants={item}>Amber</motion.li>
        <motion.li variants={item}>Amber</motion.li>
      </motion.ul>
    </div>
  );
};

export default MotionDemo;
