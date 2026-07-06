"use client";
import { authClient } from "@/lib/auth-client";
import { CheckCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { type FC, useEffect } from "react";

let loaded = false;
const VerificationSuccess: FC<object> = () => {
  const router = useRouter();
  const { data: session } = authClient.useSession();
  console.log(session);

  // useEffect(() => {
  //   if (loaded) return;

  //   if (status === "authenticated") {
  //     update({ verified: true }).then(() => {
  //       router.replace("/");
  //       router.refresh();
  //     });
  //     loaded = true;
  //   }
  // }, [status]);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-card rounded-lg shadow-sm p-8 text-center">
        <div className="mb-6">
          <CheckCircle className="w-20 h-20 text-primary mx-auto" />
        </div>

        <h1 className="text-xl font-heading text-foreground mb-2">Account Verification Successful!</h1>

        <p className="text-body text-foreground mb-8">Your account has been successfully verified.</p>
      </div>
    </div>
  );
};

export default VerificationSuccess;
