"use server";
import { LogOut } from "lucide-react";
import { headers } from "next/headers";
import Link from "next/link";
import { auth } from "@/lib/auth";
import { AUTH_CONFIG } from "../../constants/auth.constants";

export async function handleSignOut() {
  await auth.api.signOut({
    headers: await headers(),
  });
}

const Logout = async () => {
  return (
    <Link
      className="cursor-pointer text-red-600 focus:bg-red-50 focus:text-red-700 dark:focus:bg-red-950/50 flex w-full"
      href={AUTH_CONFIG.ROUTES.HOME}
      replace={true}
      onClick={handleSignOut}
    >
      <LogOut className="mr-2 size-4" />
      <span>Log out</span>
    </Link>
  );
};

export default Logout;
