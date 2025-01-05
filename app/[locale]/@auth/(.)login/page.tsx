"use client";
import { GoogleSvg } from "@/components/svg-component/GoogleSvg";
import { Dialog, DialogClose, DialogContent } from "@/components/ui/dialog";
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
          <h2 className="text-2xl font-bold text-gray-800">
            Log in to Hotel Booking
          </h2>
          <p className="text-gray-600 text-sm mt-2">
            Welcome back! Let&apos;s get you signed in.
          </p>
        </div>
        {/* Social Login */}
        <div className="space-y-4 mb-4">
          {/* Google Login Button */}
          <button className="w-full flex items-center justify-center border border-gray-300 rounded-full py-3 hover:bg-gray-50 transition">
            <GoogleSvg />
            Continue with Google
          </button>
          {/* Divider */}
          <div className="flex items-center my-4">
            <div className="flex-grow border-t border-gray-300" />
            <span className="mx-4 text-gray-500 text-sm">or</span>
            <div className="flex-grow border-t border-gray-300" />
          </div>
          {/* Email Login Form */}
          <form className="space-y-4">
            <input
              type="email"
              placeholder="Email"
              className="w-full border border-gray-300 rounded-full px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full border border-gray-300 rounded-full px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <button
              type="submit"
              className="w-full bg-primary text-white rounded-full py-3 hover:bg-primary transition"
            >
              Continue
            </button>
          </form>
        </div>
        {/* Footer */}
        <div className="text-center text-sm text-gray-600">
          <p>
            Don&apos;t have an account?
            <a href="#" className="text-primary hover:underline">
              Sign up
            </a>
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default Page;
