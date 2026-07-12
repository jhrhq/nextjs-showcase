"use client";
import { useRouter } from "next/navigation";
import { Dialog, DialogContent } from "@/domains/hotel-booking/components/ui/dialog";
import SignInHeaderWithGoogleProvider from "./SignIn";
import SignInForm from "./SignInForm";

type SignInModalProps = {
  callbackUrl: string;
};

const SignInModal = ({ callbackUrl }: SignInModalProps) => {
  const router = useRouter();

  const handleOpenChange = () => {
    router.back();
  };
  return (
    <Dialog defaultOpen={true} open={true} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-sm">
        <SignInHeaderWithGoogleProvider />
        <SignInForm callbackUrl={callbackUrl} />
      </DialogContent>
    </Dialog>
  );
};

export default SignInModal;
