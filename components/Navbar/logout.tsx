"use client";
import { signOut } from "next-auth/react";
import Link from "next/link";

const Logout = () => {
  return (
    <Link
      href="/"
      onClick={() => signOut()}
      className="flex-grow text-sm text-zinc-700 transition-all  hover:pl-1 w-fll"
    >
      Logout
    </Link>
  );
};

export default Logout;
