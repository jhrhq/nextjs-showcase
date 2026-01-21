"use client";
import { motion } from "motion/react";

import Image from "next/image";
import styles from "./BookGrid.module.css";

const MotionImage = motion.create(Image);
function BookGrid({ books, handleSelectBook, ...delegated }) {
  return (
    <section {...delegated}>
      <ul className={styles.wrapper}>
        {books.map((book) => (
          <li key={book.isbn}>
            <button type="button" className={styles.bookBtn} onClick={() => handleSelectBook(book)}>
              <MotionImage
                layoutId={`book-cover-${book.isbn}`}
                alt={book.name}
                src={book.coverSrc}
                className={styles.bookCover}
                draggable={false}
              />
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default BookGrid;
