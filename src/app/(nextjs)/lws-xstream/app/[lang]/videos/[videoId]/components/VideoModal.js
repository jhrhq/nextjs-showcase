"use client";
import VideoFrame from "@/app/[lang]/videos/[videoId]/components/VideoFrame";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
} from "@/components/ui/alert-dialog";
import { LucideX } from "lucide-react";
import { useRouter } from "next/navigation";

const VideoModal = (props) => {
  const router = useRouter();

  function onHide() {
    router.back();
  }

  return (
    <AlertDialog defaultOpen={true}>
      <AlertDialogContent className="max-w-screen-lg w-full bg-foreground ">
        <VideoFrame {...props} className="lg:w-full" />
        <AlertDialogCancel
          className="bg-foreground text-white w-fit absolute right-6 top-6 h-auto p-1 border-none "
          onClick={onHide}
        >
          <LucideX />
        </AlertDialogCancel>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default VideoModal;
