"use server";
import { LogOut } from "lucide-react";
import { headers } from "next/headers";
import Link from "next/link";
import { auth } from "@/lib/auth"; // Your Better Auth configuration file
import { AUTH_CONFIG } from "../../constants/auth.constants";

export async function handleSignOut() {
  await auth.api.signOut({
    headers: await headers(),
  });
}

const Logout = async () => {
  return (
    <Link href={AUTH_CONFIG.ROUTES.HOME} replace={true} onClick={handleSignOut}>
      <LogOut className="mr-2 size-4" />
      <span>Log out</span>
    </Link>
  );
};

export default Logout;
