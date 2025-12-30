"use client";
import range from "lodash.range";
import { LayoutGroup, motion } from "motion/react";
import React from "react";
import styles from "./CoinSorter.module.css";

const NUM_OF_BOXES = 4;

function CoinSorter({ numOfCoins }) {
  const id = React.useId();

  const [selectedBox, setSelectedBox] = React.useState(0);
  return (
    <LayoutGroup>
      <div className={styles.wrapper}>
        {range(NUM_OF_BOXES).map((boxIndex) => (
          <button
            type="button"
            key={boxIndex}
            className={`${styles.box} ${
              selectedBox === boxIndex ? styles.selected : ""
            }`}
            onClick={() => setSelectedBox(boxIndex)}
          >
            {selectedBox === boxIndex &&
              range(numOfCoins).map((coinIndex) => {
                const layoutId = `${id}-${coinIndex}`;

                return (
                  <motion.div
                    layoutId={layoutId}
                    key={layoutId}
                    className={styles.coin}
                    transition={{
                      type: "spring",
                      stiffness: 400,
                      damping: 40 + coinIndex * 5,
                    }}
                  />
                );
              })}
          </button>
        ))}
      </div>
    </LayoutGroup>
  );
}

export default CoinSorter;
