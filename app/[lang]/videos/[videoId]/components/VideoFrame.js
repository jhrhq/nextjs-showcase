import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CirclePlay } from "lucide-react";
import Image from "next/image";

const VideoFrame = ({
  title,
  description,
  thumbnail,
  channelTitle,
  publishTime,
  videoId,
  dictionary,
  className,
}) => {
  return (
    <div className={cn("lg:w-3/4", className)}>
      <div className="relative">
        <iframe
          src={`https://www.youtube.com/embed/${videoId}`}
          title="YouTube video player"
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
              {dictionary?.live}
            </Badge>
            <span className="text-sm">
              {new Date(publishTime).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </span>
            <Button className=" h-auto bg-color-purple hover:bg-opacity-80 text-white px-4 py-1 rounded-full text-sm">
              {dictionary?.donate}
            </Button>
          </div>
        </div>
      </div>
      <h1 className="text-2xl font-bold mt-4">{title}</h1>
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
          <p className="font-semibold">{channelTitle}</p>
        </div>

        <Button className="h-auto bg-color-purple hover:bg-opacity-80 text-white px-4 py-1 rounded-full text-sm ml-auto">
          {dictionary?.subscribe}
        </Button>
      </div>
    </div>
  );
};

export default VideoFrame;
