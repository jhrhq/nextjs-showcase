"use client";
import { useRouter } from "next/navigation";
import { Dialog, DialogContent } from "@/components/ui/dialog";

type SignInModalProps = {
  children: React.ReactNode;
};

const SignInModal = ({ children }: SignInModalProps) => {
  const router = useRouter();

  const handleOpenChange = () => {
    router.back();
  };
  return (
    <Dialog defaultOpen={true} open={true} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-sm">{children}</DialogContent>
    </Dialog>
  );
};

export default SignInModal;
