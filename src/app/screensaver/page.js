import Link from "next/link";

function ScreenSaverIndexPage() {
  return (
    <main>
      <p>Choose your color:</p>
      <ul>
        <li>
          <Link href="/screensaver/lavender">
            lavender
          </Link>
        </li>
        <li>
          <Link href="/screensaver/peachpuff">
            peachpuff
          </Link>
        </li>
        <li>
          <Link href="/screensaver/hotpink">
            hotpink
          </Link>
        </li>
        <li>
          <Link href="/screensaver/white">
            white
          </Link>
        </li>
      </ul>
    </main>
  );
}

export default ScreenSaverIndexPage;
