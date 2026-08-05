"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import useAuth from "@/domains/movies/hooks/useAuth";
import { AUTH_CONFIG } from "../../constants/auth.constant";

const SingInOut = () => {
  const { auth, setAuth } = useAuth();
  const router = useRouter();

  const singout = () => {
    setAuth(null);
    router.push(AUTH_CONFIG.ROUTES.SIGN_IN);
  };

  return (
    <div className="flex items-center gap-2 ml-2">
      {auth ? (
        <div className="flex items-center gap-3">
          <span className="text-sm font-medium text-foreground">
            Hello, <span className="font-semibold text-primary">{auth?.name}</span>
          </span>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={singout}
            className="cursor-pointer border-border bg-secondary/50 hover:bg-secondary text-foreground text-xs font-medium px-3 py-1.5 h-auto rounded-lg transition-colors"
          >
            Sign out
          </Button>
        </div>
      ) : (
        <Link
          href={AUTH_CONFIG.ROUTES.SIGN_IN}
          className="text-sm font-semibold text-primary hover:text-primary/80 transition-colors"
        >
          Sign in
        </Link>
      )}
    </div>
  );
};

export default SingInOut;
