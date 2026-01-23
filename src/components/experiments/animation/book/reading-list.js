"use client";
import { X } from "lucide-react";
import { motion } from "motion/react";
import Image from "next/image";
import VisuallyHidden from "@/components/visually-hidden";
import styles from "./ReadingList.module.css";

const MotionImage = motion.create(Image);

function ReadingList({ books, handleRemoveBook }) {
  return (
    <div className={styles.wrapper}>
      <h2>Reading List</h2>
      <ol className={styles.books}>
        {books.map((book, _bookIndex) => {
          return (
            <li key={book.isbn}>
              <MotionImage
                layoutId={`book-cover-${book.isbn}`}
                alt={book.name}
                src={book.coverSrc}
                draggable={false}
                className={styles.bookCover}
                transition={{
                  type: "spring",
                  stiffness: 400,
                  damping: 60,
                }}
              />
              <motion.button
                layout="position"
                className={styles.deleteBtn}
                onClick={() => handleRemoveBook(book)}
                transition={{
                  type: "spring",
                  stiffness: 400,
                  damping: 60,
                }}
              >
                <X />
                <VisuallyHidden>Remove {book.name}</VisuallyHidden>
              </motion.button>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

export default ReadingList;
