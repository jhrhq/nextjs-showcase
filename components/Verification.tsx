import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FC, useEffect } from "react";

let loaded = false;

const Verification: FC = () => {
  const router = useRouter();
  const { update, status } = useSession();

  useEffect(() => {
    if (loaded) return;

    if (status === "authenticated") {
      update({ verified: true }).then(() => {
        router.replace("/");
        router.refresh();
      });
      loaded = true;
    }
  }, [status]);

  return (
    <div>
      <div className="text-center px-4 pt-20 text-xl">
        Congrats! Your email is verified.
      </div>
    </div>
  );
};

export default Verification;
