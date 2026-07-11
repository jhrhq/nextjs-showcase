"use client";
import { useRouter } from "next/navigation";
import SignIn from "@/domains/hotel-booking/components/auth/SignIn";
import { Button } from "@/domains/hotel-booking/components/ui/button";

import { Dialog, DialogContent, DialogTrigger } from "@/domains/hotel-booking/components/ui/dialog";

const Page = () => {
  const router = useRouter();

  const handleOpenChange = () => {
    router.back();
  };
  return (
    <Dialog defaultOpen={true} open={true} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button variant="outline">Open Dialog</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-sm">
        <SignIn />
      </DialogContent>
    </Dialog>
  );
};

export default Page;
