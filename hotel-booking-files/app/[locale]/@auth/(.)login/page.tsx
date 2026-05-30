"use client";
import GoogleLoginAction from "@/components/auth/GoogleLoginAction";
import LoginForm from "@/components/auth/LoginForm";
import LoginNavigation from "@/components/auth/LoginNavigation";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { useRouter } from "next/navigation";
import { FaX } from "react-icons/fa6";

const Page = () => {
  const router = useRouter();
  return (
    <Dialog defaultOpen={true}>
      {/* <AlertDialogTrigger asChild>
          <Button variant="outline">Show Dialog</Button>
        </AlertDialogTrigger> */}
      <DialogContent
        className="bg-white rounded-xl shadow-2xl w-96 p-6  shadow-black/50"
        onEscapeKeyDown={(event: KeyboardEvent) => event.preventDefault()}
      >
        {/* Close Button */}
        <DialogClose
          onClick={() => {
            router.back();
          }}
          className="text-gray-500 hover:text-gray-800"
        >
          <FaX className="ph-x size-4 " />
        </DialogClose>

        {/* Modal Header */}
        <div className="text-center mb-6">
          <DialogTitle className="text-2xl font-bold text-gray-800">
            Log in to Hotel Booking
          </DialogTitle>

          <DialogDescription className="text-gray-600 text-sm mt-2">
            Welcome back! Let&apos;s get you signed in.
          </DialogDescription>
        </div>
        {/* Social Login */}
        <div className="space-y-4 mb-4">
          {/* Google Login Button */}
          <GoogleLoginAction />
          {/* Divider */}
          <div className="flex items-center my-4">
            <div className="flex-grow border-t border-gray-300" />
            <span className="mx-4 text-gray-500 text-sm">or</span>
            <div className="flex-grow border-t border-gray-300" />
          </div>
          {/* Email Login Form */}
          <LoginForm />
        </div>
        {/* Footer */}
        <LoginNavigation />
      </DialogContent>
    </Dialog>
  );
};

export default Page;
