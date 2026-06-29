"use client";

import useAuth from "@/app/hooks/useAuth";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";

const SingInOut = () => {
  const { auth, setAuth } = useAuth();
  const router = useRouter();

  const logout = () => {
    setAuth(null);
    router.push("/login");
  };

  return (
    <div className="ml-2">
      {auth ? (
        <>
          <span>Hello, {auth?.name}</span>
          <span className="mx-1">|</span>
          <Button
            className="cursor-pointer border border-zinc-700 rounded-md px-2 py-1"
            onClick={logout}
          >
            Logout
          </Button>
        </>
      ) : (
        <Link href={"/login"}>Login</Link>
      )}
    </div>
  );
};

export default SingInOut;
