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
      onClick={() => onChange(!value)}
      {...delegated}
    >

      <motion.span
        className={styles.ball}
        initial={false}

        transition={{
          type: 'spring',
          stifness: 500,
          damping: 40
        }}

        animate={{
          x: value ? '100%' : '0%'
        }}
      />
    </button>
  );
}

export default Toggle;