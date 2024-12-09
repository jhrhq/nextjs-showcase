import Image from "next/image";
import Link from "next/link";

const VideoSuggestionCard = ({
  title,
  description,
  thumbnail,
  channelTitle,
  publishTime,
  videoId,
}) => {
  return (
    <Link href={`videos/${videoId}`} className="flex items-start space-x-4">
      <Image
        height={80}
        width={128}
        src={thumbnail}
        alt={title}
        className="w-30 h-20 rounded object-cover"
      />
      <div>
        <h3 className="font-semibold">{title}</h3>
        <p className="text-sm text-gray-400">{channelTitle}</p>
        <p className="text-sm text-gray-400">26,389M</p>
      </div>
    </Link>
  );
};

export default VideoSuggestionCard;
