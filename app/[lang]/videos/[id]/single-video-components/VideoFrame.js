import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CirclePlay } from "lucide-react";
import Image from "next/image";

const VideoFrame = () => {
  return (
    <div className="lg:w-3/4">
      <div className="relative">
        <iframe
          src="https://www.youtube.com/embed/hecODa5ZgZM"
          title="YouTube video player"
          frameBorder={0}
          className="w-full aspect-video h-[500px]"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen=""
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
          <div className="flex items-center space-x-4">
            <Button className="h-auto bg-color-gray hover:bg-opacity-80 rounded-full p-2 [&_svg]:size-6">
              <CirclePlay className="size-6 " />
            </Button>

            <Badge className="bg-color-purple font-normal  text-white px-2 py-1 rounded text-sm hover:bg-color-purple">
              LIVE
            </Badge>
            <span className="text-sm">46:02</span>
            <Button className=" h-auto bg-color-purple hover:bg-opacity-80 text-white px-4 py-1 rounded-full text-sm">
              Donate
            </Button>
          </div>
        </div>
      </div>
      <h1 className="text-2xl font-bold mt-4">
        GTA V : BATMAN WAS KIDNAPPED || GTA V Bangla GAMEPLAY || Professor Of Pc
        Gaming
      </h1>
      <div className="flex items-center space-x-4 mt-2">
        <Avatar className="size-10 rounded-full">
          <AvatarImage asChild src="/avatar.png">
            <Image
              height={80}
              width={128}
              src="/avatar.png"
              alt="User Avatar"
            />
          </AvatarImage>
          <AvatarFallback>Jo</AvatarFallback>
        </Avatar>

        <div>
          <p className="font-semibold">Professor Of Pc Gaming</p>
        </div>

        <Button className="h-auto bg-color-purple hover:bg-opacity-80 text-white px-4 py-1 rounded-full text-sm ml-auto">
          Subscribe
        </Button>
      </div>
    </div>
  );
};

export default VideoFrame;
