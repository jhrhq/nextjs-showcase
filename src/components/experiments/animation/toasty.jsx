"use client";
import { motion } from "motion/react";
import React from "react";
import styles from "./Toasty.module.css";

function Toasty() {
  const [isShown, setIsShown] = React.useState(false);

  const wrapperRef = React.useRef();

  React.useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const [entry] = entries;

      setIsShown(entry.isIntersecting);
    });

    observer.observe(wrapperRef.current);
  }, []);

  return (
    <div ref={wrapperRef} className={styles.wrapper}>
      <motion.div
        className={styles.character}
        transition={{
          type: "spring",
          stiffness: isShown ? 300 : 600,
          damping: isShown ? 70 : 40,
          restDelta: 0.01,
        }}
        animate={{ x: isShown ? "0%" : "100%" }}
      >
        👻
      </motion.div>
    </div>
  );
}

export default Toasty;
