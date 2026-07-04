"use client";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";

const Logout = () => {

  const signout = async() => await authClient.signOut()
  return (
    <Link
      href="/hotel-booking"
      onClick={signout}
      className="grow text-sm text-zinc-700 transition-all  hover:pl-1 w-fll"
    >
      Logout
    </Link>
  );
};

export default Logout;
