"use server";
import Link from "next/link";

import { auth } from "@/lib/auth"; // Your Better Auth configuration file
import { headers } from "next/headers";

export async function handleSignOut() {
  await auth.api.signOut({
    headers: await headers(),
    // MANDATORY: Required to authenticate the request
  });
}

const Logout = async() => {

  return (
    <Link
      href="/hotel-booking"
      onClick={handleSignOut}
      className="grow text-sm text-zinc-700 transition-all  hover:pl-1 w-fll"
    >
      Logout
    </Link>
  );
};

export default Logout;
