import Link from "next/link";
import "./styles.css";

function FlashMsgExercise() {
  return (
    <main>
      <h1>Welcome to my website!</h1>
      <p>
        Got feedback? Please <Link href="/flash-messages/contact">contact us</Link>.
      </p>
    </main>
  );
}

export default FlashMsgExercise;
