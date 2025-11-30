'use client'
import { motion } from "motion/react";
import styles from './toggle.module.css';

function Toggle({
  value,
  onChange,
  ...delegated
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={value}
      className={styles.wrapper}
      style={{
        justifyContent: value ? "flex-end" : 'flex-start'
      }}
      onClick={() => onChange(!value)}
      {...delegated}
    >

      <motion.span
        className={styles.ball}
        layout={true}
        transition={{
          type: 'spring',
          stifness: 500,
          damping: 40
        }}
      />
    </button>
  );
}

export default Toggle;